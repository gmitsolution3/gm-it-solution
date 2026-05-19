"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { useFetchById } from "@/hooks/swr/useFetchById";
import CarrierDetailSection from "@/components/career/CarrierDetailSection";
import JobApplySection from "@/components/career/JobApplySection";

function CareerDetailLoading() {
  return (
    <div className="pt-32 pb-20 bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />

            <p className="mt-4 text-muted-foreground">
              Loading job details...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CareerDetailError() {
  return (
    <div className="pt-32 pb-20 bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <Link
            href="/career"
            className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Careers
          </Link>

          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-8">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />

            <h2 className="text-xl font-semibold mb-2">
              Job Not Found
            </h2>

            <p className="text-muted-foreground mb-6">
              The position you're looking for doesn't exist or has
              been removed.
            </p>

            <Link
              href="/career"
              className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              View All Jobs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CareerDetail() {
  const params = useParams();

  const id = params?.id as string;

  const { data, isLoading, isError } = useFetchById(
    `/job-postings`,
    id,
  );

  const job = data?.data;

  if (isLoading) {
    return <CareerDetailLoading />;
  }

  if (isError || !job) {
    return <CareerDetailError />;
  }

  const isDeadlinePassed =
    new Date(job.applicationDeadline) < new Date();

  return (
    <div className="pt-32 pb-20 bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back Button */}
        <motion.div
          initial={{
            opacity: 0,
            x: -20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="mb-8"
        >
          <Link
            href="/career"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all positions
          </Link>
        </motion.div>

        {/* Header with Logo */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="flex justify-center mb-6">
            <Link href="/">
              <Image
                src={"/logo.png"}
                alt="GM IT Solution Logo"
                className="h-12 sm:h-14 md:h-16 w-auto cursor-pointer"
                height={200}
                width={200}
              />
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Column */}
          <CarrierDetailSection
            job={job}
            isDeadlinePassed={isDeadlinePassed}
          />

          {/* Right Column */}
          <JobApplySection
            id={id}
            isDeadlinePassed={isDeadlinePassed}
          />
        </div>
      </div>
    </div>
  );
}
