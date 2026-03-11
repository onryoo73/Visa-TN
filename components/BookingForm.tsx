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

  const isDark = variant === 'dark';
  const cardClass = isDark
    ? 'max-w-md bg-slate-900/80 p-6 sm:p-8 rounded-lg shadow-lg border border-slate-700'
    : 'max-w-md bg-white p-6 sm:p-8 rounded-lg shadow-lg border border-gray-100';
  const inputBase = isDark
    ? 'mt-1 block w-full border border-slate-700 rounded-md px-3 py-2 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500'
    : 'mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200';
  const btnClass = isDark
    ? 'bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors disabled:opacity-60'
    : 'bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors disabled:opacity-60';

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
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
        setMessage('Appointment created successfully');
        setMessageType('success');
        setName('');
        setPhone('');
        setDate('');
        setTime('09:00');
      } else {
        setMessage(json.message || 'Error creating appointment');
        setMessageType('error');
      }
    } catch (err) {
      setMessage('Network error');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className={cardClass}>
      <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Book an appointment</h3>

      <label className="block mb-3">
        <span className="text-sm">Name</span>
        <input
          aria-label="Name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={inputBase}
        />
      </label>

      <label className="block mb-3">
        <span className="text-sm">Phone</span>
        <input
          aria-label="Phone"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className={inputBase}
        />
      </label>

      <div className="flex gap-3 mb-4">
        <label className="flex-1">
          <span className="text-sm">Date</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className={inputBase}
          />
        </label>
        <label className="w-40">
          <span className="text-sm">Time</span>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={inputBase}
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
        </label>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className={btnClass}
        >
          {loading ? 'Booking…' : 'Book Appointment'}
        </button>
          {message && (
            <div className={`text-sm ${messageType === 'success' ? (isDark ? 'text-emerald-300' : 'text-green-700') : (isDark ? 'text-rose-300' : 'text-red-700')}`}>{message}</div>
          )}
      </div>
    </form>
  );
}
