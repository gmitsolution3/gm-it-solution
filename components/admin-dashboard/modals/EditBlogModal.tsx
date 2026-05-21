// components/admin-dashboard/modals/EditBlogModal.tsx
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
  Calendar,
  Star,
  Upload,
} from "lucide-react";
import { usePatch } from "@/hooks/swr/usePatch";
import Swal from "sweetalert2";
import { ImageUploader } from "@/components/image-uploader";
import { IBlog } from "@/types";
import { formatDate } from "@/utils";
import Image from "next/image";

// Form validation schema
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
  date: z.string().min(1, "Publication date is required"),
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
  imagePublicId: z.string().optional(),
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

interface EditBlogModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  blogData: IBlog;
  onSuccess?: () => void;
}

export default function EditBlogModal({
  isModalOpen,
  setIsModalOpen,
  blogData,
  onSuccess,
}: EditBlogModalProps) {
  const { mutate: updateData, isLoading } = usePatch(`/blogs`, {
    revalidateKey: "/blogs",
  });

  const form = useForm<z.input<typeof formSchema>, any, z.output<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      category: "",
      author: "",
      date: "",
      readTime: "",
      image: "",
      featured: false,
      content: "",
      imagePublicId: "",
    },
  });

  const imageUrl = form.watch("image");
  const title = form.watch("title");
  const excerpt = form.watch("excerpt");
  const featured = form.watch("featured");
  const author = form.watch("author");
  const readTime = form.watch("readTime");
  const category = form.watch("category");

  // Reset form when blogData changes or modal opens
  useEffect(() => {
    if (blogData && isModalOpen) {
      // Format date to YYYY-MM-DD for date input
      const formattedDate = blogData.date ? new Date(blogData.date).toISOString().split("T")[0] : "";
      
      form.reset({
        title: blogData.title || "",
        excerpt: blogData.excerpt || "",
        category: blogData.category || "",
        author: blogData.author || "",
        date: formattedDate,
        readTime: blogData.readTime || "",
        image: blogData.image || "",
        featured: blogData.featured || false,
        content: blogData.content || "",
        imagePublicId: blogData.imagePublicId || "",
      });
    }
  }, [blogData, isModalOpen, form]);

  const onSubmit = async (data: FormValues) => {
    try {
      const { imagePublicId, ...submitData } = data;
      const response = await updateData({
        id: blogData._id,
        data: submitData,
      });

      if (response.success) {
        setIsModalOpen(false);
        form.reset();
        onSuccess?.();

        await Swal.fire({
          title: "Success!",
          text: "Blog post updated successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        await Swal.fire({
          title: "Error",
          text: response.message || "Failed to update blog post",
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
            Edit Blog Post
          </DialogTitle>
          <DialogDescription>
            Update the details of your blog post.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Featured Image Uploader */}
          <FieldSet>
            <Field>
              <div className="flex items-center justify-between mb-2">
                <FieldLabel>
                  Featured Image <span className="text-destructive">*</span>
                </FieldLabel>
                {imageUrl && (
                  <Badge variant="outline" className="gap-1">
                    <Upload className="h-3 w-3" />
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
                Upload a featured image for your blog post (max 5MB). Recommended size: 1200x630px.
              </FieldDescription>
              <FieldError>{form.formState.errors.image?.message}</FieldError>
            </Field>
          </FieldSet>

          {/* Title */}
          <FieldSet>
            <Field>
              <FieldLabel>Title</FieldLabel>
              <FieldContent>
                <Input
                  placeholder="e.g., How Business Automation Can Save You Time and Money"
                  {...form.register("title")}
                />
              </FieldContent>
              <FieldDescription>
                The main title of your blog post
              </FieldDescription>
              <FieldError>{form.formState.errors.title?.message}</FieldError>
            </Field>
          </FieldSet>

          {/* Excerpt */}
          <FieldSet>
            <Field>
              <FieldLabel>Excerpt</FieldLabel>
              <FieldContent>
                <Textarea
                  placeholder="A short summary of the blog post..."
                  className="min-h-[80px] resize-none"
                  {...form.register("excerpt")}
                />
              </FieldContent>
              <FieldDescription>
                A brief summary that appears in blog listings (20-500 characters)
              </FieldDescription>
              <FieldError>{form.formState.errors.excerpt?.message}</FieldError>
            </Field>
          </FieldSet>

          {/* Content */}
          <FieldSet>
            <Field>
              <FieldLabel>Content</FieldLabel>
              <FieldContent>
                <Textarea
                  placeholder="Write your full blog post content here..."
                  className="min-h-[300px] resize-none"
                  {...form.register("content")}
                />
              </FieldContent>
              <FieldDescription>
                The full content of your blog post (50-10000 characters)
              </FieldDescription>
              <FieldError>{form.formState.errors.content?.message}</FieldError>
            </Field>
          </FieldSet>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Category */}
            <FieldSet>
              <Field>
                <FieldLabel>Category</FieldLabel>
                <FieldContent>
                  <Select
                    onValueChange={(value) => form.setValue("category", value)}
                    value={form.watch("category")}
                  >
                    <SelectTrigger>
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
                  Choose the category for this post
                </FieldDescription>
                <FieldError>{form.formState.errors.category?.message}</FieldError>
              </Field>
            </FieldSet>

            {/* Author */}
            <FieldSet>
              <Field>
                <FieldLabel>Author</FieldLabel>
                <FieldContent>
                  <div className="flex">
                    <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      className="rounded-l-none"
                      placeholder="e.g., John Doe"
                      {...form.register("author")}
                    />
                  </div>
                </FieldContent>
                <FieldDescription>
                  Name of the blog post author
                </FieldDescription>
                <FieldError>{form.formState.errors.author?.message}</FieldError>
              </Field>
            </FieldSet>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Publication Date */}
            <FieldSet>
              <Field>
                <FieldLabel>Publication Date</FieldLabel>
                <FieldContent>
                  <div className="flex">
                    <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      type="date"
                      className="rounded-l-none"
                      {...form.register("date")}
                    />
                  </div>
                </FieldContent>
                <FieldDescription>
                  When this post should be published
                </FieldDescription>
                <FieldError>{form.formState.errors.date?.message}</FieldError>
              </Field>
            </FieldSet>

            {/* Read Time */}
            <FieldSet>
              <Field>
                <FieldLabel>Read Time</FieldLabel>
                <FieldContent>
                  <div className="flex">
                    <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      className="rounded-l-none"
                      placeholder="e.g., 5 min read"
                      {...form.register("readTime")}
                    />
                  </div>
                </FieldContent>
                <FieldDescription>
                  Estimated reading time
                </FieldDescription>
                <FieldError>{form.formState.errors.readTime?.message}</FieldError>
              </Field>
            </FieldSet>
          </div>

          {/* Featured Checkbox */}
          <FieldSet>
            <Field>
              <FieldContent>
                <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <Checkbox
                    checked={form.watch("featured")}
                    onCheckedChange={(checked) => form.setValue("featured", checked as boolean)}
                  />
                  <div className="space-y-1 leading-none">
                    <FieldLabel className="flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Featured Post
                    </FieldLabel>
                    <FieldDescription>
                      Mark this post as featured to highlight it on the homepage
                    </FieldDescription>
                  </div>
                </div>
              </FieldContent>
            </Field>
          </FieldSet>

          {/* Live Preview Card */}
          {(title || excerpt || imageUrl || author || readTime || category) && (
            <div className="rounded-lg border bg-card p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Live Preview</h4>
                <Badge variant="secondary">Preview</Badge>
              </div>
              
              <div className="space-y-4">
                {/* Image Preview */}
                {imageUrl && (
                  <div className="rounded-lg overflow-hidden border bg-muted h-32 relative">
                    <Image
                      src={imageUrl}
                      alt="Preview"
                      fill
                      className="object-cover"
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

          {/* Metadata - Show when editing */}
          {blogData && (
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
                    {formatDate(blogData.createdAt)}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">
                    Last updated:
                  </span>{" "}
                  <span className="font-mono">
                    {formatDate(blogData.updatedAt)}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">ID:</span>{" "}
                  <span className="font-mono text-xs break-all">
                    {blogData._id}
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
              Update Blog Post
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}