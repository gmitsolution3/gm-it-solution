"use client";

import { Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { CTASection } from "@/components/home/CTASection";
import Anik from "@/assets/anik.jpeg";
import Sabbir from "@/assets/sabbir.jpeg";
import Siam from "@/assets/siam.jpeg";
import Moin from "@/assets/moin.jpg";
import Mariam from "@/assets/mariam.png";
import Kawsar from "@/assets/kawsar.png";
import Musfiqur from "@/assets/musfiqur.jpeg";


import AboutChairmanSection from './../components/About/AboutChairmanSection';
import AboutCeoSection from './../components/About/AboutCeoSection';

const team = [
  {
    name: "Morium Akter Jannatul",
    role: "Office Admin",
    image: Mariam,
    linkedin: "https://linkedin.com/in/mariamapu",
  },
  {
    name: "Anik Saha",
    role: "Product Manager",
    image: Anik,
    linkedin: "https://linkedin.com/in/aniksahaaorno",
  },
  {
    name: "Tariqul Islam Khan",
    role: "Full Stack Developer",
    image: Sabbir,
    linkedin: "https://www.linkedin.com/in/tariqul-islam-khan",
  },
  {
    name: "MD. Siam Hossain",
    role: "Graphic Designer",
    image: Siam,
    linkedin: "https://linkedin.com/in/siamvaiboss",
  },
  {
    name: "Moin Khan",
    role: "Frontend Developer",
    image: Moin,
    linkedin: "https://linkedin.com/in/nmkhans",
  },
  {
    name: "Musfiqur Rahman",
    role: "Video Editor",
    image: Musfiqur,
    linkedin: "https://linkedin.com/in/null",
  },
  {
    name: "Kawsar Ahmed",
    role: "Office Assistant",
    image: Kawsar,
    linkedin: "https://linkedin.com/in/null",
  },
];

const About = () => {
  return (
    <>
      {/* Hero Section - Responsive */}
      <section className="pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-16 sm:pb-20 md:pb-24 lg:pb-28 bg-gradient-to-b from-background to-muted/30 text-center relative overflow-hidden">
        {/* Background Decorative Elements - Hidden on mobile */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-48 sm:w-56 md:w-64 lg:w-72 h-48 sm:h-56 md:h-64 lg:h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-48 sm:w-56 md:w-64 lg:w-72 h-48 sm:h-56 md:h-64 lg:h-72 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="uppercase tracking-widest text-xs sm:text-sm text-primary font-medium mb-3 sm:mb-4">
              Who We Are
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4 sm:mb-5 md:mb-6 px-4 sm:px-0">
              Driving Digital Transformation at <br />
              <span className="text-primary block sm:inline">
                Global Scale
              </span>
            </h1>

            <div className="w-16 sm:w-20 md:w-24 h-1 bg-primary mx-auto mb-6 sm:mb-7 md:mb-8 rounded-full" />

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto px-4 sm:px-6 md:px-0">
              GM IT Solution is a leadership-driven technology firm
              delivering scalable, secure, and future-ready digital
              ecosystems for modern enterprises worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Chairman Section - Responsive */}
      <AboutChairmanSection />

      {/* CEO Section - Responsive */}
      <AboutCeoSection />

      {/* Team Section - Responsive */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-48 sm:w-56 md:w-64 lg:w-72 h-48 sm:h-56 md:h-64 lg:h-72 bg-primary/5 rounded-none blur-3xl" />
          <div className="absolute bottom-20 right-10 w-48 sm:w-56 md:w-64 lg:w-72 h-48 sm:h-56 md:h-64 lg:h-72 bg-accent/5 rounded-none blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-16"
          >
            <p className="uppercase tracking-widest text-xs sm:text-sm text-primary font-medium mb-3 sm:mb-4">
              Our Leadership
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5 md:mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent px-4">
              The People Behind the Vision
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed px-4 sm:px-6 md:px-8">
              Meet the exceptional leaders driving innovation and
              excellence at GM IT Solution. A team committed to
              transforming businesses through technology.
            </p>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-6 sm:mt-7 md:mt-8 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative bg-background/50 backdrop-blur-sm p-2 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
                  <div className="relative mb-4 sm:mb-5 md:mb-6">
                    <div className="relative overflow-hidden aspect-square">
                      <img
                        src={member.image}
                        alt={member.name}
                        className={`w-full h-full object-cover ${["MD. Siam Hossain", "Kawsar Ahmed"].includes(member.name) ? "object-center" : "object-top"}  transition-transform duration-700 group-hover:scale-110`}
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 group-hover:text-primary transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 font-medium">
                      {member.role}
                    </p>

                    <div className="flex items-center justify-center gap-3">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-muted/50 hover:bg-primary text-muted-foreground hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/25"
                        aria-label={`${member.name}'s LinkedIn profile`}
                      >
                        <Linkedin className="w-3 h-3 sm:w-4 sm:h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* <div className="absolute -inset-2 sm:-inset-3 md:-inset-4 bg-primary/5 rounded-full blur-2xl sm:blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" /> */}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default About;
