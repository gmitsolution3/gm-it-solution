"use client";

import CaseStudiesEmpty from "@/components/caseStudies/CaseStudiesEmpty";
import CaseStudiesLoading from "@/components/caseStudies/CaseStudiesLoading";
import CaseStudyCard from "@/components/caseStudies/CaseStudyCard";
import { useFetch } from "@/hooks/swr/useFetch";
import Logo from "@/public/logo.png";
import { ICaseStudy } from "@/types";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function CaseStudies() {
  const { data, isLoading } = useFetch("/case-studies");

  const caseStudies: ICaseStudy[] = data?.data || [];

  if (isLoading) {
    return <CaseStudiesLoading />;
  }

  return (
    <div className="pt-32 pb-20 bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Link href="/" className="flex justify-center mb-6">
            <Image
              src={Logo}
              alt="GM IT Solution Logo"
              priority
              quality={100}
              className="h-14 w-auto"
            />
          </Link>

          <h1 className="text-4xl font-bold mb-3">Case Studies</h1>

          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore the platforms, systems, and digital products we
            have built for businesses around the world.
          </p>
        </div>

        {caseStudies.length === 0 ? (
          <CaseStudiesEmpty />
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{
              once: true,
            }}
            className="space-y-16"
          >
            {caseStudies.map((project) => (
              <CaseStudyCard key={project._id} project={project} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
