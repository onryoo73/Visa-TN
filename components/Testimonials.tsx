"use client"
import { useEffect, useState } from 'react'
import ReviewCard from './ReviewCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/autoplay'
import SwiperCore from 'swiper'
import { Autoplay, Grid } from 'swiper/modules'
SwiperCore.use([Autoplay, Grid])

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
        <div className="mt-8">
          <Swiper
            modules={[Autoplay, Grid]}
            slidesPerView={4}
            grid={{ rows: 1, fill: 'row' }}
            spaceBetween={32}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="max-w-5xl mx-auto"
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 }
            }}
          >
            {reviews.map((t) => (
              <SwiperSlide key={t._id} className="flex items-center justify-center h-full">
                <ReviewCard name={t.name} quote={t.quote} rating={t.rating} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </section>
  )
}
