'use client'

import { useEffect } from 'react'
import Head from 'next/head'

interface SEOOptimizerProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
}

export default function SEOOptimizer({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = [],
}: SEOOptimizerProps) {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title
    }
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription && description) {
      metaDescription.setAttribute('content', description)
    }
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle && title) {
      ogTitle.setAttribute('content', title)
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription && description) {
      ogDescription.setAttribute('content', description)
    }
    
    const ogImage = document.querySelector('meta[property="og:image"]')
    if (ogImage && image) {
      ogImage.setAttribute('content', image)
    }
    
    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl && url) {
      ogUrl.setAttribute('content', url)
    }
    
    const ogType = document.querySelector('meta[property="og:type"]')
    if (ogType) {
      ogType.setAttribute('content', type)
    }
    
    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]')
    if (twitterTitle && title) {
      twitterTitle.setAttribute('content', title)
    }
    
    const twitterDescription = document.querySelector('meta[name="twitter:description"]')
    if (twitterDescription && description) {
      twitterDescription.setAttribute('content', description)
    }
    
    const twitterImage = document.querySelector('meta[name="twitter:image"]')
    if (twitterImage && image) {
      twitterImage.setAttribute('content', image)
    }
    
    // Update article-specific meta tags
    if (type === 'article') {
      if (publishedTime) {
        const publishedMeta = document.querySelector('meta[property="article:published_time"]')
        if (publishedMeta) {
          publishedMeta.setAttribute('content', publishedTime)
        }
      }
      
      if (modifiedTime) {
        const modifiedMeta = document.querySelector('meta[property="article:modified_time"]')
        if (modifiedMeta) {
          modifiedMeta.setAttribute('content', modifiedTime)
        }
      }
      
      if (author) {
        const authorMeta = document.querySelector('meta[property="article:author"]')
        if (authorMeta) {
          authorMeta.setAttribute('content', author)
        }
      }
      
      if (section) {
        const sectionMeta = document.querySelector('meta[property="article:section"]')
        if (sectionMeta) {
          sectionMeta.setAttribute('content', section)
        }
      }
      
      tags.forEach((tag, index) => {
        const tagMeta = document.querySelector(`meta[property="article:tag"][data-index="${index}"]`)
        if (tagMeta) {
          tagMeta.setAttribute('content', tag)
        }
      })
    }
  }, [title, description, keywords, image, url, type, publishedTime, modifiedTime, author, section, tags])
  
  return null
}