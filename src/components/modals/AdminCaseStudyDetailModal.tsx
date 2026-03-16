// components/modals/AdminCaseStudyDetailModal.tsx
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
  Code2,
  ListChecks,
  Target,
  Lightbulb,
  TrendingUp,
  Briefcase,
} from "lucide-react";
import { formatDate } from "@/utils";
import { ICaseStudy } from "@/types";

interface AdminCaseStudyDetailModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  selectedCaseStudy: ICaseStudy | null;
}

export default function AdminCaseStudyDetailModal({
  isModalOpen,
  setIsModalOpen,
  selectedCaseStudy,
}: AdminCaseStudyDetailModalProps) {
  if (!selectedCaseStudy) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Case Study Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Portfolio Reference */}
          {selectedCaseStudy.portfolioId && (
            <div className="rounded-lg border bg-muted/30 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-medium">
                  Portfolio Item
                </h3>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded bg-primary/10 flex items-center justify-center overflow-hidden">
                  {selectedCaseStudy.portfolioId.image ? (
                    <img
                      src={selectedCaseStudy.portfolioId.image}
                      alt={selectedCaseStudy.portfolioId.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-lg font-semibold text-primary">
                      {selectedCaseStudy.portfolioId.title.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-medium">
                    {selectedCaseStudy.portfolioId.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedCaseStudy.portfolioId.category}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Overview */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Overview
            </h3>
            <p className="text-base leading-relaxed">
              {selectedCaseStudy.overview}
            </p>
          </div>

          {/* Challenge and Solution Grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Challenge */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Challenge
              </h3>
              <p className="text-sm leading-relaxed">
                {selectedCaseStudy.challenge}
              </p>
            </div>

            {/* Solution */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Solution
              </h3>
              <p className="text-sm leading-relaxed">
                {selectedCaseStudy.solution}
              </p>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
              <ListChecks className="h-4 w-4" />
              Features
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedCaseStudy.features.map((feature, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="px-3 py-1"
                >
                  {feature}
                </Badge>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
              <Code2 className="h-4 w-4" />
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedCaseStudy.technologies.map((tech, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="px-3 py-1"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Results */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Results
            </h3>
            <p className="text-base leading-relaxed">
              {selectedCaseStudy.results}
            </p>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-xs text-muted-foreground">Created</p>
              <p className="text-sm font-medium flex items-center mt-1">
                <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                {formatDate(selectedCaseStudy.createdAt)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">
                Last Updated
              </p>
              <p className="text-sm font-medium flex items-center mt-1">
                <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                {formatDate(selectedCaseStudy.updatedAt)}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-muted-foreground">ID</p>
              <p className="text-xs font-mono mt-1">
                {selectedCaseStudy._id}
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
