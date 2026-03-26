// components/modals/AdminEditJobModal.tsx
"use client";

import { useEffect, useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Loader2,
  MapPin,
  Mail,
  Users,
  Calendar,
  CheckCircle2,
  Target,
  Code,
  Gift,
  Plus,
  X,
  CalendarDays,
} from "lucide-react";
import { usePatch } from "@/hooks/tanstack/usePatch";
import Swal from "sweetalert2";
import { IJobPosting } from "@/types";
import { formatDate } from "@/utils";

// Form validation schema
const formSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must not exceed 200 characters"),
  department: z.string().min(2, "Department must be at least 2 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  employmentType: z.string().min(1, "Please select employment type"),
  workplaceType: z.string().min(1, "Please select workplace type"),
  experienceLevel: z.string().min(1, "Please select experience level"),
  experienceRequired: z.string().min(1, "Experience required is required"),
  salaryMin: z.number().min(0, "Minimum salary must be at least 0"),
  salaryMax: z.number().min(0, "Maximum salary must be at least 0"),
  salaryCurrency: z.string().default("BDT"),
  salaryPeriod: z.string().default("month"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(2000, "Description must not exceed 2000 characters"),
  responsibilities: z.array(z.string()).min(1, "At least one responsibility is required"),
  requirements: z.array(z.string()).min(1, "At least one requirement is required"),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  benefits: z.array(z.string()).min(1, "At least one benefit is required"),
  applicationDeadline: z.string().min(1, "Application deadline is required"),
  openings: z.number().min(1, "At least 1 opening is required"),
  isActive: z.boolean().default(true),
  contactEmail: z.string().email("Please enter a valid email"),
});

type FormValues = z.infer<typeof formSchema>;

// Predefined options
const employmentTypes = ["Full-time", "Part-time", "Contract", "Internship", "Freelance"];
const workplaceTypes = ["Remote", "On-site", "Hybrid"];
const experienceLevels = ["Entry", "Junior", "Mid-Level", "Senior", "Lead", "Executive"];
const salaryCurrencies = ["BDT", "USD", "EUR", "GBP"];
const salaryPeriods = ["month", "year", "hour", "day"];

interface AdminEditJobModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  jobData: IJobPosting;
  onSuccess?: () => void;
}

