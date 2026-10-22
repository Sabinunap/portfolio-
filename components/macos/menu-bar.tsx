'use client'

import { Wifi } from 'lucide-react'
import { useEffect, useState } from 'react'

const MENU_ITEMS = ['Файл', 'Правка', 'Вид', 'Переход', 'Окно', 'Справка']
const WEEKDAYS = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']

function formatClock(date: Date) {
  const hh = String(date.getHours()).padStart(2, '0')
  const mm = String(date.getMinutes()).padStart(2, '0')
  return `${WEEKDAYS[date.getDay()]} ${hh}:${mm}`
}

function useClock() {
  const [time, setTime] = useState<string | null>(null)
  useEffect(() => {
    const tick = () => setTime(formatClock(new Date()))
    tick()
    const id = setInterval(tick, 5000)
    return () => clearInterval(id)
  }, [])
  return time
}

function BatteryIcon() {
  return (
    <span aria-hidden="true" className="flex items-center">
      <span className="flex h-[11px] w-[22px] items-center rounded-[3px] border border-white/90 p-[1.5px]">
        <span className="h-full w-full rounded-[1.5px] bg-white" />
      </span>
      <span className="ml-[1px] h-[4px] w-[1.5px] rounded-r-sm bg-white/90" />
    </span>
  )
}

function ControlCenterIcon() {
  return (
    <span aria-hidden="true" className="flex flex-col gap-[2px]">
      <span className="flex h-[6px] w-[15px] items-center justify-end rounded-full border border-white/90 px-[1px]">
        <span className="size-[3px] rounded-full bg-white" />
      </span>
      <span className="flex h-[6px] w-[15px] items-center justify-start rounded-full bg-white px-[1px]">
        <span className="size-[3px] rounded-full bg-black/60" />
      </span>
    </span>
  )
}

export function MenuBar({ appName }: { appName: string }) {
  const time = useClock()

  return (
    <header
      className="fixed inset-x-0 top-0 z-[9500] flex h-[28px] items-center justify-between px-[10px] text-[13px] text-white select-none"
      style={{ background: 'rgba(20, 20, 22, 0.38)', backdropFilter: 'blur(30px) saturate(190%)', WebkitBackdropFilter: 'blur(30px) saturate(190%)' }}
    >
      <nav aria-label="Главное меню" className="flex min-w-0 items-center">
        <span className="flex h-[22px] items-center rounded-[4px] px-[10px] hover:bg-white/15">
          <img src="https://img.icons8.com/ios-filled/50/FFFFFF/mac-os.png" alt="Apple" className="h-[14px] w-[14px]" />
        </span>
        <span className="rounded-[4px] px-[9px] py-[2px] font-semibold hover:bg-white/15">{appName}</span>
        <ul className="hidden items-center md:flex">
          {MENU_ITEMS.map((item) => (
            <li key={item} className="rounded-[4px] px-[9px] py-[2px] hover:bg-white/15">
              {item}
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-[14px] pr-[4px]">
        <Wifi aria-label="Wi-Fi подключён" className="size-[15px]" strokeWidth={2.4} />
        <span className="flex items-center gap-[6px]">
          <span className="hidden sm:inline">100%</span>
          <BatteryIcon />
        </span>
        <ControlCenterIcon />
        <time className="min-w-[68px] text-right tabular-nums" suppressHydrationWarning>
          {time ?? ''}
        </time>
      </div>
    </header>
  )
}
