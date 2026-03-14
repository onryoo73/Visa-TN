"use client"
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ReviewCard from './ReviewCard'

type Review = { _id: string; name: string; quote: string; rating?: number }

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const API = process.env.NEXT_PUBLIC_API_URL || ''
    const url = API ? `${API}/api/reviews` : '/api/reviews'
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        if (json?.success && Array.isArray(json.data)) setReviews(json.data)
      })
      .catch(() => setReviews([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="py-16">
      <h2 className="text-2xl font-semibold">Ils en parlent</h2>
      <p className="mt-2 text-slate-400">Avis de personnes qui ont fait l’appel avec moi.</p>

      {loading ? (
        <div className="mt-6 flex justify-center py-8">
          <div className="h-8 w-8 rounded-full border-2 border-slate-600 border-t-indigo-500 animate-spin" />
        </div>
      ) : reviews.length === 0 ? (
        <p className="mt-6 text-slate-500 text-sm">Aucun avis pour le moment.</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {reviews.map((t, i) => (
            <motion.div
              key={t._id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <ReviewCard name={t.name} quote={t.quote} rating={t.rating} />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  )
}
