import React from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  CheckCircle,
  Users,
  Clock,
  Briefcase,
  MapPin,
  Calendar
} from "lucide-react";
import { formatDate, formatSalary } from "@/utils";

export default function CarrierDetailSection({
  containerVariants,
  itemVariants,
  job,
  isDeadlinePassed,
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Job Title and Status */}
      <motion.div
        variants={itemVariants}
        className="bg-card border border-border rounded-2xl p-6"
      >
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            {job.title}
          </h1>
          {isDeadlinePassed ? (
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-destructive/10 text-destructive border border-destructive/20">
              Deadline Passed
            </span>
          ) : (
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-500/10 text-green-600 border border-green-500/20">
              Accepting Applications
            </span>
          )}
        </div>
        <p className="text-muted-foreground">{job.department}</p>
      </motion.div>

      {/* Key Information Grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 gap-4"
      >
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Location</span>
          </div>
          <p className="font-medium">{job.location}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Briefcase className="w-4 h-4" />
            <span className="text-sm">Employment Type</span>
          </div>
          <p className="font-medium">{job.employmentType}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Workplace</span>
          </div>
          <p className="font-medium">{job.workplaceType}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Users className="w-4 h-4" />
            <span className="text-sm">Experience</span>
          </div>
          <p className="font-medium">
            {job.experienceLevel} ({job.experienceRequired})
          </p>
        </div>
      </motion.div>

      {/* Salary */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-5 border border-primary/20"
      >
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="w-5 h-5 text-primary" />
          <span className="font-semibold">Salary Range</span>
        </div>
        <p className="text-lg font-bold text-primary">
          {formatSalary(job.salaryRange)}
        </p>
      </motion.div>

      {/* Description */}
      <motion.div
        variants={itemVariants}
        className="bg-card border border-border rounded-2xl p-6"
      >
        <h2 className="text-lg font-semibold mb-3">
          Job Description
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {job.description}
        </p>
      </motion.div>

      {/* Responsibilities */}
      <motion.div
        variants={itemVariants}
        className="bg-card border border-border rounded-2xl p-6"
      >
        <h2 className="text-lg font-semibold mb-3">
          Key Responsibilities
        </h2>
        <ul className="space-y-2">
          {job.responsibilities?.map((item: string, idx: number) => (
            <li
              key={idx}
              className="flex items-start gap-2 text-muted-foreground"
            >
              <span className="text-primary mt-1">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Requirements */}
      <motion.div
        variants={itemVariants}
        className="bg-card border border-border rounded-2xl p-6"
      >
        <h2 className="text-lg font-semibold mb-3">Requirements</h2>
        <ul className="space-y-2">
          {job.requirements?.map((item: string, idx: number) => (
            <li
              key={idx}
              className="flex items-start gap-2 text-muted-foreground"
            >
              <span className="text-primary mt-1">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Skills */}
      <motion.div
        variants={itemVariants}
        className="bg-card border border-border rounded-2xl p-6"
      >
        <h2 className="text-lg font-semibold mb-3">
          Required Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {job.skills?.map((skill: string, idx: number) => (
            <span
              key={idx}
              className="px-3 py-1.5 text-sm rounded-lg bg-primary/10 text-primary font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Benefits */}
      <motion.div
        variants={itemVariants}
        className="bg-card border border-border rounded-2xl p-6"
      >
        <h2 className="text-lg font-semibold mb-3">What We Offer</h2>
        <ul className="space-y-2">
          {job.benefits?.map((item: string, idx: number) => (
            <li
              key={idx}
              className="flex items-start gap-2 text-muted-foreground"
            >
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Additional Info */}
      <motion.div
        variants={itemVariants}
        className="bg-card border border-border rounded-2xl p-6"
      >
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">
              Application Deadline:{" "}
              {formatDate(job.applicationDeadline)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span className="text-sm">
              {job.openings} opening{job.openings !== 1 ? "s" : ""}{" "}
              available
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
