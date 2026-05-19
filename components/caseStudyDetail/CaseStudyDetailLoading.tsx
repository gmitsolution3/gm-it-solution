import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function CaseStudyDetailLoading() {
  return (
    <div className="pt-32 pb-20 bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Image
            src={"/logo.png"}
            alt="Logo"
            className="h-14 w-auto"
            priority
            height={200}
            width={200}
          />
        </div>

        {/* Loading Animation */}
        <div className="flex flex-col items-center justify-center min-h-[500px]">
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
            <div className="relative">
              {/* Animated Rings */}
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-primary/30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />

              <motion.div
                className="absolute inset-0 rounded-full border-4 border-accent/30"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.2, 0, 0.2],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: 0.3,
                }}
              />

              <Loader2 className="w-16 h-16 text-primary animate-spin relative z-10 mx-auto" />
            </div>

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
              Loading case study details...
            </motion.p>

            <motion.div
              initial={{
                width: 0,
              }}
              animate={{
                width: "200px",
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
              className="h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-4 mx-auto"
            />

            {/* Skeleton Preview */}
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.5,
              }}
              className="mt-12 space-y-4 max-w-5xl mx-auto animate-pulse"
            >
              <div className="h-4 bg-muted rounded-full w-3/4 mx-auto" />

              <div className="h-4 bg-muted rounded-full w-1/2 mx-auto" />

              <div className="h-64 bg-muted/50 rounded-xl mt-8" />

              <div className="space-y-3 pt-8">
                <div className="h-5 bg-muted rounded w-1/4" />

                <div className="h-4 bg-muted rounded" />

                <div className="h-4 bg-muted rounded w-5/6" />

                <div className="h-4 bg-muted rounded w-4/6" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
