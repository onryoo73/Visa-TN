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
    <div className="flex justify-center items-center mt-16 mb-16">
      <form
        onSubmit={submit}
        className="rounded-3xl glass soft-border p-8 max-w-lg w-full shadow-2xl flex flex-col gap-6"
      >
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">Leave a review</h3>
            <p className="text-sm text-slate-400">Share your experience — it helps others.</p>
          </div>
          <div className="text-base text-slate-300 font-semibold">{rating}/5</div>
        </div>

        <div className="mt-4 space-y-6">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-base text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
          />
          <textarea
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            placeholder="Your review"
            rows={4}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-base text-white placeholder-slate-500 focus:outline-none resize-none"
          />

          <div className="flex items-center gap-4 mt-2">
            <div className="text-base text-slate-300 font-medium">Rating</div>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} filled={s <= rating} onClick={() => setRating(s)} />
              ))}
            </div>
          </div>

          {feedback && (
            <div
              className={`rounded-lg px-4 py-3 text-base font-medium ${
                feedback.type === 'success' ? 'bg-emerald-950/60 text-emerald-300' : 'bg-rose-950/60 text-rose-300'
              }`}
            >
              {feedback.message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 text-base font-semibold disabled:opacity-50 flex items-center justify-center gap-2 shadow-md mt-2"
          >
            {loading ? (
              <>
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    </div>
  )
}
