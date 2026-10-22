'use client'

import type { WindowApi } from './mac-window'
import { TrafficLights } from './traffic-lights'

export type PreviewItem = {
  title: string
  subtitle?: string
  description: string
  images: string[]
}

export function PreviewWindow({ api, item }: { api: WindowApi; item: PreviewItem | null }) {
  return (
    <div className="flex size-full flex-col bg-white">
      <div
        className="relative flex h-[52px] shrink-0 items-center border-b border-black/10 bg-[#F6F6F8] px-[20px]"
        onPointerDown={api.startDrag}
      >
        <TrafficLights active={api.active} onClose={api.close} onMinimize={api.minimize} onMaximize={api.toggleMaximize} />
        <div className="pointer-events-none absolute inset-x-[110px] flex flex-col items-center leading-tight">
          <span className="max-w-full truncate text-[13px] font-semibold text-black/85">{item?.title}</span>
          {item?.subtitle && <span className="max-w-full truncate text-[11px] text-black/45">{item.subtitle}</span>}
        </div>
      </div>

      {item && (
        <article className="mac-scroll flex-1 overflow-y-auto">
          <header className="mx-auto max-w-[640px] px-[28px] pt-[28px] pb-[22px]">
            <h1 className="text-[26px] leading-tight font-bold text-balance text-black/90">{item.title}</h1>
            {item.subtitle && <p className="mt-[4px] text-[13px] text-black/45">{item.subtitle}</p>}
            <p className="mt-[14px] text-[14px] leading-relaxed text-pretty text-black/75">{item.description}</p>
          </header>
          <div className="flex flex-col gap-[6px] pb-[6px]">
            {item.images.map((src, i) => (
              <img
                key={`${src}-${i}`}
                src={src}
                alt={`${item.title} — изображение ${i + 1}`}
                draggable={false}
                className="w-full object-cover"
              />
            ))}
          </div>
        </article>
      )}
    </div>
  )
}
