"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Globe, ExternalLink } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "@/utils";
import { IPortfolioItem } from "@/types";

interface AdminPortfolioDetailModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  selectedPortfolio: IPortfolioItem | null;
}

export default function AdminPortfolioDetailModal({
  isModalOpen,
  setIsModalOpen,
  selectedPortfolio,
}: AdminPortfolioDetailModalProps) {
  if (!selectedPortfolio) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold pr-6">
            {selectedPortfolio.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image */}
          {selectedPortfolio.image && (
            <div className="rounded-lg overflow-hidden border bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedPortfolio.image}
                alt={selectedPortfolio.title}
                className="w-full h-auto object-cover max-h-[300px]"
              />
            </div>
          )}

          {/* Category Badge */}
          <div className="flex items-center gap-2">
            <Badge className="capitalize text-sm px-3 py-1 text-white">
              {selectedPortfolio.category}
            </Badge>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Description
            </h3>
            <p className="text-base leading-relaxed break-words">
              {selectedPortfolio.description}
            </p>
          </div>

          {/* URL - Fixed wrapping */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Project URL
            </h3>
            <div className="rounded-lg p-3 break-all">
              <a
                href={selectedPortfolio.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 hover:underline group"
              >
                <Globe className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="break-all">
                  {selectedPortfolio.url}
                </span>
                <ExternalLink className="h-3 w-3 ml-1 opacity-60 group-hover:opacity-100 flex-shrink-0" />
              </a>
            </div>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-xs text-muted-foreground">Created</p>
              <p className="text-sm font-medium flex items-center mt-1">
                <Calendar className="h-3 w-3 mr-1 text-muted-foreground flex-shrink-0" />
                <span className="truncate">{formatDate(selectedPortfolio.createdAt)}</span>
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">
                Last Updated
              </p>
              <p className="text-sm font-medium flex items-center mt-1">
                <Calendar className="h-3 w-3 mr-1 text-muted-foreground flex-shrink-0" />
                <span className="truncate">{formatDate(selectedPortfolio.updatedAt)}</span>
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-muted-foreground">ID</p>
              <p className="text-xs font-mono mt-1 break-all">
                {selectedPortfolio._id}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 sticky bottom-0 bg-background py-2">
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