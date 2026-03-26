// components/modals/AdminJobDetailModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  Briefcase,
  DollarSign,
  Users,
  Clock,
  Mail,
  Building,
  Target,
  CheckCircle2,
  Gift,
  Code,
} from "lucide-react";
import { formatDate, formatSalary } from "@/utils";
import { IJobPosting } from "@/types";

interface AdminJobDetailModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  selectedJob: IJobPosting | null;
}

export default function AdminJobDetailModal({
  isModalOpen,
  setIsModalOpen,
  selectedJob,
}: AdminJobDetailModalProps) {
  if (!selectedJob) return null;

  const isExpired =
    new Date(selectedJob.applicationDeadline) < new Date();

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Job Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Title and Status */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">
                {selectedJob.title}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {selectedJob.department}
              </p>
            </div>
            <div className="flex gap-2">
              {selectedJob.isActive ? (
                <Badge variant="default" className="gap-1">
                  Active
                </Badge>
              ) : (
                <Badge variant="destructive" className="gap-1">
                  Inactive
                </Badge>
              )}
              {isExpired && (
                <Badge variant="destructive" className="gap-1">
                  Expired
                </Badge>
              )}
            </div>
          </div>

          {/* Job Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
            <div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                Location
              </p>
              <p className="text-sm font-medium mt-1">
                {selectedJob.location}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Briefcase className="h-3 w-3" />
                Employment Type
              </p>
              <p className="text-sm font-medium mt-1">
                {selectedJob.employmentType}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Building className="h-3 w-3" />
                Workplace Type
              </p>
              <p className="text-sm font-medium mt-1">
                {selectedJob.workplaceType}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Target className="h-3 w-3" />
                Experience Level
              </p>
              <p className="text-sm font-medium mt-1">
                {selectedJob.experienceLevel}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Experience Required
              </p>
              <p className="text-sm font-medium mt-1">
                {selectedJob.experienceRequired}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                Salary Range
              </p>
              <p className="text-sm font-medium mt-1">
                {formatSalary(selectedJob.salaryRange)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Users className="h-3 w-3" />
                Openings
              </p>
              <p className="text-sm font-medium mt-1">
                {selectedJob.openings}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Application Deadline
              </p>
              <p
                className={`text-sm font-medium mt-1 ${isExpired ? "text-destructive" : ""}`}
              >
                {formatDate(selectedJob.applicationDeadline)}
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Job Description
            </h3>
            <p className="text-base leading-relaxed">
              {selectedJob.description}
            </p>
          </div>

          {/* Responsibilities */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Key Responsibilities
            </h3>
            <ul className="space-y-2">
              {selectedJob.responsibilities.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm"
                >
                  <span className="text-primary mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Requirements
            </h3>
            <ul className="space-y-2">
              {selectedJob.requirements.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm"
                >
                  <span className="text-primary mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
              <Code className="h-4 w-4" />
              Required Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedJob.skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="px-3 py-1"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
              <Gift className="h-4 w-4" />
              Benefits
            </h3>
            <ul className="space-y-2">
              {selectedJob.benefits.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm"
                >
                  <span className="text-primary mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Email */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Contact Email
            </h3>
            <a
              href={`mailto:${selectedJob.contactEmail}`}
              className="text-blue-600 hover:underline text-sm"
            >
              {selectedJob.contactEmail}
            </a>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-xs text-muted-foreground">Created</p>
              <p className="text-sm font-medium flex items-center mt-1">
                <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                {formatDate(selectedJob.createdAt)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">
                Last Updated
              </p>
              <p className="text-sm font-medium flex items-center mt-1">
                <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                {formatDate(selectedJob.updatedAt)}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-muted-foreground">ID</p>
              <p className="text-xs font-mono mt-1">
                {selectedJob._id}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              className="hover:text-white"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
