'use client'

import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { desktopPhotos, folders, icons, type DesktopPhoto } from '@/src/data/portfolioData'

type DesktopLayerProps = {
  onBackgroundClick: () => void
  onOpenFolder: (folderId: string) => void
  onOpenPhoto: (photo: DesktopPhoto) => void
}

type Rect = { x: number; y: number; w: number; h: number }

const ITEM_GAP = 104

const desktopItems = [
  ...folders.map((f) => ({ kind: 'folder' as const, id: `folder-${f.id}`, name: f.name, folderId: f.id })),
  ...desktopPhotos.map((p) => ({ kind: 'photo' as const, id: `photo-${p.id}`, name: p.name, photo: p })),
]

export function DesktopLayer({ onBackgroundClick, onOpenFolder, onOpenPhoto }: DesktopLayerProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [band, setBand] = useState<Rect | null>(null)
  const bandStart = useRef<{ x: number; y: number } | null>(null)
  const iconRefs = useRef(new Map<string, HTMLElement>())

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

  const selectItem = (id: string, additive: boolean) => {
    setSelected((prev) => {
      if (additive) {
        const next = new Set(prev)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        return next
      }
      return prev.has(id) && prev.size > 1 ? prev : new Set([id])
    })
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
          return (
            <motion.li
              key={item.id}
              ref={(el) => {
                if (el) iconRefs.current.set(item.id, el)
                else iconRefs.current.delete(item.id)
              }}
              drag
              dragMomentum={false}
              whileDrag={{ zIndex: 20, cursor: 'grabbing' }}
              onPointerDown={(e) => {
                e.stopPropagation()
                onBackgroundClick()
                selectItem(item.id, e.metaKey || e.shiftKey)
              }}
              onDoubleClick={() => (item.kind === 'folder' ? onOpenFolder(item.folderId) : onOpenPhoto(item.photo))}
              onKeyDown={(e) => {
                if (e.key === 'Enter') item.kind === 'folder' ? onOpenFolder(item.folderId) : onOpenPhoto(item.photo)
              }}
              tabIndex={0}
              aria-selected={isSelected}
              aria-label={`${item.name}. Двойной клик, чтобы открыть`}
              className="pointer-events-auto absolute right-[22px] flex w-[96px] cursor-default flex-col items-center gap-[4px] outline-none select-none"
              style={{ top: 44 + index * ITEM_GAP }}
            >
              <span
                className="flex h-[70px] w-[76px] items-center justify-center rounded-[6px]"
                style={{ background: isSelected ? 'rgba(255, 255, 255, 0.22)' : 'transparent' }}
              >
                {item.kind === 'folder' ? (
                  <img src={icons.folder} alt="" draggable={false} className="size-[64px] object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]" />
                ) : (
                  <img
                    src={item.photo.src}
                    alt=""
                    draggable={false}
                    className="h-[48px] w-[62px] object-cover"
                    style={{ border: '3px solid white', boxShadow: '0 4px 10px rgba(0,0,0,0.35)' }}
                  />
                )}
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
            </motion.li>
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
