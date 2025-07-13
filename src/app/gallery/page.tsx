"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search, 
  Filter, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Heart,
  Share2,
  Download,
  MapPin,
  Calendar,
  Users,
  Star
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Navigation from "@/components/sections/Navigation"
import Footer from "@/components/sections/Footer"

// Gallery data with categories
const galleryData = [
  {
    id: 1,
    title: "Aurora Borealis Adventure",
    category: "nature",
    location: "Iceland",
    duration: "5 days",
    travelers: "12 people",
    rating: 4.9,
    price: "$2,499",
    image: "/gallery/aurora.jpg",
    description: "Experience the magical Northern Lights in the pristine wilderness of Iceland.",
    tags: ["Northern Lights", "Winter", "Photography"]
  },
  {
    id: 2,
    title: "Desert Canyon Expedition",
    category: "adventure",
    location: "Arizona, USA",
    duration: "3 days",
    travelers: "8 people",
    rating: 4.8,
    price: "$1,299",
    image: "/gallery/canyon.avif",
    description: "Explore the stunning red rock formations and hidden canyons of the American Southwest.",
    tags: ["Hiking", "Rock Climbing", "Camping"]
  },
  {
    id: 3,
    title: "Dubai Sunset Experience",
    category: "city",
    location: "Dubai, UAE",
    duration: "4 days",
    travelers: "15 people",
    rating: 4.7,
    price: "$1,899",
    image: "/gallery/dubai-sunset.jpg",
    description: "Discover the modern marvels and golden deserts of Dubai.",
    tags: ["Luxury", "Desert Safari", "Shopping"]
  },
  {
    id: 4,
    title: "Ancient Kyoto Temples",
    category: "cultural",
    location: "Kyoto, Japan",
    duration: "6 days",
    travelers: "10 people",
    rating: 4.9,
    price: "$2,199",
    image: "/gallery/kyoto.jpg",
    description: "Immerse yourself in the rich cultural heritage of Japan's ancient capital.",
    tags: ["Temples", "Cherry Blossoms", "Tea Ceremony"]
  },
  {
    id: 5,
    title: "Machu Picchu Discovery",
    category: "adventure",
    location: "Peru",
    duration: "7 days",
    travelers: "12 people",
    rating: 4.8,
    price: "$2,799",
    image: "/gallery/macho.jpg",
    description: "Trek to the legendary lost city of the Incas in the Andes Mountains.",
    tags: ["Hiking", "History", "Mountain"]
  },
  {
    id: 6,
    title: "Overwater Paradise",
    category: "beach",
    location: "Maldives",
    duration: "5 days",
    travelers: "6 people",
    rating: 4.9,
    price: "$3,299",
    image: "/gallery/over-water.jpg",
    description: "Relax in luxurious overwater bungalows surrounded by crystal clear waters.",
    tags: ["Luxury", "Snorkeling", "Romance"]
  },
  {
    id: 7,
    title: "Serengeti Safari",
    category: "wildlife",
    location: "Tanzania",
    duration: "8 days",
    travelers: "8 people",
    rating: 4.9,
    price: "$3,899",
    image: "/gallery/serengeti.webp",
    description: "Witness the incredible wildlife and annual migration in the African savanna.",
    tags: ["Wildlife", "Safari", "Photography"]
  },
  {
    id: 8,
    title: "Turkish Cappadocia",
    category: "cultural",
    location: "Turkey",
    duration: "4 days",
    travelers: "10 people",
    rating: 4.7,
    price: "$1,599",
    image: "/gallery/turkey.webp",
    description: "Explore the unique rock formations and hot air balloon adventures.",
    tags: ["Hot Air Balloons", "Caves", "History"]
  }
]

const categories = [
  { id: "all", name: "All Destinations", count: galleryData.length },
  { id: "nature", name: "Nature", count: galleryData.filter(item => item.category === "nature").length },
  { id: "adventure", name: "Adventure", count: galleryData.filter(item => item.category === "adventure").length },
  { id: "city", name: "City", count: galleryData.filter(item => item.category === "city").length },
  { id: "cultural", name: "Cultural", count: galleryData.filter(item => item.category === "cultural").length },
  { id: "beach", name: "Beach", count: galleryData.filter(item => item.category === "beach").length },
  { id: "wildlife", name: "Wildlife", count: galleryData.filter(item => item.category === "wildlife").length }
]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<typeof galleryData[0] | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [favorites, setFavorites] = useState<number[]>([])

  const filteredData = galleryData.filter(item => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const openLightbox = (item: typeof galleryData[0], index: number) => {
    setSelectedImage(item)
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setSelectedImage(null)
  }

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % filteredData.length
    setCurrentImageIndex(nextIndex)
    setSelectedImage(filteredData[nextIndex])
  }

  const prevImage = () => {
    const prevIndex = currentImageIndex === 0 ? filteredData.length - 1 : currentImageIndex - 1
    setCurrentImageIndex(prevIndex)
    setSelectedImage(filteredData[prevIndex])
  }

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    )
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

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
  }, [lightboxOpen, currentImageIndex, filteredData])

  return (
    <div className="min-h-screen bg-background">
      <Navigation scrollToSection={scrollToSection} />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-32 pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[url('/images/bg.jpg')] bg-cover bg-center opacity-20" />
        
        {/* Floating elements */}
        <motion.div
          className="absolute top-20 left-10 w-24 h-24 bg-primary/20 rounded-full"
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
                      className="absolute top-40 right-20 w-20 h-20 bg-primary/20 rounded-full"
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 bg-primary/20 text-primary px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg"
            >
              <Search className="h-5 w-5" />
              Explore Our Gallery
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight drop-shadow-lg"
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
              className="text-lg md:text-xl text-foreground max-w-3xl mx-auto mb-12 leading-relaxed drop-shadow-sm"
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

      {/* Filter Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row gap-6 items-center justify-between"
          >
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-primary text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.name}
                  <span className="ml-2 text-xs opacity-75">({category.count})</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Images Showcase Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Stunning Travel Images
            </motion.h2>
            <motion.p 
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Immerse yourself in the beauty of our destinations through these breathtaking images.
            </motion.p>
          </motion.div>

          {/* Image Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
            {galleryData.map((item, index) => (
              <motion.div
                key={`image-${item.id}`}
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
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    whileHover={{ 
                      scale: 1.1,
                      transition: { duration: 0.5 }
                    }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-sm text-white/90 mb-3">{item.location}</p>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-primary fill-current" />
                        <span className="text-sm font-medium">{item.rating}</span>
                        <span className="text-sm text-white/70">•</span>
                        <span className="text-sm text-white/70">{item.price}</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => openLightbox(item, index)}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                    >
                      <Search className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleFavorite(item.id)}
                      className={`p-2 backdrop-blur-sm rounded-full transition-colors ${
                        favorites.includes(item.id)
                          ? "bg-primary/80 text-primary-foreground"
                          : "bg-white/20 text-white hover:bg-white/30"
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${favorites.includes(item.id) ? "fill-current" : ""}`} />
                    </motion.button>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary/90 text-white border-0">
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
            className="text-center mt-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
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
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-[70vh] object-cover"
                />
                
                {/* Navigation */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Close Button */}
                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>

                {/* Actions */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <button className="p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button className="p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors">
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="bg-white p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {selectedImage.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {selectedImage.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {selectedImage.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {selectedImage.travelers}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {selectedImage.price}
                    </div>
                    <div className="flex items-center gap-1 justify-end">
                      <Star className="h-4 w-4 text-primary fill-current" />
                      <span className="text-sm font-medium">{selectedImage.rating}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4">
                  {selectedImage.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {selectedImage.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
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