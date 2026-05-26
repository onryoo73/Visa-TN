"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Footer from '../../../components/Footer'
import WhatsAppWidget from '../../../components/WhatsAppWidget'

const fallbackPosts: Record<string, { title: string; excerpt: string; content: string; category: string; date: string }> = {
  'hygiene-bucco-dentaire': {
    title: 'Comment prendre soin de vos dents au quotidien',
    excerpt: 'Guide complet pour une hygiène bucco-dentaire optimale.',
    category: 'Hygiène',
    date: '18 Mars 2026',
    content: `
Une bonne hygiène bucco-dentaire est essentielle pour garder des dents saines et un sourire éclatant tout au long de votre vie. Voici nos conseils pour adopter les bonnes habitudes au quotidien.

**1. Brossez-vous les dents deux fois par jour**

Le brossage est la base d'une bonne hygiène dentaire. Brossez-vous les dents pendant au moins 2 minutes, matin et soir, avec un dentifrice fluoré. Utilisez une brosse à dents à poils souples pour ne pas abîmer l'émail et les gencives.

**2. Utilisez du fil dentaire**

Le fil dentaire permet d'éliminer la plaque dentaire et les résidus alimentaires entre les dents, là où la brosse ne peut pas atteindre. Utilisez-le au moins une fois par jour, de préférence le soir avant le brossage.

**3. Adoptez une alimentation équilibrée**

Limitez votre consommation de sucres et d'aliments acides qui attaquent l'émail. Privilégiez les aliments riches en calcium (produits laitiers, amandes) et en vitamine C (agrumes, kiwi) pour des dents et des gencives en bonne santé.

**4. Buvez de l'eau régulièrement**

L'eau aide à neutraliser les acides dans la bouche et à éliminer les résidus alimentaires. Après chaque repas, rincez-vous la bouche avec de l'eau.

**5. Évitez le tabac**

Le tabac est l'un des principaux ennemis de la santé bucco-dentaire. Il tache les dents, irrite les gencives et augmente considérablement le risque de maladies parodontales et de cancer de la bouche.

**6. Consultez votre dentiste régulièrement**

Une visite chez le dentiste tous les 6 mois permet de détecter les problèmes à un stade précoce et de bénéficier d'un détartrage professionnel. Ne négligez pas ces rendez-vous de prévention.

**7. Changez votre brosse à dents régulièrement**

Remplacez votre brosse à dents tous les 3 mois ou dès que les poils commencent à s'effilocher. Une brosse usée est moins efficace pour nettoyer vos dents.

En appliquant ces conseils simples au quotidien, vous préserverez la santé de vos dents et de vos gencives pour les années à venir. Et n'oubliez pas : un sourire sain est un sourire éclatant !
    `.trim()
  },
  'detartrage-dentaire': {
    title: 'Tout savoir sur le détartrage dentaire',
    excerpt: 'Le détartrage est essentiel pour prévenir les maladies parodontales.',
    category: 'Soins',
    date: '17 Mars 2026',
    content: `
Le détartrage dentaire est un soin essentiel pour maintenir une bonne santé bucco-dentaire. Pourtant, beaucoup de patients ont des idées reçues sur ce traitement. Voici tout ce que vous devez savoir.

**Qu'est-ce que le détartrage ?**

Le détartrage est un acte clinique réalisé par un dentiste ou un hygiéniste dentaire. Il consiste à éliminer le tartre (calcul dentaire) qui s'accumule sur les dents, même avec un brossage régulier. Le tartre est une forme durcie de la plaque dentaire qui ne peut pas être éliminée par le brossage seul.

**Pourquoi est-ce important ?**

Le tartre est poreux et retient les bactéries, ce qui peut entraîner :
- Une inflammation des gencives (gingivite)
- Des saignements au brossage
- Une mauvaise haleine (halitose)
- À terme, une parodontite (déchaussement des dents)
- Des caries dentaires

**À quelle fréquence faut-il faire un détartrage ?**

En général, il est recommandé de faire un détartrage tous les 6 à 12 mois. Cependant, la fréquence dépend de plusieurs facteurs :
- Votre hygiène bucco-dentaire quotidienne
- Votre prédisposition à former du tartre
- La présence de maladies parodontales
- Le tabagisme

**Comment se déroule une séance de détartrage ?**

1. **Examen** : Le dentiste examine votre bouche pour évaluer l'état de vos dents et gencives.
2. **Détartrage** : À l'aide d'un appareil à ultrasons, le dentiste élimine le tartre au-dessus et en-dessous de la gencive.
3. **Surfaçage** : Les surfaces radiculaires sont lissées pour éviter la re-accumulation rapide du tartre.
4. **Polissage** : Les dents sont polies avec une pâte prophylactique pour les rendre lisses et brillantes.

**Le détartrage est-il douloureux ?**

Le détartrage n'est généralement pas douloureux, mais il peut être légèrement inconfortable, surtout si vous avez les gencives sensibles ou si le tartre est important. Le dentiste peut utiliser un anesthésique local si nécessaire.

**Prix du détartrage chez DocTN**

Le détartrage est proposé à **80 TND** dans notre cabinet. Ce tarif comprend l'examen, le détartrage complet et le polissage.

N'attendez pas que vos gencives saignent pour prendre rendez-vous. Un détartrage régulier est un investissement dans la santé de vos dents à long terme.
    `.trim()
  },
  'blanchiment-dentaire': {
    title: 'Blanchiment dentaire : Ce qu\'il faut savoir',
    excerpt: 'Techniques, tarifs et précautions pour un blanchiment dentaire sûr et efficace.',
    category: 'Esthétique',
    date: '16 Mars 2026',
    content: `
Le blanchiment dentaire est l'un des soins esthétiques les plus demandés en cabinet dentaire. Voici un guide complet pour tout comprendre avant de vous lancer.

**Qu'est-ce que le blanchiment dentaire ?**

Le blanchiment dentaire est un traitement esthétique qui vise à éclaircir la couleur naturelle des dents. Il ne s'agit pas de rendre les dents blanches comme de la neige, mais de retrouver leur teinte naturelle, souvent jaunie par le temps, l'alimentation et le tabac.

**Quelles sont les causes du jaunissement des dents ?**

Plusieurs facteurs contribuent au jaunissement des dents :
- Le tabac
- Le café, le thé et le vin rouge
- Certains aliments colorés (curry, betterave, baies)
- Le vieillissement naturel
- Certains médicaments (antibiotiques)
- Une mauvaise hygiène bucco-dentaire

**Les différentes techniques de blanchiment**

Chez DocTN, nous proposons un blanchiment professionnel réalisé en cabinet :

1. **Blanchiment ambulatoire** : Des gouttières sur mesure sont réalisées pour vos dents. Vous appliquez le gel blanchissant à domicile pendant 1 à 2 semaines.
2. **Blanchiment au cabinet** : Le gel blanchissant est appliqué sur vos dents et activé par une lampe à LED. Le traitement dure environ 1 heure et les résultats sont visibles immédiatement.

**Le blanchiment est-il sans danger ?**

Réalisé par un professionnel, le blanchiment dentaire est un acte sûr. Les produits utilisés en cabinet sont conformes aux normes européennes et ne présentent pas de risque pour l'émail. Une légère sensibilité dentaire peut survenir après le traitement mais elle disparaît généralement en 24 à 48 heures.

**Combien de temps durent les résultats ?**

Les résultats du blanchiment dentaire durent généralement de 6 mois à 2 ans, selon votre hygiène de vie et votre alimentation. Pour prolonger les résultats :
- Évitez le tabac
- Limitez le café, le thé et les aliments colorés
- Brossez-vous les dents après chaque repas
- Utilisez un dentifrice blanchissant en entretien

**Tarifs du blanchiment chez DocTN**

Le blanchiment dentaire est proposé à **250 TND** dans notre cabinet, avec un suivi personnalisé et des résultats garantis.

Avant tout traitement de blanchiment, une consultation préalable est nécessaire pour vérifier que vos dents et gencives sont en bonne santé. Prenez rendez-vous dès aujourd'hui !
    `.trim()
  },
  'soins-dentaires-enfants': {
    title: 'Soins dentaires pour enfants : Guide parental',
    excerpt: 'Conseils pour les parents sur la santé dentaire des enfants.',
    category: 'Pédiatrie',
    date: '15 Mars 2026',
    content: `
La santé dentaire des enfants est essentielle pour leur bien-être général et leur développement. En tant que parents, vous jouez un rôle clé dans l'établissement de bonnes habitudes dès le plus jeune âge.

**Quand faire la première visite chez le dentiste ?**

La première visite chez le dentiste devrait avoir lieu dès l'apparition de la première dent, ou au plus tard à l'âge d'un an. Cette visite permet de :
- Vérifier le développement des dents et de la mâchoire
- Conseiller les parents sur l'hygiène bucco-dentaire
- Détecter précocement d'éventuels problèmes
- Habituer l'enfant à l'environnement du cabinet dentaire

**Les bonnes habitudes d'hygiène dès le plus jeune âge**

Dès la naissance, nettoyez les gencives de votre bébé avec une compresse humide après chaque tétée. Dès l'apparition de la première dent, utilisez une brosse à dents à poils souples avec une noisette de dentifrice fluoré adapté à son âge.

**Prévention des caries chez l'enfant**

Les caries dentaires sont la maladie chronique la plus répandue chez les enfants. Pour les prévenir :
- Limitez la consommation de sucres (bonbons, sodas, jus de fruits)
- Évitez de donner des biberons de lait ou de jus le soir
- Brossez les dents de votre enfant après chaque repas
- Utilisez un dentifrice fluoré adapté à son âge
- Consultez régulièrement le dentiste

**Le scellement des sillons**

Le scellement des sillons est un traitement préventif qui consiste à appliquer une résine protectrice sur les molaires définitives de l'enfant. Ce traitement indolore réduit considérablement le risque de caries sur les dents permanentes.

**À partir de quel âge un enfant peut-il se brosser les dents seul ?**

Jusqu'à l'âge de 7-8 ans, les enfants n'ont pas encore la dextérité nécessaire pour un brossage efficace. Il est recommandé de superviser et de compléter le brossage jusqu'à cet âge, puis de vérifier régulièrement la qualité du brossage.

**Que faire en cas d'urgence dentaire ?**

En cas de chute ou de traumatisme dentaire :
- Restez calme
- Si une dent de lait est tombée, ne la replacez pas
- Si une dent définitive est tombée, gardez-la dans du lait ou de la salive
- Consultez immédiatement un dentiste

Chez DocTN, nous accueillons les enfants dans un cadre chaleureux et rassurant. Notre équipe est formée à la pédiatrie dentaire et sait mettre les petits patients en confiance. Prenez rendez-vous dès aujourd'hui pour la première visite de votre enfant !
    `.trim()
  }
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const [post, setPost] = useState<typeof fallbackPosts[string] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (fallbackPosts[slug]) {
      setPost(fallbackPosts[slug])
      setLoading(false)
      return
    }
    const API = process.env.NEXT_PUBLIC_API_URL || ''
    const url = API ? `${API}/api/posts/${slug}` : `/api/posts/${slug}`
    fetch(url)
      .then(res => res.json())
      .then(json => {
        if (json?.success && json.data) {
          setPost({
            title: json.data.title,
            excerpt: json.data.excerpt,
            content: json.data.content,
            category: json.data.category,
            date: new Date(json.data.createdAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
          })
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [slug])

  function formatContent(text: string) {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <h2 key={i} className="text-xl font-bold text-white mt-8 mb-3">{line.replace(/\*\*/g, '')}</h2>
      }
      if (line.startsWith('- ')) {
        return <li key={i} className="text-slate-300 ml-4 mb-1">{line.slice(2)}</li>
      }
      if (line.match(/^\d+\.\s/)) {
        return <li key={i} className="text-slate-300 ml-4 mb-1">{line}</li>
      }
      if (line.trim() === '') return <br key={i} />
      return <p key={i} className="text-slate-300 mb-2 leading-relaxed">{line}</p>
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="h-10 w-10 border-2 border-slate-700 border-t-med-500 rounded-full animate-spin" />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Article non trouvé</h1>
          <Link href="/" className="text-med-400 hover:underline">Retour à l'accueil</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <article className="max-w-3xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-med-400 transition mb-8">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Retour à l'accueil
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-med-600/20 text-med-300 text-xs font-medium border border-med-500/30">
              {post.category}
            </span>
            <span className="text-sm text-slate-500">{post.date}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="prose prose-invert max-w-none">
            {formatContent(post.content)}
          </div>

          <div className="mt-12 pt-8 border-t border-slate-800">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-med-600 to-med-500 text-white font-semibold hover:shadow-lg hover:shadow-med-500/25 transition-all"
            >
              Prendre rendez-vous
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </Link>
          </div>
        </motion.div>
      </article>
      <Footer />
      <WhatsAppWidget />
    </div>
  )
}
