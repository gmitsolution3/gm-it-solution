"use client";

import { motion } from "framer-motion";
import { useParams, Link, useNavigate } from "react-router";
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Share2,
  Bookmark,
  Heart,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/tanstack/useFetch";
import { useState } from "react";
import { useGetById } from "@/hooks/tanstack/useGetById";

// Loading Skeleton
const LoadingSkeleton = () => (
  <div className="animate-pulse">
    {/* Hero Section Skeleton */}
    <section className="pt-32 pb-12 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="h-8 w-32 bg-muted rounded mb-6" />
          <div className="h-12 md:h-16 bg-muted rounded-lg mb-6" />
          <div className="flex flex-wrap gap-6 mb-8">
            <div className="h-5 w-32 bg-muted rounded" />
            <div className="h-5 w-32 bg-muted rounded" />
            <div className="h-5 w-32 bg-muted rounded" />
          </div>
          <div className="aspect-video bg-muted rounded-xl" />
        </div>
      </div>
    </section>

    {/* Content Skeleton */}
    <section className="py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-11/12" />
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-10/12" />
          <div className="h-32 bg-muted rounded-lg mt-8" />
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-9/12" />
        </div>
      </div>
    </section>
  </div>
);

// Share Button Component
const ShareButtons = ({ title, url }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank",
    );
  };

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      "_blank",
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      "_blank",
    );
  };

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        size="sm"
        onClick={shareOnFacebook}
        className="rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors"
      >
        <Facebook className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={shareOnTwitter}
        className="rounded-full hover:bg-sky-50 hover:text-sky-500 transition-colors"
      >
        <Twitter className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={shareOnLinkedIn}
        className="rounded-full hover:bg-blue-50 hover:text-blue-700 transition-colors"
      >
        <Linkedin className="w-4 h-4" />
      </Button>
      <div className="relative">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyLink}
          className="rounded-full hover:bg-gray-100 transition-colors"
        >
          <LinkIcon className="w-4 h-4" />
        </Button>
        {showTooltip && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap">
            Link copied!
          </div>
        )}
      </div>
    </div>
  );
};

// Related Posts Component
const RelatedPosts = ({
  currentPostId,
  currentCategory,
  allPosts,
}) => {
  const navigate = useNavigate();

  const relatedPosts = allPosts
    ?.filter(
      (post) =>
        post._id !== currentPostId &&
        post.category === currentCategory,
    )
    .slice(0, 3);

  if (!relatedPosts?.length) return null;

  return (
    <div className="mt-16 pt-8 border-t border-border">
      <h3 className="text-2xl font-bold text-foreground mb-8">
        Related Articles
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map((post, index) => (
          <motion.div
            key={post._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Link
              to={`/blog/${post._id}`}
              className="block group h-full"
            >
              <div className="h-full rounded-lg overflow-hidden bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <span className="text-primary text-sm font-medium">
                    {post.category}
                  </span>
                  <h4 className="text-lg font-semibold text-foreground mt-2 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Main Blog Detail Component
const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Fetch single blog post

  const {
    data: blogPost,
    isLoading,
    error,
  } = useGetById({
    url: "/blogs",
    id: id,
  });

  // Fetch all posts for related articles
  const { data: allPosts, isLoading: isLoadingRelated } = useFetch({
    queryKey: ["blogs"],
    url: "/blogs",
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error || !blogPost) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-6">📝</div>
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Blog Post Not Found
          </h2>
          <p className="text-muted-foreground mb-8">
            The article you're looking for doesn't exist or has been
            moved.
          </p>
          <Button
            onClick={() => navigate("/blog")}
            className="rounded-none group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  // Mock content for demonstration (replace with actual content from API)
  const fullContent = `
    <p class="lead">${blogPost?.data?.excerpt}</p>
    
    <h2>Introduction</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    
    <h2>Key Benefits</h2>
    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    
    <ul>
      <li>Increased efficiency and productivity</li>
      <li>Cost reduction and resource optimization</li>
      <li>Improved customer experience</li>
      <li>Scalable solutions for future growth</li>
    </ul>
    
    <h2>Implementation Strategies</h2>
    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
    
    <blockquote>
      "The key to successful digital transformation is not just technology adoption, but cultural change and continuous innovation."
    </blockquote>
    
    <h2>Conclusion</h2>
    <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
  `;

  const currentUrl =
    typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <Button
                variant="ghost"
                onClick={() => navigate("/blog")}
                className="group hover:bg-transparent"
              >
                <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                Back to Blog
              </Button>
            </motion.div>

            {/* Category */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-6">
                {blogPost?.data?.category}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight"
            >
              {blogPost?.data?.title}
            </motion.h1>

            {/* Meta Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8"
            >
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{blogPost?.data?.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(blogPost?.data?.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{blogPost?.data?.readTime}</span>
              </div>
            </motion.div>

            {/* Featured Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="rounded-xl overflow-hidden shadow-2xl mb-8"
            >
              <img
                src={blogPost?.data.image}
                alt={blogPost?.data?.title}
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center justify-between mb-8 pb-4 border-b border-border"
            >
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsLiked(!isLiked)}
                  className={`rounded-full transition-colors ${
                    isLiked
                      ? "text-red-500 hover:text-red-600"
                      : "hover:text-red-500"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 mr-1 ${isLiked ? "fill-current" : ""}`}
                  />
                  <span>Like</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`rounded-full transition-colors ${
                    isBookmarked
                      ? "text-primary"
                      : "hover:text-primary"
                  }`}
                >
                  <Bookmark
                    className={`w-5 h-5 mr-1 ${isBookmarked ? "fill-current" : ""}`}
                  />
                  <span>Save</span>
                </Button>
              </div>
              <ShareButtons
                title={blogPost?.data?.title}
                url={currentUrl}
              />
            </motion.div>

            {/* Blog Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: fullContent }}
            />

            {/* Tags Section (Optional) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-8 pt-4 flex flex-wrap gap-2"
            >
              {blogPost?.data?.category && (
                <Link
                  to={`/blog?category=${encodeURIComponent(blogPost?.data?.category)}`}
                  className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  #{blogPost?.data?.category}
                </Link>
              )}
            </motion.div>

            {/* Author Bio Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-12 p-6 bg-muted/30 rounded-xl border border-border"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    {blogPost?.data?.author}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Technology enthusiast and expert in{" "}
                    {blogPost?.data?.category}. Passionate about
                    sharing insights and helping businesses grow
                    through innovative solutions.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Related Posts */}
            {!isLoadingRelated && allPosts?.data?.length > 0 && (
              <RelatedPosts
                currentPostId={blogPost?.data?._id}
                currentCategory={blogPost?.data?.category}
                allPosts={allPosts?.data}
              />
            )}

            {/* Newsletter CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="mt-16 p-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl text-center"
            >
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Enjoyed this article?
              </h3>
              <p className="text-muted-foreground mb-6">
                Subscribe to our newsletter to get more insights like
                this delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button className="rounded-lg whitespace-nowrap">
                  Subscribe
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetail;
