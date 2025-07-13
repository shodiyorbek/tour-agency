"use client"

import { useRef } from "react"
import { Globe, Users, Award, Star } from "lucide-react"
import AnimatedCounter from "@/components/animated-counter"
import { motion } from "framer-motion"

const stats = [
  { icon: Globe, label: "Countries Visited", value: 50, suffix: "+" },
  { icon: Users, label: "Happy Travelers", value: 10000, suffix: "+" },
  { icon: Award, label: "Awards Won", value: 25, suffix: "+" },
  { icon: Star, label: "Average Rating", value: 4.9, suffix: "" },
]

export default function StatsSection() {
  const statsRef = useRef<HTMLElement>(null)

  return (
    <section ref={statsRef} className="py-12 sm:py-14 lg:py-16 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="stat-item text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, threshold: 0.1 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            >
              <motion.div 
                className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-primary/10 rounded-full mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <stat.icon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-primary" />
              </motion.div>
              <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm sm:text-base text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}