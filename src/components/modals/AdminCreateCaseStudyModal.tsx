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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  X,
  Plus,
} from "lucide-react";
import { usePost } from "@/hooks/tanstack/usePost";
import { useFetch } from "@/hooks/tanstack/useFetch";
import Swal from "sweetalert2";
import { IPortfolioItem } from "@/types";

// Form validation schema - removed image field
const formSchema = z.object({
  portfolioId: z.string().min(1, "Please select a portfolio item"),
  overview: z
    .string()
    .min(10, "Overview must be at least 10 characters")
    .max(500, "Overview must not exceed 500 characters"),
  challenge: z
    .string()
    .min(10, "Challenge must be at least 10 characters")
    .max(500, "Challenge must not exceed 500 characters"),
  solution: z
    .string()
    .min(10, "Solution must be at least 10 characters")
    .max(500, "Solution must not exceed 500 characters"),
  features: z
    .array(z.string())
    .min(1, "At least one feature is required"),
  technologies: z
    .array(z.string())
    .min(1, "At least one technology is required"),
  results: z
    .string()
    .min(10, "Results must be at least 10 characters")
    .max(500, "Results must not exceed 500 characters"),
});

type FormValues = z.infer<typeof formSchema>;

interface AdminCreateCaseStudyModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function AdminCreateCaseStudyModal({
  isModalOpen,
  setIsModalOpen,
  onSuccess,
}: AdminCreateCaseStudyModalProps) {
  const { mutateAsync: postData, isPending: isLoading } = usePost({
    url: "/case-studies",
  });

  // Fetch portfolios for dropdown
  const { data: portfoliosData, isLoading: isLoadingPortfolios } =
    useFetch({
      queryKey: ["portfolios"],
      url: "/portfolios",
    });

  const portfolios: IPortfolioItem[] = portfoliosData?.data || [];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      portfolioId: "",
      overview: "",
      challenge: "",
      solution: "",
      features: [],
      technologies: [],
      results: "",
    },
  });

  const [featureInput, setFeatureInput] = useState("");
  const [techInput, setTechInput] = useState("");

  const features = form.watch("features");
  const technologies = form.watch("technologies");

  const addFeature = () => {
    if (featureInput.trim()) {
      const currentFeatures = form.getValues("features") || [];
      form.setValue("features", [
        ...currentFeatures,
        featureInput.trim(),
      ]);
      setFeatureInput("");
    }
  };

  const removeFeature = (index: number) => {
    const currentFeatures = form.getValues("features") || [];
    form.setValue(
      "features",
      currentFeatures.filter((_, i) => i !== index),
    );
  };

  const addTechnology = () => {
    if (techInput.trim()) {
      const currentTech = form.getValues("technologies") || [];
      form.setValue("technologies", [
        ...currentTech,
        techInput.trim(),
      ]);
      setTechInput("");
    }
  };

  const removeTechnology = (index: number) => {
    const currentTech = form.getValues("technologies") || [];
    form.setValue(
      "technologies",
      currentTech.filter((_, i) => i !== index),
    );
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await postData(data);

      if (response.success) {
        setIsModalOpen(false);
        form.reset();
        onSuccess?.();

        await Swal.fire({
          title: "Success!",
          text: "Case study created successfully",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        await Swal.fire({
          title: "Error",
          text: response.message || "Failed to create case study",
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
    setFeatureInput("");
    setTechInput("");
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Create New Case Study
          </DialogTitle>
          <DialogDescription>
            Add a detailed case study for a portfolio project.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            {/* Portfolio Selection - Using simple Select */}
            <FormField
              control={form.control}
              name="portfolioId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Portfolio Item</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                    disabled={isLoadingPortfolios}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue 
                          placeholder={
                            isLoadingPortfolios 
                              ? "Loading portfolios..." 
                              : "Select a portfolio item"
                          } 
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {portfolios.map((portfolio) => (
                        <SelectItem key={portfolio._id} value={portfolio._id}>
                          <div className="flex flex-col">
                            <span>{portfolio.title}</span>
                            <span className="text-xs text-muted-foreground">
                              {portfolio.category}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select which portfolio item this case study belongs to
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Overview */}
            <FormField
              control={form.control}
              name="overview"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Overview</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief overview of the project..."
                      className="min-h-[100px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a concise overview of the project
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Challenge and Solution Grid */}
            <div className="grid grid-cols-2 gap-6">
              {/* Challenge */}
              <FormField
                control={form.control}
                name="challenge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Challenge</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="What challenges did you face?"
                        className="min-h-[120px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Solution */}
              <FormField
                control={form.control}
                name="solution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Solution</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="How did you solve them?"
                        className="min-h-[120px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Features */}
            <FormField
              control={form.control}
              name="features"
              render={() => (
                <FormItem>
                  <FormLabel>Features</FormLabel>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a feature..."
                      value={featureInput}
                      onChange={(e) =>
                        setFeatureInput(e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addFeature();
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={addFeature}
                      variant="secondary"
                      className="shrink-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {features.map((feature, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="gap-1 pr-1"
                      >
                        {feature}
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <FormDescription>
                    Add key features of the project
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Technologies */}
            <FormField
              control={form.control}
              name="technologies"
              render={() => (
                <FormItem>
                  <FormLabel>Technologies</FormLabel>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a technology..."
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTechnology();
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={addTechnology}
                      variant="secondary"
                      className="shrink-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {technologies.map((tech, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="gap-1 pr-1"
                      >
                        {tech}
                        <button
                          type="button"
                          onClick={() => removeTechnology(index)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <FormDescription>
                    Add technologies used in the project
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Results */}
            <FormField
              control={form.control}
              name="results"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Results</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What were the outcomes and results?"
                      className="min-h-[100px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Describe the results and impact of the project
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                Create Case Study
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}