"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

gsap.registerPlugin(ScrollTrigger)

interface GalleryImage {
  id: number
  src: string
  alt: string
  title: string
  location: string
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "/gallery/dubai-sunset.jpg",
    alt: "Dubai Skyline",
    title: "Dubai Skyline at Sunset",
    location: "Dubai, UAE",
  },
  {
    id: 2,
    src: "/gallery/canyon.avif",
    alt: "Grand Canyon",
    title: "Grand Canyon Vista",
    location: "Arizona, USA",
  },
  {
    id: 3,
    src: "/gallery/turkey.webp",
    alt: "Turkey",
    title: "Turkey",
    location: "Turkey, Anqara",
  },
  {
    id: 4,
    src: "/gallery/over-water.jpg",
    alt: "Maldives Resort",
    title: "Overwater Villas",
    location: "Maldives",
  },
  {
    id: 5,
    src: "/gallery/kyoto.jpg",
    alt: "Cherry Blossoms",
    title: "Kyoto Cherry Blossoms",
    location: "Japan",
  },
  {
    id: 6,
    src: "/gallery/serengeti.webp",
    alt: "African Safari",
    title: "Serengeti Wildlife",
    location: "Tanzania",
  },
  {
    id: 7,
    src: "/gallery/aurora.jpg",
    alt: "Northern Lights",
    title: "Aurora Borealis",
    location: "Iceland",
  },
  {
    id: 8,
    src: "/gallery/macho.jpg",
    alt: "Machu Picchu",
    title: "Ancient Citadel",
    location: "Peru",
  },
]

