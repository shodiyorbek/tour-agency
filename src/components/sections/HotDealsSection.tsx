"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useWishlistContext } from "@/components/wishlist-provider"
import { useToast } from "@/hooks/use-toast"
import { Tour } from "@/hooks/use-wishlist"
import { 
  Flame, 
  Zap, 
  Heart, 
  Star, 
  MapPin, 
  Clock, 
  Users, 
  Calendar,
  ArrowRight,
  Info,
  X
} from "lucide-react"
import Image from "next/image"
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
  const [api, setApi] = useState<any>()
  const [current, setCurrent] = useState(1)
  const [count, setCount] = useState(0)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null)

  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlistContext()
  const { toast } = useToast()

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

  const handleContactUs = (tour: Tour) => {
    // Scroll to contact section
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
    toast({
      title: "Contact Us",
      description: "Please contact us to book this tour. We'll get back to you soon!",
    })
  }

  const handleCloseModal = () => {
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
              Limited time offers • Save up to 35% • Contact us now!
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
                                  onClick={() => handleContactUs(tour)}
                                >
                                  Contact Us
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 sm:p-8 lg:p-10 order-2 lg:order-1 flex flex-col justify-between">
                          <div>
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white text-sm sm:text-base lg:text-lg px-3 sm:px-4 py-1 sm:py-2 animate-pulse shadow-lg">
                                    HOT DEAL
                                  </Badge>
                                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm">
                                    Save ${dealData[tour.id]?.originalPrice - dealData[tour.id]?.salePrice}
                                  </Badge>
                                </div>
                                
                                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                                  {tour.title}
                                </h3>
                                
                                <div className="flex items-center gap-2 text-muted-foreground mb-3">
                                  <MapPin className="h-4 w-4" />
                                  <span className="text-sm sm:text-base">{tour.destination}</span>
                                </div>
                              </div>
                            </div>

                            {/* Rating and Reviews */}
                            <div className="flex items-center gap-2 mb-4">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 sm:h-5 sm:w-5 ${
                                      i < Math.floor(tour.rating)
                                        ? 'fill-primary text-primary'
                                        : 'fill-muted text-muted'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm sm:text-base font-medium">{tour.rating}</span>
                              <span className="text-sm sm:text-base text-muted-foreground">({tour.reviews} reviews)</span>
                            </div>

                            {/* Description */}
                            <p className="text-muted-foreground text-sm sm:text-base mb-6 line-clamp-3">
                              {tour.description}
                            </p>

                            {/* Tour Details */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-primary" />
                                <span className="text-sm sm:text-base">{tour.duration}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-primary" />
                                <span className="text-sm sm:text-base">{tour.groupSize}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-primary" />
                                <span className="text-sm sm:text-base">Valid until {new Date(dealData[tour.id]?.validUntil).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Info className="h-4 w-4 text-primary" />
                                <span className="text-sm sm:text-base">{tour.spotsLeft} spots left</span>
                              </div>
                            </div>

                            {/* Highlights */}
                            <div className="mb-6">
                              <h4 className="font-semibold text-sm sm:text-base mb-2">Highlights:</h4>
                              <div className="flex flex-wrap gap-1">
                                {tour.highlights.slice(0, 3).map((highlight, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {highlight}
                                  </Badge>
                                ))}
                                {tour.highlights.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{tour.highlights.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Price and Actions */}
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
                                    ${tour.price}
                                  </span>
                                  <span className="text-lg sm:text-xl text-muted-foreground line-through">
                                    ${dealData[tour.id]?.originalPrice}
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground">per person</p>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <Button
                                onClick={() => setSelectedTour(tour)}
                                variant="outline"
                                className="flex-1 hover:bg-primary/10"
                              >
                                <Info className="h-4 w-4 mr-2" />
                                View Details
                              </Button>
                              <Button
                                onClick={() => handleContactUs(tour)}
                                className="flex-1 bg-primary hover:bg-primary/90"
                              >
                                Contact Us
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
            
            <CarouselPrevious className="hidden lg:flex" />
            <CarouselNext className="hidden lg:flex" />
          </Carousel>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === current - 1 ? 'bg-primary w-6' : 'bg-primary/30'
                  }`}
                  onClick={() => api?.scrollTo(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tour Details Modal */}
      {selectedTour && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold">{selectedTour.title}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCloseModal}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedTour.image}
                    alt={selectedTour.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">{selectedTour.destination}</span>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{selectedTour.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span>Group size: {selectedTour.groupSize}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-primary" />
                      <span>{selectedTour.rating}/5 ({selectedTour.reviews} reviews)</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-muted-foreground">{selectedTour.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold">${selectedTour.price}</span>
                      <span className="text-muted-foreground"> per person</span>
                    </div>
                    <Button onClick={() => handleContactUs(selectedTour)} className="bg-primary hover:bg-primary/90">
                      Contact Us
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}