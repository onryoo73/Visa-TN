"use client"  // ← Add this
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Blog posts data
const posts = {
  'guide-flouci-tunisie': {
    title: "Comment utiliser Flouci pour vos achats en ligne",
    date: "18 Mars 2026",
    readTime: "5 min",
    category: "Paiements",
    content: `
# Guide complet Flouci Tunisie

Flouci est devenu la solution de paiement en ligne préférée des Tunisiens. Voici comment l'utiliser efficacement.

## Qu'est-ce que Flouci ?

Flouci est une application tunisienne qui permet de :
- Créer une carte virtuelle internationale
- Payer sur tous les sites web
- Recevoir de l'argent
- Effectuer des transferts

## Étape 1 : Télécharger et installer

1. **Téléchargez Flouci** depuis Google Play ou App Store
2. **Créez votre compte** avec votre CIN
3. **Vérifiez votre numéro** de téléphone
4. **Configurez votre code PIN** sécurisé

## Étape 2 : Recharger votre compte

Plusieurs options disponibles :
- **Carte bancaire** tunisienne
- **D17** (autre carte virtuelle)
- **Espèces** chez les partenaires
- **Virement bancaire**

## Étape 3 : Créer votre carte virtuelle

1. Allez dans "Cartes" → "Nouvelle carte"
2. **Choisissez le type** : Visa ou Mastercard
3. **Définissez la limite** (jusqu'à 5000 TND)
4. **Payez les frais** de création (10 TND)

## Étape 4 : Utiliser votre carte

### Pour les achats en ligne :
1. **Sélectionnez "Payer par carte"**
2. **Entrez les 16 chiffres** de votre carte Flouci
3. **Date d'expiration** et **CVV**
4. **Confirmez** le paiement

### Pour Netflix et abonnements :
1. Utilisez l'adresse **facturation tunisienne**
2. Code postal : **1000** (Tunis)
3. Sélectionnez **Tunisie** comme pays

## Avantages de Flouci

✅ **Accepté partout** (Visa/Mastercard)
✅ **Instantané** (pas d'attente)
✅ **Sécurisé** (double authentification)
✅ **Traçable** (app notifications)
✅ **Economique** (frais réduits)

## Limites à connaître

- **Retrait maximum** : 2000 TND/jour
- **Paiement international** : 500 TND/transaction
- **Frais de change** : 2% du montant

## Conseils de sécurité

🔒 **Ne partagez jamais** votre CVV
🔒 **Utilisez uniquement** sur sites HTTPS
🔒 **Activez les notifications** pour chaque transaction
🔒 **Bloquez immédiatement** en cas de perte

## Conclusion

Flouci est LA solution pour les paiements en ligne depuis la Tunisie. Simple, rapide et économique.

Besoin d'aide ? [Réservez un appel](/booking) et je vous configure tout !
    `
  },
  'activation-carte-d17': {
    title: "Carte virtuelle D17 : Tutoriel d'activation",
    date: "17 Mars 2026",
    readTime: "4 min",
    category: "Cartes",
    content: `
# Tutoriel D17 : Activez votre carte virtuelle

D17 est une carte virtuelle tunisienne qui facilite les paiements internationaux. Voici comment l'activer.

## Qu'est-ce que D17 ?

D17 est une carte virtuelle émise par la Banque de Tunisie qui permet :
- Paiements en ligne internationaux
- Abonnements (Netflix, Spotify, etc.)
- Réservations d'hôtels et vols
- Achats sur marketplaces

## Prérequis

- **CIN valide** et en cours de validité
- **Compte bancaire** tunisien
- **Smartphone** avec internet
- **Email actif**

## Étape 1 : Télécharger l'application

1. **Play Store/App Store** : cherchez "D17"
2. **Téléchargez** l'application officielle
3. **Installez** sur votre smartphone

## Étape 2 : Création du compte

1. **Ouvrez l'application**
2. **"Créer un compte"**
3. **Scannez votre CIN** avec la caméra
4. **Remplissez** vos informations personnelles
5. **Créez votre mot de passe** (8 caractères minimum)

## Étape 3 : Vérification

1. **Vérifiez votre email** (lien de confirmation)
2. **Vérifiez votre numéro** (code SMS)
3. **Prenez un selfie** pour vérification faciale
4. **Patientez 24-48h** pour validation

## Étape 4 : Commande de la carte

1. **Connectez-vous** à votre compte D17
2. **"Demander une carte"**
3. **Choisissez le type** : Virtuelle uniquement
4. **Sélectionnez le montant** de recharge initial
5. **Validez** votre demande

## Étape 5 : Activation

Une fois reçue (instantané pour virtuelle) :

1. **Notez les 16 chiffres** de la carte
2. **Mémorisez la date** d'expiration
3. **Gardez le CVV** secret (3 chiffres)
4. **Testez avec un petit achat** (ex: 1 TND)

## Configuration pour paiements

### Sur sites internationaux :
- **Pays** : Tunisie
- **Code postal** : 1000
- **Devise** : TND (conversion auto)
- **Nom** : Comme sur votre CIN

### Pour Netflix/Spotify :
- Utilisez l'adresse **de facturation tunisienne**
- **Code postal** : 1000 Tunis
- **Téléphone** : votre numéro tunisien

## Frais et limites

- **Frais de création** : 15 TND
- **Frais annuels** : 20 TND
- **Plafond mensuel** : 1000 TND
- **Transaction max** : 200 TND

## Avantages D17

✅ **Reconnu mondialement** (Visa)
✅ **Accepté partout** où Visa est accepté
✅ **Application mobile** intuitive
✅ **Support client** tunisien
✅ **Historique détaillé** des transactions

## Sécurité

🔒 **3D Secure** pour paiements protégés
🔒 **Blocage instantané** via app
🔒 **Notifications SMS** pour chaque opération
🔒 **Double authentification** requise

## Conclusion

D17 est excellente alternative pour les paiements en ligne depuis la Tunisie. Fiable et sécurisée.

Pour une assistance personnalisée, [réservez votre appel](/booking) !
    `
  }
};

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = posts[params.slug as keyof typeof posts];
  
  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <article className="max-w-4xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/" className="text-slate-400 hover:text-white transition">
            ← Accueil
          </Link>
        </nav>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <span className="inline-block px-3 py-1 bg-indigo-600 text-white text-xs font-medium rounded-full mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-slate-400 text-sm">
            <time>{post.date}</time>
            <span>•</span>
            <span>{post.readTime} de lecture</span>
          </div>
        </motion.header>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert prose-lg max-w-none text-slate-300"
        >
          <div className="whitespace-pre-line">
            {post.content
              .split('\n')
              .map((line, i) => {
                if (line.startsWith('######')) {
                  return <h6 key={i} className="text-xl font-bold text-white mt-8 mb-4">{line.slice(6).trim()}</h6>
                }
                if (line.startsWith('#####')) {
                  return <h5 key={i} className="text-2xl font-bold text-white mt-8 mb-4">{line.slice(5).trim()}</h5>
                }
                if (line.startsWith('####')) {
                  return <h4 key={i} className="text-2xl md:text-3xl font-bold text-white mt-8 mb-4">{line.slice(4).trim()}</h4>
                }
                if (line.startsWith('###')) {
                  return <h3 key={i} className="text-2xl md:text-3xl font-bold text-white mt-8 mb-4">{line.slice(3).trim()}</h3>
                }
                if (line.startsWith('##')) {
                  return <h2 key={i} className="text-2xl md:text-3xl font-bold text-white mt-8 mb-4">{line.slice(2).trim()}</h2>
                }
                if (line.startsWith('#')) {
                  return <h1 key={i} className="text-3xl md:text-4xl font-bold text-white mt-8 mb-4">{line.slice(1).trim()}</h1>
                }
                if (line.startsWith('- ')) {
                  return <li key={i} className="text-slate-300 ml-4">• {line.slice(2).trim()}</li>
                }
                if (line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.') || line.startsWith('5.')) {
                  return <p key={i} className="text-slate-300 ml-4 mb-2"><strong className="text-white">{line}</strong></p>
                }
                if (line.startsWith('✅')) {
                  return <p key={i} className="text-slate-300"><span className="text-emerald-400">✅</span> {line.slice(2).trim()}</p>
                }
                if (line.startsWith('🔒')) {
                  return <p key={i} className="text-slate-300"><span className="text-amber-400">🔒</span> {line.slice(2).trim()}</p>
                }
                if (line.trim() === '') {
                  return <br key={i} />
                }
                return <p key={i} className="text-slate-300 mb-4">{line}</p>
              })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 glass rounded-2xl p-8 soft-border"
        >
          <h3 className="text-xl font-semibold text-white mb-3">
            Besoin d'aide pour votre carte ?
          </h3>
          <p className="text-slate-400 mb-6">
            Je vous accompagne pas-à-pas dans l'activation et l'utilisation de votre carte virtuelle.
          </p>
          <Link 
            href="/booking"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
          >
            Réserver un appel d'assistance
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13 2.257a1 1 0 001.21.502l4.493 1.498a1 1 0 00.684-.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </Link>
        </motion.div>
      </article>
    </div>
  );
}
