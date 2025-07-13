import type { Metadata } from 'next'
import { constructMetadata, generateStructuredData } from '@/lib/metadata'

export const metadata: Metadata = constructMetadata({
  title: 'Travel Gallery | Photo Gallery & Travel Inspiration',
  description: 'Browse our stunning travel photo gallery showcasing luxury destinations, cultural experiences, and adventure tours. Get inspired for your next journey with Big Tour.',
  image: '/gallery/dubai-sunset.jpg',
})

"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search, 
  Filter, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Share2,
  Download,
  MapPin,
  Calendar,
  Users,
  Star,
  Loader2,
  AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Navigation from "@/components/sections/Navigation"
import Footer from "@/components/sections/Footer"
import Image from "next/image"

// Gallery data with categories using destination images
const galleryData = [
  {
    id: 1,
    title: "Abu Dhabi Luxury Experience",
    category: "city",
    location: "Abu Dhabi, UAE",
    duration: "5 days",
    travelers: "12 people",
    rating: 4.9,
    price: "$2,499",
    image: "/destination/abu-dabi.webp",
    description: "Experience the perfect blend of modern luxury and traditional culture in the capital of UAE.",
    tags: ["Luxury", "Culture", "Modern City"]
  },
  {
    id: 2,
    title: "Baku City Discovery",
    category: "city",
    location: "Baku, Azerbaijan",
    duration: "4 days",
    travelers: "8 people",
    rating: 4.8,
    price: "$1,299",
    image: "/destination/baku.webp",
    description: "Explore the fascinating mix of ancient and modern architecture in Azerbaijan's capital.",
    tags: ["Architecture", "History", "Culture"]
  },
  {
    id: 3,
    title: "Qatar Desert Adventure",
    category: "adventure",
    location: "Doha, Qatar",
    duration: "3 days",
    travelers: "10 people",
    rating: 4.7,
    price: "$1,899",
    image: "/destination/qatar.jpg",
    description: "Discover the stunning desert landscapes and modern cityscapes of Qatar.",
    tags: ["Desert", "Adventure", "Modern"]
  },
  {
    id: 4,
    title: "Sri Lanka Cultural Journey",
    category: "cultural",
    location: "Sri Lanka",
    duration: "7 days",
    travelers: "12 people",
    rating: 4.9,
    price: "$2,199",
    image: "/destination/sri-lanka.webp",
    description: "Immerse yourself in the rich cultural heritage and stunning landscapes of Sri Lanka.",
    tags: ["Culture", "Nature", "Temples"]
  },
  {
    id: 5,
    title: "Singapore Urban Paradise",
    category: "city",
    location: "Singapore",
    duration: "4 days",
    travelers: "15 people",
    rating: 4.8,
    price: "$2,799",
    image: "/destination/singapore.webp",
    description: "Experience the perfect harmony of urban sophistication and natural beauty.",
    tags: ["Urban", "Modern", "Nature"]
  },
  {
    id: 6,
    title: "Saudi Arabia Desert Kingdom",
    category: "adventure",
    location: "Saudi Arabia",
    duration: "6 days",
    travelers: "8 people",
    rating: 4.9,
    price: "$3,299",
    image: "/destination/arabia.webp",
    description: "Explore the vast deserts and rich cultural heritage of Saudi Arabia.",
    tags: ["Desert", "Culture", "Adventure"]
  },
  {
    id: 7,
    title: "Dubai Modern Marvel",
    category: "city",
    location: "Dubai, UAE",
    duration: "5 days",
    travelers: "12 people",
    rating: 4.9,
    price: "$2,899",
    image: "/destination/dubai.webp",
    description: "Discover the architectural wonders and luxury experiences of Dubai.",
    tags: ["Luxury", "Modern", "Architecture"]
  },
  {
    id: 8,
    title: "Thailand Tropical Paradise",
    category: "beach",
    location: "Thailand",
    duration: "6 days",
    travelers: "10 people",
    rating: 4.8,
    price: "$1,999",
    image: "/destination/tailand.webp",
    description: "Relax in the beautiful beaches and experience the vibrant culture of Thailand.",
    tags: ["Beach", "Culture", "Tropical"]
  },
  {
    id: 9,
    title: "Vietnam Cultural Heritage",
    category: "cultural",
    location: "Vietnam",
    duration: "7 days",
    travelers: "12 people",
    rating: 4.7,
    price: "$2,099",
    image: "/destination/vietnam.webp",
    description: "Explore the rich history, culture, and stunning landscapes of Vietnam.",
    tags: ["Culture", "History", "Nature"]
  },
  {
    id: 10,
    title: "Maldives Overwater Paradise",
    category: "beach",
    location: "Maldives",
    duration: "5 days",
    travelers: "6 people",
    rating: 4.9,
    price: "$3,899",
    image: "/destination/maldivs.webp",
    description: "Experience ultimate luxury in overwater bungalows surrounded by crystal clear waters.",
    tags: ["Luxury", "Beach", "Romance"]
  },
  {
    id: 11,
    title: "Bali Island Adventure",
    category: "nature",
    location: "Bali, Indonesia",
    duration: "8 days",
    travelers: "10 people",
    rating: 4.9,
    price: "$2,599",
    image: "/destination/bali.webp",
    description: "Discover the spiritual temples, rice terraces, and beautiful beaches of Bali.",
    tags: ["Nature", "Culture", "Spiritual"]
  },
  {
    id: 12,
    title: "Istanbul Crossroads of Cultures",
    category: "cultural",
    location: "Istanbul, Turkey",
    duration: "5 days",
    travelers: "12 people",
    rating: 4.8,
    price: "$1,799",
    image: "/destination/istanbul.webp",
    description: "Experience the unique blend of European and Asian cultures in this historic city.",
    tags: ["Culture", "History", "Architecture"]
  },
  {
    id: 13,
    title: "Georgia Mountain Adventure",
    category: "adventure",
    location: "Georgia",
    duration: "6 days",
    travelers: "8 people",
    rating: 4.7,
    price: "$1,699",
    image: "/destination/gruzia.webp",
    description: "Explore the stunning Caucasus mountains and rich cultural heritage of Georgia.",
    tags: ["Mountains", "Adventure", "Culture"]
  },
  {
    id: 14,
    title: "China Ancient Wonders",
    category: "cultural",
    location: "China",
    duration: "10 days",
    travelers: "15 people",
    rating: 4.8,
    price: "$3,199",
    image: "/destination/china.webp",
    description: "Discover the ancient wonders and modern marvels of China's diverse landscapes.",
    tags: ["Culture", "History", "Ancient"]
  },
  {
    id: 15,
    title: "Malaysia Tropical Diversity",
    category: "nature",
    location: "Malaysia",
    duration: "7 days",
    travelers: "10 people",
    rating: 4.7,
    price: "$2,299",
    image: "/destination/malasia.webp",
    description: "Experience the diverse ecosystems and rich cultural heritage of Malaysia.",
    tags: ["Nature", "Diversity", "Culture"]
  },
  {
    id: 16,
    title: "Cappadocia Hot Air Balloons",
    category: "adventure",
    location: "Cappadocia, Turkey",
    duration: "4 days",
    travelers: "8 people",
    rating: 4.9,
    price: "$1,899",
    image: "/destination/cappadocia.webp",
    description: "Soar above the unique rock formations in a magical hot air balloon experience.",
    tags: ["Adventure", "Hot Air Balloons", "Unique"]
  }
]

