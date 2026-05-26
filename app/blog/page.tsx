"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Footer from '../../components/Footer'
import WhatsAppWidget from '../../components/WhatsAppWidget'

const fallbackPosts = [
  {
    _id: '1',
    title: "Comment prendre soin de vos dents au quotidien",
    excerpt: "Guide complet pour une hygiène bucco-dentaire optimale : brossage, fil dentaire, bain de bouche et visites régulières.",
    category: "Hygiène",
    slug: "hygiene-bucco-dentaire",
    createdAt: "2026-03-18",
  },
  {
    _id: '2',
    title: "Tout savoir sur le détartrage dentaire",
    excerpt: "Le détartrage est essentiel pour prévenir les maladies parodontales. Découvrez pourquoi et à quelle fréquence le faire.",
    category: "Soins",
    slug: "detartrage-dentaire",
    createdAt: "2026-03-17",
  },
  {
    _id: '3',
    title: "Blanchiment dentaire : Ce qu'il faut savoir",
    excerpt: "Techniques, tarifs et précautions pour un blanchiment dentaire sûr et efficace. Tout ce que vous devez savoir.",
    category: "Esthétique",
    slug: "blanchiment-dentaire",
    createdAt: "2026-03-16",
  },
  {
    _id: '4',
    title: "Soins dentaires pour enfants : Guide parental",
    excerpt: "Conseils pour les parents sur la santé dentaire des enfants : première visite, caries, et bonnes habitudes.",
    category: "Pédiatrie",
    slug: "soins-dentaires-enfants",
    createdAt: "2026-03-15",
  },
]

export default function BlogPage() {
  const [posts, setPosts] = useState(fallbackPosts)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const API = process.env.NEXT_PUBLIC_API_URL || ''
    const url = API ? `${API}/api/posts` : '/api/posts'
    fetch(url)
      .then(res => res.json())
      .then(json => {
        if (json?.success && json.data?.length > 0) {
          setPosts(json.data)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-zinc-950">
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-med-400 transition mb-6"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              Retour à l'accueil
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Blog DocTN
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Conseils, guides et astuces pour une santé bucco-dentaire optimale
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="h-10 w-10 border-2 border-slate-700 border-t-med-500 rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.article
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-2xl overflow-hidden soft-border hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="relative h-48 bg-slate-800 flex items-center justify-center">
                    <div className="text-4xl">🦷</div>
                    <span className="absolute top-4 left-4 px-3 py-1 bg-med-600 text-white text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                      <time>{new Date(post.createdAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-med-400 hover:text-med-300 text-sm font-medium transition"
                    >
                      Lire la suite
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <div className="glass rounded-2xl p-8 soft-border max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-white mb-3">
                Besoin d'un rendez-vous ?
              </h3>
              <p className="text-slate-400 mb-6">
                Réservez votre consultation dès maintenant — nous vous accueillons dans notre cabinet.
              </p>
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-med-600 to-med-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-med-500/25 transition-all"
              >
                Prendre rendez-vous
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13 2.257a1 1 0 001.21.502l4.493 1.498a1 1 0 00.684-.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
      <WhatsAppWidget />
    </div>
  )
}
