"use client"
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function TopUp() {
  return (
    <section className="py-16">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8 md:p-12 border-2 border-emerald-500/30"
        >
          <div className="text-6xl mb-6">🦷</div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à prendre soin de vos dents ?
          </h2>
          <p className="text-slate-400 mb-8">
            Réservez votre consultation dès aujourd'hui et nous vous accueillerons dans notre cabinet.
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-med-600 to-med-500 text-white font-semibold text-lg shadow-lg shadow-med-500/25 hover:scale-105 transition"
          >
            Prendre rendez-vous
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
