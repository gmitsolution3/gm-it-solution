// components/modals/AdminEditPortfolioModal.tsx
"use client";

import { useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { usePatch } from "@/hooks/tanstack/usePatch";
import Swal from "sweetalert2";
import { IPortfolioItem } from "@/types";
import { ImageUploader } from "@/components/image-uploader";

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
});

type FormValues = z.infer<typeof formSchema>;

// Predefined categories (can be moved to constants)
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

interface AdminEditPortfolioModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  portfolioData: IPortfolioItem;
  onSuccess?: () => void;
}

export default function AdminEditPortfolioModal({
  isModalOpen,
  setIsModalOpen,
  portfolioData,
  onSuccess,
}: AdminEditPortfolioModalProps) {
  const { mutateAsync: updateData, isPending: isLoading } = usePatch({
    url: `/portfolios/${portfolioData._id}`,
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      image: "",
      url: "",
    },
  });

  // Reset form when portfolioData changes or modal opens
  useEffect(() => {
    if (portfolioData && isModalOpen) {
      form.reset({
        title: portfolioData.title,
        category: portfolioData.category,
        description: portfolioData.description,
        image: portfolioData.image,
        url: portfolioData.url,
      });
    }
  }, [portfolioData, isModalOpen, form]);

  const imageUrl = form.watch("image");
  const title = form.watch("title");
  const description = form.watch("description");

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await updateData(data);

      if (response.success) {
        setIsModalOpen(false);
        form.reset();
        onSuccess?.();

        await Swal.fire({
          title: "Success!",
          text: "Portfolio item updated successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        await Swal.fire({
          title: "Error",
          text: response.message || "Failed to update portfolio item",
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

  const handleImageChange = (url: string) => {
    form.setValue("image", url, { shouldValidate: true });
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Edit Portfolio Item
          </DialogTitle>
          <DialogDescription>
            Update the details of your portfolio item.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            {/* Image Uploader Section - REPLACES the old image preview and URL input */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel className="text-base">
                  Project Image
                </FormLabel>
                {imageUrl && (
                  <Badge variant="outline" className="gap-1">
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
                        uploadEndpoint={`${import.meta.env.VITE_BACKEND_API_DEV_URL}/upload`} // Adjust endpoint
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
                      Upload a new image or keep the existing one (max
                      5MB)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-2 gap-6">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="col-span-2 sm:col-span-1">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., E-commerce Platform"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Give your project a descriptive title
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="col-span-2 sm:col-span-1">
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose the type of project
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your project, its features, and impact..."
                      className="min-h-[120px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Write a compelling description (10-500 characters)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Project URL */}
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project URL</FormLabel>
                  <FormControl>
                    <div className="flex">
                      <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Input
                        className="rounded-l-none"
                        placeholder="https://yourproject.com"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Link to the live project or case study
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                    {imageUrl ? (
                      <img
                        src={imageUrl}
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
                      {description || "Description will appear here"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Metadata - Show when editing */}
            {portfolioData && (
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
                        portfolioData.createdAt,
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Last updated:
                    </span>{" "}
                    <span className="font-mono">
                      {new Date(
                        portfolioData.updatedAt,
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">ID:</span>{" "}
                    <span className="font-mono text-xs">
                      {portfolioData._id}
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
                Update Portfolio Item
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
