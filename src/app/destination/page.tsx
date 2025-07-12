"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { 
  Search, 
  MapPin, 
  Star, 
  Heart, 
  Clock, 
  Users, 
  Calendar, 
  ArrowRight, 
  Filter, 
  X,
  ChevronLeft,
  ChevronRight,
  Globe,
  Mountain,
  Beach,
  Building,
  TreePine,
  Plane,
  Menu
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { useWishlistContext } from "@/components/wishlist-provider"
import { useToast } from "@/hooks/use-toast"
import { useDebounce } from "@/hooks/use-debounce"
import { Tour } from "@/hooks/use-wishlist"
import Footer from "@/components/sections/Footer"

const destinations = [
  {
    id: 1,
    title: "Bali Paradise Island",
    location: "Indonesia",
    price: 899,
    duration: "7 days",
    groupSize: "2-12 people",
    rating: 4.9,
    reviews: 127,
    image: "/images/bali.webp",
    description: "Experience the magic of Bali with luxury resorts, pristine beaches, and cultural temples.",
    highlights: ["Beach Resorts", "Temple Tours", "Water Sports", "Cultural Shows"],
    category: "Beach",
    difficulty: "Easy",
    availability: "Available",
    spotsLeft: 8,
    totalSpots: 12,
    nextDeparture: "2024-02-15",
    included: ["Accommodation", "Breakfast", "Airport Transfer", "Guide"],
    notIncluded: ["Flights", "Lunch & Dinner", "Personal Expenses"],
  },
  {
    id: 2,
    title: "Swiss Alps Adventure",
    location: "Switzerland",
    price: 1200,
    duration: "5 days",
    groupSize: "4-16 people",
    rating: 4.8,
    reviews: 89,
    image: "/gallery/canyon.avif",
    description: "Discover the breathtaking beauty of the Swiss Alps with guided hikes and stunning mountain views.",
    highlights: ["Mountain Hiking", "Cable Car Rides", "Alpine Lakes", "Swiss Culture"],
    category: "Mountain",
    difficulty: "Moderate",
    availability: "Limited",
    spotsLeft: 3,
    totalSpots: 16,
    nextDeparture: "2024-03-01",
    included: ["Accommodation", "All Meals", "Activities", "Equipment"],
    notIncluded: ["Flights", "Travel Insurance", "Tips"],
  },
  {
    id: 3,
    title: "Tokyo Urban Experience",
    location: "Japan",
    price: 980,
    duration: "8 days",
    groupSize: "6-14 people",
    rating: 4.7,
    reviews: 64,
    image: "/gallery/kyoto.jpg",
    description: "Journey through the vibrant city of Tokyo with modern attractions and traditional culture.",
    highlights: ["Shibuya Crossing", "Traditional Temples", "Modern Architecture", "Local Cuisine"],
    category: "City",
    difficulty: "Easy",
    availability: "Available",
    spotsLeft: 10,
    totalSpots: 14,
    nextDeparture: "2024-02-20",
    included: ["Accommodation", "Breakfast", "City Tours", "Entrance Fees"],
    notIncluded: ["Flights", "Visa", "Lunch & Dinner"],
  },
  {
    id: 4,
    title: "Maldives Overwater Paradise",
    location: "Maldives",
    price: 2400,
    duration: "6 days",
    groupSize: "2 people",
    rating: 5.0,
    reviews: 156,
    image: "/gallery/over-water.jpg",
    description: "Ultimate romantic getaway with overwater villas, private beaches, and world-class spa treatments.",
    highlights: ["Overwater Villa", "Private Beach", "Spa Treatments", "Sunset Cruise"],
    category: "Beach",
    difficulty: "Easy",
    availability: "Available",
    spotsLeft: 5,
    totalSpots: 5,
    nextDeparture: "2024-02-10",
    included: ["Luxury Villa", "All Meals", "Spa Credit", "Water Sports"],
    notIncluded: ["Flights", "Alcohol", "Diving Courses"],
  },
  {
    id: 5,
    title: "Amazon Rainforest Expedition",
    location: "Brazil",
    price: 1650,
    duration: "10 days",
    groupSize: "8-20 people",
    rating: 4.9,
    reviews: 203,
    image: "/gallery/serengeti.webp",
    description: "Explore the Amazon rainforest with guided tours, wildlife spotting, and indigenous culture.",
    highlights: ["Wildlife Spotting", "Indigenous Culture", "River Cruises", "Canopy Walks"],
    category: "Nature",
    difficulty: "Moderate",
    availability: "Filling Fast",
    spotsLeft: 5,
    totalSpots: 20,
    nextDeparture: "2024-03-25",
    included: ["Lodges", "Breakfast", "Guided Tours", "Activities"],
    notIncluded: ["Flights", "Lunch & Dinner", "Personal Shopping"],
  },
  {
    id: 6,
    title: "Santorini Island Hopping",
    location: "Greece",
    price: 2100,
    duration: "12 days",
    groupSize: "4-12 people",
    rating: 4.8,
    reviews: 91,
    image: "/images/tropical-beach.jpg",
    description: "Island hop through the Greek islands enjoying pristine beaches, ancient ruins, and local cuisine.",
    highlights: ["Santorini Sunset", "Mykonos Beaches", "Ancient Ruins", "Greek Cuisine"],
    category: "Beach",
    difficulty: "Easy",
    availability: "Limited",
    spotsLeft: 2,
    totalSpots: 12,
    nextDeparture: "2024-06-15",
    included: ["Hotels", "Ferries", "Breakfast", "Island Tours"],
    notIncluded: ["Flights", "Lunch & Dinner", "Beach Activities"],
  },
  {
    id: 7,
    title: "New York City Explorer",
    location: "USA",
    price: 1850,
    duration: "8 days",
    groupSize: "10-25 people",
    rating: 4.9,
    reviews: 178,
    image: "/gallery/dubai-sunset.jpg",
    description: "Experience the city that never sleeps with iconic landmarks, Broadway shows, and diverse culture.",
    highlights: ["Times Square", "Broadway Shows", "Central Park", "Museums"],
    category: "City",
    difficulty: "Easy",
    availability: "Available",
    spotsLeft: 15,
    totalSpots: 25,
    nextDeparture: "2024-05-10",
    included: ["Hotels", "Breakfast", "City Tours", "Show Tickets"],
    notIncluded: ["Flights", "Lunch & Dinner", "Shopping"],
  },
  {
    id: 8,
    title: "Machu Picchu Trek",
    location: "Peru",
    price: 1450,
    duration: "9 days",
    groupSize: "6-15 people",
    rating: 4.8,
    reviews: 142,
    image: "/gallery/macho.jpg",
    description: "Trek the legendary Inca Trail to reach the ancient citadel of Machu Picchu.",
    highlights: ["Inca Trail", "Machu Picchu", "Sacred Valley", "Cusco City"],
    category: "Mountain",
    difficulty: "Challenging",
    availability: "Limited",
    spotsLeft: 4,
    totalSpots: 15,
    nextDeparture: "2024-04-15",
    included: ["Camping Equipment", "All Meals", "Permits", "Train Tickets"],
    notIncluded: ["Flights", "Sleeping Bag", "Tips"],
  },
  {
    id: 9,
    title: "Dubai Luxury Experience",
    location: "UAE",
    price: 1320,
    duration: "10 days",
    groupSize: "8-18 people",
    rating: 4.7,
    reviews: 96,
    image: "/gallery/turkey.webp",
    description: "Experience the luxury of Dubai with iconic landmarks, desert safaris, and world-class shopping.",
    highlights: ["Burj Khalifa", "Desert Safari", "Dubai Mall", "Luxury Hotels"],
    category: "City",
    difficulty: "Easy",
    availability: "Available",
    spotsLeft: 12,
    totalSpots: 18,
    nextDeparture: "2024-05-01",
    included: ["Luxury Hotels", "Breakfast", "Desert Safari", "City Tours"],
    notIncluded: ["Flights", "Lunch & Dinner", "Shopping"],
  },
  {
    id: 10,
    title: "Iceland Northern Lights",
    location: "Iceland",
    price: 1980,
    duration: "11 days",
    groupSize: "4-10 people",
    rating: 4.9,
    reviews: 134,
    image: "/gallery/aurora.jpg",
    description: "Witness the magical Northern Lights and explore Iceland's stunning natural wonders.",
    highlights: ["Northern Lights", "Blue Lagoon", "Glacier Walks", "Waterfalls"],
    category: "Nature",
    difficulty: "Moderate",
    availability: "Filling Fast",
    spotsLeft: 3,
    totalSpots: 10,
    nextDeparture: "2024-09-15",
    included: ["Hotels", "Breakfast", "Activities", "Transport"],
    notIncluded: ["Flights", "Lunch & Dinner", "Optional Tours"],
  },
  {
    id: 11,
    title: "Moroccan Desert Adventure",
    location: "Morocco",
    price: 890,
    duration: "7 days",
    groupSize: "6-16 people",
    rating: 4.8,
    reviews: 87,
    image: "/images/bali.webp",
    description: "Journey from Marrakech to the Sahara Desert, experiencing Berber culture and camping under the stars.",
    highlights: ["Sahara Camping", "Camel Trek", "Marrakech Souks", "Atlas Mountains"],
    category: "Desert",
    difficulty: "Moderate",
    availability: "Available",
    spotsLeft: 9,
    totalSpots: 16,
    nextDeparture: "2024-03-10",
    included: ["Transport", "Desert Camp", "Guides", "Most Meals"],
    notIncluded: ["Flights", "Tips", "Personal Shopping"],
  },
  {
    id: 12,
    title: "New Zealand Adventure",
    location: "New Zealand",
    price: 2250,
    duration: "14 days",
    groupSize: "8-20 people",
    rating: 4.9,
    reviews: 167,
    image: "/gallery/canyon.avif",
    description: "Experience both North and South Islands with adventure activities, Maori culture, and stunning landscapes.",
    highlights: ["Milford Sound", "Queenstown Adventures", "Hobbiton", "Maori Culture"],
    category: "Adventure",
    difficulty: "Moderate",
    availability: "Available",
    spotsLeft: 14,
    totalSpots: 20,
    nextDeparture: "2024-11-01",
    included: ["Hotels", "Transport", "Activities", "Some Meals"],
    notIncluded: ["Flights", "Adventure Sports", "Most Meals"],
  },
]

