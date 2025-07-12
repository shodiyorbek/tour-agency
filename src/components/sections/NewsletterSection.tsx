"use client"

import { Mail, Send, Gift, Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function NewsletterSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10">
          <Plane className="w-16 h-16 text-primary" />
        </div>
        <div className="absolute bottom-10 right-10">
          <Plane className="w-12 h-12 text-primary rotate-45" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-10 h-10 text-primary-foreground" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Stay <span className="text-primary">Connected</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about exclusive deals, 
              travel tips, and amazing destinations.
            </p>
          </div>

          {/* Newsletter Form */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 w-full">
                <Input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="h-14 text-lg border-2 border-gray-200 focus:border-primary"
                />
              </div>
              <Button className="h-14 px-8 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-colors duration-300 flex items-center gap-2">
                <Send className="w-5 h-5" />
                Subscribe
              </Button>
            </div>
            
            <p className="text-sm text-gray-500 mt-4">
              By subscribing, you agree to our privacy policy and terms of service.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Exclusive Deals</h3>
              <p className="text-gray-300">
                Get access to member-only discounts and early bird offers
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Travel Tips</h3>
              <p className="text-gray-300">
                Receive insider tips and destination guides from our experts
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Weekly Updates</h3>
              <p className="text-gray-300">
                Stay informed about new destinations and travel trends
              </p>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-16 text-center">
            <p className="text-gray-300 mb-4">Join over 50,000 travelers who trust us</p>
            <div className="flex justify-center items-center gap-8 text-gray-400">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                <span className="text-sm">No spam, ever</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                <span className="text-sm">Unsubscribe anytime</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                <span className="text-sm">Secure & private</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}