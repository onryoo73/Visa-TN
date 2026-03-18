"use client"
import Link from 'next/link'
import { motion } from 'framer-motion'

const blogPosts = [
  {
    id: 1,
    title: "Comment utiliser Flouci pour vos achats en ligne",
    excerpt: "Guide complet pour configurer Flouci et payer sur tous les sites internationaux comme Netflix, Amazon, etc.",
    date: "18 Mars 2026",
    readTime: "5 min",
    category: "Paiements",
    image: "/flouci.png",
    slug: "guide-flouci-tunisie"
  },
  {
    id: 2,
    title: "Carte virtuelle D17 : Tutoriel d'activation",
    excerpt: "Étapes simples pour activer votre carte D17 et commencer vos paiements internationaux dès aujourd'hui.",
    date: "17 Mars 2026",
    readTime: "4 min",
    category: "Cartes",
    image: "/d17.png",
    slug: "activation-carte-d17"
  },
  {
    id: 3,
    title: "Netflix Tunisie : Comment payer avec une carte virtuelle",
    excerpt: "Solution simple pour abonner Netflix en Tunisie avec carte virtuelle internationale.",
    date: "16 Mars 2026",
    readTime: "3 min",
    category: "Streaming",
    image: "/netflix-icon.png",
    slug: "netflix-tunisie-carte-virtuelle"
  },
  {
    id: 4,
    title: "Pourquoi choisir une carte virtuelle en Tunisie ?",
    excerpt: "Les avantages des cartes virtuelles par rapport aux cartes bancaires traditionnelles pour les paiements en ligne.",
    date: "15 Mars 2026",
    readTime: "6 min",
    category: "Guide",
    image: "/card-icon.png",
    slug: "avantages-carte-virtuelle-tunisie"
  }
];

export default function Blog() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Blog vCardTN
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Guides, tutoriels et astuces pour maîtriser les paiements en ligne en Tunisie
          </p>
        </motion.div>

        {/* Blog Grid */}
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
              {/* Image */}
              <div className="relative h-48 bg-slate-800 flex items-center justify-center">
                {post.image && post.image.includes('http') ? (
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-4xl">💳</div>
                )}
                <span className="absolute top-4 left-4 px-3 py-1 bg-indigo-600 text-white text-xs font-medium rounded-full">
                  {post.category}
                </span>
              </div>

              {/* Content */}
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
                  className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition"
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="glass rounded-2xl p-8 soft-border max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-white mb-3">
              Besoin d'aide personnalisée ?
            </h3>
            <p className="text-slate-400 mb-6">
              Réservez un appel 1:1 et je vous configure tout étape par étape.
            </p>
            <Link 
              href="/booking"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
            >
              Réserver mon appel
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13 2.257a1 1 0 001.21.502l4.493 1.498a1 1 0 00.684-.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
