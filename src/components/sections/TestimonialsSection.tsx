"use client"

import { Star, Quote } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Travel Enthusiast",
    image: "/placeholder-user.jpg",
    rating: 5,
    text: "Amazing experience! The tour was perfectly organized and our guide was incredibly knowledgeable. Will definitely book again!",
    location: "Paris, France"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Business Traveler",
    image: "/placeholder-user.jpg",
    rating: 5,
    text: "Professional service from start to finish. The accommodations were excellent and the itinerary was well-planned.",
    location: "Tokyo, Japan"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Adventure Seeker",
    image: "/placeholder-user.jpg",
    rating: 5,
    text: "Incredible adventure! The team went above and beyond to make our trip memorable. Highly recommended!",
    location: "Machu Picchu, Peru"
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Photography Enthusiast",
    image: "/placeholder-user.jpg",
    rating: 5,
    text: "Perfect for photography tours! The locations were breathtaking and the timing was ideal for capturing amazing shots.",
    location: "Santorini, Greece"
  },
  {
    id: 5,
    name: "Lisa Wang",
    role: "Family Traveler",
    image: "/placeholder-user.jpg",
    rating: 5,
    text: "Great family-friendly experience! Our kids loved every moment and the activities were perfect for all ages.",
    location: "Bali, Indonesia"
  },
  {
    id: 6,
    name: "Robert Davis",
    role: "Solo Traveler",
    image: "/placeholder-user.jpg",
    rating: 5,
    text: "As a solo traveler, I felt safe and well-cared for throughout the entire journey. Excellent group dynamics!",
    location: "Iceland"
  }
]

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our <span className="text-yellow-400">Travelers</span> Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover why thousands of travelers choose us for their dream vacations. 
            Read authentic reviews from our satisfied customers.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-3 left-6 bg-yellow-400 rounded-full p-2">
                <Quote className="w-4 h-4 text-black" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4 mt-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-xs text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">98%</div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">50K+</div>
            <div className="text-gray-600">Happy Travelers</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">4.9</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">25+</div>
            <div className="text-gray-600">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  )
}