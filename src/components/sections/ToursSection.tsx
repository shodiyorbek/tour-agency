"use client"

import { useState, useRef } from "react"
import { MapPin, Users, Star, Clock, Heart, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useWishlistContext } from "@/components/wishlist-provider"
import { Tour } from "@/hooks/use-wishlist"
import Image from "next/image"

const tours = [
  {
    id: 1,
    title: "7-Day Dubai City Experience",
    destination: "Dubai, UAE",
    price: 899,
    duration: "7 days",
    groupSize: "2-12 people",
    rating: 4.9,
    reviews: 127,
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Experience the magic of Dubai with luxury hotels, desert safaris, and iconic landmarks including Burj Khalifa and Palm Jumeirah.",
    highlights: ["Burj Khalifa Visit", "Desert Safari", "Luxury Hotels", "Dubai Mall Shopping"],
    category: "Luxury",
  },
  {
    id: 2,
    title: "Grand Canyon USA Adventure",
    destination: "Arizona, USA",
    price: 1200,
    duration: "5 days",
    groupSize: "4-16 people",
    rating: 4.8,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Discover the breathtaking beauty of the Grand Canyon with guided hikes, helicopter tours, and stunning sunset viewpoints.",
    highlights: ["Helicopter Tour", "Guided Hiking", "Sunset Points", "Native Culture"],
    category: "Adventure",
  },
  {
    id: 3,
    title: "Silk Road Uzbekistan Tour",
    destination: "Uzbekistan",
    price: 980,
    duration: "8 days",
    groupSize: "6-14 people",
    rating: 4.7,
    reviews: 64,
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Journey through ancient Silk Road cities including Samarkand, Bukhara, and Khiva with expert local guides.",
    highlights: ["Registan Square", "Ancient Architecture", "Local Cuisine", "Cultural Immersion"],
    category: "Cultural",
  },
  {
    id: 4,
    title: "Maldives Honeymoon Escape",
    destination: "Maldives",
    price: 2400,
    duration: "6 days",
    groupSize: "2 people",
    rating: 5.0,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Ultimate romantic getaway with overwater villas, private beaches, and world-class spa treatments in paradise.",
    highlights: ["Overwater Villa", "Private Beach", "Spa Treatments", "Sunset Cruise"],
    category: "Romance",
  },
  {
    id: 5,
    title: "Japanese Cherry Blossom",
    destination: "Japan",
    price: 1650,
    duration: "10 days",
    groupSize: "8-20 people",
    rating: 4.9,
    reviews: 203,
    image: "/placeholder.svg?height=300&width=400",
    description: "Experience Japan during cherry blossom season with visits to Tokyo, Kyoto, and Mount Fuji.",
    highlights: ["Cherry Blossoms", "Traditional Temples", "Mount Fuji", "Cultural Experiences"],
    category: "Cultural",
  },
  {
    id: 6,
    title: "African Safari Adventure",
    destination: "Kenya & Tanzania",
    price: 2100,
    duration: "12 days",
    groupSize: "4-12 people",
    rating: 4.8,
    reviews: 91,
    image: "/placeholder.svg?height=300&width=400",
    description: "Witness the Great Migration and Big Five animals in their natural habitat across Kenya and Tanzania.",
    highlights: ["Great Migration", "Big Five", "Luxury Lodges", "Cultural Villages"],
    category: "Adventure",
  },
]

export default function ToursSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const toursRef = useRef<HTMLElement>(null)
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistContext()

  const toggleWishlist = (tour: any) => {
    if (isInWishlist(tour.id)) {
      removeFromWishlist(tour.id)
    } else {
      addToWishlist(tour as Tour)
    }
  }

  const nextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(tours.length / 3))
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(tours.length / 3)) % Math.ceil(tours.length / 3))
    setTimeout(() => setIsTransitioning(false), 500)
  }

  return (
    <section id="tours" ref={toursRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Featured Tours</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked destinations and experiences crafted by our travel experts
          </p>
        </div>

        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden rounded-2xl" ref={carouselRef}>
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(tours.length / 3) }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                    {tours.slice(slideIndex * 3, slideIndex * 3 + 3).map((tour, index) => (
                      <Card
                        key={tour.id}
                        className="tour-card group overflow-hidden border-0 shadow-lg cursor-pointer"
                      >
                        <div className="relative overflow-hidden">
                          <Image
                            src={tour.image || "/placeholder.svg"}
                            alt={tour.title}
                            width={400}
                            height={300}
                            className="tour-image w-full h-64 object-cover"
                          />
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-blue-600 text-white">{tour.category}</Badge>
                          </div>
                          <div className="absolute top-4 right-4">
                            <button 
                              onClick={() => toggleWishlist(tour)}
                              className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors duration-200"
                            >
                              <Heart 
                                className={`h-5 w-5 transition-colors duration-200 ${
                                  isInWishlist(tour.id) 
                                    ? "text-red-500 fill-current" 
                                    : "text-gray-600 hover:text-red-500"
                                }`} 
                              />
                            </button>
                          </div>
                        </div>
                        <CardHeader className="tour-content">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{tour.rating}</span>
                              <span className="text-sm text-gray-500">({tour.reviews} reviews)</span>
                            </div>
                            <div className="text-2xl font-bold text-blue-600">${tour.price}</div>
                          </div>
                          <CardTitle className="text-xl group-hover:text-blue-600 transition-colors duration-200">
                            {tour.title}
                          </CardTitle>
                          <CardDescription className="flex items-center text-gray-600">
                            <MapPin className="h-4 w-4 mr-1" />
                            {tour.destination}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="tour-content">
                          <p className="text-gray-600 mb-4 line-clamp-3">{tour.description}</p>

                          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
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
                              {tour.highlights.slice(0, 3).map((highlight, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {highlight}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <Button className="animated-button w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-200">
                            View Details
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 z-10"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>

          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 z-10"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(tours.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isTransitioning) {
                    setIsTransitioning(true)
                    setCurrentSlide(index)
                    setTimeout(() => setIsTransitioning(false), 500)
                  }
                }}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  currentSlide === index ? "bg-blue-600" : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="animated-button px-8 py-3 hover:bg-blue-50 transition-colors duration-200 bg-transparent"
          >
            View All Tours
          </Button>
        </div>
      </div>
    </section>
  )
}