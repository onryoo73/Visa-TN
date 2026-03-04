"use client"
import { useState } from 'react'
import { motion } from 'framer-motion'

const faqs = [
  {q: 'Ce guide est-il compatible avec Apple/Google Pay ?', a: "Oui — nous expliquons comment ajouter et activer votre carte pour ces services."},
  {q: 'Que se passe-t-il en cas de blocage ?', a: 'Nous fournissons des astuces de prévention et un plan d’action étape par étape.'},
  {q: 'Puis-je recharger ma carte ?', a: 'Oui — instructions pour recharger instantanément sont incluses.'}
]

export default function FAQ(){
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="py-16">
      <h2 className="text-2xl font-semibold">FAQ</h2>
      <div className="mt-6 space-y-3">
        {faqs.map((f, i) => (
          <div key={i} className="glass p-4 rounded-2xl soft-border">
            <button onClick={() => setOpen(open === i ? null : i)} className="w-full text-left flex items-center justify-between">
              <span className="font-medium text-white">{f.q}</span>
              <span className="text-slate-300">{open === i ? '−' : '+'}</span>
            </button>
            <motion.div initial={{height:0, opacity:0}} animate={open === i ? {height: 'auto', opacity:1} : {height:0, opacity:0}} transition={{duration:0.28}} className="overflow-hidden">
              <div className="mt-3 text-slate-300 text-sm">{f.a}</div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  )
}