export default function ImageGallery() {
  const galleryRef = useRef<HTMLDivElement>(null)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const lightboxRef = useRef<HTMLDivElement>(null)
  const galleryItemsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh()
    }

    const handleScroll = () => {
      // Refresh ScrollTrigger when scroll position changes significantly
      ScrollTrigger.refresh()
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Refresh after a delay to ensure proper positioning
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 500)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(refreshTimer)
    }
  }, [])

  useEffect(() => {
    if (selectedImage && lightboxRef.current) {
      gsap.fromTo(
        lightboxRef.current,
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        },
      )
    }
  }, [selectedImage])

  // Animate gallery items on mount
  useEffect(() => {
    if (galleryItemsRef.current.length > 0) {
      gsap.fromTo(
        galleryItemsRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }
  }, [])

  const openLightbox = (image: GalleryImage, index: number) => {
    setSelectedImage(image)
    setCurrentIndex(index)
  }

  const closeLightbox = () => {
    if (lightboxRef.current) {
      gsap.to(lightboxRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => setSelectedImage(null),
      })
    }
  }

  const navigateImage = (direction: "prev" | "next") => {
    const newIndex =
      direction === "next"
        ? (currentIndex + 1) % galleryImages.length
        : (currentIndex - 1 + galleryImages.length) % galleryImages.length

    setCurrentIndex(newIndex)
    setSelectedImage(galleryImages[newIndex])
  }

  const addGalleryItemRef = (el: HTMLDivElement | null) => {
    if (el && !galleryItemsRef.current.includes(el)) {
      galleryItemsRef.current.push(el)
    }
  }

  return (
    <section className="gallery-section py-12 sm:py-16 lg:py-20 bg-muted/20 overflow-hidden" ref={galleryRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-24">
          <div className="flex items-center justify-between mb-8">
            <div className="text-left">
              <h2 className="gallery-title text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">Destination Gallery</h2>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl">
                Immerse yourself in the beauty of our carefully curated destinations
              </p>
            </div>
            <Button 
              className="bg-white text-black h-50 hover:text-white px-6 py-3 text-base font-semibold transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg"
              onClick={() => window.location.href = '/gallery'}
            >
              Explore More
            </Button>
          </div>
        </div>

        <div
          className="gallery-grid grid grid-cols-2 gap-4 h-[700px]"
          style={{ gridTemplateColumns: '1fr 1fr' }}
        >
          {/* First grid: 2 images stacked */}
          <div className="flex flex-col gap-4 h-full">
            <div 
              ref={addGalleryItemRef}
              className="flex-1 relative overflow-hidden rounded-xl cursor-pointer gallery-item group transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl" 
              onClick={() => openLightbox(galleryImages[0], 0)}
            >
              <Image 
                src={galleryImages[0].src} 
                alt={galleryImages[0].alt} 
                fill 
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                <h3 className="text-lg font-semibold">{galleryImages[0].title}</h3>
                <p className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{galleryImages[0].location}</p>
              </div>
            </div>
            <div 
              ref={addGalleryItemRef}
              className="flex-1 relative overflow-hidden rounded-xl cursor-pointer gallery-item group transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl" 
              onClick={() => openLightbox(galleryImages[1], 1)}
            >
              <Image 
                src={galleryImages[1].src} 
                alt={galleryImages[1].alt} 
                fill 
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                <h3 className="text-lg font-semibold">{galleryImages[1].title}</h3>
                <p className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{galleryImages[1].location}</p>
              </div>
            </div>
          </div>

          {/* Second grid: 1 image taking full height */}
          <div 
            ref={addGalleryItemRef}
            className="relative overflow-hidden rounded-xl cursor-pointer gallery-item h-full group transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl" 
            onClick={() => openLightbox(galleryImages[2], 2)}
          >
            <Image 
              src={galleryImages[2].src} 
              alt={galleryImages[2].alt} 
              fill 
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />
            <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out">
              <h3 className="text-lg font-semibold">{galleryImages[2].title}</h3>
              <p className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{galleryImages[2].location}</p>
            </div>
          </div>

          {/* Third grid: 1 image taking full height */}
          <div 
            ref={addGalleryItemRef}
            className="relative overflow-hidden rounded-xl cursor-pointer gallery-item h-full group transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl" 
            onClick={() => openLightbox(galleryImages[3], 3)}
          >
            <Image 
              src={galleryImages[3].src} 
              alt={galleryImages[3].alt} 
              fill 
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />
            <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out">
              <h3 className="text-lg font-semibold">{galleryImages[3].title}</h3>
              <p className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{galleryImages[3].location}</p>
            </div>
          </div>

          {/* Fourth grid: 2 images stacked */}
          <div className="flex flex-col gap-4 h-full">
            <div 
              ref={addGalleryItemRef}
              className="flex-1 relative overflow-hidden rounded-xl cursor-pointer gallery-item group transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl" 
              onClick={() => openLightbox(galleryImages[4], 4)}
            >
              <Image 
                src={galleryImages[4].src} 
                alt={galleryImages[4].alt} 
                fill 
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                <h3 className="text-lg font-semibold">{galleryImages[4].title}</h3>
                <p className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{galleryImages[4].location}</p>
              </div>
            </div>
            <div 
              ref={addGalleryItemRef}
              className="flex-1 relative overflow-hidden rounded-xl cursor-pointer gallery-item group transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl" 
              onClick={() => openLightbox(galleryImages[5], 5)}
            >
              <Image 
                src={galleryImages[5].src} 
                alt={galleryImages[5].alt} 
                fill 
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                <h3 className="text-lg font-semibold">{galleryImages[5].title}</h3>
                <p className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{galleryImages[5].location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm">
          <div ref={lightboxRef} className="relative w-full max-w-5xl">
            <div className="relative group">
              <Image
                src={selectedImage.src || "/placeholder.svg"}
                alt={selectedImage.alt}
                width={1200}
                height={800}
                className="w-full h-auto max-h-[70vh] sm:max-h-[80vh] object-contain rounded-lg transition-transform duration-300 ease-out group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6 text-white rounded-b-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2">{selectedImage.title}</h3>
                <p className="text-sm sm:text-base text-white/90">{selectedImage.location}</p>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:bg-white/20 w-8 h-8 sm:w-10 sm:h-10 transition-all duration-200 ease-out hover:scale-110"
            onClick={closeLightbox}
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 w-8 h-8 sm:w-10 sm:h-10 transition-all duration-200 ease-out hover:scale-110"
            onClick={() => navigateImage("prev")}
          >
            <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 w-8 h-8 sm:w-10 sm:h-10 transition-all duration-200 ease-out hover:scale-110"
            onClick={() => navigateImage("next")}
          >
            <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
          </Button>
        </div>
      )}
    </section>
  )
}
