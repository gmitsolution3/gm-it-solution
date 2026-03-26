// components/modals/AdminJobApplicationModal.tsx
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
  Mail,
  Phone,
  User,
  FileText,
  ExternalLink,
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  Download,
} from "lucide-react";
import { formatDate, formatPrice } from "@/utils";

interface IJobApplication {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  jobId?: {
    _id: string;
    title: string;
    department: string;
    location: string;
    employmentType: string;
    workplaceType: string;
    experienceLevel: string;
    experienceRequired: string;
    salaryRange: {
      min: number;
      max: number;
      currency: string;
      period: string;
    };
  };
  coverLetter: string;
  portfolioUrl?: string;
  resume: string;
  createdAt: string;
  updatedAt: string;
}

interface AdminJobApplicationModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  selectedApplication: IJobApplication | null;
}

export default function AdminJobApplicationModal({
  isModalOpen,
  setIsModalOpen,
  selectedApplication,
}: AdminJobApplicationModalProps) {
  if (!selectedApplication) return null;

  const handleDownloadResume = () => {
    window.open(selectedApplication.resume, "_blank");
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Application Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <User className="h-4 w-4" />
              Personal Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Full Name</p>
                <p className="font-medium mt-1">{selectedApplication.fullName}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <a
                  href={`mailto:${selectedApplication.email}`}
                  className="text-blue-600 hover:underline text-sm flex items-center gap-1 mt-1"
                >
                  <Mail className="h-3 w-3" />
                  {selectedApplication.email}
                </a>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="font-medium mt-1 flex items-center gap-1">
                  <Phone className="h-3 w-3 text-muted-foreground" />
                  {selectedApplication.phone}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Applied On</p>
                <p className="font-medium mt-1 flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  {formatDate(selectedApplication.createdAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Job Information */}
          {selectedApplication.jobId && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Job Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Position</p>
                  <p className="font-medium mt-1">{selectedApplication.jobId.title}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Department</p>
                  <p className="font-medium mt-1">{selectedApplication.jobId.department}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="font-medium mt-1 flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    {selectedApplication.jobId.location}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Employment Type</p>
                  <Badge variant="secondary" className="mt-1">
                    {selectedApplication.jobId.employmentType}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Salary Range</p>
                  <p className="font-medium mt-1 flex items-center gap-1">
                    <DollarSign className="h-3 w-3 text-muted-foreground" />
                    {formatPrice(selectedApplication.jobId.salaryRange.min)} -{" "}
                    {formatPrice(selectedApplication.jobId.salaryRange.max)}/
                    {selectedApplication.jobId.salaryRange.period}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Experience</p>
                  <p className="font-medium mt-1">
                    {selectedApplication.jobId.experienceLevel} •{" "}
                    {selectedApplication.jobId.experienceRequired}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Resume */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Resume/CV
            </h3>
            <div className="flex gap-2">
              <Button
                onClick={handleDownloadResume}
                variant="outline"
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </Button>
              <Button
                onClick={() => window.open(selectedApplication.resume, "_blank")}
                variant="outline"
                className="gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                View in Browser
              </Button>
            </div>
          </div>

          {/* Portfolio */}
          {selectedApplication.portfolioUrl && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                Portfolio / Website
              </h3>
              <a
                href={selectedApplication.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline flex items-center gap-1 text-sm"
              >
                <ExternalLink className="h-3 w-3" />
                {selectedApplication.portfolioUrl}
              </a>
            </div>
          )}

          {/* Cover Letter */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Cover Letter
            </h3>
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="text-sm whitespace-pre-wrap leading-relaxed">
                {selectedApplication.coverLetter}
              </p>
            </div>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-xs text-muted-foreground">Application ID</p>
              <p className="text-xs font-mono mt-1">{selectedApplication._id}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Last Updated</p>
              <p className="text-sm font-medium flex items-center mt-1">
                <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                {formatDate(selectedApplication.updatedAt)}
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
            <Button
              onClick={() => (window.location.href = `mailto:${selectedApplication.email}`)}
              className="text-white gap-2"
            >
              <Mail className="h-4 w-4" />
              Contact Applicant
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}