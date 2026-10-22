'use client'

type TrafficLightsProps = {
  active: boolean
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
}

const LIGHTS = [
  { key: 'close', label: 'Закрыть', bg: '#FF5F56', border: '#E0443E', symbol: '✕', size: '7px' },
  { key: 'minimize', label: 'Свернуть', bg: '#FFBD2E', border: '#DEA123', symbol: '−', size: '10px' },
  { key: 'maximize', label: 'Развернуть', bg: '#27C93F', border: '#1AAB29', symbol: '⤢', size: '8px' },
] as const

export function TrafficLights({ active, onClose, onMinimize, onMaximize }: TrafficLightsProps) {
  const handlers = { close: onClose, minimize: onMinimize, maximize: onMaximize }

  return (
    <div className="group/lights flex items-center gap-[8px]" onPointerDown={(e) => e.stopPropagation()}>
      {LIGHTS.map((light) => (
        <button
          key={light.key}
          type="button"
          aria-label={light.label}
          onClick={(e) => {
            e.stopPropagation()
            handlers[light.key]()
          }}
          className="traffic-light relative flex size-[12px] items-center justify-center rounded-full"
          style={{ '--tl-bg': light.bg, '--tl-border': light.border } as React.CSSProperties}
          data-active={active}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none leading-none font-bold text-black/60 opacity-0 transition-opacity group-hover/lights:opacity-100"
            style={{ fontSize: light.size }}
          >
            {light.symbol}
          </span>
        </button>
      ))}
    </div>
  )
}
