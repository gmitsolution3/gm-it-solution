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
import { Linkedin } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { usePost } from "@/hooks/swr/usePost";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, Loader2, User } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import * as z from "zod";

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
  imagePublicId: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateTeamMemberModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function CreateTeamMemberModal({
  isModalOpen,
  setIsModalOpen,
  onSuccess,
}: CreateTeamMemberModalProps) {
  const { mutate: postData, isLoading } = usePost("/team-members", {
    revalidateKey: "/team-members",
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      role: "",
      image: "",
      linkedin: "",
      imagePublicId: "",
    },
  });

  const imageUrl = form.watch("image");
  const name = form.watch("name");
  const role = form.watch("role");

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

  const handleImageChange = (url: string, publicId: string) => {
    form.setValue("image", url, { shouldValidate: true });
    form.setValue("imagePublicId", publicId);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="!max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Add Team Member
          </DialogTitle>
          <DialogDescription>
            Add a new member to your team.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          {/* Profile Image Uploader */}
          <FieldSet>
            <Field>
              <div className="flex items-center justify-between mb-2">
                <FieldLabel>
                  Profile Image{" "}
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
                Upload a profile photo for the team member (max 2MB).
                Recommended: Square image 400x400px.
              </FieldDescription>
              <FieldError>
                {form.formState.errors.image?.message}
              </FieldError>
            </Field>
          </FieldSet>

          {/* Name */}
          <FieldSet>
            <Field>
              <FieldLabel>Full Name</FieldLabel>
              <FieldContent>
                <div className="flex">
                  <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    className="rounded-l-none"
                    placeholder="e.g., John Doe"
                    {...form.register("name")}
                  />
                </div>
              </FieldContent>
              <FieldDescription>
                Enter the team member's full name
              </FieldDescription>
              <FieldError>
                {form.formState.errors.name?.message}
              </FieldError>
            </Field>
          </FieldSet>

          {/* Role */}
          <FieldSet>
            <Field>
              <FieldLabel>Role</FieldLabel>
              <FieldContent>
                <Input
                  placeholder="e.g., Frontend Developer, Project Manager"
                  {...form.register("role")}
                />
              </FieldContent>
              <FieldDescription>
                Enter the team member's job title or role
              </FieldDescription>
              <FieldError>
                {form.formState.errors.role?.message}
              </FieldError>
            </Field>
          </FieldSet>

          {/* LinkedIn URL */}
          <FieldSet>
            <Field>
              <FieldLabel>LinkedIn Profile</FieldLabel>
              <FieldContent>
                <div className="flex">
                  <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                    <Linkedin />
                  </div>
                  <Input
                    className="rounded-l-none"
                    placeholder="https://linkedin.com/in/username"
                    {...form.register("linkedin")}
                  />
                </div>
              </FieldContent>
              <FieldDescription>
                Enter the team member's LinkedIn profile URL
              </FieldDescription>
              <FieldError>
                {form.formState.errors.linkedin?.message}
              </FieldError>
            </Field>
          </FieldSet>

          {/* Live Preview Card */}
          {(name || role || imageUrl) && (
            <div className="rounded-lg border bg-card p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Live Preview</h4>
                <Badge variant="secondary">Preview</Badge>
              </div>

              <div className="flex items-center gap-4">
                {/* Avatar Preview */}
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden relative">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={name || "Preview"}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover rounded-full"
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
                    <Linkedin />
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
      </DialogContent>
    </Dialog>
  );
}
