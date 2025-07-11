"use client"

import { Plane, Instagram, Facebook, Twitter } from "lucide-react"
import Link from "next/link"

interface FooterProps {
  scrollToSection: (sectionId: string) => void
}

export default function Footer({ scrollToSection }: FooterProps) {
  return (
    <footer className="bg-background border-t text-foreground py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Plane className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">Wanderlust</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Creating extraordinary travel experiences that inspire and transform lives.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://instagram.com/wanderlust"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://facebook.com/wanderlust"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://twitter.com/wanderlust"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("tours")}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Tours
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("gallery")}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Destinations</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground transition-colors duration-200">
                  Dubai
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors duration-200">
                  USA
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors duration-200">
                  Japan
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors duration-200">
                  Maldives
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 text-muted-foreground">
              <div>123 Travel Street</div>
              <div>Adventure City, AC 12345</div>
              <div>Phone: +1 (555) 012-3456</div>
              <div>Email: hello@wanderlust.com</div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Wanderlust Travel Agency. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}