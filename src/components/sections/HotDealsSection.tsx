"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Clock, MapPin, Users, Star, Flame, Calendar } from "lucide-react"
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
    image: "/placeholder.svg?height=400&width=600",
    description: "Immerse yourself in luxury with desert safaris, gold souks, and modern marvels. Includes Burj Khalifa access and traditional dhow cruise.",
    highlights: ["Desert Safari", "Burj Khalifa", "Gold Souk", "Dhow Cruise"],
    validUntil: "2024-03-15",
    category: "Luxury Adventure",
    urgency: "Limited Time Offer",
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
    image: "/placeholder.svg?height=400&width=600",
    description: "Witness the Great Migration and Big Five in their natural habitat. Luxury tented camps with expert guides and cultural village visits included.",
    highlights: ["Great Migration", "Big Five Safari", "Luxury Tents", "Cultural Villages"],
    validUntil: "2024-04-30",
    category: "Wildlife Safari",
    urgency: "Early Bird Special",
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
    image: "/placeholder.svg?height=400&width=600",
    description: "Sail through crystal-clear waters visiting Mykonos, Santorini, and Crete. Includes yacht accommodation and traditional Greek dining experiences.",
    highlights: ["Yacht Experience", "Santorini Sunset", "Greek Cuisine", "Ancient Ruins"],
    validUntil: "2024-05-20",
    category: "Island Adventure",
    urgency: "Super Early Bird!",
  },
]

export default function HotDealsSection() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

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
    <section id="hot-deals" className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Flame className="h-8 w-8 text-red-500" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Hot Deals</h2>
            <Flame className="h-8 w-8 text-red-500" />
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Limited time offers on our most popular destinations. Book now and save big!
          </p>
        </div>

        <div className="relative">
          <Carousel
            setApi={setApi}
            className="w-full"
            plugins={[
              Autoplay({
                delay: 5000,
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
              {hotDeals.map((deal) => (
                <CarouselItem key={deal.id}>
                  <Card className="group overflow-hidden border-0 h-full  hover:shadow-3xl transition-all duration-300 bg-white">
                    <div className="relative">
                     
                      <div className="relative overflow-hidden h-80 md:h-96">
                        <Image
                          src={deal.image || "/placeholder.svg"}
                          alt={deal.title}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-red-500 text-white text-lg px-3 py-1 animate-pulse">
                            -{deal.discount}% OFF
                          </Badge>
                        </div>

                        <div className="absolute top-4 right-4">
                          <Badge variant="destructive" className="text-sm">
                            {deal.urgency}
                          </Badge>
                        </div>

                        <div className="absolute bottom-4 right-4 text-right">
                          <div className="text-white text-sm line-through opacity-75">
                            ${deal.originalPrice}
                          </div>
                          <div className="text-white text-3xl font-bold">
                            ${deal.salePrice}
                          </div>
                        </div>
                      </div>

                      <div className="p-8">
                        <div className="flex items-center justify-between mb-4">
                          <Badge className="bg-primary text-white">{deal.category}</Badge>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{deal.rating}</span>
                            <span className="text-sm text-gray-500">({deal.reviews} reviews)</span>
                          </div>
                        </div>

                        <CardHeader className="p-0 mb-4">
                          <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-200">
                            {deal.title}
                          </CardTitle>
                          <div className="flex items-center text-gray-600 mt-2">
                            <MapPin className="h-5 w-5 mr-2" />
                            <span className="text-lg">{deal.destination}</span>
                          </div>
                        </CardHeader>

                        <CardContent className="p-0">
                          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                            {deal.description}
                          </p>

                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                            <div className="flex items-center text-gray-600">
                              <Clock className="h-5 w-5 mr-2" />
                              <span>{deal.duration}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Users className="h-5 w-5 mr-2" />
                              <span>{deal.groupSize}</span>
                            </div>
                            <div className="flex items-center text-red-600 col-span-2 md:col-span-1">
                              <Calendar className="h-5 w-5 mr-2" />
                              <span className="font-medium">Valid until {deal.validUntil}</span>
                            </div>
                          </div>

                          <div className="mb-6">
                            <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
                            <div className="flex flex-wrap gap-2">
                              {deal.highlights.map((highlight, idx) => (
                                <Badge key={idx} variant="secondary" className="text-sm">
                                  {highlight}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex gap-4">
                            <Button 
                              size="lg" 
                              className="flex-1 bg-red-600 hover:bg-red-700 text-white text-lg py-3"
                            >
                              Book Now & Save ${deal.originalPrice - deal.salePrice}
                            </Button>
                            <Button 
                              variant="outline" 
                              size="lg" 
                              className="px-6 py-3 animated-button"
                            >
                              Learn More
                            </Button>
                          </div>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-4">
            Don't miss out on these incredible deals!
          </p>
          <Button
            variant="outline"
            size="lg"
            className="animated-button px-8 py-3 hover:bg-red-50 border-red-600 text-red-600 hover:text-red-700 transition-colors duration-200"
          >
            Book Now
          </Button>
        </div>
      </div>
    </section>
  )
}