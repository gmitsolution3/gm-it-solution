import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  Mail,
  Phone,
  FileText,
  User,
  CheckCircle,
  AlertCircle,
  Upload,
  X,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PdfUploader } from "@/components/pdf-uploader";
import { usePost } from "@/hooks/tanstack/usePost";
import Swal from "sweetalert2";

const applicationSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name is required")
    .max(100, "Name is too long"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(11, "Valid phone number is required")
    .max(20, "Phone number is too long"),
  jobId: z.string(),
  coverLetter: z
    .string()
    .min(50, "Please provide a cover letter (minimum 50 characters)")
    .max(2000, "Cover letter is too long"),
  portfolioUrl: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  resume: z.string().min(1, "Resume/CV is required"),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

interface JobApplySectionProps {
  id: string;
  isDeadlinePassed: boolean;
}

export default function JobApplySection({ id, isDeadlinePassed }: JobApplySectionProps) {
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { mutateAsync: submitApplication, isPending: isSubmitting } = usePost({
    url: "/job-applications",
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      jobId: id,
      coverLetter: "",
      portfolioUrl: "",
      resume: "",
    },
  });

  // Watch the resume field to check if it has a value
  const resumeValue = watch("resume");

  const handleResumeChange = (url: string) => {
    setValue("resume", url, { shouldValidate: true });
  };

  const onSubmit = async (data: ApplicationFormData) => {
    try {
      const response = await submitApplication(data);

      if (response.success) {
        setSubmitSuccess(true);
        reset();
        
        // Clear the resume URL from form after reset
        setValue("resume", "", { shouldValidate: false });

        await Swal.fire({
          title: "Success!",
          text: "Your application has been submitted successfully!",
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
        });

        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } else {
        Swal.fire({
          title: "Error",
          text: response.message || "Failed to submit application",
          icon: "error",
        });
      }
    } catch (error: any) {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Something went wrong. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="sticky top-32">
        {isDeadlinePassed ? (
          <div className="bg-card border border-destructive/20 rounded-2xl p-8 text-center">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Application Closed
            </h3>
            <p className="text-muted-foreground">
              The application deadline for this position has passed.
              Please check our other open positions.
            </p>
            <Link
              to="/career"
              className="inline-block mt-6 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              View Other Jobs
            </Link>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold mb-2">
                Apply for this Position
              </h2>
              <p className="text-sm text-muted-foreground">
                Fill out the form below to submit your application
              </p>
            </div>

            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium text-green-600">
                    Application Submitted!
                  </p>
                  <p className="text-xs text-green-600/80">
                    We'll review your application and get back to you
                    soon.
                  </p>
                </div>
              </div>
            )}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name{" "}
                  <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    {...register("fullName")}
                    className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>
                {errors.fullName && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address{" "}
                  <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    {...register("email")}
                    className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Phone Number{" "}
                  <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="tel"
                    {...register("phone")}
                    className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                    placeholder="+880 1234 567890"
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Resume Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Resume/CV{" "}
                  <span className="text-destructive">*</span>
                </label>
                <PdfUploader
                  value={resumeValue}
                  onChange={handleResumeChange}
                  maxSize={5}
                />
                {errors.resume && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.resume.message}
                  </p>
                )}
              </div>

              {/* Portfolio URL */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Portfolio / LinkedIn URL
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="url"
                    {...register("portfolioUrl")}
                    className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                    placeholder="https://..."
                  />
                </div>
                {errors.portfolioUrl && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.portfolioUrl.message}
                  </p>
                )}
              </div>

              {/* Cover Letter */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Cover Letter{" "}
                  <span className="text-destructive">*</span>
                </label>
                <textarea
                  {...register("coverLetter")}
                  rows={5}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us why you're the perfect fit for this position..."
                />
                {errors.coverLetter && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.coverLetter.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !resumeValue}
                className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? "Submitting..."
                  : "Submit Application"}
              </button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                By submitting this application, you agree to our
                privacy policy and consent to be contacted regarding
                your application.
              </p>
            </form>
          </div>
        )}
      </div>
    </motion.div>
  );
}