"use client"
import { useState } from 'react'

function Star({ filled, onClick }: { filled: boolean; onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick} className={`text-xl ${filled ? 'text-amber-400' : 'text-slate-600'} focus:outline-none`}>
      {filled ? '★' : '☆'}
    </button>
  )
}

export default function ReviewForm() {
  const [name, setName] = useState('')
  const [quote, setQuote] = useState('')
  const [rating, setRating] = useState(5)
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFeedback(null)
    if (!name.trim() || !quote.trim()) return setFeedback({ type: 'error', message: 'Please provide name and review.' })
    setLoading(true)
    try {
      const API = process.env.NEXT_PUBLIC_API_URL || ''
      const res = await fetch(API ? `${API}/api/reviews` : '/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), quote: quote.trim(), rating }),
      })
      const json = await res.json()
      if (!res.ok) {
        setFeedback({ type: 'error', message: json?.message || 'Could not submit review.' })
      } else {
        setFeedback({ type: 'success', message: 'Thanks! Your review was submitted.' })
        setName('')
        setQuote('')
        setRating(5)
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'Network error.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl bg-gradient-to-br from-slate-900/70 to-slate-800/60 border border-slate-800 p-6 sm:p-8 max-w-md lg:max-w-lg w-full shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Leave a review</h3>
          <p className="text-sm text-slate-400">Share your experience — it helps others.</p>
        </div>
        <div className="text-sm text-slate-400">{rating}/5</div>
      </div>

      <div className="mt-4 space-y-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
        />
        <textarea
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          placeholder="Your review"
          rows={3}
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none resize-none"
        />

        <div className="flex items-center gap-3">
          <div className="text-sm text-slate-300 font-medium">Rating</div>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} filled={s <= rating} onClick={() => setRating(s)} />
            ))}
          </div>
        </div>

        {feedback && (
          <div
            className={`rounded-md px-3 py-2 text-sm ${
              feedback.type === 'success' ? 'bg-emerald-950/60 text-emerald-300' : 'bg-rose-950/60 text-rose-300'
            }`}
          >
            {feedback.message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" className="opacity-75" />
              </svg>
              Submitting…
            </>
          ) : (
            'Submit review'
          )}
        </button>
      </div>
    </form>
  )
}
