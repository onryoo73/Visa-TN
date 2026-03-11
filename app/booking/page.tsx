"use client"
import BookingForm from '../../components/BookingForm'

export default function BookingPage(){
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-semibold">Book your appointment</h1>
          <p className="mt-2 text-slate-300">Choose a date & time and we'll get back to you. Quick, secure, and simple.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="rounded-2xl p-6 bg-slate-800/60 border border-slate-700">
            <h3 className="text-lg font-semibold text-white">Why book with us?</h3>
            <ul className="mt-4 text-slate-300 space-y-2">
              <li>— Fast setup and clear instructions</li>
              <li>— Secure handling and confirmations</li>
              <li>— Flexible scheduling options</li>
            </ul>
            <div className="mt-6 text-sm text-slate-400">Need help? Contact support@example.com</div>
          </div>

          <div className="flex justify-center md:justify-end">
            <BookingForm variant="dark" />
          </div>
        </div>
      </div>
    </div>
  )
}
