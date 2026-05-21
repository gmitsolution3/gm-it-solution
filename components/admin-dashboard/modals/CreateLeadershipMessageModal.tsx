// components/admin-dashboard/modals/CreateLeadershipMessageModal.tsx
"use client";

import { useState } from "react";
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
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Loader2, Quote, Video, User, Upload } from "lucide-react";
import { usePost } from "@/hooks/swr/usePost";
import Swal from "sweetalert2";
import { ImageUploader } from "@/components/image-uploader";
import Image from "next/image";

// Form validation schema - quote is now optional
const formSchema = z.object({
  role: z.string().min(1, "Role is required"),
  quote: z
    .string()
    .max(200, "Quote must not exceed 200 characters")
    .optional()
    .or(z.literal("")),
  image: z
    .string()
    .url("Please enter a valid image URL")
    .min(1, "Profile image is required"),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(5000, "Message must not exceed 5000 characters"),
  videoUrl: z
    .string()
    .url("Please enter a valid video URL")
    .min(1, "Video URL is required"),
  imagePublicId: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateLeadershipMessageModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function CreateLeadershipMessageModal({
  isModalOpen,
  setIsModalOpen,
  onSuccess,
}: CreateLeadershipMessageModalProps) {
  const { mutate: postData, isLoading } = usePost("/leadership-message", {
    revalidateKey: "/leadership-message",
  });

  const [activeTab, setActiveTab] = useState<"chairman" | "ceo">(
    "chairman",
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "chairman",
      quote: "",
      image: "",
      message: "",
      videoUrl: "",
      imagePublicId: "",
    },
  });

  const imageUrl = form.watch("image");
  const quote = form.watch("quote");
  const message = form.watch("message");
  const videoUrl = form.watch("videoUrl");

  // Handle tab change
  const handleTabChange = (value: string) => {
    const newRole = value as "chairman" | "ceo";
    setActiveTab(newRole);
    form.setValue("role", newRole);
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const { imagePublicId, ...submitData } = data;
      const response = await postData(submitData);

      if (response.success) {
        setIsModalOpen(false);
        form.reset({
          role: "chairman",
          quote: "",
          image: "",
          message: "",
          videoUrl: "",
          imagePublicId: "",
        });
        setActiveTab("chairman");
        onSuccess?.();

        await Swal.fire({
          title: "Success!",
          text: `${data.role === "chairman" ? "Chairman" : "CEO"} message created successfully`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        await Swal.fire({
          title: "Error",
          text:
            response.message || "Failed to create leadership message",
          icon: "error",
        });
      }
    } catch (error: any) {
      console.log(error);
      await Swal.fire({
        title: "Error",
        text:
          error.status === 409
            ? "Leadership message for this role exists"
            : error.message || "An unexpected error occurred",
        icon: "error",
      });

      setIsModalOpen(false);
    }
  };

  const handleClose = () => {
    form.reset({
      role: "chairman",
      quote: "",
      image: "",
      message: "",
      videoUrl: "",
      imagePublicId: "",
    });
    setActiveTab("chairman");
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
            Add Leadership Message
          </DialogTitle>
          <DialogDescription>
            Create a new leadership message for Chairman or CEO.
          </DialogDescription>
        </DialogHeader>

        <div className="w-full">
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="chairman" className="text-base">
                <User className="h-4 w-4 mr-2" />
                Chairman
              </TabsTrigger>
              <TabsTrigger value="ceo" className="text-base">
                <User className="h-4 w-4 mr-2" />
                CEO
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Hidden role field */}
            <input type="hidden" {...form.register("role")} />

            {/* Profile Image Uploader */}
            <FieldSet>
              <Field>
                <div className="flex items-center justify-between mb-2">
                  <FieldLabel>
                    Profile Image <span className="text-destructive">*</span>
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
                  Upload a profile photo for the leader (max 2MB). Recommended: Square image 400x400px.
                </FieldDescription>
                <FieldError>{form.formState.errors.image?.message}</FieldError>
              </Field>
            </FieldSet>

            {/* Quote - Optional */}
            <FieldSet>
              <Field>
                <FieldLabel>
                  Quote{" "}
                  <span className="text-muted-foreground text-xs font-normal">
                    (Optional)
                  </span>
                </FieldLabel>
                <FieldContent>
                  <div className="flex">
                    <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                      <Quote className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      className="rounded-l-none"
                      placeholder="e.g., Building the future of technology..."
                      {...form.register("quote")}
                    />
                  </div>
                </FieldContent>
                <FieldDescription>
                  A short inspirational quote from the leader (max 200 characters)
                </FieldDescription>
                <FieldError>{form.formState.errors.quote?.message}</FieldError>
              </Field>
            </FieldSet>

            {/* Video URL */}
            <FieldSet>
              <Field>
                <FieldLabel>
                  Video URL <span className="text-destructive">*</span>
                </FieldLabel>
                <FieldContent>
                  <div className="flex">
                    <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                      <Video className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      className="rounded-l-none"
                      placeholder="https://youtu.be/... or https://youtube.com/watch?v=..."
                      {...form.register("videoUrl")}
                    />
                  </div>
                </FieldContent>
                <FieldDescription>
                  Enter a YouTube or video URL for the leader's video message
                </FieldDescription>
                <FieldError>{form.formState.errors.videoUrl?.message}</FieldError>
              </Field>
            </FieldSet>

            {/* Message */}
            <FieldSet>
              <Field>
                <FieldLabel>
                  Message <span className="text-destructive">*</span>
                </FieldLabel>
                <FieldContent>
                  <Textarea
                    placeholder="Write the leader's full message here..."
                    className="min-h-[250px] resize-none"
                    {...form.register("message")}
                  />
                </FieldContent>
                <FieldDescription>
                  Full leadership message (20-5000 characters)
                </FieldDescription>
                <FieldError>{form.formState.errors.message?.message}</FieldError>
              </Field>
            </FieldSet>

            {/* Live Preview Card */}
            {(quote || message || imageUrl || videoUrl) && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Live Preview</h4>
                  <Badge variant="secondary">
                    {activeTab === "chairman" ? "Chairman" : "CEO"}
                  </Badge>
                </div>

                <div className="space-y-4">
                  {/* Profile Preview */}
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden relative">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt="Preview"
                          width={48}
                          height={48}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <User className="h-6 w-6 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold capitalize">
                        {activeTab === "chairman" ? "Chairman" : "CEO"}
                      </p>
                      {quote && (
                        <p className="text-xs text-muted-foreground italic line-clamp-1">
                          "{quote}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message Preview */}
                  {message && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">
                        Message Preview:
                      </p>
                      <p className="text-sm line-clamp-3">
                        {message}
                      </p>
                    </div>
                  )}

                  {/* Video Preview */}
                  {videoUrl && (
                    <div className="flex items-center gap-2 text-xs text-blue-600">
                      <Video className="h-3 w-3" />
                      <span>Video URL provided</span>
                    </div>
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
                Create{" "}
                {activeTab === "chairman" ? "Chairman" : "CEO"}{" "}
                Message
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}