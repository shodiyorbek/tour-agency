# Gallery Page

This directory contains the gallery page implementation for the tour agency website.

## Files

- `page.tsx` - Main gallery page component
- `loading.tsx` - Loading skeleton component
- `error.tsx` - Error handling component

## Features

### Gallery Page (`page.tsx`)
- **Hero Section**: Beautiful landing section with title, description, and feature highlights
- **Image Gallery**: Uses the existing `ImageGallery` component with:
  - Interactive lightbox functionality
  - Navigation controls (previous/next)
  - Responsive grid layout
  - Image captions with titles and locations
- **Additional Info Section**: Provides context about the gallery with feature highlights

### Loading Component (`loading.tsx`)
- Skeleton loading animation that matches the page layout
- Provides visual feedback while the gallery loads
- Responsive design that adapts to different screen sizes

### Error Component (`error.tsx`)
- Graceful error handling with user-friendly messages
- Retry functionality
- Navigation back to home page
- Consistent styling with the rest of the application

## Navigation Integration

The gallery page is accessible through:
- Desktop navigation: "Gallery" button in the main navigation
- Mobile navigation: "Gallery" button in the mobile menu
- Direct URL: `/gallery`

## Images

The gallery displays images from the `/public/gallery/` directory:
- Dubai Skyline at Sunset
- Grand Canyon Vista
- Turkey
- Overwater Villas (Maldives)
- Kyoto Cherry Blossoms
- Serengeti Wildlife
- Aurora Borealis (Iceland)
- Ancient Citadel (Machu Picchu)

## Responsive Design

The gallery page is fully responsive and includes:
- Mobile-first design approach
- Adaptive typography and spacing
- Touch-friendly interactions
- Optimized image loading

## Performance

- Uses Next.js Image component for optimized image loading
- Implements loading states for better UX
- Error boundaries for graceful error handling
- SEO-friendly metadata