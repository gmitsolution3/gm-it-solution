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
import { motion } from 'framer-motion';
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
      {/* Newsletter Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/5 border-y border-border">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-16 relative">
          <div className="">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left content with enhanced typography */}
              <div className="space-y-4">
                <h3 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                  Subscribe to Our Newsletter
                </h3>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Join our community of forward-thinking
                  professionals. Get weekly insights, industry trends,
                  and exclusive content delivered straight to your
                  inbox.
                </p>

                {/* Feature list */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="rounded-full bg-primary/10 p-1">
                      <svg
                        className="w-4 h-4 text-primary"
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
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="rounded-full bg-primary/10 p-1">
                      <svg
                        className="w-4 h-4 text-primary"
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
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="rounded-full bg-primary/10 p-1">
                      <svg
                        className="w-4 h-4 text-primary"
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

              {/* Right content - Enhanced subscription form */}
              <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground block">
                      Email Address
                    </label>
                    <div className="relative group">
                      <input
                        type="email"
                        placeholder="you@example.com"
                        className="w-full px-4 py-4 rounded-xl bg-background border border-border 
                           focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 
                           transition-all duration-200 text-foreground placeholder:text-muted-foreground/50
                           group-hover:border-primary/50"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg
                          className="w-5 h-5 text-muted-foreground/30"
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
                    className="w-full group relative overflow-hidden rounded-none"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Subscribe to newsletter
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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

                  <p className="text-xs text-center text-muted-foreground/60">
                    By subscribing, you agree to our Terms of Service
                    and Privacy Policy. We respect your inbox and will
                    only send relevant content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <img src={Logo} alt="GM IT Solution Logo" className="h-10 w-auto" />
            </Link>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We build digital products that grow businesses. Modern,
              reliable, and global-standard IT solutions for startups
              and enterprises.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.path}>
                  <Link
                    to={service.path}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-0.5" />
                <span className="text-muted-foreground">
                  hello@gmitsolution.com
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-0.5" />
                <span className="text-muted-foreground">
                  +1 (555) 123-4567
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <span className="text-muted-foreground">
                  123 Tech Street, Silicon Valley, CA 94025
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} GM IT Solution. All rights
              reserved.
            </p>
            <div className="flex gap-6">
              <Link
                to="/privacy"
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
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
