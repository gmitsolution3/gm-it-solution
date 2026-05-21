// components/admin-dashboard/modals/CreatePortfolioModal.tsx
"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { usePost } from "@/hooks/swr/usePost";
import Swal from "sweetalert2";
import { ImageUploader } from "@/components/image-uploader";
import Image from "next/image";

// Predefined categories
const categories = [
  "Web Development",
  "Mobile App",
  "UI/UX Design",
  "Branding",
  "Marketing",
  "Service",
  "E-commerce",
  "Other",
];

const formSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters"),
  category: z.string().min(1, "Please select a category"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters"),
  image: z
    .string()
    .url("Please enter a valid image URL")
    .min(1, "Image URL is required"),
  url: z
    .string()
    .url("Please enter a valid project URL")
    .min(1, "Project URL is required"),
  imagePublicId: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface CreatePortfolioModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function CreatePortfolioModal({
  isModalOpen,
  setIsModalOpen,
  onSuccess,
}: CreatePortfolioModalProps) {
  const { mutate: postData, isLoading } = usePost("/portfolios", {
    revalidateKey: "/portfolios",
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      image: "",
      url: "",
      imagePublicId: "",
    },
  });

  const imageUrl = form.watch("image");
  const title = form.watch("title");
  const description = form.watch("description");

  const onSubmit = async (data: FormValues) => {
    try {
      const { imagePublicId, ...submitData } = data;
      const response = await postData(submitData);

      if (response.success) {
        setIsModalOpen(false);
        form.reset();
        onSuccess?.();

        await Swal.fire({
          title: "Success!",
          text: "Portfolio item created successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        await Swal.fire({
          title: "Error",
          text: response.message || "Failed to create portfolio item",
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
  };

  const handleImageChange = (url: string, publicId: string) => {
    form.setValue("image", url, { shouldValidate: true });
    form.setValue("imagePublicId", publicId);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="!max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Create New Portfolio Item
          </DialogTitle>
          <DialogDescription>
            Add a new project or service to showcase in your
            portfolio.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Image Uploader Section */}
          <FieldSet>
            <Field>
              <div className="flex items-center justify-between mb-2">
                <FieldLabel>Project Image</FieldLabel>
                {imageUrl && (
                  <Badge variant="outline" className="gap-1">
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
                Upload an image for your project (max 5MB)
              </FieldDescription>
              <FieldError>{form.formState.errors.image?.message}</FieldError>
            </Field>
          </FieldSet>

          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-6">
            {/* Title */}
            <FieldSet className="col-span-2 sm:col-span-1">
              <Field>
                <FieldLabel>Title</FieldLabel>
                <FieldContent>
                  <Input
                    placeholder="e.g., E-commerce Platform"
                    {...form.register("title")}
                  />
                </FieldContent>
                <FieldDescription>
                  Give your project a descriptive title
                </FieldDescription>
                <FieldError>{form.formState.errors.title?.message}</FieldError>
              </Field>
            </FieldSet>

            {/* Category - Changed to Select dropdown */}
            <FieldSet className="col-span-2 sm:col-span-1">
              <Field>
                <FieldLabel>Category</FieldLabel>
                <FieldContent>
                  <Select
                    onValueChange={(value) => form.setValue("category", value)}
                    value={form.watch("category")}
                    
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldContent>
                <FieldDescription>
                  Choose the type of project
                </FieldDescription>
                <FieldError>{form.formState.errors.category?.message}</FieldError>
              </Field>
            </FieldSet>
          </div>

          {/* Description */}
          <FieldSet>
            <Field>
              <FieldLabel>Description</FieldLabel>
              <FieldContent>
                <Textarea
                  placeholder="Describe your project, its features, and impact..."
                  className="min-h-[120px] resize-none"
                  {...form.register("description")}
                />
              </FieldContent>
              <FieldDescription>
                Write a compelling description (10-500 characters)
              </FieldDescription>
              <FieldError>{form.formState.errors.description?.message}</FieldError>
            </Field>
          </FieldSet>

          {/* Project URL */}
          <FieldSet>
            <Field>
              <FieldLabel>Project URL</FieldLabel>
              <FieldContent>
                <div className="flex">
                  <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    className="rounded-l-none"
                    placeholder="https://yourproject.com"
                    {...form.register("url")}
                  />
                </div>
              </FieldContent>
              <FieldDescription>
                Link to the live project or case study
              </FieldDescription>
              <FieldError>{form.formState.errors.url?.message}</FieldError>
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
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
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
                    {description || "Description will appear here"}
                  </p>
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
              Create Portfolio Item
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}