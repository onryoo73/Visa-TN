"use client";
import React, { useState } from 'react';

export default function BookingForm({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('09:00');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  const isDark = variant === 'dark';
  const t = isDark
    ? {
        title: 'Réserver mon créneau',
        subtitle: 'En 1 min. Je te recontacte pour confirmer l’heure de l’appel.',
        nameLabel: 'Nom',
        namePlaceholder: 'Ton nom',
        phoneLabel: 'Téléphone',
        phonePlaceholder: 'ex. +216 12 345 678',
        dateLabel: 'Date qui t’arrange',
        timeLabel: 'Heure',
        submit: 'Envoyer ma demande',
        submitting: 'Envoi…',
        success: 'C’est envoyé. Je te recontacte rapidement pour confirmer.',
        errorGeneric: 'Une erreur s’est produite. Réessaie ou contacte-moi directement.',
        errorNetwork: 'Problème de connexion. Réessaie.',
        footer: 'En envoyant ce formulaire, tu acceptes d’être recontacté pour ton rendez-vous.',
        errName: 'Merci de mettre ton nom.',
        errPhone: 'Merci de mettre ton numéro.',
        errDate: 'Choisis une date.',
        errTime: 'Choisis une heure.',
      }
    : {
        title: 'Book an appointment',
        subtitle: 'It takes less than a minute. We’ll contact you to confirm the final time.',
        nameLabel: 'Full name',
        namePlaceholder: 'Your name',
        phoneLabel: 'Phone number',
        phonePlaceholder: 'e.g. +1 555 123 4567',
        dateLabel: 'Preferred date',
        timeLabel: 'Preferred time',
        submit: 'Book appointment',
        submitting: 'Booking…',
        success: 'Appointment created successfully',
        errorGeneric: 'Error creating appointment',
        errorNetwork: 'Network error, please try again.',
        footer: 'By sending this form you agree to be contacted about your appointment request.',
        errName: 'Name is required',
        errPhone: 'Phone number is required',
        errDate: 'Choose a date',
        errTime: 'Choose a time',
      };
  const cardClass = isDark
    ? 'max-w-md w-full rounded-2xl border border-slate-700/80 bg-slate-900/90 shadow-2xl shadow-black/20 backdrop-blur-sm overflow-hidden'
    : 'max-w-md w-full rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden';
  const inputBase = isDark
    ? 'mt-2 block w-full rounded-xl border border-slate-600 bg-slate-800/80 px-4 py-3 text-slate-100 placeholder-slate-500 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/25'
    : 'mt-2 block w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20';
  const inputError = isDark ? 'border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/25' : 'border-rose-400 focus:ring-rose-500/20';
  const btnClass = isDark
    ? 'w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:from-indigo-500 hover:to-indigo-600 hover:shadow-indigo-500/30 disabled:opacity-60 disabled:pointer-events-none'
    : 'w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:from-indigo-500 hover:to-indigo-600 disabled:opacity-60 disabled:pointer-events-none';

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

  return (
    <form onSubmit={submit} className={cardClass} aria-live="polite">
      {/* Accent bar */}
      <div className="h-1 bg-gradient-to-r from-indigo-500 to-purple-600" aria-hidden />

      <div className="p-6 sm:p-8">
        <div className="mb-6">
          <h3 className={`text-xl font-semibold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.title}</h3>
          <p className={`mt-1.5 text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
            {t.subtitle}
          </p>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-gray-700'}`}>{t.nameLabel}</span>
            <input
              aria-label={t.nameLabel}
              placeholder={t.namePlaceholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${inputBase} ${errors.name ? inputError : ''}`}
            />
            {errors.name && <p className="mt-1.5 text-xs text-rose-400">{errors.name}</p>}
          </label>

          <label className="block">
            <span className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-gray-700'}`}>{t.phoneLabel}</span>
            <input
              aria-label={t.phoneLabel}
              placeholder={t.phonePlaceholder}
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`${inputBase} ${errors.phone ? inputError : ''}`}
            />
            {errors.phone && <p className="mt-1.5 text-xs text-rose-400">{errors.phone}</p>}
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4">
            <label className="block">
              <span className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-gray-700'}`}>{t.dateLabel}</span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`${inputBase} ${errors.date ? inputError : ''}`}
              />
              {errors.date && <p className="mt-1.5 text-xs text-rose-400">{errors.date}</p>}
            </label>
            <label className="block sm:w-36">
              <span className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-gray-700'}`}>{t.timeLabel}</span>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={`${inputBase} ${errors.time ? inputError : ''}`}
              >
                <option>09:00</option>
                <option>09:30</option>
                <option>10:00</option>
                <option>10:30</option>
                <option>11:00</option>
                <option>11:30</option>
                <option>13:00</option>
                <option>13:30</option>
                <option>14:00</option>
                <option>14:30</option>
                <option>15:00</option>
                <option>15:30</option>
                <option>16:00</option>
              </select>
              {errors.time && <p className="mt-1.5 text-xs text-rose-400">{errors.time}</p>}
            </label>
          </div>
        </div>

        {message && (
          <div
            className={`mt-4 flex items-start gap-3 rounded-xl px-4 py-3 text-sm ${
              messageType === 'success'
                ? isDark
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : isDark
                ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}
          >
            <span className="mt-0.5 shrink-0" aria-hidden>
              {messageType === 'success' ? '✓' : '!'}
            </span>
            <p className="leading-snug">{message}</p>
          </div>
        )}

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <button type="submit" disabled={loading} className={btnClass}>
            {loading && (
              <span className="h-4 w-4 shrink-0 rounded-full border-2 border-white/40 border-t-transparent animate-spin" />
            )}
            {loading ? t.submitting : t.submit}
          </button>
        </div>

        <p className={`mt-5 flex items-center gap-2 text-xs ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
          <span className="text-slate-500" aria-hidden>🔒</span>
          {t.footer}
        </p>
      </div>
    </form>
  );
}
