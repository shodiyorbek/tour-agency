"use client"

import Image from "next/image"
import { MapPin, Star, Users, Calendar, Award, Heart, TrendingUp, Shield } from "lucide-react"

const recommendedPlaces = [
  {
    id: 1,
    name: "Swiss Alps, Switzerland",
    image: "/images/swiss-alps.webp",
    rating: 5.0,
    reviews: 2341,
    price: "$2,499",
    duration: "8 Days",
    travelers: "3.8K+",
    description: "Expert pick for 2024! Breathtaking mountain views, world-class skiing, and luxury chalets.",
    features: ["Expert Pick", "Luxury", "Adventure"],
    badge: "Editor's Choice",
    badgeColor: "bg-purple-500"
  },
  {
    id: 2,
    name: "Maldives Overwater Villas",
    image: "/images/maldives.webp",
    rating: 4.9,
    reviews: 1892,
    price: "$3,299",
    duration: "7 Days",
    travelers: "2.1K+",
    description: "Ultimate romantic getaway with crystal-clear waters and private overwater bungalows.",
    features: ["Romantic", "Luxury", "Beach"],
    badge: "Best Value",
    badgeColor: "bg-green-500"
  },
  {
    id: 3,
    name: "Northern Lights, Iceland",
    image: "/images/iceland-aurora.webp",
    rating: 4.9,
    reviews: 1567,
    price: "$1,899",
    duration: "6 Days",
    travelers: "1.9K+",
    description: "Witness the magical aurora borealis in one of the world's most pristine natural settings.",
    features: ["Natural Wonder", "Adventure", "Unique"],
    badge: "Trending",
    badgeColor: "bg-blue-500"
  },
  {
    id: 4,
    name: "Kyoto Cherry Blossoms",
    image: "/images/kyoto-cherry.webp",
    rating: 4.8,
    reviews: 1245,
    price: "$2,199",
    duration: "9 Days",
    travelers: "2.3K+",
    description: "Experience Japan's most beautiful season with traditional tea ceremonies and temple visits.",
    features: ["Cultural", "Seasonal", "Photography"],
    badge: "Limited Time",
    badgeColor: "bg-pink-500"
  },
  {
    id: 5,
    name: "Safari in Botswana",
    image: "/images/botswana-safari.webp",
    rating: 4.9,
    reviews: 987,
    price: "$4,299",
    duration: "12 Days",
    travelers: "856+",
    description: "Exclusive wildlife encounters in Africa's most pristine wilderness areas.",
    features: ["Wildlife", "Luxury", "Exclusive"],
    badge: "Premium",
    badgeColor: "bg-yellow-500"
  },
  {
    id: 6,
    name: "Amalfi Coast, Italy",
    image: "/images/amalfi-coast.webp",
    rating: 4.8,
    reviews: 2034,
    price: "$2,799",
    duration: "10 Days",
    travelers: "3.1K+",
    description: "Mediterranean charm with stunning coastal views, fine dining, and cultural heritage.",
    features: ["Cultural", "Food & Wine", "Scenic"],
    badge: "Popular",
    badgeColor: "bg-red-500"
  }
]

export default function BestRecommendedSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Award className="w-8 h-8 text-yellow-500 mr-2" />
            <span className="text-yellow-600 font-semibold text-lg">EXPERT RECOMMENDATIONS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Best <span className="text-yellow-400">Recommended</span> Places
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Curated by our travel experts and based on thousands of traveler reviews. 
            These destinations represent the pinnacle of travel experiences for 2024.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <TrendingUp className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Trending Now</h3>
            <p className="text-gray-600">Destinations gaining popularity based on current travel trends</p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Traveler Favorites</h3>
            <p className="text-gray-600">Highest-rated experiences from our community of travelers</p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <Shield className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Vetted</h3>
            <p className="text-gray-600">Personally verified by our team of travel specialists</p>
          </div>
        </div>

        {/* Recommended Places Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendedPlaces.map((place) => (
            <div
              key={place.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 relative"
            >
              {/* Badge */}
              <div className={`absolute top-4 left-4 ${place.badgeColor} text-white px-3 py-1 rounded-full font-bold text-xs z-10`}>
                {place.badge}
              </div>

              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={place.image}
                  alt={place.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-yellow-400 text-black px-4 py-2 rounded-full font-bold text-sm">
                  {place.price}
                </div>
                
                {/* Rating */}
                <div className="absolute bottom-4 left-4 flex items-center bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm font-semibold">{place.rating}</span>
                  <span className="text-xs text-gray-600 ml-1">({place.reviews})</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {place.name}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {place.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {place.features.map((feature, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Details */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {place.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {place.travelers} travelers
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-3 rounded-xl font-semibold hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 transform hover:scale-105">
                  Book This Experience
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-black mb-4">
              Ready to Experience the Best?
            </h3>
            <p className="text-black/80 mb-6 max-w-2xl mx-auto">
              Our travel experts are ready to help you plan the perfect trip to any of these 
              recommended destinations. Get personalized recommendations and exclusive deals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300">
                Get Expert Advice
              </button>
              <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
                View All Recommendations
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}