export default function CaseStudiesLoading() {
  return (
    <div className="pt-32 pb-20 bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Skeleton */}
        <div className="text-center mb-16 animate-pulse">
          <div className="flex justify-center mb-6">
            <div className="h-14 w-14 rounded-none bg-muted" />
          </div>

          <div className="h-10 w-72 bg-muted rounded mx-auto mb-4" />

          <div className="h-5 w-full max-w-xl bg-muted rounded mx-auto" />
        </div>

        {/* Cards Skeleton */}
        <div className="space-y-16">
          {Array.from({
            length: 3,
          }).map((_, index) => (
            <div
              key={index}
              className="grid lg:grid-cols-2 gap-10 items-center bg-card border border-border rounded-none p-8"
            >
              {/* Left */}
              <div className="animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-muted rounded-none" />

                  <div className="h-8 w-48 bg-muted rounded" />
                </div>

                <div className="space-y-3 mb-6">
                  <div className="h-4 bg-muted rounded w-full" />

                  <div className="h-4 bg-muted rounded w-5/6" />

                  <div className="h-4 bg-muted rounded w-4/6" />
                </div>

                <div className="h-12 w-40 bg-muted rounded-none" />
              </div>

              {/* Right */}
              <div className="h-[260px] lg:h-[320px] w-full bg-muted rounded-none animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
