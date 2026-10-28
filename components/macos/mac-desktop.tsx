'use client'

import { useRef, useState } from 'react'
import { folders, icons, profile, wallpaper, type DesktopPhoto, type PortfolioCase } from '@/src/data/portfolioData'
import { DesktopLayer } from './desktop-layer'
import { Dock } from './dock'
import { FinderWindow, TRASH_LOCATION } from './finder-window'
import { MacWindow, type WindowApi } from './mac-window'
import { MenuBar } from './menu-bar'
import { PreviewWindow, type PreviewItem } from './preview-window'
import { SafariWindow } from './safari-window'
import { SettingsWindow } from './settings-window'
import { TrafficLights } from './traffic-lights'

/* =====================================================================
 *  📝 ТЕКСТ ДЛЯ ФАЙЛА «обо_мне.txt» НА РАБОЧЕМ СТОЛЕ
 *  Можешь менять или дополнять эти абзацы как угодно!
 * ===================================================================== */
const ABOUT_ME_TXT = {
  fileName: 'обо_мне.txt',
  greeting: 'Привет! Меня зовут Сабина! Здесь поподробнее расскажу о себе',
  paragraphs: [
    {
      title: 'Как всё начиналось',
      text: 'Я с детства занималась спортом, но в какой то момент поняла что хочу построить карьеру в другой сфере и пошла заниматься в художку. Программы начала изучать сама, по собственной прихоти и интересу. Помню, как впервые открыла фотошоп и просидела за ним 8 часов чтобы просто написать элементарную надпись и нарисовать простеший узор кистью). Сразу пошла практиковаться на фриланс и 4 года делала самые разные задачи: постеры, баннеры, карточки товаров, визитки и тд. Помимо этого, естественно, делала разные открытки/постеры друзьям и знакомым, редактировала им фотки.',
    },
    {
      title: 'Образование и понимание верстки',
      text: 'Параллельно я 4 года проучилась в Московсом издательско-полиграфическом колледже на специальности «Издательское дело». Благодаря этому у меня есть крепкая база: я понимаю правила верстки, типографику и все нюансы допечатной подготовки.',
    },
    {
      title: 'Опыт полного ведения визуала в компании',
      text: 'Помимо фриланса, у меня есть опыт работы внутри компании, где я начинала с карточек на маркетплейсы, а в последствии полностью закрывала вообще весь визуал: от карточек товаров до дизайна упаковки, подготовки макетов ежедневников и гравировки на флешки.',
    },
    {
      title: 'Нейросети и ИИ',
      text: 'С появлением ИИ плотно слежу за этой темой и постоянно практикуюсь. Делаю реалистичные генерации (в том числе с реальными лицами) и активно использую нейросети в работе, чтобы ускорять процессы. Пробую и изучаю разные нейросети для разных задач.',
    },
  ],
}

type AppId = 'finder' | 'safari' | 'settings' | 'preview' | 'textedit'
type WindowState = { open: boolean; minimized: boolean; z: number }

const APP_NAMES: Record<AppId, string> = {
  finder: 'Finder',
  safari: 'Safari',
  settings: 'Системные настройки',
  preview: 'Просмотр',
  textedit: 'Текстовый редактор',
}

const closed: WindowState = { open: false, minimized: false, z: 100 }

