// components/modals/AdminCreateTeamMemberModal.tsx
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Linkedin, User, ImageIcon } from "lucide-react";
import { usePost } from "@/hooks/tanstack/usePost";
import Swal from "sweetalert2";
import { ImageUploader } from "@/components/image-uploader";

// Form validation schema - no email field
const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  role: z
    .string()
    .min(2, "Role must be at least 2 characters")
    .max(100, "Role must not exceed 100 characters"),
  image: z
    .string()
    .url("Please enter a valid image URL")
    .min(1, "Profile image is required"),
  linkedin: z
    .string()
    .url("Please enter a valid LinkedIn URL")
    .min(1, "LinkedIn URL is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface AdminCreateTeamMemberModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function AdminCreateTeamMemberModal({
  isModalOpen,
  setIsModalOpen,
  onSuccess,
}: AdminCreateTeamMemberModalProps) {
  const { mutateAsync: postData, isPending: isLoading } = usePost({
    url: "/team-members",
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      role: "",
      image: "",
      linkedin: "",
    },
  });

  const imageUrl = form.watch("image");
  const name = form.watch("name");
  const role = form.watch("role");

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await postData(data);

      if (response.success) {
        setIsModalOpen(false);
        form.reset();
        onSuccess?.();

        await Swal.fire({
          title: "Success!",
          text: "Team member added successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        await Swal.fire({
          title: "Error",
          text: response.message || "Failed to add team member",
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Add Team Member
          </DialogTitle>
          <DialogDescription>
            Add a new member to your team.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            {/* Profile Image Uploader */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel className="text-base">
                  Profile Image{" "}
                  <span className="text-destructive">*</span>
                </FormLabel>
                {imageUrl && (
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
                        maxSize={2}
                        allowedTypes={[
                          "image/jpeg",
                          "image/png",
                          "image/webp",
                        ]}
                      />
                    </FormControl>
                    <FormDescription>
                      Upload a profile photo for the team member (max
                      2MB). Recommended: Square image 400x400px.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
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
                    Enter the team member's full name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Role */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Frontend Developer, Project Manager"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the team member's job title or role
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* LinkedIn URL */}
            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn Profile</FormLabel>
                  <FormControl>
                    <div className="flex">
                      <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                        <Linkedin className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Input
                        className="rounded-l-none"
                        placeholder="https://linkedin.com/in/username"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Enter the team member's LinkedIn profile URL
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Live Preview Card */}
            {(name || role || imageUrl) && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">
                    Live Preview
                  </h4>
                  <Badge variant="secondary">Preview</Badge>
                </div>

                <div className="flex items-center gap-4">
                  {/* Avatar Preview */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={name || "Preview"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="h-8 w-8 text-primary" />
                    )}
                  </div>

                  {/* Info Preview */}
                  <div className="flex-1">
                    {name && (
                      <p className="font-semibold text-lg">{name}</p>
                    )}
                    {role && (
                      <p className="text-sm text-muted-foreground">
                        {role}
                      </p>
                    )}
                    <div className="flex items-center gap-1 mt-1 text-xs text-blue-600">
                      <Linkedin className="h-3 w-3" />
                      <span>LinkedIn Profile</span>
                    </div>
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
                Add Team Member
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
