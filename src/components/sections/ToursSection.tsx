"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import { Search, Grid, List, Heart, Star, MapPin, Clock, Users, Calendar, ArrowRight, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useWishlistContext } from "@/components/wishlist-provider"
import { useToast } from "@/hooks/use-toast"
import { useDebounce } from "@/hooks/use-debounce"
import { Tour } from "@/hooks/use-wishlist"

const tours = [
  {
    id: 1,
    title: "Explore Turkey Delights",
    destination: "Turkey",
    price: 1099,
    duration: "8 days",
    groupSize: "4-15 people",
    rating: 4.8,
    reviews: 92,
    image: "/destination/cappadocia.webp",
    description: "Discover historical sites and vibrant bazaars across Turkey, including Cappadocia and Ephesus.",
    highlights: ["Cappadocia Balloons", "Blue Mosque", "Turkish Cuisine"],
    category: "Cultural",
    difficulty: "Easy",
    availability: "Available",
    spotsLeft: 10,
    totalSpots: 15,
    nextDeparture: "2024-03-20",
    included: ["Hotels", "Guides", "Breakfast"],
    notIncluded: ["Flights", "Lunch & Dinner"],
  },
  {
    id: 2,
    title: "Magical Malaziya Tour",
    destination: "malaziya",
    price: 899,
    duration: "7 days",
    groupSize: "2-12 people",
    rating: 4.7,
    reviews: 80,
    image: "/destination/malasia.webp",
    description: "Experience tropical rainforests, modern cities and diverse cultures in Malaziya.",
    highlights: ["Kuala Lumpur", "Batu Caves", "Island Hopping"],
    category: "Adventure",
    difficulty: "Easy",
    availability: "Available",
    spotsLeft: 8,
    totalSpots: 12,
    nextDeparture: "2024-04-05",
    included: ["Hotels", "Breakfast", "Transfers"],
    notIncluded: ["Flights", "Personal Expenses"],
  },
  {
    id: 3,
    title: "Taliland Highlights",
    destination: "taliland",
    price: 820,
    duration: "6 days",
    groupSize: "4-16 people",
    rating: 4.6,
    reviews: 75,
    image: "/destination/tailand.webp",
    description: "Immerse yourself in Taliland’s rich culture, temples and beaches.",
    highlights: ["Ancient Temples", "Street Food", "Tropical Beaches"],
    category: "Cultural",
    difficulty: "Easy",
    availability: "Available",
    spotsLeft: 6,
    totalSpots: 16,
    nextDeparture: "2024-05-01",
    included: ["Hotels", "Guided Tours"],
    notIncluded: ["Flights", "Visa"],
  },
  {
    id: 4,
    title: "Bali Paradise Escape",
    destination: "bali",
    price: 950,
    duration: "7 days",
    groupSize: "2-10 people",
    rating: 4.9,
    reviews: 140,
    image: "/destination/bali.webp",
    description: "Relax on Bali’s pristine beaches and explore its vibrant culture.",
    highlights: ["Beach Resorts", "Ubud Temples", "Waterfalls"],
    category: "Beach",
    difficulty: "Easy",
    availability: "Available",
    spotsLeft: 7,
    totalSpots: 10,
    nextDeparture: "2024-03-10",
    included: ["Resort Stay", "Breakfast", "Excursions"],
    notIncluded: ["Flights", "Lunch & Dinner"],
  },
  {
    id: 5,
    title: "Xitoy Cultural Journey",
    destination: "xitoy",
    price: 1280,
    duration: "9 days",
    groupSize: "6-18 people",
    rating: 4.8,
    reviews: 110,
    image: "/destination/china.webp",
    description: "Explore the wonders of Xitoy from the Great Wall to modern skylines.",
    highlights: ["Great Wall", "Forbidden City", "Terracotta Army"],
    category: "Cultural",
    difficulty: "Moderate",
    availability: "Limited",
    spotsLeft: 4,
    totalSpots: 18,
    nextDeparture: "2024-06-12",
    included: ["Hotels", "Guides", "Breakfast"],
    notIncluded: ["Flights", "Lunch & Dinner"],
  },
  {
    id: 6,
    title: "Iconic Istanbul City Break",
    destination: "istanbul",
    price: 770,
    duration: "5 days",
    groupSize: "4-20 people",
    rating: 4.8,
    reviews: 150,
    image: "/destination/istanbul.webp",
    description: "Witness the crossroads of Europe and Asia with Istanbul’s rich history.",
    highlights: ["Blue Mosque", "Grand Bazaar", "Bosphorus Cruise"],
    category: "City",
    difficulty: "Easy",
    availability: "Available",
    spotsLeft: 12,
    totalSpots: 20,
    nextDeparture: "2024-04-18",
    included: ["Hotels", "Breakfast", "City Tours"],
    notIncluded: ["Flights", "Lunch & Dinner"],
  },
  {
    id: 7,
    title: "Vibrant Vietnam Voyage",
    destination: "vietnam",
    price: 1050,
    duration: "10 days",
    groupSize: "6-22 people",
    rating: 4.7,
    reviews: 98,
    image: "/destination/vietnam.webp",
    description: "Sail Halong Bay and wander Hanoi’s old quarter in beautiful Vietnam.",
    highlights: ["Halong Bay", "Hoi An", "Street Food"],
    category: "Cultural",
    difficulty: "Easy",
    availability: "Available",
    spotsLeft: 9,
    totalSpots: 22,
    nextDeparture: "2024-05-30",
    included: ["Hotels", "Internal Flights", "Breakfast"],
    notIncluded: ["International Flights", "Lunch & Dinner"],
  },
  {
    id: 8,
    title: "Gorgeous Gruzia Getaway",
    destination: "gruzia",
    price: 880,
    duration: "8 days",
    groupSize: "4-15 people",
    rating: 4.8,
    reviews: 70,
    image: "/destination/gruzia.webp",
    description: "Taste world-renowned wines and mountain vistas in Gruzia.",
    highlights: ["Tbilisi Old Town", "Kakheti Wine", "Kazbegi Mountains"],
    category: "Nature",
    difficulty: "Moderate",
    availability: "Available",
    spotsLeft: 6,
    totalSpots: 15,
    nextDeparture: "2024-07-08",
    included: ["Hotels", "Guides", "Wine Tasting"],
    notIncluded: ["Flights", "Lunch & Dinner"],
  },
  {
    id: 9,
    title: "Quick Qatar Experience",
    destination: "qatar",
    price: 650,
    duration: "4 days",
    groupSize: "2-10 people",
    rating: 4.5,
    reviews: 45,
    image: "/destination/pexels-imran-hasan-135940407-29430370.jpg",
    description: "Discover Doha’s modern skyline and traditional souqs in Qatar.",
    highlights: ["Desert Safari", "Museum of Islamic Art", "Souq Waqif"],
    category: "City",
    difficulty: "Easy",
    availability: "Available",
    spotsLeft: 8,
    totalSpots: 10,
    nextDeparture: "2024-03-28",
    included: ["Hotels", "Breakfast", "City Tour"],
    notIncluded: ["Flights", "Lunch & Dinner"],
  },
  {
    id: 10,
    title: "Subay Desert Luxury",
    destination: "subay",
    price: 1190,
    duration: "6 days",
    groupSize: "2-14 people",
    rating: 4.9,
    reviews: 130,
    image: "/destination/dubai.webp",
    description: "Enjoy skyscrapers and sand dunes on this Subay adventure.",
    highlights: ["Burj Khalifa", "Desert Safari", "Luxury Shopping"],
    category: "Luxury",
    difficulty: "Easy",
    availability: "Available",
    spotsLeft: 10,
    totalSpots: 14,
    nextDeparture: "2024-04-12",
    included: ["Hotels", "Breakfast", "Transfers"],
    notIncluded: ["Flights", "Lunch & Dinner"],
  },
  {
    id: 11,
    title: "Saudi Arabia Discovery",
    destination: "Saudi arabia",
    price: 1420,
    duration: "9 days",
    groupSize: "6-18 people",
    rating: 4.6,
    reviews: 60,
    image: "/destination/arabia.webp",
    description: "Explore ancient Nabatean tombs and modern Riyadh.",
    highlights: ["Al-Ula", "Edge of the World", "Riyadh City"],
    category: "Adventure",
    difficulty: "Moderate",
    availability: "Limited",
    spotsLeft: 4,
    totalSpots: 18,
    nextDeparture: "2024-10-04",
    included: ["Hotels", "Guides", "Breakfast"],
    notIncluded: ["Flights", "Lunch & Dinner"],
  },
  {
    id: 12,
    title: "Beautiful Baku Break",
    destination: "baku",
    price: 730,
    duration: "5 days",
    groupSize: "4-20 people",
    rating: 4.7,
    reviews: 55,
    image: "/destination/baku.webp",
    description: "Stroll flame towers and old city walls in Baku.",
    highlights: ["Maiden Tower", "Carpet Museum", "Fire Mountain"],
    category: "City",
    difficulty: "Easy",
    availability: "Available",
    spotsLeft: 12,
    totalSpots: 20,
    nextDeparture: "2024-05-22",
    included: ["Hotels", "Breakfast", "City Tour"],
    notIncluded: ["Flights", "Lunch & Dinner"],
  },
  {
    id: 13,
    title: "Sri Lanka Nature Trail",
    destination: "sri lanka",
    price: 990,
    duration: "8 days",
    groupSize: "4-16 people",
    rating: 4.8,
    reviews: 85,
    image: "/destination/sri-lanka.webp",
    description: "Safari parks, tea plantations and golden beaches await in Sri Lanka.",
    highlights: ["Ella Train", "Sigiriya", "Yala Safari"],
    category: "Nature",
    difficulty: "Moderate",
    availability: "Available",
    spotsLeft: 8,
    totalSpots: 16,
    nextDeparture: "2024-09-14",
    included: ["Hotels", "Breakfast", "Transport"],
    notIncluded: ["Flights", "Lunch & Dinner"],
  },
  {
    id: 14,
    title: "Abu Dabi Getaway",
    destination: "abu dabi",
    price: 810,
    duration: "4 days",
    groupSize: "2-12 people",
    rating: 4.6,
    reviews: 40,
    image: "/destination/abu-dabi.webp",
    description: "Marvel at modern architecture and desert landscapes in Abu Dabi.",
    highlights: ["Grand Mosque", "Louvre Abu Dhabi", "Desert Safari"],
    category: "Luxury",
    difficulty: "Easy",
    availability: "Available",
    spotsLeft: 6,
    totalSpots: 12,
    nextDeparture: "2024-06-02",
    included: ["Hotels", "Breakfast", "City Tour"],
    notIncluded: ["Flights", "Lunch & Dinner"],
  },
  {
    id: 15,
    title: "Dreamy Maldiv Escape",
    destination: "maldiv",
    price: 2150,
    duration: "6 days",
    groupSize: "2-8 people",
    rating: 5.0,
    reviews: 160,
    image: "/destination/maldivs.webp",
    description: "Stay in over-water villas and snorkel crystal-clear waters in Maldiv.",
    highlights: ["Overwater Villa", "Snorkeling", "Sunset Cruise"],
    category: "Beach",
    difficulty: "Easy",
    availability: "Available",
    spotsLeft: 4,
    totalSpots: 8,
    nextDeparture: "2024-03-18",
    included: ["Resort", "Meals", "Water Sports"],
    notIncluded: ["Flights", "Alcohol"],
  },
  {
    id: 16,
    title: "Singapur City Lights",
    destination: "singapur",
    price: 880,
    duration: "5 days",
    groupSize: "4-18 people",
    rating: 4.9,
    reviews: 120,
    image: "/destination/singapore.webp",
    description: "A futuristic skyline, gardens and diverse cuisine in Singapur.",
    highlights: ["Marina Bay Sands", "Gardens by the Bay", "Sentosa Island"],
    category: "City",
    difficulty: "Easy",
    availability: "Available",
    spotsLeft: 10,
    totalSpots: 18,
    nextDeparture: "2024-08-05",
    included: ["Hotels", "Breakfast", "City Pass"],
    notIncluded: ["Flights", "Lunch & Dinner"],
  },
  {
    id: 17,
    title: "Antalia Sun & Sea",
    destination: "antalia",
    price: 720,
    duration: "7 days",
    groupSize: "4-20 people",
    rating: 4.7,
    reviews: 65,
    image: "/destination/antalya.webp",
    description: "Enjoy Mediterranean beaches and ancient ruins around Antalia.",
    highlights: ["Old Town", "Roman Theatre", "Waterfalls"],
    category: "Beach",
    difficulty: "Easy",
    availability: "Available",
    spotsLeft: 12,
    totalSpots: 20,
    nextDeparture: "2024-07-20",
    included: ["Hotels", "Breakfast", "Excursions"],
    notIncluded: ["Flights", "Lunch & Dinner"],
  },
]

