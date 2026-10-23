'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { desktopPhotos, folders, icons, type DesktopPhoto } from '@/src/data/portfolioData'

type DesktopLayerProps = {
  onBackgroundClick: () => void
  onOpenFolder: (folderId: string) => void
  onOpenPhoto: (photo: DesktopPhoto) => void
  onOpenNote: () => void
}

type Rect = { x: number; y: number; w: number; h: number }
type Pos = { x: number; y: number }

type DesktopItem =
  | { kind: 'folder'; id: string; name: string; folderId: string }
  | { kind: 'photo'; id: string; name: string; photo: DesktopPhoto }
  | { kind: 'note'; id: string; name: string }

// Заготовленные хаотичные точки на рабочем столе (чтобы не стояли в линеечку)
const CHAOTIC_SPOTS: Pos[] = [
  { x: 54, y: 56 },
  { x: 184, y: 102 },
  { x: 76, y: 204 },
  { x: 226, y: 248 },
  { x: 96, y: 356 },
  { x: 312, y: 66 },
  { x: 248, y: 392 },
  { x: 58, y: 482 },
  { x: 368, y: 178 },
  { x: 382, y: 320 },
  { x: 164, y: 468 },
  { x: 460, y: 84 },
]

function getInitialPosition(index: number): Pos {
  if (index < CHAOTIC_SPOTS.length) {
    return CHAOTIC_SPOTS[index]
  }
  // Если папок станет еще больше — раскидываем их по красивой спирали
  const col = index % 4
  const row = Math.floor(index / 4)
  return {
    x: 60 + col * 135 + ((index * 29) % 45),
    y: 60 + row * 115 + ((index * 17) % 35),
  }
}

