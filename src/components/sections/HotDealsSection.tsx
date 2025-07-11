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

import { useWishlistContext } from "@/components/wishlist-provider"
import { useToast } from "@/components/ui/use-toast"

import { useBookingContext } from "@/components/booking-provider"
import BookingModal from "@/components/booking-modal"

import { Tour } from "@/hooks/use-wishlist"

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

  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlistContext()
  const { toast } = useToast()

  const [selectedTour, setSelectedTour] = useState<Tour | null>(null)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const { startBooking } = useBookingContext()

  // Convert hotDeals to Tour format
  const tours: Tour[] = hotDeals.map(deal => ({
    id: deal.id,
    title: deal.title,
    destination: deal.destination,
    price: deal.salePrice, // Use sale price as the current price
    duration: deal.duration,
    groupSize: deal.groupSize,
    rating: deal.rating,
    reviews: deal.reviews,
    image: deal.image,
    description: deal.description,
    highlights: deal.highlights,
    category: deal.category,
    spotsLeft: 10, // Default value for demo
    totalSpots: 20, // Default value for demo
    nextDeparture: deal.validUntil,
    included: deal.highlights,
    notIncluded: ["Flights", "Travel Insurance", "Personal Expenses"]
  }))

  // Create a mapping to access original deal data
  const dealData = hotDeals.reduce((acc, deal) => {
    acc[deal.id] = deal
    return acc
  }, {} as Record<number, typeof hotDeals[0]>)

  const handleBookNow = (tour: Tour) => {
    setSelectedTour(tour)
    setIsBookingModalOpen(true)
    startBooking(tour)
  }

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false)
    setSelectedTour(null)
  }


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

  const handleWishlistToggle = (deal: any) => {
    const tour: Tour = {
      id: deal.id,
      title: deal.title,
      destination: deal.destination,
      price: deal.salePrice,
      duration: deal.duration,
      groupSize: deal.groupSize,
      rating: deal.rating,
      reviews: deal.reviews,
      image: deal.image,
      description: deal.description,
      highlights: deal.highlights,
      category: deal.category
    }

    if (isInWishlist(deal.id)) {
      removeFromWishlist(deal.id)
      toast({
        title: "Removed from Wishlist!",
        description: `${deal.title} has been removed from your wishlist.`,
      })
    } else {
      addToWishlist(tour)
      toast({
        title: "Added to Wishlist!",
        description: `${deal.title} has been added to your wishlist.`,
      })
    }
  }

  const handleDetailsClick = (deal: any) => {
    toast({
      title: deal.title,
      description: `${deal.description}\n\nDestination: ${deal.destination}\nDuration: ${deal.duration}\nGroup Size: ${deal.groupSize}\nRating: ${deal.rating}/5 (${deal.reviews} reviews)`,
      duration: 5000,
    })
  }

  return (
    <section id="hot-deals" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-20 sm:w-24 lg:w-32 h-20 sm:h-24 lg:h-32 bg-primary/50 rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 bg-primary/40 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 bg-primary/30 rounded-full animate-ping"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="animate-bounce">
              <Flame className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Hot Deals
            </h2>
            <div className="animate-bounce delay-150">
              <Flame className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-primary" />
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
            <Zap className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-primary/70 animate-pulse" />
            <p className="text-base sm:text-lg lg:text-xl text-foreground font-medium text-center">
              Limited time offers • Save up to 35% • Book now!
            </p>
            <Zap className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-primary/70 animate-pulse" />
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
              {tours.map((tour, index) => (
                <CarouselItem key={tour.id}>
                  <Card 
                    className="group overflow-hidden border-0 bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                    onMouseEnter={() => setHoveredCard(tour.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <CardContent className="p-0">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
                        {/* Mobile: Image First */}
                        <div className="relative h-64 sm:h-80 lg:h-auto overflow-hidden group order-1 lg:order-2">
                          <Image
                            src={tour.image || "/placeholder.svg"}
                            alt={tour.title}
                            width={600}
                            height={600}
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                          />
                          
                          {/* Image overlay gradients */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent group-hover:from-black/20 transition-all duration-500"></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                          {/* Floating elements on image */}
                          <div className="absolute top-4 sm:top-6 right-4 sm:right-6">
                            <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 sm:p-3 shadow-lg transform hover:scale-110 transition-transform duration-300 cursor-pointer">
                              <Heart 
                                className={`h-5 w-5 sm:h-6 sm:w-6 text-primary ${isInWishlist(tour.id) ? 'fill-primary' : ''}`} 
                                onClick={() => handleWishlistToggle(tour)}
                              />
                            </div>
                          </div>

                          {/* Bottom overlay - Hidden on mobile, shown on desktop */}
                          <div className="absolute bottom-6 left-6 right-6 hidden lg:block">
                            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="text-sm text-muted-foreground">Starting from</div>
                                  <div className="text-2xl font-bold text-foreground">${tour.price}</div>
                                </div>
                                                                  <Button 
                                    size="sm" 
                                    className="bg-primary hover:bg-primary/90"
                                    onClick={() => handleBookNow(tour)}
                                  >
                                    Quick Book
                                  </Button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Left side - Content */}
                        <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-between bg-gradient-to-br from-white to-gray-50 relative overflow-hidden order-2 lg:order-1">
                          {/* Animated background pattern */}
                          <div className="absolute inset-0 opacity-5">
                            <div className="absolute top-0 right-0 w-24 sm:w-28 lg:w-32 h-24 sm:h-28 lg:h-32 bg-primary/50 rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-1000"></div>
                            <div className="absolute bottom-0 left-0 w-20 sm:w-22 lg:w-24 h-20 sm:h-22 lg:h-24 bg-primary/40 rounded-full transform -translate-x-12 translate-y-12 group-hover:scale-150 transition-transform duration-1000 delay-300"></div>
                          </div>

                          <div className="relative z-10">
                            {/* Header badges */}
                            <div className="flex items-center justify-between mb-4 sm:mb-6">
                              <div className="flex gap-2 flex-wrap">
                                <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white text-sm sm:text-base lg:text-lg px-3 sm:px-4 py-1 sm:py-2 animate-pulse shadow-lg">
                                  -{dealData[tour.id]?.discount}% OFF
                                </Badge>
                                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm">
                                  {tour.category}
                                </Badge>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="hover:bg-primary/10 group lg:hidden"
                                onClick={() => handleWishlistToggle(tour)}
                              >
                                <Heart className={`h-5 w-5 text-muted-foreground group-hover:text-primary transition-all duration-300 ${isInWishlist(tour.id) ? 'fill-primary text-primary' : ''}`} />
                              </Button>
                            </div>

                            {/* Title and location */}
                            <div className="mb-4 sm:mb-6">
                              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300">
                                {tour.title}
                              </h3>
                              <div className="flex items-center text-muted-foreground mb-3 sm:mb-4">
                                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-primary" />
                                <span className="text-base sm:text-lg font-medium">{tour.destination}</span>
                              </div>
                              
                              {/* Rating */}
                              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-primary text-primary" />
                                  ))}
                                </div>
                                <span className="text-base sm:text-lg font-semibold text-foreground">{tour.rating}</span>
                                <span className="text-sm sm:text-base text-muted-foreground">({tour.reviews} reviews)</span>
                              </div>
                            </div>

                            {/* Description - Hidden on mobile */}
                            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 hidden sm:block">
                              {tour.description}
                            </p>

                            {/* Details grid */}
                            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                              <div className="flex items-center text-muted-foreground bg-muted/20 rounded-lg p-2 sm:p-3 group-hover:bg-primary/10 transition-colors duration-300">
                                <Clock className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-primary" />
                                <div>
                                  <div className="text-xs sm:text-sm text-muted-foreground">Duration</div>
                                  <div className="text-sm sm:text-base font-semibold">{tour.duration}</div>
                                </div>
                              </div>
                              <div className="flex items-center text-muted-foreground bg-muted/20 rounded-lg p-2 sm:p-3 group-hover:bg-primary/10 transition-colors duration-300">
                                <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-primary" />
                                <div>
                                  <div className="text-xs sm:text-sm text-muted-foreground">Group Size</div>
                                  <div className="text-sm sm:text-base font-semibold">{tour.groupSize}</div>
                                </div>
                              </div>
                            </div>

                            {/* Highlights - Hidden on mobile */}
                            <div className="mb-6 sm:mb-8 hidden lg:block">
                              <h4 className="font-bold text-foreground mb-3 text-lg">What's Included:</h4>
                                                              <div className="grid grid-cols-2 gap-2">
                                  {tour.included?.map((highlight, idx) => (
                                    <div key={idx} className="flex items-center text-sm text-muted-foreground">
                                      <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                                      {highlight}
                                    </div>
                                  ))}
                                </div>
                            </div>
                          </div>

                          {/* Bottom section with price and CTA */}
                          <div className="relative z-10">
                            {/* Urgency banner */}
                            <div className="bg-gradient-to-r from-primary/90 to-primary text-white p-2 sm:p-3 rounded-lg mb-4 sm:mb-6 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 animate-pulse" />
                                <span className="text-sm sm:text-base font-bold">{dealData[tour.id]?.urgency}</span>
                              </div>
                              <div className="text-xs sm:text-sm opacity-90">Valid until {tour.nextDeparture}</div>
                            </div>

                            {/* Price section */}
                            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 sm:p-6 rounded-xl mb-4 sm:mb-6 relative overflow-hidden">
                              <div className="absolute top-0 right-0 w-16 sm:w-20 h-16 sm:h-20 bg-primary/30 rounded-full transform translate-x-10 -translate-y-10 opacity-20"></div>
                              <div className="relative z-10">
                                <div className="flex items-end justify-between">
                                  <div>
                                    <div className="text-xs sm:text-sm text-muted line-through mb-1">
                                      Was ${dealData[tour.id]?.originalPrice}
                                    </div>
                                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                                      ${tour.price}
                                    </div>
                                    <div className="text-sm sm:text-base text-primary font-semibold">
                                      You save ${dealData[tour.id]?.savings}!
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-xl sm:text-2xl font-bold text-primary/80">
                                      {dealData[tour.id]?.discount}%
                                    </div>
                                    <div className="text-xs sm:text-sm text-muted">OFF</div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Action buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                              <Button 
                                size="lg" 
                                className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-sm sm:text-base lg:text-lg py-5 sm:py-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
                                onClick={() => handleBookNow(tour)}
                              >
                                <span>Book Now & Save</span>
                                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="lg" 
                                className="px-4 sm:px-6 py-5 sm:py-6 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105"
                                onClick={() => handleDetailsClick(tour)}
                              >
                                Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Custom carousel controls */}
            <CarouselPrevious className="left-2 sm:left-4 bg-white/80 backdrop-blur-sm border-2 border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all duration-300" />
            <CarouselNext className="right-2 sm:right-4 bg-white/80 backdrop-blur-sm border-2 border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all duration-300" />
          </Carousel>

          {/* Carousel indicators */}
          <div className="flex justify-center mt-6 sm:mt-8 gap-2">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full transition-all duration-300 ${
                  index === current - 1 
                    ? 'bg-primary w-6 sm:w-8' 
                    : 'bg-gray-300 hover:bg-primary/30'
                }`}
                onClick={() => api?.scrollTo(index)}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA section */}
        <div className="text-center mt-8 sm:mt-12 lg:mt-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Don't Miss These Amazing Deals!</h3>
            <p className="text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 opacity-90">
              Limited time offers with incredible savings. Book your dream vacation today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-gray-100 px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base lg:text-lg font-semibold transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              >
                View All Deals
              </Button>
              <div className="flex items-center gap-2 text-primary">
                <Zap className="h-4 w-4 sm:h-5 sm:w-5 animate-pulse" />
                <span className="text-sm sm:text-base font-medium">Flash sales ending soon!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
              {selectedTour && (
          <BookingModal 
            isOpen={isBookingModalOpen} 
            onClose={handleCloseBookingModal} 
            tour={selectedTour} 
          />
        )}
    </section>
  )
}