export function MacDesktop() {
  const zCounter = useRef(110)
  const [windows, setWindows] = useState<Record<AppId, WindowState>>({
    finder: closed,
    safari: closed,
    settings: closed,
    preview: closed,
    textedit: closed,
  })
  const [activeApp, setActiveApp] = useState<AppId | null>('finder')
  const [finderNav, setFinderNav] = useState({ stack: [folders[0]?.id ?? TRASH_LOCATION], index: 0 })
  const [previewItem, setPreviewItem] = useState<PreviewItem | null>(null)

  const updateWindow = (id: AppId, patch: Partial<WindowState>) =>
    setWindows((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }))

  const focus = (id: AppId) => {
    setActiveApp(id)
    if (windows[id].z === zCounter.current) return
    zCounter.current += 1
    updateWindow(id, { z: zCounter.current })
  }

  const openApp = (id: AppId) => {
    zCounter.current += 1
    updateWindow(id, { open: true, minimized: false, z: zCounter.current })
    setActiveApp(id)
  }

  const closeApp = (id: AppId) => {
    updateWindow(id, { open: false, minimized: false })
    setActiveApp(null)
  }

  const minimizeApp = (id: AppId) => {
    updateWindow(id, { minimized: true })
    setActiveApp(null)
  }

  const navigateFinder = (location: string) =>
    setFinderNav((nav) =>
      nav.stack[nav.index] === location
        ? nav
        : { stack: [...nav.stack.slice(0, nav.index + 1), location], index: nav.index + 1 },
    )

  const openFinderAt = (location: string) => {
    navigateFinder(location)
    openApp('finder')
  }

  const openPreview = (item: PreviewItem) => {
    setPreviewItem(item)
    openApp('preview')
  }

  const openCase = (c: PortfolioCase) =>
    openPreview({ title: c.title, subtitle: c.subtitle, description: c.description, images: c.images })

  const openPhoto = (p: DesktopPhoto) => openPreview({ title: p.name, description: p.description, images: [p.src] })

  const windowProps = (id: AppId) => ({
    open: windows[id].open,
    minimized: windows[id].minimized,
    zIndex: windows[id].z,
    active: activeApp === id && !windows[id].minimized,
    onFocus: () => focus(id),
    onClose: () => closeApp(id),
    onMinimize: () => minimizeApp(id),
  })

  const isRunning = (id: AppId) => windows[id].open

  return (
    <main
      className="relative h-dvh w-screen overflow-hidden bg-cover bg-center select-none"
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      <h1 className="sr-only">{`${profile.name} — портфолио дизайнера`}</h1>
      <MenuBar appName={activeApp ? APP_NAMES[activeApp] : 'Finder'} />

      <DesktopLayer
        onBackgroundClick={() => setActiveApp(null)}
        onOpenFolder={openFinderAt}
        onOpenPhoto={openPhoto}
        onOpenNote={() => openApp('textedit')}
      />

      <MacWindow label="Finder" width={820} height={500} offset={{ x: -60, y: -10 }} {...windowProps('finder')}>
        {(api) => (
          <FinderWindow
            api={api}
            location={finderNav.stack[finderNav.index]}
            canGoBack={finderNav.index > 0}
            canGoForward={finderNav.index < finderNav.stack.length - 1}
            onNavigate={navigateFinder}
            onBack={() => setFinderNav((n) => ({ ...n, index: Math.max(0, n.index - 1) }))}
            onForward={() => setFinderNav((n) => ({ ...n, index: Math.min(n.stack.length - 1, n.index + 1) }))}
            onOpenCase={openCase}
          />
        )}
      </MacWindow>

      <MacWindow label="Системные настройки" width={760} height={540} offset={{ x: -30, y: 0 }} {...windowProps('settings')}>
        {(api) => <SettingsWindow api={api} />}
      </MacWindow>

      <MacWindow label="Safari" width={940} height={600} offset={{ x: 0, y: 10 }} {...windowProps('safari')}>
        {(api) => <SafariWindow api={api} />}
      </MacWindow>

      <MacWindow label="Просмотр" width={780} height={580} offset={{ x: 40, y: 20 }} {...windowProps('preview')}>
        {(api) => <PreviewWindow api={api} item={previewItem} />}
      </MacWindow>

      {/* Новое окно маковского Блокнота (TextEdit) для файла обо_мне.txt */}
      <MacWindow label="Текстовый редактор" width={680} height={540} offset={{ x: 25, y: -15 }} {...windowProps('textedit')}>
        {(api) => <TextEditWindow api={api} />}
      </MacWindow>

      <Dock
        apps={[
          { id: 'finder', label: 'Finder', icon: icons.finder, isOpen: isRunning('finder'), onClick: () => openApp('finder') },
          { id: 'safari', label: 'Safari', icon: icons.safari, isOpen: isRunning('safari'), onClick: () => openApp('safari') },
          {
            id: 'settings',
            label: 'Системные настройки',
            icon: icons.settings,
            isOpen: isRunning('settings'),
            onClick: () => openApp('settings'),
          },
          {
            id: 'telegram',
            label: 'Telegram',
            icon: icons.telegram,
            onClick: () => window.open(profile.telegramUrl, '_blank', 'noopener,noreferrer'),
          },
        ]}
        trash={{ id: 'trash', label: 'Корзина', icon: icons.trash, onClick: () => openFinderAt(TRASH_LOCATION) }}
      />
    </main>
  )
}

