'use client'

import { ChevronLeft, ChevronRight, ExternalLink, PanelLeft, Plus, RotateCw, Search, Share, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { profile, safari } from '@/src/data/portfolioData'
import type { WindowApi } from './mac-window'
import { TrafficLights } from './traffic-lights'

type Tab = 'google' | 'wiki'

const SPECIAL_QUERY = 'самый крутой дизайнер на свете'
const BEHANCE_URL = 'https://www.behance.net/057e213b'

const googleUrl = (q: string) => `https://www.google.com/search?igu=1&q=${encodeURIComponent(q)}`

export function SafariWindow({ api }: { api: WindowApi }) {
  const [tab, setTab] = useState<Tab>('google')
  const [history, setHistory] = useState({ stack: [SPECIAL_QUERY], index: 0 })
  const [address, setAddress] = useState(SPECIAL_QUERY)
  const [reloadKey, setReloadKey] = useState(0)

  const query = history.stack[history.index]
  const isCoolestDesignerQuery =
    tab === 'google' &&
    (query.toLowerCase().trim() === SPECIAL_QUERY ||
      query.toLowerCase().includes('крутой дизайнер') ||
      query.toLowerCase().includes('лучший дизайнер'))

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
      {/* Шапка браузера Safari */}
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

      {/* Тело страницы: спец-выдача с Behance ИЛИ живой Google iframe */}
      {isCoolestDesignerQuery ? (
        <div key={reloadKey} className="flex-1 overflow-y-auto bg-white p-5 sm:p-8 text-left">
          {/* Поисковая шапка Google */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-b border-gray-200 pb-5">
            <div className="text-[26px] font-bold tracking-tight select-none shrink-0">
              <span className="text-[#4285F4]">G</span>
              <span className="text-[#EA4335]">o</span>
              <span className="text-[#FBBC05]">o</span>
              <span className="text-[#4285F4]">g</span>
              <span className="text-[#34A853]">l</span>
              <span className="text-[#EA4335]">e</span>
            </div>
            <form onSubmit={submit} className="flex w-full max-w-[520px] items-center rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm hover:shadow-md transition">
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Введите запрос в Google..."
                className="w-full text-[14px] text-gray-800 outline-none"
              />
              <button type="submit" className="text-[#4285F4] pl-2">
                <Search className="size-[18px]" />
              </button>
            </form>
          </div>

          <div className="mt-5 max-w-[640px] space-y-6">
            {/* Блок "Быстрый ответ ИИ / Google" */}
            <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-[#F4F8FF] to-[#EEF4FF] p-5 shadow-sm">
              <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#1a73e8] mb-3">
                <Sparkles className="size-[15px]" />
                <span>Быстрый ответ • По данным мирового дизайн-комьюнити</span>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="size-[60px] rounded-full object-cover border-2 border-white shadow-sm shrink-0 bg-gray-200"
                  />
                  <div>
                    <div className="text-[20px] font-bold text-gray-900 leading-tight">{profile.name}</div>
                    <div className="text-[13px] text-gray-600 mt-0.5">{profile.role}</div>
                    <div className="text-[11px] text-green-600 font-medium mt-1">● Доступна для новых проектов</div>
                  </div>
                </div>

                <a
                  href={BEHANCE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0057FF] px-4 py-2.5 text-[13px] font-semibold text-white shadow-sm hover:bg-[#0046CC] transition shrink-0"
                >
                  <span>Открыть Behance</span>
                  <ExternalLink className="size-[14px]" />
                </a>
              </div>
            </div>

            {/* Результат №1 — Behance */}
            <div className="group">
              <div className="flex items-center gap-2 text-[12px] text-gray-600">
                <span className="flex size-[22px] items-center justify-center rounded-full bg-[#0057FF] text-[10px] font-bold text-white">
                  Bē
                </span>
                <div className="leading-tight">
                  <div className="font-medium text-gray-800">Behance</div>
                  <div className="text-[11px] text-gray-500">{BEHANCE_URL}</div>
                </div>
              </div>

              <a
                href={BEHANCE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 inline-block text-[19px] font-medium text-[#1a0dab] hover:underline leading-snug"
              >
                {profile.name} — Официальное портфолио на Behance ↗
              </a>

              <p className="mt-1 text-[13.5px] leading-relaxed text-[#4d5156]">
                Вы искали <b>самого крутого дизайнера на свете</b> — и алгоритмы Google не могут врать. Упаковка, полиграфия, карточки товаров, мерч и фотореалистичные ИИ-генерации. Нажмите на ссылку, чтобы посмотреть полное портфолио на Behance.
              </p>
            </div>

            {/* Результат №2 — Пасхалка */}
            <div className="pt-2 border-t border-gray-100">
              <div className="text-[12px] text-gray-500">https://design-awards.org › top-designers</div>
              <a
                href={BEHANCE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-[17px] font-medium text-[#1a0dab] hover:underline"
              >
                Дизайнер, от чьих макетов типографии плачут от счастья
              </a>
              <p className="mt-1 text-[13px] leading-relaxed text-[#4d5156]">
                5+ лет опыта, профильное издательское дело, идеальная верстка и сдача макетов в печать с первого раза. Полный архив работ также доступен в профиле Behance.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <iframe
          key={`${src}-${reloadKey}`}
          src={src}
          title={tab === 'google' ? `Google: ${query}` : safari.wikiTitle}
          className="w-full flex-1 border-0 bg-white"
          referrerPolicy="no-referrer"
        />
      )}
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
