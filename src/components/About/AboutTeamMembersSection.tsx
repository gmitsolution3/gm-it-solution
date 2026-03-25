import React from "react";
import { Linkedin } from "lucide-react";
import Anik from "@/assets/anik.jpeg";
import Sabbir from "@/assets/sabbir.jpeg";
import Siam from "@/assets/siam.jpeg";
import Moin from "@/assets/moin.jpg";
import Mariam from "@/assets/mariam.png";
import Kawsar from "@/assets/kawsar.png";
import Musfiqur from "@/assets/musfiqur.jpeg";
import { motion } from "framer-motion";
import { ITeamMember } from "@/types";

export default function AboutTeamMembersSection({ teamMembers }) {
  return (
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
          {teamMembers?.map((member: ITeamMember, index: number) => (
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
  );
}
