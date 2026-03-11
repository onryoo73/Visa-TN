import Hero from '../components/Hero'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'

export default function Page(){
  return (
    <div className="relative overflow-hidden">
      <Hero />
      <main className="max-w-6xl mx-auto px-6 sm:px-8">
        <Features />
        <HowItWorks />
        <Testimonials />
        <FAQ />
      </main>
    </div>
  )
}
