// components/admin-dashboard/modals/CreateServiceModal.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, X, Plus, ImageIcon } from "lucide-react";
import { usePost } from "@/hooks/swr/usePost";
import Swal from "sweetalert2";
import { ImageUploader } from "@/components/image-uploader";
import Image from "next/image";

// Form validation schema
const formSchema = z.object({
  icon: z
    .string()
    .url("Please enter a valid image URL")
    .min(1, "Icon image is required"),
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters"),
  features: z
    .array(z.string())
    .min(1, "At least one feature is required"),
  technologies: z
    .array(z.string())
    .min(1, "At least one technology is required"),
  image: z
    .string()
    .url("Please enter a valid image URL")
    .optional(),
  iconPublicId: z.string().optional(),
  imagePublicId: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateServiceModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function CreateServiceModal({
  isModalOpen,
  setIsModalOpen,
  onSuccess,
}: CreateServiceModalProps) {
  const { mutate: postData, isLoading } = usePost("/services", {
    revalidateKey: "/services",
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      icon: "",
      title: "",
      description: "",
      features: [],
      technologies: [],
      image: "",
      iconPublicId: "",
      imagePublicId: "",
    },
  });

  const [featureInput, setFeatureInput] = useState("");
  const [techInput, setTechInput] = useState("");

  const features = form.watch("features");
  const technologies = form.watch("technologies");
  const iconUrl = form.watch("icon");
  const title = form.watch("title");

  const addFeature = () => {
    if (featureInput.trim()) {
      const currentFeatures = form.getValues("features") || [];
      form.setValue("features", [
        ...currentFeatures,
        featureInput.trim(),
      ]);
      setFeatureInput("");
    }
  };

  const removeFeature = (index: number) => {
    const currentFeatures = form.getValues("features") || [];
    form.setValue(
      "features",
      currentFeatures.filter((_, i) => i !== index),
    );
  };

  const addTechnology = () => {
    if (techInput.trim()) {
      const currentTech = form.getValues("technologies") || [];
      form.setValue("technologies", [
        ...currentTech,
        techInput.trim(),
      ]);
      setTechInput("");
    }
  };

  const removeTechnology = (index: number) => {
    const currentTech = form.getValues("technologies") || [];
    form.setValue(
      "technologies",
      currentTech.filter((_, i) => i !== index),
    );
  };

  const onSubmit = async (data: FormValues) => {
    try {
      // Remove publicId fields from the data sent to API
      const { iconPublicId, imagePublicId, ...submitData } = data;
      const response = await postData(submitData);

      if (response.success) {
        setIsModalOpen(false);
        form.reset();
        onSuccess?.();

        await Swal.fire({
          title: "Success!",
          text: "Service created successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        await Swal.fire({
          title: "Error",
          text: response.message || "Failed to create service",
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);
      setIsModalOpen(false);
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
    setFeatureInput("");
    setTechInput("");
  };

  const handleIconChange = (url: string, publicId: string) => {
    form.setValue("icon", url, { shouldValidate: true });
    form.setValue("iconPublicId", publicId);
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
            Create New Service
          </DialogTitle>
          <DialogDescription>
            Add a new service offering to showcase what you provide.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Icon Uploader - This is the main icon/image */}
          <FieldSet>
            <Field>
              <div className="flex items-center justify-between mb-2">
                <FieldLabel>
                  Service Icon <span className="text-destructive">*</span>
                </FieldLabel>
                {iconUrl && (
                  <Badge variant="outline" className="gap-1">
                    <ImageIcon className="h-3 w-3" />
                    Icon Uploaded
                  </Badge>
                )}
              </div>
              <FieldContent>
                <ImageUploader
                  value={form.watch("icon")}
                  imagePublicId={form.watch("iconPublicId")}
                  onChange={handleIconChange}
                />
              </FieldContent>
              <FieldDescription>
                Upload an icon for your service (SVG, PNG, or JPEG, max 2MB). This will be displayed as the service icon.
              </FieldDescription>
              <FieldError>{form.formState.errors.icon?.message}</FieldError>
            </Field>
          </FieldSet>

          {/* Title */}
          <FieldSet>
            <Field>
              <FieldLabel>Title</FieldLabel>
              <FieldContent>
                <Input
                  placeholder="e.g., Web Development"
                  {...form.register("title")}
                />
              </FieldContent>
              <FieldDescription>
                Give your service a clear and descriptive title
              </FieldDescription>
              <FieldError>{form.formState.errors.title?.message}</FieldError>
            </Field>
          </FieldSet>

          {/* Description */}
          <FieldSet>
            <Field>
              <FieldLabel>Description</FieldLabel>
              <FieldContent>
                <Textarea
                  placeholder="Describe your service offering..."
                  className="min-h-[100px] resize-none"
                  {...form.register("description")}
                />
              </FieldContent>
              <FieldDescription>
                Provide a compelling description of the service
              </FieldDescription>
              <FieldError>{form.formState.errors.description?.message}</FieldError>
            </Field>
          </FieldSet>

          {/* Features */}
          <FieldSet>
            <Field>
              <FieldLabel>Features</FieldLabel>
              <FieldContent>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a feature..."
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addFeature();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={addFeature}
                    variant="secondary"
                    className="shrink-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {features.map((feature, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="gap-1 pr-1"
                    >
                      {feature}
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </FieldContent>
              <FieldDescription>
                Add key features of this service
              </FieldDescription>
              <FieldError>{form.formState.errors.features?.message}</FieldError>
            </Field>
          </FieldSet>

          {/* Technologies */}
          <FieldSet>
            <Field>
              <FieldLabel>Technologies</FieldLabel>
              <FieldContent>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a technology..."
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTechnology();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={addTechnology}
                    variant="secondary"
                    className="shrink-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {technologies.map((tech, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="gap-1 pr-1"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTechnology(index)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </FieldContent>
              <FieldDescription>
                Add technologies used in this service
              </FieldDescription>
              <FieldError>{form.formState.errors.technologies?.message}</FieldError>
            </Field>
          </FieldSet>

          {/* Service Image */}
          <FieldSet>
            <Field>
              <div className="flex items-center justify-between mb-2">
                <FieldLabel>Service Image</FieldLabel>
                {form.watch("image") && (
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
                Upload an additional showcase image for your service (optional, max 5MB)
              </FieldDescription>
              <FieldError>{form.formState.errors.image?.message}</FieldError>
            </Field>
          </FieldSet>

          {/* Live Preview Card */}
          {title && (
            <div className="rounded-lg border bg-card p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Live Preview</h4>
                <Badge variant="secondary">Preview</Badge>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded bg-primary/10 flex items-center justify-center overflow-hidden relative">
                  {iconUrl ? (
                    <Image
                      src={iconUrl}
                      alt={title}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-lg font-semibold text-primary">
                      {title.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">{title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {form.getValues("description") ||
                      "Description will appear here"}
                  </p>
                </div>
              </div>
              {(features.length > 0 || technologies.length > 0) && (
                <div className="flex flex-wrap gap-2 pt-2 border-t">
                  {features.slice(0, 2).map((feature, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xs"
                    >
                      {feature}
                    </Badge>
                  ))}
                  {technologies.slice(0, 2).map((tech, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              )}
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
              Create Service
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}