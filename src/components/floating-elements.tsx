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
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="floating-element absolute top-20 left-10 w-4 h-4 bg-blue-200 rounded-full opacity-60" />
      <div className="floating-element absolute top-40 right-20 w-6 h-6 bg-purple-200 rounded-full opacity-40" />
      <div className="floating-element absolute bottom-40 left-20 w-3 h-3 bg-yellow-200 rounded-full opacity-50" />
      <div className="floating-element absolute bottom-20 right-10 w-5 h-5 bg-pink-200 rounded-full opacity-30" />

      <div className="parallax-bg absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-20" />
      <div className="parallax-bg absolute bottom-0 right-1/4 w-24 h-24 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full opacity-15" />
    </div>
  )
}
