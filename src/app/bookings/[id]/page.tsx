"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { 
  Calendar, MapPin, Users, CreditCard, Mail, Phone, 
  CheckCircle2, AlertCircle, Printer, Download, Share2,
  ChevronLeft, Clock, DollarSign, Info
} from "lucide-react"
import { useBookingContext } from "@/components/booking-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion } from "framer-motion"
import Image from "next/image"
import { format } from "date-fns"

export default function BookingConfirmationPage() {
  const params = useParams()
  const router = useRouter()
  const { getBookingById } = useBookingContext()
  const [booking, setBooking] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      const bookingData = getBookingById(params.id as string)
      if (bookingData) {
        setBooking(bookingData)
      }
      setLoading(false)
    }
  }, [params.id, getBookingById])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <CardTitle className="text-center">Booking Not Found</CardTitle>
            <CardDescription className="text-center">
              The booking you're looking for doesn't exist or has expired.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => router.push('/')} 
              className="w-full"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handlePrint = () => {
    window.print()
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Booking Confirmation - ${booking.tour.title}`,
          text: `Booking reference: ${booking.id}`,
          url: window.location.href,
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-muted/10 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <Button 
                variant="ghost" 
                onClick={() => router.push('/')}
                className="mb-4"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Tours
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={handlePrint}>
                  <Printer className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="text-center">
              <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
              <p className="text-muted-foreground mb-4">
                Thank you for booking with us. Your adventure awaits!
              </p>
              <div className="bg-primary/10 inline-block px-6 py-3 rounded-lg">
                <p className="text-sm text-muted-foreground">Booking Reference</p>
                <p className="text-2xl font-bold text-primary">{booking.id}</p>
              </div>
            </div>
          </div>

          {/* Tour Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Tour Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{booking.tour.title}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{booking.tour.destination}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{booking.tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{booking.numberOfPassengers} Passenger{booking.numberOfPassengers > 1 ? 's' : ''}</span>
                    </div>
                    {booking.tour.nextDeparture && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Departure: {format(new Date(booking.tour.nextDeparture), 'MMMM d, yyyy')}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src={booking.tour.image}
                    alt={booking.tour.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Passenger Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Passenger Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {booking.passengers.map((passenger: any, index: number) => (
                  <div key={index} className="p-4 bg-muted/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">
                        {passenger.firstName} {passenger.lastName}
                      </h4>
                      <Badge variant="secondary">Passenger {index + 1}</Badge>
                    </div>
                    <div className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3" />
                        <span>{passenger.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3" />
                        <span>{passenger.phone}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payment Summary */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Tour Price (per person)</span>
                  <span>${booking.tour.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Number of Passengers</span>
                  <span>{booking.numberOfPassengers}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total Paid</span>
                  <span className="text-primary">${booking.totalPrice}</span>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Payment Method: {booking.paymentMethod === 'card' ? 'Credit/Debit Card' : 
                                   booking.paymentMethod === 'paypal' ? 'PayPal' : 'Bank Transfer'}
                  </span>
                </div>
              </div>
              <Badge 
                className="mt-4" 
                variant={booking.status === 'confirmed' ? 'default' : 
                        booking.status === 'pending' ? 'secondary' : 'destructive'}
              >
                {booking.status.toUpperCase()}
              </Badge>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{booking.contactDetails.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{booking.contactDetails.phone}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Special Requests */}
          {booking.specialRequests && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Special Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{booking.specialRequests}</p>
              </CardContent>
            </Card>
          )}

          {/* Important Information */}
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Important:</strong> A confirmation email has been sent to {booking.contactDetails.email}. 
              Please check your email for detailed information about your tour, including meeting points, 
              what to bring, and cancellation policy.
            </AlertDescription>
          </Alert>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={() => router.push('/')} 
              className="flex-1"
            >
              Book Another Tour
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => router.push('/my-bookings')}
            >
              View All My Bookings
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}