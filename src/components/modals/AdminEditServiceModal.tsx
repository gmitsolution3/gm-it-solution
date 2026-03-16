// components/modals/AdminEditServiceModal.tsx
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, X, Plus, ImageIcon } from "lucide-react";
import { usePatch } from "@/hooks/tanstack/usePatch";
import Swal from "sweetalert2";
import { ImageUploader } from "@/components/image-uploader";
import { IService } from "@/types";

// Form validation schema - icon is required
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
    .optional()
    .or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

interface AdminEditServiceModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  serviceData: IService;
  onSuccess?: () => void;
}

export default function AdminEditServiceModal({
  isModalOpen,
  setIsModalOpen,
  serviceData,
  onSuccess,
}: AdminEditServiceModalProps) {
  const { mutateAsync: updateData, isPending: isLoading } = usePatch({
    url: `/services/${serviceData._id}`,
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
    },
  });

  const [featureInput, setFeatureInput] = useState("");
  const [techInput, setTechInput] = useState("");

  const features = form.watch("features");
  const technologies = form.watch("technologies");
  const iconUrl = form.watch("icon");
  const title = form.watch("title");

  // Reset form when serviceData changes or modal opens
  useEffect(() => {
    if (serviceData && isModalOpen) {
      form.reset({
        icon: serviceData.icon || "",
        title: serviceData.title,
        description: serviceData.description,
        features: serviceData.features || [],
        technologies: serviceData.technologies || [],
        image: serviceData.image || "",
      });
    }
  }, [serviceData, isModalOpen, form]);

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
      const response = await updateData(data);

      if (response.success) {
        setIsModalOpen(false);
        form.reset();
        onSuccess?.();

        await Swal.fire({
          title: "Success!",
          text: "Service updated successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        await Swal.fire({
          title: "Error",
          text: response.message || "Failed to update service",
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
    setFeatureInput("");
    setTechInput("");
  };

  const handleIconChange = (url: string) => {
    form.setValue("icon", url, { shouldValidate: true });
  };

  const handleImageChange = (url: string) => {
    form.setValue("image", url, { shouldValidate: true });
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Edit Service
          </DialogTitle>
          <DialogDescription>
            Update the details of your service offering.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            {/* Icon Uploader - Required */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel className="text-base">
                  Service Icon{" "}
                  <span className="text-destructive">*</span>
                </FormLabel>
                {iconUrl && (
                  <Badge variant="outline" className="gap-1">
                    <ImageIcon className="h-3 w-3" />
                    Icon Uploaded
                  </Badge>
                )}
              </div>

              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageUploader
                        value={field.value}
                        onChange={handleIconChange}
                        uploadEndpoint={`${import.meta.env.VITE_BACKEND_API_DEV_URL}/upload`}
                        maxSize={2}
                        allowedTypes={[
                          "image/jpeg",
                          "image/png",
                          "image/webp",
                          "image/svg+xml",
                        ]}
                      />
                    </FormControl>
                    <FormDescription>
                      Upload an icon for your service (SVG, PNG, or
                      JPEG, max 2MB). This will be displayed as the
                      service icon.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Web Development"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Give your service a clear and descriptive title
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your service offering..."
                      className="min-h-[100px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a compelling description of the service
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Features */}
            <FormField
              control={form.control}
              name="features"
              render={() => (
                <FormItem>
                  <FormLabel>Features</FormLabel>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a feature..."
                      value={featureInput}
                      onChange={(e) =>
                        setFeatureInput(e.target.value)
                      }
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
                  <FormDescription>
                    Add key features of this service
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Technologies */}
            <FormField
              control={form.control}
              name="technologies"
              render={() => (
                <FormItem>
                  <FormLabel>Technologies</FormLabel>
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
                  <FormDescription>
                    Add technologies used in this service
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Additional Image (Optional) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel className="text-base">
                  Additional Image
                </FormLabel>
                {form.watch("image") && (
                  <Badge variant="outline" className="gap-1">
                    <ImageIcon className="h-3 w-3" />
                    Image Uploaded
                  </Badge>
                )}
              </div>

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageUploader
                        value={field.value}
                        onChange={handleImageChange}
                        uploadEndpoint={`${import.meta.env.VITE_BACKEND_API_DEV_URL}/upload`}
                        maxSize={5}
                        allowedTypes={[
                          "image/jpeg",
                          "image/png",
                          "image/webp",
                          "image/gif",
                        ]}
                      />
                    </FormControl>
                    <FormDescription>
                      Upload an additional showcase image for your
                      service (max 5MB)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Live Preview Card */}
            {title && (
              <div className="rounded-lg border bg-card p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">
                    Live Preview
                  </h4>
                  <Badge variant="secondary">Preview</Badge>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded bg-primary/10 flex items-center justify-center overflow-hidden">
                    {iconUrl ? (
                      <img
                        src={iconUrl}
                        alt={title}
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

            {/* Metadata - Show when editing */}
            {serviceData && (
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
                        serviceData.createdAt,
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Last updated:
                    </span>{" "}
                    <span className="font-mono">
                      {new Date(
                        serviceData.updatedAt,
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">ID:</span>{" "}
                    <span className="font-mono text-xs">
                      {serviceData._id}
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
                Update Service
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
