"use client"

import { Shield, Clock, Heart, Globe, Award, Users } from "lucide-react"

const features = [
  {
    id: 1,
    icon: Shield,
    title: "Safe & Secure",
    description: "Your safety is our top priority. We partner with verified providers and offer comprehensive travel insurance.",
    stats: "100% Safe"
  },
  {
    id: 2,
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer service for emergencies, changes, and assistance throughout your journey.",
    stats: "24/7 Available"
  },
  {
    id: 3,
    icon: Heart,
    title: "Personalized Experience",
    description: "Every trip is customized to your preferences, travel style, and specific requirements.",
    stats: "100% Customized"
  },
  {
    id: 4,
    icon: Globe,
    title: "Global Network",
    description: "Partnered with top travel providers worldwide for the best deals and authentic experiences.",
    stats: "150+ Countries"
  },
  {
    id: 5,
    icon: Award,
    title: "Award-Winning Service",
    description: "Recognized for excellence in travel services with multiple industry awards and certifications.",
    stats: "25+ Awards"
  },
  {
    id: 6,
    icon: Users,
    title: "Expert Team",
    description: "Experienced travel professionals with deep knowledge of destinations and local cultures.",
    stats: "50+ Experts"
  }
]

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why <span className="text-yellow-400">Choose Us</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're not just another travel agency. We're your trusted partner in creating 
            unforgettable travel experiences with unmatched service and expertise.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group text-center p-8 rounded-2xl hover:bg-gray-50 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-10 h-10 text-black" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-4 leading-relaxed">
                {feature.description}
              </p>

              {/* Stats */}
              <div className="text-yellow-400 font-bold text-lg">
                {feature.stats}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Experience the Difference
            </h3>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              With over 25 years of experience in the travel industry, we've helped thousands 
              of travelers create memories that last a lifetime. Our commitment to excellence 
              and attention to detail sets us apart from the competition.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-4"></div>
                <span className="text-gray-700">Comprehensive travel insurance included</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-4"></div>
                <span className="text-gray-700">Flexible travel planning and consultation</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-4"></div>
                <span className="text-gray-700">Local expert guides and authentic experiences</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-4"></div>
                <span className="text-gray-700">Best value recommendations and exclusive experiences</span>
              </div>
            </div>
          </div>

          {/* Right Content - Stats */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Our Numbers
            </h4>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">50K+</div>
                <div className="text-gray-600">Happy Travelers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">150+</div>
                <div className="text-gray-600">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">98%</div>
                <div className="text-gray-600">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">25+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}