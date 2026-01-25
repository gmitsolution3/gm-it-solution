import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Smartphone,
  Palette,
  TrendingUp,
  Briefcase,
  Settings,
  Code2,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const services = [
  {
    id: "web",
    icon: Globe,
    title: "Web Development",
    description: "Custom websites and web applications built with modern frameworks for performance and scalability.",
    features: [
      "Custom website development",
      "E-commerce solutions",
      "Progressive web apps (PWA)",
      "API development & integration",
      "CMS implementation",
      "Performance optimization",
    ],
    technologies: ["React", "Next.js", "Node.js", "PostgreSQL", "TypeScript", "Prisma", "Tailwind CSS", "Shadcn UI"],
    image: [
      "https://i.postimg.cc/fygYZ294/pexels-divinetechygirl-1181263-(1).jpg",
      "https://i.postimg.cc/fWHcxLgv/pexels-goumbik-574071.jpg",
      "https://i.postimg.cc/zvPT5tg8/pexels-hiteshchoudhary-1261427.jpg",
      "https://i.postimg.cc/PJq1gsN1/pexels-kevin-ku-92347-577585.jpg",
      "https://i.postimg.cc/prdKwbpN/pexels-pixabay-159299.jpg",
      "https://i.postimg.cc/tJgFKQ7D/pexels-realtoughcandy-11035380.jpg",
    ],
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile apps that deliver exceptional user experiences.",
    features: [
      "iOS app development",
      "Android app development",
      "Cross-platform solutions",
      "App store optimization",
      "Push notifications",
      "Offline functionality",
    ],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
    image: [
      "https://i.postimg.cc/HLpnZ0rK/pexels-kadiremir-31148083.jpg",
      "https://i.postimg.cc/fWHcxLgv/pexels-goumbik-574071.jpg",
      "https://i.postimg.cc/bvzrC0ZF/pexels-ivan-s-7213210.jpg",
      "https://i.postimg.cc/LsH5CkJw/pexels-ivan-s-7213504.jpg",
      "https://i.postimg.cc/fbwy27V2/pexels-rccbtn-15406295.jpg",
      "https://i.postimg.cc/Jh1063sB/pexels-realtoughcandy-11035474.jpg",
      "https://i.postimg.cc/zfJvtwyW/pexels-sanketgraphy-16229745.jpg",
    ],
  },
  {
    id: "design",
    icon: Palette,
    title: "UI/UX Design",
    description: "User-centered design that converts visitors into customers through intuitive interfaces.",
    features: [
      "User research & analysis",
      "Wireframing & prototyping",
      "Visual design",
      "Interaction design",
      "Usability testing",
      "Design systems",
    ],
    technologies: ["Figma", "Adobe XD", "Sketch", "Principle", "Framer"],
    image: [
      "https://i.postimg.cc/kgYzzqGm/pexels-dlxmedia-hu-215591835-11894290.jpg",
      "https://i.postimg.cc/9MdxmhmC/pexels-ron-lach-8102680.jpg",
      "https://i.postimg.cc/VNSpcpr3/pexels-firosnv-8171308.jpg",
      "https://i.postimg.cc/vm1kdkxR/pexels-kawerodriguess-16313512.jpg",
      "https://i.postimg.cc/NjCSSBFv/pexels-sami-aksu-48867324-10003549.jpg",
      "https://i.postimg.cc/VNSpcp0c/pexels-tranmautritam-326518.jpg",
    ],
  },
  {
    id: "marketing",
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "Data-driven marketing strategies that increase visibility and drive qualified leads.",
    features: [
      "Search engine optimization (SEO)",
      "Pay-per-click advertising",
      "Social media marketing",
      "Content marketing",
      "Email marketing",
      "Analytics & reporting",
    ],
    technologies: ["Google Analytics", "SEMrush", "HubSpot", "Meta Ads", "Google Ads"],
    image: [
      "https://i.postimg.cc/66GZG0nV/pexels-a-darmel-7642113.jpg",
      "https://i.postimg.cc/FFJSJZ3Z/pexels-eva-bronzini-7661590.jpg",
      "https://i.postimg.cc/2jBWBwhQ/pexels-goumbik-590016.jpg",
      "https://i.postimg.cc/Pf8D84YP/pexels-jakubzerdzicki-29277702.jpg",
      "https://i.postimg.cc/Pf8D84YJ/pexels-jakubzerdzicki-32045959.jpg",
      "https://i.postimg.cc/Pf8D84YD/pexels-kindelmedia-7688102.jpg",
      "https://i.postimg.cc/NGrXr4mx/pexels-pixabay-267401.jpg",
    ],
  },
  {
    id: "branding",
    icon: Briefcase,
    title: "Branding & Graphics",
    description: "Complete brand identity development that sets you apart from the competition.",
    features: [
      "Logo design",
      "Brand guidelines",
      "Marketing collateral",
      "Social media graphics",
      "Print design",
      "Presentation design",
    ],
    technologies: ["Adobe Creative Suite", "Figma", "Canva", "Illustrator", "Photoshop"],
    image: [
      "https://i.postimg.cc/FFJSJZ3Z/pexels-eva-bronzini-7661590.jpg",
      "https://i.postimg.cc/NGrXr4mx/pexels-pixabay-267401.jpg",
      "https://i.postimg.cc/2jBWBwhQ/pexels-goumbik-590016.jpg",
      "https://i.postimg.cc/Pf8D84YP/pexels-jakubzerdzicki-29277702.jpg",
      "https://i.postimg.cc/66GZG0nV/pexels-a-darmel-7642113.jpg",
      "https://i.postimg.cc/Pf8D84YJ/pexels-jakubzerdzicki-32045959.jpg",
      "https://i.postimg.cc/Pf8D84YD/pexels-kindelmedia-7688102.jpg",
    ],
  },
  {
    id: "automation",
    icon: Settings,
    title: "Business Automation",
    description: "Streamline operations with custom software solutions and workflow automation.",
    features: [
      "Process automation",
      "CRM implementation",
      "ERP solutions",
      "Workflow optimization",
      "Data integration",
      "Custom software development",
    ],
    technologies: ["Zapier", "Make", "Python", "Power Automate", "Custom APIs"],
    image: [
      "https://i.postimg.cc/fWHcxLgv/pexels-goumbik-574071.jpg",
      "https://i.postimg.cc/bvzrC0ZF/pexels-ivan-s-7213210.jpg",
      "https://i.postimg.cc/LsH5CkJw/pexels-ivan-s-7213504.jpg",
      "https://i.postimg.cc/HLpnZ0rK/pexels-kadiremir-31148083.jpg",
      "https://i.postimg.cc/fbwy27V2/pexels-rccbtn-15406295.jpg",
      "https://i.postimg.cc/Jh1063sB/pexels-realtoughcandy-11035474.jpg",
      "https://i.postimg.cc/zfJvtwyW/pexels-sanketgraphy-16229745.jpg",
    ],
  },
  {
    id: "software",
    icon: Code2,
    title: "Custom Software Solutions",
    description: "Tailored software solutions designed to solve your unique business challenges.",
    features: [
      "Requirements analysis",
      "Architecture design",
      "Agile development",
      "Quality assurance",
      "Deployment & DevOps",
      "Maintenance & support",
    ],
    technologies: ["AWS", "Docker", "Kubernetes", "CI/CD", "Microservices"],
    image: [
      "https://i.postimg.cc/HLpnZ0rK/pexels-kadiremir-31148083.jpg",
      "https://i.postimg.cc/fWHcxLgv/pexels-goumbik-574071.jpg",
      "https://i.postimg.cc/bvzrC0ZF/pexels-ivan-s-7213210.jpg",
      "https://i.postimg.cc/LsH5CkJw/pexels-ivan-s-7213504.jpg",
      "https://i.postimg.cc/fbwy27V2/pexels-rccbtn-15406295.jpg",
      "https://i.postimg.cc/Jh1063sB/pexels-realtoughcandy-11035474.jpg",
      "https://i.postimg.cc/zfJvtwyW/pexels-sanketgraphy-16229745.jpg",
    ],
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6">
              Solutions That <span className="gradient-text">Drive Growth</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive digital services tailored to transform your business
              and achieve your goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-24">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6">
                    <service.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    {service.description}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-3 mb-8">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {service.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm bg-muted rounded-full text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Button variant="hero" size="lg" asChild>
                    <Link to="/contact">
                      Get Started
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </div>

                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 p-8 flex items-center justify-center">
                    <Carousel className="w-full h-full">
                      <CarouselContent>
                        {service.image.map((image, idx) => (
                          <CarouselItem key={idx}>
                            <div className="w-full h-full overflow-hidden rounded-lg">
                              <img
                                src={image}
                                alt={`${service.title} preview ${idx + 1}`}
                                className="w-full h-full object-cover aspect-[4/3] rounded-lg"
                              />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's discuss your project and find the perfect solution for your business.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">
                Contact Us Today
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;