"use client"
import Link from 'next/link'
import BookingForm from '../../components/BookingForm'
import Footer from '../../components/Footer'
import WhatsAppWidget from '../../components/WhatsAppWidget'

export default function BookingPage(){
  return (
    <div className="relative min-h-screen bg-zinc-950">
      {/* Background gradients */}
      <div className="pointer-events-none fixed inset-0 opacity-40">
        <div className="absolute -top-24 -left-16 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute top-40 -right-10 h-72 w-72 rounded-full bg-sky-500/16 blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 py-6">
        <div className="max-w-6xl mx-auto px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Retour à l'accueil
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        <BookingForm />
      </main>

      <Footer />
      <WhatsAppWidget />
    </div>
  )
}
