"use client"

import { Phone, Mail, MapPin, Instagram, Facebook, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

export default function ContactSection() {
  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">Start Your Journey</h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to explore the world? Get in touch with our travel experts to plan your perfect adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
          <div className="order-2 lg:order-1">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Get in Touch</h3>

            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm sm:text-base font-semibold text-foreground">Phone</div>
                  <Link
                    href="tel:+1-555-0123"
                    className="text-sm sm:text-base text-primary hover:text-primary/80 transition-colors duration-200"
                  >
                    +1 (555) 012-3456
                  </Link>
                </div>
              </div>

              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm sm:text-base font-semibold text-foreground">Email</div>
                  <Link
                    href="mailto:hello@wanderlust.com"
                    className="text-sm sm:text-base text-primary hover:text-primary/80 transition-colors duration-200 break-all"
                  >
                    hello@wanderlust.com
                  </Link>
                </div>
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm sm:text-base font-semibold text-foreground">Office</div>
                  <div className="text-sm sm:text-base text-muted-foreground">123 Travel Street, Adventure City, AC 12345</div>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8">
              <h4 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">Follow Us</h4>
              <div className="flex space-x-3 sm:space-x-4">
                <Link
                  href="https://instagram.com/wanderlust"
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-primary rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform duration-200"
                >
                  <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
                <Link
                  href="https://facebook.com/wanderlust"
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-primary/90 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform duration-200"
                >
                  <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
                <Link
                  href="https://twitter.com/wanderlust"
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-primary/90 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform duration-200"
                >
                  <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <Card className="shadow-lg border-0">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">Send us a message</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Tell us about your dream destination and we'll create the perfect itinerary for you.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <form className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-foreground mb-1">First Name</label>
                      <Input
                        placeholder="John"
                        className="h-10 text-sm sm:text-base transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-foreground mb-1">Last Name</label>
                      <Input
                        placeholder="Doe"
                        className="h-10 text-sm sm:text-base transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-foreground mb-1">Email</label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      className="h-10 text-sm sm:text-base transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-foreground mb-1">Phone</label>
                    <Input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="h-10 text-sm sm:text-base transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-foreground mb-1">Message</label>
                    <Textarea
                      placeholder="Tell us about your dream trip..."
                      rows={4}
                      className="text-sm sm:text-base transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <Button className="animated-button w-full bg-primary hover:bg-primary/90 transition-colors duration-200 h-10 sm:h-11 text-sm sm:text-base">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}