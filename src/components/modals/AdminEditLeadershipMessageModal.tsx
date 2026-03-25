// components/modals/AdminEditLeadershipMessageModal.tsx
"use client";

import { useState, useEffect } from "react";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Loader2,
  Quote,
  Video,
  User,
  Upload,
  Calendar,
} from "lucide-react";
import { usePatch } from "@/hooks/tanstack/usePatch";
import Swal from "sweetalert2";
import { ImageUploader } from "@/components/image-uploader";
import { ILeadershipMessage } from "@/types";
import { formatDate } from "@/utils";

// Form validation schema - quote is optional
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
});

type FormValues = z.infer<typeof formSchema>;

interface AdminEditLeadershipMessageModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  messageData: ILeadershipMessage;
  onSuccess?: () => void;
}

export default function AdminEditLeadershipMessageModal({
  isModalOpen,
  setIsModalOpen,
  messageData,
  onSuccess,
}: AdminEditLeadershipMessageModalProps) {
  const { mutateAsync: updateData, isPending: isLoading } = usePatch({
    url: `/leadership-message/${messageData._id}`,
  });

  const [activeTab, setActiveTab] = useState<"chairman" | "ceo">(
    messageData.role === "chairman" ? "chairman" : "ceo",
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "",
      quote: "",
      image: "",
      message: "",
      videoUrl: "",
    },
  });

  const imageUrl = form.watch("image");
  const quote = form.watch("quote");
  const message = form.watch("message");
  const videoUrl = form.watch("videoUrl");

  // Reset form when messageData changes or modal opens
  useEffect(() => {
    if (messageData && isModalOpen) {
      form.reset({
        role: messageData.role || "",
        quote: messageData.quote || "",
        image: messageData.image || "",
        message: messageData.message || "",
        videoUrl: messageData.videoUrl || "",
      });
      setActiveTab(
        messageData.role === "chairman" ? "chairman" : "ceo",
      );
    }
  }, [messageData, isModalOpen, form]);

  // Handle tab change
  const handleTabChange = (value: string) => {
    const newRole = value as "chairman" | "ceo";
    setActiveTab(newRole);
    form.setValue("role", newRole);
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
          text: `${data.role === "chairman" ? "Chairman" : "CEO"} message updated successfully`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        await Swal.fire({
          title: "Error",
          text:
            response.message || "Failed to update leadership message",
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
            Edit Leadership Message
          </DialogTitle>
          <DialogDescription>
            Update the leadership message for{" "}
            {activeTab === "chairman" ? "Chairman" : "CEO"}.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            {/* Hidden role field */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <input type="hidden" {...field} />
              )}
            />

            {/* Profile Image Uploader */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel className="text-base">
                  Profile Image{" "}
                  <span className="text-destructive">*</span>
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
                        maxSize={2}
                        allowedTypes={[
                          "image/jpeg",
                          "image/png",
                          "image/webp",
                        ]}
                      />
                    </FormControl>
                    <FormDescription>
                      Upload a profile photo for the leader (max 2MB).
                      Recommended: Square image 400x400px.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Quote - Optional */}
            <FormField
              control={form.control}
              name="quote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Quote{" "}
                    <span className="text-muted-foreground text-xs font-normal">
                      (Optional)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex">
                      <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                        <Quote className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Input
                        className="rounded-l-none"
                        placeholder="e.g., Building the future of technology..."
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    A short inspirational quote from the leader (max
                    200 characters)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Video URL */}
            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Video URL{" "}
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex">
                      <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                        <Video className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Input
                        className="rounded-l-none"
                        placeholder="https://youtu.be/... or https://youtube.com/watch?v=..."
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Enter a YouTube or video URL for the leader's
                    video message
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Message */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Message{" "}
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write the leader's full message here..."
                      className="min-h-[250px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Full leadership message (20-5000 characters)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Live Preview Card */}
            {(quote || message || imageUrl || videoUrl) && (
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">
                    Live Preview
                  </h4>
                  <Badge variant="secondary">
                    {activeTab === "chairman" ? "Chairman" : "CEO"}
                  </Badge>
                </div>

                <div className="space-y-4">
                  {/* Profile Preview */}
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="h-6 w-6 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold capitalize">
                        {activeTab === "chairman"
                          ? "Chairman"
                          : "CEO"}
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

            {/* Metadata - Show when editing */}
            {messageData && (
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
                      {formatDate(messageData.createdAt)}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Last updated:
                    </span>{" "}
                    <span className="font-mono">
                      {formatDate(messageData.updatedAt)}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">ID:</span>{" "}
                    <span className="font-mono text-xs">
                      {messageData._id}
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
                Update {activeTab === "chairman" ? "Chairman" : "CEO"}{" "}
                Message
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
