'use client'

import { ChevronLeft, ChevronRight, CreditCard, Lock, Search } from 'lucide-react'
import { profile } from '@/src/data/portfolioData'
import type { WindowApi } from './mac-window'
import { TrafficLights } from './traffic-lights'

const SECONDARY_ITEMS = [
  { label: 'Вход и безопасность', icon: Lock, color: '#8E8E93' },
  { label: 'Оплата и дедлайны', icon: CreditCard, color: '#34C759' },
]

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[3px] px-[14px] py-[10px] sm:flex-row sm:items-start sm:gap-[16px]">
      <span className="w-[140px] shrink-0 text-[13px] text-black/85">{label}</span>
      <span className="text-[13px] leading-snug text-black/55 sm:text-right sm:ml-auto">{children}</span>
    </div>
  )
}

export function SettingsWindow({ api }: { api: WindowApi }) {
  return (
    <div className="flex size-full">
      <aside
        className="hidden w-[210px] shrink-0 flex-col backdrop-blur-2xl sm:flex"
        style={{ background: 'rgba(235, 235, 240, 0.78)', borderRight: '1px solid rgba(0,0,0,0.1)' }}
      >
        <div className="flex h-[52px] shrink-0 items-center px-[20px]" onPointerDown={api.startDrag}>
          <TrafficLights active={api.active} onClose={api.close} onMinimize={api.minimize} onMaximize={api.toggleMaximize} />
        </div>
        <div className="px-[10px]">
          <label className="flex h-[28px] items-center gap-[5px] rounded-[7px] bg-black/[0.06] px-[7px]">
            <Search aria-hidden="true" className="size-[13px] text-black/40" />
            <span className="sr-only">Поиск в настройках</span>
            <input
              type="search"
              placeholder="Поиск"
              className="w-full bg-transparent text-[13px] text-black/85 outline-none placeholder:text-black/40"
            />
          </label>
        </div>
        <nav aria-label="Разделы настроек" className="mt-[10px] flex flex-col gap-[2px] px-[10px]">
          <div aria-current="page" className="flex items-center gap-[8px] rounded-[7px] bg-[#007AFF] px-[7px] py-[6px] text-white">
            <img src={profile.avatar} alt="" className="size-[30px] rounded-full object-cover" />
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate text-[13px] font-semibold">{profile.name}</span>
              <span className="text-[11px] text-white/80">Apple ID</span>
            </span>
          </div>
          <div className="my-[6px] h-px bg-black/[0.08]" />
          {SECONDARY_ITEMS.map(({ label, icon: Icon, color }) => (
            <div key={label} className="flex h-[28px] items-center gap-[8px] rounded-[7px] px-[7px] text-[13px] text-black/85">
              <span className="flex size-[20px] items-center justify-center rounded-[5px]" style={{ background: color }}>
                <Icon aria-hidden="true" className="size-[12px] text-white" strokeWidth={2.4} />
              </span>
              {label}
            </div>
          ))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col bg-[#F5F5F7]">
        <div className="flex h-[52px] shrink-0 items-center gap-[8px] px-[14px]" onPointerDown={api.startDrag}>
          <span className="sm:hidden">
            <TrafficLights active={api.active} onClose={api.close} onMinimize={api.minimize} onMaximize={api.toggleMaximize} />
          </span>
          <ChevronLeft aria-hidden="true" className="size-[18px] text-black/25" />
          <ChevronRight aria-hidden="true" className="size-[18px] text-black/25" />
          <h2 className="text-[15px] font-bold text-black/85">Apple ID</h2>
        </div>

        <div className="mac-scroll flex-1 overflow-y-auto px-[24px] pb-[28px]">
          <div className="mx-auto flex max-w-[480px] flex-col items-center">
            <img
              src={profile.avatar}
              alt={`Фото: ${profile.name}`}
              className="mt-[8px] size-[88px] rounded-full object-cover shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
            />
            <h1 className="mt-[10px] text-[20px] font-bold text-black/90">{profile.name}</h1>
            <p className="text-[13px] text-black/50">{profile.role}</p>

            <div className="mt-[20px] w-full divide-y divide-black/5 rounded-[10px] border border-black/5 bg-white">
              <InfoRow label="О себе">{profile.about}</InfoRow>
              <InfoRow label="Стек и программы">{profile.stack}</InfoRow>
              <InfoRow label="Статус">
                <span className="inline-flex items-center gap-[6px]">
                  <span aria-hidden="true" className="size-[9px] rounded-full bg-[#34C759]" />
                  {profile.status}
                </span>
              </InfoRow>
            </div>

            <a
              href={profile.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-[18px] rounded-[7px] bg-[#007AFF] px-[16px] py-[5px] text-[13px] font-medium text-white shadow-[0_1px_2px_rgba(0,0,0,0.15)] hover:bg-[#0069DB]"
            >
              {profile.telegramButton}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
