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
} from "lucide-react";
import CTAButton from "./../CTAButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

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
  const [swiperInstance, setSwiperInstance] = useState(null);

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

        {/* Swiper Slider - Responsive */}
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
              <SwiperSlide key={index} className="h-auto">
                <Link to={service.link} className="block h-full">
                  <div className="group h-[320px] p-5 bg-background rounded-none border border-border hover:border-primary/20 transition-all hover:-translate-y-1 hover:shadow-md flex flex-col items-center text-center">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-none bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                      <service.icon className="w-8 h-8 text-primary" />
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
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows */}
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
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <CTAButton href="/services">View All Services</CTAButton>
        </motion.div>
      </div>
    </section>
  );
};
