"use client"

import { useState } from "react"

import { Camera, Menu, X, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWishlistContext } from "@/components/wishlist-provider"
import WishlistModal from "@/components/wishlist-modal"

import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"


interface NavigationProps {
  scrollToSection: (sectionId: string) => void
}

export default function Navigation({ scrollToSection }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const { getWishlistCount } = useWishlistContext()

  return (
    <nav className="fixed top-0 w-full bg-white z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 relative">
              <Image
                src="/images/logo.png"
                alt="Travelo Logo"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <span className="text-2xl font-bold text-gray-900">Travelo</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className="nav-link text-gray-700 hover:text-primary transition-colors duration-200 relative font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("tours")}
              className="nav-link text-gray-700 hover:text-primary transition-colors duration-200 relative font-medium"
            >
              Discover
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className="nav-link text-gray-700 hover:text-primary transition-colors duration-200 relative font-medium"
            >
              Special Deals
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="nav-link text-gray-700 hover:text-primary transition-colors duration-200 relative font-medium"
            >
              Support
            </button>
            <button className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium">
              Login
            </button>

            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative text-gray-700 hover:text-purple-600 transition-colors duration-200 p-2"
            >
              <Heart className="h-6 w-6" />
              {getWishlistCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getWishlistCount()}
                </span>
              )}
            </button>
            <Button className="animated-button bg-purple-600 hover:bg-purple-700 transition-colors duration-200 rounded-full px-6">

            <Button className="animated-button bg-primary hover:bg-primary/90 transition-colors duration-200 rounded-full px-6">

              Sign Up
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary transition-colors duration-200"
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
                onClick={() => scrollToSection("home")}
                className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("tours")}
                className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
              >
                Discover
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
              >
                Special Deals
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
              >
                Support
              </button>
              <button className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors duration-200 font-medium">
                Login
              </button>
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="flex items-center px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
              >
                <Heart className="h-5 w-5 mr-2" />
                Wishlist {getWishlistCount() > 0 && `(${getWishlistCount()})`}
              </button>
              <div className="px-3 py-2">
                <Button className="animated-button w-full bg-primary hover:bg-primary/90 transition-colors duration-200 rounded-full">
                  Sign Up
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