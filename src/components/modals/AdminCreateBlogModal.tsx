// components/modals/AdminCreateBlogModal.tsx
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Loader2,
  User,
  Clock,
  Star,
  Upload,
} from "lucide-react";
import { usePost } from "@/hooks/tanstack/usePost";
import Swal from "sweetalert2";
import { ImageUploader } from "@/components/image-uploader";

// Form validation schema - removed date field
const formSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must not exceed 200 characters"),
  excerpt: z
    .string()
    .min(20, "Excerpt must be at least 20 characters")
    .max(500, "Excerpt must not exceed 500 characters"),
  category: z.string().min(1, "Please select a category"),
  author: z
    .string()
    .min(2, "Author name must be at least 2 characters")
    .max(100, "Author name must not exceed 100 characters"),
  readTime: z
    .string()
    .min(2, "Read time must be at least 2 characters")
    .max(50, "Read time must not exceed 50 characters"),
  image: z
    .string()
    .url("Please enter a valid image URL")
    .min(1, "Featured image is required"),
  featured: z.boolean().default(false),
  content: z
    .string()
    .min(50, "Content must be at least 50 characters")
    .max(10000, "Content must not exceed 10000 characters"),
});

type FormValues = z.infer<typeof formSchema>;

// Predefined categories
const categories = [
  "Technology",
  "Business Growth",
  "Marketing",
  "Web Development",
  "Design",
  "Productivity",
  "News",
  "Tutorial",
  "Case Study",
  "Other",
];

interface AdminCreateBlogModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function AdminCreateBlogModal({
  isModalOpen,
  setIsModalOpen,
  onSuccess,
}: AdminCreateBlogModalProps) {
  const { mutateAsync: postData, isPending: isLoading } = usePost({
    url: "/blogs",
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      category: "",
      author: "",
      readTime: "",
      image: "",
      featured: false,
      content: "",
    },
  });

  const imageUrl = form.watch("image");
  const title = form.watch("title");
  const excerpt = form.watch("excerpt");
  const featured = form.watch("featured");
  const author = form.watch("author");
  const readTime = form.watch("readTime");
  const category = form.watch("category");

  const onSubmit = async (data: FormValues) => {
    try {
      // Add current date to the data
      const currentDate = new Date().toISOString();
      const payload = {
        ...data,
        date: currentDate,
      };
      
      const response = await postData(payload);

      if (response.success) {
        setIsModalOpen(false);
        form.reset();
        onSuccess?.();

        await Swal.fire({
          title: "Success!",
          text: "Blog post created successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        await Swal.fire({
          title: "Error",
          text: response.message || "Failed to create blog post",
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Create New Blog Post
          </DialogTitle>
          <DialogDescription>
            Add a new blog post to your website. The publication date will be set to today.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            {/* Featured Image Uploader */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel className="text-base">
                  Featured Image <span className="text-destructive">*</span>
                </FormLabel>
                {imageUrl && (
                  <Badge variant="outline" className="gap-1">
                    <Upload className="h-3 w-3" />
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
                      Upload a featured image for your blog post (max 5MB). Recommended size: 1200x630px.
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
                      placeholder="e.g., How Business Automation Can Save You Time and Money"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The main title of your blog post
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Excerpt */}
            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A short summary of the blog post..."
                      className="min-h-[80px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A brief summary that appears in blog listings (20-500 characters)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Content */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your full blog post content here..."
                      className="min-h-[300px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The full content of your blog post (50-10000 characters)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Form Fields Grid */}
            <div className="grid grid-cols-2 gap-6">
              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
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
                      Choose the category for this post
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Author */}
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <div className="flex">
                        <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                          <User className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <Input
                          className="rounded-l-none"
                          placeholder="e.g., John Doe"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Name of the blog post author
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Read Time */}
            <FormField
              control={form.control}
              name="readTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Read Time</FormLabel>
                  <FormControl>
                    <div className="flex">
                      <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Input
                        className="rounded-l-none"
                        placeholder="e.g., 5 min read"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Estimated reading time
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Featured Checkbox */}
            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Featured Post
                    </FormLabel>
                    <FormDescription>
                      Mark this post as featured to highlight it on the homepage
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            {/* Live Preview Card */}
            {(title || excerpt || imageUrl || author || readTime || category) && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">
                    Live Preview
                  </h4>
                  <Badge variant="secondary">Preview</Badge>
                </div>
                
                <div className="space-y-4">
                  {/* Image Preview */}
                  {imageUrl && (
                    <div className="rounded-lg overflow-hidden border bg-muted h-32">
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Title and Featured Badge */}
                  <div className="flex items-start justify-between gap-2">
                    {title && (
                      <h3 className="text-lg font-bold line-clamp-2">{title}</h3>
                    )}
                    {featured && (
                      <Badge variant="default" className="gap-1 shrink-0">
                        <Star className="h-3 w-3" />
                        Featured
                      </Badge>
                    )}
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    {author && (
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {author}
                      </span>
                    )}
                    {readTime && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {readTime}
                      </span>
                    )}
                    {category && (
                      <Badge variant="outline" className="text-xs">
                        {category}
                      </Badge>
                    )}
                  </div>

                  {/* Excerpt Preview */}
                  {excerpt && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {excerpt}
                    </p>
                  )}
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
                Create Blog Post
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}