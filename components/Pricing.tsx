"use client"
import { motion } from 'framer-motion'

export default function Pricing() {
  const features = [
    "Appel 1:1 personnalisé (30-45 min)",
    "Configuration complète de ta carte",
    "Ajout à Apple Pay / Google Pay",
    "Guide d'utilisation des services",
    "Support WhatsApp après l'appel",
    "Garantie satisfait ou remboursé"
  ]

  return (
    <section id="pricing" className="py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Tarif simple, pas d'abonnement</h2>
          <p className="text-slate-400">Un seul paiement. Pas de frais cachés. Pas d'engagement.</p>
        </div>

        <motion.div 
          initial={{opacity: 0, y: 20}} 
          whileInView={{opacity: 1, y: 0}} 
          viewport={{once: true}}
          className="glass rounded-3xl p-8 md:p-12 border-2 border-indigo-500/30 relative overflow-hidden"
        >
          {/* Popular badge */}
          <div className="absolute top-0 right-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold px-4 py-1 rounded-bl-xl">
            POPULAIRE
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Price side */}
            <div className="text-center md:text-left">
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                100 <span className="text-2xl text-slate-400">TND</span>
              </div>
              <p className="text-slate-400 mb-6">Paiement unique, valable à vie</p>
              
              {/* Payment methods */}
              <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                <span className="text-slate-500 text-sm">Paiement via:</span>
                <img src="/flouci.png" alt="Flouci" className="h-6 w-auto" />
                <img src="/d17.png" alt="D17" className="h-6 w-auto" />
              </div>

              <a 
                href="/booking" 
                className="inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg shadow-lg shadow-indigo-500/25 hover:scale-105 transition"
              >
                Réserver mon appel
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </a>

              <p className="mt-4 text-sm text-slate-500">
                <span className="text-emerald-400">✓</span> Sans engagement · <span className="text-emerald-400">✓</span> Remboursable
              </p>
            </div>

            {/* Features side */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Ce qui est inclus:</h3>
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

          {/* Comparison */}
          <div className="mt-8 pt-8 border-t border-slate-700/50">
            <p className="text-center text-slate-400 text-sm">
              Comparé aux banques: <span className="text-slate-500 line-through">carte physique 80-150 TND + 20 TND/mois</span>
              <br />
              <span className="text-emerald-400 font-semibold">Vous économisez +500 TND par an</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
