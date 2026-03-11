"use client"
import { motion } from 'framer-motion'

const features = [
  {title: 'Appel 1:1 personnalisé', desc: 'On regarde ta situation ensemble et on te propose la meilleure solution pour toi.', icon: '🎧'},
  {title: 'Mise en place guidée', desc: 'Pendant l’appel, on te montre exactement quoi faire étape par étape.', icon: '🧭'},
  {title: 'Questions illimitées', desc: 'Tu peux poser toutes tes questions sur les paiements, les plateformes, la sécurité…', icon: '❓'},
  {title: 'Suivi après l’appel', desc: 'Si tu bloques après, tu peux revenir vers nous pour qu’on t’aide à débloquer.', icon: '📲'}
]

export default function Features(){
  return (
    <section id="features" className="py-16">
      <h2 className="text-2xl font-semibold">Ce que tu obtiens avec l’appel</h2>
      <p className="mt-2 text-slate-400">Ce n’est pas un simple guide vidéo — c’est un accompagnement en direct pour que tout soit mis en place correctement.</p>

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
