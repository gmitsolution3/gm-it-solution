export default function BlogLoader() {
  return (
    <div className="animate-pulse">
      {/* Hero Section Skeleton */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="h-4 w-24 bg-muted rounded mx-auto mb-4" />

            <div className="h-12 sm:h-16 bg-muted rounded-lg max-w-2xl mx-auto mb-6" />

            <div className="h-6 bg-muted rounded max-w-lg mx-auto" />
          </div>
        </div>
      </section>

      {/* Featured Skeleton */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <div className="aspect-video bg-muted rounded-lg" />

            <div className="space-y-4">
              <div className="h-6 w-24 bg-muted rounded" />

              <div className="h-8 bg-muted rounded w-3/4" />

              <div className="h-4 bg-muted rounded w-full" />

              <div className="h-4 bg-muted rounded w-5/6" />

              <div className="flex gap-4 pt-4">
                <div className="h-4 w-24 bg-muted rounded" />

                <div className="h-4 w-24 bg-muted rounded" />

                <div className="h-4 w-24 bg-muted rounded" />
              </div>
            </div>
          </div>

          {/* Grid Skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({
              length: 6,
            }).map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-video bg-muted rounded-lg" />

                <div className="h-6 w-24 bg-muted rounded" />

                <div className="h-6 bg-muted rounded w-3/4" />

                <div className="h-4 bg-muted rounded w-full" />

                <div className="h-4 bg-muted rounded w-5/6" />

                <div className="flex gap-2">
                  <div className="h-4 w-20 bg-muted rounded" />

                  <div className="h-4 w-4 bg-muted rounded" />

                  <div className="h-4 w-20 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
