"use client"
import { motion } from 'framer-motion'

const features = [
  {title: 'Consultation complète', desc: 'Examen bucco-dentaire complet avec diagnostic personnalisé et plan de traitement.', icon: '🦷'},
  {title: 'SoinsModernes', desc: 'Équipement de dernière génération pour des soins précis, rapides et confortables.', icon: '⚕️'},
  {title: 'Hygiène irréprochable', desc: 'Matériel stérilisé et protocoles d\'hygiène stricts pour votre sécurité.', icon: '🧼'},
  {title: 'Suivi personnalisé', desc: 'Nous restons à votre disposition après la consultation pour tout suivi nécessaire.', icon: '📲'}
]

export default function Features(){
  return (
    <section id="features" className="py-16">
      <h2 className="text-2xl font-semibold">Nos services dentaires</h2>
      <p className="mt-2 text-slate-400">Des soins de qualité dans un environnement moderne et sécurisé — de la consultation au traitement complet.</p>

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
