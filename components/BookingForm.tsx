"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function BookingForm({ variant = 'dark' }: { variant?: 'light' | 'dark' }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('09:00');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  const t = {
    title: 'Réserver mon appel',
    subtitle: 'En 1 min. Je te recontacte pour confirmer l\'heure de l\'appel.',
    nameLabel: 'Nom complet',
    namePlaceholder: 'Ex: Ahmed Ben Ali',
    phoneLabel: 'Téléphone',
    phonePlaceholder: '+216 12 345 678',
    dateLabel: 'Date qui t\'arrange',
    timeLabel: 'Heure préférée',
    submit: 'Réserver mon créneau',
    submitting: 'Envoi en cours...',
    success: "✓ C'est envoyé ! Je te recontacte rapidement pour confirmer.",
    errorGeneric: 'Une erreur s\'est produite. Réessaie ou contacte-moi directement.',
    errorNetwork: 'Problème de connexion. Réessaie.',
    footer: "Paiement de 100 TND le jour de l'appel. Remboursement garanti si on n'avance pas.",
    errName: 'Merci de mettre ton nom.',
    errPhone: 'Merci de mettre ton numéro.',
    errDate: 'Choisis une date.',
    errTime: 'Choisis une heure.',
  };

  const validate = () => {
    const next: { [k: string]: string } = {};
    if (!name.trim()) next.name = t.errName;
    if (!phone.trim()) next.phone = t.errPhone;
    if (!date) next.date = t.errDate;
    if (!time) next.time = t.errTime;
    return next;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setErrors({});
    const validation = validate();
    if (Object.keys(validation).length) {
      setErrors(validation);
      setLoading(false);
      return;
    }
    try {
      const API = process.env.NEXT_PUBLIC_API_URL || '';
      const endpoint = API ? `${API}/api/appointments` : '/api/appointments';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, appointmentDate: date, appointmentTime: time }),
      });
      const json = await res.json();
      if (res.ok) {
        setMessage(t.success);
        setMessageType('success');
        setName('');
        setPhone('');
        setDate('');
        setTime('09:00');
      } else {
        setMessage(json.message || t.errorGeneric);
        setMessageType('error');
      }
    } catch (err) {
      setMessage(t.errorNetwork);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    { icon: '🎧', text: 'Appel 1:1 personnalisé' },
    { icon: '⚡', text: 'Configuration en 30-45 min' },
    { icon: '🛡️', text: 'Garantie satisfait ou remboursé' },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            {t.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg"
          >
            {t.subtitle}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 items-start">
          {/* Left side - Benefits */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 space-y-4"
          >
            <div className="glass rounded-2xl p-6 soft-border">
              <h3 className="text-lg font-semibold text-white mb-4">Ce que tu reçois:</h3>
              <ul className="space-y-3">
                {benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <span className="text-xl">{benefit.icon}</span>
                    <span className="text-sm">{benefit.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass rounded-2xl p-6 soft-border border-emerald-500/30">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">💰</span>
                <span className="text-white font-semibold">Tarif transparent</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">100 TND</div>
              <p className="text-slate-400 text-sm">Une seule fois. Pas d&apos;abonnement caché.</p>
            </div>

            <div className="glass rounded-2xl p-6 soft-border">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">📱</span>
                <span className="text-white font-semibold">Paiement facile</span>
              </div>
              <div className="flex items-center gap-3">
                <img src="/flouci.png" alt="Flouci" className="h-8 w-auto opacity-90" />
                <img src="/d17.png" alt="D17" className="h-8 w-auto opacity-90" />
              </div>
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-3"
          >
            <form onSubmit={submit} className="glass rounded-3xl p-6 md:p-8 soft-border relative overflow-hidden">
              {/* Gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500" />
              
              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    {t.nameLabel}
                  </label>
                  <input
                    type="text"
                    placeholder={t.namePlaceholder}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full px-4 py-3.5 rounded-xl bg-slate-900/60 border ${
                      errors.name ? 'border-rose-500 focus:border-rose-500' : 'border-slate-700 focus:border-indigo-500'
                    } text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/25 transition-all`}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-sm text-rose-400 flex items-center gap-1">
                      <span>!</span> {errors.name}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    {t.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    placeholder={t.phonePlaceholder}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full px-4 py-3.5 rounded-xl bg-slate-900/60 border ${
                      errors.phone ? 'border-rose-500 focus:border-rose-500' : 'border-slate-700 focus:border-indigo-500'
                    } text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/25 transition-all`}
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-sm text-rose-400 flex items-center gap-1">
                      <span>!</span> {errors.phone}
                    </p>
                  )}
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">
                      {t.dateLabel}
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={`w-full px-4 py-3.5 rounded-xl bg-slate-900/60 border ${
                        errors.date ? 'border-rose-500 focus:border-rose-500' : 'border-slate-700 focus:border-indigo-500'
                      } text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/25 transition-all`}
                    />
                    {errors.date && (
                      <p className="mt-1.5 text-sm text-rose-400">{errors.date}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">
                      {t.timeLabel}
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-900/60 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/25 transition-all appearance-none cursor-pointer"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '20px' }}
                    >
                      <option value="09:00">09:00</option>
                      <option value="09:30">09:30</option>
                      <option value="10:00">10:00</option>
                      <option value="10:30">10:30</option>
                      <option value="11:00">11:00</option>
                      <option value="11:30">11:30</option>
                      <option value="13:00">13:00</option>
                      <option value="13:30">13:30</option>
                      <option value="14:00">14:00</option>
                      <option value="14:30">14:30</option>
                      <option value="15:00">15:00</option>
                      <option value="15:30">15:30</option>
                      <option value="16:00">16:00</option>
                      <option value="16:30">16:30</option>
                      <option value="17:00">17:00</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`rounded-xl px-4 py-3 text-sm ${
                      messageType === 'success'
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                    }`}
                  >
                    {message}
                  </motion.div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t.submitting}
                    </>
                  ) : (
                    <>
                      <span>📅</span>
                      {t.submit}
                    </>
                  )}
                </button>

                {/* Footer note */}
                <p className="text-center text-slate-500 text-sm flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                  {t.footer}
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
