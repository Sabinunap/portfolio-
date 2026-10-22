'use client'

import { AnimatePresence, motion, useDragControls, useMotionValue } from 'framer-motion'
import { useState, type ReactNode } from 'react'

export type WindowApi = {
  startDrag: (e: React.PointerEvent) => void
  close: () => void
  minimize: () => void
  toggleMaximize: () => void
  active: boolean
}

type MacWindowProps = {
  label: string
  open: boolean
  minimized: boolean
  active: boolean
  zIndex: number
  width: number
  height: number
  offset?: { x: number; y: number }
  onFocus: () => void
  onClose: () => void
  onMinimize: () => void
  children: (api: WindowApi) => ReactNode
}

const WINDOW_SHADOW = '0 25px 60px -10px rgba(0, 0, 0, 0.45)'
const WINDOW_INNER_BORDER = '0 0 0 0.5px rgba(255, 255, 255, 0.4) inset'

export function MacWindow({
  label,
  open,
  minimized,
  active,
  zIndex,
  width,
  height,
  offset = { x: 0, y: 0 },
  onFocus,
  onClose,
  onMinimize,
  children,
}: MacWindowProps) {
  const controls = useDragControls()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [maximized, setMaximized] = useState(false)
  const [dragging, setDragging] = useState(false)

  const startDrag = (e: React.PointerEvent) => {
    if (maximized) return
    if ((e.target as HTMLElement).closest('button, input, a, [data-no-drag]')) return
    controls.start(e)
  }

  const toggleMaximize = () => {
    x.set(0)
    y.set(0)
    setMaximized((m) => !m)
  }

  const geometry: React.CSSProperties = maximized
    ? { left: 0, top: 28, width: '100vw', height: 'calc(100dvh - 28px)' }
    : {
        left: `max(8px, calc(50% - ${width / 2}px + ${offset.x}px))`,
        top: `max(36px, calc(50% - ${height / 2}px + ${offset.y}px - 40px))`,
        width: `min(${width}px, calc(100vw - 16px))`,
        height: `min(${height}px, calc(100dvh - 130px))`,
      }

  return (
    <AnimatePresence>
      {open && (
        <motion.section
          role="dialog"
          aria-label={label}
          drag
          dragListener={false}
          dragControls={controls}
          dragMomentum={false}
          onDragStart={() => setDragging(true)}
          onDragEnd={() => setDragging(false)}
          onPointerDownCapture={onFocus}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className={`fixed ${dragging ? '[&_iframe]:pointer-events-none' : ''} ${
            minimized ? 'pointer-events-none' : ''
          }`}
          style={{ ...geometry, x, y, zIndex }}
        >
          <motion.div
            initial={false}
            animate={minimized ? { opacity: 0, scale: 0.25, y: 420 } : { opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="relative size-full overflow-hidden rounded-[12px]"
            style={{ boxShadow: WINDOW_SHADOW }}
          >
            {children({ startDrag, close: onClose, minimize: onMinimize, toggleMaximize, active })}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[12px]"
              style={{ boxShadow: WINDOW_INNER_BORDER }}
            />
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}
