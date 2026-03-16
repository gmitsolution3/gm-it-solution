import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router";
import {
  Globe,
  Smartphone,
  Palette,
  TrendingUp,
  Briefcase,
  Settings,
  ChevronLeft,
  ChevronRight,
  Loader2,
  FolderOpen,
  Sparkles,
} from "lucide-react";
import CTAButton from "@/components/CTAButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useFetch } from "@/hooks/tanstack/useFetch";
import { IService } from "@/types/service.type";

export const ServicesPreview = () => {
  const { data, isLoading } = useFetch({
    queryKey: ["services"],
    url: "/services",
  });

  const services: IService[] = data?.data || [];

  const containerRef = useRef<HTMLDivElement>(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  // Loading State
  if (isLoading) {
    return (
      <section ref={containerRef} className="relative py-24">
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

          {/* Loading Skeleton Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-[320px] p-5 bg-background/50 border border-border/50 rounded-none flex flex-col items-center text-center relative"
              >
                {/* Icon Skeleton */}
                <div className="w-16 h-16 rounded-none bg-muted/50 mb-6 animate-pulse" />

                {/* Title Skeleton */}
                <div className="h-6 bg-muted/50 rounded w-3/4 mb-2 animate-pulse" />

                {/* Description Skeleton */}
                <div className="space-y-2 w-full mt-2">
                  <div className="h-3 bg-muted/50 rounded w-full animate-pulse" />
                  <div className="h-3 bg-muted/50 rounded w-5/6 animate-pulse mx-auto" />
                  <div className="h-3 bg-muted/50 rounded w-4/6 animate-pulse mx-auto" />
                </div>

                {/* Index Skeleton */}
                <div className="absolute top-3 right-3 w-8 h-8 bg-muted/50 rounded animate-pulse" />

                {/* Loading Spinner Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Button Skeleton */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-16"
          >
            <div className="inline-block h-12 w-40 bg-muted/50 rounded animate-pulse" />
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative py-24">
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

        {/* Empty State */}
        {services.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed border-border rounded-lg bg-card/30 max-w-2xl mx-auto"
          >
            {/* Decorative Background */}
            <div className="relative mb-6">
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
                <FolderOpen className="w-20 h-20 text-primary/40" />
              </motion.div>

              {/* Sparkles around the folder */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -top-4 -right-4"
              >
                <Sparkles className="w-6 h-6 text-accent/60" />
              </motion.div>

              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -bottom-4 -left-4"
              >
                <Sparkles className="w-6 h-6 text-primary/60" />
              </motion.div>
            </div>

            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-semibold mb-2 text-foreground"
            >
              No Services Available
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground text-center max-w-md mb-6"
            >
              We're currently updating our service offerings. Check
              back soon to see what we can do for your business.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <CTAButton href="/contact">Contact Us</CTAButton>
            </motion.div>

            {/* Coming Soon Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 text-sm text-muted-foreground"
            >
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                New services launching soon
              </p>
            </motion.div>
          </motion.div>
        ) : (
          /* Swiper Slider - Only show if services exist */
          <>
            <div className="relative w-full">
              <Swiper
                modules={[Autoplay, Navigation]}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                speed={800}
                loop={true}
                className="!overflow-hidden !p-5"
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                }}
                onSwiper={setSwiperInstance}
              >
                {services.map((service, index) => (
                  <SwiperSlide
                    key={service._id || index}
                    className="h-auto"
                  >
                    <Link to={"/services"} className="block h-full">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.1,
                        }}
                        className="group h-[320px] p-5 bg-background rounded-none border border-border hover:border-primary/20 transition-all hover:-translate-y-1 hover:shadow-md flex flex-col items-center text-center relative"
                      >
                        {/* Icon */}
                        <div className="w-16 h-16 rounded-none bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6 overflow-hidden">
                          <img
                            src={service.icon}
                            alt={service.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Content */}
                        <h3 className="text-2xl font-semibold mb-2 text-foreground flex-shrink-0">
                          {service.title}
                        </h3>
                        <p className="text-base max-w-sm mx-auto text-muted-foreground leading-relaxed line-clamp-4">
                          {service.description}
                        </p>

                        {/* Numbered index - top right */}
                        <div className="absolute top-3 right-3 text-3xl text-primary/5 font-bold">
                          {(index + 1).toString().padStart(2, "0")}
                        </div>
                      </motion.div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Navigation Arrows - Only show on large screens and if more than 3 slides */}
              {services.length > 3 && (
                <>
                  <button
                    onClick={() => swiperInstance?.slidePrev()}
                    className="hidden lg:inline-flex absolute -left-10 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-background border border-border hover:border-primary/20 rounded-none flex items-center justify-center hover:bg-primary/5 transition-all -ml-5"
                  >
                    <ChevronLeft className="w-5 h-5 text-foreground" />
                  </button>
                  <button
                    onClick={() => swiperInstance?.slideNext()}
                    className="hidden lg:inline-flex absolute -right-10 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-background border border-border hover:border-primary/20 rounded-none flex items-center justify-center hover:bg-primary/5 transition-all -mr-5"
                  >
                    <ChevronRight className="w-5 h-5 text-foreground" />
                  </button>
                </>
              )}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-16"
            >
              <CTAButton href="/services">
                View All Services
              </CTAButton>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};
