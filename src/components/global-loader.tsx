"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface GlobalLoaderProps {
  children: React.ReactNode
}

export default function GlobalLoader({ children }: GlobalLoaderProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time and wait for DOM content to be ready
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500) // Show loader for at least 1.5 seconds

    // Also listen for DOM content loaded
    const handleDOMContentLoaded = () => {
      setTimeout(() => setIsLoading(false), 500)
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', handleDOMContentLoaded)
    } else {
      // DOM is already loaded
      setTimeout(() => setIsLoading(false), 500)
    }

    return () => {
      clearTimeout(timer)
      document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded)
    }
  }, [])

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"
          >
            <div className="text-center">
              {/* Animated logo or brand */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-8"
              >
                <div className="text-4xl font-bold text-white mb-2">✈️ Big Tour</div>
                <div className="text-white/80 text-lg">Your Dream Travel Agency</div>
              </motion.div>

              {/* Loading spinner */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full mx-auto mb-6"
              />

              {/* Loading text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-white/90 text-sm"
              >
                Loading your adventure...
              </motion.div>

              {/* Progress dots */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex justify-center space-x-2 mt-4"
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                    className="w-2 h-2 bg-white rounded-full"
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}