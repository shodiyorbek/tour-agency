"use client";

import React from "react"
import Image from "next/image"
import { MapPin, Star, Users, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image";
import { Star, Calendar } from "lucide-react";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { AnimatePresence, motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";

const destinations = [
  {
    id: 1,
    name: "Bali, Indonesia",
    image: "/destination/bali.webp",
    rating: 4.9,
    reviews: 1247,
    price: "$899",
    duration: "7 Days",
    travelers: "2.5K+",
    description:
      "Tropical paradise with stunning beaches, ancient temples, and vibrant culture.",
  },
  {
    id: 2,
    name: "Santorini, Greece",
    image: "/destination/gruzia.webp",
    rating: 4.8,
    reviews: 892,
    price: "$1,299",
    duration: "6 Days",
    travelers: "1.8K+",
    description:
      "Iconic white buildings, stunning sunsets, and Mediterranean charm.",
  },
  {
    id: 3,
    name: "Machu Picchu, Peru",
    image: "/destination/maldivs.webp",
    rating: 4.9,
    reviews: 1563,
    price: "$1,199",
    duration: "8 Days",
    travelers: "3.2K+",
    description: "Ancient Incan citadel high in the Andes mountains.",
  },
  {
    id: 4,
    name: "Kyoto, Japan",
    image: "/destination/vietnam.webp",
    rating: 4.7,
    reviews: 734,
    price: "$1,499",
    duration: "9 Days",
    travelers: "1.5K+",
    description:
      "Traditional temples, cherry blossoms, and authentic Japanese culture.",
  },
  {
    id: 5,
    name: "Serengeti, Tanzania",
    image: "/destination/singapore.webp",
    rating: 4.9,
    reviews: 987,
    price: "$2,199",
    duration: "10 Days",
    travelers: "1.2K+",
    description:
      "Wildlife safari experience in Africa's most famous national park.",
  },
  {
    id: 6,
    name: "Dubai, UAE",
    image: "/destination/dubai.webp",
    rating: 4.6,
    reviews: 1123,
    price: "$999",
    duration: "5 Days",
    travelers: "2.1K+",
    description:
      "Modern city with luxury shopping, desert adventures, and iconic architecture.",
  },
];

export default function DestinationSection() {
  const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null);
  const [isCarouselHovered, setIsCarouselHovered] = React.useState(false);
  const [cursor, setCursor] = React.useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const carouselRef = React.useRef<HTMLDivElement>(null);

  // Embla carousel API sync
  const handleSelect = (api: unknown) => {
    if (!api || typeof api !== "object" || !("selectedScrollSnap" in api))
      return;
    const emblaApi = api as unknown as { selectedScrollSnap: () => number };
    if (typeof emblaApi.selectedScrollSnap !== "function") return;
    // setActiveIdx(emblaApi.selectedScrollSnap()); // This line was removed as per the edit hint.
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, threshold: 0.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, threshold: 0.1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            Popular <span className="text-yellow-400">Destinations</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, threshold: 0.1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            Discover the world's most sought-after destinations. From tropical paradises to cultural gems, 
            we've curated the perfect experiences for every traveler.
          </motion.p>
        </motion.div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, threshold: 0.1 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
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
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, threshold: 0.1 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
        >
          <button className="bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Popular <span className="text-primary">Destinations</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Discover the world&apos;s most sought-after destinations. From
            tropical paradises to cultural gems, we&apos;ve curated the perfect
            experiences for every traveler.
          </p>
        </div>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="relative max-w-[1240px] mx-auto"
          style={isCarouselHovered ? { cursor: "none" } : {}}
          onMouseEnter={() => setIsCarouselHovered(true)}
          onMouseLeave={() => {
            setIsCarouselHovered(false);
            setHoveredIdx(null);
          }}
          onMouseMove={(e) => {
            if (!carouselRef.current) return;
            const rect = carouselRef.current.getBoundingClientRect();
            setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
          }}>
          {/* Drag circle as custom cursor for the whole carousel */}
          {isCarouselHovered && (
            <div
              className="pointer-events-none absolute z-30 hidden md:block"
              style={{ left: cursor.x - 56, top: cursor.y - 56 }}>
              <div className="w-28 h-28 bg-white/80 rounded-full flex items-center justify-center shadow-lg border-2 border-white text-lg font-bold text-gray-700">
                <span className="mx-2">DRAG</span>
              </div>
            </div>
          )}
          <Carousel
            opts={{ align: "center", loop: true }}
            plugins={[
              Autoplay({
                delay: 3500,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            setApi={(api) => {
              if (api) {
                api.on("select", () => handleSelect(api));
                handleSelect(api);
              }
            }}
            className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {destinations.map((destination, idx) => {
                return (
                  <CarouselItem
                    key={destination.id}
                    className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 flex justify-center items-center">
                    <div
                      className={`relative rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px] xl:max-w-[460px] aspect-[4/3] sm:aspect-[3/2] md:aspect-square flex items-end justify-center bg-white ${
                        idx % 2 === 0 ? "h-[200px] sm:h-[240px] md:h-[280px] lg:h-[300px]" : "mr-2 sm:mr-4 md:mr-6 lg:mr-10"
                      }`}
                      style={
                        isCarouselHovered
                          ? { cursor: "none" }
                          : { cursor: "grab" }
                      }
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onMouseLeave={() => setHoveredIdx(null)}>
                      <Image
                        src={destination.image.replace("/public", "")}
                        alt={destination.name}
                        fill
                        className="object-cover transition-transform duration-500"
                      />
                      {/* Overlay for hovered card with animation */}
                      <AnimatePresence>
                        {hoveredIdx === idx && isCarouselHovered && (
                          <motion.div
                            className="absolute m-2 sm:m-3 md:m-4 lg:m-5 rounded-2xl sm:rounded-3xl inset-0 bg-black/30 backdrop-blur-md flex flex-col justify-end p-3 sm:p-4 md:p-5 lg:p-6 z-20"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 30 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}>
                            <div className="relative z-20">
                              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">
                                {destination.name}
                              </h3>
                              <div className="flex items-center mb-1 sm:mb-2">
                                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-primary fill-current mr-1" />
                                <span className="text-sm sm:text-base md:text-lg font-semibold text-white">
                                  {destination.rating}
                                </span>
                                <span className="text-xs sm:text-sm text-gray-200 ml-1 sm:ml-2">
                                  ({destination.reviews})
                                </span>
                              </div>
                              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">
                                {destination.price}
                                <span className="text-xs sm:text-sm md:text-base font-normal ml-1">
                                  /Person
                                </span>
                              </div>
                              <div className="flex items-center text-white mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm">
                                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                {destination.duration}
                              </div>
                              <button className="w-full bg-white/90 text-black py-2 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold hover:bg-primary/20 transition-colors duration-300">
                                Book Now
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>

        {/* View All Button */}
        <div className="text-center mt-8 sm:mt-10 md:mt-12">
          <button className="bg-gray-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold hover:bg-gray-800 transition-colors duration-300">
            View All Destinations
          </button>
        </motion.div>
      </div>
    </section>
  );
}
