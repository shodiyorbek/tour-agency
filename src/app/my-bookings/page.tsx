"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  Calendar, MapPin, Users, Eye, X, ChevronLeft, 
  Filter, Search, Clock, CheckCircle2, AlertCircle
} from "lucide-react"
import { useBookingContext } from "@/components/booking-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import Image from "next/image"
import { format } from "date-fns"

export default function MyBookingsPage() {
  const router = useRouter()
  const { bookings, cancelBooking } = useBookingContext()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  // Filter and sort bookings
  const filteredBookings = bookings
    .filter(booking => {
      const matchesSearch = booking.tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          booking.tour.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          booking.id.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || booking.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime()
        case "oldest":
          return new Date(a.bookingDate).getTime() - new Date(b.bookingDate).getTime()
        case "price-high":
          return b.totalPrice - a.totalPrice
        case "price-low":
          return a.totalPrice - b.totalPrice
        default:
          return 0
      }
    })

  const activeBookings = bookings.filter(b => b.status !== "cancelled")
  const pendingBookings = bookings.filter(b => b.status === "pending")
  const confirmedBookings = bookings.filter(b => b.status === "confirmed")
  const cancelledBookings = bookings.filter(b => b.status === "cancelled")

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      cancelBooking(bookingId)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle2 className="h-4 w-4 text-primary" />
      case "pending":
        return <Clock className="h-4 w-4 text-primary/70" />
      case "cancelled":
        return <X className="h-4 w-4 text-destructive" />
      default:
        return null
    }
  }

  const BookingCard = ({ booking }: { booking: any }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="flex flex-col lg:flex-row">
          <div className="relative w-full lg:w-48 h-48 lg:h-auto">
            <Image
              src={booking.tour.image}
              alt={booking.tour.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div className="flex-1">
                  <CardTitle className="text-lg">{booking.tour.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <MapPin className="h-3 w-3 flex-shrink-0" />
                    <span className="break-words">{booking.tour.destination}</span>
                  </CardDescription>
                </div>
                <Badge 
                  variant={booking.status === 'confirmed' ? 'default' : 
                          booking.status === 'pending' ? 'secondary' : 'destructive'}
                  className="flex items-center gap-1 w-fit"
                >
                  {getStatusIcon(booking.status)}
                  {booking.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground">Booking Ref</p>
                  <p className="font-medium text-sm break-all">{booking.id}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Booking Date</p>
                  <p className="font-medium text-sm">
                    {format(new Date(booking.bookingDate), 'MMM d, yyyy')}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Passengers</p>
                  <p className="font-medium text-sm flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {booking.numberOfPassengers}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Price</p>
                  <p className="font-medium text-sm text-primary">${booking.totalPrice}</p>
                </div>
              </div>
              {booking.tour.nextDeparture && (
                <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3 flex-shrink-0" />
                  <span>Departure: {format(new Date(booking.tour.nextDeparture), 'MMM d, yyyy')}</span>
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  size="sm"
                  onClick={() => router.push(`/bookings/${booking.id}`)}
                  className="w-full sm:w-auto"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                {booking.status !== "cancelled" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCancelBooking(booking.id)}
                    className="w-full sm:w-auto"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-muted/10 py-6 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => router.push('/')}
              className="mb-4"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Tours
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">My Bookings</h1>
            <p className="text-muted-foreground">Manage and view all your tour bookings</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{activeBookings.length}</p>
                    <p className="text-xs text-muted-foreground">Active</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{pendingBookings.length}</p>
                    <p className="text-xs text-muted-foreground">Pending</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{confirmedBookings.length}</p>
                    <p className="text-xs text-muted-foreground">Confirmed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-destructive/10 rounded-full">
                    <X className="h-4 w-4 text-destructive" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{cancelledBookings.length}</p>
                    <p className="text-xs text-muted-foreground">Cancelled</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters & Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search bookings..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery("")
                    setStatusFilter("all")
                    setSortBy("recent")
                  }}
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Bookings List */}
          {filteredBookings.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No bookings found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || statusFilter !== "all" 
                    ? "Try adjusting your search or filter criteria."
                    : "You haven't made any bookings yet."
                  }
                </p>
                <Button onClick={() => router.push('/')}>
                  Browse Tours
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {filteredBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}