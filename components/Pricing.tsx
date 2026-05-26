"use client"
import { motion } from 'framer-motion'

export default function Pricing() {
  const features = [
    "Consultation complète (30-45 min)",
    "Examen bucco-dentaire complet",
    "Diagnostic personnalisé",
    "Plan de traitement détaillé",
    "Support WhatsApp après la visite",
    "Garantie satisfaction"
  ]

  return (
    <section id="pricing" className="py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Tarifs transparents</h2>
          <p className="text-slate-400">Des prix clairs, sans surprise. Paiement sur place.</p>
        </div>

        <motion.div 
          initial={{opacity: 0, y: 20}} 
          whileInView={{opacity: 1, y: 0}} 
          viewport={{once: true}}
          className="glass rounded-3xl p-8 md:p-12 border-2 border-indigo-500/30 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold px-4 py-1 rounded-bl-xl">
            CONSULTATION
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                50 <span className="text-2xl text-slate-400">TND</span>
              </div>
              <p className="text-slate-400 mb-2">Consultation générale</p>
              <p className="text-emerald-400 text-sm font-medium mb-4">
                Paiement sur place — espèces ou carte
              </p>

              <a 
                href="/booking" 
                className="inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg shadow-lg shadow-indigo-500/25 hover:scale-105 transition"
              >
                Prendre rendez-vous
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </a>

              <p className="mt-4 text-sm text-slate-500">
                <span className="text-emerald-400">✓</span> Sans engagement · <span className="text-emerald-400">✓</span> Annulation gratuite
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Inclus dans la consultation:</h3>
              <ul className="space-y-3">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm">✓</span>
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-700/50">
            <p className="text-center text-slate-400 text-sm">
              <span className="text-emerald-400 font-semibold">Soins supplémentaires:</span> Détartrage 80 TND · Blanchiment 250 TND · Caries dès 100 TND
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
