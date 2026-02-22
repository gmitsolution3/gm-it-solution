import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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
import CTAButton from "./../CTAButton";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Custom websites and web applications built with modern frameworks for performance and scalability.",
    link: "/services#web",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile apps that deliver exceptional user experiences.",
    link: "/services#mobile",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "User-centered design that converts visitors into customers through intuitive interfaces.",
    link: "/services#design",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description:
      "Data-driven marketing strategies that increase visibility and drive qualified leads.",
    link: "/services#marketing",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Briefcase,
    title: "Branding & Graphics",
    description:
      "Complete brand identity development that sets you apart from the competition.",
    link: "/services#branding",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Settings,
    title: "Business Automation",
    description:
      "Streamline operations with custom software solutions and workflow automation.",
    link: "/services#automation",
    color: "from-indigo-500 to-purple-500",
  },
];

export const ServicesPreview = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} className="relative min-h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-4">
              What We <span className="gradient-text">Offer</span>
            </h2>
            <p className="text-base text-muted-foreground">
              Comprehensive digital solutions to help your business
              thrive in the modern world.
            </p>
          </motion.div>

          {/* Stacked Cards Container */}
          <div className="relative h-[250px] w-full max-w-xl mx-auto">
            {services.map((service, index) => {
              // Calculate transform values based on scroll progress
              const isEven = index % 2 === 0;
              const startOffset = index * (1 / services.length);
              const endOffset = (index + 1) * (1 / services.length);

              const x = useTransform(
                scrollYProgress,
                [startOffset, endOffset],
                [isEven ? "-100%" : "100%", "0%"],
              );

              const scale = useTransform(
                scrollYProgress,
                [startOffset, endOffset],
                [0.8, 1],
              );

              const opacity = useTransform(
                scrollYProgress,
                [startOffset, endOffset],
                [0.4, 1],
              );

              const rotate = useTransform(
                scrollYProgress,
                [startOffset, endOffset],
                [isEven ? -5 : 5, 0],
              );

              const zIndex = index;

              return (
                <motion.div
                  key={service.title}
                  style={{
                    x,
                    scale,
                    opacity,
                    rotate,
                    zIndex,
                  }}
                  className="absolute inset-0 will-change-transform"
                >
                  <Link to={service.link} className="block h-full">
                    <div className="group relative h-full p-5 bg-background rounded-lg border border-border hover:border-primary/20 transition-all hover:-translate-y-1 hover:shadow-md flex flex-col items-center text-center">
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                        <service.icon className="w-8 h-8 text-primary" />
                      </div>

                      {/* Content */}
                      <h3 className="text-2xl font-semibold mb-2 text-foreground">
                        {service.title}
                      </h3>
                      <p className="text-base max-w-sm mx-auto text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>

                      {/* Numbered index - top right */}
                      <div className="absolute top-3 right-3 text-3xl text-primary/5 font-bold">
                        {(services.indexOf(service) + 1)
                          .toString()
                          .padStart(2, "0")}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Button */}
          <CTAButton href="/services">View All Services</CTAButton>
        </div>
      </div>
    </section>
  );
};