const categories = ["All", "Adventure", "Cultural", "Luxury", "Romance"]
const sortOptions = ["Popular", "Price: Low to High", "Price: High to Low", "Rating", "Duration"]

// Move TourCard outside and memoize it
interface TourCardProps {
  tour: typeof tours[0]
  index: number
  viewMode: 'grid' | 'list'
  isInWishlist: boolean
  onToggleWishlist: (tour: typeof tours[0]) => void
  onSelectTour: (tour: typeof tours[0]) => void
  onContactUs: () => void
}

const TourCard = ({ 
  tour, 
  index, 
  viewMode, 
  isInWishlist, 
  onToggleWishlist, 
  onSelectTour, 
  onContactUs 
}: TourCardProps) => (
  <motion.div
    layoutId={`tour-${tour.id}`}
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
    className={viewMode === 'list' ? 'mb-4' : ''}
  >
    <Card className={`group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 ${
      viewMode === 'list' ? 'flex' : ''
    }`}>
      <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-1/3' : ''}`}>
        <div className="relative h-64 overflow-hidden">
          <img
            src={tour.image || "/placeholder.svg"}
            alt={tour.title}
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className="bg-primary text-white backdrop-blur-sm">
            {tour.category}
          </Badge>
          {tour.spotsLeft <= 3 && (
            <Badge className="bg-red-600 text-white backdrop-blur-sm animate-pulse">
              Only {tour.spotsLeft} spots left!
            </Badge>
          )}
        </div>
        
        <button 
          onClick={(e) => {
            e.stopPropagation()
            onToggleWishlist(tour)
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
      
      <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(tour.rating)
                      ? 'fill-primary text-primary'
                      : 'fill-muted text-muted'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium">{tour.rating}</span>
            <span className="text-sm text-muted-foreground">({tour.reviews})</span>
          </div>
          <div className="text-2xl font-bold text-primary">
            ${tour.price}
            <span className="text-sm font-normal text-muted-foreground">/person</span>
          </div>
        </div>
        
        <h3 className="text-xl group-hover:text-primary transition-colors duration-200 line-clamp-1">
          {tour.title}
        </h3>
        
        <p className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
          <MapPin className="h-4 w-4" />
          {tour.destination}
          <Badge variant="outline" className="ml-2">
            {tour.difficulty}
          </Badge>
        </p>
        
        <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-primary" />
            {tour.duration}
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-primary" />
            {tour.groupSize}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-primary" />
            Next: {new Date(tour.nextDeparture).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
          <div className="flex items-center gap-1">
            <ArrowRight className="h-4 w-4 text-primary" />
            {tour.availability}
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {tour.highlights.slice(0, 3).map((highlight, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {highlight}
              </Badge>
            ))}
            {tour.highlights.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tour.highlights.length - 3} more
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={() => onSelectTour(tour)}
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
      </div>
    </Card>
  </motion.div>
)

TourCard.displayName = 'TourCard'

export default function ToursSection() {
  const [selectedTour, setSelectedTour] = useState<typeof tours[0] | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [priceRange, setPriceRange] = useState([0, 3000])
  const [sortBy, setSortBy] = useState("Popular")
  const [isLoading, setIsLoading] = useState(false)
  const [filteredTours, setFilteredTours] = useState(tours)
  const [displayCount, setDisplayCount] = useState(6) // Show 6 tours initially
  
  const toursRef = useRef<HTMLElement>(null)
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistContext()
  const { toast } = useToast()

  // Use debounced values for smooth filtering
  const debouncedSearchQuery = useDebounce(searchQuery, 300)
  const debouncedPriceRange = useDebounce(priceRange, 500)

  // Filter and sort tours with debounced values
  useEffect(() => {
    setIsLoading(true)
    
    const filterTimer = setTimeout(() => {
      let filtered = tours.filter(tour => {
        const matchesSearch = tour.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
                            tour.destination.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
        const matchesCategory = selectedCategory === "All" || tour.category === selectedCategory
        const matchesPrice = tour.price >= debouncedPriceRange[0] && tour.price <= debouncedPriceRange[1]
        
        return matchesSearch && matchesCategory && matchesPrice
      })

      // Sort tours
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

      setFilteredTours(filtered)
      setIsLoading(false)
      setDisplayCount(6) // Reset to show first 6 tours when filters change
    }, 100) 

    return () => clearTimeout(filterTimer)
  }, [debouncedSearchQuery, selectedCategory, debouncedPriceRange, sortBy])

  // Memoize callbacks
  const toggleWishlist = useCallback((tour: typeof tours[0]) => {
    if (isInWishlist(tour.id)) {
      removeFromWishlist(tour.id)
    } else {
      addToWishlist(tour as Tour)
    }
  }, [isInWishlist, removeFromWishlist, addToWishlist])

  const handleSelectTour = useCallback((tour: typeof tours[0]) => {
    setSelectedTour(tour)
  }, [])

  const handleContactUs = useCallback(() => {
    // Scroll to contact section
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
    toast({
      title: "Contact Us",
      description: "Please contact us to book this tour. We'll get back to you soon!",
    })
  }, [toast])

  return (
    <section id="tours" ref={toursRef} className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Discover Your Next Adventure
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Handpicked destinations and experiences crafted by our travel experts
            </p>
          </motion.div>
        </div>

        {/* Search and Filters Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search destinations, tours..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 h-12"
              />
              {/* Bounce loading indicator */}
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
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[140px] h-12">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
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
              
              
              
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  className="h-12 w-12 rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                  className="h-12 w-12 rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          
        </motion.div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            {filteredTours.length} {filteredTours.length === 1 ? 'tour' : 'tours'} found
          </p>
          {(searchQuery || selectedCategory !== "All" || priceRange[0] > 0 || priceRange[1] < 3000) && (
            <Button
              variant="ghost"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All")
                setPriceRange([0, 3000])
                setSortBy("Popular")
              }}
              className="text-primary hover:text-primary/80"
            >
              Clear filters
            </Button>
          )}
        </div>

        {/* Tours Grid/List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredTours.slice(0, displayCount).map((tour, index) => (
            <TourCard
              key={tour.id}
              tour={tour}
              index={index}
              viewMode={viewMode}
              isInWishlist={isInWishlist(tour.id)}
              onToggleWishlist={toggleWishlist}
              onSelectTour={handleSelectTour}
              onContactUs={handleContactUs}
            />
          ))}
        </div>

        {/* Load More Button */}
        {displayCount < filteredTours.length && (
          <div className="text-center">
            <Button
              onClick={() => setDisplayCount(prev => Math.min(prev + 6, filteredTours.length))}
              className="bg-primary hover:bg-primary/90"
            >
              Load More Tours
            </Button>
          </div>
        )}

        {/* Tour Details Modal */}
        {selectedTour && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold">{selectedTour.title}</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedTour(null)}
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <img
                      src={selectedTour.image}
                      alt={selectedTour.title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">{selectedTour.destination}</span>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{selectedTour.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <span>Group size: {selectedTour.groupSize}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-primary" />
                        <span>{selectedTour.rating}/5 ({selectedTour.reviews} reviews)</span>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold mb-2">Description</h4>
                      <p className="text-muted-foreground">{selectedTour.description}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold">${selectedTour.price}</span>
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
      </div>
    </section>
  )
}