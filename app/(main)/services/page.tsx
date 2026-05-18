"use client";

import CTAButton from "@/components/CTAButton";
import CTA from "@/components/home/CTA";
import ServiceLoading from "@/components/service/ServiceLoading";
import ServiceEmpty from "@/components/service/ServiceEmpty";
import { useFetch } from "@/hooks/swr/useFetch";
import { IService } from "@/types";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";
import { memo } from "react";

const ServicesPageComponent = () => {
  const { data, isLoading } = useFetch("/services");

  const services: IService[] = data?.data || [];

  if (isLoading) {
    return <ServiceLoading />;
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

      {/* Services */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          {services.length === 0 ? (
            /* Empty State */
            <ServiceEmpty />
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
                    viewport={{
                      once: true,
                      amount: 0.3,
                    }}
                    transition={{
                      duration: 0.9,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="grid lg:grid-cols-2 gap-12 items-center"
                  >
                    {/* Content */}
                    <div className={!isEven ? "lg:order-2" : ""}>
                      <div className="relative w-16 h-16 rounded-none bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 overflow-hidden">
                        <Image
                          src={service.icon}
                          alt={service.title}
                          fill
                          sizes="64px"
                          className="object-cover"
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
                        <CTAButton href="/contact">
                          Get Started
                        </CTAButton>
                      </div>
                    </div>

                    {/* Image */}
                    <div className={!isEven ? "lg:order-1" : ""}>
                      <div className="aspect-[4/3] rounded-none bg-gradient-to-br from-primary/10 to-accent/10 p-2 flex items-center justify-center">
                        <div className="relative w-full h-full overflow-hidden rounded-none">
                          <Image
                            src={service.image}
                            alt={`${service.title} preview`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover rounded-none transition-transform duration-700 hover:scale-110"
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

      {/* CTA */}
      <CTA />
    </>
  );
};

export default memo(ServicesPageComponent);
