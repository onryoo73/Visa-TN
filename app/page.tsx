import Hero from '../components/Hero'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import Testimonials from '../components/Testimonials'
import ReviewForm from '../components/ReviewForm'
import FAQ from '../components/FAQ'
import Pricing from '../components/Pricing'
import Blog from '../components/Blog'
import Footer from '../components/Footer'
import WhatsAppWidget from '../components/WhatsAppWidget'
import CookieConsent from '../components/CookieConsent'

export default function Page(){
  return (
    <div className="relative overflow-hidden">
      <Hero />
      <main className="max-w-6xl mx-auto px-6 sm:px-8">
        <Features />
        <HowItWorks />
        <Pricing />
        
        <div className="mt-16">
          <Testimonials />
        </div>
        <div className="mt-8">
          <ReviewForm />
        </div>
        <FAQ />
      </main>
      <Footer />
      <WhatsAppWidget />
      <CookieConsent />
    </div>
  )
}
