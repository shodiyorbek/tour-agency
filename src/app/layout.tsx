import type { Metadata } from 'next'
import './globals.css'
import { WishlistProvider } from '@/components/wishlist-provider'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
  title: {
    default: 'Big Trip',
    template: '%s | Big Trip'
  },
  description: 'Discover extraordinary travel experiences with Big Tour. Book luxury tours, adventure trips, and cultural journeys to destinations worldwide. Expert guides, premium accommodations, and unforgettable memories.',
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
  creator: 'Big Tour',
  publisher: 'Big Tour',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://bigtour.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bigtour.com',
    siteName: 'Big Trip',
    title: 'Big Trip - Travel Agency',
    description: 'Discover extraordinary travel experiences with Big Trip. Book luxury tours, adventure trips, and cultural journeys to destinations worldwide.',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Big Trip - Travel Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Big Trip - Travel Agency',
    description: 'Discover extraordinary travel experiences with Big Trip. Book luxury tours, adventure trips, and cultural journeys to destinations worldwide.',
    images: ['/images/logo.png'],
    creator: '@bigtour',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'travel',
  classification: 'travel agency',
  other: {
    'geo.region': 'UZ',
    'geo.placename': 'Tashkent',
    'geo.position': '41.2995;69.2401',
    'ICBM': '41.2995, 69.2401',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/logo.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3b82f6" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              "name": "Big Trip",
              "description": "Premium travel agency offering luxury tours, adventure trips, and cultural journeys worldwide",
              "url": "https://bigtour.com",
              "logo": "https://bigtour.com/images/logo.png",
              "image": "https://bigtour.com/images/logo.png",
              "telephone": "+998 90 019 22 00",
              "email": "hello@bigtrip.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Chilonzor, Sergeli, Yunusobod",
                "addressLocality": "Tashkent",
                "addressRegion": "Tashkent",
                "addressCountry": "UZ"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 41.2995,
                "longitude": 69.2401
              },
              "openingHours": "Mo-Fr 09:00-18:00",
              "priceRange": "$$",
              "currenciesAccepted": "USD, EUR, UZS",
              "paymentAccepted": "Cash, Credit Card, Bank Transfer",
              "areaServed": "Worldwide",
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": 41.2995,
                  "longitude": 69.2401
                },
                "geoRadius": "50000"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Travel Packages",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "TouristTrip",
                      "name": "Bali Tropical Paradise",
                      "description": "Experience the magic of Bali with lush rice terraces, spiritual temples, and pristine beaches"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "TouristTrip",
                      "name": "Cappadocia Fairy Chimneys",
                      "description": "Discover the magical fairy chimneys and ancient cave dwellings of Cappadocia"
                    }
                  }
                ]
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "5000"
              },
              "sameAs": [
                "https://www.instagram.com/bigtrip.uz/",
                "https://www.facebook.com/bigtrip.uz/",
                "https://www.twitter.com/bigtrip.uz/"
              ]
            })
          }}
        />
      </head>
      <body className="min-h-screen overflow-y-auto">
        <WishlistProvider>
          {children}
        </WishlistProvider>
        <Toaster />
      </body>
    </html>
  )
}
