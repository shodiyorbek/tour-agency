import ImageGallery from "@/components/image-gallery"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gallery - Tour Agency",
  description: "Explore our stunning destination gallery featuring beautiful landscapes, iconic landmarks, and unforgettable travel experiences.",
}

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Our Gallery
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Discover breathtaking destinations and unforgettable moments captured around the world
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>8+ Destinations</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-secondary rounded-full" />
                <span>High Quality Images</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span>Interactive Lightbox</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <ImageGallery />

      {/* Additional Info Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Experience the World Through Our Lens
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Each image in our gallery represents a unique story, a moment of wonder, and an invitation to explore. 
                From the golden sands of Dubai to the mystical ruins of Machu Picchu, our collection showcases the 
                diversity and beauty of our planet's most remarkable destinations.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  </div>
                  <span className="text-foreground">Professional photography</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-secondary rounded-full" />
                  </div>
                  <span className="text-foreground">Curated destinations</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                  </div>
                  <span className="text-foreground">Interactive viewing experience</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-8">
                <div className="h-full flex flex-col justify-center items-center text-center">
                  <div className="text-6xl mb-4">🌍</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Ready to Explore?
                  </h3>
                  <p className="text-muted-foreground">
                    Let these images inspire your next adventure
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}