const categories = [
  { id: "all", name: "All Destinations", icon: Globe },
  { id: "beach", name: "Beach", icon: Beach },
  { id: "mountain", name: "Mountain", icon: Mountain },
  { id: "city", name: "City", icon: Building },
  { id: "nature", name: "Nature", icon: TreePine },
  { id: "desert", name: "Desert", icon: Plane },
]

const sortOptions = ["Popular", "Price: Low to High", "Price: High to Low", "Rating", "Duration"]

interface DestinationCardProps {
  destination: typeof destinations[0]
  index: number
  isInWishlist: boolean
  onToggleWishlist: (destination: typeof destinations[0]) => void
  onSelectDestination: (destination: typeof destinations[0]) => void
  onContactUs: () => void
}

const DestinationCard = ({ 
  destination, 
  index, 
  isInWishlist, 
  onToggleWishlist, 
  onSelectDestination, 
  onContactUs 
}: DestinationCardProps) => (
  <motion.div
    layoutId={`destination-${destination.id}`}
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    animate={{ 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.6,
        delay: index * 0.05
      }
    }}
    exit={{ opacity: 0, scale: 0.9, y: -20 }}
    whileHover={{ y: -5, scale: 1.02 }}
    className="group"
  >
    <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
      <div className="relative overflow-hidden">
        <div className="relative h-64 overflow-hidden">
          <img
            src={destination.image || "/placeholder.svg"}
            alt={destination.title}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className="bg-primary text-white backdrop-blur-sm">
            {destination.category}
          </Badge>
          {destination.spotsLeft <= 3 && (
            <Badge className="bg-red-600 text-white backdrop-blur-sm animate-pulse">
              Only {destination.spotsLeft} spots left!
            </Badge>
          )}
        </div>
        
        <button 
          onClick={(e) => {
            e.stopPropagation()
            onToggleWishlist(destination)
          }}
          className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-all duration-200 group/heart"
        >
          <Heart 
            className={`h-5 w-5 transition-all duration-300 ${
              isInWishlist 
                ? "text-primary fill-current scale-110" 
                : "text-muted-foreground group-hover/heart:text-primary group-hover/heart:scale-110"
            }`} 
          />
        </button>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(destination.rating)
                      ? 'fill-primary text-primary'
                      : 'fill-muted text-muted'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium">{destination.rating}</span>
            <span className="text-sm text-muted-foreground">({destination.reviews})</span>
          </div>
          <div className="text-2xl font-bold text-primary">
            ${destination.price}
            <span className="text-sm font-normal text-muted-foreground">/person</span>
          </div>
        </div>
        
        <h3 className="text-xl group-hover:text-primary transition-colors duration-200 line-clamp-1 mb-2">
          {destination.title}
        </h3>
        
        <p className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
          <MapPin className="h-4 w-4" />
          {destination.location}
          <Badge variant="outline" className="ml-2">
            {destination.difficulty}
          </Badge>
        </p>
        
        <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-primary" />
            {destination.duration}
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-primary" />
            {destination.groupSize}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-primary" />
            Next: {new Date(destination.nextDeparture).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
          <div className="flex items-center gap-1">
            <ArrowRight className="h-4 w-4 text-primary" />
            {destination.availability}
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {destination.highlights.slice(0, 3).map((highlight, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {highlight}
              </Badge>
            ))}
            {destination.highlights.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{destination.highlights.length - 3} more
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={() => onSelectDestination(destination)}
            className="flex-1 bg-primary hover:bg-primary/90 transition-all duration-200 group"
          >
            <ArrowRight className="h-4 w-4 mr-2" />
            Quick View
          </Button>
          <Button
            variant="outline"
            className="hover:bg-primary/10 transition-colors duration-200"
            onClick={onContactUs}
          >
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  </motion.div>
)

DestinationCard.displayName = 'DestinationCard'

// Simple Navigation Component for Destination Page
const DestinationNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { getWishlistCount } = useWishlistContext()

  return (
    <nav className="fixed top-0 w-full bg-white z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 relative">
              <img
                src="/images/logo.png"
                alt="Big Trip Logo"
                className="w-8 h-8 object-contain"
              />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-foreground">Big Trip</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <a href="/" className="nav-link text-foreground hover:text-primary transition-colors duration-200 relative font-medium">
              Home
            </a>
            <a href="/destination" className="nav-link text-foreground hover:text-primary transition-colors duration-200 relative font-medium">
              Destinations
            </a>
            <a href="/tours" className="nav-link text-foreground hover:text-primary transition-colors duration-200 relative font-medium">
              Tours
            </a>
            <a href="/about" className="nav-link text-foreground hover:text-primary transition-colors duration-200 relative font-medium">
              About
            </a>
            <a href="/contact" className="nav-link text-foreground hover:text-primary transition-colors duration-200 relative font-medium">
              Contact
            </a>
            
            <div className="relative text-foreground hover:text-primary transition-colors duration-200 p-2">
              <Heart className="h-5 w-5 lg:h-6 lg:w-6" />
              {getWishlistCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary/80 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {getWishlistCount()}
                </span>
              )}
            </div>
            <Button className="text-sm lg:text-base">
              Contact Us
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:text-primary transition-colors duration-200 p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top duration-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="/" className="block w-full text-left px-3 py-2 text-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors duration-200 font-medium">
                Home
              </a>
              <a href="/destination" className="block w-full text-left px-3 py-2 text-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors duration-200 font-medium">
                Destinations
              </a>
              <a href="/tours" className="block w-full text-left px-3 py-2 text-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors duration-200 font-medium">
                Tours
              </a>
              <a href="/about" className="block w-full text-left px-3 py-2 text-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors duration-200 font-medium">
                About
              </a>
              <a href="/contact" className="block w-full text-left px-3 py-2 text-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors duration-200 font-medium">
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default function DestinationPage() {
  const [selectedDestination, setSelectedDestination] = useState<typeof destinations[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 3000])
  const [durationRange, setDurationRange] = useState([1, 20])
  const [sortBy, setSortBy] = useState("Popular")
  const [isLoading, setIsLoading] = useState(false)
  const [filteredDestinations, setFilteredDestinations] = useState(destinations)
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  
  const destinationsPerPage = 9
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistContext()
  const { toast } = useToast()

  // Use debounced values for smooth filtering
  const debouncedSearchQuery = useDebounce(searchQuery, 300)
  const debouncedPriceRange = useDebounce(priceRange, 500)
  const debouncedDurationRange = useDebounce(durationRange, 500)

  // Filter and sort destinations with debounced values
  useEffect(() => {
    setIsLoading(true)
    
    const filterTimer = setTimeout(() => {
      let filtered = destinations.filter(destination => {
        const matchesSearch = destination.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
                            destination.location.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
        const matchesCategory = selectedCategory === "all" || destination.category.toLowerCase() === selectedCategory
        const matchesPrice = destination.price >= debouncedPriceRange[0] && destination.price <= debouncedPriceRange[1]
        const durationDays = parseInt(destination.duration.split(' ')[0])
        const matchesDuration = durationDays >= debouncedDurationRange[0] && durationDays <= debouncedDurationRange[1]
        
        return matchesSearch && matchesCategory && matchesPrice && matchesDuration
      })

      // Sort destinations
      switch (sortBy) {
        case "Price: Low to High":
          filtered.sort((a, b) => a.price - b.price)
          break
        case "Price: High to Low":
          filtered.sort((a, b) => b.price - a.price)
          break
        case "Rating":
          filtered.sort((a, b) => b.rating - a.rating)
          break
        case "Duration":
          filtered.sort((a, b) => parseInt(a.duration) - parseInt(b.duration))
          break
      }

      setFilteredDestinations(filtered)
      setCurrentPage(1) // Reset to first page when filters change
      setIsLoading(false)
    }, 100) 

    return () => clearTimeout(filterTimer)
  }, [debouncedSearchQuery, selectedCategory, debouncedPriceRange, debouncedDurationRange, sortBy])

  // Calculate pagination
  const totalPages = Math.ceil(filteredDestinations.length / destinationsPerPage)
  const startIndex = (currentPage - 1) * destinationsPerPage
  const endIndex = startIndex + destinationsPerPage
  const currentDestinations = filteredDestinations.slice(startIndex, endIndex)

  const toggleWishlist = (destination: typeof destinations[0]) => {
    if (isInWishlist(destination.id)) {
      removeFromWishlist(destination.id)
    } else {
      addToWishlist(destination as Tour)
    }
  }

  const handleSelectDestination = (destination: typeof destinations[0]) => {
    setSelectedDestination(destination)
  }

  const handleContactUs = () => {
    toast({
      title: "Contact Us",
      description: "Please contact us to book this destination. We'll get back to you soon!",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <DestinationNavigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 py-20">
        <div className="absolute inset-0 bg-[url('/images/bg.jpg')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Discover Amazing
              <span className="text-primary block">Destinations</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Explore the world's most beautiful destinations with our carefully curated travel experiences
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto"
          >
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search destinations, locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10 h-12"
                />
                {searchQuery !== debouncedSearchQuery && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      rotate: 360
                    }}
                    transition={{
                      rotate: {
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear"
                      },
                      opacity: { duration: 0.2 },
                      scale: { 
                        type: "spring", 
                        bounce: 0.5,
                        duration: 0.3
                      }
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full" />
                  </motion.div>
                )}
              </div>
              
              <div className="flex gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px] h-12">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="h-12 px-4"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center gap-2 h-12 px-6"
                >
                  <Icon className="h-4 w-4" />
                  {category.name}
                </Button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Filters Panel */}
      {showFilters && (
        <motion.section
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-muted/20 border-b"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Price Range</label>
                <div className="space-y-2">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={3000}
                    min={0}
                    step={50}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Duration (Days)</label>
                <div className="space-y-2">
                  <Slider
                    value={durationRange}
                    onValueChange={setDurationRange}
                    max={20}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{durationRange[0]} days</span>
                    <span>{durationRange[1]} days</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setPriceRange([0, 3000])
                    setDurationRange([1, 20])
                    setSelectedCategory("all")
                    setSearchQuery("")
                  }}
                  className="w-full"
                >
                  Clear All Filters
                </Button>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Results Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Count */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground">
              {filteredDestinations.length} {filteredDestinations.length === 1 ? 'destination' : 'destinations'} found
            </p>
            {(searchQuery || selectedCategory !== "all" || priceRange[0] > 0 || priceRange[1] < 3000 || durationRange[0] > 1 || durationRange[1] < 20) && (
              <Button
                variant="ghost"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                  setPriceRange([0, 3000])
                  setDurationRange([1, 20])
                  setSortBy("Popular")
                }}
                className="text-primary hover:text-primary/80"
              >
                Clear filters
              </Button>
            )}
          </div>

          {/* Destinations Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted h-64 rounded-t-lg" />
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-muted rounded" />
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {currentDestinations.map((destination, index) => (
                  <DestinationCard
                    key={destination.id}
                    destination={destination}
                    index={index}
                    isInWishlist={isInWishlist(destination.id)}
                    onToggleWishlist={toggleWishlist}
                    onSelectDestination={handleSelectDestination}
                    onContactUs={handleContactUs}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <Button
                      key={i + 1}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      onClick={() => setCurrentPage(i + 1)}
                      className="w-10 h-10"
                    >
                      {i + 1}
                    </Button>
                  ))}
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Destination Details Modal */}
      {selectedDestination && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold">{selectedDestination.title}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedDestination(null)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedDestination.image}
                    alt={selectedDestination.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">{selectedDestination.location}</span>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{selectedDestination.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span>Group size: {selectedDestination.groupSize}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-primary" />
                      <span>{selectedDestination.rating}/5 ({selectedDestination.reviews} reviews)</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-muted-foreground">{selectedDestination.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold">${selectedDestination.price}</span>
                      <span className="text-muted-foreground"> per person</span>
                    </div>
                    <Button onClick={handleContactUs} className="bg-primary hover:bg-primary/90">
                      Contact Us
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}