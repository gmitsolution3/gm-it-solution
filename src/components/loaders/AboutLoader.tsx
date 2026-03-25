import React from "react";

export default function AboutLoader() {
  return (
    <div className="animate-pulse space-y-8">
      {/* Hero Section Skeleton */}
      <div className="pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-16 sm:pb-20 md:pb-24 lg:pb-28 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center">
            <div className="h-4 w-24 bg-muted rounded mx-auto mb-4" />
            <div className="h-12 sm:h-16 md:h-20 bg-muted rounded-lg max-w-3xl mx-auto mb-6" />
            <div className="w-20 h-1 bg-muted mx-auto mb-6" />
            <div className="h-6 bg-muted rounded max-w-2xl mx-auto mb-2" />
            <div className="h-6 bg-muted rounded max-w-xl mx-auto" />
          </div>
        </div>
      </div>

      {/* Chairman Section Skeleton */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-96 bg-muted rounded-xl" />
      </div>

      {/* CEO Section Skeleton */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-96 bg-muted rounded-xl" />
      </div>

      {/* Team Section Skeleton */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-80 bg-muted rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
