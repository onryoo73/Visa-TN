"use client"
import Link from 'next/link'
import BookingForm from '../../components/BookingForm'

export default function BookingPage(){
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 py-16 sm:py-20 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-24 -left-16 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute top-40 -right-10 h-72 w-72 rounded-full bg-sky-500/16 blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6">
        <div className="flex justify-center mb-8">
          <Link href="/" className="text-sm text-slate-400 hover:text-slate-200 transition">← Retour à l’accueil</Link>
        </div>

        <div className="text-center mb-10">
          <p className="inline-flex items-center rounded-full border border-indigo-500/30 bg-slate-900/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-indigo-200/90">
            Réserve ton créneau — pas de carte demandée ici
          </p>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            Réserver <span className="text-indigo-300">mon appel guidé</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Choisis un créneau qui t’arrange. Je te recontacte pour confirmer et on fixe l’heure de l’appel ensemble.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-800/80 border border-slate-700 px-4 py-2">
            <span className="text-2xl font-bold text-indigo-300">100 TND</span>
            <span className="text-slate-400 text-sm">— à régler le jour de l’appel, pas avant</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-8 items-start">
          <div className="space-y-6">
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 shadow-xl shadow-slate-900/50 p-6 sm:p-7">
              <h3 className="text-base sm:text-lg font-semibold text-white">Ce que tu obtiens avec l’appel</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-200">
                <li className="flex gap-3">
                  <span className="text-emerald-400 mt-0.5">✓</span>
                  <span>Un appel en direct avec moi (partage d’écran si tu veux) pour tout configurer ensemble.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-400 mt-0.5">✓</span>
                  <span>Toutes tes questions sur la carte, les paiements, Netflix, pubs, etc. — sans limite.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-400 mt-0.5">✓</span>
                  <span>À la fin, ta carte est prête à être utilisée. Si tu bloques après, tu peux revenir vers moi.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-amber-950/30 border border-amber-800/50 p-5 sm:p-6">
              <h4 className="font-semibold text-amber-100 flex items-center gap-2">
                <span className="text-lg">🛡️</span> Garantie
              </h4>
              <p className="mt-2 text-sm text-slate-200">
                Si à la fin de l’appel tu n’as pas pu avancer à cause de moi (pas de ton côté), je te rembourse. Pas de prise de tête.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 p-5 sm:p-6">
              <h4 className="font-semibold text-white">Comment ça se passe</h4>
              <ol className="mt-3 space-y-2 text-sm text-slate-300">
                <li><strong className="text-slate-100">1.</strong> Tu remplis le formulaire → je te confirme le créneau par téléphone ou message.</li>
                <li><strong className="text-slate-100">2.</strong> Le jour J, on se connecte (Google Meet, Zoom ou autre) et on fait tout ensemble.</li>
                <li><strong className="text-slate-100">3.</strong> Tu paies 100 TND le jour de l’appel. Pas de paiement à l’avance sur ce site.</li>
              </ol>
            </div>

            <p className="text-xs text-slate-500">
              Une question avant de réserver ? Écris-moi sur le même numéro ou email que je t’enverrai après ta résa.
            </p>
          </div>

          <div className="flex justify-center md:justify-end">
            <BookingForm variant="dark" />
          </div>
        </div>
      </div>
    </div>
  )
}
