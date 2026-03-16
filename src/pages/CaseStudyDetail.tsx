import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import Logo from "@/assets/logo.png";
import { useGetById } from "@/hooks/tanstack/useGetById";
import { ICaseStudy } from "@/types";
import { Loader2 } from "lucide-react";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>

      <div className="text-muted-foreground leading-relaxed">
        {children}
      </div>
    </motion.section>
  );
}

export default function CaseStudyDetail() {
  const { id } = useParams();

  const { data, isLoading } = useGetById({
    id,
    url: "/case-studies",
  });

  const caseStudy: ICaseStudy = data?.data || {};


  if (isLoading) {
    return (
      <div className="pt-32 pb-20 bg-background text-foreground min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Logo */}
          <div className="flex justify-center mb-10">
            <Link to="/">
              <img src={Logo} className="h-14" alt="Logo" />
            </Link>
          </div>

          {/* Loading Animation */}
          <div className="flex flex-col items-center justify-center min-h-[500px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="relative">
                {/* Animated rings */}
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-primary/30"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-accent/30"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0, 0.2] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
                />
                <Loader2 className="w-16 h-16 text-primary animate-spin relative z-10 mx-auto" />
              </div>
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 text-lg text-muted-foreground"
              >
                Loading case study details...
              </motion.p>
              
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "200px" }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-4 mx-auto"
              />

              {/* Loading Skeleton Preview */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 space-y-4 max-w-md mx-auto"
              >
                <div className="h-4 bg-muted rounded-full w-3/4 mx-auto animate-pulse" />
                <div className="h-4 bg-muted rounded-full w-1/2 mx-auto animate-pulse" />
                <div className="h-64 bg-muted/50 rounded-xl mt-8 animate-pulse" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Not Found State
  if (!caseStudy || !caseStudy.portfolioId) {
    return (
      <div className="pt-32 pb-20 bg-background text-foreground min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Logo */}
          <div className="flex justify-center mb-10">
            <Link to="/">
              <img src={Logo} className="h-14" alt="Logo" />
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center min-h-[400px] text-center"
          >
            <div className="text-8xl mb-6">🔍</div>
            <h2 className="text-3xl font-bold mb-4">Case Study Not Found</h2>
            <p className="text-muted-foreground max-w-md mb-8">
              The case study you're looking for doesn't exist or may have been removed.
            </p>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:opacity-90 transition text-white"
            >
              Browse All Case Studies →
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Link to="/">
            <img src={Logo} className="h-14" alt="Logo" />
          </Link>
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <p className="text-primary font-medium mb-2">
            {caseStudy.portfolioId.category}
          </p>

          <h1 className="text-4xl font-bold mb-4">{caseStudy.portfolioId.title}</h1>

          <p className="text-muted-foreground">
            {caseStudy.portfolioId.description}
          </p>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto mb-16"
        >
          <img
            src={caseStudy.portfolioId.image}
            alt={caseStudy.portfolioId.title}
            className="rounded-xl w-full object-cover shadow-lg"
          />
        </motion.div>

        {/* Content */}
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Overview */}
          <Section title="Overview">{caseStudy.overview}</Section>

          {/* Challenge */}
          <Section title="The Challenge">
            {caseStudy.challenge}
          </Section>

          {/* Solution */}
          <Section title="The Solution">{caseStudy.solution}</Section>

          {/* Features */}
          <Section title="Key Features">
            <ul className="list-disc ml-6 space-y-2">
              {caseStudy.features?.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </Section>

          {/* Technologies */}
          <Section title="Technologies Used">
            <div className="flex flex-wrap gap-3">
              {caseStudy.technologies?.map((tech, i) => (
                <span
                  key={i}
                  className="bg-muted px-3 py-1 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Section>

          {/* Results */}
          <Section title="Results">{caseStudy.results}</Section>

          {/* Visit Website */}
          <div className="text-center pt-8">
            <a
              href={caseStudy.portfolioId.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:opacity-90 transition text-white"
            >
              Visit Website →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}