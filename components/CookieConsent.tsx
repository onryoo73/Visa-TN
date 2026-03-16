"use client"
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user already accepted
    const accepted = localStorage.getItem('cookie-consent')
    if (!accepted) {
      // Show after a small delay
      const timer = setTimeout(() => setIsVisible(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'true')
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-zinc-900/95 backdrop-blur-md border-t border-zinc-700 p-4"
        >
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-slate-300">
              <p>
                🍪 Nous utilisons des cookies pour améliorer votre expérience et analyser le trafic. 
                En continuant à utiliser ce site, vous acceptez notre 
                <a href="/privacy" className="text-indigo-400 hover:underline ml-1">politique de confidentialité</a>.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button 
                onClick={accept}
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
              >
                Accepter
              </button>
              <button 
                onClick={accept}
                className="px-5 py-2 text-slate-400 hover:text-white transition"
              >
                Refuser
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
