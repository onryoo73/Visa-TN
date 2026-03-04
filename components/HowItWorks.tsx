"use client"
import { motion } from 'framer-motion'

const steps = [
  {title: 'Payez en ligne', desc: 'Effectuez un paiement sécurisé pour obtenir l’accès.'},
  {title: 'Recevez le guide vidéo', desc: 'Tutoriel détaillé pas-à-pas pour activer la carte.'},
  {title: 'Activez & utilisez', desc: 'Utilisez mondialement sur Apple/Google Pay et sites.'}
]

export default function HowItWorks(){
  return (
    <section className="py-16">
      <h2 className="text-2xl font-semibold">Comment ça marche</h2>
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
