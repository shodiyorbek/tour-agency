"use client"

import { useState, useEffect } from 'react'

export interface Tour {
  id: number
  title: string
  destination: string
  price: number
  duration: string
  groupSize: string
  rating: number
  reviews: number
  image: string
  description: string
  highlights: string[]
  category: string
  difficulty?: string
  availability?: string
  spotsLeft?: number
  totalSpots?: number
  nextDeparture?: string
  included?: string[]
  notIncluded?: string[]
}

export function useWishlist() {
  const [wishlist, setWishlist] = useState<Tour[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load wishlist from localStorage on component mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('tour-wishlist')
      if (saved) {
        setWishlist(JSON.parse(saved))
      }
    } catch (error) {
      console.error('Error loading wishlist from localStorage:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('tour-wishlist', JSON.stringify(wishlist))
      } catch (error) {
        console.error('Error saving wishlist to localStorage:', error)
      }
    }
  }, [wishlist, isLoading])

  const addToWishlist = (tour: Tour) => {
    setWishlist((prev: Tour[]) => {
      const exists = prev.find((item: Tour) => item.id === tour.id)
      if (exists) {
        return prev // Don't add duplicates
      }
      return [...prev, tour]
    })
  }

  const removeFromWishlist = (tourId: number) => {
    setWishlist((prev: Tour[]) => prev.filter((item: Tour) => item.id !== tourId))
  }

  const isInWishlist = (tourId: number): boolean => {
    return wishlist.some((item: Tour) => item.id === tourId)
  }

  const clearWishlist = () => {
    setWishlist([])
  }

  const getWishlistCount = (): number => {
    return wishlist.length
  }

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    getWishlistCount,
    isLoading
  }
}