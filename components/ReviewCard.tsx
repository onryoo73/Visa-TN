"use client"
import React from 'react'

type Props = { name: string; quote: string; rating?: number }

export default function ReviewCard({ name, quote, rating }: Props) {
  return (
    <article className="bg-gradient-to-br from-slate-900/60 to-slate-800/50 p-6 rounded-2xl border border-slate-800/60 shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p
            className="text-slate-300 text-base leading-relaxed"
            style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          >
            “{quote}”
          </p>
          <footer className="mt-4 text-sm font-semibold text-white">— {name}</footer>
        </div>
        {typeof rating === 'number' && (
          <div className="ml-4 text-amber-300 text-lg flex-shrink-0" aria-hidden>
            {Array.from({ length: 5 }).map((_, idx) => (
              <span key={idx}>{idx < rating ? '★' : '☆'}</span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
