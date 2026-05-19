"use client";

import CareerEmpty from "@/components/career/CareerEmpty";
import CareerError from "@/components/career/CareerError";
import CareerLoading from "@/components/career/CareerLoading";
import { useFetch } from "@/hooks/swr/useFetch";
import { formatDate, formatSalary } from "@/utils";
import { motion, Variants } from "framer-motion";
import {
  Briefcase,
  Calendar,
  ChevronRight,
  Clock,
  DollarSign,
  MapPin,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const containerVariants: Variants = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
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

const headerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function Career() {
  const { data, isLoading, isError } = useFetch("/job-postings");

  const jobs = data?.data || [];

  const isDeadlinePassed = (deadline: string) => {
    return new Date(deadline) < new Date();
  };

  const activeJobs = jobs.filter((job: any) => job.isActive === true);

  return (
    <div className="pt-32 pb-20 bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12"
          variants={headerVariants}
          initial="hidden"
          animate="show"
        >
          <div className="flex justify-center mb-6">
            <Link href="/">
              <Image
                src={"/logo.png"}
                alt="GM IT Solution Logo"
                className="h-12 sm:h-14 md:h-16 w-auto cursor-pointer"
                height={200}
                width={200}
              />
            </Link>
          </div>

          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
          >
            Join Our Team
          </motion.h1>

          <p className="text-muted-foreground text-lg">
            Discover exciting career opportunities at GM IT Solution
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading && <CareerLoading />}

        {/* Error State */}
        {isError && !isLoading && <CareerError />}

        {/* No Jobs State */}
        {!isLoading && !isError && activeJobs.length === 0 && (
          <CareerEmpty />
        )}

        {/* Jobs Grid */}
        {!isLoading && !isError && activeJobs.length > 0 && (
          <>
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{
                once: true,
                margin: "-50px",
              }}
            >
              {activeJobs.map((job: any, index: number) => {
                const deadlinePassed = isDeadlinePassed(
                  job.applicationDeadline,
                );

                return (
                  <motion.div
                    key={job._id}
                    variants={itemVariants}
                    className="group relative bg-card border border-border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      {deadlinePassed ? (
                        <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-destructive/10 text-destructive border border-destructive/20">
                          Deadline Passed
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-green-500/10 text-green-600 border border-green-500/20">
                          Open
                        </span>
                      )}
                    </div>

                    {/* Job Title */}
                    <div className="mb-4 pr-20">
                      <h2 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {job.title}
                      </h2>

                      <p className="text-sm text-muted-foreground">
                        {job.department}
                      </p>
                    </div>

                    {/* Job Details Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 flex-shrink-0" />

                        <span>{job.location}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Briefcase className="w-4 h-4 flex-shrink-0" />

                        <span>{job.employmentType}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 flex-shrink-0" />

                        <span>{job.workplaceType}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4 flex-shrink-0" />

                        <span>{job.experienceLevel}</span>
                      </div>
                    </div>

                    {/* Salary */}
                    <div className="flex items-center gap-2 mb-4 p-3 bg-primary/5 rounded-lg">
                      <DollarSign className="w-4 h-4 text-primary" />

                      <span className="text-sm font-medium text-foreground">
                        {formatSalary(job.salaryRange)}
                      </span>
                    </div>

                    {/* Skills Tags */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {job.skills
                          ?.slice(0, 4)
                          .map((skill: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground"
                            >
                              {skill}
                            </span>
                          ))}

                        {job.skills?.length > 4 && (
                          <span className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground">
                            +{job.skills.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Deadline & Openings */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />

                        <span>
                          Deadline:{" "}
                          {formatDate(job.applicationDeadline)}
                        </span>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        {job.openings} opening
                        {job.openings !== 1 ? "s" : ""}
                      </div>
                    </div>

                    {/* View Details Button */}
                    <Link
                      href={`/career/${job._id}`}
                      className="mt-4 w-full inline-flex items-center justify-between px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 group/btn"
                    >
                      <span className="text-sm font-medium">
                        View Details
                      </span>

                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Why Join Us Section */}
            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.3,
              }}
              viewport={{
                once: true,
              }}
              className="mt-20 max-w-4xl mx-auto"
            >
              <div className="bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-2xl p-8 border border-border">
                <h3 className="text-2xl font-bold text-center mb-8">
                  Why Join GM IT Solution?
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Briefcase className="w-6 h-6 text-primary" />
                    </div>

                    <h4 className="font-semibold mb-1">
                      Career Growth
                    </h4>

                    <p className="text-sm text-muted-foreground">
                      Continuous learning and professional development
                      opportunities
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="w-6 h-6 text-primary" />
                    </div>

                    <h4 className="font-semibold mb-1">
                      Great Culture
                    </h4>

                    <p className="text-sm text-muted-foreground">
                      Collaborative environment with talented
                      professionals
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>

                    <h4 className="font-semibold mb-1">
                      Work-Life Balance
                    </h4>

                    <p className="text-sm text-muted-foreground">
                      Flexible arrangements and supportive policies
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
