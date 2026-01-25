import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Globe,
  Smartphone,
  Palette,
  TrendingUp,
  Briefcase,
  Settings,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Custom websites and web applications built with modern frameworks for performance and scalability.",
    link: "/services#web",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile apps that deliver exceptional user experiences.",
    link: "/services#mobile",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "User-centered design that converts visitors into customers through intuitive interfaces.",
    link: "/services#design",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description:
      "Data-driven marketing strategies that increase visibility and drive qualified leads.",
    link: "/services#marketing",
  },
  {
    icon: Briefcase,
    title: "Branding & Graphics",
    description:
      "Complete brand identity development that sets you apart from the competition.",
    link: "/services#branding",
  },
  {
    icon: Settings,
    title: "Business Automation",
    description:
      "Streamline operations with custom software solutions and workflow automation.",
    link: "/services#automation",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export const ServicesPreview = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6">
            What We <span className="gradient-text">Offer</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive digital solutions to help your business thrive in the modern world.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div key={service.title} variants={cardVariants}>
              <Link to={service.link} className="block group h-full">
                <div className="h-full p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden">
                  {/* Hover Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-accent transition-all duration-300">
                      <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-primary font-medium text-sm">
                      Learn More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
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
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button variant="hero" size="lg" asChild>
            <Link to="/services">
              View All Services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
