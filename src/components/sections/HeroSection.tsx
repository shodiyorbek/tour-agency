"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MapPin, Users, Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

// Define the rotation data with backgrounds and titles
const rotationData = [
  {
    background: "/images/bg.jpg",
    alt: "Stunning mountain landscape with turquoise lake",
    title: "EXPLORE THE",
    subtitle: "WORLD"
  },
  {
    background: "/images/tropical-beach.jpg",
    alt: "Beautiful tropical beach with crystal clear waters",
    title: "DISCOVER",
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
    }, 10000) // 10 seconds for testing, change to 1800000 for production

    return () => clearInterval(interval)
  }, [])

  const currentData = rotationData[currentIndex]

  return (
    <section id="home">
      <div className="relative z-10 mt-20 flex  items-center justify-center overflow-hidden max-w-[1280px] h-[621px] w-full mx-auto rounded-[40px]">
        <div className="absolute inset-0 z-0 ">
          <Image
            src={currentData.background}
            alt={currentData.alt}
            fill
            className="object-cover transition-all duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="bg-black/5 rounded-[40px] backdrop-blur-sm absolute inset-0"/>

        <motion.div
          className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto "
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="mb-8">
            <motion.h1
              className="text-4xl sm:text-6xl lg:text-8xl font-bold text-white mb-4 tracking-wider"
              style={{
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {currentData.title}
            </motion.h1>
            <motion.h1
              className="text-[150px] font-bold tracking-widest"
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                color: "rgba(255,255,255,0.3)",
                mixBlendMode: "lighten"
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {currentData.subtitle}
            </motion.h1>
          </div>
        </motion.div>

        
        


        
      </div>

      <div className="z-10 absolute w-full translate-y-[-100px]">
      <motion.div
        className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-2xl max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Destination
            </label>
            <Input
              placeholder="Search destinations..."
              className="h-12 border-gray-200 focus:border-primary focus:ring-primary"
            />
          </div>

          {/* Departure Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              Departure
            </label>
            <Input type="date" className="h-12 border-gray-200 focus:border-primary focus:ring-primary" />
          </div>

          {/* Return Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              Return
            </label>
            <Input type="date" className="h-12 border-gray-200 focus:border-primary focus:ring-primary" />
          </div>

          {/* Travelers */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Travelers
            </label>
            <select className="h-12 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:ring-primary focus:outline-none">
              <option>1 Adult, Economy</option>
              <option>2 Adults, Economy</option>
              <option>2 Adults, 1 Child</option>
              <option>Family (4+)</option>
            </select>
          </div>

          {/* Search Button */}
          <Button
            size="lg"
            className="h-12 bg-primary hover:bg-primary/90 text-white font-semibold px-8 transition-all duration-300 transform hover:scale-105"
          >
            Search Tours
          </Button>
        </div>

      
      </motion.div>
      </div>
    </section>
  )
}