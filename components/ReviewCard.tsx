"use client"
import React from 'react'

type Props = { name: string; quote: string; rating?: number }

export default function ReviewCard({ name, quote, rating }: Props) {
  return (
    <article className="bg-gradient-to-br from-slate-900/70 to-slate-800/60 p-8 rounded-3xl border border-slate-700/50 shadow-lg flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <p
          className="text-slate-200 text-lg leading-relaxed mb-2"
          style={{ display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
        >
          “{quote}”
        </p>
        <footer className="text-base font-semibold text-indigo-200">— {name}</footer>
      </div>
      {typeof rating === 'number' && (
        <div className="flex items-center justify-center gap-1 mt-2">
          {Array.from({ length: 5 }).map((_, idx) => (
            <span key={idx} className={idx < rating ? 'text-amber-400 text-2xl' : 'text-slate-500 text-2xl'}>
              {idx < rating ? '★' : '☆'}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}
