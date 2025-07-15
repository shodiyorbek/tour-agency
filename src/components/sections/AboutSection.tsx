"use client"

import { useRef } from "react"
import { Award, Users, Camera, Globe, MapPin, Headphones } from "lucide-react"
import Image from "next/image"

export default function AboutSection() {
  const aboutRef = useRef<HTMLElement>(null)

  return (
    <section id="about" ref={aboutRef} className="py-12 sm:py-16 lg:py-20 bg-muted/20 mt-16 sm:mt-20 lg:mt-[120px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          <div className="about-content order-2 lg:order-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
              About <span className="text-primary">BIG TRIP</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8">
              Our company has been operating since its founding in 2021. During this time, we have helped hundreds of clients discover new countries, cultures, and unforgettable experiences. We are constantly growing and always stay up-to-date with the latest trends in tourism.
            </p>

            <div className="space-y-4 sm:space-y-6 mb-8">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Award className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1 sm:mb-2">Personalized Approach</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    We select tours based on your interests, budget, and preferences.
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
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1 sm:mb-2">Trusted Partners</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Only reliable hotels, guides, and transfers.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Headphones className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1 sm:mb-2">24/7 Support</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    We are here for you throughout your entire trip.
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
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1 sm:mb-2">Unique Tours</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    We offer exclusive tours not available to the general public.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1 sm:mb-2">Transparency</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    No hidden fees or unclear extra charges.
                  </p>
                </div>
              </div>
            </div>

       

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Office & Online</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-2">
                We operate online, making us flexible and accessible for clients from different cities and countries. In-person meetings at our office are possible by appointment.
              </p>
              <ul className="text-muted-foreground text-sm sm:text-base space-y-1">
                <li>
                  <b>CHILONZOR (BIG TRIP):</b> Chilanzar district, 5th quarter, building 50B
                </li>
                <li>
                  <b>BIG TRIP (Tower Branch):</b> Tashkent, Yunusabad district, Iftikhor street, 119 (near the Tashkent TV tower, before the tennis court)
                </li>
                <li>
                  <b>BIG TRIP (Sergeli Branch):</b> Tashkent, Sergeli district, behind the car market (next to Magnum supermarket)
                </li>
              </ul>
            </div>
          </div>

          <div className="about-image relative order-1 lg:order-2">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <Image
                src="/destination/baku.webp"
                alt="Travel experience"
                width={500}
                height={600}
                className="rounded-xl sm:rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-lg">
                <div className="text-2xl sm:text-3xl font-bold text-primary">
                  2021
                </div>
                <div className="text-sm sm:text-base text-muted-foreground">Year Founded</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}