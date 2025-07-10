"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface AnimatedCounterProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
}

export default function AnimatedCounter({ end, duration = 2, suffix = "", prefix = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counter = { value: 0 }

      gsap.to(counter, {
        value: end,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          setCount(Math.floor(counter.value))
        },
        scrollTrigger: {
          trigger: counterRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })
    }, counterRef)

    return () => ctx.revert()
  }, [end, duration])

  return (
    <span ref={counterRef}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}
