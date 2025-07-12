"use client";

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
    image: "/images/bali.webp",
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
    image: "/public/gallery/kyoto.jpg",
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
    image: "/public/gallery/macho.jpg",
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
    image: "/public/gallery/kyoto.jpg",
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
    image: "/public/gallery/serengeti.webp",
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
    image: "/public/gallery/dubai-sunset.jpg",
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
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Popular <span className="text-primary">Destinations</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
              className="pointer-events-none absolute z-30"
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
            <CarouselContent>
              {destinations.map((destination, idx) => {
                return (
                  <CarouselItem
                    key={destination.id}
                    className="basis-1/4 flex justify-center items-center">
                    <div
                      className={`relative rounded-3xl overflow-hidden  transition-all aspect-square duration-500 w-[460px] h-[340px] flex items-end justify-center bg-white ${
                        idx % 2 === 0 ? "h-[300px]" : "mr-10"
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
                        width={360}
                        height={440}
                        className="object-cover transition-transform duration-500"
                      />
                      {/* Overlay for hovered card with animation */}
                      <AnimatePresence>
                        {hoveredIdx === idx && isCarouselHovered && (
                          <motion.div
                            className="absolute m-5 rounded-3xl inset-0 bg-black/30 backdrop-blur-md flex flex-col justify-end p-6 z-20"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 30 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}>
                            <div className="relative z-20">
                              <h3 className="text-2xl font-bold text-white mb-2">
                                {destination.name}
                              </h3>
                              <div className="flex items-center mb-2">
                                <Star className="w-5 h-5 text-primary fill-current mr-1" />
                                <span className="text-lg font-semibold text-white">
                                  {destination.rating}
                                </span>
                                <span className="text-sm text-gray-200 ml-2">
                                  ({destination.reviews})
                                </span>
                              </div>
                              <div className="text-3xl font-bold text-white mb-2">
                                {destination.price}
                                <span className="text-base font-normal ml-1">
                                  /Person
                                </span>
                              </div>
                              <div className="flex items-center text-white mb-4">
                                <Calendar className="w-4 h-4 mr-1" />
                                {destination.duration}
                              </div>
                              <button className="w-full bg-white/90 text-black py-3 rounded-xl font-semibold hover:bg-primary/20 transition-colors duration-300">
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
        <div className="text-center mt-12">
          <button className="bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300">
            View All Destinations
          </button>
        </div>
      </div>
    </section>
  );
}
