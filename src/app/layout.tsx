import type { Metadata } from 'next'
import './globals.css'
import { WishlistProvider } from '@/components/wishlist-provider'
import { BookingProvider } from '@/components/booking-provider'

export const metadata: Metadata = {
  title: 'Big Tour - Your Dream Travel Agency',
  description: 'Discover extraordinary travel experiences with Big Tour. Book your perfect vacation today!',
  generator: 'Next.js',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <WishlistProvider>
          <BookingProvider>
            {children}
          </BookingProvider>
        </WishlistProvider>
      </body>
    </html>
  )
}
