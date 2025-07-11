"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function FloatingElements() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".floating-element").forEach((element: any, index) => {
        gsap.to(element, {
          y: -30,
          rotation: 360,
          duration: 3 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: index * 0.2,
        })
      })

      gsap.utils.toArray(".parallax-bg").forEach((element: any) => {
        gsap.to(element, {
          yPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
      {/* Only show floating elements on larger screens */}
      <div className="floating-element absolute top-20 left-10 w-3 h-3 sm:w-4 sm:h-4 bg-primary/20 rounded-full opacity-40 sm:opacity-60" />
      <div className="floating-element absolute top-40 right-20 w-4 h-4 sm:w-6 sm:h-6 bg-primary/30 rounded-full opacity-30 sm:opacity-40 hidden md:block" />
      <div className="floating-element absolute bottom-40 left-20 w-2 h-2 sm:w-3 sm:h-3 bg-primary/25 rounded-full opacity-40 sm:opacity-50" />
      <div className="floating-element absolute bottom-20 right-10 w-3 h-3 sm:w-5 sm:h-5 bg-primary/35 rounded-full opacity-20 sm:opacity-30 hidden lg:block" />

      {/* Parallax backgrounds - reduced opacity and size on mobile */}
      <div className="parallax-bg absolute top-0 left-1/4 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full opacity-10 sm:opacity-20" />
      <div className="parallax-bg absolute bottom-0 right-1/4 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary/15 to-primary/25 rounded-full opacity-10 sm:opacity-15 hidden md:block" />
      <div className="parallax-bg absolute top-1/2 left-1/2 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-primary/10 to-primary/15 rounded-full opacity-5 sm:opacity-10" />
    </div>
  )
}
