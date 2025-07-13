# AOS (Animate On Scroll) Animations

This project now includes AOS (Animate On Scroll) animations to enhance the user experience with smooth scroll-triggered animations.

## Setup

The AOS library has been installed and configured with the following setup:

### Installation
```bash
npm install aos @types/aos --legacy-peer-deps
```

### Provider Component
The `AOSProvider` component (`src/components/aos-provider.tsx`) initializes AOS with the following configuration:

```typescript
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  offset: 100,
  delay: 0,
  anchorPlacement: 'top-bottom',
})
```

### Layout Integration
The `AOSProvider` is integrated into the main layout (`src/app/layout.tsx`) to enable animations throughout the application.

## Usage

### Basic Animation Attributes

Add these data attributes to any element you want to animate:

```jsx
<div data-aos="fade-up">
  Content that fades up when scrolled into view
</div>
```

### Available Animation Types

- `fade-up` - Element fades in from bottom
- `fade-down` - Element fades in from top
- `fade-left` - Element fades in from right
- `fade-right` - Element fades in from left
- `zoom-in` - Element scales up from 0
- `zoom-out` - Element scales down from 1.5
- `slide-up` - Element slides up from bottom
- `slide-down` - Element slides down from top
- `slide-left` - Element slides in from right
- `slide-right` - Element slides in from left
- `flip-left` - Element flips from left
- `flip-right` - Element flips from right
- `flip-up` - Element flips from bottom
- `flip-down` - Element flips from top

### Animation Delays

Add delays to create staggered animations:

```jsx
<div data-aos="fade-up" data-aos-delay="200">
  This will animate 200ms after the element comes into view
</div>
```

### Animation Duration

Customize animation duration:

```jsx
<div data-aos="fade-up" data-aos-duration="1000">
  This animation will take 1 second to complete
</div>
```

## Current Implementation

The following sections have been enhanced with AOS animations:

### HeroSection
- Main title: `fade-right` with 200ms delay
- Subtitle: `fade-right` with 400ms delay
- Description: `fade-right` with 600ms delay
- CTA button: `fade-up` with 800ms delay
- Carousel container: `fade-left` with 300ms delay
- Scroll indicator: `fade-up` with 1000ms delay

### AboutSection
- Main heading: `fade-right` with 200ms delay
- Description: `fade-right` with 400ms delay
- Feature items: `fade-up` with staggered delays (600ms, 800ms, 1000ms)
- Image container: `fade-left` with 300ms delay
- Experience badge: `zoom-in` with 1200ms delay

### TopDestinationsSection
- Section title: `fade-up` with 200ms delay
- Section description: `fade-up` with 400ms delay
- Destination cards: `zoom-in` with staggered delays
- CTA button: `fade-up` with 800ms delay

### StatsSection
- Stat items: `fade-up` with staggered delays (200ms, 300ms, 400ms, 500ms)

### ContactSection
- Section title: `fade-up` with 200ms delay
- Section description: `fade-up` with 400ms delay
- Contact info items: `fade-right` with staggered delays
- Contact form: `fade-left` with 400ms delay

### Footer
- Footer columns: `fade-up` with staggered delays
- Copyright section: `fade-up` with 1000ms delay

## Best Practices

1. **Use appropriate delays**: Stagger animations to create a natural flow
2. **Keep it subtle**: Don't over-animate - less is often more
3. **Consider performance**: Too many animations can impact performance
4. **Test on mobile**: Ensure animations work well on smaller screens
5. **Accessibility**: Ensure animations don't interfere with accessibility features

## Customization

To modify the global AOS settings, edit the `AOSProvider` component:

```typescript
AOS.init({
  duration: 800,        // Animation duration in milliseconds
  easing: 'ease-in-out', // Easing function
  once: true,           // Whether animation should happen only once
  offset: 100,          // Offset (in px) from the original trigger point
  delay: 0,             // Values from 0 to 3000, with step 50ms
  anchorPlacement: 'top-bottom', // Defines which position of the element regarding to window should trigger the animation
})
```

## Troubleshooting

If animations aren't working:

1. Ensure the `AOSProvider` is properly imported and used in the layout
2. Check that the CSS is imported: `import 'aos/dist/aos.css'`
3. Verify that elements have the correct `data-aos` attributes
4. Check browser console for any JavaScript errors
5. Ensure the element is visible in the viewport when the animation should trigger