export default function GalleryLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section Skeleton */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="h-12 sm:h-16 lg:h-20 bg-muted rounded-lg mb-6 animate-pulse" />
            <div className="h-6 sm:h-8 lg:h-10 bg-muted rounded-lg max-w-3xl mx-auto mb-8 animate-pulse" />
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-muted rounded-full animate-pulse" />
                  <div className="h-4 w-20 bg-muted rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid Skeleton */}
      <section className="py-12 sm:py-16 lg:py-20 bg-muted/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-24">
            <div className="h-8 sm:h-10 md:h-12 bg-muted rounded-lg mb-3 sm:mb-4 animate-pulse" />
            <div className="h-6 sm:h-8 lg:h-10 bg-muted rounded-lg max-w-2xl mx-auto animate-pulse" />
          </div>

          <div className="grid grid-cols-2 gap-4 h-[700px]">
            {/* First grid: 2 images stacked */}
            <div className="flex flex-col gap-4 h-full">
              <div className="flex-1 bg-muted rounded-xl animate-pulse" />
              <div className="flex-1 bg-muted rounded-xl animate-pulse" />
            </div>

            {/* Second grid: 1 image taking full height */}
            <div className="bg-muted rounded-xl h-full animate-pulse" />

            {/* Third grid: 1 image taking full height */}
            <div className="bg-muted rounded-xl h-full animate-pulse" />

            {/* Fourth grid: 2 images stacked */}
            <div className="flex flex-col gap-4 h-full">
              <div className="flex-1 bg-muted rounded-xl animate-pulse" />
              <div className="flex-1 bg-muted rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Section Skeleton */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="h-8 lg:h-10 bg-muted rounded-lg mb-6 animate-pulse" />
              <div className="h-6 bg-muted rounded-lg mb-8 animate-pulse" />
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-muted rounded-full animate-pulse" />
                    <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-muted rounded-2xl animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}