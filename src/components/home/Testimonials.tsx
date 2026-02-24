"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    content:
      "GM IT Solution transformed our outdated website into a modern, high-converting platform. Our leads increased by 200% within the first quarter.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Founder, HealthHub",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    content:
      "The mobile app they built for us exceeded all expectations. Clean code, beautiful design, and delivered on time.",
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Marketing Director, GrowthCo",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    content:
      "Their digital marketing strategy helped us reach new markets we never thought possible.",
  },
  {
    id: 4,
    name: "David Kumar",
    role: "CTO, FinanceFlow",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    content:
      "Outstanding technical expertise. They built our complex fintech platform with robust security and scalability.",
  },
];

export const Testimonials = () => {
  const [isHoveredTop, setIsHoveredTop] = useState(false);
  const [isHoveredBottom, setIsHoveredBottom] = useState(false);

  // Duplicate for seamless infinite loop
  const duplicated = [...testimonials, ...testimonials];
  const reversed = [...testimonials].reverse();
  const duplicatedReversed = [...reversed, ...reversed];

  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4 text-foreground">
            What Our <span className="text-primary">Clients Say</span>
          </h2>
          <p className="text-muted-foreground">
            Don't just take our word for it. Here’s what our satisfied
            clients have to say.
          </p>
        </div>

        {/* Slider Wrapper */}
        <div className="relative overflow-hidden space-y-6">
          {/* LEFT FADE */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-background via-background/90 to-transparent z-10" />

          {/* RIGHT FADE */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-background via-background/90 to-transparent z-10" />

          {/* 🔼 TOP ROW (slides right) */}
          <motion.div
            className="flex gap-6 w-max"
            onHoverStart={() => setIsHoveredTop(true)}
            onHoverEnd={() => setIsHoveredTop(false)}
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: isHoveredTop ? 40 : 20,
              ease: "linear",
            }}
          >
            {duplicated.map((testimonial, index) => (
              <TestimonialCard
                key={`top-${index}`}
                testimonial={testimonial}
              />
            ))}
          </motion.div>

          {/* 🔽 BOTTOM ROW (slides left) */}
          <motion.div
            className="flex gap-6 w-max"
            onHoverStart={() => setIsHoveredBottom(true)}
            onHoverEnd={() => setIsHoveredBottom(false)}
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: isHoveredBottom ? 40 : 20,
              ease: "linear",
            }}
          >
            {duplicatedReversed.map((testimonial, index) => (
              <TestimonialCard
                key={`bottom-${index}`}
                testimonial={testimonial}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }: any) => {
  return (
    <div className="flex-shrink-0 w-[400px]">
      <div className="p-8 rounded-none bg-card/80 backdrop-blur-xl border border-border">
        <p className="text-lg text-card-foreground/80 leading-relaxed mb-8">
          "{testimonial.content}"
        </p>

        <div className="flex items-center gap-4">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-14 h-14 rounded-full border border-border"
          />
          <div>
            <h4 className="font-semibold text-card-foreground">
              {testimonial.name}
            </h4>
            <p className="text-sm text-muted-foreground">
              {testimonial.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};