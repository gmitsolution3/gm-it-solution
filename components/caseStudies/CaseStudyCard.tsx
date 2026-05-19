import { ICaseStudy } from "@/types";
import { Variants, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function CaseStudyCard({
  project,
}: {
  project: ICaseStudy;
}) {
  return (
    <motion.div
      variants={cardVariants}
      className="grid lg:grid-cols-2 gap-10 items-center bg-card border border-border rounded-none p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      {/* Left */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-8 flex items-center justify-center bg-primary/10 text-primary rounded-none text-sm font-semibold">
            {project.portfolioId.title.charAt(0)}
          </span>

          <h2 className="text-2xl font-semibold">
            {project.portfolioId.title}
          </h2>
        </div>

        <p className="text-muted-foreground leading-relaxed mb-6">
          {project.portfolioId.description}
        </p>

        <Button
          variant="secondary"
          size="lg"
          asChild
          className="group relative overflow-hidden hover:scale-105 transition-transform rounded-none"
        >
          <Link href={`/case-studies/${project._id}`}>
            <span className="relative z-10 flex items-center gap-2 group-hover:text-white">
              Learn More
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
      </div>

      {/* Right */}
      <div className="relative h-[260px] lg:h-[320px] w-full overflow-hidden rounded-none shadow-lg group">
        <Image
          src={project.portfolioId.image}
          alt={project.portfolioId.title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-top rounded-none transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}
