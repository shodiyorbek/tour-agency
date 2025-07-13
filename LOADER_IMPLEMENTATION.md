# Loader Implementation

This document describes the global loader and image loader implementation added to the Big Tour travel agency website.

## Global Loader

### Features
- **DOM Content Loading**: Shows while the DOM content is loading
- **Animated Brand**: Displays the Big Tour logo with smooth animations
- **Loading Spinner**: Rotating spinner with progress dots
- **Smooth Transitions**: Framer Motion animations for smooth loading experience
- **Minimum Display Time**: Ensures loader shows for at least 1.5 seconds for better UX

### Implementation
- **File**: `src/components/global-loader.tsx`
- **Integration**: Wrapped around the entire app in `src/app/layout.tsx`
- **Dependencies**: Uses Framer Motion for animations

### Usage
```tsx
import GlobalLoader from '@/components/global-loader'

// In layout.tsx
<GlobalLoader>
  <WishlistProvider>
    {children}
  </WishlistProvider>
  <Toaster />
</GlobalLoader>
```

## Image Loader

### Features
- **Individual Image Loading**: Each image has its own loading state
- **Skeleton Loading**: Animated skeleton while images load
- **Error Handling**: Graceful fallback for failed image loads
- **Smooth Transitions**: Fade-in animations when images load
- **Progress Indicators**: Animated dots during loading

### Implementation
- **File**: `src/components/ui/optimized-image.tsx` (enhanced existing component)
- **Replacement**: All `Image` components replaced with `OptimizedImage`
- **Dependencies**: Uses Framer Motion for animations

### Usage
```tsx
import { OptimizedImage } from '@/components/ui/optimized-image'

<OptimizedImage
  src="/path/to/image.jpg"
  alt="Description"
  width={400}
  height={300}
  className="rounded-lg"
/>
```

## Files Modified

### New Files
- `src/components/global-loader.tsx` - Global loader component
- `src/components/image-loader.tsx` - Individual image loader (alternative)

### Modified Files
- `src/app/layout.tsx` - Added GlobalLoader wrapper
- `src/components/ui/optimized-image.tsx` - Enhanced with better animations
- All section components - Replaced Image with OptimizedImage

### Updated Sections
- `src/components/sections/TopDestinationsSection.tsx`
- `src/components/sections/HeroSection.tsx`
- `src/components/sections/BestRecommendedSection.tsx`
- `src/components/sections/Navigation.tsx`
- `src/components/sections/DestinationSection.tsx`
- `src/components/sections/HotDealsSection.tsx`
- `src/components/sections/ToursSection.tsx`
- `src/components/sections/Footer.tsx`
- `src/components/sections/AboutSection.tsx`
- `src/components/wishlist-modal.tsx`
- `src/app/gallery/page.tsx`
- `src/app/destination/page.tsx`

## Benefits

1. **Better User Experience**: Users see loading states instead of blank spaces
2. **Perceived Performance**: Loading animations make the app feel faster
3. **Error Handling**: Graceful fallbacks for failed image loads
4. **Consistent Design**: All images now have uniform loading behavior
5. **Accessibility**: Loading states provide feedback to users

## Technical Details

- Uses Framer Motion for smooth animations
- Implements proper error boundaries for image loading
- Maintains Next.js Image optimization features
- Responsive design for all screen sizes
- TypeScript support with proper type definitions