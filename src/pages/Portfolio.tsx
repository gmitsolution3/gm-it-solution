import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { usePortfolioStore } from "@/lib/portfolio-store";
import { Button } from "@/components/ui/button";

const Portfolio = () => {
  const { projects } = usePortfolioStore();

  return (
    <Layout>
      {/* ================= HERO ================= */}
      <section className="relative pt-36 pb-24 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[150px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/10 blur-[120px] rounded-full" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <span className="text-primary font-semibold uppercase tracking-widest text-sm">
              Portfolio
            </span>

            <h1 className="mt-6 text-4xl md:text-5xl font-bold leading-tight">
              Crafting Digital
              <span className="block gradient-text">
                Experiences That Matter
              </span>
            </h1>

            <p className="mt-6 text-base text-muted-foreground">
              We design and build products that help brands grow,
              connect, and dominate digitally.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-28 mt-10">
        <div className="container mx-auto px-4 lg:px-8">
          {/* ---------- Projects Grid ---------- */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 px-4 sm:px-0"
          >
            <AnimatePresence mode="popLayout">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, rotateX: -15, y: 30 }}
                  animate={{ opacity: 1, rotateX: 0, y: 0 }}
                  exit={{ opacity: 0, rotateX: 15, y: -30 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{
                    scale: 1.02,
                    rotateY: 5,
                    transition: { duration: 0.3 },
                  }}
                  className="h-full perspective-[2000px]"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block h-full"
                  >
                    {/* Creative Card with Overlapping Elements */}
                    <div className="relative h-full">
                      {/* Background Layer - Geometric Shape */}

                      {/* Main Card */}
                      <div className="relative h-full bg-card rounded-none overflow-hidden border-2 border-border/50 group-hover:border-primary/30 transition-all duration-500">
                        {/* Image Section - With Scroll Effect */}
                        <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden">
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 mix-blend-overlay z-10" />

                          {/* Image with Scroll Effect */}
                          <div className="absolute inset-0 overflow-hidden">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-[200%] object-cover object-top transition-transform duration-[8000ms] ease-out group-hover:-translate-y-1/2"
                              style={{
                                objectPosition: "top",
                                transform: "translateY(0)",
                              }}
                            />
                          </div>

                          {/* Diagonal Cut Effect */}
                          <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-card transform rotate-12 z-20" />

                          {/* Category Badge - Floating */}
                          <motion.div
                            className="absolute top-4 right-4 z-30"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            <span className="px-4 py-2 text-xs font-bold uppercase bg-black/20 text-white rounded-full shadow-lg backdrop-blur-sm">
                              {project.category}
                            </span>
                          </motion.div>

                          {/* Scroll Indicator - Optional */}
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="flex flex-col items-center">
                              <span className="text-[10px] text-white/80 uppercase tracking-wider mb-1">
                                Scroll
                              </span>
                              <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center">
                                <div className="w-1 h-2 bg-white/60 rounded-full mt-1 animate-bounce" />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Content - Overlapping the Image */}
                        <div className="relative -mt-8 p-6 pt-4 bg-card rounded-t-3xl z-30">
                          <h3 className="text-2xl font-black mb-2 transition-colors group-hover:text-primary">
                            {project.title}
                          </h3>

                          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                            {project.description}
                          </p>

                          {/* Stats Section */}
                          <div className="flex items-center justify-between pt-3 border-t border-border">
                            <motion.div
                              whileHover={{ x: 5 }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                              }}
                            >
                              <Button
                                variant="ghost"
                                size="sm"
                                className="gap-1 text-primary hover:text-primary/80"
                              >
                                <span>Explore</span>
                                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                              </Button>
                            </motion.div>
                          </div>
                        </div>

                        {/* Decorative Corner Accent */}
                        <div className="absolute top-0 left-0 w-12 h-12 border-l-4 border-t-4 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute bottom-0 right-0 w-12 h-12 border-r-4 border-b-4 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {projects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">
                No projects found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your filters
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
