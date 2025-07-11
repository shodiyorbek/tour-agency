"use client"

import Image from "next/image"

const partners = [
  {
    id: 1,
    name: "Emirates Airlines",
    logo: "/placeholder-logo.png",
    category: "Airlines"
  },
  {
    id: 2,
    name: "Marriott Hotels",
    logo: "/placeholder-logo.png",
    category: "Hotels"
  },
  {
    id: 3,
    name: "Hertz Car Rental",
    logo: "/placeholder-logo.png",
    category: "Transportation"
  },
  {
    id: 4,
    name: "Visa Services",
    logo: "/placeholder-logo.png",
    category: "Travel Services"
  },
  {
    id: 5,
    name: "Allianz Insurance",
    logo: "/placeholder-logo.png",
    category: "Insurance"
  },
  {
    id: 6,
    name: "TripAdvisor",
    logo: "/placeholder-logo.png",
    category: "Travel Platform"
  },
  {
    id: 7,
    name: "Booking.com",
    logo: "/placeholder-logo.png",
    category: "Booking Platform"
  },
  {
    id: 8,
    name: "American Express",
    logo: "/placeholder-logo.png",
    category: "Payment"
  }
]

const certifications = [
  {
    id: 1,
    name: "IATA Certified",
    description: "International Air Transport Association",
    icon: "✈️"
  },
  {
    id: 2,
    name: "ASTA Member",
    description: "American Society of Travel Advisors",
    icon: "🏆"
  },
  {
    id: 3,
    name: "BBB Accredited",
    description: "Better Business Bureau",
    icon: "⭐"
  },
  {
    id: 4,
    name: "ISO 9001",
    description: "Quality Management System",
    icon: "✅"
  }
]

export default function PartnersSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Trusted <span className="text-yellow-400">Partners</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We partner with the world's leading travel providers to ensure you get the best 
            service, prices, and experiences on every journey.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="group bg-gray-50 rounded-2xl p-6 text-center hover:bg-yellow-50 transition-all duration-300 border border-gray-100 hover:border-yellow-400"
            >
              <div className="relative w-20 h-20 mx-auto mb-4">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{partner.name}</h3>
              <p className="text-sm text-gray-500">{partner.category}</p>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Our Certifications & Memberships
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{cert.icon}</div>
                <h4 className="font-bold text-gray-900 mb-2">{cert.name}</h4>
                <p className="text-sm text-gray-600">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Why Travelers Trust Us
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-black">25+</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Years Experience</h4>
              <p className="text-gray-600">
                Decades of expertise in creating unforgettable travel experiences
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-black">50K+</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Happy Travelers</h4>
              <p className="text-gray-600">
                Thousands of satisfied customers who choose us again and again
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-black">150+</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Global Partners</h4>
              <p className="text-gray-600">
                Network of trusted partners across the world for seamless travel
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}