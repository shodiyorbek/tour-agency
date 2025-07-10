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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative w-full max-w-6xl max-h-[90vh] m-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Heart className="h-6 w-6 text-red-500 fill-current" />
            <h2 className="text-2xl font-bold text-gray-900">
              My Wishlist ({getWishlistCount()})
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            {wishlist.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearWishlist}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          {wishlist.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Your wishlist is empty
              </h3>
              <p className="text-gray-500 mb-6">
                Start adding tours to your wishlist to see them here
              </p>
              <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700">
                Explore Tours
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {wishlist.map((tour: Tour) => (
                <Card key={tour.id} className="group overflow-hidden border shadow-lg">
                  <div className="relative overflow-hidden">
                    <Image
                      src={tour.image || "/placeholder.svg"}
                      alt={tour.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-blue-600 text-white">{tour.category}</Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <button
                        onClick={() => removeFromWishlist(tour.id)}
                        className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors duration-200 group"
                      >
                        <Heart className="h-4 w-4 text-red-500 fill-current group-hover:scale-110 transition-transform" />
                      </button>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{tour.rating}</span>
                        <span className="text-sm text-gray-500">({tour.reviews} reviews)</span>
                      </div>
                      <div className="text-xl font-bold text-blue-600">${tour.price}</div>
                    </div>
                    <CardTitle className="text-lg leading-tight">{tour.title}</CardTitle>
                    <CardDescription className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {tour.destination}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{tour.description}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {tour.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {tour.groupSize}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {tour.highlights.slice(0, 2).map((highlight, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                        {tour.highlights.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{tour.highlights.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFromWishlist(tour.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
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