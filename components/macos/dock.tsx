'use client'

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { useRef, useState } from 'react'

export type DockItem = {
  id: string
  label: string
  icon: string
  isOpen?: boolean
  onClick: () => void
}

const BASE_SIZE = 50
const MAX_SIZE = 82
const WAVE_SIGMA = 62

function DockIcon({ item, mouseX }: { item: DockItem; mouseX: MotionValue<number> }) {
  const ref = useRef<HTMLButtonElement>(null)
  const [hovered, setHovered] = useState(false)

  const distance = useTransform(mouseX, (value) => {
    const bounds = ref.current?.getBoundingClientRect()
    if (!bounds || !Number.isFinite(value)) return Number.POSITIVE_INFINITY
    return value - bounds.x - bounds.width / 2
  })
  const targetSize = useTransform(distance, (d) => {
    if (!Number.isFinite(d)) return BASE_SIZE
    return BASE_SIZE + (MAX_SIZE - BASE_SIZE) * Math.exp(-(d * d) / (2 * WAVE_SIGMA * WAVE_SIGMA))
  })
  const size = useSpring(targetSize, { mass: 0.1, stiffness: 170, damping: 14 })

  return (
    <motion.button
      ref={ref}
      type="button"
      aria-label={item.label}
      onClick={item.onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ width: size, height: size }}
      className="relative flex shrink-0 items-end justify-center outline-none"
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            role="tooltip"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="pointer-events-none absolute -top-[38px] left-1/2 -translate-x-1/2 rounded-[6px] border border-white/20 px-[10px] py-[3px] text-[13px] whitespace-nowrap text-white shadow-lg"
            style={{ background: 'rgba(40, 40, 44, 0.72)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
      <img src={item.icon} alt="" draggable={false} className="size-full object-contain drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)]" />
      {item.isOpen && (
        <span aria-hidden="true" className="absolute -bottom-[7px] left-1/2 size-[4px] -translate-x-1/2 rounded-full bg-white/90" />
      )}
    </motion.button>
  )
}

export function Dock({ apps, trash }: { apps: DockItem[]; trash: DockItem }) {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY)

  return (
    <nav
      aria-label="Dock"
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
      className="fixed bottom-[10px] left-1/2 z-[9000] flex h-[68px] -translate-x-1/2 items-end gap-[6px] rounded-[22px] px-[9px] pb-[9px]"
      style={{
        background: 'rgba(255, 255, 255, 0.28)',
        backdropFilter: 'blur(25px) saturate(180%)',
        WebkitBackdropFilter: 'blur(25px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.35)',
      }}
    >
      {apps.map((item) => (
        <DockIcon key={item.id} item={item} mouseX={mouseX} />
      ))}
      <span aria-hidden="true" className="mx-[4px] mb-[2px] h-[46px] w-px shrink-0 self-end bg-white/30" />
      <DockIcon item={trash} mouseX={mouseX} />
    </nav>
  )
}
