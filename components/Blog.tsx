"use client"
import Link from 'next/link'
import { motion } from 'framer-motion'

const blogPosts = [
  {
    id: 1,
    title: "Comment prendre soin de vos dents au quotidien",
    excerpt: "Guide complet pour une hygiène bucco-dentaire optimale : brossage, fil dentaire, bain de bouche et visites régulières.",
    date: "18 Mars 2026",
    readTime: "5 min",
    category: "Hygiène",
    image: "",
    slug: "hygiene-bucco-dentaire"
  },
  {
    id: 2,
    title: "Tout savoir sur le détartrage dentaire",
    excerpt: "Le détartrage est essentiel pour prévenir les maladies parodontales. Découvrez pourquoi et à quelle fréquence le faire.",
    date: "17 Mars 2026",
    readTime: "4 min",
    category: "Soins",
    image: "",
    slug: "detartrage-dentaire"
  },
  {
    id: 3,
    title: "Blanchiment dentaire : Ce qu'il faut savoir",
    excerpt: "Techniques, tarifs et précautions pour un blanchiment dentaire sûr et efficace. Tout ce que vous devez savoir.",
    date: "16 Mars 2026",
    readTime: "3 min",
    category: "Esthétique",
    image: "",
    slug: "blanchiment-dentaire"
  },
  {
    id: 4,
    title: "Soins dentaires pour enfants : Guide parental",
    excerpt: "Conseils pour les parents sur la santé dentaire des enfants : première visite, caries, et bonnes habitudes.",
    date: "15 Mars 2026",
    readTime: "6 min",
    category: "Pédiatrie",
    image: "",
    slug: "soins-dentaires-enfants"
  }
];

export default function Blog() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Blog DocTN
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Conseils, guides et astuces pour une santé bucco-dentaire optimale
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
                  <time>{post.date}</time>
                  <span>•</span>
                  <span>{post.readTime} de lecture</span>
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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

        <div className="text-center mt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-med-400 hover:text-med-300 transition font-medium"
          >
            Voir tous les articles
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