/** Окно маковского Блокнота (TextEdit) */
function TextEditWindow({ api }: { api: WindowApi }) {
  return (
    <div className="flex size-full flex-col bg-white">
      {/* Верхняя шапка окна TextEdit */}
      <div
        className="flex h-[42px] shrink-0 items-center justify-between border-b border-black/10 bg-[#F3F3F5] px-[16px]"
        onPointerDown={api.startDrag}
      >
        <div className="w-[70px]">
          <TrafficLights active={api.active} onClose={api.close} onMinimize={api.minimize} onMaximize={api.toggleMaximize} />
        </div>
        <div className="flex items-center gap-[6px] text-[13px] font-semibold text-black/80">
          <span>📄</span>
          <span>{ABOUT_ME_TXT.fileName}</span>
          <span className="text-[11px] font-normal text-black/40">— Изменено</span>
        </div>
        <div className="w-[70px]" />
      </div>

      {/* Панель форматирования как в маковском TextEdit */}
      <div className="flex h-[34px] shrink-0 items-center gap-[10px] border-b border-black/10 bg-[#FAFAFC] px-[16px] text-[12px] text-black/70">
        <div className="rounded border border-black/15 bg-white px-2.5 py-0.5 text-[11px] font-medium shadow-2xs">
          SF Pro Text
        </div>
        <div className="rounded border border-black/15 bg-white px-2 py-0.5 text-[11px] font-medium shadow-2xs">
          14
        </div>
        <div className="h-[16px] w-[1px] bg-black/10" />
        <div className="flex items-center gap-1 font-serif text-[13px]">
          <span className="rounded bg-black/8 px-2 py-0.5 font-bold">B</span>
          <span className="px-2 py-0.5 italic">I</span>
          <span className="px-2 py-0.5 underline">U</span>
        </div>
      </div>

      {/* Линейка сверху как в настоящем TextEdit */}
      <div className="flex h-[18px] shrink-0 items-end border-b border-black/10 bg-[#F5F5F7] px-[24px] text-[9px] text-black/35 select-none">
        <div className="flex w-full justify-between">
          <span>0</span>
          <span>2</span>
          <span>4</span>
          <span>6</span>
          <span>8</span>
          <span>10</span>
          <span>12</span>
          <span>14</span>
          <span>16</span>
        </div>
      </div>

      {/* Сам текстовый документ (можно даже выделять и дописывать текст прямо на сайте!) */}
      <div
        contentEditable
        suppressContentEditableWarning
        spellCheck={false}
        className="flex-1 overflow-y-auto bg-white px-6 py-7 sm:px-10 sm:py-8 text-[14.5px] leading-[1.65] text-black/85 outline-none selection:bg-[#B4D5FE]"
      >
        <p className="text-[17px] font-semibold text-black mb-5">{ABOUT_ME_TXT.greeting}</p>

        <div className="space-y-5">
          {ABOUT_ME_TXT.paragraphs.map((item, i) => (
            <div key={i}>
              <h3 className="font-semibold text-black text-[15px] mb-1">{item.title}</h3>
              <p className="text-black/80">{item.text}</p>
            </div>
          ))}
        </div>

        <p className="mt-7 pt-4 border-t border-black/10 text-[13px] text-black/50">
          Связаться со мной можно через иконку Telegram в нижнем Доке →
        </p>
      </div>
    </div>
  )
}
