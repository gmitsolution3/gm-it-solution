"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function OurServicesLoader() {
  return (
    <section className="relative py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Our Services
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-4">
            What We <span className="gradient-text">Offer</span>
          </h2>

          <p className="text-base text-muted-foreground">
            Comprehensive digital solutions to help your business
            thrive in the modern world.
          </p>
        </motion.div>

        {/* Skeleton Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-[320px] p-5 bg-background/50 border border-border/50 rounded-none flex flex-col items-center text-center relative"
            >
              {/* Icon Skeleton */}
              <div className="w-16 h-16 rounded-none bg-muted/50 mb-6 animate-pulse" />

              {/* Title Skeleton */}
              <div className="h-6 bg-muted/50 rounded w-3/4 mb-2 animate-pulse" />

              {/* Description Skeleton */}
              <div className="space-y-2 w-full mt-2">
                <div className="h-3 bg-muted/50 rounded w-full animate-pulse" />
                <div className="h-3 bg-muted/50 rounded w-5/6 animate-pulse mx-auto" />
                <div className="h-3 bg-muted/50 rounded w-4/6 animate-pulse mx-auto" />
              </div>

              {/* Index Skeleton */}
              <div className="absolute top-3 right-3 w-8 h-8 bg-muted/50 rounded animate-pulse" />

              {/* Spinner Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Skeleton */}
        <div className="text-center mt-16">
          <div className="inline-block h-12 w-40 bg-muted/50 rounded animate-pulse" />
        </div>
      </div>
    </section>
  );
}
