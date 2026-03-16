export default function SchemaMarkup() {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "vCardTN - Activation de Carte Virtuelle",
    "description": "Service d'accompagnement pour activation de cartes virtuelles en Tunisie. Paiements en ligne simplifiés.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "vCardTN",
      "url": "https://www.vcardtn.site",
      "telephone": "+21612345678",
      "email": "contact@vcardtn.site",
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
      ]
    },
    "areaServed": {
      "@type": "Country",
      "name": "Tunisia"
    },
    "offers": {
      "@type": "Offer",
      "price": "100",
      "priceCurrency": "TND",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "47"
    }
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "C'est qui au bout du fil ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "C'est moi en personne — pas un centre d'appel ni un bot. On fait l'appel ensemble, je te guide en direct et on configure ta carte étape par étape."
        }
      },
      {
        "@type": "Question",
        "name": "Je paie quand ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "100 TND, le jour de l'appel. Tu ne paies rien en remplissant le formulaire : tu réserves juste ton créneau, je te confirme, et on règle le jour J."
        }
      },
      {
        "@type": "Question",
        "name": "Et si ça ne marche pas ou j'ai un souci après ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Si à la fin de l'appel tu n'as pas pu avancer à cause de moi, je te rembourse. Si tu bloques plus tard, tu peux me recontacter et on débloque ensemble."
        }
      },
      {
        "@type": "Question",
        "name": "Ce que vous montrez marche avec Apple Pay / Google Pay ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui — pendant l'appel on voit ensemble comment ajouter et activer ta carte sur ces services si tu les utilises."
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
