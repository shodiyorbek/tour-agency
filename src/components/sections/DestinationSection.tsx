"use client"

import Image from "next/image"
import { Star, Users, Calendar } from "lucide-react"

const destinations = [
  {
    id: 1,
    name: "Turkey",
    image: "/gallery/turkey.webp",
    rating: 4.8,
    reviews: 980,
    price: "$999",
    duration: "8 Days",
    travelers: "1.5K+",
    description: "Explore the rich history and culture of Turkey from Istanbul to Cappadocia."
  },
  {
    id: 2,
    name: "Malaysia",
    image: "/placeholder.jpg",
    rating: 4.7,
    reviews: 820,
    price: "$899",
    duration: "7 Days",
    travelers: "1.2K+",
    description: "Discover Malaysia's vibrant cities, rainforests, and culinary delights."
  },
  {
    id: 3,
    name: "Thailand",
    image: "/placeholder.jpg",
    rating: 4.9,
    reviews: 1130,
    price: "$850",
    duration: "7 Days",
    travelers: "2.0K+",
    description: "Experience Thailand's stunning beaches, temples, and bustling markets."
  },
  {
    id: 4,
    name: "Bali",
    image: "/images/bali.webp",
    rating: 4.9,
    reviews: 1400,
    price: "$899",
    duration: "7 Days",
    travelers: "2.5K+",
    description: "Tropical paradise with stunning beaches, ancient temples, and vibrant culture."
  },
  {
    id: 5,
    name: "China",
    image: "/placeholder.jpg",
    rating: 4.7,
    reviews: 960,
    price: "$1,199",
    duration: "10 Days",
    travelers: "1.8K+",
    description: "Journey through China's ancient history and modern marvels."
  },
  {
    id: 6,
    name: "Istanbul, Turkey",
    image: "/placeholder.jpg",
    rating: 4.8,
    reviews: 1100,
    price: "$799",
    duration: "5 Days",
    travelers: "1.6K+",
    description: "Discover the crossroads of East and West with Istanbul's iconic sights."
  },
  {
    id: 7,
    name: "Vietnam",
    image: "/placeholder.jpg",
    rating: 4.8,
    reviews: 1040,
    price: "$950",
    duration: "8 Days",
    travelers: "1.9K+",
    description: "Sail through Halong Bay and explore vibrant cities rich in history and flavour."
  },
  {
    id: 8,
    name: "Georgia (Gruziya)",
    image: "/placeholder.jpg",
    rating: 4.7,
    reviews: 780,
    price: "$899",
    duration: "7 Days",
    travelers: "1.3K+",
    description: "Enjoy Georgia's stunning Caucasus scenery and unique wine culture."
  },
  {
    id: 9,
    name: "Qatar",
    image: "/placeholder.jpg",
    rating: 4.6,
    reviews: 600,
    price: "$1,050",
    duration: "6 Days",
    travelers: "900+",
    description: "Experience Doha's modern skyline, desert safaris, and cultural heritage."
  },
  {
    id: 10,
    name: "Dubai, UAE",
    image: "/gallery/dubai-sunset.jpg",
    rating: 4.8,
    reviews: 1500,
    price: "$999",
    duration: "5 Days",
    travelers: "2.1K+",
    description: "Modern city with luxury shopping, desert adventures, and iconic architecture."
  },
  {
    id: 11,
    name: "Saudi Arabia",
    image: "/placeholder.jpg",
    rating: 4.5,
    reviews: 540,
    price: "$1,199",
    duration: "8 Days",
    travelers: "800+",
    description: "Uncover Saudi Arabia's ancient heritage sites and breathtaking deserts."
  },
  {
    id: 12,
    name: "Baku, Azerbaijan",
    image: "/placeholder.jpg",
    rating: 4.6,
    reviews: 620,
    price: "$899",
    duration: "6 Days",
    travelers: "950+",
    description: "Marvel at Baku's mix of futuristic architecture and historic old town."
  },
  {
    id: 13,
    name: "Sri Lanka",
    image: "/placeholder.jpg",
    rating: 4.8,
    reviews: 880,
    price: "$899",
    duration: "8 Days",
    travelers: "1.4K+",
    description: "Discover lush tea plantations, golden beaches, and rich wildlife."
  },
  {
    id: 14,
    name: "Abu Dhabi, UAE",
    image: "/placeholder.jpg",
    rating: 4.7,
    reviews: 710,
    price: "$950",
    duration: "5 Days",
    travelers: "1.1K+",
    description: "Experience grand mosques, cultural districts, and thrilling theme parks."
  },
  {
    id: 15,
    name: "Maldives",
    image: "/gallery/over-water.jpg",
    rating: 5.0,
    reviews: 1600,
    price: "$2,199",
    duration: "6 Days",
    travelers: "1.2K+",
    description: "Ultimate romantic getaway with overwater villas and crystal-clear waters."
  },
  {
    id: 16,
    name: "Singapore",
    image: "/placeholder.jpg",
    rating: 4.9,
    reviews: 1300,
    price: "$1,299",
    duration: "5 Days",
    travelers: "2.0K+",
    description: "Experience a futuristic cityscape, diverse cuisine, and vibrant nightlife."
  },
  {
    id: 17,
    name: "Antalya, Turkey",
    image: "/placeholder.jpg",
    rating: 4.8,
    reviews: 770,
    price: "$899",
    duration: "7 Days",
    travelers: "1.2K+",
    description: "Relax on the turquoise coast and explore ancient ruins along the Riviera."
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