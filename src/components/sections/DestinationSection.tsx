"use client"

import Image from "next/image"
import { MapPin, Star, Users, Calendar } from "lucide-react"

const destinations = [
  {
    id: 1,
    name: "Bali, Indonesia",
    image: "/images/bali.webp",
    rating: 4.9,
    reviews: 1247,
    price: "$899",
    duration: "7 Days",
    travelers: "2.5K+",
    description: "Tropical paradise with stunning beaches, ancient temples, and vibrant culture."
  },
  {
    id: 2,
    name: "Santorini, Greece",
    image: "/public/gallery/kyoto.jpg",
    rating: 4.8,
    reviews: 892,
    price: "$1,299",
    duration: "6 Days",
    travelers: "1.8K+",
    description: "Iconic white buildings, stunning sunsets, and Mediterranean charm."
  },
  {
    id: 3,
    name: "Machu Picchu, Peru",
    image: "/public/gallery/macho.jpg",
    rating: 4.9,
    reviews: 1563,
    price: "$1,199",
    duration: "8 Days",
    travelers: "3.2K+",
    description: "Ancient Incan citadel high in the Andes mountains."
  },
  {
    id: 4,
    name: "Kyoto, Japan",
    image: "/public/gallery/kyoto.jpg",
    rating: 4.7,
    reviews: 734,
    price: "$1,499",
    duration: "9 Days",
    travelers: "1.5K+",
    description: "Traditional temples, cherry blossoms, and authentic Japanese culture."
  },
  {
    id: 5,
    name: "Serengeti, Tanzania",
    image: "/public/gallery/serengeti.webp",
    rating: 4.9,
    reviews: 987,
    price: "$2,199",
    duration: "10 Days",
    travelers: "1.2K+",
    description: "Wildlife safari experience in Africa's most famous national park."
  },
  {
    id: 6,
    name: "Dubai, UAE",
    image: "/public/gallery/dubai-sunset.jpg",
    rating: 4.6,
    reviews: 1123,
    price: "$999",
    duration: "5 Days",
    travelers: "2.1K+",
    description: "Modern city with luxury shopping, desert adventures, and iconic architecture."
  }
]

export default function DestinationSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Popular <span className="text-yellow-400">Destinations</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the world's most sought-after destinations. From tropical paradises to cultural gems, 
            we've curated the perfect experiences for every traveler.
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full font-bold text-sm">
                  {destination.price}
                </div>
                
                {/* Rating */}
                <div className="absolute bottom-4 left-4 flex items-center bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm font-semibold">{destination.rating}</span>
                  <span className="text-xs text-gray-600 ml-1">({destination.reviews})</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {destination.name}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {destination.description}
                </p>

                {/* Details */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {destination.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {destination.travelers} travelers
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full bg-yellow-400 text-black py-3 rounded-xl font-semibold hover:bg-yellow-300 transition-colors duration-300">
                  Explore Package
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300">
            View All Destinations
          </button>
        </div>
      </div>
    </section>
  )
}