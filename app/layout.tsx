import '../styles/globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Carte Virtuelle Internationale — Visa Guide',
  description: 'Guide premium pour paiement en ligne et activation mondiale de cartes virtuelles.',
  icons: {
    icon: '/favicon.png', // <- path to your favicon in /public
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        {/* Optional if you want to override metadata */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
      </head>
      <body className="antialiased">
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}