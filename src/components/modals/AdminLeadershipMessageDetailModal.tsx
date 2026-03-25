// components/modals/AdminLeadershipMessageDetailModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Quote, Video, User, Play } from "lucide-react";
import { formatDate } from "@/utils";
import { ILeadershipMessage } from "@/types";

interface AdminLeadershipMessageDetailModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  selectedMessage: ILeadershipMessage | null;
}

export default function AdminLeadershipMessageDetailModal({
  isModalOpen,
  setIsModalOpen,
  selectedMessage,
}: AdminLeadershipMessageDetailModalProps) {
  if (!selectedMessage) return null;

  // Extract YouTube video ID from URL
  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return null;

    // Handle different YouTube URL formats
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  const embedUrl = getYouTubeEmbedUrl(selectedMessage.videoUrl);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Leadership Message
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Section */}
          <div className="flex items-center gap-4">
            {/* Profile Image */}
            <div className="flex-shrink-0 w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border-2 border-primary/20">
              {selectedMessage.image ? (
                <img
                  src={selectedMessage.image}
                  alt={selectedMessage.role}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="h-10 w-10 text-primary" />
              )}
            </div>

            {/* Role and Quote */}
            <div className="flex-1">
              <h2 className="text-xl font-bold capitalize">
                {selectedMessage.role}
              </h2>
              {selectedMessage.quote && (
                <div className="flex items-start gap-2 mt-2">
                  <Quote className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground italic">
                    "{selectedMessage.quote}"
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Full Message */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Message
            </h3>
            <div className="prose prose-sm max-w-none">
              <p className="text-base leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </p>
            </div>
          </div>

          {/* Video Section */}
          {selectedMessage.videoUrl && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <Video className="h-4 w-4" />
                Video Message
              </h3>
              <div className="rounded-lg overflow-hidden border bg-muted">
                {embedUrl &&
                embedUrl.includes("youtube.com/embed") ? (
                  <div className="aspect-video">
                    <iframe
                      src={embedUrl}
                      title="Leadership Message Video"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <a
                    href={selectedMessage.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-4 text-blue-600 hover:underline"
                  >
                    <Play className="h-4 w-4" />
                    <span>Watch video on external platform</span>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-xs text-muted-foreground">Created</p>
              <p className="text-sm font-medium flex items-center mt-1">
                <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                {formatDate(selectedMessage.createdAt)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">
                Last Updated
              </p>
              <p className="text-sm font-medium flex items-center mt-1">
                <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                {formatDate(selectedMessage.updatedAt)}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-muted-foreground">ID</p>
              <p className="text-xs font-mono mt-1">
                {selectedMessage._id}
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
