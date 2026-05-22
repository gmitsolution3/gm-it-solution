"use client";

export default function FeaturedProjectsLoader() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-muted/30" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header skeleton */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="h-4 w-24 bg-primary/20 rounded animate-pulse mx-auto" />
          <div className="h-10 w-72 bg-muted/40 rounded animate-pulse mx-auto" />
          <div className="h-4 w-96 bg-muted/30 rounded animate-pulse mx-auto" />
        </div>

        {/* Project skeletons */}
        <div className="space-y-16 lg:space-y-28">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="border border-border bg-card/50 rounded-2xl overflow-hidden animate-pulse"
            >
              <div
                className={`flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Image skeleton */}
                <div className="lg:w-1/2 aspect-[4/3] lg:aspect-auto lg:h-[500px] bg-muted/40" />

                {/* Content skeleton */}
                <div className="lg:w-1/2 p-8 lg:p-12 flex items-center">
                  <div className="space-y-6 w-full">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-16 bg-muted/40 rounded" />
                      <div className="h-[2px] w-12 bg-muted/40" />
                      <div className="h-4 w-24 bg-muted/40 rounded" />
                    </div>

                    <div className="h-10 w-3/4 bg-muted/40 rounded" />

                    <div className="space-y-2">
                      <div className="h-4 w-full bg-muted/30 rounded" />
                      <div className="h-4 w-5/6 bg-muted/30 rounded" />
                      <div className="h-4 w-4/6 bg-muted/30 rounded" />
                    </div>

                    <div className="h-6 w-32 bg-muted/30 rounded" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}