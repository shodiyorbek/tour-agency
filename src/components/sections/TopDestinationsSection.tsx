"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
const destinations = [
  {
    id: 1,
    name: "Santorini, Greece",
    image: "/destination/istanbul.webp",
    rating: 4.8,
    price: "$1,200",
    duration: "5 Days",
    description: "Experience the stunning white architecture and breathtaking sunsets of the Greek islands.",
    listings: 28
  },
  {
    id: 2,
    name: "Bali, Indonesia",
    image: "/destination/bali.webp",
    rating: 4.9,
    price: "$950",
    duration: "7 Days",
    description: "Discover tropical paradise with pristine beaches and rich cultural heritage.",
    listings: 15
  },
  {
    id: 3,
    name: "Swiss Alps",
    image: "/destination/tailand.webp",
    rating: 4.7,
    price: "$1,500",
    duration: "6 Days",
    description: "Adventure through majestic mountains and picturesque alpine villages.",
    listings: 22
  },
  {
    id: 4,
    name: "Tokyo, Japan",
    image: "/destination/vietnam.webp",
    rating: 4.6,
    price: "$1,300",
    duration: "8 Days",
    description: "Immerse yourself in the perfect blend of tradition and modern innovation.",
    listings: 25
  }
]

export default function TopDestinationsSection() {
  const [expandedId, setExpandedId] = useState<number>(1)
  const router = useRouter()
  const handleImageClick = (id: number) => {
    setExpandedId(id)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-[1240px]  mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Top Destinations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular destinations that travelers love. Click on any image to explore more details.
          </p>
        </div>

        {/* Destinations Row - Horizontal on desktop, Vertical on mobile */}
        <div className="flex flex-col md:flex-row gap-4 mx-auto">
          {destinations.map((destination) => {
            const isExpanded = expandedId === destination.id
            const isCollapsed = !isExpanded
            return (
              <motion.div
                key={destination.id}
                layout
                transition={{ 
                  type: 'spring', 
                  stiffness: 100, 
                  damping: 20,
                  duration: 0.8
                }}
                className={`relative group cursor-pointer rounded-3xl overflow-hidden shadow-lg bg-white/0 flex flex-col justify-end ${
                  isExpanded
                    ? 'md:flex-1 md:min-w-[50%] h-[300px] md:h-[500px] z-10'
                    : 'w-full md:w-[150px] md:min-w-[150px] h-[120px] md:h-[500px] opacity-80 hover:opacity-100'
                } ${isCollapsed ? 'scale-95 opacity-60' : ''}`}
                onClick={() => handleImageClick(destination.id)}
                animate={{
                  zIndex: isExpanded ? 10 : 1,
                  scale: isCollapsed ? 0.95 : 1,
                  opacity: isCollapsed ? 0.6 : 1,
                  borderRadius: '32px',
                  boxShadow: isExpanded
                    ? '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
                    : '0 2px 8px 0 rgba(31, 38, 135, 0.15)'
                }}
              >
                <motion.div
                  className="absolute inset-0"
                  initial={false}
                  animate={{
                    scale: isExpanded ? 1.04 : 1,
                  }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.4, 0, 0.2, 1] 
                  }}
                  style={{ zIndex: 0 }}
                >
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
                </motion.div>
                {/* Content */}
                <motion.div
                  className={`absolute z-20 flex ${
                    isExpanded
                      ? 'flex-col md:flex-row items-start md:items-end justify-between bottom-0 left-0 right-0 p-4 md:p-8'
                      : 'flex-col items-start justify-end bottom-0 left-0 p-4 md:p-6 h-full w-full'
                  }`}
                  style={isExpanded ? {} : { writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                  initial={false}
                  animate={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                  }}
                  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                >
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: 1,
                      y: isExpanded ? 0 : 20,
                    }}
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                    className={`${isExpanded ? 'mb-4 md:mb-0' : 'mb-8'}`}
                  >
                    <h3 className={`font-bold text-white ${isExpanded ? 'text-xl md:text-2xl mb-2' : 'text-lg md:text-xl'}`}>{destination.name}</h3>
                    <span className={`text-white/80 ${isExpanded ? 'text-sm md:text-base' : 'text-xs md:text-sm'}`}>{destination.listings} Listing</span>
                  </motion.div>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                        className="flex-shrink-0"
                      >
                        <Button 
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push("/destination");
                          }}
                          size="lg" 
                          className="border-white rounded-full bg-white text-black hover:text-white  backdrop-blur-md text-sm md:text-base"
                        >
                          Book Now
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
                                            <Button 
                        onClick={() => router.push("/destination")}
                        className="bg-white text-black h-[50px] w-[200px]"
                      >
                        View All Destinations
                      </Button>
        </div>
      </div>
    </section>
  )
}