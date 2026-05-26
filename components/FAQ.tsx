"use client"
import { useState } from 'react'
import { motion } from 'framer-motion'

const faqs = [
  {q: "Comment se déroule une consultation ?", a: "Vous arrivez au cabinet, nous faisons un examen complet de votre bouche, discutons de vos besoins et vous proposons un plan de traitement personnalisé. Comptez 30 à 45 minutes."},
  {q: 'Quels sont vos tarifs ?', a: "La consultation est à 50 TND. Le détartrage à 80 TND, le blanchiment à 250 TND, et les soins pour caries à partir de 100 TND. Paiement sur place par espèces ou carte."},
  {q: "Est-ce que je peux annuler mon rendez-vous ?", a: "Oui, vous pouvez annuler ou modifier votre rendez-vous gratuitement jusqu'à 24h avant. Il suffit de nous contacter par WhatsApp."},
  {q: 'Quels moyens de paiement acceptez-vous ?', a: "Nous acceptons les espèces et les paiements par carte bancaire sur place."}
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
