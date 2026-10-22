'use client'

import { ChevronLeft, ChevronRight, PanelLeft, Plus, RotateCw, Share } from 'lucide-react'
import { useState } from 'react'
import { safari } from '@/src/data/portfolioData'
import type { WindowApi } from './mac-window'
import { TrafficLights } from './traffic-lights'

type Tab = 'google' | 'wiki'

const googleUrl = (q: string) => `https://www.google.com/search?igu=1&q=${encodeURIComponent(q)}`

export function SafariWindow({ api }: { api: WindowApi }) {
  const [tab, setTab] = useState<Tab>('google')
  const [history, setHistory] = useState({ stack: [safari.defaultQuery], index: 0 })
  const [address, setAddress] = useState(safari.defaultQuery)
  const [reloadKey, setReloadKey] = useState(0)

  const query = history.stack[history.index]
  const src = tab === 'google' ? googleUrl(query) : safari.wikiUrl

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const q = address.trim()
    if (!q) return
    setTab('google')
    setHistory((h) => ({ stack: [...h.stack.slice(0, h.index + 1), q], index: h.index + 1 }))
    ;(document.activeElement as HTMLElement | null)?.blur()
  }

  const go = (delta: number) => {
    const index = history.index + delta
    if (index < 0 || index >= history.stack.length) return
    setTab('google')
    setHistory((h) => ({ ...h, index }))
    setAddress(history.stack[index])
  }

  const switchTab = (next: Tab) => {
    setTab(next)
    setAddress(next === 'google' ? query : safari.wikiUrl)
  }

  const canBack = tab === 'google' && history.index > 0
  const canForward = tab === 'google' && history.index < history.stack.length - 1

  return (
    <div className="flex size-full flex-col bg-white">
      <div className="shrink-0 bg-[#F1F1F4]" onPointerDown={api.startDrag}>
        <div className="flex h-[52px] items-center gap-[12px] px-[20px]">
          <TrafficLights active={api.active} onClose={api.close} onMinimize={api.minimize} onMaximize={api.toggleMaximize} />
          <PanelLeft aria-hidden="true" className="ml-[10px] hidden size-[17px] text-black/50 sm:block" />
          <div className="flex items-center">
            <button
              type="button"
              aria-label="Назад"
              disabled={!canBack}
              onClick={() => go(-1)}
              className="flex size-[26px] items-center justify-center rounded-[6px] text-black/60 hover:bg-black/5 disabled:text-black/20 disabled:hover:bg-transparent"
            >
              <ChevronLeft className="size-[18px]" />
            </button>
            <button
              type="button"
              aria-label="Вперёд"
              disabled={!canForward}
              onClick={() => go(1)}
              className="flex size-[26px] items-center justify-center rounded-[6px] text-black/60 hover:bg-black/5 disabled:text-black/20 disabled:hover:bg-transparent"
            >
              <ChevronRight className="size-[18px]" />
            </button>
          </div>

          <form onSubmit={submit} role="search" className="mx-auto flex w-full max-w-[460px] min-w-0 items-center">
            <label className="relative flex h-[30px] w-full items-center rounded-[8px] bg-white shadow-[0_0_0_0.5px_rgba(0,0,0,0.12),0_1px_1px_rgba(0,0,0,0.04)]">
              <span className="sr-only">Адресная строка</span>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onFocus={(e) => e.currentTarget.select()}
                className="w-full bg-transparent px-[30px] text-center text-[13px] text-black/85 outline-none focus:text-left"
                spellCheck={false}
                autoComplete="off"
              />
              <button
                type="button"
                aria-label="Обновить страницу"
                onClick={() => setReloadKey((k) => k + 1)}
                className="absolute right-[8px] text-black/45 hover:text-black/70"
              >
                <RotateCw className="size-[12px]" />
              </button>
            </label>
          </form>

          <div className="hidden items-center gap-[14px] text-black/50 sm:flex">
            <Share aria-hidden="true" className="size-[16px]" />
            <Plus aria-hidden="true" className="size-[17px]" />
          </div>
        </div>

        <div role="tablist" aria-label="Вкладки" className="flex h-[30px] gap-[1px] border-y border-black/[0.08] bg-[#E3E3E6]">
          <TabButton active={tab === 'google'} onClick={() => switchTab('google')} favicon="G" faviconClass="text-[#4285F4]">
            {`${query} — Google`}
          </TabButton>
          <TabButton active={tab === 'wiki'} onClick={() => switchTab('wiki')} favicon="W" faviconClass="font-serif text-black/80">
            {safari.wikiTitle}
          </TabButton>
        </div>
      </div>

      <iframe
        key={`${src}-${reloadKey}`}
        src={src}
        title={tab === 'google' ? `Google: ${query}` : safari.wikiTitle}
        className="w-full flex-1 border-0 bg-white"
        referrerPolicy="no-referrer"
      />
    </div>
  )
}

function TabButton({
  active,
  onClick,
  favicon,
  faviconClass,
  children,
}: {
  active: boolean
  onClick: () => void
  favicon: string
  faviconClass: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`flex min-w-0 flex-1 items-center justify-center gap-[6px] px-[12px] text-[12px] ${
        active ? 'bg-[#F1F1F4] text-black/85' : 'text-black/55 hover:bg-[#DADADE]'
      }`}
    >
      <span
        aria-hidden="true"
        className={`flex size-[14px] shrink-0 items-center justify-center rounded-[3px] bg-white text-[10px] font-bold shadow-[0_0_0_0.5px_rgba(0,0,0,0.15)] ${faviconClass}`}
      >
        {favicon}
      </span>
      <span className="truncate">{children}</span>
    </button>
  )
}
