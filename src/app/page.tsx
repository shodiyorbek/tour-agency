import type { Metadata } from 'next'
import { constructMetadata, generateStructuredData } from '@/lib/metadata'
import HomePageClient from '@/components/HomePageClient'

export const metadata: Metadata = constructMetadata({
  title: 'Premium Travel Agency | Luxury Tours & Adventures',
  description: 'Discover extraordinary travel experiences with Big Tour. Book luxury tours, adventure trips, and cultural journeys to destinations worldwide. Expert guides, premium accommodations, and unforgettable memories.',
  image: '/images/tropical-beach.jpg',
})

export default function HomePage() {
  return <HomePageClient />
}
