import { motion } from "framer-motion";
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, User, Clock } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2024",
    excerpt: "Explore the latest trends shaping the web development landscape, from AI integration to edge computing.",
    category: "Web Development",
    author: "John Smith",
    date: "Jan 15, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop",
  },
  {
    id: 2,
    title: "UI/UX Design Principles for Better Conversion Rates",
    excerpt: "Learn how to design user interfaces that not only look great but also drive conversions and user engagement.",
    category: "UI/UX Design",
    author: "Sarah Johnson",
    date: "Jan 12, 2024",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop",
  },
  {
    id: 3,
    title: "SEO Strategies That Actually Work in 2024",
    excerpt: "Discover proven SEO strategies that will help your website rank higher and attract more organic traffic.",
    category: "Digital Marketing",
    author: "Mike Chen",
    date: "Jan 10, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=500&fit=crop",
  },
  {
    id: 4,
    title: "Building Scalable Mobile Apps with React Native",
    excerpt: "A comprehensive guide to building performant and scalable mobile applications using React Native.",
    category: "Mobile Development",
    author: "Emily Davis",
    date: "Jan 8, 2024",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop",
  },
  {
    id: 5,
    title: "How Business Automation Can Save You Time and Money",
    excerpt: "Explore how automating your business processes can increase efficiency and reduce operational costs.",
    category: "Business Growth",
    author: "David Kumar",
    date: "Jan 5, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
  },
  {
    id: 6,
    title: "The Complete Guide to E-commerce Website Development",
    excerpt: "Everything you need to know about building a successful e-commerce website from scratch.",
    category: "Web Development",
    author: "Lisa Wang",
    date: "Jan 2, 2024",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop",
  },
];

const categories = ["All", "Web Development", "UI/UX Design", "Digital Marketing", "Mobile Development", "Business Growth"];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = blogPosts.filter(
    (post) => activeCategory === "All" || post.category === activeCategory
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
              Blog & Insights
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6">
              Latest <span className="gradient-text">Articles</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Stay updated with the latest trends, tips, and insights from our team of experts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {filteredPosts.length > 0 ? (
            <>
              {/* Featured Post */}
              <motion.div
                key={filteredPosts[0].id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-16"
              >
                <Link to={`/blog/${filteredPosts[0].id}`} className="block group">
                  <div className="grid lg:grid-cols-2 gap-8 rounded-3xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-all duration-300">
                    <div className="aspect-[16/10] lg:aspect-auto overflow-hidden">
                      <img
                        src={filteredPosts[0].image}
                        alt={filteredPosts[0].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <span className="text-primary text-sm font-medium">
                        {filteredPosts[0].category}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2 mb-4 group-hover:text-primary transition-colors">
                        {filteredPosts[0].title}
                      </h2>
                      <p className="text-muted-foreground mb-6">
                        {filteredPosts[0].excerpt}
                      </p>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <span className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          {filteredPosts[0].author}
                        </span>
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {filteredPosts[0].date}
                        </span>
                        <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {filteredPosts[0].readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Post Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.slice(1).map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  >
                    <Link to={`/blog/${post.id}`} className="block group h-full">
                      <div className="h-full rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-6">
                          <span className="text-primary text-sm font-medium">
                            {post.category}
                          </span>
                          <h3 className="text-lg font-semibold text-foreground mt-2 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{post.author}</span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No posts found in this category.</p>
            </div>
          )}

          {/* Load More */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <button className="px-8 py-3 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 font-medium transition-all">
              Load More Articles
            </button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get the latest insights delivered directly to your inbox.
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <button className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;