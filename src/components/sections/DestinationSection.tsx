"use client";

import { OptimizedImage } from "@/components/ui/optimized-image";
import { Star, Calendar } from "lucide-react";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { AnimatePresence, motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

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
  const router = useRouter()
  const handleSelect = (api: unknown) => {
    if (!api || typeof api !== "object" || !("selectedScrollSnap" in api))
      return;
    const emblaApi = api as unknown as { selectedScrollSnap: () => number };
    if (typeof emblaApi.selectedScrollSnap !== "function") return;
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
                      <OptimizedImage
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
                              <Button onClick={()=>router.push("/destination")} className="w-full hover:text-white bg-white/90 text-black py-2 sm:py-3 text-sm sm:text-base font-semibold hover:bg-primary/20 transition-colors duration-300">
                                Book Now
                              </Button>
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
          <Button onClick={()=>router.push("/destination")} className="bg-white text-black hover:text-white">
            View All Destinations
          </Button>
        </div>
      </div>
    </section>
  );
}
