import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", path: "/" },
  {
    name: "Services",
    path: "/services",
    megaMenu: [
      {
        title: "Web Development",
        description: "Modern web applications",
        icon: "🌐",
      },
      {
        title: "Mobile Apps",
        description: "iOS & Android development",
        icon: "📱",
      },
      {
        title: "Cloud Solutions",
        description: "Scalable cloud infrastructure",
        icon: "☁️",
      },
      {
        title: "AI & Machine Learning",
        description: "Intelligent systems",
        icon: "🤖",
      },
    ],
  },
  { name: "Portfolio", path: "/portfolio" },
  { name: "About", path: "/about" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(
    null,
  );
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setActiveMegaMenu(null);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveMegaMenu(null);
  }, [location]);

  // Logo animation variants
  const logoVariants: Variants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
    },
  };

  // Nav link animation variants
  const linkVariants: Variants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    hover: {
      scale: 1.05,
    },
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50",
          "transition-all duration-500",
          isScrolled
            ? "bg-background/70 backdrop-blur-xl border-b border-border/40 shadow-2xl shadow-primary/5"
            : "bg-background/0 backdrop-blur-0",
        )}
      >
        {/* Animated gradient line at the top */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Premium background pattern (visible when scrolled) */}
        {isScrolled && (
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
        )}

        <nav className="container mx-auto px-4 lg:px-8 relative">
          <div className="flex items-center justify-between h-20">
            {/* Normal Logo */}
            <motion.div
              variants={logoVariants}
              initial="initial"
              whileHover="hover"
            >
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">
                    GM
                  </span>
                </div>
                <span className="font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                  IT Solution
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation with Mega Menu */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.path}
                  className="relative"
                  onMouseEnter={() => {
                    if (link.megaMenu) {
                      setActiveMegaMenu(link.path);
                    }
                    setHoveredLink(link.path);
                  }}
                  onMouseLeave={() => {
                    setActiveMegaMenu(null);
                    setHoveredLink(null);
                  }}
                >
                  <motion.div
                    variants={linkVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                    }}
                  >
                    <Link
                      to={link.path}
                      className={cn(
                        "relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2",
                        location.pathname === link.path
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {/* Background with premium effect */}
                      <motion.div
                        className="absolute inset-0 rounded-xl"
                        animate={{
                          background:
                            hoveredLink === link.path
                              ? "rgba(var(--primary), 0.1)"
                              : location.pathname === link.path
                                ? "rgba(var(--primary), 0.1)"
                                : "rgba(0,0,0,0)",
                        }}
                        transition={{ duration: 0.2 }}
                      />

                      {/* Link text */}
                      <span className="relative">{link.name}</span>

                      {/* Indicator for mega menu */}
                      {link.megaMenu && (
                        <ChevronDown
                          className={cn(
                            "w-3 h-3 transition-transform duration-300",
                            activeMegaMenu === link.path &&
                              "rotate-180",
                          )}
                        />
                      )}

                      {/* Active indicator with premium animation */}
                      {location.pathname === link.path && (
                        <motion.div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-primary to-accent" />
                      )}

                      {/* Hover indicator underline */}
                      {hoveredLink === link.path &&
                        location.pathname !== link.path && (
                          <motion.div
                            layoutId="hoverNavIndicator"
                            className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-muted-foreground/50 to-muted-foreground/30"
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 30,
                            }}
                          />
                        )}
                    </Link>
                  </motion.div>

                  {/* Mega Menu with premium design */}
                  <AnimatePresence>
                    {activeMegaMenu === link.path &&
                      link.megaMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px]"
                        >
                          <div className="bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl shadow-primary/10 overflow-hidden">
                            {/* Premium header gradient */}
                            <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />

                            <div className="p-6">
                              <div className="grid grid-cols-2 gap-4">
                                {link.megaMenu.map((item, index) => (
                                  <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                      delay: index * 0.05,
                                    }}
                                    whileHover={{ scale: 1.02, x: 5 }}
                                    className="group cursor-pointer"
                                  >
                                    <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/50 transition-all duration-300">
                                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-lg">
                                        {item.icon}
                                      </div>
                                      <div>
                                        <h4 className="font-semibold text-sm flex items-center gap-1">
                                          {item.title}
                                          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                                        </h4>
                                        <p className="text-xs text-muted-foreground mt-0.5">
                                          {item.description}
                                        </p>
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>

                              {/* Mega menu footer */}
                              <div className="mt-4 pt-4 border-t border-border/50">
                                <Link
                                  to={link.path}
                                  className="text-xs text-primary hover:text-accent transition-colors flex items-center justify-center gap-1 group"
                                >
                                  View all services
                                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Premium CTA Section */}
            <div className="hidden lg:flex items-center gap-4">
              <ModeToggle />

              {/* Animated CTA Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="secondary"
                  size="lg"
                  className="relative overflow-hidden group !rounded-0"
                  asChild
                >
                  <Link
                    to="/contact !rounded-0"
                    className="flex items-center gap-2"
                  >
                    <span className="relative z-10">Get Started</span>
                    <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />

                    {/* Premium shine effect */}
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
              </motion.div>
            </div>

            {/* Premium Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative w-10 h-10 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-foreground" />
                ) : (
                  <Menu className="w-5 h-5 text-foreground" />
                )}
              </motion.div>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border"
            >
              <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <div key={link.path} className="group">
                      <Link
                        to={link.path}
                        className={cn(
                          "px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 relative block",
                          location.pathname === link.path
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted",
                        )}
                      >
                        {link.name}
                        {/* Hover underline for mobile */}
                        {location.pathname !== link.path && (
                          <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-muted-foreground/50 to-muted-foreground/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        )}
                      </Link>
                    </div>
                  ))}
                  <Button
                    variant="hero"
                    size="lg"
                    className="mt-4"
                    asChild
                  >
                    <Link to="/contact">Get Started</Link>
                  </Button>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-muted-foreground font-medium">
                      Switch Theme
                    </span>
                    <ModeToggle />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Add this to your global CSS for the grid pattern */}
      <style>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 30px 30px;
        }
      `}</style>
    </>
  );
};
