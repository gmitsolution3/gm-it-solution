"use client";

import { motion } from "framer-motion";

export default function AboutLoader() {
  return (
    <>
      {/* Hero Skeleton */}
      <section className="pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-16 sm:pb-20 md:pb-24 lg:pb-28 bg-gradient-to-b from-background to-muted/30 text-center relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-48 sm:w-56 md:w-64 lg:w-72 h-48 sm:h-56 md:h-64 lg:h-72 bg-primary/5 rounded-full blur-3xl" />

          <div className="absolute bottom-20 right-10 w-48 sm:w-56 md:w-64 lg:w-72 h-48 sm:h-56 md:h-64 lg:h-72 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
          <div className="animate-pulse">
            <div className="h-4 w-28 bg-muted rounded mx-auto mb-4" />

            <div className="space-y-4 mb-6">
              <div className="h-12 w-3/4 bg-muted rounded mx-auto" />

              <div className="h-12 w-2/4 bg-muted rounded mx-auto" />
            </div>

            <div className="w-24 h-1 bg-muted rounded-full mx-auto mb-8" />

            <div className="space-y-3 max-w-3xl mx-auto">
              <div className="h-5 w-full bg-muted rounded" />

              <div className="h-5 w-5/6 bg-muted rounded mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Chairman Skeleton */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center">
            {/* Image */}
            <motion.div
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.5,
              }}
              className="flex justify-center"
            >
              <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full bg-muted animate-pulse border-4 border-primary/20" />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{
                opacity: 0,
                x: 20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.5,
              }}
              className="animate-pulse"
            >
              <div className="h-4 w-40 bg-muted rounded mb-4" />

              <div className="h-10 w-3/4 bg-muted rounded mb-6" />

              <div className="w-16 h-1 bg-muted rounded-full mb-6" />

              <div className="space-y-3 mb-6">
                <div className="h-5 w-full bg-muted rounded" />

                <div className="h-5 w-5/6 bg-muted rounded" />
              </div>

              <div className="space-y-3 mb-8">
                <div className="h-4 w-full bg-muted rounded" />

                <div className="h-4 w-full bg-muted rounded" />

                <div className="h-4 w-4/5 bg-muted rounded" />
              </div>

              <div className="w-full h-48 sm:h-56 md:h-64 rounded-xl bg-muted animate-pulse" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CEO Skeleton */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-muted/40 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center">
            {/* Content */}
            <motion.div
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.5,
              }}
              className="order-2 lg:order-1 animate-pulse"
            >
              <div className="h-4 w-40 bg-muted rounded mb-4" />

              <div className="h-10 w-3/4 bg-muted rounded mb-6" />

              <div className="w-16 h-1 bg-muted rounded-full mb-6" />

              <div className="space-y-3 mb-6">
                <div className="h-5 w-full bg-muted rounded" />

                <div className="h-5 w-5/6 bg-muted rounded" />
              </div>

              <div className="space-y-3 mb-8">
                <div className="h-4 w-full bg-muted rounded" />

                <div className="h-4 w-full bg-muted rounded" />

                <div className="h-4 w-4/5 bg-muted rounded" />
              </div>

              <div className="w-full h-48 sm:h-56 md:h-64 rounded-xl bg-muted animate-pulse" />
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{
                opacity: 0,
                x: 20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.5,
              }}
              className="order-1 lg:order-2 flex justify-center"
            >
              <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full bg-muted animate-pulse border-4 border-primary/20" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Members Skeleton */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-16 animate-pulse">
            <div className="h-4 w-40 bg-muted rounded mx-auto mb-4" />

            <div className="space-y-4 mb-6">
              <div className="h-10 w-3/4 bg-muted rounded mx-auto" />

              <div className="h-10 w-2/4 bg-muted rounded mx-auto" />
            </div>

            <div className="space-y-3 mb-8">
              <div className="h-4 w-full bg-muted rounded" />

              <div className="h-4 w-5/6 bg-muted rounded mx-auto" />
            </div>

            <div className="w-24 h-1 bg-muted rounded-full mx-auto" />
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
            {[...Array(4)].map((_, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                className="bg-background/50 backdrop-blur-sm p-2 border border-border/50"
              >
                <div className="aspect-square bg-muted animate-pulse mb-5" />

                <div className="text-center animate-pulse">
                  <div className="h-6 w-3/4 bg-muted rounded mx-auto mb-3" />

                  <div className="h-4 w-1/2 bg-muted rounded mx-auto mb-5" />

                  <div className="w-10 h-10 rounded-full bg-muted mx-auto" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
