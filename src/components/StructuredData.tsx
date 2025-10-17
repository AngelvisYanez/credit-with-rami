import Script from 'next/script'

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "Credit with Rami",
    "description": "Former US Business Banker helping entrepreneurs access $50K-$150K in business capital at 0% interest for up to 12 months.",
    "url": "https://creditwithrami.com",
    "logo": "https://creditwithrami.com/cwr-logo-1.png",
    "image": "https://creditwithrami.com/images/rami/rami-hero.png",
    "telephone": "+1 (786) 620-4231",
    "email": "info@creditwithrami.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2701 Ponce De Leon. Suite 301",
      "addressLocality": "Coral Gables",
      "addressRegion": "FL",
      "postalCode": "33134",
      "addressCountry": "US"
    },
    "founder": {
      "@type": "Person",
      "name": "Rami Noureddine",
      "jobTitle": "Former US Business Banker",
      "description": "Former US Business Banker specializing in business funding and credit building with 5+ years of expertise."
    },
    "serviceType": [
      "Business Funding",
      "Credit Building",
      "Business Credit Cards",
      "Business Loans",
      "Credit Repair"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Business Funding Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Business Funding",
            "description": "Access $50K-$150K in business capital at 0% interest for up to 12 months"
          },
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "500",
      "bestRating": "5",
      "worstRating": "1"
    },
    "sameAs": [
      "https://www.instagram.com/creditwithrami"
    ]
  }

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
