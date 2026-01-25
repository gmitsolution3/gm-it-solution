import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const categories = ["All", "Web", "Mobile", "Design", "Marketing"];

const projects = [
  {
    id: 1,
    title: "FinTech Dashboard",
    category: "Web",
    description: "A comprehensive financial management platform with real-time analytics.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    tags: ["React", "Node.js", "PostgreSQL"],
  },
  {
    id: 2,
    title: "E-Commerce Mobile App",
    category: "Mobile",
    description: "Cross-platform shopping app with seamless checkout experience.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
    tags: ["React Native", "Firebase", "Stripe"],
  },
  {
    id: 3,
    title: "Healthcare Portal",
    category: "Design",
    description: "Patient management system with intuitive interface.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
    tags: ["Figma", "React", "HIPAA"],
  },
  {
    id: 4,
    title: "SaaS Marketing Website",
    category: "Marketing",
    description: "High-converting landing pages that increased sign-ups by 150%.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    tags: ["Next.js", "SEO", "Analytics"],
  },
  {
    id: 5,
    title: "Real Estate Platform",
    category: "Web",
    description: "Property listing and management system with virtual tours.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 6,
    title: "Fitness Tracking App",
    category: "Mobile",
    description: "Health and fitness app with workout tracking and nutrition plans.",
    image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&h=600&fit=crop",
    tags: ["Flutter", "Firebase", "HealthKit"],
  },
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = projects.filter(
    (project) => activeCategory === "All" || project.category === activeCategory
  );

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
              Our Work
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6">
              Featured <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Explore our portfolio of successful projects and see how we've helped
              businesses transform digitally.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter & Projects */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link to={`/portfolio/${project.id}`} className="block group">
                  <div className="rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                          <ExternalLink className="w-5 h-5 text-primary-foreground" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <span className="text-primary text-sm font-medium">
                        {project.category}
                      </span>
                      <h3 className="text-xl font-semibold text-foreground mt-2 mb-3 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs font-medium bg-muted rounded-full text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;