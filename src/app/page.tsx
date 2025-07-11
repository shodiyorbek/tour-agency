"use client"

import { useState, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import Navigation from "@/components/sections/Navigation"
import HeroSection from "@/components/sections/HeroSection"
import StatsSection from "@/components/sections/StatsSection"
import HotDealsSection from "@/components/sections/HotDealsSection"
import ToursSection from "@/components/sections/ToursSection"
import AboutSection from "@/components/sections/AboutSection"
import ServicesSection from "@/components/sections/ServicesSection"
import DestinationSection from "@/components/sections/DestinationSection"
import BestRecommendedSection from "@/components/sections/BestRecommendedSection"
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection"
import TestimonialsSection from "@/components/sections/TestimonialsSection"
import NewsletterSection from "@/components/sections/NewsletterSection"
import PartnersSection from "@/components/sections/PartnersSection"
import ContactSection from "@/components/sections/ContactSection"
import Footer from "@/components/sections/Footer"
import ImageGallery from "@/components/image-gallery"
import FloatingElements from "@/components/floating-elements"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export default function TravelAgency() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    // Global ScrollTrigger refresh to handle conflicts between sections
    const handleGlobalRefresh = () => {
      ScrollTrigger.refresh()
    }

    // Ensure scrolling is not blocked by GSAP
    const enableScrolling = () => {
      document.body.style.overflow = 'auto'
      document.documentElement.style.overflow = 'auto'
    }

    // Listen for potential DOM changes that might affect animations
    const observer = new MutationObserver(() => {
      // Debounce the refresh to avoid excessive calls
      clearTimeout((window as any).refreshTimeout)
      ;(window as any).refreshTimeout = setTimeout(handleGlobalRefresh, 100)
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    })

    // Enable scrolling immediately
    enableScrolling()

    const ctx = gsap.context(() => {
      // Enhanced hover animations for tour cards
      gsap.utils.toArray(".tour-card").forEach((card: any) => {
        const image = card.querySelector(".tour-image")
        const content = card.querySelector(".tour-content")

        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -10,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
          })
          gsap.to(image, {
            scale: 1.1,
            duration: 0.5,
            ease: "power2.out",
          })
          gsap.to(content, {
            y: -5,
            duration: 0.3,
            ease: "power2.out",
          })
        })

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          })
          gsap.to(image, {
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
          })
          gsap.to(content, {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          })
        })
      })

      // Button hover animations
      gsap.utils.toArray(".animated-button").forEach((button: any) => {
        button.addEventListener("mouseenter", () => {
          gsap.to(button, {
            scale: 1.05,
            duration: 0.2,
            ease: "power2.out",
          })
        })

        button.addEventListener("mouseleave", () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out",
          })
        })
      })

      // Floating elements animations
      gsap.utils.toArray(".floating-element").forEach((element: any, index) => {
        gsap.to(element, {
          y: -20,
          rotation: index % 2 === 0 ? 5 : -5,
          duration: 3 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: index * 0.3,
        })
      })

      // Static airplane entrance animations
      gsap.fromTo(
        ".airplane-static",
        {
          opacity: 0,
          scale: 0,
          rotation: 0,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 25,
          duration: 0.8,
          delay: 2,
          ease: "back.out(1.7)",
        },
      )

      gsap.fromTo(
        ".airplane-static-2",
        {
          opacity: 0,
          scale: 0,
          rotation: 0,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: -45,
          duration: 0.8,
          delay: 2.5,
          ease: "back.out(1.7)",
        },
      )

      // Add subtle floating animation to static planes
      gsap.to(".airplane-static", {
        y: -3,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 3,
      })

      gsap.to(".airplane-static-2", {
        y: 3,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 3.5,
      })
    })

    return () => {
      observer.disconnect()
      clearTimeout((window as any).refreshTimeout)
      ctx.revert()
      // Ensure scrolling is restored
      enableScrolling()
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    console.log('scrollToSection called with:', sectionId)
    
    // Ensure scrolling is enabled
    document.body.style.overflow = 'auto'
    document.documentElement.style.overflow = 'auto'
    
    const element = document.getElementById(sectionId)
    console.log('Element found:', element)
    
    if (element) {
      // Force ScrollTrigger refresh to prevent conflicts
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh()
      }
      
      const yOffset = -80 // Account for fixed header height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      console.log('Scrolling to position:', y)
      
      // Try multiple scroll methods for better compatibility
      try {
        // Method 1: Native smooth scrolling
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        })
        
        // Method 2: Fallback with GSAP if native doesn't work
        setTimeout(() => {
          const currentScroll = window.pageYOffset
          const targetScroll = y
          if (Math.abs(currentScroll - targetScroll) > 10) {
            console.log('Using GSAP fallback scroll')
            gsap.to(window, {
              scrollTo: { y: y, autoKill: false },
              duration: 1,
              ease: "power2.out"
            })
          }
        }, 100)
        
      } catch (error) {
        console.error('Scroll error:', error)
        // Method 3: Direct scroll as last resort
        window.scrollTo(0, y)
      }
    } else {
      console.error('Element not found for sectionId:', sectionId)

    }
  }

  return (
    <div className="min-h-screen bg-white relative">
      <Navigation scrollToSection={scrollToSection} />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <HotDealsSection />
      <ToursSection />
      <DestinationSection />
      <BestRecommendedSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <div id="gallery">
        <ImageGallery />
      </div>
      <NewsletterSection />
      <PartnersSection />
      <StatsSection />
      <ContactSection />
      <Footer scrollToSection={scrollToSection} />
      <FloatingElements />
    </div>
  )
}
