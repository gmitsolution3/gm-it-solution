"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function HeroLoader() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-gradient-to-br from-background via-background to-muted">
      {/* Animated background gradient */}
      <motion.div
        animate={{
          background: [
            "linear-gradient(45deg, var(--primary) 0%, var(--accent) 100%)",
            "linear-gradient(135deg, var(--accent) 0%, var(--primary) 100%)",
            "linear-gradient(225deg, var(--primary) 0%, var(--accent) 100%)",
            "linear-gradient(315deg, var(--accent) 0%, var(--primary) 100%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute inset-0 opacity-5"
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            {/* Badge skeleton */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-none bg-primary/5 border border-primary/10 mb-8"
            >
              <div className="w-4 h-4 bg-primary/20 rounded-full animate-pulse" />
              <div className="w-32 h-4 bg-primary/20 rounded animate-pulse" />
            </motion.div>

            {/* Title skeleton */}
            <div className="space-y-4 mb-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="h-12 bg-primary/10 rounded w-3/4 animate-pulse"
              />
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="h-12 bg-gradient-to-r from-primary/20 to-accent/20 rounded w-2/3 animate-pulse"
              />
            </div>

            {/* Description skeleton */}
            <div className="space-y-3 max-w-xl mx-auto lg:mx-0 mb-10">
              {[0.3, 0.4, 0.5].map((delay) => (
                <motion.div
                  key={delay}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay }}
                  className="h-4 bg-muted/20 rounded animate-pulse"
                  style={{ width: `${100 - delay * 30}%` }}
                />
              ))}
            </div>

            {/* Buttons skeleton */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="h-12 w-40 bg-primary/20 rounded animate-pulse"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="h-12 w-40 bg-muted/20 rounded animate-pulse"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom loading indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20"
        >
          <Loader2 className="w-4 h-4 text-primary animate-spin" />
          <span className="text-sm text-muted-foreground">
            Loading amazing content...
          </span>
        </motion.div>
      </div>
    </section>
  );
}
