import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  const stats = [
    { value: "100+", label: "Projects Completed" },
    { value: "50+", label: "Happy Clients" },
    { value: "5+", label: "Years Experience" },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
      {/* Background Elements - Responsive blur and sizing */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] md:w-[800px] h-[200px] sm:h-[300px] md:h-[400px] bg-primary/20 rounded-full blur-[60px] sm:blur-[80px] md:blur-[120px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-7 md:space-y-8"
        >
          {/* Heading - Responsive typography */}
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight px-4 sm:px-0">
              Ready to build something{" "}
              <span className="gradient-text block sm:inline">amazing?</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed px-6 sm:px-8 md:px-0">
              Let's turn your ideas into reality. Get a free consultation today.
            </p>
          </div>

          {/* Actions - Responsive button layout */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
            <Button 
              variant="hero" 
              size="lg" 
              asChild 
              className="rounded-none text-white w-full sm:w-auto"
            >
              <Link to="/contact" className="flex items-center justify-center">
                Start Your Project
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
              </Link>
            </Button>
            <Button 
              variant="hero-outline" 
              size="lg" 
              asChild 
              className="rounded-none w-full sm:w-auto"
            >
              <a 
                href="https://wa.me/15551234567" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Chat on WhatsApp
              </a>
            </Button>
          </div>

          {/* Stats - Responsive grid layout */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="pt-4 sm:pt-6 md:pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-10 max-w-sm sm:max-w-none mx-auto"
          >
            {stats.map((stat, i) => (
              <div 
                key={i} 
                className="flex flex-col items-center bg-background/50 backdrop-blur-sm p-4 sm:p-0 sm:bg-transparent sm:backdrop-blur-none rounded-lg sm:rounded-none border border-border/50 sm:border-none"
              >
                <span className="text-xl sm:text-2xl md:text-2xl font-bold text-foreground">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-xs md:text-sm text-muted-foreground mt-0.5 sm:mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Optional: Trust Badge - Mobile only */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xs text-muted-foreground/60 block sm:hidden mt-4"
          >
            Trusted by 50+ businesses worldwide
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};