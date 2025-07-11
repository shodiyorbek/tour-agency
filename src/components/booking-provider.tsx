"use client"

import { createContext, useContext } from 'react'
import { useBooking, Booking, PassengerDetails } from '@/hooks/use-booking'
import { Tour } from '@/hooks/use-wishlist'

interface BookingContextType {
  bookings: Booking[]
  currentBooking: Partial<Booking> | null
  isLoading: boolean
  createBooking: (booking: Omit<Booking, 'id' | 'bookingDate' | 'status'>) => Booking
  updateBookingStatus: (bookingId: string, status: Booking['status']) => void
  cancelBooking: (bookingId: string) => void
  getBookingById: (bookingId: string) => Booking | undefined
  getTotalBookings: () => number
  getActiveBookings: () => Booking[]
  calculateTotalPrice: (tour: Tour, numberOfPassengers: number) => number
  startBooking: (tour: Tour, numberOfPassengers?: number) => void
  clearCurrentBooking: () => void
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const bookingData = useBooking()

  return (
    <BookingContext.Provider value={bookingData}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBookingContext() {
  const context = useContext(BookingContext)
  if (context === undefined) {
    throw new Error('useBookingContext must be used within a BookingProvider')
  }
  return context
}