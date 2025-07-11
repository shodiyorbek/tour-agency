"use client"

import { Plane, Hotel, MapPin, Users, Shield, Clock, Heart, Globe } from "lucide-react"

const services = [
  {
    id: 1,
    icon: Plane,
    title: "Flight Booking",
    description: "Best deals on flights worldwide with major airlines and budget carriers.",
    features: ["24/7 Support", "Price Match", "Flexible Dates"]
  },
  {
    id: 2,
    icon: Hotel,
    title: "Hotel Reservations",
    description: "Luxury to budget accommodations with verified reviews and best rates.",
    features: ["Free Cancellation", "Best Price Guarantee", "VIP Access"]
  },
  {
    id: 3,
    icon: MapPin,
    title: "Tour Packages",
    description: "Curated tours with expert guides, transportation, and activities included.",
    features: ["Expert Guides", "All-Inclusive", "Small Groups"]
  },
  {
    id: 4,
    icon: Users,
    title: "Group Travel",
    description: "Specialized group tours for families, friends, and corporate events.",
    features: ["Custom Itineraries", "Group Discounts", "Dedicated Manager"]
  },
  {
    id: 5,
    icon: Shield,
    title: "Travel Insurance",
    description: "Comprehensive coverage for medical, trip cancellation, and baggage.",
    features: ["24/7 Assistance", "Medical Coverage", "Trip Protection"]
  },
  {
    id: 6,
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer service for emergencies and assistance.",
    features: ["Emergency Hotline", "Live Chat", "WhatsApp Support"]
  }
]

export default function ServicesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-yellow-400">Services</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive travel services to make your journey seamless and memorable. 
            From booking to support, we've got you covered.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-yellow-400"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-8 h-8 text-black" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <div className="space-y-2">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-black" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Personalized Experience</h3>
            <p className="text-gray-600">
              Every trip is customized to your preferences and travel style.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Globe className="w-10 h-10 text-black" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Global Network</h3>
            <p className="text-gray-600">
              Partnered with top travel providers worldwide for the best deals.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-black" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Safe & Secure</h3>
            <p className="text-gray-600">
              Your safety and security are our top priorities throughout your journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}