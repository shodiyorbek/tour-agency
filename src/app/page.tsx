"use client"

import { useState, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Navigation from "@/components/sections/Navigation"
import HeroSection from "@/components/sections/HeroSection"
import StatsSection from "@/components/sections/StatsSection"
import ToursSection from "@/components/sections/ToursSection"
import AboutSection from "@/components/sections/AboutSection"
import ContactSection from "@/components/sections/ContactSection"
import Footer from "@/components/sections/Footer"
import ImageGallery from "@/components/image-gallery"
import FloatingElements from "@/components/floating-elements"

gsap.registerPlugin(ScrollTrigger)

export default function TravelAgency() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)

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

    return () => ctx.revert()
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: element, offsetY: 80 },
        ease: "power2.inOut",
      })
    }
  }

  return (
    <div className="min-h-screen bg-white relative">
      <Navigation scrollToSection={scrollToSection} />
      <HeroSection />
      <StatsSection />
      <ToursSection />
      <div id="gallery">
        <ImageGallery />
      </div>
      <AboutSection />
      <ContactSection />
      <Footer scrollToSection={scrollToSection} />
      <FloatingElements />
    </div>
  )
}