export default function AdminEditJobModal({
  isModalOpen,
  setIsModalOpen,
  jobData,
  onSuccess,
}: AdminEditJobModalProps) {
  const { mutateAsync: updateData, isPending: isLoading } = usePatch({
    url: `/job-postings/${jobData._id}`,
  });

  const [activeTab, setActiveTab] = useState("basic");
  const [responsibilityInput, setResponsibilityInput] = useState("");
  const [requirementInput, setRequirementInput] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [benefitInput, setBenefitInput] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      department: "",
      location: "",
      employmentType: "",
      workplaceType: "",
      experienceLevel: "",
      experienceRequired: "",
      salaryMin: 0,
      salaryMax: 0,
      salaryCurrency: "BDT",
      salaryPeriod: "month",
      description: "",
      responsibilities: [],
      requirements: [],
      skills: [],
      benefits: [],
      applicationDeadline: "",
      openings: 1,
      isActive: true,
      contactEmail: "",
    },
  });

  const responsibilities = form.watch("responsibilities");
  const requirements = form.watch("requirements");
  const skills = form.watch("skills");
  const benefits = form.watch("benefits");

  // Reset form when jobData changes or modal opens
  useEffect(() => {
    if (jobData && isModalOpen) {
      // Format date to YYYY-MM-DD for date input
      const formattedDeadline = jobData.applicationDeadline
        ? new Date(jobData.applicationDeadline).toISOString().split("T")[0]
        : "";

      form.reset({
        title: jobData.title || "",
        department: jobData.department || "",
        location: jobData.location || "",
        employmentType: jobData.employmentType || "",
        workplaceType: jobData.workplaceType || "",
        experienceLevel: jobData.experienceLevel || "",
        experienceRequired: jobData.experienceRequired || "",
        salaryMin: jobData.salaryRange?.min || 0,
        salaryMax: jobData.salaryRange?.max || 0,
        salaryCurrency: jobData.salaryRange?.currency || "BDT",
        salaryPeriod: jobData.salaryRange?.period || "month",
        description: jobData.description || "",
        responsibilities: jobData.responsibilities || [],
        requirements: jobData.requirements || [],
        skills: jobData.skills || [],
        benefits: jobData.benefits || [],
        applicationDeadline: formattedDeadline,
        openings: jobData.openings || 1,
        isActive: jobData.isActive ?? true,
        contactEmail: jobData.contactEmail || "",
      });
    }
  }, [jobData, isModalOpen, form]);

  // Add item to array
  const addItem = (field: keyof FormValues, value: string, setter: (val: string) => void) => {
    if (value.trim()) {
      const current = form.getValues(field) as string[];
      form.setValue(field, [...current, value.trim()] as any);
      setter("");
    }
  };

  // Remove item from array
  const removeItem = (field: keyof FormValues, index: number) => {
    const current = form.getValues(field) as string[];
    form.setValue(field, current.filter((_, i) => i !== index) as any);
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const payload = {
        ...data,
        salaryRange: {
          min: data.salaryMin,
          max: data.salaryMax,
          currency: data.salaryCurrency,
          period: data.salaryPeriod,
        },
      };
      delete payload.salaryMin;
      delete payload.salaryMax;
      delete payload.salaryCurrency;
      delete payload.salaryPeriod;

      const response = await updateData(payload);

      if (response.success) {
        setIsModalOpen(false);
        form.reset();
        onSuccess?.();

        await Swal.fire({
          title: "Success!",
          text: "Job posting updated successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        await Swal.fire({
          title: "Error",
          text: response.message || "Failed to update job posting",
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
    setActiveTab("basic");
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Edit Job Posting
          </DialogTitle>
          <DialogDescription>
            Update the details of your job posting.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="basic" className="text-sm">
              Basic Info
            </TabsTrigger>
            <TabsTrigger value="details" className="text-sm">
              Job Details
            </TabsTrigger>
            <TabsTrigger value="requirements" className="text-sm">
              Requirements
            </TabsTrigger>
            <TabsTrigger value="additional" className="text-sm">
              Additional
            </TabsTrigger>
          </TabsList>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Tab 1: Basic Information */}
              <TabsContent value="basic" className="space-y-6">
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Frontend Developer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Department */}
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Development" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Location and Employment Type */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <div className="flex">
                            <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <Input
                              className="rounded-l-none"
                              placeholder="e.g., Dhaka, Bangladesh"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="employmentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employment Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {employmentTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Workplace Type and Experience Level */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="workplaceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Workplace Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {workplaceTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="experienceLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Experience Level</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {experienceLevels.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Experience Required */}
                <FormField
                  control={form.control}
                  name="experienceRequired"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience Required</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 2-3 years" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Contact Email */}
                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Email</FormLabel>
                      <FormControl>
                        <div className="flex">
                          <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <Input
                            className="rounded-l-none"
                            placeholder="careers@company.com"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button type="button" onClick={() => setActiveTab("details")}>
                    Next
                  </Button>
                </div>
              </TabsContent>

              {/* Tab 2: Job Details */}
              <TabsContent value="details" className="space-y-6">
                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the role and its impact..."
                          className="min-h-[120px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Salary Range */}
                <div className="space-y-4">
                  <FormLabel>Salary Range</FormLabel>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="salaryMin"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Minimum"
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                              value={field.value}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="salaryMax"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Maximum"
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                              value={field.value}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="salaryCurrency"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Currency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {salaryCurrencies.map((curr) => (
                                <SelectItem key={curr} value={curr}>
                                  {curr}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="salaryPeriod"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Period" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {salaryPeriods.map((period) => (
                                <SelectItem key={period} value={period}>
                                  Per {period}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Openings and Deadline */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="openings"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Openings</FormLabel>
                        <FormControl>
                          <div className="flex">
                            <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                              <Users className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <Input
                              type="number"
                              className="rounded-l-none"
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                              value={field.value}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="applicationDeadline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Application Deadline</FormLabel>
                        <FormControl>
                          <div className="flex">
                            <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <Input type="date" className="rounded-l-none" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Active Status */}
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Active Job Posting</FormLabel>
                        <FormDescription>
                          Inactive jobs won't be visible to applicants
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("basic")}>
                    Back
                  </Button>
                  <Button type="button" onClick={() => setActiveTab("requirements")}>
                    Next
                  </Button>
                </div>
              </TabsContent>

              {/* Tab 3: Requirements */}
              <TabsContent value="requirements" className="space-y-6">
                {/* Responsibilities */}
                <FormField
                  control={form.control}
                  name="responsibilities"
                  render={() => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Responsibilities
                      </FormLabel>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a responsibility..."
                          value={responsibilityInput}
                          onChange={(e) => setResponsibilityInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addItem("responsibilities", responsibilityInput, setResponsibilityInput);
                            }
                          }}
                        />
                        <Button
                          type="button"
                          onClick={() => addItem("responsibilities", responsibilityInput, setResponsibilityInput)}
                          variant="secondary"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {responsibilities.map((item, index) => (
                          <Badge key={index} variant="secondary" className="gap-1 pr-1">
                            {item}
                            <button
                              type="button"
                              onClick={() => removeItem("responsibilities", index)}
                              className="ml-1 hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Requirements */}
                <FormField
                  control={form.control}
                  name="requirements"
                  render={() => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Requirements
                      </FormLabel>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a requirement..."
                          value={requirementInput}
                          onChange={(e) => setRequirementInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addItem("requirements", requirementInput, setRequirementInput);
                            }
                          }}
                        />
                        <Button
                          type="button"
                          onClick={() => addItem("requirements", requirementInput, setRequirementInput)}
                          variant="secondary"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {requirements.map((item, index) => (
                          <Badge key={index} variant="secondary" className="gap-1 pr-1">
                            {item}
                            <button
                              type="button"
                              onClick={() => removeItem("requirements", index)}
                              className="ml-1 hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Skills */}
                <FormField
                  control={form.control}
                  name="skills"
                  render={() => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        Required Skills
                      </FormLabel>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a skill..."
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addItem("skills", skillInput, setSkillInput);
                            }
                          }}
                        />
                        <Button
                          type="button"
                          onClick={() => addItem("skills", skillInput, setSkillInput)}
                          variant="secondary"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {skills.map((item, index) => (
                          <Badge key={index} variant="outline" className="gap-1 pr-1">
                            {item}
                            <button
                              type="button"
                              onClick={() => removeItem("skills", index)}
                              className="ml-1 hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Benefits */}
                <FormField
                  control={form.control}
                  name="benefits"
                  render={() => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Gift className="h-4 w-4" />
                        Benefits
                      </FormLabel>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a benefit..."
                          value={benefitInput}
                          onChange={(e) => setBenefitInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addItem("benefits", benefitInput, setBenefitInput);
                            }
                          }}
                        />
                        <Button
                          type="button"
                          onClick={() => addItem("benefits", benefitInput, setBenefitInput)}
                          variant="secondary"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {benefits.map((item, index) => (
                          <Badge key={index} variant="secondary" className="gap-1 pr-1">
                            {item}
                            <button
                              type="button"
                              onClick={() => removeItem("benefits", index)}
                              className="ml-1 hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("details")}>
                    Back
                  </Button>
                  <Button type="button" onClick={() => setActiveTab("additional")}>
                    Next
                  </Button>
                </div>
              </TabsContent>

              {/* Tab 4: Additional & Submit */}
              <TabsContent value="additional" className="space-y-6">
                {/* Summary Preview */}
                <div className="rounded-lg border bg-card p-6 space-y-4">
                  <h4 className="text-sm font-medium">Summary Preview</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Title:</strong> {form.watch("title") || "Not set"}
                    </p>
                    <p>
                      <strong>Department:</strong> {form.watch("department") || "Not set"}
                    </p>
                    <p>
                      <strong>Location:</strong> {form.watch("location") || "Not set"}
                    </p>
                    <p>
                      <strong>Employment Type:</strong> {form.watch("employmentType") || "Not set"}
                    </p>
                    <p>
                      <strong>Openings:</strong> {form.watch("openings") || "Not set"}
                    </p>
                    <p>
                      <strong>Responsibilities:</strong> {responsibilities.length} items
                    </p>
                    <p>
                      <strong>Requirements:</strong> {requirements.length} items
                    </p>
                    <p>
                      <strong>Skills:</strong> {skills.length} items
                    </p>
                    <p>
                      <strong>Benefits:</strong> {benefits.length} items
                    </p>
                  </div>
                </div>

                {/* Metadata - Show when editing */}
                {jobData && (
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
                          {formatDate(jobData.createdAt)}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Last updated:
                        </span>{" "}
                        <span className="font-mono">
                          {formatDate(jobData.updatedAt)}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-muted-foreground">ID:</span>{" "}
                        <span className="font-mono text-xs">
                          {jobData._id}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("requirements")}>
                    Back
                  </Button>
                  <Button type="submit" disabled={isLoading} className="text-white">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Update Job Posting
                  </Button>
                </div>
              </TabsContent>
            </form>
          </Form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}