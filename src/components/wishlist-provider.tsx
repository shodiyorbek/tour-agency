"use client"

import { createContext, useContext } from 'react'
import { useWishlist, Tour } from '@/hooks/use-wishlist'

interface WishlistContextType {
  wishlist: Tour[]
  addToWishlist: (tour: Tour) => void
  removeFromWishlist: (tourId: number) => void
  isInWishlist: (tourId: number) => boolean
  clearWishlist: () => void
  getWishlistCount: () => number
  isLoading: boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: any }) {
  const wishlistData = useWishlist()

  return (
    <WishlistContext.Provider value={wishlistData}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlistContext() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlistContext must be used within a WishlistProvider')
  }
  return context
}