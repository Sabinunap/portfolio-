'use client'

import { ChevronLeft, ChevronRight, Folder, LayoutGrid, Search, Trash2 } from 'lucide-react'
import { folders, trash, type PortfolioCase } from '@/src/data/portfolioData'
import type { WindowApi } from './mac-window'
import { TrafficLights } from './traffic-lights'

export const TRASH_LOCATION = 'trash'

type FinderWindowProps = {
  api: WindowApi
  location: string
  canGoBack: boolean
  canGoForward: boolean
  onNavigate: (location: string) => void
  onBack: () => void
  onForward: () => void
  onOpenCase: (item: PortfolioCase) => void
}

function SidebarItem({
  label,
  icon,
  active,
  onClick,
}: {
  label: string
  icon: React.ReactNode
  active: boolean
  onClick: () => void
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        aria-current={active ? 'page' : undefined}
        className="flex h-[28px] w-full items-center gap-[7px] rounded-[6px] px-[8px] text-left text-[13px] text-black/85"
        style={{ background: active ? 'rgba(0,0,0,0.08)' : 'transparent' }}
      >
        {icon}
        <span className="truncate">{label}</span>
      </button>
    </li>
  )
}

export function FinderWindow({
  api,
  location,
  canGoBack,
  canGoForward,
  onNavigate,
  onBack,
  onForward,
  onOpenCase,
}: FinderWindowProps) {
  const isTrash = location === TRASH_LOCATION
  const folder = folders.find((f) => f.id === location)
  const title = isTrash ? 'Корзина' : (folder?.name ?? 'Finder')
  const items = isTrash ? trash : (folder?.cases ?? [])

  return (
    <div className="flex size-full">
      <aside
        className="flex w-[200px] shrink-0 flex-col backdrop-blur-2xl"
        style={{ background: 'rgba(235, 235, 240, 0.78)', borderRight: '1px solid rgba(0,0,0,0.1)' }}
      >
        <div className="flex h-[52px] shrink-0 items-center px-[20px]" onPointerDown={api.startDrag}>
          <TrafficLights active={api.active} onClose={api.close} onMinimize={api.minimize} onMaximize={api.toggleMaximize} />
        </div>
        <nav aria-label="Боковое меню Finder" className="mac-scroll flex-1 overflow-y-auto px-[10px] pb-[10px]">
          <p className="px-[8px] pt-[4px] pb-[4px] text-[11px] font-semibold text-black/40">Избранное</p>
          <ul className="flex flex-col gap-[1px]">
            {folders.map((f) => (
              <SidebarItem
                key={f.id}
                label={f.name}
                active={location === f.id}
                onClick={() => onNavigate(f.id)}
                icon={<Folder aria-hidden="true" className="size-[16px] shrink-0 text-[#0A84FF]" strokeWidth={1.8} />}
              />
            ))}
          </ul>
          <p className="px-[8px] pt-[14px] pb-[4px] text-[11px] font-semibold text-black/40">Система</p>
          <ul>
            <SidebarItem
              label="Корзина"
              active={isTrash}
              onClick={() => onNavigate(TRASH_LOCATION)}
              icon={<Trash2 aria-hidden="true" className="size-[16px] shrink-0 text-[#0A84FF]" strokeWidth={1.8} />}
            />
          </ul>
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col bg-white">
        <div
          className="flex h-[52px] shrink-0 items-center gap-[10px] border-b border-black/[0.06] px-[12px]"
          onPointerDown={api.startDrag}
        >
          <div className="flex items-center">
            <button
              type="button"
              aria-label="Назад"
              disabled={!canGoBack}
              onClick={onBack}
              className="flex size-[28px] items-center justify-center rounded-[6px] text-black/60 hover:bg-black/5 disabled:text-black/20 disabled:hover:bg-transparent"
            >
              <ChevronLeft className="size-[18px]" />
            </button>
            <button
              type="button"
              aria-label="Вперёд"
              disabled={!canGoForward}
              onClick={onForward}
              className="flex size-[28px] items-center justify-center rounded-[6px] text-black/60 hover:bg-black/5 disabled:text-black/20 disabled:hover:bg-transparent"
            >
              <ChevronRight className="size-[18px]" />
            </button>
          </div>
          <h2 className="truncate text-[15px] font-bold text-black/85">{title}</h2>
          <div className="ml-auto flex items-center gap-[4px] text-black/55">
            <span className="flex size-[28px] items-center justify-center rounded-[6px] bg-black/[0.06]">
              <LayoutGrid aria-hidden="true" className="size-[15px]" />
            </span>
            <span className="flex size-[28px] items-center justify-center">
              <Search aria-hidden="true" className="size-[15px]" />
            </span>
          </div>
        </div>

        <div className="mac-scroll flex-1 overflow-y-auto bg-[#FFFFFF] p-[18px]">
          {items.length === 0 ? (
            <p className="pt-16 text-center text-[13px] text-black/40">Папка пуста</p>
          ) : (
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(128px,1fr))] gap-x-[8px] gap-y-[18px]">
              {items.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onOpenCase(item)}
                    className="group flex w-full flex-col items-center gap-[6px] rounded-[8px] p-[6px] outline-none"
                  >
                    <span className="flex h-[92px] w-[112px] items-center justify-center rounded-[6px] p-[4px] group-hover:bg-black/[0.05] group-focus-visible:bg-black/[0.08]">
                      <img
                        src={item.cover}
                        alt=""
                        draggable={false}
                        className="max-h-full max-w-full rounded-[2px] object-cover shadow-[0_1px_4px_rgba(0,0,0,0.25)] ring-1 ring-black/5"
                      />
                    </span>
                    <span className="line-clamp-2 rounded-[4px] px-[4px] text-center text-[12px] leading-[15px] text-black/85 group-focus-visible:bg-[#0A60FF] group-focus-visible:text-white">
                      {item.title}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="flex h-[24px] shrink-0 items-center justify-center border-t border-black/[0.06] text-[11px] text-black/45">
          {`Объектов: ${items.length}`}
        </footer>
      </div>
    </div>
  )
}
