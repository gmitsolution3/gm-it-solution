import { motion, Variants } from "framer-motion";
import { Link } from "react-router";
import Logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  FolderOpen,
  Loader2,
  Sparkles,
} from "lucide-react";
import { useFetch } from "@/hooks/tanstack/useFetch";
import { ICaseStudy } from "@/types";

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
  const { data, isLoading } = useFetch({
    queryKey: ["case-studies"],
    url: "/case-studies",
  });

  const caseStudies: ICaseStudy[] = data?.data || [];

  // Loading State
  if (isLoading) {
    return (
      <div className="pt-32 pb-20 bg-background text-foreground min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <Link to="/" className="flex justify-center mb-6">
              <img src={Logo} className="h-14" alt="Logo" />
            </Link>

            <h1 className="text-4xl font-bold mb-3">Case Studies</h1>

            <p className="text-muted-foreground max-w-xl mx-auto">
              Explore the platforms, systems, and digital products we
              have built for businesses around the world.
            </p>
          </div>

          {/* Loading State */}
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
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.1, 0.3],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 text-lg text-muted-foreground"
              >
                Loading case studies...
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
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Link to="/" className="flex justify-center mb-6">
            <img src={Logo} className="h-14" alt="Logo" />
          </Link>

          <h1 className="text-4xl font-bold mb-3">Case Studies</h1>

          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore the platforms, systems, and digital products we
            have built for businesses around the world.
          </p>
        </div>

        {/* Empty State */}
        {caseStudies.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
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
                  scale: { duration: 3, repeat: Infinity },
                }}
                className="relative"
              >
                <FolderOpen className="w-24 h-24 text-primary/40" />
              </motion.div>

              {/* Sparkles around the folder */}
              <motion.div
                animate={{ rotate: 360 }}
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
                animate={{ rotate: -360 }}
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold mb-3 text-foreground"
            >
              No Case Studies Yet
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground text-center max-w-md mb-8"
            >
              We're currently documenting our latest projects. Check
              back soon to read in-depth case studies about how we've
              helped businesses achieve their goals.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white gap-2 rounded-none"
              >
                <Link to="/portfolio">
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
                <Link to="/contact">Start a Project</Link>
              </Button>
            </motion.div>

            {/* Recent Activity Placeholder */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
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
        ) : (
          /* Projects */
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-16"
          >
            {caseStudies.map((project) => (
              <motion.div
                key={project._id}
                variants={cardVariants}
                className="grid lg:grid-cols-2 gap-10 items-center bg-card border border-border rounded-none p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Left Content */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 flex items-center justify-center bg-primary/10 text-primary rounded-none text-sm font-semibold">
                      {project.portfolioId.title.charAt(0)}
                    </span>

                    <h2 className="text-2xl font-semibold">
                      {project.portfolioId.title}
                    </h2>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {project.portfolioId.description}
                  </p>

                  <Button
                    variant="secondary"
                    size="lg"
                    asChild
                    className="group relative overflow-hidden hover:scale-105 transition-transform rounded-none"
                  >
                    <Link to={`/case-studies/${project._id}`}>
                      <span className="relative z-10 flex items-center gap-2 group-hover:text-white">
                        Learn More
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
                <div className="relative h-[260px] lg:h-[320px] w-full overflow-hidden rounded-none shadow-lg group">
                  <img
                    src={project.portfolioId.image}
                    alt={project.portfolioId.title}
                    className="w-full h-full object-cover object-top rounded-none transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
