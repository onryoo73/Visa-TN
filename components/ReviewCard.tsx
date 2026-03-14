"use client"
import React from 'react'

type Props = { name: string; quote: string; rating?: number }

export default function ReviewCard({ name, quote, rating }: Props) {
  // Avatar: show first two letters of name as a styled circular image
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <article className="glass soft-border p-10 rounded-3xl shadow-2xl flex flex-col gap-8 min-h-[220px] w-full max-w-md mx-auto transition hover:shadow-2xl">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 via-indigo-700 to-zinc-900 flex items-center justify-center text-3xl font-extrabold text-white shadow-lg mb-2 uppercase tracking-widest">
          {initials}
        </div>
        <p
          className="text-white text-lg font-medium leading-relaxed text-center mb-2"
          style={{ display: '-webkit-box', WebkitLineClamp: 5, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
        >
          “{quote}”
        </p>
        <footer className="text-base font-semibold text-indigo-200 text-center">— {name}</footer>
      </div>
      {typeof rating === 'number' && (
        <div className="flex items-center justify-center gap-1 mt-2">
          {Array.from({ length: 5 }).map((_, idx) => (
            <span key={idx} className={idx < rating ? 'text-amber-400 text-2xl' : 'text-gray-300 text-2xl'}>
              {idx < rating ? '★' : '☆'}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}
