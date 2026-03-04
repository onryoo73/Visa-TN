"use client"
import { motion } from 'framer-motion'

const features = [
  {title: 'Accès à vie', desc: 'Guide vidéo et ressources mises à jour à vie.', icon: '💎'},
  {title: 'KYC étape par étape', desc: 'Accompagnement complet pour éviter les blocages.', icon: '🛂'},
  {title: 'Prévention de blocage', desc: 'Conseils pratiques pour rester en conformité.', icon: '🛡️'},
  {title: 'Recharge instantanée', desc: 'Rechargez votre solde à tout moment.', icon: '⚡'}
]

export default function Features(){
  return (
    <section id="features" className="py-16">
      <h2 className="text-2xl font-semibold">Fonctionnalités</h2>
      <p className="mt-2 text-slate-400">Tout ce dont vous avez besoin pour utiliser une carte virtuelle en toute sérénité.</p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.article key={f.title} whileHover={{scale:1.03}} initial={{opacity:0, y:12}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay: i*0.08}} className="glass p-6 rounded-2xl soft-border">
            <div className="text-3xl">{f.icon}</div>
            <h3 className="mt-4 font-semibold text-white">{f.title}</h3>
            <p className="mt-2 text-slate-300 text-sm">{f.desc}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
