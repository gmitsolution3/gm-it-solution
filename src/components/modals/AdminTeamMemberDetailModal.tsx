// components/modals/AdminTeamMemberDetailModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Linkedin, User, Calendar } from "lucide-react";
import { formatDate } from "@/utils";
import { ITeamMember } from "@/types";

interface AdminTeamMemberDetailModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  selectedMember: ITeamMember | null;
}

export default function AdminTeamMemberDetailModal({
  isModalOpen,
  setIsModalOpen,
  selectedMember,
}: AdminTeamMemberDetailModalProps) {
  if (!selectedMember) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Team Member Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Image */}
          <div className="flex justify-center">
            <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border-4 border-primary/20">
              {selectedMember.image ? (
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="h-16 w-16 text-primary" />
              )}
            </div>
          </div>

          {/* Name and Role */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">
              {selectedMember.name}
            </h2>
            <Badge className="text-sm px-3 py-1 text-white">
              {selectedMember.role}
            </Badge>
          </div>

          {/* LinkedIn Profile */}
          {selectedMember.linkedin && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                LinkedIn Profile
              </h3>
              <a
                href={selectedMember.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 hover:underline group"
              >
                <span className="truncate">
                  {selectedMember.linkedin}
                </span>
              </a>
            </div>
          )}

          {/* Metadata - Optional timestamps */}
          {(selectedMember.createdAt || selectedMember.updatedAt) && (
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              {selectedMember.createdAt && (
                <div>
                  <p className="text-xs text-muted-foreground">
                    Added
                  </p>
                  <p className="text-sm font-medium flex items-center mt-1">
                    <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                    {formatDate(selectedMember.createdAt)}
                  </p>
                </div>
              )}
              {selectedMember.updatedAt &&
                selectedMember.createdAt !==
                  selectedMember.updatedAt && (
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Last Updated
                    </p>
                    <p className="text-sm font-medium flex items-center mt-1">
                      <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                      {formatDate(selectedMember.updatedAt)}
                    </p>
                  </div>
                )}
              <div
                className={
                  selectedMember.createdAt
                    ? "col-span-2"
                    : "col-span-2"
                }
              >
                <p className="text-xs text-muted-foreground">ID</p>
                <p className="text-xs font-mono mt-1">
                  {selectedMember._id}
                </p>
              </div>
            </div>
          )}

          {/* If no timestamps, show just ID */}
          {!selectedMember.createdAt && !selectedMember.updatedAt && (
            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground">ID</p>
              <p className="text-xs font-mono mt-1">
                {selectedMember._id}
              </p>
            </div>
          )}

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
