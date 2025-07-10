"use client"

import { useState, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { MapPin, Users, Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    setIsLoaded(true)
    controls.start("visible")
  }, [controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
      },
    },
  }

  const titleVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
  }

  const searchBoxVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        delay: 0.8,
        ease: "easeOut",
      },
    },
  }

  return (
    <section id="home">
      <div className="relative mt-20 flex items-center justify-center overflow-hidden max-w-[1280px] h-[621px] w-full mx-auto rounded-[40px]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/bg.jpg"
            alt="Stunning mountain landscape with turquoise lake"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Animated Content */}
        <motion.div
          className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Main Title */}
          <motion.div variants={titleVariants} className="mb-8">
            <motion.h1
              className="text-4xl sm:text-6xl lg:text-8xl font-bold text-white mb-4 tracking-wider"
              style={{
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              EXPLORE THE
            </motion.h1>
            <motion.h1
              className="text-[150px] font-bold text-white tracking-widest mix-blend-overlay"
              style={{
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
              variants={{
                hidden: { scale: 0.8, opacity: 0 },
                visible: {
                  scale: 1,
                  opacity: 1,
                  transition: {
                    duration: 1.2,
                    delay: 0.3,
                    ease: "easeOut",
                  },
                },
              }}
            >
              WORLD
            </motion.h1>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
            opacity: 1,
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          initial={{ opacity: 0 }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </div>

      <motion.div
        variants={searchBoxVariants}
        className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-2xl max-w-5xl mx-auto translate-y-[-100px]"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          {/* Destination */}
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

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-8 pt-6 border-t border-gray-200">
          <Button
            variant="outline"
            className="flex items-center gap-2 hover:bg-primary/10 hover:border-primary transition-colors bg-transparent"
          >
            <Plane className="w-4 h-4" />
            Flights
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 hover:bg-primary/10 hover:border-primary transition-colors bg-transparent"
          >
            <MapPin className="w-4 h-4" />
            Hotels
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 hover:bg-primary/10 hover:border-primary transition-colors bg-transparent"
          >
            Popular Destinations
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 hover:bg-primary/10 hover:border-primary transition-colors bg-transparent"
          >
            Last Minute Deals
          </Button>
        </div>
      </motion.div>
    </section>
  )
}