import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CTAButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="text-center mt-15 relative"
    >
      <Button
        variant="secondary"
        size="lg"
        asChild
        className="rounded-none relative overflow-hidden"
      >
        <Link to={href}>
          {children}
          <ArrowRight className="w-5 h-5" />
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
  );
}