// Categories with dynamic counts
const getCategories = () => {
  const categoryCounts = galleryData.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return [
    { id: "all", name: "All", count: galleryData.length },
    { id: "city", name: "City", count: categoryCounts.city || 0 },
    { id: "adventure", name: "Adventure", count: categoryCounts.adventure || 0 },
    { id: "beach", name: "Beach", count: categoryCounts.beach || 0 },
    { id: "cultural", name: "Cultural", count: categoryCounts.cultural || 0 },
    { id: "nature", name: "Nature", count: categoryCounts.nature || 0 }
  ]
}

// Skeleton loading component
const ImageSkeleton = () => (
  <div className="animate-pulse">
    <div className="aspect-[4/3] bg-gray-200 rounded-2xl mb-4"></div>
    <div className="h-4 bg-gray-200 rounded mb-2"></div>
    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
  </div>
)

export default function GalleryPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<typeof galleryData[0] | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imageLoadStates, setImageLoadStates] = useState<Record<number, 'loading' | 'loaded' | 'error'>>({})
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set())

  // Memoized data for better performance
  const filteredData = useMemo(() => {
    return galleryData
  }, [])

  const openLightbox = useCallback((item: typeof galleryData[0], index: number) => {
    setSelectedImage(item)
    setCurrentImageIndex(index)
    setLightboxOpen(true)
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden'
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
    setSelectedImage(null)
    // Restore body scroll
    document.body.style.overflow = 'unset'
  }, [])

  const nextImage = useCallback(() => {
    const nextIndex = (currentImageIndex + 1) % filteredData.length
    setCurrentImageIndex(nextIndex)
    setSelectedImage(filteredData[nextIndex])
  }, [currentImageIndex, filteredData])

  const prevImage = useCallback(() => {
    const prevIndex = currentImageIndex === 0 ? filteredData.length - 1 : currentImageIndex - 1
    setCurrentImageIndex(prevIndex)
    setSelectedImage(filteredData[prevIndex])
  }, [currentImageIndex, filteredData])

  const handleImageLoad = useCallback((id: number) => {
    setImageLoadStates(prev => ({ ...prev, [id]: 'loaded' }))
  }, [])

  const handleImageError = useCallback((id: number) => {
    setImageLoadStates(prev => ({ ...prev, [id]: 'error' }))
  }, [])

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const imageId = parseInt(entry.target.getAttribute('data-image-id') || '0')
            setVisibleImages(prev => new Set([...prev, imageId]))
          }
        })
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1
      }
    )

    // Observe all image containers
    const imageContainers = document.querySelectorAll('[data-image-id]')
    imageContainers.forEach(container => observer.observe(container))

    return () => observer.disconnect()
  }, [filteredData])

  // Preload images for better performance
  useEffect(() => {
    const preloadImages = () => {
      filteredData.slice(0, 6).forEach(item => {
        const img = new window.Image()
        img.src = item.image
        img.onload = () => handleImageLoad(item.id)
        img.onerror = () => handleImageError(item.id)
      })
    }

    if (filteredData.length > 0) {
      preloadImages()
    }
  }, [filteredData, handleImageLoad, handleImageError])

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return
      
      if (e.key === "Escape") {
        closeLightbox()
      } else if (e.key === "ArrowRight") {
        nextImage()
      } else if (e.key === "ArrowLeft") {
        prevImage()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [lightboxOpen, nextImage, prevImage, closeLightbox])

  // Touch gesture handling for mobile lightbox
  useEffect(() => {
    let startX = 0
    let startY = 0

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!lightboxOpen) return

      const endX = e.changedTouches[0].clientX
      const endY = e.changedTouches[0].clientY
      const diffX = startX - endX
      const diffY = startY - endY

      // Minimum swipe distance
      if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
          nextImage()
        } else {
          prevImage()
        }
      }
    }

    document.addEventListener('touchstart', handleTouchStart)
    document.addEventListener('touchend', handleTouchEnd)

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [lightboxOpen, nextImage, prevImage])

  // Initialize image load states
  useEffect(() => {
    const initialStates: Record<number, 'loading' | 'loaded' | 'error'> = {}
    galleryData.forEach(item => {
      initialStates[item.id] = 'loading'
    })
    setImageLoadStates(initialStates)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navigation scrollToSection={scrollToSection} />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-24 sm:pt-32 pb-16 sm:pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[url('/images/bg.jpg')] bg-cover bg-center opacity-20" />
        
        {/* Floating elements - hidden on mobile for better performance */}
        <motion.div
          className="absolute top-20 left-10 w-16 h-16 sm:w-24 sm:h-24 bg-primary/20 rounded-full hidden sm:block"
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-12 h-12 sm:w-20 sm:h-20 bg-primary/20 rounded-full hidden sm:block"
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 shadow-lg"
            >
              <Search className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">Explore Our Gallery</span>
              <span className="sm:hidden">Gallery</span>
            </motion.div>
            
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 sm:mb-6 leading-tight drop-shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover Amazing
              <motion.span 
                className="text-primary block drop-shadow-lg"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 100 }}
              >
                Destinations
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-foreground max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed drop-shadow-sm px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Browse through our stunning collection of travel destinations and find your next adventure.
              From pristine beaches to majestic mountains, we have it all.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Images Showcase Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-8 sm:mb-12"
          >
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Stunning Travel Images
            </motion.h2>
            <motion.p 
              className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Immerse yourself in the beauty of our destinations through these breathtaking images.
            </motion.p>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-6 text-sm text-muted-foreground"
          >
            Showing {filteredData.length} destinations
          </motion.div>

          {/* Image Grid */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {filteredData.map((item, index) => (
              <motion.div
                key={`image-${item.id}`}
                data-image-id={item.id}
                variants={{
                  hidden: { opacity: 0, scale: 0.8, y: 20 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      ease: "easeOut"
                    }
                  }
                }}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {/* Loading State */}
                  {imageLoadStates[item.id] === 'loading' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  )}

                  {/* Error State */}
                  {imageLoadStates[item.id] === 'error' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <div className="text-center">
                        <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground">Image failed to load</p>
                      </div>
                    </div>
                  )}

                  {/* Image */}
                  {visibleImages.has(item.id) && (
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onLoad={() => handleImageLoad(item.id)}
                      onError={() => handleImageError(item.id)}
                      loading="lazy"
                      decoding="async"
                      whileHover={{ 
                        scale: 1.05,
                        transition: { duration: 0.5 }
                      }}
                    />
                  )}
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 line-clamp-2">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-white/90 mb-2 sm:mb-3">{item.location}</p>
                      <div className="flex items-center gap-2">
                        <Star className="h-3 w-3 sm:h-4 sm:w-4 text-primary fill-current" />
                        <span className="text-xs sm:text-sm font-medium">{item.rating}</span>
                        <span className="text-xs sm:text-sm text-white/70">•</span>
                        <span className="text-xs sm:text-sm text-white/70">{item.price}</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => openLightbox(item, index)}
                      className="p-1.5  bg-white/20 backdrop-blur-sm flex items-center justify-center rounded-full text-white hover:bg-white/30 transition-colors"
                      aria-label={`View ${item.title} in lightbox`}
                    >
                      <Search className="h-4 w-4" />
                    </motion.button>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                    <Badge className="bg-primary/90 text-white border-0 text-xs">
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-8 sm:mt-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button className="bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                View All Destinations
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-2 sm:p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden rounded-xl sm:rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div className="relative">
                <Image
                  width={500}
                  height={300}
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-[50vh] sm:h-[70vh] object-cover"
                />
                
                {/* Navigation */}
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>

                {/* Close Button */}
                <button
                  onClick={closeLightbox}
                  className="absolute top-2 sm:top-4 flex items-center justify-center right-2 sm:right-4 p-2 sm:p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                  aria-label="Close lightbox"
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>

              
               

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {filteredData.length}
                </div>
              </div>

              {/* Info */}
              <div className="bg-white p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                      {selectedImage.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                        {selectedImage.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                        {selectedImage.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                        {selectedImage.travelers}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl sm:text-2xl font-bold text-primary mb-1">
                      {selectedImage.price}
                    </div>
                    <div className="flex items-center gap-1 justify-end">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 text-primary fill-current" />
                      <span className="text-xs sm:text-sm font-medium">{selectedImage.rating}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm sm:text-base text-muted-foreground mb-4">
                  {selectedImage.description}
                </p>

                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {selectedImage.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer scrollToSection={scrollToSection} />
    </div>
  )
} 