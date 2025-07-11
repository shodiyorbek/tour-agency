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
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
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
    <div className="min-h-screen bg-muted/10 py-6 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <Button 
                variant="ghost" 
                onClick={() => router.push('/')}
                className="w-full sm:w-auto"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Tours
              </Button>
              <div className="flex gap-2 justify-center sm:justify-end">
                <Button variant="outline" size="icon" onClick={handlePrint} className="h-10 w-10">
                  <Printer className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleShare} className="h-10 w-10">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="text-center">
              <CheckCircle2 className="h-12 w-12 sm:h-16 sm:w-16 text-primary mx-auto mb-4" />
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">Booking Confirmed!</h1>
              <p className="text-muted-foreground mb-4">
                Thank you for booking with us. Your adventure awaits!
              </p>
              <div className="bg-primary/10 inline-block px-4 sm:px-6 py-3 rounded-lg">
                <p className="text-sm text-muted-foreground">Booking Reference</p>
                <p className="text-xl sm:text-2xl font-bold text-primary break-all">{booking.id}</p>
              </div>
            </div>
          </div>

          {/* Tour Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Tour Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{booking.tour.title}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="break-words">{booking.tour.destination}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span>{booking.tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span>{booking.numberOfPassengers} Passenger{booking.numberOfPassengers > 1 ? 's' : ''}</span>
                    </div>
                    {booking.tour.nextDeparture && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span>Departure: {format(new Date(booking.tour.nextDeparture), 'MMMM d, yyyy')}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="relative h-48 sm:h-64 rounded-lg overflow-hidden">
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
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                      <h4 className="font-medium">
                        {passenger.firstName} {passenger.lastName}
                      </h4>
                      <Badge variant="secondary">Passenger {index + 1}</Badge>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3 flex-shrink-0" />
                        <span className="break-all">{passenger.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3 flex-shrink-0" />
                        <span className="break-all">{passenger.phone}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground break-all">{booking.contactDetails.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground break-all">{booking.contactDetails.phone}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <span className="capitalize">{booking.paymentMethod}</span>
                  </div>
                  <Badge variant="default">Paid</Badge>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Price per person</span>
                    <span>${booking.tour.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Number of passengers</span>
                    <span>{booking.numberOfPassengers}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total Amount</span>
                    <span className="text-primary">${booking.totalPrice}</span>
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
                <p className="text-sm text-muted-foreground bg-muted/20 p-3 rounded">
                  {booking.specialRequests}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Important Information */}
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <p><strong>Important:</strong> Please arrive 30 minutes before departure time.</p>
                <p>Bring your booking confirmation and valid ID for check-in.</p>
                <p>For any changes or cancellations, contact us at least 24 hours before departure.</p>
              </div>
            </AlertDescription>
          </Alert>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={() => router.push('/my-bookings')} 
              className="w-full sm:w-auto"
            >
              View All Bookings
            </Button>
            <Button 
              variant="outline" 
              onClick={() => router.push('/')}
              className="w-full sm:w-auto"
            >
              Book Another Tour
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}