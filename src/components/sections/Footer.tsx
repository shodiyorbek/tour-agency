"use client"

import { Plane, Instagram, Facebook, Twitter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface FooterProps {
  scrollToSection: (sectionId: string) => void
}

export default function Footer({ scrollToSection }: FooterProps) {
  const router = useRouter()
  return (
    <footer className="bg-background border-t text-foreground py-8 sm:py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-3 sm:mb-4">
              <div className="w-6 h-6 sm:w-8 sm:h-8 relative">
                <Image
                  src="/images/logo.png"
                  alt="Big Trip Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="text-xl sm:text-2xl font-bold">Big Trip</span>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
              Creating extraordinary travel experiences that inspire and transform lives.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <Link
                href="https://www.instagram.com/bigtrip.uz/"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link
                href="https://www.instagram.com/bigtrip.uz/"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link
                href="https://www.instagram.com/bigtrip.uz/"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <button
                  onClick={() => router.push("/")}
                  className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push("/destination")}
                  className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Tours
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push("/gallery")}
                  className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Gallery
                </button>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  About
                </Link>
              </li>
              <li>
                <button
                  onClick={() => router.push("/contact")}
                  className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Destinations</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-muted-foreground">
              <li>
                <Link href="/destination" className="text-sm sm:text-base hover:text-foreground transition-colors duration-200">
                  Dubai
                </Link>
              </li>
              <li>
                <Link href="/destination" className="text-sm sm:text-base hover:text-foreground transition-colors duration-200">
                  USA
                </Link>
              </li>
              <li>
                <Link href="/destination" className="text-sm sm:text-base hover:text-foreground transition-colors duration-200">
                  Japan
                </Link>
              </li>
              <li>
                <Link href="/destination" className="text-sm sm:text-base hover:text-foreground transition-colors duration-200">
                  Maldives
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contact Info</h3>
            <div className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-muted-foreground">
              <div>Chilonzor,Sergeli,Yunusobod </div>
              <div>Phone: +998 90 019 22 00</div>
              <div className="break-all">Email: bigtrip@gmail.com</div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Big Trip Travel Agency. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}