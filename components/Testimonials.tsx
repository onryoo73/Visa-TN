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
  const [index, setIndex] = useState(0)

  // Fetch reviews from API
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

  const groupSize = 3
  const maxIndex = Math.ceil(reviews.length / groupSize) - 1
  const showPrev = () => setIndex((i) => (i === 0 ? maxIndex : i - 1))
  const showNext = () => setIndex((i) => (i === maxIndex ? 0 : i + 1))

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
          <h2 className="text-3xl font-bold text-white mb-4">Customers Feedback</h2>
          <p className="text-white text-lg mb-6">From career changes to dream jobs, here's how Shadcn Studio helped.</p>
        </div>
        {loading ? (
          <div className="mt-6 flex justify-center py-8">
            <div className="h-8 w-8 rounded-full border-2 border-slate-600 border-t-indigo-500 animate-spin" />
          </div>
        ) : reviews.length === 0 ? (
          <p className="mt-6 text-slate-500 text-sm">Aucun avis pour le moment.</p>
        ) : (
          <div className="relative flex items-center justify-center mt-12">
            <button
              onClick={showPrev}
              className="absolute left-0 z-10 group flex justify-center items-center border border-solid border-indigo-600 w-12 h-12 rounded-full bg-zinc-900/80 hover:bg-indigo-600 transition-all duration-300 shadow-lg"
              aria-label="Previous"
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            >
              <svg className="h-6 w-6 text-indigo-600 group-hover:text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-4xl px-8 md:px-0">
              {(() => {
                const start = index * groupSize;
                const end = start + groupSize;
                const group = reviews.slice(start, end);
                return Array.from({ length: groupSize }).map((_, i) => {
                  const review = group[i];
                  return review ? (
                    <ReviewCard key={review._id} name={review.name} quote={review.quote} rating={review.rating} />
                  ) : (
                    <div key={i} className="invisible" />
                  );
                });
              })()}
            </div>
            <button
              onClick={showNext}
              className="absolute right-0 z-10 group flex justify-center items-center border border-solid border-indigo-600 w-12 h-12 rounded-full bg-zinc-900/80 hover:bg-indigo-600 transition-all duration-300 shadow-lg"
              aria-label="Next"
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            >
              <svg className="h-6 w-6 text-indigo-600 group-hover:text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
