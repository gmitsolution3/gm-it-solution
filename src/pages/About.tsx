"use client";

import { Layout } from "@/components/layout/Layout";
import { Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { CTASection } from "@/components/home/CTASection";

const team = [
  {
    name: "David Khan",
    role: "Chief Technology Officer",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBvqzyx_zoi6q2c0Gd1XnE7wysD9PGOLe3-A&s",
    linkedin: "#",
  },
  {
    name: "Sarah Ahmed",
    role: "Lead Designer",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBvqzyx_zoi6q2c0Gd1XnE7wysD9PGOLe3-A&s",
    linkedin: "#",
  },
  {
    name: "Michael Lee",
    role: "Project Manager",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBvqzyx_zoi6q2c0Gd1XnE7wysD9PGOLe3-A&s",
    linkedin: "#",
  },
  {
    name: "John Smith",
    role: "Senior Developer",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBvqzyx_zoi6q2c0Gd1XnE7wysD9PGOLe3-A&s",
    linkedin: "#",
  },
];

const About = () => {
  return (
    <Layout>
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
              Driving Digital Transformation at{" "} <br />
              <span className="text-primary block sm:inline">Global Scale</span>
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
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-40 right-0 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative order-1 lg:order-1"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-2xl -z-10" />
              <div className="flex justify-center">
                <img
                  src="https://www.shutterstock.com/image-photo/happy-mid-aged-older-business-600nw-2322385015.jpg"
                  alt="Chairman"
                  className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 object-cover rounded-full shadow-2xl border-4 border-primary/70 mx-auto hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-2 text-center lg:text-left"
            >
              <p className="uppercase tracking-widest text-xs sm:text-sm text-primary font-medium mb-2 sm:mb-3">
                Leadership Message
              </p>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent px-4 sm:px-0">
                Message from the Chairman
              </h2>

              <div className="w-16 h-1 bg-primary mb-5 sm:mb-6 rounded-full mx-auto lg:mx-0" />

              <p className="text-muted-foreground leading-relaxed mb-5 sm:mb-6 text-base sm:text-lg px-4 sm:px-6 lg:px-0">
                From inception, our mission has been clear — empower
                businesses through strategic digital innovation. At GM
                IT Solution, we believe technology must not only solve
                problems but unlock new growth opportunities for the
                future.
              </p>

              <div className="rounded-xl overflow-hidden shadow-lg border border-border/50 hover:shadow-2xl transition-shadow duration-500 mx-4 sm:mx-6 lg:mx-0">
                <iframe
                  className="w-full h-48 sm:h-56 md:h-64"
                  src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                  title="Chairman Message"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CEO Section - Responsive */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-muted/40 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-40 left-0 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1 text-center lg:text-left"
            >
              <p className="uppercase tracking-widest text-xs sm:text-sm text-primary font-medium mb-2 sm:mb-3">
                Strategic Vision
              </p>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent px-4 sm:px-0">
                CEO’s Vision & Direction
              </h2>

              <div className="w-16 h-1 bg-primary mb-5 sm:mb-6 rounded-full mx-auto lg:mx-0" />

              <blockquote className="border-l-4 border-primary pl-4 sm:pl-6 italic text-muted-foreground mb-5 sm:mb-6 text-base sm:text-lg mx-4 sm:mx-6 lg:mx-0 text-left">
                “Innovation is not optional — it is our responsibility.”
              </blockquote>

              <p className="text-muted-foreground leading-relaxed mb-5 sm:mb-6 text-base sm:text-lg px-4 sm:px-6 lg:px-0">
                Our leadership philosophy focuses on agility,
                measurable results, and long-term client partnerships.
                Every solution we design aligns with business
                scalability and global standards.
              </p>

              <div className="rounded-xl overflow-hidden shadow-lg border border-border/50 hover:shadow-2xl transition-shadow duration-500 mx-4 sm:mx-6 lg:mx-0">
                <iframe
                  className="w-full h-48 sm:h-56 md:h-64"
                  src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                  title="CEO Message"
                  allowFullScreen
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative order-1 lg:order-2"
            >
              <div className="absolute inset-0 bg-gradient-to-tl from-primary/20 to-transparent rounded-full blur-2xl -z-10" />
              <div className="flex justify-center">
                <img
                  src="https://www.shutterstock.com/image-photo/happy-mid-aged-older-business-600nw-2322385015.jpg"
                  alt="CEO"
                  className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 object-cover rounded-full shadow-2xl border-4 border-primary/70 mx-auto hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

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
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative overflow-hidden aspect-square">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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

                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 transition-all duration-500 pointer-events-none" />
                </div>

                <div className="absolute -inset-2 sm:-inset-3 md:-inset-4 bg-primary/5 rounded-full blur-2xl sm:blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default About;