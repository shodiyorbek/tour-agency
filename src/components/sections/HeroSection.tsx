"use client";

import * as React from "react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

// Define proper types for the carousel API
interface CarouselApi {
  selectedScrollSnap: () => number;
  scrollNext: () => void;
  scrollPrev: () => void;
  on: (evt: string, cb: () => void) => void;
}

const tourCards = [
  {
    title: "Amazing baku",
    type: "Explore",
    subtitle: "$850.00/Person",
    description:
      "Provide a detailed itinerary of the tour, including the places you'll visit each day, any activities planned, approximate times.",
    duration: "7 Days",
    image: "/destination/baku.webp",
    bg: "/destination/baku.webp",
  },
  {
    title: "China Great Wall",
    type: "Explore",
    subtitle: "$750.00/Person",
    description:
      "Enjoy a luxury yacht experience with beautiful views and premium service.",
    duration: "6 Days",
    image: "/destination/china.webp",
    bg: "/destination/china.webp",
  },
  {
    title: "Saudi Arabia",
    type: "Explore",
    subtitle: "$950.00/Person",
    description: "Chase the northern lights and explore arctic wonders.",
    duration: "5 Days",
    image: "/destination/cappadocia.webp",
    bg: "/destination/cappadocia.webp",
  },
];

export default function HeroSection() {
  const [activeIdx, setActiveIdx] = React.useState(0);
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const activeCard = tourCards[activeIdx];
  const router = useRouter();

  // Embla carousel API sync
  const handleSelect = (api: CarouselApi) => {
    if (!api) return;
    setActiveIdx(api.selectedScrollSnap());
  };

  // Autoplay functionality
  React.useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-[500px] md:h-[600px] lg:h-[700px] flex items-center bg-black overflow-hidden rounded-[20px] md:rounded-[30px] lg:rounded-[40px]  md:mt-16 lg:mt-24 max-w-[1240px] md:mx-auto mx-4 mt-20  lg:mx-auto "
    >
      {/* Dynamic Background Image */}
      <motion.div
        key={activeCard.title}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${activeCard.bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full h-full px-4 sm:px-6 md:px-8 py-8 md:py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between h-full gap-6 md:gap-8">
          {/* Left Side: Title, Subtitle, Description, Button */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left max-w-full lg:max-w-[500px] w-full text-white"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={`${activeCard.type}-${activeIdx}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tight drop-shadow-lg"
              >
                {activeCard.type}
              </motion.p>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.p
                key={`${activeCard.title}-${activeIdx}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg sm:text-xl md:text-2xl font-semibold mt-2 md:mt-4"
              >
                {activeCard.title}
              </motion.p>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.p
                key={`${activeCard.description}-${activeIdx}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-sm sm:text-base md:text-lg mb-4 md:mb-6 drop-shadow-lg max-w-full"
              >
                {activeCard.description}
              </motion.p>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button
                onClick={() => router.push("/destination")}
                className="bg-white hover:text-white h-[50px] md:h-[60px] text-black px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-lg font-bold shadow-lg flex items-center gap-2"
              >
                Explore Tours
                <span className="ml-2">→</span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Side: Carousel - Hidden on mobile, shown on larger screens */}
          <div className="flex-1   flex-col justify-center items-end  max-w-[800px] w-full absolute right-0 bottom-10 gap-1 hidden md:flex">
            {/* Carousel Controls and Progress bar above cards */}
            <div className="w-full mb-4 md:mb-8">
              {/* Progress bar with navigation arrows */}
              <div className="flex items-center w-full lg:w-[80%] gap-2 md:gap-4 mb-4">
                <div className="flex-1 h-1 bg-white/30 rounded-full relative">
                  <div
                    className="h-1 bg-primary rounded-full transition-all duration-300"
                    style={{
                      width: `${((activeIdx + 1) / tourCards.length) * 100}%`,
                    }}
                  />
                </div>

                <div className="flex items-center gap-1 md:gap-2">
                  <button
                    onClick={() => api?.scrollPrev()}
                    className="bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30 rounded-full p-1.5 md:p-2 border flex-shrink-0"
                  >
                    <svg
                      width="12"
                      height="12"
                      className="md:w-[15px] md:h-[15px]"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>

                  <button
                    onClick={() => api?.scrollNext()}
                    className="bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30 rounded-full p-1.5 md:p-2 border flex-shrink-0 rotate-180 flex items-center justify-center"
                  >
                    <svg
                      width="12"
                      height="12"
                      className="md:w-[15px] md:h-[15px]"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.1584 3.13508C6.35695 3.32401 6.35695 3.64042 6.1584 3.82935L3.62812 6.49991L6.1584 9.17047C6.35695 9.3594 6.35695 9.67581 6.1584 9.86474C5.95985 10.0537 5.64344 10.0537 5.44489 9.86474L2.44489 6.86474C2.25464 6.67253 2.25464 6.37253 2.44489 6.18032L5.44489 3.18032C5.64344 2.99139 5.95985 2.99139 6.1584 3.13508Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <Carousel
              className=" w-full"
              opts={{
                align: "start",
                loop: true,
              }}
              setApi={(api) => {
                if (api) {
                  setApi(api as CarouselApi);
                  api.on("select", () => handleSelect(api as CarouselApi));
                  handleSelect(api as CarouselApi);
                }
              }}
            >
              <CarouselContent>
                {tourCards.map((card, idx) => (
                  <CarouselItem key={card.title} className="basis-1/2">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className={`rounded-xl md:rounded-2xl bg-white/60 backdrop-blur-sm shadow-xl flex flex-col sm:flex-row items-center gap-3 md:gap-4 border-2  w-[5
                        400px] h-auto min-h-[180px] md:h-[200px] p-3 md:p-4 transition-all duration-300`}
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="w-full sm:w-[140px] md:w-[180px] h-[120px] sm:h-[140px] md:h-[160px] aspect-square rounded-lg md:rounded-xl overflow-hidden flex-shrink-0"
                      >
                        <OptimizedImage
                          src={card.image}
                          alt={card.title}
                          width={160}
                          height={160}
                          className="object-cover w-full h-full"
                        />
                      </motion.div>
                      <div className="flex flex-col flex-1 h-full py-2 md:py-4 text-center sm:text-left">
                        <h3 className="text-lg md:text-xl lg:text-xl font-bold text-white">
                          {card.title}
                        </h3>
                        <span className="text-sm md:text-base lg:text-lg text-white">
                          {card.subtitle}
                        </span>
                        <div className="text-white flex items-center justify-center sm:justify-start gap-2 my-1 md:my-2 text-sm md:text-base lg:text-xl">
                          <Clock className="w-3 h-3 md:w-4 md:h-4" />
                          {card.duration}
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex justify-center sm:justify-start"
                        >
                          <Button onClick={()=>router.push("/destination")} className="mt-2 h-[40px] bg-white hover:text-white text-black md:h-[50px] w-full sm:w-[120px] md:w-[150px] text-xs md:text-sm font-bold">
                            Book Now
                          </Button>
                        </motion.div>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
