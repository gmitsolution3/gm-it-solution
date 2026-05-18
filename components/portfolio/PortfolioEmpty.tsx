import { motion } from "framer-motion";
import { FolderOpen, Link, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export default function PortfolioEmpty() {
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
      className="flex flex-col items-center justify-center py-20 px-4"
    >
      {/* Decorative */}
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
        No Projects Yet
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
        We're currently working on some exciting new projects. Check
        back soon to see our latest work!
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
        className="flex gap-4"
      >
        <Button
          asChild
          size="lg"
          className="bg-primary hover:bg-primary/90 text-white gap-2"
        >
          <Link href="/contact">
            Start a Project
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>

        <Button asChild size="lg" variant="outline">
          <Link href="/">Return Home</Link>
        </Button>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.6,
        }}
        className="mt-16 text-sm text-muted-foreground"
      >
        <p>✨ Stay tuned for upcoming projects</p>

        <div className="flex gap-2 justify-center mt-2">
          <span className="w-1 h-1 bg-muted-foreground rounded-full" />

          <span className="w-1 h-1 bg-muted-foreground rounded-full" />

          <span className="w-1 h-1 bg-muted-foreground rounded-full" />
        </div>
      </motion.div>
    </motion.div>
  );
}
