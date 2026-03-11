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
            <motion.p
              initial={{opacity:0, y:8}}
              animate={{opacity:1, y:0}}
              transition={{delay:0.02}}
              className="inline-flex items-center px-3 py-1 rounded-full bg-black/30 border border-indigo-400/40 text-[11px] uppercase tracking-[0.16em] text-indigo-100"
            >
              Carte virtuelle & paiements en ligne
            </motion.p>

            <motion.h1 initial={{opacity:0, y:12}} animate={{opacity:1, y:0}} transition={{delay:0.08}} className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight leading-tight text-white">
              Active ta carte virtuelle
              <span className="block text-indigo-300">et paye partout en ligne.</span>
            </motion.h1>
            <motion.p initial={{opacity:0, y:12}} animate={{opacity:1, y:0}} transition={{delay:0.16}} className="mt-6 text-lg text-slate-300 max-w-xl">
              Ta carte virtuelle opérationnelle en un appel — sans te perdre dans les tutos. On fait tout ensemble en direct : activation, paramétrage, et tes questions.
            </motion.p>

            <motion.div initial={{opacity:0, y:12}} animate={{opacity:1, y:0}} transition={{delay:0.24}} className="mt-8 flex flex-wrap items-center gap-4">
              <a href="/booking" className="inline-flex items-center px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium glow-btn shadow-lg hover:scale-105 transform transition">
                Réserver mon appel
              </a>
              <a href="#features" className="inline-flex items-center px-5 py-3 rounded-2xl bg-transparent border border-slate-700 text-slate-300 hover:bg-white/5 transition">
                Voir ce qui est inclus
              </a>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-800/80 border border-slate-600 px-4 py-2 text-sm font-medium text-slate-100">
                <span className="text-indigo-300">100 TND</span>
                <span className="text-slate-400">— une fois, pas d’abonnement</span>
              </span>
            </motion.div>

            <motion.div
              initial={{opacity:0, y:16}}
              animate={{opacity:1, y:0}}
              transition={{delay:0.3}}
              className="mt-6 flex flex-wrap gap-3 text-xs text-slate-300"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-black/30 border border-emerald-500/40 px-3 py-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Appel 1:1 avec moi, pas un bot</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-black/30 border border-amber-500/40 px-3 py-1.5">
                <span className="text-amber-400">✓</span>
                <span>Garantie : remboursé si on n’avance pas</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{opacity:0, y:20}}
            whileInView={{opacity:1, y:0}}
            viewport={{once:true, amount:0.4}}
            transition={{delay:0.2}}
            className="p-6 glass rounded-2xl soft-border"
          >
            <div className="text-sm text-slate-300">Aperçu du tableau de bord</div>
            <div className="mt-4 bg-zinc-900 rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">Carte virtuelle</div>
                  <div className="text-lg font-semibold">Visa •••• 4242</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Solde disponible</div>
                  <div className="text-lg font-semibold">€1,250.00</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="rounded-lg bg-slate-900/80 border border-slate-700 px-3 py-2">
                  <div className="text-slate-400">Abonnements</div>
                  <div className="mt-1 font-semibold text-slate-100">Netflix, Spotify…</div>
                </div>
                <div className="rounded-lg bg-slate-900/80 border border-slate-700 px-3 py-2">
                  <div className="text-slate-400">Ads</div>
                  <div className="mt-1 font-semibold text-slate-100">Meta, TikTok</div>
                </div>
                <div className="rounded-lg bg-slate-900/80 border border-slate-700 px-3 py-2">
                  <div className="text-slate-400">SaaS</div>
                  <div className="mt-1 font-semibold text-slate-100">ChatGPT, Canva</div>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                <span>Après l’appel</span>
                <span className="text-emerald-300">Carte prête à utiliser</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
