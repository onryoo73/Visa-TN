import Hero from '../components/Hero'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import Testimonials from '../components/Testimonials'
import ReviewForm from '../components/ReviewForm'
import FAQ from '../components/FAQ'

export default function Page(){
  return (
    <div className="relative overflow-hidden">
      <Hero />
      <main className="max-w-6xl mx-auto px-6 sm:px-8">
        <Features />
        <HowItWorks />
        <div className="mt-8 flex flex-col lg:flex-row gap-6 items-start">
          <ReviewForm />
          <Testimonials />
        </div>
        <FAQ />
      </main>
    </div>
  )
}
