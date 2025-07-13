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
  Waves,
  Palmtree,

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
import Navigation from "@/components/sections/Navigation"
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
  { id: "beach", name: "Beach", icon: Waves },
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
    whileHover={{ y: -8, scale: 1.02 }}
    className="group"
  >
    <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white rounded-3xl">
      <div className="relative overflow-hidden">
        <div className="relative h-72 overflow-hidden">
          <img
            src={destination.image || "/placeholder.svg"}
            alt={destination.title}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className="bg-primary text-white backdrop-blur-sm border-0">
            {destination.category}
          </Badge>
          {destination.spotsLeft <= 3 && (
                            <Badge className="bg-primary text-primary-foreground backdrop-blur-sm animate-pulse border-0">
              Only {destination.spotsLeft} spots left!
            </Badge>
          )}
        </div>
        
        <button 
          onClick={(e) => {
            e.stopPropagation()
            onToggleWishlist(destination)
          }}
          className="absolute top-4 right-4 p-3 bg-white/95 rounded-full hover:bg-white transition-all duration-300 group/heart shadow-lg"
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
      
      <CardContent className="p-8">
        <div className="flex items-center justify-between mb-4">
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
            <span className="text-sm font-semibold">{destination.rating}</span>
            <span className="text-sm text-muted-foreground">({destination.reviews})</span>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary">
              ${destination.price.toLocaleString()}
            </div>
            <span className="text-sm text-muted-foreground">per person</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300 line-clamp-1 mb-3">
          {destination.title}
        </h3>
        
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="font-medium">{destination.location}</span>
          <Badge variant="outline" className="ml-2 border-primary/20 text-primary">
            {destination.difficulty}
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-6">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="font-medium">{destination.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <span className="font-medium">{destination.groupSize}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="font-medium">
              Next: {new Date(destination.nextDeparture).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ArrowRight className="h-4 w-4 text-primary" />
            <span className="font-medium">{destination.availability}</span>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {destination.highlights.slice(0, 3).map((highlight, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs bg-primary/10 text-primary border-0">
                {highlight}
              </Badge>
            ))}
            {destination.highlights.length > 3 && (
              <Badge variant="outline" className="text-xs border-primary/20 text-primary">
                +{destination.highlights.length - 3} more
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button 
            onClick={() => onSelectDestination(destination)}
            className="flex-1 bg-primary hover:bg-primary/90 transition-all duration-300 h-12 text-base font-semibold"
          >
            <ArrowRight className="h-4 w-4 mr-2" />
            Quick View
          </Button>
          <Button
            variant="outline"
            className="hover:bg-primary/10 transition-colors duration-300 h-12 text-base font-semibold border-primary/20 text-primary"
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



export default function Page() {
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
      // Convert destination to Tour format
      const tour: Tour = {
        id: destination.id,
        title: destination.title,
        destination: destination.location,
        price: destination.price,
        duration: destination.duration,
        groupSize: destination.groupSize,
        rating: destination.rating,
        reviews: destination.reviews,
        image: destination.image,
        description: destination.description,
        highlights: destination.highlights,
        category: destination.category,
        difficulty: destination.difficulty,
        availability: destination.availability,
        spotsLeft: destination.spotsLeft,
        totalSpots: destination.totalSpots,
        nextDeparture: destination.nextDeparture,
        included: destination.included,
        notIncluded: destination.notIncluded,
      }
      addToWishlist(tour)
      // Ensure required 'destination' field exists for Tour type
      addToWishlist({ ...(destination as any), destination: destination.location } as Tour)
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

  const scrollToSection = (sectionId: string) => {
    // For destination page, we can implement smooth scrolling to sections
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation scrollToSection={scrollToSection} />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-24 lg:py-32">
        <div className="absolute inset-0 bg-[url('/images/bg.jpg')] bg-cover bg-center opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Globe className="h-4 w-4" />
              Explore the World
            </motion.div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Discover Amazing
              <span className="text-primary block">Destinations</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              Explore the world's most beautiful destinations with our carefully curated travel experiences. 
              From pristine beaches to majestic mountains, find your perfect adventure.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-3xl shadow-2xl p-8 max-w-5xl mx-auto border border-gray-100"
          >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-2 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search destinations, locations, or activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-12 h-14 text-lg"
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
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full" />
                  </motion.div>
                )}
              </div>
              
              <div className="relative">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-14 text-lg">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="relative">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="h-14 w-full text-lg"
                >
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Browse by Category
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find your perfect destination by exploring our curated categories
            </p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center gap-3 h-14 px-8 text-base font-medium transition-all duration-300 hover:shadow-lg"
                  >
                    <Icon className="h-5 w-5" />
                    {category.name}
                  </Button>
                </motion.div>
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
          className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">Refine Your Search</h3>
              <p className="text-muted-foreground">Customize your search to find the perfect destination</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <label className="text-base font-semibold mb-4 block text-foreground">Price Range</label>
                <div className="space-y-4">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={3000}
                    min={0}
                    step={50}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm font-medium text-muted-foreground">
                    <span>${priceRange[0].toLocaleString()}</span>
                    <span>${priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <label className="text-base font-semibold mb-4 block text-foreground">Duration (Days)</label>
                <div className="space-y-4">
                  <Slider
                    value={durationRange}
                    onValueChange={setDurationRange}
                    max={20}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm font-medium text-muted-foreground">
                    <span>{durationRange[0]} days</span>
                    <span>{durationRange[1]} days</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setPriceRange([0, 3000])
                    setDurationRange([1, 20])
                    setSelectedCategory("all")
                    setSearchQuery("")
                  }}
                  className="w-full h-12 text-base font-medium"
                >
                  Clear All Filters
                </Button>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Results Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Count */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {filteredDestinations.length} {filteredDestinations.length === 1 ? 'Destination' : 'Destinations'} Found
              </h2>
              <p className="text-muted-foreground">
                Discover amazing places that match your preferences
              </p>
            </div>
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
                className="text-primary hover:text-primary/80 font-medium"
              >
                Clear all filters
              </Button>
            )}
          </div>

          {/* Destinations Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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
                <div className="flex items-center justify-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="h-12 w-12"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <Button
                      key={i + 1}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      onClick={() => setCurrentPage(i + 1)}
                      className="w-12 h-12 text-base font-medium"
                    >
                      {i + 1}
                    </Button>
                  ))}
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="h-12 w-12"
                  >
                    <ChevronRight className="h-5 w-5" />
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

      <Footer scrollToSection={(sectionId: string) => {
        // For destination page, we can implement smooth scrolling to sections
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }} />
    </div>
  )
} 