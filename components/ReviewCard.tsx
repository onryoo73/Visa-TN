"use client"
import React from 'react'

type Props = { name: string; quote: string; rating?: number }

export default function ReviewCard({ name, quote, rating }: Props) {
  return (
    <article className="bg-gradient-to-br from-slate-900/80 to-slate-800/70 p-10 rounded-3xl border border-slate-700/60 shadow-2xl flex flex-col gap-8 min-h-[220px] w-full max-w-md mx-auto">
      <div className="flex flex-col gap-6 items-center">
        <p
          className="text-slate-100 text-xl font-medium leading-relaxed text-center mb-2"
          style={{ display: '-webkit-box', WebkitLineClamp: 5, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
        >
          “{quote}”
        </p>
        <footer className="text-lg font-bold text-indigo-200 text-center">— {name}</footer>
      </div>
      {typeof rating === 'number' && (
        <div className="flex items-center justify-center gap-2 mt-2">
          {Array.from({ length: 5 }).map((_, idx) => (
            <span key={idx} className={idx < rating ? 'text-amber-400 text-3xl' : 'text-slate-500 text-3xl'}>
              {idx < rating ? '★' : '☆'}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}
