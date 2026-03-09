import { motion, Variants } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "@/assets/logo.png";
import { usePortfolioStore } from "@/lib/portfolio-store";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function CaseStudies() {
  const { projects } = usePortfolioStore();

  return (
    <div className="pt-32 pb-20 bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Link to="/" className="flex justify-center mb-6">
            <img src={Logo} className="h-14" />
          </Link>

          <h1 className="text-4xl font-bold mb-3">Case Studies</h1>

          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore the platforms, systems, and digital products we
            have built for businesses around the world.
          </p>
        </div>

        {/* Projects */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-16"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className="grid lg:grid-cols-2 gap-10 items-center bg-card border border-border rounded-none p-8 shadow-sm"
            >
              {/* Left Content */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 flex items-center justify-center bg-primary/10 text-primary rounded-none text-sm font-semibold">
                    {project.title.charAt(0)}
                  </span>

                  <h2 className="text-2xl font-semibold">
                    {project.title}
                  </h2>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  {project.description}
                </p>

                <Button
                  variant="secondary"
                  size="lg"
                  asChild
                  className="group relative overflow-hidden hover:scale-105 transition-transform rounded-none"
                >
                  <Link to={`/case-studies/${project.id}`}>
                    <span className="relative z-10 flex items-center gap-2 group-hover:text-white">
                      {/* {slides[currentSlide].cta.primary} */}Learn
                      More
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />

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
              </div>

              {/* Right Image */}
              <div className="relative h-[260px] lg:h-[320px] w-full overflow-hidden rounded-none shadow-lg">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top rounded-none"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
