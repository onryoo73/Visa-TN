"use client"
import { useEffect, useState } from 'react'
import ReviewCard from './ReviewCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'
import SwiperCore from 'swiper'
import { Autoplay, Navigation } from 'swiper/modules'
SwiperCore.use([Autoplay, Navigation])

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
    <section className="py-24 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14">
          <h2 className="text-3xl font-bold text-white mb-4">Avis des clients</h2>
          <p className="text-white text-lg mb-6">Découvrez ce que nos clients pensent de leur expérience avec VCard</p>
        </div>
        {loading ? (
          <div className="mt-6 flex justify-center py-8">
            <div className="h-8 w-8 rounded-full border-2 border-slate-600 border-t-indigo-500 animate-spin" />
          </div>
        ) : reviews.length === 0 ? (
          <p className="mt-6 text-slate-500 text-sm">Aucun avis pour le moment.</p>
        ) : (
          <div className="relative mt-12 px-12 md:px-16 max-w-6xl mx-auto">
            <Swiper
              spaceBetween={24}
              slidesPerView={1}
              navigation={{
                prevEl: '.swiper-button-prev-custom',
                nextEl: '.swiper-button-next-custom',
              }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={reviews.length > 3}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="!overflow-hidden rounded-xl"
            >
              {reviews.map((review) => (
                <SwiperSlide key={review._id}>
                  <ReviewCard name={review.name} quote={review.quote} rating={review.rating} />
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* Custom Navigation Buttons */}
            <button
              className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 group flex justify-center items-center border border-solid border-indigo-600 w-10 h-10 md:w-12 md:h-12 rounded-full bg-zinc-900/80 hover:bg-indigo-600 transition-all duration-300 shadow-lg"
              aria-label="Previous"
            >
              <svg className="h-5 w-5 md:h-6 md:w-6 text-indigo-600 group-hover:text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 group flex justify-center items-center border border-solid border-indigo-600 w-10 h-10 md:w-12 md:h-12 rounded-full bg-zinc-900/80 hover:bg-indigo-600 transition-all duration-300 shadow-lg"
              aria-label="Next"
            >
              <svg className="h-5 w-5 md:h-6 md:w-6 text-indigo-600 group-hover:text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
