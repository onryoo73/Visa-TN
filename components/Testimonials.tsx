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
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col justify-center items-center sm:flex-row sm:items-center sm:justify-between max-sm:gap-8">
          <h2 className="text-4xl text-center font-bold text-gray-900 lg:text-left">Testimonials</h2>
          <div className="flex items-center gap-8">
            <button id="slider-button-left" className="swiper-button-prev group flex justify-center items-center border border-solid border-indigo-600 w-12 h-12 transition-all duration-500 rounded-full hover:bg-indigo-600" aria-label="Previous">
              <svg className="h-6 w-6 text-indigo-600 group-hover:text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.9999 12L4.99992 12M9.99992 6L4.70703 11.2929C4.3737 11.6262 4.20703 11.7929 4.20703 12C4.20703 12.2071 4.3737 12.3738 4.70703 12.7071L9.99992 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button id="slider-button-right" className="swiper-button-next group flex justify-center items-center border border-solid border-indigo-600 w-12 h-12 transition-all duration-500 rounded-full hover:bg-indigo-600" aria-label="Next">
              <svg className="h-6 w-6 text-indigo-600 group-hover:text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12L19 12M14 18L19.2929 12.7071C19.6262 12.3738 19.7929 12.2071 19.7929 12C19.7929 11.7929 19.6262 11.6262 19.2929 11.2929L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
        {loading ? (
          <div className="mt-6 flex justify-center py-8">
            <div className="h-8 w-8 rounded-full border-2 border-slate-600 border-t-indigo-500 animate-spin" />
          </div>
        ) : reviews.length === 0 ? (
          <p className="mt-6 text-slate-500 text-sm">Aucun avis pour le moment.</p>
        ) : (
          <Swiper
            modules={[Grid, Autoplay]}
            navigation={{ nextEl: '#slider-button-right', prevEl: '#slider-button-left' }}
            loop={true}
            centeredSlides={true}
            spaceBetween={28}
            slidesPerView={3}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 20, centeredSlides: false },
              768: { slidesPerView: 2, spaceBetween: 28, centeredSlides: true },
              1024: { slidesPerView: 3, spaceBetween: 32 },
            }}
            className="mySwiper lg:flex grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-8"
          >
            {reviews.map((t) => (
              <SwiperSlide key={t._id} className="swiper-slide group bg-white border border-solid border-gray-300 rounded-2xl p-6 transition-all duration-500 w-full hover:border-indigo-600">
                <ReviewCard name={t.name} quote={t.quote} rating={t.rating} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  )
}
