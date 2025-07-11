"use client"

import { useState } from 'react'
import { X, Heart, MapPin, Users, Star, Clock, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useWishlistContext } from '@/components/wishlist-provider'
import { Tour } from '@/hooks/use-wishlist'
import Image from 'next/image'

interface WishlistModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function WishlistModal({ isOpen, onClose }: WishlistModalProps) {
  const { wishlist, removeFromWishlist, clearWishlist, getWishlistCount } = useWishlistContext()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-lg sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-white">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-primary fill-current" />
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
              My Wishlist ({getWishlistCount()})
            </h2>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            {wishlist.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearWishlist}
                className="text-destructive hover:text-destructive/90 hover:bg-destructive/10 text-xs sm:text-sm"
              >
                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                <span className="hidden sm:inline">Clear All</span>
                <span className="sm:hidden">Clear</span>
              </Button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 hover:bg-muted rounded-full transition-colors"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {wishlist.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <Heart className="h-12 w-12 sm:h-16 sm:w-16 text-muted mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-muted-foreground mb-2">
                Your wishlist is empty
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 px-4">
                Start adding tours to your wishlist to see them here
              </p>
              <Button onClick={onClose} className="bg-primary hover:bg-primary/90 text-sm sm:text-base">
                Explore Tours
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {wishlist.map((tour: Tour) => (
                <Card key={tour.id} className="group overflow-hidden border shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative overflow-hidden">
                    <Image
                      src={tour.image || "/placeholder.svg"}
                      alt={tour.title}
                      width={400}
                      height={200}
                      className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                      <Badge className="bg-primary text-white text-xs sm:text-sm">{tour.category}</Badge>
                    </div>
                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                      <button
                        onClick={() => removeFromWishlist(tour.id)}
                        className="p-1.5 sm:p-2 bg-white/90 rounded-full hover:bg-white transition-colors duration-200 group"
                      >
                        <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-primary fill-current group-hover:scale-110 transition-transform" />
                      </button>
                    </div>
                  </div>

                  <CardHeader className="p-3 sm:p-4 pb-2 sm:pb-3">
                    <div className="flex items-center justify-between mb-1 sm:mb-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-primary text-primary" />
                        <span className="text-xs sm:text-sm font-medium">{tour.rating}</span>
                        <span className="text-xs sm:text-sm text-muted-foreground">({tour.reviews})</span>
                      </div>
                      <div className="text-lg sm:text-xl font-bold text-primary">${tour.price}</div>
                    </div>
                    <CardTitle className="text-base sm:text-lg leading-tight line-clamp-2">{tour.title}</CardTitle>
                    <CardDescription className="flex items-center text-muted-foreground text-xs sm:text-sm mt-1">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                      <span className="truncate">{tour.destination}</span>
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-3 sm:p-4 pt-0">
                    <p className="text-muted-foreground text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">{tour.description}</p>

                    <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        <span className="truncate">{tour.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        <span className="truncate">{tour.groupSize}</span>
                      </div>
                    </div>

                    <div className="mb-3 sm:mb-4">
                      <div className="flex flex-wrap gap-1">
                        {tour.highlights.slice(0, 2).map((highlight, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs px-2 py-0.5">
                            {highlight}
                          </Badge>
                        ))}
                        {tour.highlights.length > 2 && (
                          <Badge variant="secondary" className="text-xs px-2 py-0.5">
                            +{tour.highlights.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button className="flex-1 bg-primary hover:bg-primary/90 text-xs sm:text-sm h-8 sm:h-9">
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFromWishlist(tour.id)}
                        className="text-destructive hover:text-destructive/90 hover:bg-destructive/10 text-xs sm:text-sm h-8 sm:h-9"
                      >
                        <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}