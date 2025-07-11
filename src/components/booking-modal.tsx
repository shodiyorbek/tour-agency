"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  Users, Calendar, CreditCard, Check, ChevronRight, 
  ChevronLeft, Info, AlertCircle, Loader2, CheckCircle2,
  Mail, Phone, User, Globe, Shield, DollarSign
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useBookingContext } from "./booking-provider"
import { Tour } from "@/hooks/use-wishlist"
import { PassengerDetails } from "@/hooks/use-booking"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { useIsMobile } from "@/hooks/use-mobile"
import { format } from "date-fns"

interface BookingModalProps {
  tour: Tour
  isOpen: boolean
  onClose: () => void
}

const steps = [
  { id: 1, name: "Passengers", icon: Users },
  { id: 2, name: "Details", icon: User },
  { id: 3, name: "Review", icon: Info },
  { id: 4, name: "Payment", icon: CreditCard }
]

export default function BookingModal({ tour, isOpen, onClose }: BookingModalProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { createBooking, calculateTotalPrice } = useBookingContext()
  const isMobile = useIsMobile()
  
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [bookingComplete, setBookingComplete] = useState(false)
  const [bookingId, setBookingId] = useState("")
  
  // Form data
  const [numberOfPassengers, setNumberOfPassengers] = useState(1)
  const [passengers, setPassengers] = useState<PassengerDetails[]>([{
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    passportNumber: "",
    nationality: ""
  }])
  const [contactEmail, setContactEmail] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [specialRequests, setSpecialRequests] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal" | "bank-transfer">("card")
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  // Card details (for demo purposes)
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")

  const totalPrice = calculateTotalPrice(tour, numberOfPassengers)

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(1)
      setNumberOfPassengers(1)
      setPassengers([{
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        passportNumber: "",
        nationality: ""
      }])
      setContactEmail("")
      setContactPhone("")
      setSpecialRequests("")
      setPaymentMethod("card")
      setAgreedToTerms(false)
      setBookingComplete(false)
    }
  }, [isOpen])

  // Update passengers array when number changes
  const handlePassengerCountChange = (count: string) => {
    const num = parseInt(count)
    setNumberOfPassengers(num)
    
    if (num > passengers.length) {
      const newPassengers = [...passengers]
      for (let i = passengers.length; i < num; i++) {
        newPassengers.push({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          dateOfBirth: "",
          passportNumber: "",
          nationality: ""
        })
      }
      setPassengers(newPassengers)
    } else {
      setPassengers(passengers.slice(0, num))
    }
  }

  const updatePassenger = (index: number, field: keyof PassengerDetails, value: string) => {
    const updated = [...passengers]
    updated[index] = { ...updated[index], [field]: value }
    setPassengers(updated)
  }

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        return numberOfPassengers > 0 && (!tour.totalSpots || numberOfPassengers <= tour.totalSpots)
      case 2:
        return passengers.every(p => 
          p.firstName && p.lastName && p.email && p.phone && p.dateOfBirth
        ) && contactEmail && contactPhone
      case 3:
        return true
      case 4:
        if (paymentMethod === "card") {
          return cardNumber && cardName && expiryDate && cvv && agreedToTerms
        }
        return agreedToTerms
      default:
        return false
    }
  }

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1)
      }
    } else {
      toast({
        title: "Please complete all required fields",
        description: "Some information is missing or invalid",
        variant: "destructive"
      })
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmitBooking = async () => {
    setIsProcessing(true)
    
    try {
      
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const booking = createBooking({
        tourId: tour.id,
        tour,
        passengers,
        numberOfPassengers,
        totalPrice,
        specialRequests,
        paymentMethod,
        contactDetails: {
          email: contactEmail,
          phone: contactPhone
        }
      })
      
      setBookingId(booking.id)
      setBookingComplete(true)
      
      toast({
        title: "Booking Confirmed!",
        description: `Your booking reference is ${booking.id}`,
      })
      
      // Redirect to booking confirmation page after a delay
      setTimeout(() => {
        router.push(`/bookings/${booking.id}`)
        onClose()
      }, 3000)
      
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive"
      })
      setIsProcessing(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="passengers">Number of Passengers</Label>
              <Select 
                value={numberOfPassengers.toString()} 
                onValueChange={handlePassengerCountChange}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select number of passengers" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(Math.min(10, tour.spotsLeft || 10))].map((_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      {i + 1} {i === 0 ? 'Passenger' : 'Passengers'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground mt-2">
                {tour.spotsLeft || 'Limited'} spots available for this tour
              </p>
            </div>
            
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Price per person: ${tour.price}
                <br />
                Total price: ${totalPrice}
              </AlertDescription>
            </Alert>
          </div>
        )
        
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Primary Contact Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact-email">Contact Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-phone">Contact Phone</Label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="+1 234 567 8900"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="max-h-[400px] overflow-y-auto space-y-6">
                {passengers.map((passenger, index) => (
                  <div key={index} className="space-y-4 p-4 bg-muted/20 rounded-lg">
                    <h4 className="font-medium">Passenger {index + 1}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label>First Name *</Label>
                        <Input
                          value={passenger.firstName}
                          onChange={(e) => updatePassenger(index, 'firstName', e.target.value)}
                          placeholder="John"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Last Name *</Label>
                        <Input
                          value={passenger.lastName}
                          onChange={(e) => updatePassenger(index, 'lastName', e.target.value)}
                          placeholder="Doe"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Email *</Label>
                        <Input
                          type="email"
                          value={passenger.email}
                          onChange={(e) => updatePassenger(index, 'email', e.target.value)}
                          placeholder="email@example.com"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Phone *</Label>
                        <Input
                          type="tel"
                          value={passenger.phone}
                          onChange={(e) => updatePassenger(index, 'phone', e.target.value)}
                          placeholder="+1 234 567 8900"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Date of Birth *</Label>
                        <Input
                          type="date"
                          value={passenger.dateOfBirth}
                          onChange={(e) => updatePassenger(index, 'dateOfBirth', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Nationality</Label>
                        <Input
                          value={passenger.nationality || ''}
                          onChange={(e) => updatePassenger(index, 'nationality', e.target.value)}
                          placeholder="United States"
                          className="mt-1"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label>Passport Number (if applicable)</Label>
                        <Input
                          value={passenger.passportNumber || ''}
                          onChange={(e) => updatePassenger(index, 'passportNumber', e.target.value)}
                          placeholder="A12345678"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div>
                <Label htmlFor="special-requests">Special Requests (Optional)</Label>
                <Textarea
                  id="special-requests"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Any dietary requirements, accessibility needs, or other special requests..."
                  className="mt-1"
                  rows={3}
                />
              </div>
            </div>
          </div>
        )
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-primary/10 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">{tour.title}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span>{numberOfPassengers} {numberOfPassengers === 1 ? 'Passenger' : 'Passengers'}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Passenger Details</h4>
              <div className="space-y-2">
                {passengers.map((passenger, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-muted/20 rounded gap-2">
                    <div>
                      <p className="font-medium">{passenger.firstName} {passenger.lastName}</p>
                      <p className="text-sm text-muted-foreground">{passenger.email}</p>
                    </div>
                    <Badge variant="secondary">Passenger {index + 1}</Badge>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Contact Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{contactEmail}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{contactPhone}</span>
                </div>
              </div>
            </div>
            
            {specialRequests && (
              <div>
                <h4 className="font-semibold mb-2">Special Requests</h4>
                <p className="text-sm text-muted-foreground bg-muted/20 p-3 rounded">{specialRequests}</p>
              </div>
            )}
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Price per person</span>
                <span>${tour.price}</span>
              </div>
              <div className="flex justify-between">
                <span>Number of passengers</span>
                <span>{numberOfPassengers}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total Price</span>
                <span className="text-primary">${totalPrice}</span>
              </div>
            </div>
          </div>
        )
        
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">Payment Method</h4>
              <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/10">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <span className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Credit/Debit Card
                      </span>
                      <div className="flex gap-1 flex-wrap">
                        <Badge variant="secondary" className="text-xs">Visa</Badge>
                        <Badge variant="secondary" className="text-xs">Mastercard</Badge>
                        <Badge variant="secondary" className="text-xs">Amex</Badge>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/10">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex-1 cursor-pointer flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      PayPal
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/10">
                    <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                    <Label htmlFor="bank-transfer" className="flex-1 cursor-pointer flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Bank Transfer
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
            
            {paymentMethod === "card" && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input
                    id="card-number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="card-name">Name on Card</Label>
                  <Input
                    id="card-name"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="John Doe"
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      placeholder="MM/YY"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      type="password"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="123"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {paymentMethod === "paypal" && (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  You will be redirected to PayPal to complete your payment after confirming your booking.
                </AlertDescription>
              </Alert>
            )}
            
            {paymentMethod === "bank-transfer" && (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Bank transfer details will be sent to your email after booking confirmation. 
                  Your booking will be held for 48 hours pending payment.
                </AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-3">
              <div className="bg-muted/20 p-4 rounded-lg">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total Amount</span>
                  <span className="text-primary">${totalPrice}</span>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1"
                />
                <Label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                  I agree to the terms and conditions and understand that this booking is subject to availability.
                  I also acknowledge the cancellation policy.
                </Label>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${isMobile ? 'w-[95vw] max-w-none mx-2' : 'max-w-3xl'} max-h-[90vh] overflow-hidden flex flex-col`}>
        {!bookingComplete ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl">Book Your Tour</DialogTitle>
              <DialogDescription>
                Complete your booking for {tour.title}
              </DialogDescription>
            </DialogHeader>
            
            {/* Progress Steps */}
            <div className={`${isMobile ? 'px-2' : 'px-4'} mb-6`}>
              {isMobile ? (
                // Mobile progress steps - simplified
                <div className="flex items-center justify-between">
                  {steps.map((step, index) => {
                    const Icon = step.icon
                    return (
                      <div key={step.id} className="flex flex-col items-center">
                        <div className={`
                          flex items-center justify-center w-10 h-10 rounded-full transition-colors mb-1
                          ${currentStep >= step.id 
                            ? 'bg-primary text-white' 
                            : 'bg-muted text-muted-foreground'
                          }
                        `}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="text-xs font-medium text-center">{step.name}</span>
                        {index < steps.length - 1 && (
                          <div className={`w-8 h-1 mx-2 rounded transition-colors ${
                            currentStep > step.id ? 'bg-primary' : 'bg-muted'
                          }`} />
                        )}
                      </div>
                    )
                  })}
                </div>
              ) : (
                // Desktop progress steps
                <div className="flex items-center justify-between">
                  {steps.map((step, index) => {
                    const Icon = step.icon
                    return (
                      <div key={step.id} className="flex items-center w-full">
                        <div className={`
                          flex items-center justify-center w-28 h-10 rounded-full transition-colors
                          ${currentStep >= step.id 
                            ? 'bg-primary text-white' 
                            : 'bg-muted text-muted-foreground'
                          }
                        `}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="ml-2">
                          <span className="text-sm font-medium">{step.name}</span>
                        </div>
                        {index < steps.length - 1 && (
                          <div className={`w-full h-1 mx-3 rounded transition-colors ${
                            currentStep > step.id ? 'bg-primary' : 'bg-muted'
                          }`} />
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
            
            {/* Step Content */}
            <div className="flex-1 overflow-y-auto px-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderStepContent()}
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6 pt-4 border-t">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1 || isProcessing}
                className="w-full sm:w-auto"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              
              {currentStep < steps.length ? (
                <Button 
                  onClick={handleNext} 
                  disabled={!validateStep()}
                  className="w-full sm:w-auto"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmitBooking} 
                  disabled={!validateStep() || isProcessing}
                  className="bg-primary hover:bg-primary/90 w-full sm:w-auto"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Confirm Booking
                      <Check className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <CheckCircle2 className="h-16 w-16 sm:h-20 sm:w-20 text-primary mx-auto mb-4" />
            <DialogTitle className="text-xl sm:text-2xl mb-2">Booking Confirmed!</DialogTitle>
            <DialogDescription className="text-base sm:text-lg mb-4">
              Your booking reference is <span className="font-semibold">{bookingId}</span>
            </DialogDescription>
            <p className="text-muted-foreground mb-6">
              A confirmation email has been sent to {contactEmail}
            </p>
            <p className="text-sm text-muted-foreground">
              Redirecting to your booking details...
            </p>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  )
}