"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Clock, MapPin, Users, Star, Flame, Calendar, Heart, ArrowRight, Zap } from "lucide-react"
import Autoplay from "embla-carousel-autoplay"

const hotDeals = [
  {
    id: 1,
    title: "Tropical Paradise Getaway",
    destination: "Bali, Indonesia",
    originalPrice: 1200,
    salePrice: 799,
    discount: 35,
    duration: "5 days",
    groupSize: "2-8 people",
    rating: 4.9,
    reviews: 234,
    image: "/images/bali.webp",
    description: "Escape to the stunning beaches of Bali with luxury resorts, traditional temples, and vibrant culture. This limited-time offer includes spa treatments and sunset dinners.",
    highlights: ["Luxury Beach Resort", "Temple Tours", "Spa Package", "Sunset Dinner"],
    validUntil: "2024-02-28",
    category: "Beach Paradise",
    urgency: "Only 3 spots left!",
    savings: 401,
  },
  {
    id: 2,
    title: "European Winter Wonderland",
    destination: "Swiss Alps, Switzerland",
    originalPrice: 2100,
    salePrice: 1499,
    discount: 29,
    duration: "7 days",
    groupSize: "4-12 people",
    rating: 4.8,
    reviews: 189,
    image: "/images/tropical-beach.jpg",
    description: "Experience magical winter landscapes with skiing, cozy chalets, and Christmas markets. Includes equipment rental and mountain railway adventures.",
    highlights: ["Ski Lessons", "Mountain Chalet", "Christmas Markets", "Scenic Railways"],
    validUntil: "2024-01-31",
    category: "Winter Sports",
    urgency: "Flash Sale - 48 Hours Only!",
    savings: 601,
  },
  {
    id: 3,
    title: "Arabian Nights Adventure",
    destination: "Dubai & Abu Dhabi, UAE",
    originalPrice: 1650,
    salePrice: 1099,
    discount: 33,
    duration: "6 days",
    groupSize: "2-10 people",
    rating: 4.7,
    reviews: 156,
    image: "/gallery/dubai-sunset.jpg",
    description: "Immerse yourself in luxury with desert safaris, gold souks, and modern marvels. Includes Burj Khalifa access and traditional dhow cruise.",
    highlights: ["Desert Safari", "Burj Khalifa", "Gold Souk", "Dhow Cruise"],
    validUntil: "2024-03-15",
    category: "Luxury Adventure",
    urgency: "Limited Time Offer",
    savings: 551,
  },
  {
    id: 4,
    title: "African Safari Expedition",
    destination: "Kenya & Tanzania",
    originalPrice: 3200,
    salePrice: 2299,
    discount: 28,
    duration: "10 days",
    groupSize: "4-8 people",
    rating: 5.0,
    reviews: 98,
    image: "/gallery/serengeti.webp",
    description: "Witness the Great Migration and Big Five in their natural habitat. Luxury tented camps with expert guides and cultural village visits included.",
    highlights: ["Great Migration", "Big Five Safari", "Luxury Tents", "Cultural Villages"],
    validUntil: "2024-04-30",
    category: "Wildlife Safari",
    urgency: "Early Bird Special",
    savings: 901,
  },
  {
    id: 5,
    title: "Mediterranean Island Hopping",
    destination: "Greek Islands",
    originalPrice: 1800,
    salePrice: 1199,
    discount: 33,
    duration: "8 days",
    groupSize: "6-16 people",
    rating: 4.9,
    reviews: 267,
    image: "/gallery/over-water.jpg",
    description: "Sail through crystal-clear waters visiting Mykonos, Santorini, and Crete. Includes yacht accommodation and traditional Greek dining experiences.",
    highlights: ["Yacht Experience", "Santorini Sunset", "Greek Cuisine", "Ancient Ruins"],
    validUntil: "2024-05-20",
    category: "Island Adventure",
    urgency: "Super Early Bird!",
    savings: 601,
  },
]

