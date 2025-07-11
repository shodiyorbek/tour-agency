"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MapPin, Users, Calendar, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

// Define the rotation data with backgrounds and titles
const rotationData = [
  {
    background: "/images/bg.jpg",
    alt: "Stunning mountain landscape with turquoise lake",
    title: "DISCOVER",
    subtitle: "THE WORLD"
  },
  {
    background: "/images/tropical-beach.jpg",
    alt: "Beautiful tropical beach with crystal clear waters",
    title: "EXPLORE",
    subtitle: "PARADISE"
  },
  {
    background: "/gallery/aurora.jpg",
    alt: "Breathtaking aurora borealis in the night sky",
    title: "WITNESS",
    subtitle: "MAGIC"
  },
  {
    background: "/gallery/dubai-sunset.jpg",
    alt: "Stunning Dubai skyline at sunset",
    title: "EXPERIENCE",
    subtitle: "LUXURY"
  },
  {
    background: "/gallery/kyoto.jpg",
    alt: "Traditional Japanese temple in Kyoto",
    title: "IMMERSE",
    subtitle: "CULTURE"
  },
  {
    background: "/gallery/serengeti.webp",
    alt: "Wildlife safari in Serengeti plains",
    title: "EMBRACE",
    subtitle: "ADVENTURE"
  },
  {
    background: "/gallery/canyon.avif",
    alt: "Majestic canyon landscape",
    title: "CONQUER",
    subtitle: "NATURE"
  },
  {
    background: "/gallery/over-water.jpg",
    alt: "Overwater bungalows in tropical paradise",
    title: "ESCAPE",
    subtitle: "REALITY"
  }
]

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % rotationData.length)
    }, 8000) // 8 seconds per slide

    return () => clearInterval(interval)
  }, [])

  const currentData = rotationData[currentIndex]

  return (
    <section id="home" className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={currentData.background}
          alt={currentData.alt}
          fill
          className="object-cover transition-all duration-1000"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-6xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <motion.h1
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white mb-4 tracking-wider"
              style={{
                textShadow: "2px 2px 8px rgba(0,0,0,0.6)",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {currentData.title}
            </motion.h1>
            <motion.h2
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[120px] font-bold text-white tracking-widest"
              style={{
                textShadow: "2px 2px 8px rgba(0,0,0,0.6)",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {currentData.subtitle}
            </motion.h2>
          </motion.div>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Experience the world's most breathtaking destinations with our curated travel experiences
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Explore Tours
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
            >
              View Gallery
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Search Form */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pb-8">
        <motion.div
          className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl max-w-6xl mx-auto mx-4 sm:mx-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div className="space-y-2 sm:col-span-2 lg:col-span-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Destination
              </label>
              <Input
                placeholder="Where do you want to go?"
                className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Departure
              </label>
              <Input 
                type="date" 
                className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Return
              </label>
              <Input 
                type="date" 
                className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500" 
              />
            </div>

            <div className="space-y-2 sm:col-span-2 lg:col-span-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Travelers
              </label>
              <select className="h-12 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none">
                <option>1 Adult, Economy</option>
                <option>2 Adults, Economy</option>
                <option>2 Adults, 1 Child</option>
                <option>Family (4+)</option>
              </select>
            </div>

            <Button
              size="lg"
              className="h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 transition-all duration-300 transform hover:scale-105 w-full sm:col-span-2 lg:col-span-1 flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              Search Tours
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}