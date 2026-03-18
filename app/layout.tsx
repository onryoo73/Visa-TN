import '../styles/globals.css'
import { ReactNode } from 'react'
import SchemaMarkup from '../components/SchemaMarkup'
import { Analytics } from '@vercel/analytics/next'

export const metadata = {
  title: 'vCardTN — Carte Virtuelle Internationale & Visa Guide',
  description: 'vCardTN - Guide premium pour paiement en ligne et activation mondiale de cartes virtuelles.',
  keywords: ['vcardtn', 'carte virtuelle', 'visa', 'paiement en ligne', 'carte bancaire virtuelle'],
  verification: {
    google: '4351bPzEinu_WuQr1MI8Mt2oWTEgR_PGbPmpSmzm-OY',
  },
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <SchemaMarkup />
        {/* Favicon is now handled by metadata */}
      </head>
      <body className="antialiased">
        <main className="min-h-screen">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  )
}