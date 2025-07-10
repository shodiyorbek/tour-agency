"use client"

import { useState, useRef, useEffect } from "react"
import { 
  MapPin, Users, Star, Clock, Heart, ChevronLeft, ChevronRight, 
  Search, Filter, Grid, List, Calendar, DollarSign, X, 
  Check, Globe, Sparkles, TrendingUp, Info
} from "lucide-react"
import { useDebounce } from "@/hooks/use-debounce"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { useWishlistContext } from "@/components/wishlist-provider"
import { Tour } from "@/hooks/use-wishlist"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

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
]

const categories = ["All", "Adventure", "Cultural", "Luxury", "Romance"]
const sortOptions = ["Popular", "Price: Low to High", "Price: High to Low", "Rating", "Duration"]

export default function ToursSection() {
  const [selectedTour, setSelectedTour] = useState<typeof tours[0] | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [priceRange, setPriceRange] = useState([0, 3000])
  const [sortBy, setSortBy] = useState("Popular")
  const [isLoading, setIsLoading] = useState(false)
  const [filteredTours, setFilteredTours] = useState(tours)
  
  const toursRef = useRef<HTMLElement>(null)
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistContext()

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
    }, 100) 

    return () => clearTimeout(filterTimer)
  }, [debouncedSearchQuery, selectedCategory, debouncedPriceRange, sortBy])

  const toggleWishlist = (tour: any) => {
    if (isInWishlist(tour.id)) {
      removeFromWishlist(tour.id)
    } else {
      addToWishlist(tour as Tour)
    }
  }

  const TourCard = ({ tour, index }: { tour: typeof tours[0], index: number }) => (
    <motion.div
      key={tour.id}
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
            <Image
              src={tour.image || "/placeholder.svg"}
              alt={tour.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className="bg-blue-600 text-white backdrop-blur-sm">
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
              toggleWishlist(tour)
            }}
            className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-all duration-200 group/heart"
          >
            <Heart 
              className={`h-5 w-5 transition-all duration-300 ${
                isInWishlist(tour.id) 
                  ? "text-red-500 fill-current scale-110" 
                  : "text-gray-600 group-hover/heart:text-red-500 group-hover/heart:scale-110"
              }`} 
            />
          </button>
        </div>
        
        <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(tour.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'fill-gray-200 text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{tour.rating}</span>
                <span className="text-sm text-gray-500">({tour.reviews})</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">
                ${tour.price}
                <span className="text-sm font-normal text-gray-500">/person</span>
              </div>
            </div>
            
            <CardTitle className="text-xl group-hover:text-blue-600 transition-colors duration-200 line-clamp-1">
              {tour.title}
            </CardTitle>
            
            <CardDescription className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-4 w-4" />
              {tour.destination}
              <Badge variant="outline" className="ml-2">
                {tour.difficulty}
              </Badge>
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <p className="text-gray-600 mb-4 line-clamp-2">{tour.description}</p>
            
            <div className="grid grid-cols-2 gap-3 text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-blue-500" />
                {tour.duration}
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-blue-500" />
                {tour.groupSize}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-blue-500" />
                Next: {new Date(tour.nextDeparture).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-blue-500" />
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
                onClick={() => setSelectedTour(tour)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 transition-all duration-200 group"
              >
                <Info className="h-4 w-4 mr-2" />
                Quick View
              </Button>
              <Button
                variant="outline"
                className="hover:bg-blue-50 transition-colors duration-200"
              >
                Book Now
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  )

  return (
    <section id="tours" ref={toursRef} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Discover Your Next Adventure
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
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
                  <div className="h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full" />
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
          <p className="text-gray-600">
            {filteredTours.length} {filteredTours.length === 1 ? 'tour' : 'tours'} found
          </p>
          {(searchQuery || selectedCategory !== "All" || priceRange[0] > 0 || priceRange[1] < 3000) && (
            <Button
              variant="ghost"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All")
                setPriceRange([0, 3000])
              }}
              className="text-blue-600 hover:text-blue-700"
            >
              Clear all filters
              <X className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>

        {/* Tours Grid/List */}
        {isLoading ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: {
                    type: "spring",
                    bounce: 0.5,
                    duration: 0.6,
                    delay: i * 0.05
                  }
                }}
              >
                <Card className="overflow-hidden">
                  <Skeleton className="h-64 w-full" />
                  <CardHeader>
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full mb-4" />
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : filteredTours.length > 0 ? (
          <AnimatePresence mode="popLayout">
            <motion.div 
              className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}
              layout
            >
              {filteredTours.map((tour, index) => (
                <TourCard key={tour.id} tour={tour} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="text-center py-12">
            <Globe className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-600 mb-2">No tours found</p>
            <p className="text-gray-500">Try adjusting your filters or search query</p>
          </div>
        )}

        {/* Load More */}
        {filteredTours.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-12"
          >
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3 hover:bg-blue-50 transition-colors duration-200"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Load More Tours
            </Button>
          </motion.div>
        )}
      </div>

      {/* Quick View Modal */}
      <Dialog open={!!selectedTour} onOpenChange={() => setSelectedTour(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedTour && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedTour.title}</DialogTitle>
                <DialogDescription className="flex items-center gap-2 text-lg">
                  <MapPin className="h-4 w-4" />
                  {selectedTour.destination}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-4">
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src={selectedTour.image}
                      alt={selectedTour.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Tour Highlights</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedTour.highlights.map((highlight, idx) => (
                        <Badge key={idx} variant="secondary">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Description</h3>
                    <p className="text-gray-600">{selectedTour.description}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-3xl font-bold text-blue-600">${selectedTour.price}</p>
                        <p className="text-sm text-gray-600">per person</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(selectedTour.rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'fill-gray-200 text-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">{selectedTour.reviews} reviews</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2 border-b">
                        <span className="flex items-center gap-2 text-gray-600">
                          <Clock className="h-4 w-4" />
                          Duration
                        </span>
                        <span className="font-medium">{selectedTour.duration}</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b">
                        <span className="flex items-center gap-2 text-gray-600">
                          <Users className="h-4 w-4" />
                          Group Size
                        </span>
                        <span className="font-medium">{selectedTour.groupSize}</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b">
                        <span className="flex items-center gap-2 text-gray-600">
                          <Calendar className="h-4 w-4" />
                          Next Departure
                        </span>
                        <span className="font-medium">
                          {new Date(selectedTour.nextDeparture).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="flex items-center gap-2 text-gray-600">
                          <TrendingUp className="h-4 w-4" />
                          Availability
                        </span>
                        <Badge variant={selectedTour.spotsLeft <= 3 ? "destructive" : "default"}>
                          {selectedTour.spotsLeft} / {selectedTour.totalSpots} spots left
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <Tabs defaultValue="included" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="included">What's Included</TabsTrigger>
                      <TabsTrigger value="notIncluded">Not Included</TabsTrigger>
                    </TabsList>
                    <TabsContent value="included" className="space-y-2">
                      {selectedTour.included.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </TabsContent>
                    <TabsContent value="notIncluded" className="space-y-2">
                      {selectedTour.notIncluded.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <X className="h-4 w-4 text-red-500" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </TabsContent>
                  </Tabs>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={() => toggleWishlist(selectedTour)}
                      variant="outline"
                      className="flex-1"
                    >
                      <Heart
                        className={`h-4 w-4 mr-2 ${
                          isInWishlist(selectedTour.id) ? 'fill-current text-red-500' : ''
                        }`}
                      />
                      {isInWishlist(selectedTour.id) ? 'Saved' : 'Save'}
                    </Button>
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}