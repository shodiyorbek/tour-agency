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
    title: "7-Day Dubai City Experience",
    destination: "Dubai, UAE",
    price: 899,
    duration: "7 days",
    groupSize: "2-12 people",
    rating: 4.9,
    reviews: 127,
    image: "/images/bali.webp",
    description:
      "Experience the magic of Dubai with luxury hotels, desert safaris, and iconic landmarks including Burj Khalifa and Palm Jumeirah.",
    highlights: ["Burj Khalifa Visit", "Desert Safari", "Luxury Hotels", "Dubai Mall Shopping"],
    category: "Luxury",
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
    title: "Grand Canyon USA Adventure",
    destination: "Arizona, USA",
    price: 1200,
    duration: "5 days",
    groupSize: "4-16 people",
    rating: 4.8,
    reviews: 89,
    image: "/gallery/canyon.avif",
    description:
      "Discover the breathtaking beauty of the Grand Canyon with guided hikes, helicopter tours, and stunning sunset viewpoints.",
    highlights: ["Helicopter Tour", "Guided Hiking", "Sunset Points", "Native Culture"],
    category: "Adventure",
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
    title: "Silk Road Uzbekistan Tour",
    destination: "Uzbekistan",
    price: 980,
    duration: "8 days",
    groupSize: "6-14 people",
    rating: 4.7,
    reviews: 64,
    image: "/gallery/turkey.webp",
    description:
      "Journey through ancient Silk Road cities including Samarkand, Bukhara, and Khiva with expert local guides.",
    highlights: ["Registan Square", "Ancient Architecture", "Local Cuisine", "Cultural Immersion"],
    category: "Cultural",
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
    title: "Maldives Honeymoon Escape",
    destination: "Maldives",
    price: 2400,
    duration: "6 days",
    groupSize: "2 people",
    rating: 5.0,
    reviews: 156,
    image: "/gallery/over-water.jpg",
    description:
      "Ultimate romantic getaway with overwater villas, private beaches, and world-class spa treatments in paradise.",
    highlights: ["Overwater Villa", "Private Beach", "Spa Treatments", "Sunset Cruise"],
    category: "Romance",
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
    title: "Japanese Cherry Blossom",
    destination: "Japan",
    price: 1650,
    duration: "10 days",
    groupSize: "8-20 people",
    rating: 4.9,
    reviews: 203,
    image: "/gallery/kyoto.jpg",
    description: "Experience Japan during cherry blossom season with visits to Tokyo, Kyoto, and Mount Fuji.",
    highlights: ["Cherry Blossoms", "Traditional Temples", "Mount Fuji", "Cultural Experiences"],
    category: "Cultural",
    difficulty: "Easy",
    availability: "Filling Fast",
    spotsLeft: 5,
    totalSpots: 20,
    nextDeparture: "2024-03-25",
    included: ["Hotels", "Breakfast", "JR Pass", "Cultural Activities"],
    notIncluded: ["Flights", "Lunch & Dinner", "Personal Shopping"],
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
    image: "/gallery/serengeti.webp",
    description: "Witness the Great Migration and Big Five animals in their natural habitat across Kenya and Tanzania.",
    highlights: ["Great Migration", "Big Five", "Luxury Lodges", "Cultural Villages"],
    category: "Adventure",
    difficulty: "Moderate",
    availability: "Limited",
    spotsLeft: 2,
    totalSpots: 12,
    nextDeparture: "2024-06-15",
    included: ["Safari Lodges", "All Meals", "Game Drives", "Park Fees"],
    notIncluded: ["Flights", "Visa", "Tips", "Drinks"],
  },
  {
    id: 7,
    title: "Norwegian Fjords Cruise",
    destination: "Norway",
    price: 1850,
    duration: "8 days",
    groupSize: "10-25 people",
    rating: 4.9,
    reviews: 178,
    image: "/gallery/aurora.jpg",
    description: "Sail through majestic Norwegian fjords, witness the midnight sun, and explore charming coastal villages.",
    highlights: ["Geirangerfjord", "Northern Lights", "Bergen City", "Midnight Sun"],
    category: "Adventure",
    difficulty: "Easy",
    availability: "Available",
    spotsLeft: 15,
    totalSpots: 25,
    nextDeparture: "2024-05-10",
    included: ["Cruise Cabin", "All Meals", "Shore Excursions", "Entertainment"],
    notIncluded: ["Flights", "Drinks", "Spa Services", "Gratuities"],
  },
  {
    id: 8,
    title: "Machu Picchu Trek",
    destination: "Peru",
    price: 1450,
    duration: "9 days",
    groupSize: "6-15 people",
    rating: 4.8,
    reviews: 142,
    image: "/gallery/macho.jpg",
    description: "Trek the legendary Inca Trail to reach the ancient citadel of Machu Picchu, with expert guides and porters.",
    highlights: ["Inca Trail", "Machu Picchu", "Sacred Valley", "Cusco City"],
    category: "Adventure",
    difficulty: "Challenging",
    availability: "Limited",
    spotsLeft: 4,
    totalSpots: 15,
    nextDeparture: "2024-04-15",
    included: ["Camping Equipment", "All Meals", "Permits", "Train Tickets"],
    notIncluded: ["Flights", "Sleeping Bag", "Tips", "Personal Items"],
  },
  {
    id: 9,
    title: "Greek Islands Hopping",
    destination: "Greece",
    price: 1320,
    duration: "10 days",
    groupSize: "8-18 people",
    rating: 4.7,
    reviews: 96,
    image: "/images/tropical-beach.jpg",
    description: "Island hop through Santorini, Mykonos, and Crete, enjoying pristine beaches, ancient ruins, and local cuisine.",
    highlights: ["Santorini Sunset", "Mykonos Beaches", "Knossos Palace", "Greek Cuisine"],
    category: "Cultural",
    difficulty: "Easy",
    availability: "Available",
    spotsLeft: 12,
    totalSpots: 18,
    nextDeparture: "2024-05-01",
    included: ["Hotels", "Ferries", "Breakfast", "Island Tours"],
    notIncluded: ["Flights", "Lunch & Dinner", "Beach Activities", "Nightlife"],
  },
  {
    id: 10,
    title: "Iceland Ring Road",
    destination: "Iceland",
    price: 1980,
    duration: "11 days",
    groupSize: "4-10 people",
    rating: 4.9,
    reviews: 134,
    image: "/gallery/dubai-sunset.jpg",
    description: "Complete circuit of Iceland's Ring Road, featuring glaciers, volcanoes, waterfalls, and hot springs.",
    highlights: ["Blue Lagoon", "Glacier Walks", "Northern Lights", "Black Sand Beaches"],
    category: "Adventure",
    difficulty: "Moderate",
    availability: "Filling Fast",
    spotsLeft: 3,
    totalSpots: 10,
    nextDeparture: "2024-09-15",
    included: ["4x4 Vehicle", "Accommodation", "Breakfast", "Activities"],
    notIncluded: ["Flights", "Lunch & Dinner", "Optional Tours", "Fuel"],
  },
  {
    id: 11,
    title: "Moroccan Desert Experience",
    destination: "Morocco",
    price: 890,
    duration: "7 days",
    groupSize: "6-16 people",
    rating: 4.8,
    reviews: 87,
    image: "/images/bali.webp",
    description: "Journey from Marrakech to the Sahara Desert, experiencing Berber culture and camping under the stars.",
    highlights: ["Sahara Camping", "Camel Trek", "Marrakech Souks", "Atlas Mountains"],
    category: "Cultural",
    difficulty: "Moderate",
    availability: "Available",
    spotsLeft: 9,
    totalSpots: 16,
    nextDeparture: "2024-03-10",
    included: ["Transport", "Desert Camp", "Guides", "Most Meals"],
    notIncluded: ["Flights", "Tips", "Personal Shopping", "Drinks"],
  },
  {
    id: 12,
    title: "New Zealand Adventure",
    destination: "New Zealand",
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
    notIncluded: ["Flights", "Adventure Sports", "Most Meals", "Insurance"],
  },
  {
    id: 13,
    title: "Egyptian Wonders Tour",
    destination: "Egypt",
    price: 1150,
    duration: "9 days",
    groupSize: "10-25 people",
    rating: 4.7,
    reviews: 112,
    image: "/gallery/turkey.webp",
    description: "Explore ancient Egypt including the Pyramids, Sphinx, Valley of the Kings, and a Nile River cruise.",
    highlights: ["Pyramids of Giza", "Nile Cruise", "Luxor Temples", "Egyptian Museum"],
    category: "Cultural",
    difficulty: "Easy",
    availability: "Available",
    spotsLeft: 18,
    totalSpots: 25,
    nextDeparture: "2024-10-15",
    included: ["Hotels", "Nile Cruise", "Entrance Fees", "Breakfast"],
    notIncluded: ["Flights", "Visa", "Lunch & Dinner", "Tips"],
  },
  {
    id: 14,
    title: "Canadian Rockies Explorer",
    destination: "Canada",
    price: 1680,
    duration: "10 days",
    groupSize: "6-15 people",
    rating: 4.8,
    reviews: 93,
    image: "/gallery/over-water.jpg",
    description: "Discover the stunning Canadian Rockies with visits to Banff, Jasper, and Lake Louise.",
    highlights: ["Banff National Park", "Lake Louise", "Glacier Skywalk", "Wildlife Viewing"],
    category: "Adventure",
    difficulty: "Easy",
    availability: "Filling Fast",
    spotsLeft: 6,
    totalSpots: 15,
    nextDeparture: "2024-07-01",
    included: ["Hotels", "Transport", "Park Fees", "Some Activities"],
    notIncluded: ["Flights", "Meals", "Optional Activities", "Equipment"],
  },
  {
    id: 15,
    title: "India Golden Triangle",
    destination: "India",
    price: 750,
    duration: "8 days",
    groupSize: "8-18 people",
    rating: 4.6,
    reviews: 74,
    image: "/gallery/kyoto.jpg",
    description: "Classic tour of Delhi, Agra, and Jaipur featuring the Taj Mahal and rich cultural heritage.",
    highlights: ["Taj Mahal", "Amber Fort", "Delhi Markets", "Cultural Shows"],
    category: "Cultural",
    difficulty: "Easy",
    availability: "Available",
    spotsLeft: 11,
    totalSpots: 18,
    nextDeparture: "2024-02-25",
    included: ["Hotels", "Transport", "Guides", "Breakfast"],
    notIncluded: ["Flights", "Visa", "Lunch & Dinner", "Monument Fees"],
  },
  {
    id: 16,
    title: "Patagonia Expedition",
    destination: "Chile & Argentina",
    price: 2450,
    duration: "13 days",
    groupSize: "6-14 people",
    rating: 4.9,
    reviews: 108,
    image: "/gallery/serengeti.webp",
    description: "Explore the wild beauty of Patagonia including Torres del Paine and Los Glaciares National Parks.",
    highlights: ["Torres del Paine", "Perito Moreno Glacier", "Fitz Roy Trek", "Wildlife"],
    category: "Adventure",
    difficulty: "Challenging",
    availability: "Limited",
    spotsLeft: 3,
    totalSpots: 14,
    nextDeparture: "2024-12-01",
    included: ["Lodges", "Park Fees", "Guides", "Most Meals"],
    notIncluded: ["Flights", "Equipment Rental", "Tips", "Insurance"],
  },
  {
    id: 17,
    title: "Vietnam & Cambodia Journey",
    destination: "Vietnam & Cambodia",
    price: 1120,
    duration: "12 days",
    groupSize: "10-22 people",
    rating: 4.7,
    reviews: 86,
    image: "/gallery/aurora.jpg",
    description: "Discover the highlights of Vietnam and Cambodia including Halong Bay, Angkor Wat, and vibrant cities.",
    highlights: ["Halong Bay Cruise", "Angkor Wat", "Mekong Delta", "Street Food Tours"],
    category: "Cultural",
    difficulty: "Easy",
    availability: "Available",
    spotsLeft: 16,
    totalSpots: 22,
    nextDeparture: "2024-03-20",
    included: ["Hotels", "Transport", "Cruise", "Breakfast"],
    notIncluded: ["Flights", "Visa", "Most Meals", "Personal Expenses"],
  },
  {
    id: 18,
    title: "Turkish Delights Tour",
    destination: "Turkey",
    price: 1050,
    duration: "10 days",
    groupSize: "8-20 people",
    rating: 4.8,
    reviews: 129,
    image: "/gallery/macho.jpg",
    description: "Journey through Turkey's historical sites including Istanbul, Cappadocia, and Ephesus.",
    highlights: ["Hot Air Balloon", "Blue Mosque", "Fairy Chimneys", "Turkish Cuisine"],
    category: "Cultural",
    difficulty: "Easy",
    availability: "Available",
    spotsLeft: 13,
    totalSpots: 20,
    nextDeparture: "2024-04-05",
    included: ["Hotels", "Domestic Flights", "Breakfast", "Tours"],
    notIncluded: ["International Flights", "Lunch & Dinner", "Balloon Ride", "Tips"],
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
                            <Badge className="bg-primary text-primary-foreground backdrop-blur-sm animate-pulse">
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