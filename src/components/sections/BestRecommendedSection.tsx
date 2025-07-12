"use client"

import Image from "next/image"
import { Star, Users, Calendar, Award } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const recommendedPlaces = [
  {
    id: 1,
    name: "Swiss Alps, Switzerland",
    image: "/gallery/macho.jpg",
    rating: 5.0,
    reviews: 2341,
    price: "$2,499",
    duration: "8 Days",
    travelers: "3.8K+",
    description: "Expert pick for 2024! Breathtaking mountain views, world-class skiing, and luxury chalets.",
    features: ["Expert Pick", "Luxury", "Adventure"],
    badge: "Editor's Choice",
    badgeColor: "bg-primary"
  },
  {
    id: 2,
    name: "Maldives Overwater Villas",
    image: "/gallery/over-water.jpg",
    rating: 4.9,
    reviews: 1892,
    price: "$3,299",
    duration: "7 Days",
    travelers: "2.1K+",
    description: "Ultimate romantic getaway with crystal-clear waters and private overwater bungalows.",
    features: ["Romantic", "Luxury", "Beach"],
    badge: "Best Value",
    badgeColor: "bg-primary"
  },
  {
    id: 3,
    name: "Northern Lights, Iceland",
    image: "/gallery/aurora.jpg",
    rating: 4.9,
    reviews: 1567,
    price: "$1,899",
    duration: "6 Days",
    travelers: "1.9K+",
    description: "Witness the magical aurora borealis in one of the world's most pristine natural settings.",
    features: ["Natural Wonder", "Adventure", "Unique"],
    badge: "Trending",
    badgeColor: "bg-primary"
  },
  {
    id: 4,
    name: "Kyoto Cherry Blossoms",
    image: "/gallery/kyoto.jpg",
    rating: 4.8,
    reviews: 1245,
    price: "$2,199",
    duration: "9 Days",
    travelers: "2.3K+",
    description: "Experience Japan's most beautiful season with traditional tea ceremonies and temple visits.",
    features: ["Cultural", "Seasonal", "Photography"],
    badge: "Limited Time",
    badgeColor: "bg-primary"
  },
  {
    id: 5,
    name: "Safari in Botswana",
    image: "/gallery/serengeti.webp",
    rating: 4.9,
    reviews: 987,
    price: "$4,299",
    duration: "12 Days",
    travelers: "856+",
    description: "Exclusive wildlife encounters in Africa's most pristine wilderness areas.",
    features: ["Wildlife", "Luxury", "Exclusive"],
    badge: "Premium",
    badgeColor: "bg-primary"
  },
  {
    id: 6,
    name: "Amalfi Coast, Italy",
    image: "/gallery/turkey.webp",
    rating: 4.8,
    reviews: 2034,
    price: "$2,799",
    duration: "10 Days",
    travelers: "3.1K+",
    description: "Mediterranean charm with stunning coastal views, fine dining, and cultural heritage.",
    features: ["Cultural", "Food & Wine", "Scenic"],
    badge: "Popular",
    badgeColor: "bg-primary"
  }
]

export default function BestRecommendedSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/50 rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-24 h-24 bg-primary/40 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary/30 rounded-full animate-ping"></div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <Award className="w-8 h-8 text-primary mr-2" />
            <span className="text-primary font-semibold text-lg">EXPERT RECOMMENDATIONS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Best <span className="text-primary">Recommended</span> Places
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Curated by our travel experts and based on thousands of traveler reviews. 
            These destinations represent the pinnacle of travel experiences for 2024.
          </p>
        </motion.div>

        {/* Recommended Places Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendedPlaces.map((place, index) => (
            <motion.div
              key={place.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20"
            >
              {/* Badge */}
              <div className={`absolute top-4 left-4 ${place.badgeColor} text-white px-3 py-1 rounded-full font-bold text-xs z-10 backdrop-blur-sm`}>
                {place.badge}
              </div>

              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={place.image}
                  alt={place.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold text-sm backdrop-blur-sm">
                  {place.price}
                </div>
                
                {/* Rating */}
                <div className="absolute bottom-4 left-4 flex items-center bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Star className="w-4 h-4 text-primary fill-current mr-1" />
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
                <Button className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105">
                  Book This Experience
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary to-primary/80 p-8 rounded-3xl shadow-xl">
            <h3 className="text-2xl font-bold text-primary-foreground mb-4">
              Ready to Experience the Best?
            </h3>
            <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
              Our travel experts are ready to help you plan the perfect trip to any of these 
              recommended destinations. Get personalized recommendations and exclusive deals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-primary-foreground text-primary px-8 py-3 rounded-full font-semibold hover:bg-primary-foreground/90 transition-colors duration-300">
                Get Expert Advice
              </Button>
              <Button variant="outline" className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 border-primary">
                View All Recommendations
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}