export function DesktopLayer({ onBackgroundClick, onOpenFolder, onOpenPhoto, onOpenNote }: DesktopLayerProps) {
  const desktopItems: DesktopItem[] = useMemo(
    () => [
      ...folders.map((f) => ({ kind: 'folder' as const, id: `folder-${f.id}`, name: f.name, folderId: f.id })),
      { kind: 'note' as const, id: 'note-about-me', name: 'обо_мне.txt' },
      ...desktopPhotos.map((p) => ({ kind: 'photo' as const, id: `photo-${p.id}`, name: p.name, photo: p })),
    ],
    [],
  )

  const [positions, setPositions] = useState<Record<string, Pos>>(() => {
    const map: Record<string, Pos> = {}
    desktopItems.forEach((item, idx) => {
      map[item.id] = getInitialPosition(idx)
    })
    return map
  })

  // На широких мониторах раскидываем часть иконок и на правую сторону стола для полного реализма
  useEffect(() => {
    const w = window.innerWidth
    if (w < 900) return
    setPositions((prev) => {
      const next = { ...prev }
      desktopItems.forEach((item, idx) => {
        if (idx === 1) next[item.id] = { x: w - 250, y: 74 }
        if (idx === 4) next[item.id] = { x: w - 145, y: 195 }
        if (idx === 5) next[item.id] = { x: w - 230, y: 340 }
      })
      return next
    })
  }, [desktopItems])

  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [band, setBand] = useState<Rect | null>(null)
  const [zMap, setZMap] = useState<Record<string, number>>({})
  const topZ = useRef(10)

  const bandStart = useRef<{ x: number; y: number } | null>(null)
  const iconRefs = useRef(new Map<string, HTMLElement>())

  // Состояние для группового перетаскивания всех выделенных элементов
  const dragState = useRef<{
    pointerId: number
    startX: number
    startY: number
    initialPos: Record<string, Pos>
    movingIds: string[]
    moved: boolean
  } | null>(null)

  const handleBackgroundDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    onBackgroundClick()
    setSelected(new Set())
    bandStart.current = { x: e.clientX, y: e.clientY }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handleBackgroundMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const start = bandStart.current
    if (!start) return
    const rect = {
      x: Math.min(start.x, e.clientX),
      y: Math.min(start.y, e.clientY),
      w: Math.abs(e.clientX - start.x),
      h: Math.abs(e.clientY - start.y),
    }
    setBand(rect)
    const hits = new Set<string>()
    iconRefs.current.forEach((el, id) => {
      const b = el.getBoundingClientRect()
      const overlaps = b.left < rect.x + rect.w && b.right > rect.x && b.top < rect.y + rect.h && b.bottom > rect.y
      if (overlaps) hits.add(id)
    })
    setSelected(hits)
  }

  const endBand = () => {
    bandStart.current = null
    setBand(null)
  }

  const openItem = (item: DesktopItem) => {
    if (item.kind === 'folder') onOpenFolder(item.folderId)
    else if (item.kind === 'photo') onOpenPhoto(item.photo)
    else onOpenNote()
  }

  const handleItemPointerDown = (e: React.PointerEvent<HTMLLIElement>, item: DesktopItem) => {
    if (e.button !== 0) return
    e.stopPropagation()
    onBackgroundClick()

    const additive = e.metaKey || e.shiftKey
    let nextSelected: Set<string>

    if (additive) {
      nextSelected = new Set(selected)
      if (nextSelected.has(item.id)) nextSelected.delete(item.id)
      else nextSelected.add(item.id)
    } else if (selected.has(item.id)) {
      // Если элемент УЖЕ в группе выделенных — сохраняем выделение всей группы, чтобы двигать их вместе!
      nextSelected = new Set(selected)
    } else {
      nextSelected = new Set([item.id])
    }

    setSelected(nextSelected)

    const movingIds = Array.from(nextSelected)
    topZ.current += 1
    const newZ = topZ.current
    setZMap((prev) => {
      const updated = { ...prev }
      movingIds.forEach((id) => {
        updated[id] = newZ
      })
      return updated
    })

    const initialPos: Record<string, Pos> = {}
    movingIds.forEach((id) => {
      initialPos[id] = positions[id] ?? { x: 60, y: 60 }
    })

    dragState.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      initialPos,
      movingIds,
      moved: false,
    }

    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handleItemPointerMove = (e: React.PointerEvent<HTMLLIElement>) => {
    const st = dragState.current
    if (!st || st.pointerId !== e.pointerId) return

    const dx = e.clientX - st.startX
    const dy = e.clientY - st.startY

    if (!st.moved && Math.hypot(dx, dy) > 3) {
      st.moved = true
    }

    if (st.moved) {
      setPositions((prev) => {
        const next = { ...prev }
        st.movingIds.forEach((id) => {
          const start = st.initialPos[id]
          if (start) {
            next[id] = {
              x: start.x + dx,
              y: Math.max(32, start.y + dy),
            }
          }
        })
        return next
      })
    }
  }

  const handleItemPointerUp = (e: React.PointerEvent<HTMLLIElement>, item: DesktopItem) => {
    const st = dragState.current
    if (!st || st.pointerId !== e.pointerId) return
    dragState.current = null

    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }

    // На телефонах/планшетах открываем по одиночному тапу, если иконку не двигали
    if (!st.moved && e.pointerType === 'touch') {
      openItem(item)
    }
  }

  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        onPointerDown={handleBackgroundDown}
        onPointerMove={handleBackgroundMove}
        onPointerUp={endBand}
        onPointerCancel={endBand}
      />

      <ul aria-label="Рабочий стол" className="pointer-events-none absolute inset-0 z-10">
        {desktopItems.map((item, index) => {
          const isSelected = selected.has(item.id)
          const pos = positions[item.id] ?? getInitialPosition(index)
          const zIndex = zMap[item.id] ?? 10

          return (
            <li
              key={item.id}
              ref={(el) => {
                if (el) iconRefs.current.set(item.id, el)
                else iconRefs.current.delete(item.id)
              }}
              onPointerDown={(e) => handleItemPointerDown(e, item)}
              onPointerMove={handleItemPointerMove}
              onPointerUp={(e) => handleItemPointerUp(e, item)}
              onPointerCancel={(e) => handleItemPointerUp(e, item)}
              onDoubleClick={() => openItem(item)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') openItem(item)
              }}
              tabIndex={0}
              aria-selected={isSelected}
              aria-label={`${item.name}. Двойной клик, чтобы открыть`}
              className="pointer-events-auto absolute flex w-[96px] cursor-default flex-col items-center gap-[4px] outline-none select-none active:cursor-grabbing"
              style={{
                left: pos.x,
                top: pos.y,
                zIndex,
                touchAction: 'none',
              }}
            >
              <span
                className="flex h-[70px] w-[76px] items-center justify-center rounded-[6px]"
                style={{ background: isSelected ? 'rgba(255, 255, 255, 0.22)' : 'transparent' }}
              >
                {item.kind === 'folder' && (
                  <img
                    src={icons.folder}
                    alt=""
                    draggable={false}
                    className="size-[64px] object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)] pointer-events-none"
                  />
                )}
                {item.kind === 'photo' && (
                  <img
                    src={item.photo.src}
                    alt=""
                    draggable={false}
                    className="h-[48px] w-[62px] object-cover pointer-events-none"
                    style={{ border: '3px solid white', boxShadow: '0 4px 10px rgba(0,0,0,0.35)' }}
                  />
                )}
                {item.kind === 'note' && <MacTxtIcon />}
              </span>
              <span
                className="max-w-full rounded-[4px] px-[5px] py-[1px] text-center text-[12px] leading-[15px] font-medium break-words text-white"
                style={{
                  background: isSelected ? '#0A60FF' : 'transparent',
                  textShadow: isSelected ? 'none' : '0 1px 2px rgba(0,0,0,0.6)',
                }}
              >
                {item.name}
              </span>
            </li>
          )
        })}
      </ul>

      {band && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed z-[15]"
          style={{
            left: band.x,
            top: band.y,
            width: band.w,
            height: band.h,
            border: '1px solid rgba(255,255,255,0.6)',
            background: 'rgba(255,255,255,0.18)',
          }}
        />
      )}
    </>
  )
}

/** Иконка текстового документа macOS (.txt) */
function MacTxtIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="size-[58px] drop-shadow-[0_3px_6px_rgba(0,0,0,0.35)] pointer-events-none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="txtPage" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#EAECEF" />
        </linearGradient>
      </defs>
      {/* Лист бумаги */}
      <path
        d="M12 6 H40 L52 18 V56 C52 58.2 50.2 60 48 60 H16 C13.8 60 12 58.2 12 56 V10 C12 7.8 13.8 6 16 6 Z"
        fill="url(#txtPage)"
        stroke="rgba(0,0,0,0.12)"
        strokeWidth="1"
      />
      {/* Загнутый уголок */}
      <path d="M40 6 V15 C40 16.7 41.3 18 43 18 H52 Z" fill="#D0D5DD" />
      {/* Строчки текста на иконке */}
      <rect x="18" y="24" width="28" height="2.2" rx="1" fill="#98A2B3" />
      <rect x="18" y="30" width="24" height="2.2" rx="1" fill="#98A2B3" />
      <rect x="18" y="36" width="26" height="2.2" rx="1" fill="#98A2B3" />
      <rect x="18" y="42" width="18" height="2.2" rx="1" fill="#98A2B3" />
      {/* Надпись TXT */}
      <text
        x="32"
        y="55"
        textAnchor="middle"
        fontSize="8.5"
        fontWeight="700"
        fill="#667085"
        fontFamily="-apple-system, BlinkMacSystemFont, sans-serif"
      >
        TXT
      </text>
    </svg>
  )
}
