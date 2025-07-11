"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MapPin, Star } from "lucide-react"

const destinations = [
  {
    id: 1,
    name: "Santorini, Greece",
    image: "/gallery/kyoto.jpg",
    rating: 4.8,
    price: "$1,200",
    duration: "5 Days",
    description: "Experience the stunning white architecture and breathtaking sunsets of the Greek islands."
  },
  {
    id: 2,
    name: "Bali, Indonesia",
    image: "/gallery/over-water.jpg",
    rating: 4.9,
    price: "$950",
    duration: "7 Days",
    description: "Discover tropical paradise with pristine beaches and rich cultural heritage."
  },
  {
    id: 3,
    name: "Swiss Alps",
    image: "/gallery/aurora.jpg",
    rating: 4.7,
    price: "$1,500",
    duration: "6 Days",
    description: "Adventure through majestic mountains and picturesque alpine villages."
  },
  {
    id: 4,
    name: "Tokyo, Japan",
    image: "/gallery/macho.jpg",
    rating: 4.6,
    price: "$1,300",
    duration: "8 Days",
    description: "Immerse yourself in the perfect blend of tradition and modern innovation."
  }
]

export default function TopDestinationsSection() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const handleImageClick = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Top Destinations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular destinations that travelers love. Click on any image to explore more details.
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-4 gap-2 max-w-4xl mx-auto">
          {destinations.map((destination) => {
            const isExpanded = expandedId === destination.id
            const isCollapsed = expandedId !== null && !isExpanded

            return (
              <div
                key={destination.id}
                className={`relative group cursor-pointer transition-all duration-500 ease-in-out ${
                  isExpanded 
                    ? 'col-span-2 row-span-2' 
                    : isCollapsed 
                      ? 'col-span-1 opacity-60 scale-90' 
                      : 'col-span-1'
                }`}
                onClick={() => handleImageClick(destination.id)}
              >
                {/* Image Container */}
                <div className={`relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 ${
                  isExpanded ? 'h-96' : 'h-32'
                }`}>
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover transition-all duration-500 hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`font-bold ${isExpanded ? 'text-lg' : 'text-sm'}`}>{destination.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className={`${isExpanded ? 'w-4 h-4' : 'w-3 h-3'} fill-yellow-400 text-yellow-400`} />
                        <span className={`${isExpanded ? 'text-sm' : 'text-xs'}`}>{destination.rating}</span>
                      </div>
                    </div>
                    
                    {isExpanded && (
                      <div className="space-y-3 animate-in slide-in-from-bottom-2 duration-500">
                        <p className="text-sm opacity-90">{destination.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {destination.duration}
                            </span>
                            <span className="font-semibold text-yellow-400">
                              {destination.price}
                            </span>
                          </div>
                          <Button 
                            size="sm" 
                            className="bg-yellow-400 text-black hover:bg-yellow-300"
                            onClick={(e) => {
                              e.stopPropagation()
                              // Handle booking
                            }}
                          >
                            Book Now
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {!isExpanded && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs opacity-90">{destination.duration}</span>
                        <span className="font-semibold text-yellow-400 text-xs">{destination.price}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Expand/Collapse Indicator */}
                  <div className={`absolute top-2 right-2 ${isExpanded ? 'w-8 h-8' : 'w-6 h-6'} rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
                    isExpanded ? 'bg-yellow-400/90' : 'hover:bg-white/30'
                  }`}>
                    <span className={`text-white font-bold ${isExpanded ? 'text-sm' : 'text-xs'}`}>
                      {isExpanded ? '×' : '+'}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold">
            View All Destinations
          </Button>
        </div>
      </div>
    </section>
  )
}