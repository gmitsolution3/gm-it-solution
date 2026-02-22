import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import {
  Check,
  Video,
  Globe,
  Palette,
  TrendingUp,
  Briefcase,
  Code2,
} from "lucide-react";
import { CTASection } from "@/components/home/CTASection";
import CTAButton from "./../components/CTAButton";
import webDevelopmentImage from "@/assets/web_development.jpg";
import uiUxDesign from "@/assets/ui_ux.jpg";
import videoEdit from "@/assets/video_edit.jpg";
import softwareDevelopment from "@/assets/software_development.jpg";
import brandDesign from "@/assets/brand.jpg";
import digitalMarketing from "@/assets/digital_marketing.jpg";

const services = [
  {
    id: "web",
    icon: Globe,
    title: "Web Development",
    description:
      "Custom websites and web applications built with modern frameworks for performance and scalability.",
    features: [
      "Custom website development",
      "E-commerce solutions",
      "Progressive web apps (PWA)",
      "API development & integration",
      "CMS implementation",
      "Performance optimization",
    ],
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "TypeScript",
      "Prisma",
      "Tailwind CSS",
      "Shadcn UI",
    ],
    image: webDevelopmentImage,
  },
  {
    id: "design",
    icon: Palette,
    title: "UI/UX Design",
    description:
      "User-centered design that converts visitors into customers through intuitive interfaces.",
    features: [
      "User research & analysis",
      "Wireframing & prototyping",
      "Visual design",
      "Interaction design",
      "Usability testing",
      "Design systems",
    ],
    technologies: [
      "Figma",
      "Adobe XD",
      "Sketch",
      "Principle",
      "Framer",
    ],
    image: uiUxDesign,
  },
  {
    id: "marketing",
    icon: TrendingUp,
    title: "Digital Marketing",
    description:
      "Data-driven marketing strategies that increase visibility and drive qualified leads.",
    features: [
      "Search engine optimization (SEO)",
      "Pay-per-click advertising",
      "Social media marketing",
      "Content marketing",
      "Email marketing",
      "Analytics & reporting",
    ],
    technologies: [
      "Google Analytics",
      "SEMrush",
      "HubSpot",
      "Meta Ads",
      "Google Ads",
    ],
    image: digitalMarketing,
  },
  {
    id: "branding",
    icon: Briefcase,
    title: "Branding & Graphics",
    description:
      "Complete brand identity development that sets you apart from the competition.",
    features: [
      "Logo design",
      "Brand guidelines",
      "Marketing collateral",
      "Social media graphics",
      "Print design",
      "Presentation design",
    ],
    technologies: [
      "Adobe Creative Suite",
      "Figma",
      "Canva",
      "Illustrator",
      "Photoshop",
    ],
    image: brandDesign,
  },
  {
    id: "video-editing",
    icon: Video,
    title: "Professional Video Editing",
    description:
      "Transform raw footage into engaging, high-quality videos with professional editing, motion graphics, and cinematic effects.",
    features: [
      "Professional video editing",
      "Color correction & grading",
      "Motion graphics & animations",
      "YouTube & social media editing",
      "Promotional & commercial videos",
      "Subtitle & caption integration",
    ],
    technologies: [
      "Adobe Premiere Pro",
      "After Effects",
      "DaVinci Resolve",
      "Final Cut Pro",
      "CapCut Pro",
    ],
    image: videoEdit,
  },
  {
    id: "software",
    icon: Code2,
    title: "Custom Software Solutions",
    description:
      "Tailored software solutions designed to solve your unique business challenges.",
    features: [
      "Requirements analysis",
      "Architecture design",
      "Agile development",
      "Quality assurance",
      "Deployment & DevOps",
      "Maintenance & support",
    ],
    technologies: [
      "AWS",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Microservices",
    ],
    image: softwareDevelopment,
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Our Services
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-3">
              Solutions That{" "}
              <span className="gradient-text">Drive Growth</span>
            </h1>
            <p className="text-base text-muted-foreground">
              Comprehensive digital services tailored to transform
              your business and achieve your goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-24">
            {services.map((service, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={service.id}
                  id={service.id}
                  initial={{
                    opacity: 0,
                    x: isEven ? -120 : 120,
                    scale: 0.95,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1], // premium cubic-bezier
                  }}
                  className={`grid lg:grid-cols-2 gap-12 items-center`}
                >
                  <div
                    className={index % 2 === 1 ? "lg:order-2" : ""}
                  >
                    <div className="w-16 h-16 rounded-none bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6">
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                      {service.title}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                      {service.description}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-3 mb-8">
                      {service.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-2"
                        >
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                            <Check className="w-3 h-3 text-primary" />
                          </div>
                          <span className="text-muted-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {service.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-sm bg-muted rounded-none text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-start">
                      <CTAButton href={"/contact"}>
                        Get Started
                      </CTAButton>
                    </div>
                  </div>

                  <div
                    className={index % 2 === 1 ? "lg:order-1" : ""}
                  >
                    <div className="aspect-[4/3] rounded-none bg-gradient-to-br from-primary/10 to-accent/10 p-2 flex items-center justify-center">
                      <div className="w-full h-full overflow-hidden rounded-none">
                        <img
                          src={service.image}
                          alt={`${service.title} preview`}
                          className="w-full h-full object-cover aspect-[4/3] rounded-none"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </Layout>
  );
};

export default Services;
