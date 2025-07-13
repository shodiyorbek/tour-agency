import { Metadata } from 'next'

export const siteConfig = {
  name: 'Big Tour',
  description: 'Premium travel agency offering luxury tours, adventure trips, and cultural journeys worldwide',
  url: 'https://bigtour.com',
  ogImage: '/images/logo.png',
  links: {
    facebook: 'https://facebook.com/bigtour',
    instagram: 'https://instagram.com/bigtour',
    twitter: 'https://twitter.com/bigtour',
  },
  contact: {
    phone: '+998 90 019 22 00',
    email: 'hello@bigtrip.com',
    address: 'Chilonzor, Sergeli, Yunusobod, Tashkent, Uzbekistan',
  },
  coordinates: {
    latitude: 41.2995,
    longitude: 69.2401,
  },
}

export function constructMetadata({
  title,
  description,
  image,
  noIndex = false,
  noFollow = false,
}: {
  title?: string
  description?: string
  image?: string
  noIndex?: boolean
  noFollow?: boolean
} = {}): Metadata {
  return {
    title: title
      ? `${title} | ${siteConfig.name}`
      : siteConfig.name,
    description: description || siteConfig.description,
    keywords: [
      'travel agency',
      'luxury tours',
      'adventure travel',
      'cultural tours',
      'premium travel',
      'guided tours',
      'international travel',
      'vacation packages',
      'travel booking',
      'tourism',
      'Bali tours',
      'Cappadocia tours',
      'Istanbul tours',
      'Maldives tours',
      'Thailand tours',
      'Vietnam tours',
      'China tours',
      'Georgia tours',
      'Qatar tours',
      'Malaysia tours'
    ],
    authors: [{ name: 'Big Tour Team' }],
    creator: siteConfig.name,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteConfig.url,
      title: title || siteConfig.name,
      description: description || siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: image || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title || siteConfig.name,
      description: description || siteConfig.description,
      images: [image || siteConfig.ogImage],
      creator: '@bigtour',
    },
    robots: {
      index: !noIndex,
      follow: !noFollow,
      googleBot: {
        index: !noIndex,
        follow: !noFollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export function generateStructuredData(type: 'TravelAgency' | 'TouristTrip' | 'FAQPage', data?: any) {
  const baseData = {
    "@context": "https://schema.org",
    "@type": type,
  }

  switch (type) {
    case 'TravelAgency':
      return {
        ...baseData,
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        logo: `${siteConfig.url}${siteConfig.ogImage}`,
        image: `${siteConfig.url}${siteConfig.ogImage}`,
        telephone: siteConfig.contact.phone,
        email: siteConfig.contact.email,
        address: {
          "@type": "PostalAddress",
          "streetAddress": siteConfig.contact.address,
          "addressLocality": "Tashkent",
          "addressRegion": "Tashkent",
          "addressCountry": "UZ"
        },
        geo: {
          "@type": "GeoCoordinates",
          "latitude": siteConfig.coordinates.latitude,
          "longitude": siteConfig.coordinates.longitude
        },
        openingHours: "Mo-Fr 09:00-18:00",
        priceRange: "$$",
        currenciesAccepted: "USD, EUR, UZS",
        paymentAccepted: "Cash, Credit Card, Bank Transfer",
        areaServed: "Worldwide",
        aggregateRating: {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "5000"
        },
        sameAs: Object.values(siteConfig.links)
      }
    
    case 'TouristTrip':
      return {
        ...baseData,
        ...data,
        provider: {
          "@type": "TravelAgency",
          "name": siteConfig.name,
          "url": siteConfig.url
        }
      }
    
    case 'FAQPage':
      return {
        ...baseData,
        mainEntity: data?.faqs?.map((faq: any) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        })) || []
      }
    
    default:
      return baseData
  }
}