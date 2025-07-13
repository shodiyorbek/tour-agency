'use client'

import { useEffect } from 'react'
import { generateStructuredData } from '@/lib/metadata'

interface SEOStructuredDataProps {
  type: 'TravelAgency' | 'TouristTrip' | 'FAQPage'
  data?: any
}

export default function SEOStructuredData({ type, data }: SEOStructuredDataProps) {
  useEffect(() => {
    const structuredData = generateStructuredData(type, data)
    
    // Remove existing structured data
    const existingScript = document.querySelector('script[data-structured-data]')
    if (existingScript) {
      existingScript.remove()
    }
    
    // Add new structured data
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-structured-data', 'true')
    script.textContent = JSON.stringify(structuredData)
    document.head.appendChild(script)
    
    return () => {
      script.remove()
    }
  }, [type, data])
  
  return null
}