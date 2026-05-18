import { motion } from "framer-motion";
import { FolderOpen, Sparkles, Link } from "lucide-react";
import CTAButton from "../CTAButton";
import { Button } from "../ui/button";

export default function ServiceEmpty() {
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

        {/* Sparkles */}
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
        No Services Available
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
        We're currently updating our service offerings. Please check
        back soon to explore how we can help transform your business.
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
        <CTAButton href="/contact">Contact Us</CTAButton>

        <Link href="/">
          <Button
            variant="outline"
            size="lg"
            className="rounded-none"
          >
            Return Home
          </Button>
        </Link>
      </motion.div>

      {/* Coming Soon */}
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
        <p className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          New services launching soon
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
