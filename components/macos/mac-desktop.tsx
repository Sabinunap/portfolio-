'use client'

import { useRef, useState } from 'react'
import { folders, icons, profile, wallpaper, type DesktopPhoto, type PortfolioCase } from '@/src/data/portfolioData'
import { DesktopLayer } from './desktop-layer'
import { Dock } from './dock'
import { FinderWindow, TRASH_LOCATION } from './finder-window'
import { MacWindow } from './mac-window'
import { MenuBar } from './menu-bar'
import { PreviewWindow, type PreviewItem } from './preview-window'
import { SafariWindow } from './safari-window'
import { SettingsWindow } from './settings-window'

type AppId = 'finder' | 'safari' | 'settings' | 'preview'
type WindowState = { open: boolean; minimized: boolean; z: number }

const APP_NAMES: Record<AppId, string> = {
  finder: 'Finder',
  safari: 'Safari',
  settings: 'Системные настройки',
  preview: 'Просмотр',
}

const closed: WindowState = { open: false, minimized: false, z: 100 }

export function MacDesktop() {
  const zCounter = useRef(110)
  const [windows, setWindows] = useState<Record<AppId, WindowState>>({
    finder: { open: true, minimized: false, z: 101 },
    safari: closed,
    settings: closed,
    preview: closed,
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

      <DesktopLayer onBackgroundClick={() => setActiveApp(null)} onOpenFolder={openFinderAt} onOpenPhoto={openPhoto} />

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
