// components/modals/ViewSliderModal.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ISlider } from "@/types";
import { formatDate } from "@/utils";
import {
  ArrowRight,
  Calendar,
  ImageIcon,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";

interface ViewSliderModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  selectedSlider: ISlider | null;
}

export default function ViewSliderModal({
  isModalOpen,
  setIsModalOpen,
  selectedSlider,
}: ViewSliderModalProps) {
  if (!selectedSlider) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="!max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Slider Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Hero Image */}
          {selectedSlider.image && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Hero Image
              </h3>
              <div className="rounded-lg overflow-hidden border bg-muted h-48 relative">
                <Image
                  src={selectedSlider.image}
                  alt={selectedSlider.title}
                  className="w-full h-full object-cover"
                  height={500}
                  width={500}
                />
              </div>
            </div>
          )}

          {/* Title and Highlight */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Title & Highlight
            </h3>
            <div className="text-xl font-bold">
              {selectedSlider.title}{" "}
              {selectedSlider.highlight && (
                <span className="text-primary">
                  {selectedSlider.highlight}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Description
            </h3>
            <p className="text-base leading-relaxed">
              {selectedSlider.description}
            </p>
          </div>

          {/* Call to Action Buttons */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Call to Action Buttons
            </h3>
            <div className="flex gap-3">
              {selectedSlider.ctaPrimary && (
                <Badge
                  variant="default"
                  className="gap-1 p-3 text-sm text-white"
                >
                  {selectedSlider.ctaPrimary}
                  <ArrowRight className="h-3 w-3" />
                </Badge>
              )}
              {selectedSlider.ctaSecondary && (
                <Badge
                  variant="outline"
                  className="gap-1 p-3 text-sm"
                >
                  <MessageCircle className="h-3 w-3" />
                  {selectedSlider.ctaSecondary}
                </Badge>
              )}
            </div>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-xs text-muted-foreground">Created</p>
              <p className="text-sm font-medium flex items-center mt-1">
                <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                {formatDate(selectedSlider.createdAt)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">
                Last Updated
              </p>
              <p className="text-sm font-medium flex items-center mt-1">
                <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                {formatDate(selectedSlider.updatedAt)}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-muted-foreground">ID</p>
              <p className="text-xs font-mono mt-1">
                {selectedSlider._id}
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
