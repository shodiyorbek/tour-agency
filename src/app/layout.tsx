import type { Metadata } from 'next'
import './globals.css'
import { WishlistProvider } from '@/components/wishlist-provider'
import { BookingProvider } from '@/components/booking-provider'

export const metadata: Metadata = {
  title: 'Big Tour',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <WishlistProvider>
          <BookingProvider>
            {children}
          </BookingProvider>
        </WishlistProvider>
      </body>
    </html>
  )
}
