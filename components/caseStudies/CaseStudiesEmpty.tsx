import { motion } from "framer-motion";
import { FolderOpen, Sparkles, Link, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export default function CaseStudiesEmpty() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
      }}
      className="flex flex-col items-center justify-center py-20 px-4 border-2 border-dashed border-border rounded-lg bg-card/30"
    >
      {/* Decorative Background */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl" />

        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: {
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            },
            scale: {
              duration: 3,
              repeat: Infinity,
            },
          }}
          className="relative"
        >
          <FolderOpen className="w-24 h-24 text-primary/40" />
        </motion.div>

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-6 -right-6"
        >
          <Sparkles className="w-8 h-8 text-accent/60" />
        </motion.div>

        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-6 -left-6"
        >
          <Sparkles className="w-8 h-8 text-primary/60" />
        </motion.div>
      </div>

      <motion.h3
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.2,
        }}
        className="text-3xl font-bold mb-3 text-foreground"
      >
        No Case Studies Yet
      </motion.h3>

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
        className="text-muted-foreground text-center max-w-md mb-8"
      >
        We're currently documenting our latest projects. Check back
        soon to read in-depth case studies about how we've helped
        businesses achieve their goals.
      </motion.p>

      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.4,
        }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Button
          asChild
          size="lg"
          className="bg-primary hover:bg-primary/90 text-white gap-2 rounded-none"
        >
          <Link href="/portfolio">
            Browse Portfolio
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>

        <Button
          asChild
          size="lg"
          variant="outline"
          className="rounded-none"
        >
          <Link href="/contact">Start a Project</Link>
        </Button>
      </motion.div>

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.6,
        }}
        className="mt-16 text-sm text-muted-foreground"
      >
        <p className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          New case studies coming soon
        </p>

        <div className="flex gap-2 justify-center mt-3">
          <span className="w-16 h-1 bg-muted-foreground/20 rounded-full" />

          <span className="w-16 h-1 bg-muted-foreground/20 rounded-full" />

          <span className="w-16 h-1 bg-muted-foreground/20 rounded-full" />
        </div>
      </motion.div>
    </motion.div>
  );
}
