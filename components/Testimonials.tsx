"use client"
import { motion } from 'framer-motion'

const testimonials = [
  {name: 'Amina', quote: 'Guide clair — activation en 10 minutes. Parfait pour mes abonnements.'},
  {name: 'Marc', quote: 'Support réactif et astuces qui évitent les blocages.'},
  {name: 'Sofia', quote: 'Utilisé pour Apple Pay — fonctionne parfaitement à l’étranger.'}
]

export default function Testimonials(){
  return (
    <section className="py-16">
      <h2 className="text-2xl font-semibold">Ils en parlent</h2>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.blockquote key={t.name} initial={{opacity:0, y:12}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:i*0.08}} className="glass p-6 rounded-2xl soft-border">
            <p className="text-slate-300">“{t.quote}”</p>
            <footer className="mt-4 text-sm font-semibold text-white">— {t.name}</footer>
          </motion.blockquote>
        ))}
      </div>
    </section>
  )
}
