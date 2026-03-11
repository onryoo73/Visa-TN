"use client"
import { motion } from 'framer-motion'

const steps = [
  {title: 'Réserve ton créneau', desc: 'Choisis la date et l’heure qui t’arrangent pour l’appel.'},
  {title: 'Appel en direct avec moi', desc: 'On partage l’écran, on configure ta carte et tes comptes ensemble.'},
  {title: 'Tu appliques & tu encaisse', desc: 'À la fin de l’appel, tout est prêt pour payer et recevoir sans blocage.'}
]

export default function HowItWorks(){
  return (
    <section className="py-16">
      <h2 className="text-2xl font-semibold">Comment se passe l’appel</h2>
      <div className="mt-6 flex gap-6 overflow-x-auto py-4">
        {steps.map((s, i) => (
          <motion.div key={s.title} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:i*0.12}} className="min-w-[260px] glass p-6 rounded-2xl soft-border">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">{i+1}</div>
            <h3 className="mt-4 font-semibold text-white">{s.title}</h3>
            <p className="mt-2 text-slate-300 text-sm">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
