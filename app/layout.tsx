import '../styles/globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Carte Virtuelle Internationale — Visa Guide',
  description: 'Guide premium pour paiement en ligne et activation mondiale de cartes virtuelles.'
}

export default function RootLayout({ children }: { children: ReactNode }){
  return (
    <html lang="fr">
      <body className="antialiased">
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
