"use client"

import * as React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { ArrowDown } from "lucide-react"

const tourCards = [
  {
    title: "Mountain Tour",
    subtitle: "$850.00/Person",
    description: "Provide a detailed itinerary of the tour, including the places you'll visit each day, any activities planned, approximate times.",
    duration: "7 Days",
    image: "/gallery/macho.jpg",
    bg: "/gallery/macho.jpg"
  },
  {
    title: "Yachts Tour",
    subtitle: "$750.00/Person",
    description: "Enjoy a luxury yacht experience with beautiful views and premium service.",
    duration: "6 Days",
    image: "/gallery/over-water.jpg",
    bg: "/gallery/over-water.jpg"
  },
  {
    title: "Aurora Adventure",
    subtitle: "$950.00/Person",
    description: "Chase the northern lights and explore arctic wonders.",
    duration: "5 Days",
    image: "/gallery/aurora.jpg",
    bg: "/gallery/aurora.jpg"
  }
]

export default function HeroSection() {
  const [activeIdx, setActiveIdx] = React.useState(0)
  const activeCard = tourCards[activeIdx]

  // Embla carousel API sync
  const handleSelect = (api: any) => {
    if (!api) return
    setActiveIdx(api.selectedScrollSnap())
  }

  return (
    <section className="relative min-h-screen flex items-center bg-black overflow-hidden rounded-r-[40px] max-w-[1440px] mx-auto">
      {/* Dynamic Background Image */}
      <div className="absolute inset-0 z-0 transition-all duration-700">
        <Image
          src={activeCard.bg}
          alt={activeCard.title}
          fill
          className="object-cover w-full h-full"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row w-full h-full px-8 py-20 gap-4">
        {/* Left Side: Title, Subtitle, Description, Button */}
        <div className="flex-1 flex flex-col justify-center items-start max-w-xl text-white gap-4">
          <h1 className="text-6xl font-extrabold leading-tight mb-2 drop-shadow-lg">
            Explore
          </h1>
          <h2 className="text-2xl font-semibold mb-2 drop-shadow-lg">
            beauty of the whole world
          </h2>
          <p className="text-lg mb-6 drop-shadow-lg">
            {activeCard.description}
          </p>
          <Button className="bg-white text-black px-8 py-4 rounded-full text-lg font-bold shadow-lg flex items-center gap-2">
            Explore Tours
            <span className="ml-2">→</span>
          </Button>
        </div>

        {/* Right Side: Carousel above cards */}
        <div className="flex-1 flex flex-col justify-center items-end relative min-h-[400px]">
          {/* Carousel Controls and Progress bar above cards */}
          <div className="w-full max-w-2xl mb-8">
            {/* Progress bar */}
            <div className="w-full h-1 bg-white/30 rounded-full mb-4 relative">
              <div className="h-1 bg-yellow-400 rounded-full transition-all duration-300" style={{ width: `${((activeIdx + 1) / tourCards.length) * 100}%` }} />
            </div>
            {/* Carousel Cards */}
            <Carousel opts={{ align: "start" }} setApi={api => { if (api) { api.on('select', () => handleSelect(api)); handleSelect(api); } }}>
              <CarouselContent>
                {tourCards.map((card, idx) => (
                  <CarouselItem key={card.title} className="basis-1/2 px-2">
                    <div className={`rounded-2xl bg-white/10 backdrop-blur-md shadow-xl flex flex-row items-center gap-4 p-4 border-2 ${activeIdx === idx ? 'border-yellow-400 bg-white/20' : 'border-white/20'} transition-all duration-300`}>
                      <div className="w-32 h-24 rounded-xl overflow-hidden flex-shrink-0">
                        <Image src={card.image} alt={card.title} width={128} height={96} className="object-cover w-full h-full" />
                      </div>
                      <div className="flex flex-col flex-1">
                        <h3 className="text-lg font-bold text-white">{card.title}</h3>
                        <span className="text-sm text-white/80">{card.subtitle}</span>
                        <span className="text-xs text-white/60 mt-1">{card.duration}</span>
                        <Button className="mt-2 bg-yellow-400 text-black rounded-full px-4 py-2 text-sm font-bold w-fit hover:bg-yellow-300">Book Now</Button>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {/* Carousel Buttons - moved inside Carousel component */}
              <CarouselPrevious className="bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30" />
              <CarouselNext className="bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30" />
            </Carousel>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
        <span className="text-white text-sm mb-1">Scroll Down</span>
        <ArrowDown className="w-8 h-8 text-white animate-bounce" />
      </div>
    </section>
  )
}