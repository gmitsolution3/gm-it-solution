import { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import {
  MessageCircle,
  Star,
  ArrowUpRight,
  Sparkles,
  Globe,
  Zap,
} from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    content:
      "GM IT Solution transformed our outdated website into a modern, high-converting platform. Our leads increased by 200% within the first quarter. Exceptional work!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Founder, HealthHub",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    content:
      "The mobile app they built for us exceeded all expectations. Clean code, beautiful design, and delivered on time. They're now our go-to development partner.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Marketing Director, GrowthCo",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    content:
      "Their digital marketing strategy helped us reach new markets we never thought possible. Professional, responsive, and results-driven team.",
    rating: 5,
  },
  {
    id: 4,
    name: "David Kumar",
    role: "CTO, FinanceFlow",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    content:
      "Outstanding technical expertise. They built our complex fintech platform with robust security and scalability. Highly recommended for enterprise projects.",
    rating: 5,
  },
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100,
  });
  const x1 = useTransform(smoothProgress, [0, 1], [0, -200]);
  const x2 = useTransform(smoothProgress, [0, 1], [0, 200]);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6">
            What Our{" "}
            <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it. Here's what our satisfied
            clients have to say.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative mb-32">
          <motion.div style={{ x: x1 }} className="flex gap-6 mb-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.id}
                onHoverStart={() => setHoveredId(testimonial.id)}
                onHoverEnd={() => setHoveredId(null)}
                className="group relative flex-shrink-0 w-[400px]"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 overflow-hidden">
                  {/* Animated gradient on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${testimonial.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    animate={
                      hoveredId === testimonial.id
                        ? { scale: 1.5 }
                        : { scale: 1 }
                    }
                  />

                  {/* Metric display */}
                  <div className="mb-6">
                    <motion.div
                      className={`text-4xl font-bold bg-gradient-to-r ${testimonial.gradient} bg-clip-text text-transparent`}
                      animate={
                        hoveredId === testimonial.id
                          ? { scale: 1.1, x: 10 }
                          : { scale: 1, x: 0 }
                      }
                    >
                      {testimonial.metric}
                    </motion.div>
                    <div className="text-sm text-white/40 mt-1">
                      {testimonial.metricLabel}
                    </div>
                  </div>

                  {/* Quote */}
                  <p className="text-white/80 text-lg leading-relaxed mb-8">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${testimonial.gradient} rounded-full blur-md opacity-50`}
                      />
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="relative w-14 h-14 rounded-full border-2 border-white/20"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-white/40">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  {/* Corner accent */}
                  <div
                    className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-bl-full`}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Second row scrolling opposite direction */}
          <motion.div style={{ x: x2 }} className="flex gap-6">
            {[...testimonials].reverse().map((testimonial, i) => (
              <motion.div
                key={`reverse-${testimonial.id}`}
                className="group relative flex-shrink-0 w-[400px]"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.5 }}
              >
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 overflow-hidden">
                  <p className="text-white/80 text-lg leading-relaxed mb-8">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full border border-white/20"
                      />
                      <div>
                        <h4 className="font-medium text-white">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-white/40">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
