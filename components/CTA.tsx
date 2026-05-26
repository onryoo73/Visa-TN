"use client"
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function CTA(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState<{[k:string]:string}>({})

  function validate(){
    const e: {[k:string]:string} = {}
    if(!name.trim()) e.name = 'Nom requis'
    if(!email.trim()) e.email = 'Email requis'
    else if(!/^\S+@\S+\.\S+$/.test(email)) e.email = 'Email invalide'
    if(message.trim().length < 10) e.message = 'Message trop court (10+ caractères)'
    return e
  }

  function handleSubmit(ev: React.FormEvent){
    ev.preventDefault()
    const v = validate()
    setErrors(v)
    if(Object.keys(v).length) return
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
      setSuccess(true)
      setName('')
      setEmail('')
      setPhone('')
      setMessage('')
      setTimeout(()=>setSuccess(false), 5000)
    }, 1100)
  }

  return (
    <section className="mt-12 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{opacity:0, y:8}} whileInView={{opacity:1, y:0}} viewport={{once:true}} className="grid md:grid-cols-2 gap-8 items-start">
          <div className="rounded-2xl p-8 bg-gradient-to-br from-slate-900/60 to-slate-800/60 border border-slate-700 shadow-2xl">
            <h3 className="text-2xl font-bold text-white">Soins Dentaires — Avantages</h3>
            <p className="mt-2 text-slate-300">Des soins de qualité dans un environnement moderne et sécurisé — prenez rendez-vous facilement.</p>

            <ul className="mt-6 grid gap-3">
              <li className="flex gap-3 items-start">
                <div className="flex-none w-10 h-10 rounded-lg bg-med-600/20 text-med-400 flex items-center justify-center font-semibold">🦷</div>
                <div>
                  <strong className="text-white">Soins complets</strong>
                  <div className="text-slate-300 text-sm">Consultation, détartrage, blanchiment, caries et urgences.</div>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <div className="flex-none w-10 h-10 rounded-lg bg-emerald-600/20 text-emerald-300 flex items-center justify-center font-semibold">⚕️</div>
                <div>
                  <strong className="text-white">Équipement moderne</strong>
                  <div className="text-slate-300 text-sm">Technologie de pointe pour des soins précis et confortables.</div>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <div className="flex-none w-10 h-10 rounded-lg bg-yellow-600/20 text-yellow-300 flex items-center justify-center font-semibold">🧼</div>
                <div>
                  <strong className="text-white">Hygiène stricte</strong>
                  <div className="text-slate-300 text-sm">Matériel stérilisé et protocoles rigoureux pour votre sécurité.</div>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <div className="flex-none w-10 h-10 rounded-lg bg-pink-600/20 text-pink-300 flex items-center justify-center font-semibold">📅</div>
                <div>
                  <strong className="text-white">RDV en ligne facile</strong>
                  <div className="text-slate-300 text-sm">Réservez votre consultation en 1 minute, 24h/24.</div>
                </div>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl p-8 bg-white/5 border border-slate-700 backdrop-blur-md shadow-lg">
            <h3 className="text-2xl font-bold text-white">Contactez-nous</h3>
            <p className="mt-2 text-slate-300">Une question ? Envoyez-nous un message et nous vous répondrons rapidement.</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4" aria-live="polite">
              <div>
                <label className="text-sm text-slate-200">Nom</label>
                <input value={name} onChange={e=>setName(e.target.value)} className={`mt-1 w-full px-4 py-3 rounded-xl bg-slate-900/60 border ${errors.name? 'border-red-500':'border-slate-700'} text-white focus:outline-none focus:ring-2 focus:ring-med-500`} />
                {errors.name && <div className="mt-1 text-red-400 text-sm">{errors.name}</div>}
              </div>

              <div>
                <label className="text-sm text-slate-200">Email</label>
                <input value={email} onChange={e=>setEmail(e.target.value)} type="email" className={`mt-1 w-full px-4 py-3 rounded-xl bg-slate-900/60 border ${errors.email? 'border-red-500':'border-slate-700'} text-white focus:outline-none focus:ring-2 focus:ring-med-500`} />
                {errors.email && <div className="mt-1 text-red-400 text-sm">{errors.email}</div>}
              </div>

              <div>
                <label className="text-sm text-slate-200">Téléphone (optionnel)</label>
                <input value={phone} onChange={e=>setPhone(e.target.value)} className="mt-1 w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-med-500" />
              </div>

              <div>
                <label className="text-sm text-slate-200">Message</label>
                <textarea value={message} onChange={e=>setMessage(e.target.value)} rows={4} className={`mt-1 w-full px-4 py-3 rounded-xl bg-slate-900/60 border ${errors.message? 'border-red-500':'border-slate-700'} text-white focus:outline-none focus:ring-2 focus:ring-med-500`} />
                {errors.message && <div className="mt-1 text-red-400 text-sm">{errors.message}</div>}
              </div>

              <input className="hidden" name="company" tabIndex={-1} aria-hidden={true} />

              <div className="flex items-center gap-3">
                <button type="submit" disabled={loading} className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-med-600 to-med-500 text-white font-semibold shadow-md hover:scale-[1.01] transition-transform disabled:opacity-60">
                  {loading ? <span className="animate-pulse">Envoi...</span> : 'Envoyer'}
                </button>
                <div className="text-sm text-slate-300">Nous respectons votre vie privée — réponse sous 24h.</div>
              </div>

              {success && <div className="mt-4 rounded-lg bg-emerald-900/60 border border-emerald-600 p-3 text-emerald-200">Merci — nous vous répondrons sous 24h !</div>}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
