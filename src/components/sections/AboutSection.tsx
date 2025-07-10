"use client"

import { useRef } from "react"
import { Award, Users, Camera } from "lucide-react"
import Image from "next/image"
import AnimatedCounter from "@/components/animated-counter"

export default function AboutSection() {
  const aboutRef = useRef<HTMLElement>(null)

  return (
    <section id="about" ref={aboutRef} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="about-content">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Why Choose Wanderlust?</h2>
            <p className="text-lg text-gray-600 mb-8">
              With over 15 years of experience in crafting extraordinary travel experiences, we specialize in creating
              personalized journeys that go beyond the ordinary. Our expert team ensures every detail is perfect.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-primary" />
              </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Curation</h3>
                  <p className="text-gray-600">
                    Every destination and experience is carefully selected by our travel experts.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Small Groups</h3>
                  <p className="text-gray-600">
                    Intimate group sizes ensure personalized attention and authentic experiences.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Camera className="h-6 w-6 text-primary" />
              </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Unforgettable Moments</h3>
                  <p className="text-gray-600">
                    We create opportunities for those once-in-a-lifetime experiences and memories.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="about-image relative">
            <Image
              src="/placeholder.svg?height=600&width=500"
              alt="Travel experience"
              width={500}
              height={600}
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-blue-600">
                <AnimatedCounter end={15} suffix="+" />
              </div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}