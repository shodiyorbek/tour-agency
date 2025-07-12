"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,

} from "@/components/ui/carousel";
import {  Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
const tourCards = [
  {
    title: "Mountain Tour",
    type:"Explore",
    subtitle: "$850.00/Person",
    description:
      "Provide a detailed itinerary of the tour, including the places you'll visit each day, any activities planned, approximate times.",
    duration: "7 Days",
    image: "/gallery/macho.jpg",
    bg: "/gallery/macho.jpg",
  },
  {
    title: "Yachts Tour",
    type:"Explore",
    subtitle: "$750.00/Person",
    description:
      "Enjoy a luxury yacht experience with beautiful views and premium service.",
    duration: "6 Days",
    image: "/gallery/over-water.jpg",
    bg: "/gallery/over-water.jpg",
  },
  {
    title: "Aurora Adventure",
    type:"Explore",
    subtitle: "$950.00/Person",
    description: "Chase the northern lights and explore arctic wonders.",
    duration: "5 Days",
    image: "/gallery/aurora.jpg",
    bg: "/gallery/aurora.jpg",
  },
];

export default function HeroSection() {
  const [activeIdx, setActiveIdx] = React.useState(0);
  const [api, setApi] = React.useState<any>(null);
  const activeCard = tourCards[activeIdx];
  const router = useRouter()
  // Embla carousel API sync
  const handleSelect = (api: any) => {
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
      className="relative h-[600px] flex items-center bg-black overflow-hidden rounded-[40px] mt-24 max-w-[1240px] mx-auto"
    >
      {/* Dynamic Background Image */}
      <motion.div
        key={activeCard.title}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={activeCard.bg}
          alt={activeCard.title}
          fill
          className="object-cover w-full h-full"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full h-full px-8 py-20 gap-4 ">
        {/* Left Side: Title, Subtitle, Description, Button */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 flex flex-col justify-center items-start max-w-[400px] ml-5 w-full mt-20 text-white sm:items-start items-center sm:text-left text-center"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={`${activeCard.type}-${activeIdx}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-8xl font-extrabold leading-tight  drop-shadow-lg"
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
              className="text-2xl font-semibold "
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
              className="text-lg mb-6 drop-shadow-lg "
            >
              {activeCard.description}
            </motion.p>
          </AnimatePresence>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button onClick={() => router.push("/destination")} size={"lg"} className="bg-white h-[60px] text-black px-8 py-4 rounded-full text-lg font-bold shadow-lg flex items-center gap-2">
              Explore Tours
              <span className="ml-2">→</span>
            </Button>
          </motion.div>
        </motion.div>

                  {/* Right Side: Carousel above cards */}
          <div className="flex-1  flex-col justify-center items-end  max-w-[800px] w-full absolute right-0 bottom-10 hidden sm:flex">
            {/* Carousel Controls and Progress bar above cards */}
            <div className="w-full  mb-8">
              {/* Progress bar with navigation arrows */}
              <div className="flex items-center w-[80%] gap-4 mb-4">
              <div className="flex-1 h-1 bg-white/30 rounded-full relative">
                <div
                  className="h-1 bg-primary rounded-full transition-all duration-300"
                  style={{
                    width: `${((activeIdx + 1) / tourCards.length) * 100}%`,
                  }}
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => api?.scrollPrev()}
                  className="bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30 rounded-full p-2 border flex-shrink-0">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"></path>
                  </svg>
                </button>

                <button
                  onClick={() => api?.scrollNext()}
                  className="bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30 rounded-full p-2 border flex-shrink-0 rotate-180 flex items-center justify-center">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.1584 3.13508C6.35695 3.32401 6.35695 3.64042 6.1584 3.82935L3.62812 6.49991L6.1584 9.17047C6.35695 9.3594 6.35695 9.67581 6.1584 9.86474C5.95985 10.0537 5.64344 10.0537 5.44489 9.86474L2.44489 6.86474C2.25464 6.67253 2.25464 6.37253 2.44489 6.18032L5.44489 3.18032C5.64344 2.99139 5.95985 2.99139 6.1584 3.13508Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"></path>
                  </svg>
                </button>
              </div>
            </div>
     
                         <Carousel
                         
               opts={{ 
                 align: "start", 
                 loop: true
               }}
               setApi={(api) => {
                 setApi(api);
                 if (api) {
                   api.on("select", () => handleSelect(api));
                   handleSelect(api);
                 }
               }}>
              <CarouselContent >
                                  {tourCards.map((card, idx) => (
                    <CarouselItem key={card.title} className="basis-1/2  ">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                   
                        className={`rounded-2xl bg-white/60 backdrop-blur-sm shadow-xl flex flex-row items-center gap-4  border-2 w-[400px] h-[200px] 
                         transition-all duration-300`}>
                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          className=" w-[180px] h-[160px] ml-4 aspect-square rounded-xl  overflow-hidden flex-shrink-0">
                          <Image
                            src={card.image}
                            alt={card.title}
                            width={160}
                            height={160}
                            className="object-cover w-full h-full"
                          />
                        </motion.div>
                        <div className="flex flex-col flex-1 h-full py-4">
                          <h3 className="text-2xl font-bold text-white">
                            {card.title}
                          </h3>
                          <span className="text-lg text-white ">
                            {card.subtitle}
                          </span>
                          <div className=" text-white flex items-center gap-2 my-2 text-xl">
                          <Clock className="w-4 h-4" />
                            {card.duration}
                          </div>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button className="mt-2  h-[50px] w-[150px]  text-sm font-bold  ">
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
