"use client";

import { Layout } from "@/components/layout/Layout";
import { Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import {CTASection} from "@/components/home/CTASection";

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
      <section className="pt-36 pb-28 bg-gradient-to-b from-background to-muted/30 text-center relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 max-w-5xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="uppercase tracking-widest text-sm text-primary font-medium mb-4">
              Who We Are
            </p>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              Driving Digital Transformation at <br />
              <span className="text-primary">Global Scale</span>
            </h1>

            <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full" />

            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              GM IT Solution is a leadership-driven technology firm
              delivering scalable, secure, and future-ready digital
              ecosystems for modern enterprises worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-28 bg-background relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-40 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-2xl -z-10" />
              <img
                src="https://www.shutterstock.com/image-photo/happy-mid-aged-older-business-600nw-2322385015.jpg"
                alt="Chairman"
                className="w-120 h-120 object-cover rounded-full shadow-2xl border-4 border-primary/70 mx-auto hover:scale-105 transition-transform duration-700"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="uppercase tracking-widest text-sm text-primary font-medium mb-3">
                Leadership Message
              </p>

              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Message from the Chairman
              </h2>

              <div className="w-16 h-1 bg-primary mb-6 rounded-full" />

              <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                From inception, our mission has been clear — empower
                businesses through strategic digital innovation. At GM
                IT Solution, we believe technology must not only solve
                problems but unlock new growth opportunities for the
                future.
              </p>

              <div className="rounded-xl overflow-hidden shadow-lg border border-border/50 hover:shadow-2xl transition-shadow duration-500">
                <iframe
                  className="w-full h-64"
                  src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                  title="Chairman Message"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-28 bg-muted/40 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-40 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="uppercase tracking-widest text-sm text-primary font-medium mb-3">
                Strategic Vision
              </p>

              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                CEO’s Vision & Direction
              </h2>

              <div className="w-16 h-1 bg-primary mb-6 rounded-full" />

              <blockquote className="border-l-4 border-primary pl-6 italic text-muted-foreground mb-6 text-lg">
                “Innovation is not optional — it is our
                responsibility.”
              </blockquote>

              <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                Our leadership philosophy focuses on agility,
                measurable results, and long-term client partnerships.
                Every solution we design aligns with business
                scalability and global standards.
              </p>

              <div className="rounded-xl overflow-hidden shadow-lg border border-border/50 hover:shadow-2xl transition-shadow duration-500">
                <iframe
                  className="w-full h-64"
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
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tl from-primary/20 to-transparent rounded-full blur-2xl -z-10" />
              <img
                src="https://www.shutterstock.com/image-photo/happy-mid-aged-older-business-600nw-2322385015.jpg"
                alt="CEO"
                className="w-120 h-120 object-cover rounded-full shadow-2xl border-4 border-primary/70 mx-auto hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-28 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <p className="uppercase tracking-widest text-sm text-primary font-medium mb-4">
              Our Leadership
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              The People Behind the Vision
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Meet the exceptional leaders driving innovation and
              excellence at GM IT Solution. A team committed to
              transforming businesses through technology.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-8 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative bg-background/50 backdrop-blur-sm rounded-none p-2 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative overflow-hidden rounded-none aspect-square">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 font-medium">
                      {member.role}
                    </p>

                    <div className="flex items-center justify-center gap-3">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted/50 hover:bg-primary text-muted-foreground hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/25"
                        aria-label={`${member.name}'s LinkedIn profile`}
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <div className="absolute inset-0 rounded-none border-2 border-transparent group-hover:border-primary/20 transition-all duration-500 pointer-events-none" />
                </div>

                <div className="absolute -inset-4 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
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
