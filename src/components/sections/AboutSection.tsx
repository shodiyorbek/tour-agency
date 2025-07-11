"use client"

import { useRef } from "react"
import { Award, Users, Camera } from "lucide-react"
import Image from "next/image"
import AnimatedCounter from "@/components/animated-counter"

export default function AboutSection() {
  const aboutRef = useRef<HTMLElement>(null)

  return (
    <section id="about" ref={aboutRef} className="py-12 sm:py-16 lg:py-20 bg-muted/20 mt-16 sm:mt-20 lg:mt-[120px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          <div className="about-content order-2 lg:order-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">Why we?</h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8">
              With over 15 years of experience in crafting extraordinary travel experiences, we specialize in creating
              personalized journeys that go beyond the ordinary. Our expert team ensures every detail is perfect.
            </p>

            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Award className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1 sm:mb-2">Expert Curation</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Every destination and experience is carefully selected by our travel experts.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1 sm:mb-2">Small Groups</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Intimate group sizes ensure personalized attention and authentic experiences.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Camera className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1 sm:mb-2">Unforgettable Moments</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    We create opportunities for those once-in-a-lifetime experiences and memories.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="about-image relative order-1 lg:order-2">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <Image
                src="/placeholder.svg?height=600&width=500"
                alt="Travel experience"
                width={500}
                height={600}
                className="rounded-xl sm:rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-lg">
                <div className="text-2xl sm:text-3xl font-bold text-primary">
                  <AnimatedCounter end={15} suffix="+" />
                </div>
                <div className="text-sm sm:text-base text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}