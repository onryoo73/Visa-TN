"use client"
import { useCallback } from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [lang, setLang] = useState<'fr' | 'en'>('fr')
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const toggleLang = () => setLang(l => l === 'fr' ? 'en' : 'fr')

  const handleHashClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault()
    setMobileOpen(false)
    if (pathname === '/') {
      const el = document.getElementById(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        history.pushState(null, '', `/#${hash}`)
      }
    } else {
      router.push(`/#${hash}`)
    }
  }, [pathname, router])

  return (
    <nav className="relative z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-white">DocTN</span>
            <span className="text-[10px] uppercase tracking-widest text-med-400 border border-med-500/30 px-2 py-0.5 rounded-full">
              {lang === 'fr' ? 'Cabinet' : 'Clinic'}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="/#features" onClick={e => handleHashClick(e, 'features')} className="text-sm text-slate-400 hover:text-med-400 transition">
              {lang === 'fr' ? 'Services' : 'Services'}
            </a>
            <Link href="/blog" className="text-sm text-slate-400 hover:text-med-400 transition">
              Blog
            </Link>
            <Link href="/booking" className="text-sm text-slate-400 hover:text-med-400 transition">
              {lang === 'fr' ? 'Rendez-vous' : 'Booking'}
            </Link>
            <a href="/#faq" onClick={e => handleHashClick(e, 'faq')} className="text-sm text-slate-400 hover:text-med-400 transition">
              FAQ
            </a>

            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-700 text-xs font-medium text-slate-300 hover:border-med-500/50 hover:text-med-400 transition"
            >
              <span className={lang === 'fr' ? 'text-med-400' : 'text-slate-500'}>FR</span>
              <span className="text-slate-600">/</span>
              <span className={lang === 'en' ? 'text-med-400' : 'text-slate-500'}>EN</span>
            </button>

            <Link
              href="/booking"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-med-600 to-med-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-med-500/25 transition-all hover:scale-105"
            >
              {lang === 'fr' ? 'Prendre RDV' : 'Book Now'}
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden pb-4 border-t border-white/5 pt-4 space-y-3"
          >
            <a href="/#features" onClick={e => { handleHashClick(e, 'features') }} className="block text-sm text-slate-400 hover:text-med-400 transition py-2">
              {lang === 'fr' ? 'Services' : 'Services'}
            </a>
            <Link href="/blog" onClick={() => setMobileOpen(false)} className="block text-sm text-slate-400 hover:text-med-400 transition py-2">
              Blog
            </Link>
            <Link href="/booking" onClick={() => setMobileOpen(false)} className="block text-sm text-slate-400 hover:text-med-400 transition py-2">
              {lang === 'fr' ? 'Rendez-vous' : 'Booking'}
            </Link>
            <a href="/#faq" onClick={e => { handleHashClick(e, 'faq') }} className="block text-sm text-slate-400 hover:text-med-400 transition py-2">
              FAQ
            </a>

            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={toggleLang}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-700 text-xs font-medium text-slate-300"
              >
                <span className={lang === 'fr' ? 'text-med-400' : 'text-slate-500'}>FR</span>
                <span className="text-slate-600">/</span>
                <span className={lang === 'en' ? 'text-med-400' : 'text-slate-500'}>EN</span>
              </button>
              <Link
                href="/booking"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-med-600 to-med-500 text-white text-sm font-semibold"
              >
                {lang === 'fr' ? 'Prendre RDV' : 'Book Now'}
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
