"use client";

import BlogLoader from "@/components/blog/BlogLoader";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/swr/useFetch";
import { IBlog } from "@/types";
import { formatDate } from "@/utils";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { memo, useMemo, useState } from "react";

const BlogPageComponent = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const [visiblePosts, setVisiblePosts] = useState(6);

  const { data: blogData, isLoading, isError } = useFetch("/blogs");

  const allPosts: IBlog[] = blogData?.data || [];

  const featuredPosts = useMemo(
    () => allPosts.filter((post) => post.featured === true),
    [allPosts],
  );

  const otherPosts = useMemo(
    () => allPosts.filter((post) => !post.featured),
    [allPosts],
  );

  const categories = useMemo(
    () => ["All", ...new Set(allPosts.map((post) => post.category))],
    [allPosts],
  );

  const filteredPosts = useMemo(
    () =>
      otherPosts.filter(
        (post) =>
          activeCategory === "All" ||
          post.category === activeCategory,
      ),
    [otherPosts, activeCategory],
  );

  const visiblePostsData = useMemo(
    () => filteredPosts.slice(0, visiblePosts),
    [filteredPosts, visiblePosts],
  );

  const hasMorePosts = visiblePosts < filteredPosts.length;

  const getCategoryCount = (category: string) => {
    if (category === "All") return allPosts.length;

    return allPosts.filter((post) => post.category === category)
      .length;
  };

  const loadMore = () => {
    setVisiblePosts((prev) => prev + 6);
  };

  if (isLoading) {
    return <BlogLoader />;
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Blog Posts
          </h2>

          <p className="text-muted-foreground mb-6">
            {"Failed to load blog posts. Please try again later."}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />

          <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Blog & Insights
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6">
              Latest <span className="gradient-text">Articles</span>
            </h1>

            <p className="text-xl text-muted-foreground">
              Stay updated with the latest trends, tips, and insights
              from our team of experts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Categories */}
          {categories.length > 1 && (
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.2,
              }}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);

                    setVisiblePosts(6);
                  }}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-primary text-white shadow-lg shadow-primary/30"
                      : "bg-card text-muted-foreground hover:bg-primary/10 border border-border"
                  }`}
                >
                  {category} ({getCategoryCount(category)})
                </button>
              ))}
            </motion.div>
          )}

          {allPosts.length > 0 ? (
            <>
              {/* Featured */}
              {featuredPosts.map((post) => (
                <motion.div
                  key={post._id}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3,
                  }}
                  className="mb-16"
                >
                  <Link
                    href={`/blog/${post._id}`}
                    className="block group"
                  >
                    <div className="grid lg:grid-cols-2 gap-8 rounded-none overflow-hidden bg-card border border-border hover:border-primary/30 transition-all duration-300">
                      <div className="aspect-[16/10] lg:aspect-auto overflow-hidden relative">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          priority
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="p-8 flex flex-col justify-center">
                        <span className="text-primary text-sm font-medium">
                          {post.category}
                        </span>

                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2 mb-4 group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>

                        <p className="text-muted-foreground mb-6">
                          {post.excerpt}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            {post.author}
                          </span>

                          <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {formatDate(post.date)}
                          </span>

                          <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </span>
                        </div>

                        {post.featured && (
                          <div className="mt-4">
                            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                              Featured Article
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}

              {/* Grid */}
              {visiblePostsData.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {visiblePostsData.map((post, index) => (
                    <motion.div
                      key={post._id}
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.6,
                        delay: 0.4 + index * 0.1,
                      }}
                    >
                      <Link
                        href={`/blog/${post._id}`}
                        className="block group h-full"
                      >
                        <div className="h-full rounded-none overflow-hidden bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                          <div className="aspect-video overflow-hidden relative">
                            <Image
                              src={post.image}
                              alt={post.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
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
                              <span className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                {post.author}
                              </span>

                              <span>•</span>

                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {post.readTime}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-xl text-muted-foreground">
                    No posts found in this category.
                  </p>
                </div>
              )}

              {/* Load More */}
              {hasMorePosts && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3,
                  }}
                  className="text-center mt-15 relative"
                >
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={loadMore}
                    className="rounded-none relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Load More Articles
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>

                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                        repeatDelay: 1,
                      }}
                    />
                  </Button>
                </motion.div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">
                No blog posts available at the moment.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default memo(BlogPageComponent);
