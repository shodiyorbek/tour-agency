"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useWishlistContext } from "@/components/wishlist-provider"
import { useBookingContext } from "@/components/booking-provider"
import WishlistModal from "@/components/wishlist-modal"

import { Heart, Menu, X, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"


interface NavigationProps {
  scrollToSection: (sectionId: string) => void
}

export default function Navigation({ scrollToSection }: NavigationProps) {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const { getWishlistCount } = useWishlistContext()
  const { getTotalBookings } = useBookingContext()

  const handleWishlistOpen = () => {
    setIsWishlistOpen(true)
    setIsMenuOpen(false) // Close mobile menu when opening wishlist
  }

  const handleMobileNavClick = (sectionId: string) => {
    scrollToSection(sectionId)
    setIsMenuOpen(false) // Close menu after navigation
  }

  const handleBookingsClick = () => {
    router.push('/my-bookings')
    setIsMenuOpen(false)
  }

  const handleGalleryClick = () => {
    router.push('/gallery')
    setIsMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 w-full bg-white z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 relative">
              <Image
                src="/images/logo.png"
                alt="Big Trip Logo"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-foreground">Big Trip</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className="nav-link text-foreground hover:text-primary transition-colors duration-200 relative font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("hot-deals")}
              className="nav-link text-foreground hover:text-primary transition-colors duration-200 relative font-medium"
            >
              Hot deals
            </button>
            <button
              onClick={() => scrollToSection("tours")}
              className="nav-link text-foreground hover:text-primary transition-colors duration-200 relative font-medium"
            >
              Special Deals
            </button>
            <button
              onClick={handleGalleryClick}
              className="nav-link text-foreground hover:text-primary transition-colors duration-200 relative font-medium"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="nav-link text-foreground hover:text-primary transition-colors duration-200 relative font-medium"
            >
              Why we?
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="nav-link text-foreground hover:text-primary transition-colors duration-200 relative font-medium"
            >
              Contact
            </button>
          
            <button
              onClick={handleBookingsClick}
              className="relative text-foreground hover:text-primary transition-colors duration-200 p-2"
            >
              <Calendar className="h-5 w-5 lg:h-6 lg:w-6" />
              {getTotalBookings() > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {getTotalBookings()}
                </span>
              )}
            </button>
            
            <button
              onClick={handleWishlistOpen}
              className="relative text-foreground hover:text-primary transition-colors duration-200 p-2"
            >
              <Heart className="h-5 w-5 lg:h-6 lg:w-6" />
              {getWishlistCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary/80 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {getWishlistCount()}
                </span>
              )}
            </button>
            <Button 
              className="text-sm lg:text-base"
              onClick={() => scrollToSection("tours")}
            >
              Book Now
            </Button>
          </div>

          {/* Mobile menu button and wishlist */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={handleBookingsClick}
              className="relative text-foreground hover:text-primary transition-colors duration-200 p-2"
            >
              <Calendar className="h-5 w-5" />
              {getTotalBookings() > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px] font-medium">
                  {getTotalBookings()}
                </span>
              )}
            </button>
            
            <button
              onClick={handleWishlistOpen}
              className="relative text-foreground hover:text-primary transition-colors duration-200 p-2"
            >
              <Heart className="h-5 w-5" />
              {getWishlistCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary/80 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px] font-medium">
                  {getWishlistCount()}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:text-primary transition-colors duration-200 p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top duration-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => handleMobileNavClick("home")}
                className="block w-full text-left px-3 py-2 text-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors duration-200 font-medium"
              >
                Home
              </button>
              <button
                onClick={() => handleMobileNavClick("hot-deals")}
                className="block w-full text-left px-3 py-2 text-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors duration-200 font-medium"
              >
                Hot deals
              </button>
              <button
                onClick={() => handleMobileNavClick("tours")}
                className="block w-full text-left px-3 py-2 text-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors duration-200 font-medium"
              >
                Special Deals
              </button>
              <button
                onClick={handleGalleryClick}
                className="block w-full text-left px-3 py-2 text-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors duration-200 font-medium"
              >
                Gallery
              </button>
              <button
                onClick={() => handleMobileNavClick("about")}
                className="block w-full text-left px-3 py-2 text-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors duration-200 font-medium"
              >
                Why we?
              </button>
              <button
                onClick={() => handleMobileNavClick("contact")}
                className="block w-full text-left px-3 py-2 text-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors duration-200 font-medium"
              >
                Contact
              </button>
              <div className="border-t border-gray-200 mt-2 pt-2">
                <button
                  onClick={handleBookingsClick}
                  className="block w-full text-left px-3 py-2 text-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors duration-200 font-medium"
                >
                  My Bookings
                  {getTotalBookings() > 0 && (
                    <span className="ml-2 text-sm text-primary">({getTotalBookings()})</span>
                  )}
                </button>
                <Button 
                  className="w-full mt-2"
                  onClick={() => handleMobileNavClick("tours")}
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <WishlistModal 
          isOpen={isWishlistOpen} 
          onClose={() => setIsWishlistOpen(false)} 
        />
      </div>
    </nav>
  )
}