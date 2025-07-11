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
    // Kill any existing ScrollTriggers to prevent conflicts
    ScrollTrigger.getAll().forEach(trigger => {
      const triggerElement = trigger.vars.trigger as Element
      if (triggerElement?.classList?.contains('gallery-item') || 
          triggerElement?.classList?.contains('gallery-grid') ||
          triggerElement?.classList?.contains('gallery-section')) {
        trigger.kill()
      }
    })

    const ctx = gsap.context(() => {
      // Parallax effect for gallery items with more specific targeting
      const galleryItems = gsap.utils.toArray(".gallery-item")
      galleryItems.forEach((item: any, index) => {
        const speed = 0.5 + (index % 3) * 0.2
        
        const parallaxTrigger = gsap.to(item, {
          yPercent: -50 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
            refreshPriority: -1, // Lower priority to avoid conflicts
          },
        })
        scrollTriggersRef.current.push(parallaxTrigger.scrollTrigger)
      })

      // Staggered fade-in animation with better refresh handling
      const fadeInTrigger = gsap.fromTo(
        ".gallery-item",
        {
          opacity: 0,
          y: 100,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".gallery-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
            refreshPriority: -1,
          },
        },
      )
      scrollTriggersRef.current.push(fadeInTrigger.scrollTrigger)

      // Gallery title animation
      const titleTrigger = gsap.fromTo(
        ".gallery-title",
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".gallery-section",
            start: "top 80%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
            refreshPriority: -1,
          },
        },
      )
      scrollTriggersRef.current.push(titleTrigger.scrollTrigger)

      // Refresh ScrollTrigger after a short delay to ensure proper positioning
      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 100)

    }, galleryRef)

    return () => {
      // Clean up all ScrollTriggers created in this context
      scrollTriggersRef.current.forEach(trigger => {
        if (trigger && !trigger.killed) {
          trigger.kill()
        }
      })
      scrollTriggersRef.current = []
      ctx.revert()
    }
  }, [])

  // Add a refresh effect when the component mounts or when other sections might affect it
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

        <div className="gallery-grid grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="gallery-item group relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl cursor-pointer aspect-[4/5]"
              onClick={() => openLightbox(image, index)}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-0.5 sm:mb-1">{image.title}</h3>
                <p className="text-xs sm:text-sm text-white/90">{image.location}</p>
              </div>
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3 lg:top-4 lg:right-4 w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn className="h-4 w-4 sm:h-4.5 sm:w-4.5 lg:h-5 lg:w-5 text-white" />
              </div>
            </div>
          ))}
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
