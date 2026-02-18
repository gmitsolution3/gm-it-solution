import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePortfolioStore } from "@/lib/portfolio-store";

// Animation variants
const glitchAnimation = {
  hover: {
    x: [0, -2, 2, -2, 0],
    y: [0, 1, -1, 1, 0],
    transition: { duration: 0.3 }
  }
};

const floatAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-5, 5, -5],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

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
        {/* Section Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6">
            Featured <span className="gradient-text">Products</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore our recent work and see how we've helped businesses achieve their digital goals.
          </p>
        </motion.div>

        {/* Projects List - Alternating Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12 lg:space-y-24"
        >
          {featuredOnly.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="relative"
            >
              <Link to={`/portfolio/${project.id}`} className="block group">
                <div className="relative border border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors duration-500 rounded-2xl overflow-hidden">
                  {/* Layout alternates */}
                  <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-0`}>
                    {/* Image side */}
                    <div className="lg:w-1/2 relative overflow-hidden">
                      <div className="aspect-[4/3] lg:aspect-auto lg:h-[500px]">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110"
                        />
                        
                        {/* Overlay with glitch effect */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent mix-blend-overlay"
                          variants={glitchAnimation}
                          whileHover="hover"
                        />
                        
                        {/* Animated corner accents */}
                        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary" />
                        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-accent" />
                      </div>
                    </div>

                    {/* Content side */}
                    <div className="lg:w-1/2 p-8 lg:p-12 flex items-center">
                      <div className="space-y-6">
                        {/* Project number and category */}
                        <motion.div 
                          className="flex items-center gap-3"
                          whileHover={{ x: 10 }}
                        >
                          <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent opacity-50">
                            {(index + 1).toString().padStart(2, '0')}
                          </span>
                          <div className="w-12 h-[2px] bg-gradient-to-r from-primary to-accent" />
                          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                            {project.category}
                          </span>
                        </motion.div>

                        {/* Title with floating animation */}
                        <motion.h3 
                          className="text-3xl lg:text-4xl font-bold uppercase leading-tight text-foreground"
                          variants={floatAnimation}
                          initial="initial"
                          animate="animate"
                        >
                          {project.title.split(' ').map((word, i) => (
                            <span key={i} className="block">
                              {word}
                              {i === 0 && (
                                <span className="text-primary ml-2">/</span>
                              )}
                            </span>
                          ))}
                        </motion.h3>

                        {/* Description */}
                        <p className="text-muted-foreground text-lg leading-relaxed">
                          {project.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-3">
                          {project.tags.map((tag, i) => (
                            <motion.span
                              key={tag}
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.1 }}
                              className="px-4 py-2 text-sm font-mono border border-border bg-muted/50 rounded-full text-muted-foreground"
                            >
                              &lt;{tag}&gt;
                            </motion.span>
                          ))}
                        </div>

                        {/* Action */}
                        <motion.div 
                          className="pt-4"
                          whileHover={{ x: 10 }}
                        >
                          <div className="inline-flex items-center gap-4 text-primary font-mono text-sm tracking-wider">
                            <Eye className="w-5 h-5" />
                            <span>VIEW_CASE_STUDY</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16 lg:mt-24"
        >
          <Button variant="secondary" size="lg" asChild className="rounded-none relative overflow-hidden">
            <Link to="/portfolio">
              View All Products
              <ArrowRight className="w-5 h-5" />

              <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 1,
                  }}
                />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};