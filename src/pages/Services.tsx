import { motion } from "framer-motion";
import {
  Check,
  Video,
  Globe,
  Palette,
  TrendingUp,
  Briefcase,
  Code2,
  Loader2,
  FolderOpen,
  Sparkles,
} from "lucide-react";
import { CTASection } from "@/components/home/CTASection";
import CTAButton from "@/components/CTAButton";
import webDevelopmentImage from "@/assets/web_development.jpg";
import uiUxDesign from "@/assets/ui_ux.jpg";
import videoEdit from "@/assets/video_edit.jpg";
import softwareDevelopment from "@/assets/software_development.jpg";
import brandDesign from "@/assets/brand.jpg";
import digitalMarketing from "@/assets/digital_marketing.jpg";
import { useFetch } from "@/hooks/tanstack/useFetch";
import { IService } from "@/types";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

const Services = () => {
  const { data, isLoading } = useFetch({
    queryKey: ["services"],
    url: "/services",
  });

  const services: IService[] = data?.data || [];

  // Loading State
  if (isLoading) {
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
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
                  Loading our services...
                </motion.p>

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "200px" }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-4 mx-auto"
                />

                {/* Service Card Skeletons */}
                <div className="mt-12 space-y-16 max-w-4xl mx-auto">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="grid lg:grid-cols-2 gap-12 items-center"
                    >
                      <div
                        className={i % 2 === 0 ? "lg:order-2" : ""}
                      >
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
                      <div
                        className={i % 2 === 0 ? "lg:order-1" : ""}
                      >
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
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

      {/* Services List */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          {services.length === 0 ? (
            /* Empty State */
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
                No Services Available
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-muted-foreground text-center max-w-md mb-8"
              >
                We're currently updating our service offerings. Please
                check back soon to explore how we can help transform
                your business.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <CTAButton href="/contact">Contact Us</CTAButton>

                <Link to="/">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-none"
                  >
                    Return Home
                  </Button>
                </Link>
              </motion.div>

              {/* Coming Soon Message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-16 text-sm text-muted-foreground"
              >
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  New services launching soon
                </p>
                <div className="flex gap-2 justify-center mt-3">
                  <span className="w-16 h-1 bg-muted-foreground/20 rounded-full" />
                  <span className="w-16 h-1 bg-muted-foreground/20 rounded-full" />
                  <span className="w-16 h-1 bg-muted-foreground/20 rounded-full" />
                </div>
              </motion.div>
            </motion.div>
          ) : (
            /* Services Grid */
            <div className="space-y-24">
              {services.map((service, index) => {
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={service._id}
                    id={service._id}
                    initial={{
                      opacity: 0,
                      x: isEven ? -120 : 120,
                      scale: 0.95,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                      scale: 1,
                    }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.9,
                      ease: [0.22, 1, 0.36, 1], // premium cubic-bezier
                    }}
                    className={`grid lg:grid-cols-2 gap-12 items-center`}
                  >
                    <div
                      className={index % 2 === 1 ? "lg:order-2" : ""}
                    >
                      <div className="w-16 h-16 rounded-none bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 overflow-hidden">
                        <img
                          src={service.icon}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        {service.title}
                      </h2>
                      <p className="text-lg text-muted-foreground mb-8">
                        {service.description}
                      </p>

                      <div className="grid sm:grid-cols-2 gap-3 mb-8">
                        {service.features?.map((feature) => (
                          <div
                            key={feature}
                            className="flex items-center gap-2"
                          >
                            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                              <Check className="w-3 h-3 text-primary" />
                            </div>
                            <span className="text-muted-foreground">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {service.technologies?.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-sm bg-muted rounded-none text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-start">
                        <CTAButton href={"/contact"}>
                          Get Started
                        </CTAButton>
                      </div>
                    </div>

                    <div
                      className={index % 2 === 1 ? "lg:order-1" : ""}
                    >
                      <div className="aspect-[4/3] rounded-none bg-gradient-to-br from-primary/10 to-accent/10 p-2 flex items-center justify-center">
                        <div className="w-full h-full overflow-hidden rounded-none">
                          <img
                            src={service.image}
                            alt={`${service.title} preview`}
                            className="w-full h-full object-cover aspect-[4/3] rounded-none transition-transform duration-700 hover:scale-110"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </>
  );
};

export default Services;
