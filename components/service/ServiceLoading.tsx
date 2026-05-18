import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function ServiceLoading() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />

          <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
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
            className="text-center mx-auto"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Our Services
            </span>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-3">
              Solutions That{" "}
              <span className="gradient-text">Drive Growth</span>
            </h1>

            <p className="text-base text-muted-foreground">
              Comprehensive digital services tailored to transform
              your business and achieve your goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Loading State */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
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
              className="text-center w-full"
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
                Loading our services...
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

              {/* Skeletons */}
              <div className="mt-12 space-y-16 mx-auto">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="grid lg:grid-cols-2 gap-12 items-center"
                  >
                    <div className={i % 2 === 0 ? "lg:order-2" : ""}>
                      <div className="w-16 h-16 bg-muted rounded-none mb-6 animate-pulse" />

                      <div className="h-8 bg-muted rounded w-3/4 mb-4 animate-pulse" />

                      <div className="space-y-2 mb-8">
                        <div className="h-4 bg-muted rounded w-full animate-pulse" />

                        <div className="h-4 bg-muted rounded w-5/6 animate-pulse" />

                        <div className="h-4 bg-muted rounded w-4/6 animate-pulse" />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3 mb-8">
                        {[1, 2, 3, 4].map((j) => (
                          <div
                            key={j}
                            className="h-6 bg-muted rounded animate-pulse"
                          />
                        ))}
                      </div>
                    </div>

                    <div className={i % 2 === 0 ? "lg:order-1" : ""}>
                      <div className="aspect-[4/3] bg-muted rounded-none animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
