"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePortfolioStore } from "@/lib/portfolio-store";
import CTAButton from "./../CTAButton";

/* =========================
   Animation Function
========================= */

const getRevealVariant = (direction: "left" | "right") => ({
  hidden: {
    opacity: 0,
    x: direction === "left" ? -120 : 120,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1], // smooth premium easing
    },
  },
});

export const FeaturedProjects = () => {
  const { projects } = usePortfolioStore();
  const featuredOnly = projects.slice(0, 4);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/30" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-4">
            Featured <span className="gradient-text">Products</span>
          </h2>
          <p className="text-base text-muted-foreground">
            Explore our recent work and see how we've helped
            businesses achieve their digital goals.
          </p>
        </motion.div>

        {/* Projects */}
        <div className="space-y-16 lg:space-y-28">
          {featuredOnly.map((project, index) => {
            const direction = index % 2 === 0 ? "left" : "right";

            return (
              <motion.div
                key={project.id}
                variants={getRevealVariant(direction)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="relative"
              >
                <a
                  href={project.url}
                  target="_blank"
                  className="block group"
                >
                  <div className="relative border border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors duration-500 rounded-2xl overflow-hidden">
                    <div
                      className={`flex flex-col ${
                        index % 2 === 0
                          ? "lg:flex-row"
                          : "lg:flex-row-reverse"
                      }`}
                    >
                      {/* Image with Scroll Effect */}
                      <div className="lg:w-1/2 relative overflow-hidden">
                        <div className="aspect-[4/3] lg:aspect-auto lg:h-[500px] overflow-hidden relative">
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-700" />
                          
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

                          {/* Category Badge - Floating */}
                          <motion.div
                            className="absolute top-4 right-4 z-20"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            <span className="px-4 py-2 text-xs font-bold uppercase bg-black/20 text-white rounded-full shadow-lg backdrop-blur-sm">
                              {project.category}
                            </span>
                          </motion.div>

                          {/* Scroll Indicator */}
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
                      </div>

                      {/* Content */}
                      <div className="lg:w-1/2 p-8 lg:p-12 flex items-center">
                        <div className="space-y-6">
                          {/* Number + Category */}
                          <div className="flex items-center gap-3">
                            <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent opacity-50">
                              {(index + 1)
                                .toString()
                                .padStart(2, "0")}
                            </span>
                            <div className="w-12 h-[2px] bg-gradient-to-r from-primary to-accent" />
                            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                              {project.category}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-3xl lg:text-4xl font-bold uppercase leading-tight text-foreground">
                            {project.title}
                          </h3>

                          {/* Description */}
                          <p className="text-muted-foreground text-lg leading-relaxed">
                            {project.description}
                          </p>

                          {/* Action */}
                          <div className="pt-4">
                            <div className="inline-flex items-center gap-4 text-primary font-mono text-sm tracking-wider">
                              <Eye className="w-5 h-5" />
                              <span>Live Site</span>
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <CTAButton href="/portfolio">View All Products</CTAButton>
      </div>
    </section>
  );
};