export default function HotDealsSection() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <section id="hot-deals" className="py-20 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-500 rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-24 h-24 bg-orange-500 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-500 rounded-full animate-ping"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="animate-bounce">
              <Flame className="h-10 w-10 text-red-500" />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-pink-600 bg-clip-text text-transparent">
              Hot Deals
            </h2>
            <div className="animate-bounce delay-150">
              <Flame className="h-10 w-10 text-red-500" />
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="h-6 w-6 text-yellow-500 animate-pulse" />
            <p className="text-xl text-gray-700 font-medium">
              Limited time offers • Save up to 35% • Book now!
            </p>
            <Zap className="h-6 w-6 text-yellow-500 animate-pulse" />
          </div>
        </div>

        <div className="relative">
          <Carousel
            setApi={setApi}
            className="w-full"
            plugins={[
              Autoplay({
                delay: 6000,
                stopOnInteraction: true,
                stopOnMouseEnter: true,
              }),
            ]}
            opts={{
              align: "center",
              loop: true,
            }}
          >
            <CarouselContent>
              {hotDeals.map((deal, index) => (
                <CarouselItem key={deal.id}>
                  <Card 
                    className="group overflow-hidden border-0 bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                    onMouseEnter={() => setHoveredCard(deal.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <CardContent className="p-0">
                      <div className="grid md:grid-cols-2 gap-0 min-h-[600px]">
                        {/* Left side - Content */}
                        <div className="p-8 md:p-12 flex flex-col justify-between bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
                          {/* Animated background pattern */}
                          <div className="absolute inset-0 opacity-5">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500 rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-1000"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-500 rounded-full transform -translate-x-12 translate-y-12 group-hover:scale-150 transition-transform duration-1000 delay-300"></div>
                          </div>

                          <div className="relative z-10">
                            {/* Header badges */}
                            <div className="flex items-center justify-between mb-6">
                              <div className="flex gap-2">
                                <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white text-lg px-4 py-2 animate-pulse shadow-lg">
                                  -{deal.discount}% OFF
                                </Badge>
                                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-2">
                                  {deal.category}
                                </Badge>
                              </div>
                              <Button variant="ghost" size="icon" className="hover:bg-red-50 group">
                                <Heart className="h-5 w-5 text-gray-400 group-hover:text-red-500 group-hover:fill-red-500 transition-all duration-300" />
                              </Button>
                            </div>

                            {/* Title and location */}
                            <div className="mb-6">
                              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-300">
                                {deal.title}
                              </h3>
                              <div className="flex items-center text-gray-600 mb-4">
                                <MapPin className="h-5 w-5 mr-2 text-red-500" />
                                <span className="text-lg font-medium">{deal.destination}</span>
                              </div>
                              
                              {/* Rating */}
                              <div className="flex items-center gap-3">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                  ))}
                                </div>
                                <span className="text-lg font-semibold text-gray-800">{deal.rating}</span>
                                <span className="text-gray-500">({deal.reviews} reviews)</span>
                              </div>
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                              {deal.description}
                            </p>

                            {/* Details grid */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                              <div className="flex items-center text-gray-600 bg-gray-50 rounded-lg p-3 group-hover:bg-red-50 transition-colors duration-300">
                                <Clock className="h-5 w-5 mr-3 text-red-500" />
                                <div>
                                  <div className="text-sm text-gray-500">Duration</div>
                                  <div className="font-semibold">{deal.duration}</div>
                                </div>
                              </div>
                              <div className="flex items-center text-gray-600 bg-gray-50 rounded-lg p-3 group-hover:bg-red-50 transition-colors duration-300">
                                <Users className="h-5 w-5 mr-3 text-red-500" />
                                <div>
                                  <div className="text-sm text-gray-500">Group Size</div>
                                  <div className="font-semibold">{deal.groupSize}</div>
                                </div>
                              </div>
                            </div>

                            {/* Highlights */}
                            <div className="mb-8">
                              <h4 className="font-bold text-gray-900 mb-3 text-lg">What's Included:</h4>
                              <div className="grid grid-cols-2 gap-2">
                                {deal.highlights.map((highlight, idx) => (
                                  <div key={idx} className="flex items-center text-sm text-gray-600">
                                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                                    {highlight}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Bottom section with price and CTA */}
                          <div className="relative z-10">
                            {/* Urgency banner */}
                            <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-3 rounded-lg mb-6 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <Calendar className="h-5 w-5 animate-pulse" />
                                <span className="font-bold">{deal.urgency}</span>
                              </div>
                              <div className="text-sm opacity-90">Valid until {deal.validUntil}</div>
                            </div>

                            {/* Price section */}
                            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 rounded-xl mb-6 relative overflow-hidden">
                              <div className="absolute top-0 right-0 w-20 h-20 bg-red-500 rounded-full transform translate-x-10 -translate-y-10 opacity-20"></div>
                              <div className="relative z-10">
                                <div className="flex items-end justify-between">
                                  <div>
                                    <div className="text-sm text-gray-300 line-through mb-1">
                                      Was ${deal.originalPrice}
                                    </div>
                                    <div className="text-4xl font-bold text-white">
                                      ${deal.salePrice}
                                    </div>
                                    <div className="text-green-400 font-semibold">
                                      You save ${deal.savings}!
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-2xl font-bold text-red-400">
                                      {deal.discount}%
                                    </div>
                                    <div className="text-sm text-gray-300">OFF</div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Action buttons */}
                            <div className="flex gap-4">
                              <Button 
                                size="lg" 
                                className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-lg py-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
                              >
                                <span>Book Now & Save</span>
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="lg" 
                                className="px-6 py-6 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 hover:scale-105"
                              >
                                Details
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Right side - Image */}
                        <div className="relative h-64 md:h-auto overflow-hidden group">
                          <Image
                            src={deal.image || "/placeholder.svg"}
                            alt={deal.title}
                            width={600}
                            height={600}
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                          />
                          
                          {/* Image overlay gradients */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent group-hover:from-black/20 transition-all duration-500"></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                          {/* Floating elements on image */}
                          <div className="absolute top-6 right-6">
                            <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg transform hover:scale-110 transition-transform duration-300">
                              <Heart className="h-6 w-6 text-red-500" />
                            </div>
                          </div>

                          {/* Bottom overlay with additional info */}
                          <div className="absolute bottom-6 left-6 right-6">
                            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="text-sm text-gray-600">Starting from</div>
                                  <div className="text-2xl font-bold text-gray-900">${deal.salePrice}</div>
                                </div>
                                <Button size="sm" className="bg-red-600 hover:bg-red-700">
                                  Quick Book
                                </Button>
                              </div>
                            </div>
                          </div>

                          {/* Animated corner elements */}
                          <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Custom carousel controls */}
            <CarouselPrevious className="left-4 bg-white/80 backdrop-blur-sm border-2 border-red-200 hover:bg-red-50 hover:border-red-400 transition-all duration-300" />
            <CarouselNext className="right-4 bg-white/80 backdrop-blur-sm border-2 border-red-200 hover:bg-red-50 hover:border-red-400 transition-all duration-300" />
          </Carousel>

          {/* Carousel indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === current - 1 
                    ? 'bg-red-600 w-8' 
                    : 'bg-gray-300 hover:bg-red-300'
                }`}
                onClick={() => api?.scrollTo(index)}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA section */}
        <div className="text-center mt-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4">Don't Miss These Amazing Deals!</h3>
            <p className="text-lg mb-6 opacity-90">
              Limited time offers with incredible savings. Book your dream vacation today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
              >
                View All Deals
              </Button>
              <div className="flex items-center gap-2 text-yellow-300">
                <Zap className="h-5 w-5 animate-pulse" />
                <span className="font-medium">Flash sales ending soon!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}