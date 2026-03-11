"use client"
import { useState } from 'react'
import { motion } from 'framer-motion'

const faqs = [
  {q: "C'est qui au bout du fil ?", a: "C’est moi en personne — pas un centre d’appel ni un bot. On fait l’appel ensemble, je te guide en direct et on configure ta carte étape par étape."},
  {q: 'Je paie quand ?', a: "100 TND, le jour de l’appel. Tu ne paies rien en remplissant le formulaire : tu réserves juste ton créneau, je te confirme, et on règle le jour J."},
  {q: "Et si ça ne marche pas ou j'ai un souci après ?", a: "Si à la fin de l’appel tu n’as pas pu avancer à cause de moi, je te rembourse. Si tu bloques plus tard, tu peux me recontacter et on débloque ensemble."},
  {q: 'Ce que vous montrez marche avec Apple Pay / Google Pay ?', a: "Oui — pendant l’appel on voit ensemble comment ajouter et activer ta carte sur ces services si tu les utilises."}
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
