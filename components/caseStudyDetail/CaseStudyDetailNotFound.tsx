import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function CaseStudyDetailNotFound() {
  return (
    <div className="pt-32 pb-20 bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Link href="/">
            <Image
              src={"/logo.png"}
              alt="Logo"
              className="h-14 w-auto"
              priority
              height={200}
              width={200}
            />
          </Link>
        </div>

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="flex flex-col items-center justify-center min-h-[400px] text-center"
        >
          <div className="text-8xl mb-6">🔍</div>

          <h2 className="text-3xl font-bold mb-4">
            Case Study Not Found
          </h2>

          <p className="text-muted-foreground max-w-md mb-8">
            The case study you're looking for doesn't exist or may
            have been removed.
          </p>

          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:opacity-90 transition text-white"
          >
            Browse All Case Studies →
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
