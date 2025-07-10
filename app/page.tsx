"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion, useAnimation } from "framer-motion"
import {
  MapPin,
  Users,
  Star,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Menu,
  X,
  Clock,
  Globe,
  Award,
  Heart,
  Camera,
  Plane,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ImageGallery from "@/components/image-gallery"
import AnimatedCounter from "@/components/animated-counter"
import FloatingElements from "@/components/floating-elements"

gsap.registerPlugin(ScrollTrigger)

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

const stats = [
  { icon: Globe, label: "Countries Visited", value: 50, suffix: "+" },
  { icon: Users, label: "Happy Travelers", value: 10000, suffix: "+" },
  { icon: Award, label: "Awards Won", value: 25, suffix: "+" },
  { icon: Star, label: "Average Rating", value: 4.9, suffix: "" },
]

export default function TravelAgency() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const toursRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLElement>(null)

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)

    const ctx = gsap.context(() => {
      // Hero section animations
      const tl = gsap.timeline()
      tl.fromTo(".hero-pill", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
        .fromTo(".hero-title", { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, "-=0.4")
        .fromTo(
          ".hero-subtitle",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.6",
        )
        .fromTo(
          ".hero-buttons",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.4",
        )

      // Parallax effect for hero background
      gsap.to(".hero-bg", {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })

      // Tours section animations
      gsap.fromTo(
        ".tour-card",
        {
          opacity: 0,
          y: 100,
          rotationX: 15,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: toursRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // About section animations
      gsap.fromTo(
        ".about-content",
        {
          opacity: 0,
          x: -100,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      )

      gsap.fromTo(
        ".about-image",
        {
          opacity: 0,
          x: 100,
          scale: 0.8,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Stats section animations
      gsap.fromTo(
        ".stat-item",
        {
          opacity: 0,
          y: 50,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Enhanced hover animations for tour cards
      gsap.utils.toArray(".tour-card").forEach((card: any) => {
        const image = card.querySelector(".tour-image")
        const content = card.querySelector(".tour-content")

        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -10,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
          })
          gsap.to(image, {
            scale: 1.1,
            duration: 0.5,
            ease: "power2.out",
          })
          gsap.to(content, {
            y: -5,
            duration: 0.3,
            ease: "power2.out",
          })
        })

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          })
          gsap.to(image, {
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
          })
          gsap.to(content, {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          })
        })
      })

      // Button hover animations
      gsap.utils.toArray(".animated-button").forEach((button: any) => {
        button.addEventListener("mouseenter", () => {
          gsap.to(button, {
            scale: 1.05,
            duration: 0.2,
            ease: "power2.out",
          })
        })

        button.addEventListener("mouseleave", () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out",
          })
        })
      })

      // Floating elements animations
      gsap.utils.toArray(".floating-element").forEach((element: any, index) => {
        gsap.to(element, {
          y: -20,
          rotation: index % 2 === 0 ? 5 : -5,
          duration: 3 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: index * 0.3,
        })
      })

      // Static airplane entrance animations
      gsap.fromTo(
        ".airplane-static",
        {
          opacity: 0,
          scale: 0,
          rotation: 0,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 25,
          duration: 0.8,
          delay: 2,
          ease: "back.out(1.7)",
        },
      )

      gsap.fromTo(
        ".airplane-static-2",
        {
          opacity: 0,
          scale: 0,
          rotation: 0,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: -45,
          duration: 0.8,
          delay: 2.5,
          ease: "back.out(1.7)",
        },
      )

      // Add subtle floating animation to static planes
      gsap.to(".airplane-static", {
        y: -3,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 3,
      })

      gsap.to(".airplane-static-2", {
        y: 3,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 3.5,
      })
    })

    return () => ctx.revert()
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: element, offsetY: 80 },
        ease: "power2.inOut",
      })
    }
    setIsMenuOpen(false)
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

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
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
    <div className="min-h-screen bg-white relative">
      <nav className="fixed top-0 w-full bg-white z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <Camera className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">Travelo</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("home")}
                className="nav-link text-gray-700 hover:text-purple-600 transition-colors duration-200 relative font-medium"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("tours")}
                className="nav-link text-gray-700 hover:text-purple-600 transition-colors duration-200 relative font-medium"
              >
                Discover
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className="nav-link text-gray-700 hover:text-purple-600 transition-colors duration-200 relative font-medium"
              >
                Special Deals
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="nav-link text-gray-700 hover:text-purple-600 transition-colors duration-200 relative font-medium"
              >
                Support
              </button>
              <button className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium">
                Login
              </button>
              <Button className="animated-button bg-purple-600 hover:bg-purple-700 transition-colors duration-200 rounded-full px-6">
                Sign Up
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-purple-600 transition-colors duration-200"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top duration-200">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button
                  onClick={() => scrollToSection("home")}
                  className="block px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("tours")}
                  className="block px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
                >
                  Discover
                </button>
                <button
                  onClick={() => scrollToSection("gallery")}
                  className="block px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
                >
                  Special Deals
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="block px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
                >
                  Support
                </button>
                <button className="block px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium">
                  Login
                </button>
                <div className="px-3 py-2">
                  <Button className="animated-button w-full bg-purple-600 hover:bg-purple-700 transition-colors duration-200 rounded-full">
                    Sign Up
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

    <section>
    <div className="relative mt-20 flex items-center justify-center overflow-hidden max-w-[1280px] h-[621px]  w-full mx-auto rounded-[40px]">
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
            className="text-[150px]  font-bold text-white tracking-widest mix-blend-overlay"
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
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
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
                className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>

            {/* Departure Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                {/* <Calendar className="w-4 h-4" /> */}
                Departure
              </label>
              <Input type="date" className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500" />
            </div>

            {/* Return Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                {/* <Calendar className="w-4 h-4" /> */}
                Return
              </label>
              <Input type="date" className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500" />
            </div>

            {/* Travelers */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Travelers
              </label>
              <select className="h-12 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-emerald-500 focus:ring-emerald-500 focus:outline-none">
                <option>1 Adult, Economy</option>
                <option>2 Adults, Economy</option>
                <option>2 Adults, 1 Child</option>
                <option>Family (4+)</option>
              </select>
            </div>

            {/* Search Button */}
            <Button
              size="lg"
              className="h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 transition-all duration-300 transform hover:scale-105"
            >
              {/* <Search className="w-5 h-5 mr-2" /> */}
              Search Tours
            </Button>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-8 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              className="flex items-center gap-2 hover:bg-emerald-50 hover:border-emerald-300 transition-colors bg-transparent"
            >
              <Plane className="w-4 h-4" />
              Flights
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 hover:bg-emerald-50 hover:border-emerald-300 transition-colors bg-transparent"
            >
              <MapPin className="w-4 h-4" />
              Hotels
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 hover:bg-emerald-50 hover:border-emerald-300 transition-colors bg-transparent"
            >
              Popular Destinations
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 hover:bg-emerald-50 hover:border-emerald-300 transition-colors bg-transparent"
            >
              Last Minute Deals
            </Button>
          </div>
        </motion.div>
    </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 group-hover:bg-blue-200 transition-colors duration-200">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tours Carousel */}
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
                              <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors duration-200">
                                <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors duration-200" />
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

      {/* Image Gallery */}
      <div id="gallery">
        <ImageGallery />
      </div>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="about-content">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Why Choose Wanderlust?</h2>
              <p className="text-lg text-gray-600 mb-8">
                With over 15 years of experience in crafting extraordinary travel experiences, we specialize in creating
                personalized journeys that go beyond the ordinary. Our expert team ensures every detail is perfect.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Award className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Curation</h3>
                    <p className="text-gray-600">
                      Every destination and experience is carefully selected by our travel experts.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Small Groups</h3>
                    <p className="text-gray-600">
                      Intimate group sizes ensure personalized attention and authentic experiences.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Camera className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Unforgettable Moments</h3>
                    <p className="text-gray-600">
                      We create opportunities for those once-in-a-lifetime experiences and memories.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-image relative">
              <Image
                src="/placeholder.svg?height=600&width=500"
                alt="Travel experience"
                width={500}
                height={600}
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-blue-600">
                  <AnimatedCounter end={15} suffix="+" />
                </div>
                <div className="text-gray-600">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Start Your Journey</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ready to explore the world? Get in touch with our travel experts to plan your perfect adventure.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Phone</div>
                    <Link
                      href="tel:+1-555-0123"
                      className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                    >
                      +1 (555) 012-3456
                    </Link>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Email</div>
                    <Link
                      href="mailto:hello@wanderlust.com"
                      className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                    >
                      hello@wanderlust.com
                    </Link>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Office</div>
                    <div className="text-gray-600">123 Travel Street, Adventure City, AC 12345</div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <Link
                    href="https://instagram.com/wanderlust"
                    className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform duration-200"
                  >
                    <Instagram className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://facebook.com/wanderlust"
                    className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform duration-200"
                  >
                    <Facebook className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://twitter.com/wanderlust"
                    className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform duration-200"
                  >
                    <Twitter className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                  <CardDescription>
                    Tell us about your dream destination and we'll create the perfect itinerary for you.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <Input
                          placeholder="John"
                          className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <Input
                          placeholder="Doe"
                          className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <Input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <Textarea
                        placeholder="Tell us about your dream trip..."
                        rows={4}
                        className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <Button className="animated-button w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-200">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Plane className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">Wanderlust</span>
              </div>
              <p className="text-gray-400 mb-4">
                Creating extraordinary travel experiences that inspire and transform lives.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="https://instagram.com/wanderlust"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link
                  href="https://facebook.com/wanderlust"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link
                  href="https://twitter.com/wanderlust"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection("home")}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("tours")}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Tours
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("gallery")}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Gallery
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Destinations</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors duration-200">
                    Dubai
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors duration-200">
                    USA
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors duration-200">
                    Japan
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors duration-200">
                    Maldives
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <div>123 Travel Street</div>
                <div>Adventure City, AC 12345</div>
                <div>Phone: +1 (555) 012-3456</div>
                <div>Email: hello@wanderlust.com</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Wanderlust Travel Agency. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
