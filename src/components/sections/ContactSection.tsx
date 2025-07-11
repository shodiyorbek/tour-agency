"use client"

import { Phone, Mail, MapPin, Instagram, Facebook, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Start Your Journey</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to explore the world? Get in touch with our travel experts to plan your perfect adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h3>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Phone className="h-6 w-6 text-primary" />
            </div>
                <div>
                  <div className="font-semibold text-foreground">Phone</div>
                  <Link
                    href="tel:+1-555-0123"
                    className="text-primary hover:text-primary/80 transition-colors duration-200"
                  >
                    +1 (555) 012-3456
                  </Link>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Mail className="h-6 w-6 text-primary" />
            </div>
                <div>
                  <div className="font-semibold text-foreground">Email</div>
                                      <Link
                      href="mailto:hello@wanderlust.com"
                      className="text-primary hover:text-primary/80 transition-colors duration-200"
                    >
                      hello@wanderlust.com
                    </Link>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
                <div>
                  <div className="font-semibold text-foreground">Office</div>
                  <div className="text-muted-foreground">123 Travel Street, Adventure City, AC 12345</div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-semibold text-foreground mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <Link
                  href="https://instagram.com/wanderlust"
                  className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform duration-200"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link
                  href="https://facebook.com/wanderlust"
                  className="w-10 h-10 bg-primary/90 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform duration-200"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link
                  href="https://twitter.com/wanderlust"
                  className="w-10 h-10 bg-primary/90 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform duration-200"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          <div>
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>
                  Tell us about your dream destination and we'll create the perfect itinerary for you.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">First Name</label>
                      <Input
                        placeholder="John"
                        className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Last Name</label>
                      <Input
                        placeholder="Doe"
                        className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Phone</label>
                    <Input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Message</label>
                    <Textarea
                      placeholder="Tell us about your dream trip..."
                      rows={4}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                                <Button className="animated-button w-full bg-primary hover:bg-primary/90 transition-colors duration-200">
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