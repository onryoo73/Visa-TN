import '../styles/globals.css'
import { ReactNode } from 'react'
import SchemaMarkup from '../components/SchemaMarkup'
import Navbar from '../components/Navbar'
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: 'DocTN — Cabinet Dentaire & Soins Dentaires en Tunisie',
  description: 'DocTN - Soins dentaires professionnels en Tunisie. Consultation, détartrage, blanchiment et soins pour toute la famille.',
  keywords: ['doctn', 'cabinet dentaire', 'dentiste tunisie', 'soins dentaires', 'détartrage', 'blanchiment dentaire', 'consultation dentaire', 'rendez-vous dentiste', 'tunisie dentiste'],
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
      </head>
      <body className="antialiased">
        <Navbar />
        <main className="min-h-screen">
          {children}
          <Analytics />
        </main>
      </body>
    </html>
  )
}