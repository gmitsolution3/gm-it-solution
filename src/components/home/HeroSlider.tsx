import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import HeroImage from "@/assets/hero.jpg";
import HeroTwoImage from "@/assets/hero_two.jpg";
import HeroThreeImage from "@/assets/hero_three.jpg";

const slides = [
  {
    id: 1,
    title: "We Build Digital Products",
    highlight: "That Actually Grow Businesses",
    description:
      "No fluff. Just modern, reliable tech solutions that solve real problems for startups, SMEs, and enterprises.",
    cta: { primary: "See Our Work", secondary: "Let's Talk" },
    image: HeroImage,
  },
  {
    id: 2,
    title: "Got an Idea?",
    highlight: "Let's Build It Together",
    description:
      "From that napkin sketch to a full-blown platform—we turn your vision into something people actually want to use.",
    cta: { primary: "How We Build", secondary: "Get a Quote" },
    image: HeroTwoImage,
  },
  {
    id: 3,
    title: "100+ Projects Later,",
    highlight: "We're Just Getting Started",
    description:
      "Every line of code, every pixel—crafted with care. We're the partner who actually reads your emails and answers your calls.",
    cta: { primary: "Our Stories", secondary: "Start Something" },
    image: HeroThreeImage,
  },
];

export const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(true);
  const sectionRef = useRef(null);

  // Preload image when slide changes
  useEffect(() => {
    setImageLoaded(false);
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(true); // Show even if loading fails
    img.src = slides[currentSlide].image;
  }, [currentSlide]);

  useEffect(() => {
    // Slower, more human-like timing with random variation
    const timer = setInterval(
      () => {
        if (!isHovering) {
          setCurrentSlide((prev) => (prev + 1) % slides.length);
        }
      },
      7000 + Math.random() * 2000,
    ); // Random delay between slides

    return () => clearInterval(timer);
  }, [isHovering]);

  // Parallax effect on mouse move - feels more interactive and human
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () =>
      window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + slides.length) % slides.length,
    );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Animated background image for current slide */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: imageLoaded ? 1 : 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
          }}
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `url(${slides[currentSlide].image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </AnimatePresence>

      {/* Loading skeleton while image loads */}
      {!imageLoaded && (
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-muted via-muted/50 to-muted/30 animate-pulse" />
      )}

      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/45 via-black/25 to-transparent dark:from-background/95 dark:via-background/70 dark:to-background/40" />

      {/* Hand-drawn style background elements - more organic */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {/* Imperfect, hand-painted style orbs */}
        <div
          className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
            transition: "transform 0.2s ease-out",
          }}
        />
        <div
          className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]"
          style={{
            transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />

        {/* Hand-drawn scribbles - adds human touch */}
        <svg
          className="absolute top-20 left-10 w-32 h-32 opacity-20"
          viewBox="0 0 100 100"
        >
          <path
            d="M20,50 Q35,30 50,50 T80,50"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            className="text-primary"
            strokeDasharray="5,5"
          />
        </svg>
        <svg
          className="absolute bottom-20 right-10 w-40 h-40 opacity-20 rotate-45"
          viewBox="0 0 100 100"
        >
          <path
            d="M30,70 Q45,40 70,30"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            className="text-accent"
            strokeDasharray="3,6"
          />
        </svg>
      </div>

      {/* More subtle, less perfect grid */}
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px]"
        style={{
          maskImage:
            "radial-gradient(circle at 50% 50%, black, transparent 80%)",
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* More personal badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-3 px-4 py-2 rounded-none bg-primary/5 border border-primary/10 mb-8 group hover:bg-primary/10 transition-colors cursor-default"
                >
                  <span className="text-sm font-medium text-white">
                    Hello, we're GM IT Solution
                  </span>
                </motion.div>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                  <span className="text-foreground">
                    {slides[currentSlide].title}
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                    {slides[currentSlide].highlight}
                  </span>
                </h1>

                <p className="text-base text-muted-foreground/90 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
                  {slides[currentSlide].description}
                </p>

                {/* More human button interaction */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    variant="secondary"
                    size="lg"
                    asChild
                    className="group relative overflow-hidden hover:scale-105 transition-transform rounded-none"
                  >
                    <Link to="/portfolio">
                      <span className="relative z-10 flex items-center gap-2">
                        {slides[currentSlide].cta.primary}
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
                  <Button
                    variant="hero-outline"
                    size="lg"
                    asChild
                    className="hover:bg-primary/5 transition-all hover:scale-105 rounded-none"
                  >
                    <Link
                      to="/contact"
                      className="flex items-center gap-2"
                    >
                      {slides[currentSlide].cta.secondary}
                      <Zap className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* More tactile slide indicators */}
            <div className="flex items-center gap-4 mt-12 justify-center lg:justify-start">
              <button
                onClick={prevSlide}
                className="p-3 rounded-xl hover:bg-muted/50 transition-all hover:scale-110 active:scale-95 border border-transparent hover:border-muted"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-3">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`relative transition-all duration-500 ${
                      index === currentSlide
                        ? "w-10 h-3 bg-primary"
                        : "w-3 h-3 bg-muted-foreground/20 hover:bg-muted-foreground/40"
                    } rounded-full overflow-hidden group`}
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    {index === currentSlide && (
                      <motion.div
                        className="absolute inset-0 bg-primary"
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        transition={{ duration: 7, ease: "linear" }}
                      />
                    )}
                  </button>
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="p-3 rounded-xl hover:bg-muted/50 transition-all hover:scale-110 active:scale-95 border border-transparent hover:border-muted"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right side - Floating stat cards */}
          <div className="hidden lg:block relative h-[550px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative w-full h-full"
            >
              {/* Floating stat cards */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 2, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.5, 1],
                }}
                className="absolute top-8 right-12 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl rounded-none p-6 w-64 border border-primary/10 shadow-2xl"
                style={{
                  boxShadow: "0 20px 40px -15px rgba(0,0,0,0.3)",
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-none bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">
                      100+
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-lg">
                      Projects
                    </p>
                    <p className="text-sm text-muted-foreground">
                      and counting
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 25, 0],
                  rotate: [0, -3, 0],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute top-1/3 left-8 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl rounded-none p-6 w-56 border border-accent/10 shadow-2xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-none bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">
                      50+
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-lg">
                      Happy
                    </p>
                    <p className="text-sm text-muted-foreground">
                      clients
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 1.5, 0],
                }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute bottom-8 right-16 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl rounded-none p-6 w-60 border border-primary/10 shadow-2xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-none bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">
                      5+
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-lg">
                      Years
                    </p>
                    <p className="text-sm text-muted-foreground">
                      of fun
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
