export default function SchemaMarkup() {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "subtype": "Dentist",
    "name": "DocTN - Cabinet Dentaire",
    "description": "Cabinet dentaire moderne en Tunisie. Consultation, détartrage, blanchiment et soins dentaires.",
    "url": "https://www.doctn.tn",
    "telephone": "+216123456789",
    "email": "contact@doctn.tn",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "TN",
      "addressLocality": "Tunis"
    },
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Tunisia"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "8"
    }
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Comment se déroule une consultation ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Vous arrivez au cabinet, nous faisons un examen complet de votre bouche, discutons de vos besoins et vous proposons un plan de traitement personnalisé. Comptez 30 à 45 minutes."
        }
      },
      {
        "@type": "Question",
        "name": "Quels sont vos tarifs ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La consultation est à 50 TND. Le détartrage à 80 TND, le blanchiment à 250 TND, et les soins pour caries à partir de 100 TND. Paiement sur place par espèces ou carte."
        }
      },
      {
        "@type": "Question",
        "name": "Est-ce que je peux annuler mon rendez-vous ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, vous pouvez annuler ou modifier votre rendez-vous gratuitement jusqu'à 24h avant. Il suffit de nous contacter par WhatsApp."
        }
      },
      {
        "@type": "Question",
        "name": "Quels moyens de paiement acceptez-vous ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nous acceptons les espèces et les paiements par carte bancaire sur place."
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}
