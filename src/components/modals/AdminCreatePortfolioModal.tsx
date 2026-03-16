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
import { Loader2, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { usePost } from "@/hooks/tanstack/usePost";
import Swal from "sweetalert2";
import { ImageUploader } from "@/components/image-uploader";

const formSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters"),
  category: z
    .string()
    .min(1, "Please enter a category")
    .max(50, "Category must not exceed 50 characters"),
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

interface AdminCreatePortfolioModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function AdminCreatePortfolioModal({
  isModalOpen,
  setIsModalOpen,
  onSuccess,
}: AdminCreatePortfolioModalProps) {
  const { mutateAsync: postData, isPending: isLoading } = usePost({
    url: "/portfolios",
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

  const imageUrl = form.watch("image");
  const title = form.watch("title");
  const description = form.watch("description");

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await postData(data);

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

  const handleImageChange = (url: string) => {
    form.setValue("image", url, { shouldValidate: true });
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Create New Portfolio Item
          </DialogTitle>
          <DialogDescription>
            Add a new project or service to showcase in your
            portfolio.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            {/* Image Uploader Section */}
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
                      Upload an image for your project (max 5MB)
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

              {/* Category - Changed from Select to Input */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="col-span-2 sm:col-span-1">
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Web Development, Mobile App, Design"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the category or type of project
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
        </Form>
      </DialogContent>
    </Dialog>
  );
}