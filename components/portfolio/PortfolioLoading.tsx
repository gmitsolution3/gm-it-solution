import { motion } from "framer-motion";

export default function PortfolioLoading() {
  return (
    <section className="pb-28 mt-10">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Loading Text */}
        <div className="flex flex-col items-center justify-center min-h-[200px]">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.5,
            }}
            className="text-center"
          >
            <motion.p
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.3,
              }}
              className="mt-6 text-lg text-muted-foreground"
            >
              Loading amazing projects...
            </motion.p>

            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: "200px",
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
              className="h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-4 mx-auto"
            />
          </motion.div>
        </div>

        {/* Skeleton Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 px-4 sm:px-0 mt-10">
          {[...Array(6)].map((_, index) => (
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
                delay: index * 0.08,
              }}
              className="h-full"
            >
              <div className="relative h-full bg-card rounded-none overflow-hidden border-2 border-border/50">
                {/* Image Skeleton */}
                <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden bg-muted animate-pulse">
                  {/* Diagonal Cut */}
                  <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-card transform rotate-12 z-20" />

                  {/* Category Badge Skeleton */}
                  <div className="absolute top-4 right-4 z-30">
                    <div className="h-8 w-24 rounded-full bg-background/40 backdrop-blur-sm animate-pulse" />
                  </div>
                </div>

                {/* Content Skeleton */}
                <div className="relative -mt-8 p-6 pt-4 bg-card rounded-t-3xl z-30">
                  {/* Title */}
                  <div className="h-8 w-3/4 bg-muted rounded animate-pulse mb-4" />

                  {/* Description */}
                  <div className="space-y-2 mb-6">
                    <div className="h-4 w-full bg-muted rounded animate-pulse" />
                    <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
                  </div>

                  {/* Action */}
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="h-8 w-24 bg-muted rounded animate-pulse" />
                  </div>
                </div>

                {/* Decorative Corners */}
                <div className="absolute top-0 left-0 w-12 h-12 border-l-4 border-t-4 border-primary/20" />

                <div className="absolute bottom-0 right-0 w-12 h-12 border-r-4 border-b-4 border-primary/20" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}