# Big Trip - Premium Travel Agency Website

A modern, responsive travel agency website built with Next.js 14, featuring advanced animations, interactive galleries, and a comprehensive booking system.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd tour-agency
   ```

2. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## ✨ Key Features & Solutions

### 🎨 Advanced Animation System
- **GSAP Integration** with ScrollTrigger for smooth scroll-based animations
- **Framer Motion** for component-level animations and micro-interactions
- **Staggered animations** for tour cards, stats, and gallery items
- **Parallax effects** on hero backgrounds and gallery images
- **Performance-optimized** animations with proper cleanup and context management

### 🖼️ Interactive Image Gallery
- **Masonry-style responsive layout** with dynamic grid system
- **Lightbox functionality** with smooth transitions and keyboard navigation
- **Parallax scrolling effects** with varying speeds for depth perception
- **Lazy loading** with animated skeleton placeholders
- **Touch-friendly navigation** for mobile devices

### 💫 Hero Section with Dynamic Carousel
- **Auto-rotating background carousel** with smooth transitions
- **Animated text overlays** that sync with background changes
- **Progress indicators** and navigation controls
- **Responsive design** that adapts to all screen sizes
- **Search integration** with modern form components

### 🛍️ Wishlist System
- **LocalStorage persistence** for saved tours across sessions
- **Global state management** with React Context
- **Interactive heart icons** on tour cards
- **Dedicated wishlist modal** with full tour management
- **Real-time count badges** in navigation

### 📱 Responsive Design Excellence
- **Mobile-first approach** with progressive enhancement
- **Touch-optimized interactions** for mobile devices
- **Flexible grid systems** that adapt to all screen sizes
- **Optimized typography** scaling across devices
- **Performance-conscious** animations for lower-end devices

### 🎯 SEO & Performance
- **Structured data** implementation for rich search results
- **Meta tag optimization** with dynamic generation
- **Image optimization** with Next.js Image component
- **Lazy loading** for improved Core Web Vitals
- **Accessibility features** with ARIA labels and keyboard navigation

### 🔧 Modern Tech Stack
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for utility-first styling
- **Radix UI** for accessible components
- **Framer Motion** for animations
- **GSAP** for advanced animations
- **React Hook Form** for form handling

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── contact/           # Contact page
│   ├── destination/       # Destination listing page
│   ├── gallery/          # Gallery page
│   └── globals.css       # Global styles
├── components/            # Reusable components
│   ├── sections/         # Page sections
│   ├── ui/              # UI components (Radix-based)
│   └── hooks/           # Custom React hooks
├── lib/                  # Utility functions
└── styles/              # Additional styles
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3b82f6) - Used for main actions and highlights
- **Secondary**: Gray scale for text and backgrounds
- **Accent**: White/Black for contrast and readability

### Typography
- **Headings**: Bold, large-scale typography for impact
- **Body**: Clean, readable fonts for content
- **Responsive**: Scales appropriately across all devices

### Components
- **Cards**: Elevated design with hover effects
- **Buttons**: Primary styling with hover animations
- **Forms**: Clean, accessible form components
- **Navigation**: Sticky header with smooth scrolling

## 🚀 Performance Optimizations

### Animation Performance
- **GSAP Context API** for proper cleanup
- **ScrollTrigger optimization** with refresh handling
- **Efficient animation queuing** to prevent performance issues
- **Reduced motion support** for accessibility

### Loading Performance
- **Lazy loading** for gallery images
- **Progressive enhancement** for animations
- **Optimized bundle size** with tree shaking
- **Image optimization** with Next.js Image component

### Mobile Optimizations
- **Touch-friendly hover states** for mobile devices
- **Optimized animation performance** for lower-end devices
- **Responsive parallax effects** that scale appropriately
- **Battery-friendly animations** on mobile devices

## 🔧 Development Features

### Code Quality
- **ESLint configuration** for code consistency
- **TypeScript** for type safety
- **Prettier** for code formatting
- **Component-based architecture** for maintainability

### State Management
- **React Context** for global state (wishlist, theme)
- **Local storage** for persistence
- **Custom hooks** for reusable logic

### Testing & Debugging
- **Development tools** integration
- **Error boundaries** for graceful error handling
- **Console logging** for debugging

## 📊 Analytics & Monitoring

### Performance Metrics
- **Core Web Vitals** optimization
- **Lighthouse scores** monitoring
- **Bundle size** analysis
- **Animation performance** tracking

### User Experience
- **Loading states** with skeleton placeholders
- **Error handling** with fallback UI
- **Accessibility** compliance
- **Mobile responsiveness** testing

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run start
```

### Environment Variables
Create a `.env.local` file for environment-specific configurations.

### Hosting
The application is optimized for deployment on:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Any static hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

*Built with ❤️ using Next.js, TypeScript, and modern web technologies.*
