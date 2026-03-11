import Hero from '../components/Hero'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import CTA from '../components/CTA'
import BookingForm from '../components/BookingForm'

export default function Page(){
  return (
    <div className="relative overflow-hidden">
      <Hero />
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <Features />
          <BookingForm />
        </div>
        <HowItWorks />
        <Testimonials />
        <FAQ />
      </div>
      <CTA />
    </div>
  )
}
