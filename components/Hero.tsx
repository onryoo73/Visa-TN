"use client"
import { motion } from 'framer-motion'

function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="font-bold text-white"
    >
      {end}{suffix}
    </motion.span>
  )
}

export default function Hero(){
  const stats = [
    { value: 150, suffix: "+", label: "patients satisfaits" },
    { value: 8, suffix: "", label: "ans d'expérience" },
    { value: 99, suffix: "%", label: "clients satisfaits" },
    { value: 4.9, suffix: "", label: "avis ★" }
  ]

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 animated-gradient" aria-hidden />

      <div className="absolute -left-20 -top-10 w-72 h-72 rounded-full bg-gradient-to-tr from-med-500 via-med-600 to-teal-500 floating-circle opacity-40" />
      <div className="absolute right-8 bottom-0 w-56 h-56 rounded-full bg-gradient-to-br from-teal-500 via-med-600 to-cyan-400 floating-circle opacity-30" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <motion.div
              initial={{opacity:0, y:8}}
              animate={{opacity:1, y:0}}
              transition={{delay:0.02}}
              className="flex flex-wrap items-center gap-3 mb-4"
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-black/30 border border-med-400/40 text-[11px] uppercase tracking-[0.16em] text-med-200">
                Cabinet dentaire & soins
              </span>
            </motion.div>

            <motion.h1 initial={{opacity:0, y:12}} animate={{opacity:1, y:0}} transition={{delay:0.08}} className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight leading-tight text-white">
              Votre sourire, notre priorité
              <span className="block text-med-300">Soins dentaires de qualité en Tunisie.</span>
            </motion.h1>
            <motion.p initial={{opacity:0, y:12}} animate={{opacity:1, y:0}} transition={{delay:0.16}} className="mt-6 text-lg text-slate-300 max-w-xl">
              Consultation, détartrage, blanchiment et soins généraux — prenez rendez-vous en ligne en 1 minute. Nous vous accueillons dans un cadre moderne et sécurisé.
            </motion.p>

            <motion.div initial={{opacity:0, y:12}} animate={{opacity:1, y:0}} transition={{delay:0.24}} className="mt-8 flex flex-wrap items-center gap-4">
              <a href="/booking" className="inline-flex items-center px-6 py-3 rounded-2xl bg-gradient-to-r from-med-600 to-med-500 text-white font-medium glow-btn shadow-lg hover:scale-105 transform transition">
                Prendre rendez-vous
              </a>
              <a href="#features" className="inline-flex items-center px-5 py-3 rounded-2xl bg-transparent border border-slate-700 text-slate-300 hover:bg-white/5 transition">
                Nos services
              </a>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-800/80 border border-slate-600 px-4 py-2 text-sm font-medium text-slate-100">
                <span className="text-med-300">50 TND</span>
                <span className="text-slate-400">consultation</span>
              </span>
            </motion.div>

            <motion.div
              initial={{opacity:0, y:16}}
              animate={{opacity:1, y:0}}
              transition={{delay:0.3}}
              className="mt-6 flex flex-wrap gap-3 text-xs text-slate-300"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-black/30 border border-med-500/40 px-3 py-1.5">
                <span className="h-2 w-2 rounded-full bg-med-400 animate-pulse" />
                <span>Équipement moderne et stérilisé</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-black/30 border border-amber-500/40 px-3 py-1.5">
                <span className="text-amber-400">✓</span>
                <span>Prise en charge immédiate</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-black/30 border border-med-400/40 px-3 py-1.5">
                <svg className="w-4 h-4 text-med-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
                <span>Environnement sécurisé</span>
              </div>
            </motion.div>

            <motion.div
              initial={{opacity:0, y:20}}
              animate={{opacity:1, y:0}}
              transition={{delay:0.4}}
              className="mt-8 grid grid-cols-4 gap-4 pt-6 border-t border-slate-700/50"
            >
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{opacity:0, y:20}}
            whileInView={{opacity:1, y:0}}
            viewport={{once:true, amount:0.4}}
            transition={{delay:0.2}}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-med-500/20 via-transparent to-med-600/20 rounded-3xl blur-3xl -z-10" />
            <div className="relative overflow-hidden rounded-3xl border border-med-500/20 bg-gradient-to-br from-zinc-900/80 to-zinc-950/90 p-2">
              <img
                src="/Ultra-detailed_3D_female_dentist-2(1).png"
                alt="DocTN - Cabinet Dentaire"
                className="w-full h-auto rounded-2xl object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2">
                <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-xs text-med-300 border border-med-500/30">
                  🦷 Soins de qualité
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
