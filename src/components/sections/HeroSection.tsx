"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Users, Calendar, Search } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bg.jpg"
          alt="Hero background"
          fill
          className="object-cover w-full h-full"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Centered Content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-4 pt-24 pb-32">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
          Discover <span className="text-yellow-400">Amazing</span> <br className="hidden md:block" />
          Destinations
        </h1>
        <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          Experience the world's most beautiful destinations with our expert travel services. 
          From tropical paradises to cultural gems, we make your dream vacation a reality.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button className="bg-yellow-400 text-black px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:bg-yellow-300 transition">
            Explore Tours
          </Button>
          <Button variant="outline" className="border-white text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white hover:text-black transition">
            Book Now
          </Button>
        </div>
      </div>

      {/* Search Form */}
      <div className="absolute left-1/2 bottom-0 translate-x-[-50%] translate-y-1/2 z-20 w-full max-w-5xl px-4">
        <form className="bg-white rounded-2xl shadow-2xl p-6 flex flex-col md:flex-row gap-4 items-center">
          {/* Destination */}
          <div className="flex-1 w-full">
            <label className="text-xs font-semibold text-gray-600 mb-1 block flex items-center gap-1"><MapPin className="w-4 h-4" />Destination</label>
            <Input placeholder="Where to?" className="h-12" />
          </div>
          {/* Departure */}
          <div className="flex-1 w-full">
            <label className="text-xs font-semibold text-gray-600 mb-1 block flex items-center gap-1"><Calendar className="w-4 h-4" />Departure</label>
            <Input type="date" className="h-12" />
          </div>
          {/* Return */}
          <div className="flex-1 w-full">
            <label className="text-xs font-semibold text-gray-600 mb-1 block flex items-center gap-1"><Calendar className="w-4 h-4" />Return</label>
            <Input type="date" className="h-12" />
          </div>
          {/* Travelers */}
          <div className="flex-1 w-full">
            <label className="text-xs font-semibold text-gray-600 mb-1 block flex items-center gap-1"><Users className="w-4 h-4" />Travelers</label>
            <select className="h-12 w-full rounded-md border border-gray-200 px-3 py-2 text-sm">
              <option>1 Adult</option>
              <option>2 Adults</option>
              <option>Family</option>
            </select>
          </div>
          {/* Search Button */}
          <Button type="submit" className="h-12 px-8 bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-300 transition flex items-center gap-2">
            <Search className="w-4 h-4" />
            Search
          </Button>
        </form>
      </div>
    </section>
  )
}