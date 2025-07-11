"use client"

import { Plane, Hotel, MapPin, Users, Shield, Clock, Heart, Globe, Phone, Mail, MessageCircle } from "lucide-react"

const services = [
  {
    id: 1,
    icon: Plane,
    title: "Travel Planning",
    description: "Expert travel planning and itinerary design for your perfect vacation.",
    features: ["Custom Itineraries", "Local Expertise", "Flexible Planning"]
  },
  {
    id: 2,
    icon: Hotel,
    title: "Accommodation Guidance",
    description: "Recommendations for the best hotels and accommodations worldwide.",
    features: ["Verified Reviews", "Best Locations", "Value Options"]
  },
  {
    id: 3,
    icon: MapPin,
    title: "Tour Recommendations",
    description: "Curated tour suggestions with expert guides and authentic experiences.",
    features: ["Expert Guides", "Authentic Experiences", "Small Groups"]
  },
  {
    id: 4,
    icon: Users,
    title: "Group Travel Planning",
    description: "Specialized planning for families, friends, and corporate events.",
    features: ["Custom Itineraries", "Group Coordination", "Dedicated Support"]
  },
  {
    id: 5,
    icon: Shield,
    title: "Travel Insurance Advice",
    description: "Guidance on comprehensive coverage for medical, trip cancellation, and baggage.",
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
            We provide comprehensive travel planning and support services to make your journey seamless and memorable. 
            Contact us for personalized travel assistance.
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
              Partnered with top travel providers worldwide for the best experiences.
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

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Plan Your Dream Trip?</h3>
            <p className="text-lg mb-6 opacity-90">
              Contact our travel experts today for personalized assistance and recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <span>Call us: +1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <span>Email: info@bigtrip.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <span>Live chat available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}