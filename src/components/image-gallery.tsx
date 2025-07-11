"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
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
  const scrollTriggersRef = useRef<any[]>([])
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

  return (
    <section className="gallery-section py-12 sm:py-16 lg:py-20 bg-muted/20 overflow-hidden" ref={galleryRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-24">
          <h2 className="gallery-title text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">Destination Gallery</h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            Immerse yourself in the beauty of our carefully curated destinations
          </p>
        </div>

        <div
          className="gallery-grid grid grid-cols-2 gap-4 h-[700px]"
          style={{ gridTemplateColumns: '1fr 1fr' }}
        >
          {/* First grid: 2 images stacked */}
          <div className="flex flex-col gap-4 h-full">
            <div className="flex-1 relative overflow-hidden rounded-xl cursor-pointer gallery-item" onClick={() => openLightbox(galleryImages[0], 0)}>
              <Image src={galleryImages[0].src} alt={galleryImages[0].alt} fill className="object-cover" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white bg-gradient-to-t from-black/70 via-transparent to-transparent">
                <h3 className="text-lg font-semibold">{galleryImages[0].title}</h3>
                <p className="text-xs">{galleryImages[0].location}</p>
              </div>
            </div>
            <div className="flex-1 relative overflow-hidden rounded-xl cursor-pointer gallery-item" onClick={() => openLightbox(galleryImages[1], 1)}>
              <Image src={galleryImages[1].src} alt={galleryImages[1].alt} fill className="object-cover" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white bg-gradient-to-t from-black/70 via-transparent to-transparent">
                <h3 className="text-lg font-semibold">{galleryImages[1].title}</h3>
                <p className="text-xs">{galleryImages[1].location}</p>
              </div>
            </div>
          </div>

          {/* Second grid: 1 image taking full height */}
          <div className="relative overflow-hidden rounded-xl cursor-pointer gallery-item h-full" onClick={() => openLightbox(galleryImages[2], 2)}>
            <Image src={galleryImages[2].src} alt={galleryImages[2].alt} fill className="object-cover" />
            <div className="absolute bottom-0 left-0 right-0 p-3 text-white bg-gradient-to-t from-black/70 via-transparent to-transparent">
              <h3 className="text-lg font-semibold">{galleryImages[2].title}</h3>
              <p className="text-xs">{galleryImages[2].location}</p>
            </div>
          </div>

          {/* Third grid: 1 image taking full height */}
          <div className="relative overflow-hidden rounded-xl cursor-pointer gallery-item h-full" onClick={() => openLightbox(galleryImages[3], 3)}>
            <Image src={galleryImages[3].src} alt={galleryImages[3].alt} fill className="object-cover" />
            <div className="absolute bottom-0 left-0 right-0 p-3 text-white bg-gradient-to-t from-black/70 via-transparent to-transparent">
              <h3 className="text-lg font-semibold">{galleryImages[3].title}</h3>
              <p className="text-xs">{galleryImages[3].location}</p>
            </div>
          </div>

          {/* Fourth grid: 2 images stacked */}
          <div className="flex flex-col gap-4 h-full">
            <div className="flex-1 relative overflow-hidden rounded-xl cursor-pointer gallery-item" onClick={() => openLightbox(galleryImages[4], 4)}>
              <Image src={galleryImages[4].src} alt={galleryImages[4].alt} fill className="object-cover" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white bg-gradient-to-t from-black/70 via-transparent to-transparent">
                <h3 className="text-lg font-semibold">{galleryImages[4].title}</h3>
                <p className="text-xs">{galleryImages[4].location}</p>
              </div>
            </div>
            <div className="flex-1 relative overflow-hidden rounded-xl cursor-pointer gallery-item" onClick={() => openLightbox(galleryImages[5], 5)}>
              <Image src={galleryImages[5].src} alt={galleryImages[5].alt} fill className="object-cover" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white bg-gradient-to-t from-black/70 via-transparent to-transparent">
                <h3 className="text-lg font-semibold">{galleryImages[5].title}</h3>
                <p className="text-xs">{galleryImages[5].location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div ref={lightboxRef} className="relative w-full max-w-5xl">
            <div className="relative">
              <Image
                src={selectedImage.src || "/placeholder.svg"}
                alt={selectedImage.alt}
                width={1200}
                height={800}
                className="w-full h-auto max-h-[70vh] sm:max-h-[80vh] object-contain rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6 text-white rounded-b-lg">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2">{selectedImage.title}</h3>
                <p className="text-sm sm:text-base text-white/90">{selectedImage.location}</p>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:bg-white/20 w-8 h-8 sm:w-10 sm:h-10"
            onClick={closeLightbox}
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 w-8 h-8 sm:w-10 sm:h-10"
            onClick={() => navigateImage("prev")}
          >
            <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 w-8 h-8 sm:w-10 sm:h-10"
            onClick={() => navigateImage("next")}
          >
            <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
          </Button>
        </div>
      )}
    </section>
  )
}
