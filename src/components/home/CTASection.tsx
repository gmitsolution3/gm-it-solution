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
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center space-y-8"
        >
          {/* Heading */}
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-foreground tracking-tight">
              Ready to build something{" "}
              <span className="gradient-text">amazing?</span>
            </h2>
            <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Let's turn your ideas into reality. Get a free consultation today.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="hero" size="lg" asChild className="rounded-none text-white">
              <Link to="/contact">
                Start Your Project
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild className="rounded-none">
              <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>
            </Button>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="pt-4 flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
          >
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                <span className="text-xs text-muted-foreground mt-0.5">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};