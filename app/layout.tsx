import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Портфолио — Brand & AI Designer',
  description: 'Интерактивное портфолио дизайнера в стиле macOS Sonoma: упаковка, AI-проекты, постеры и мерч.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/portfolio/favicon_light.png', media: '(prefers-color-scheme: light)' },
      { url: '/portfolio/favicon_dark.png', media: '(prefers-color-scheme: dark)' },
    ],
    apple: '/portfolio/favicon_light.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
