"use client"
import { motion } from 'framer-motion'

export default function Hero(){
  return (
    <section className="relative py-24">
      <div className="absolute inset-0 -z-10 animated-gradient" aria-hidden />

      <div className="absolute -left-20 -top-10 w-72 h-72 rounded-full bg-gradient-to-tr from-blue-500 via-purple-600 to-indigo-500 floating-circle opacity-40" />
      <div className="absolute right-8 bottom-0 w-56 h-56 rounded-full bg-gradient-to-br from-indigo-500 via-purple-600 to-blue-400 floating-circle opacity-30" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h1 initial={{opacity:0, y:12}} animate={{opacity:1, y:0}} transition={{delay:0.05}} className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight text-white">
              Carte Virtuelle Internationale
            </motion.h1>
            <motion.p initial={{opacity:0, y:12}} animate={{opacity:1, y:0}} transition={{delay:0.12}} className="mt-6 text-lg text-slate-300 max-w-xl">
              Payez Netflix, Amazon, Apple/Google Pay, freelancing et plus — guide complet pour activer et utiliser votre carte virtuelle en toute sécurité.
            </motion.p>

            <motion.div initial={{opacity:0, y:12}} animate={{opacity:1, y:0}} transition={{delay:0.18}} className="mt-8 flex gap-4">
              <a href="#" className="inline-flex items-center px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium glow-btn shadow-lg hover:scale-105 transform transition">
                Get Started
              </a>
              <a href="#features" className="inline-flex items-center px-5 py-3 rounded-2xl bg-transparent border border-slate-700 text-slate-300 hover:bg-white/2 transition">
                En savoir plus
              </a>
            </motion.div>
          </div>

          <motion.div initial={{opacity:0, y:12}} animate={{opacity:1, y:0}} transition={{delay:0.2}} className="p-6 glass rounded-2xl soft-border">
            <div className="text-sm text-slate-300">Exemple d'utilisation</div>
            <div className="mt-4 bg-zinc-900 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">Carte</div>
                  <div className="text-lg font-semibold">Visa •••• 4242</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Solde</div>
                  <div className="text-lg font-semibold">€1,250</div>
                </div>
              </div>
              <div className="mt-4 text-sm text-slate-400">Activée pour: Netflix, Amazon, Ads</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
