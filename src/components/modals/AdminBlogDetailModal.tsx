// components/modals/AdminBlogDetailModal.tsx
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
  User,
  Clock,
  Star,
  ImageIcon,
  CalendarDays,
} from "lucide-react";
import { formatDate } from "@/utils";
import { IBlog } from "@/types";

interface AdminBlogDetailModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  selectedBlog: IBlog | null;
}

export default function AdminBlogDetailModal({
  isModalOpen,
  setIsModalOpen,
  selectedBlog,
}: AdminBlogDetailModalProps) {
  if (!selectedBlog) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Blog Post Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Featured Image */}
          {selectedBlog.image && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Featured Image
              </h3>
              <div className="rounded-lg overflow-hidden border bg-muted h-64">
                <img
                  src={selectedBlog.image}
                  alt={selectedBlog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Title and Featured Badge */}
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-xl font-bold leading-tight">
              {selectedBlog.title}
            </h2>
            {selectedBlog.featured && (
              <Badge variant="default" className="gap-1 shrink-0">
                <Star className="h-3 w-3" />
                Featured
              </Badge>
            )}
          </div>

          {/* Meta Information */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>By {selectedBlog.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{selectedBlog.readTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Published: {formatDate(selectedBlog.date)}</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {selectedBlog.category}
            </Badge>
          </div>

          {/* Excerpt */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Excerpt
            </h3>
            <p className="text-base leading-relaxed italic text-muted-foreground">
              {selectedBlog.excerpt}
            </p>
          </div>

          {/* Full Content Placeholder */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Content
            </h3>
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="text-sm text-muted-foreground">
                Full blog content would appear here. This is a
                placeholder for the complete article content.
              </p>
            </div>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-xs text-muted-foreground">Created</p>
              <p className="text-sm font-medium flex items-center mt-1">
                <CalendarDays className="h-3 w-3 mr-1 text-muted-foreground" />
                {formatDate(selectedBlog.createdAt)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">
                Last Updated
              </p>
              <p className="text-sm font-medium flex items-center mt-1">
                <CalendarDays className="h-3 w-3 mr-1 text-muted-foreground" />
                {formatDate(selectedBlog.updatedAt)}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-muted-foreground">ID</p>
              <p className="text-xs font-mono mt-1">
                {selectedBlog._id}
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
