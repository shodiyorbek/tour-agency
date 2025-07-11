"use client"

import { useState, useEffect } from 'react'
import { Tour } from './use-wishlist'

export interface PassengerDetails {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  passportNumber?: string
  nationality?: string
}

export interface Booking {
  id: string
  tourId: number
  tour: Tour
  passengers: PassengerDetails[]
  numberOfPassengers: number
  totalPrice: number
  specialRequests?: string
  status: 'pending' | 'confirmed' | 'cancelled'
  bookingDate: string
  paymentMethod?: 'card' | 'paypal' | 'bank-transfer'
  contactDetails: {
    email: string
    phone: string
  }
}

export function useBooking() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentBooking, setCurrentBooking] = useState<Partial<Booking> | null>(null)

  // Load bookings from localStorage on component mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('tour-bookings')
      if (saved) {
        setBookings(JSON.parse(saved))
      }
    } catch (error) {
      console.error('Error loading bookings from localStorage:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Save bookings to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('tour-bookings', JSON.stringify(bookings))
      } catch (error) {
        console.error('Error saving bookings to localStorage:', error)
      }
    }
  }, [bookings, isLoading])

  const generateBookingId = () => {
    return `BK-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`.toUpperCase()
  }

  const createBooking = (booking: Omit<Booking, 'id' | 'bookingDate' | 'status'>) => {
    const newBooking: Booking = {
      ...booking,
      id: generateBookingId(),
      bookingDate: new Date().toISOString(),
      status: 'pending'
    }
    setBookings(prev => [...prev, newBooking])
    return newBooking
  }

  const updateBookingStatus = (bookingId: string, status: Booking['status']) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId ? { ...booking, status } : booking
      )
    )
  }

  const cancelBooking = (bookingId: string) => {
    updateBookingStatus(bookingId, 'cancelled')
  }

  const getBookingById = (bookingId: string) => {
    return bookings.find(booking => booking.id === bookingId)
  }

  const getTotalBookings = () => {
    return bookings.length
  }

  const getActiveBookings = () => {
    return bookings.filter(booking => booking.status !== 'cancelled')
  }

  const calculateTotalPrice = (tour: Tour, numberOfPassengers: number) => {
    return tour.price * numberOfPassengers
  }

  const startBooking = (tour: Tour, numberOfPassengers: number = 1) => {
    setCurrentBooking({
      tour,
      tourId: tour.id,
      numberOfPassengers,
      totalPrice: calculateTotalPrice(tour, numberOfPassengers),
      passengers: []
    })
  }

  const clearCurrentBooking = () => {
    setCurrentBooking(null)
  }

  return {
    bookings,
    currentBooking,
    isLoading,
    createBooking,
    updateBookingStatus,
    cancelBooking,
    getBookingById,
    getTotalBookings,
    getActiveBookings,
    calculateTotalPrice,
    startBooking,
    clearCurrentBooking
  }
}