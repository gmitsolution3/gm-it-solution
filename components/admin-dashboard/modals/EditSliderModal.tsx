// components/modals/EditSliderModal.tsx
"use client";

import { ImageUploader } from "@/components/image-uploader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { usePatch } from "@/hooks/swr/usePatch";
import { ISlider } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  ImageIcon,
  Loader2,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import * as z from "zod";

// Form validation schema
const formSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters"),
  highlight: z
    .string()
    .min(3, "Highlight must be at least 3 characters")
    .max(100, "Highlight must not exceed 100 characters"),
  ctaPrimary: z
    .string()
    .min(2, "Primary CTA must be at least 2 characters")
    .max(50, "Primary CTA must not exceed 50 characters"),
  ctaSecondary: z
    .string()
    .min(2, "Secondary CTA must be at least 2 characters")
    .max(50, "Secondary CTA must not exceed 50 characters"),
  image: z
    .string()
    .url("Please enter a valid image URL")
    .min(1, "Hero image is required"),
  imagePublicId: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface EditSliderModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  sliderData: ISlider;
  onSuccess?: () => void;
}

export default function EditSliderModal({
  isModalOpen,
  setIsModalOpen,
  sliderData,
  onSuccess,
}: EditSliderModalProps) {
  const { mutate: updateData, isLoading } = usePatch(`/sliders`, {
    revalidateKey: "/sliders",
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      highlight: "",
      ctaPrimary: "",
      ctaSecondary: "",
      image: "",
      imagePublicId: "",
    },
  });

  const imageUrl = form.watch("image");
  const title = form.watch("title");
  const description = form.watch("description");
  const highlight = form.watch("highlight");
  const ctaPrimary = form.watch("ctaPrimary");
  const ctaSecondary = form.watch("ctaSecondary");

  // Reset form when sliderData changes or modal opens
  useEffect(() => {
    if (sliderData && isModalOpen) {
      form.reset({
        title: sliderData.title || "",
        description: sliderData.description || "",
        highlight: sliderData.highlight || "",
        ctaPrimary: sliderData.ctaPrimary || "",
        ctaSecondary: sliderData.ctaSecondary || "",
        image: sliderData.image || "",
        imagePublicId: sliderData.imagePublicId || "",
      });
    }
  }, [sliderData, isModalOpen, form]);

  const onSubmit = async (data: FormValues) => {
    try {
      
      const { imagePublicId, ...submitData } = data;
      const response = await updateData({
        id: sliderData._id,
        data: submitData,
      });

      if (response.success) {
        setIsModalOpen(false);
        form.reset();
        onSuccess?.();

        await Swal.fire({
          title: "Success!",
          text: "Slider updated successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        await Swal.fire({
          title: "Error",
          text: response.message || "Failed to update slider",
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);
      await Swal.fire({
        title: "Error",
        text: "An unexpected error occurred",
        icon: "error",
      });
    }
  };

  const handleClose = () => {
    form.reset();
    setIsModalOpen(false);
  };

  const handleImageChange = (url: string, publicId: string) => {
    form.setValue("image", url, { shouldValidate: true });
    form.setValue("imagePublicId", publicId);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="!max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Edit Hero Slider
          </DialogTitle>
          <DialogDescription>
            Update the details of your hero slider.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          {/* Image Uploader - Hero Image */}
          <FieldSet>
            <Field>
              <div className="flex items-center justify-between mb-2">
                <FieldLabel>
                  Hero Image{" "}
                  <span className="text-destructive">*</span>
                </FieldLabel>
                {imageUrl && (
                  <Badge variant="outline" className="gap-1">
                    <ImageIcon className="h-3 w-3" />
                    Image Uploaded
                  </Badge>
                )}
              </div>
              <FieldContent>
                <ImageUploader
                  value={form.watch("image")}
                  imagePublicId={form.watch("imagePublicId")}
                  onChange={handleImageChange}
                />
              </FieldContent>
              <FieldDescription>
                Upload a hero image for your slider (max 5MB).
                Recommended size: 1920x1080px.
              </FieldDescription>
              <FieldError>
                {form.formState.errors.image?.message}
              </FieldError>
            </Field>
          </FieldSet>

          {/* Title */}
          <FieldSet>
            <Field>
              <FieldLabel>Title</FieldLabel>
              <FieldContent>
                <Input
                  placeholder="e.g., We Build Digital Products"
                  {...form.register("title")}
                />
              </FieldContent>
              <FieldDescription>
                Main heading for the slider
              </FieldDescription>
              <FieldError>
                {form.formState.errors.title?.message}
              </FieldError>
            </Field>
          </FieldSet>

          {/* Highlight */}
          <FieldSet>
            <Field>
              <FieldLabel>Highlight Text</FieldLabel>
              <FieldContent>
                <div className="flex">
                  <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                    <Sparkles className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    className="rounded-l-none"
                    placeholder="e.g., That Actually Grow Businesses"
                    {...form.register("highlight")}
                  />
                </div>
              </FieldContent>
              <FieldDescription>
                Highlighted text that appears after the title
              </FieldDescription>
              <FieldError>
                {form.formState.errors.highlight?.message}
              </FieldError>
            </Field>
          </FieldSet>

          {/* Description */}
          <FieldSet>
            <Field>
              <FieldLabel>Description</FieldLabel>
              <FieldContent>
                <Textarea
                  placeholder="Describe your value proposition..."
                  className="min-h-[100px] resize-none"
                  {...form.register("description")}
                />
              </FieldContent>
              <FieldDescription>
                Supporting text that appears below the title
              </FieldDescription>
              <FieldError>
                {form.formState.errors.description?.message}
              </FieldError>
            </Field>
          </FieldSet>

          {/* CTA Buttons Grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Primary CTA */}
            <FieldSet>
              <Field>
                <FieldLabel>Primary CTA</FieldLabel>
                <FieldContent>
                  <div className="flex">
                    <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      className="rounded-l-none"
                      placeholder="e.g., See Our Work"
                      {...form.register("ctaPrimary")}
                    />
                  </div>
                </FieldContent>
                <FieldDescription>
                  Text for the primary button
                </FieldDescription>
                <FieldError>
                  {form.formState.errors.ctaPrimary?.message}
                </FieldError>
              </Field>
            </FieldSet>

            {/* Secondary CTA */}
            <FieldSet>
              <Field>
                <FieldLabel>Secondary CTA</FieldLabel>
                <FieldContent>
                  <div className="flex">
                    <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                      <MessageCircle className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      className="rounded-l-none"
                      placeholder="e.g., Let's Talk"
                      {...form.register("ctaSecondary")}
                    />
                  </div>
                </FieldContent>
                <FieldDescription>
                  Text for the secondary button
                </FieldDescription>
                <FieldError>
                  {form.formState.errors.ctaSecondary?.message}
                </FieldError>
              </Field>
            </FieldSet>
          </div>

          {/* Live Preview Card */}
          {(title ||
            description ||
            highlight ||
            ctaPrimary ||
            ctaSecondary ||
            imageUrl) && (
            <div className="rounded-lg border bg-card p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Live Preview</h4>
                <Badge variant="secondary">Preview</Badge>
              </div>

              <div className="space-y-4">
                {/* Image Preview */}
                {imageUrl && (
                  <div className="rounded-lg overflow-hidden border bg-muted h-32 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imageUrl}
                      alt="Hero preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Content Preview */}
                <div className="space-y-2">
                  {title && (
                    <h3 className="text-xl font-bold">
                      {title}{" "}
                      {highlight && (
                        <span className="text-primary">
                          {highlight}
                        </span>
                      )}
                    </h3>
                  )}

                  {description && (
                    <p className="text-sm text-muted-foreground">
                      {description}
                    </p>
                  )}

                  {(ctaPrimary || ctaSecondary) && (
                    <div className="flex gap-3 pt-2">
                      {ctaPrimary && (
                        <Badge variant="default" className="gap-1">
                          {ctaPrimary}
                          <ArrowRight className="h-3 w-3" />
                        </Badge>
                      )}
                      {ctaSecondary && (
                        <Badge variant="outline" className="gap-1">
                          <MessageCircle className="h-3 w-3" />
                          {ctaSecondary}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Metadata - Show when editing */}
          {sliderData && (
            <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  Metadata
                </Badge>
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground">
                    Created:
                  </span>{" "}
                  <span className="font-mono">
                    {new Date(
                      sliderData.createdAt,
                    ).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">
                    Last updated:
                  </span>{" "}
                  <span className="font-mono">
                    {new Date(
                      sliderData.updatedAt,
                    ).toLocaleDateString()}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">ID:</span>{" "}
                  <span className="font-mono text-xs">
                    {sliderData._id}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
              className="hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="text-white"
            >
              {isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Update Slider
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
