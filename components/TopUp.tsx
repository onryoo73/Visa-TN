"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'

const EXCHANGE_RATE = 3.2 // TND per USD

export default function TopUp() {
  const [usdAmount, setUsdAmount] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const tndAmount = usdAmount ? (parseFloat(usdAmount) * EXCHANGE_RATE).toFixed(2) : '0.00'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const API = process.env.NEXT_PUBLIC_API_URL || ''
      const url = API ? `${API}/api/topup` : '/api/topup'
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          usdAmount: parseFloat(usdAmount),
          tndAmount: parseFloat(tndAmount)
        })
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(true)
        setUsdAmount('')
        setName('')
        setPhone('')
      } else {
        setError(data.message || 'Erreur lors de l\'envoi')
      }
    } catch (err) {
      setError('Erreur réseau. Réessayez.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <section id="topup" className="py-16">
        <div className="max-w-2xl mx-auto">
          <div className="glass rounded-3xl p-8 md:p-12 border-2 border-emerald-500/30 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-white mb-4">Demande envoyée !</h3>
            <p className="text-slate-300 mb-6">
              Je t\'ai envoyé un message sur WhatsApp avec les instructions de paiement.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium"
            >
              Nouvelle demande
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="topup" className="py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Recharge ta carte virtuelle</h2>
          <p className="text-slate-400">Je t\'envoie les USDT directement sur ta carte. Rapide et sécurisé.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8 md:p-12 border-2 border-indigo-500/30"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* USD Amount Input */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Combien d\'USD tu veux ?
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="10"
                  max="1000"
                  required
                  value={usdAmount}
                  onChange={(e) => setUsdAmount(e.target.value)}
                  className="w-full px-4 py-4 rounded-xl bg-slate-800/50 border border-slate-600 text-white text-lg focus:border-indigo-500 focus:outline-none"
                  placeholder="Ex: 100"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                  USD
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-2">Minimum: 10 USD · Maximum: 1000 USD</p>
            </div>

            {/* Price Display */}
            {usdAmount && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-xl p-6 border border-indigo-500/30"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Tu paies en TND</p>
                    <p className="text-xs text-slate-500">Taux: 1 USD = {EXCHANGE_RATE} TND</p>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-bold text-white">{tndAmount}</p>
                    <p className="text-slate-400">TND</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Contact Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Ton nom
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-600 text-white focus:border-indigo-500 focus:outline-none"
                  placeholder="Prénom Nom"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-600 text-white focus:border-indigo-500 focus:outline-none"
                  placeholder="+216 XX XXX XXX"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !usdAmount}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg shadow-lg shadow-indigo-500/25 hover:scale-[1.02] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Envoi en cours...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Confirmer la demande
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              )}
            </button>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <span className="text-emerald-400">✓</span> Reçu en 10-30 min
              </span>
              <span className="flex items-center gap-1">
                <span className="text-emerald-400">✓</span> Paiement sécurisé
              </span>
              <span className="flex items-center gap-1">
                <span className="text-emerald-400">✓</span> Support WhatsApp
              </span>
            </div>
          </form>
        </motion.div>

        {/* How it works */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="p-4">
            <div className="text-2xl mb-2">1️⃣</div>
            <p className="text-sm text-slate-400">Tu choisis le montant</p>
          </div>
          <div className="p-4">
            <div className="text-2xl mb-2">2️⃣</div>
            <p className="text-sm text-slate-400">Je t\'envoie les instructions</p>
          </div>
          <div className="p-4">
            <div className="text-2xl mb-2">3️⃣</div>
            <p className="text-sm text-slate-400">Tu reçois les USDT</p>
          </div>
        </div>
      </div>
    </section>
  )
}
