"use client"
import { motion } from 'framer-motion'

export default function CTA(){
  return (
    <section className="mt-12 py-20">
      <div className="animated-gradient py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2 initial={{opacity:0, y:12}} whileInView={{opacity:1, y:0}} viewport={{once:true}} className="text-3xl font-semibold">Prêt à commencer ?</motion.h2>
          <motion.p initial={{opacity:0, y:12}} whileInView={{opacity:1, y:0}} viewport={{once:true}} className="mt-4 text-slate-200">Obtenez le guide complet et activez votre Carte Virtuelle Internationale aujourd’hui.</motion.p>
          <motion.div whileHover={{scale:1.02}} className="mt-8">
            <a href="#" className="inline-flex items-center px-10 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold glow-btn shadow-lg">Get Started</a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
