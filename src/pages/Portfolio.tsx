import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight, FolderOpen, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/tanstack/useFetch";
import { IPortfolioItem } from "@/types/portfolio.type";

const Portfolio = () => {
  const { data, isLoading } = useFetch({
    queryKey: ["portfolios"],
    url: "/portfolios",
  });

  const portfolioList: IPortfolioItem[] = data?.data || [];

  // Loading State
  if (isLoading) {
    return (
      <>
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

        {/* Loading State */}
        <section className="pb-28 mt-10">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="relative">
                  {/* Animated rings */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-primary/30"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-accent/30"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0, 0.2] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
                  />
                  <Loader2 className="w-16 h-16 text-primary animate-spin relative z-10" />
                </div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 text-lg text-muted-foreground"
                >
                  Loading amazing projects...
                </motion.p>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "200px" }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-4 mx-auto"
                />
              </motion.div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
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
          {/* Empty State */}
          {portfolioList.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center py-20 px-4"
            >
              {/* Decorative Background */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl" />
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 3, repeat: Infinity }
                  }}
                  className="relative"
                >
                  <FolderOpen className="w-24 h-24 text-primary/40" />
                </motion.div>
              </div>

              <motion.h3 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold mb-3 text-foreground"
              >
                No Projects Yet
              </motion.h3>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-muted-foreground text-center max-w-md mb-8"
              >
                We're currently working on some exciting new projects. 
                Check back soon to see our latest work!
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex gap-4"
              >
                <Button 
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white gap-2"
                >
                  <Link to="/contact">
                    Start a Project
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                
                <Button 
                  asChild
                  size="lg"
                  variant="outline"
                >
                  <Link to="/">
                    Return Home
                  </Link>
                </Button>
              </motion.div>

              {/* Recent Activity Placeholder */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
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
          ) : (
            /* ---------- Projects Grid ---------- */
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 px-4 sm:px-0"
            >
              <AnimatePresence mode="popLayout">
                {portfolioList.map((project, index) => (
                  <motion.div
                    key={project._id}
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
          )}
        </div>
      </section>
    </>
  );
};

export default Portfolio;