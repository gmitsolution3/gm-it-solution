import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Logo from "@/assets/logo.png";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "About Us", path: "/about" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

const services = [
  { name: "Web Development", path: "/services#web" },
  { name: "Mobile Apps", path: "/services#mobile" },
  { name: "UI/UX Design", path: "/services#design" },
  { name: "Digital Marketing", path: "/services#marketing" },
  { name: "Business Automation", path: "/services#automation" },
];

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      {/* Newsletter Section - Fully Responsive */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/5 border-y border-border">
        {/* Decorative elements - Responsive sizing */}
        <div className="absolute inset-0">
          <div className="absolute -top-12 sm:-top-16 md:-top-20 lg:-top-24 -right-12 sm:-right-16 md:-right-20 lg:-right-24 w-32 sm:w-40 md:w-48 lg:w-64 h-32 sm:h-40 md:h-48 lg:h-64 bg-primary/5 rounded-full blur-2xl sm:blur-3xl" />
          <div className="absolute -bottom-12 sm:-bottom-16 md:-bottom-20 lg:-bottom-24 -left-12 sm:-left-16 md:-left-20 lg:-left-24 w-32 sm:w-40 md:w-48 lg:w-64 h-32 sm:h-40 md:h-48 lg:h-64 bg-primary/5 rounded-full blur-2xl sm:blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 md:py-16 relative">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            {/* Left content - Responsive typography */}
            <div className="space-y-3 sm:space-y-4 text-center lg:text-left">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight px-4 sm:px-6 lg:px-0">
                Subscribe to Our Newsletter
              </h3>

              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed px-4 sm:px-6 lg:px-0">
                Join our community of forward-thinking professionals.
                Get weekly insights, industry trends, and exclusive
                content delivered straight to your inbox.
              </p>

              {/* Feature list - Responsive layout */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 pt-2 sm:pt-3 md:pt-4 px-4 sm:px-6 lg:px-0">
                <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground bg-background/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <div className="rounded-full bg-primary/10 p-1">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  Weekly insights
                </div>
                <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground bg-background/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <div className="rounded-full bg-primary/10 p-1">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  No spam
                </div>
                <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground bg-background/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <div className="rounded-full bg-primary/10 p-1">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  Unsubscribe anytime
                </div>
              </div>
            </div>

            {/* Right content - Responsive subscription form */}
            <div className="bg-card/50 backdrop-blur-sm rounded-none border border-border/50 p-4 sm:p-6 md:p-8 shadow-lg mx-4 sm:mx-6 lg:mx-0">
              <div className="space-y-4 sm:space-y-5 md:space-y-6">
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-foreground block">
                    Email Address
                  </label>
                  <div className="relative group">
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 rounded-none bg-background border border-border 
                         focus:border-primary focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-primary/10 
                         transition-all duration-200 text-sm sm:text-base text-foreground placeholder:text-muted-foreground/50
                         group-hover:border-primary/50"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground/30"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full group relative overflow-hidden rounded-none text-sm sm:text-base py-3 sm:py-4"
                >
                  <span className="relative z-10 flex items-center justify-center gap-1 sm:gap-2">
                    Subscribe to newsletter
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                  </span>

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
                </Button>

                <p className="text-xs text-center text-muted-foreground/60 px-2">
                  By subscribing, you agree to our Terms of Service
                  and Privacy Policy. We respect your inbox and will
                  only send relevant content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer - Responsive Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1 text-center sm:text-left">
            <div className="flex justify-center sm:justify-start">
              <Link
                to="/"
                className="flex items-center gap-2 mb-4 sm:mb-5 md:mb-6"
              >
                <img
                  src={Logo}
                  alt="GM IT Solution Logo"
                  className="h-8 sm:h-9 md:h-10 w-auto"
                />
              </Link>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground mb-5 sm:mb-6 leading-relaxed px-4 sm:px-0">
              We build digital products that grow businesses. Modern,
              reliable, and global-standard IT solutions for startups
              and enterprises.
            </p>
            <div className="flex gap-2 sm:gap-3 justify-center sm:justify-start">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300"
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-foreground mb-4 sm:mb-5 md:mb-6 text-base sm:text-lg">
              Quick Links
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-foreground mb-4 sm:mb-5 md:mb-6 text-base sm:text-lg">
              Services
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {services.map((service) => (
                <li key={service.path}>
                  <Link
                    to={service.path}
                    className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="sm:col-span-2 lg:col-span-1 text-center sm:text-left">
            <h4 className="font-semibold text-foreground mb-4 sm:mb-5 md:mb-6 text-base sm:text-lg">
              Contact Us
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-center sm:items-start justify-center sm:justify-start gap-2 sm:gap-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <span className="text-sm sm:text-base text-muted-foreground break-all">
                  hello@gmitsolution.com
                </span>
              </li>
              <li className="flex items-center sm:items-start justify-center sm:justify-start gap-2 sm:gap-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <span className="text-sm sm:text-base text-muted-foreground">
                  +1 (555) 123-4567
                </span>
              </li>
              <li className="flex items-start justify-center sm:justify-start gap-2 sm:gap-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-muted-foreground max-w-[200px] sm:max-w-none">
                  123 Tech Street, Silicon Valley, CA 94025
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright - Responsive */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 md:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
            <p className="text-xs sm:text-sm text-muted-foreground order-2 sm:order-1">
              © {new Date().getFullYear()} GM IT Solution. All rights
              reserved.
            </p>
            <div className="flex gap-4 sm:gap-6 order-1 sm:order-2">
              <Link
                to="/privacy"
                className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
