"use client";
import { useState, useEffect } from "react";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { IMG } from "@/data/site";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { ArrowRight, Calendar, Clock, User, Loader2 } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string | null;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  readTime: number;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/blog");
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="pt-32 pb-24 bg-[#FAFAFA] min-h-screen">
      <div className="container-wide">
        <Reveal>
          <Link href="/" className="text-gray-500 hover:text-[#F04E23] text-xs font-bold tracking-widest uppercase mb-8 inline-block transition-colors">
            ← Back to Home
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <SectionHeading
            eyebrow="Our Journal"
            title={<>Yoga <em className="text-[#F04E23]">Insights</em></>}
            sub="Articles, guides, and inspiration for your yoga journey from the Bali YTTC faculty."
          />
        </Reveal>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#F04E23]" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">No blog posts available yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {posts.map((post, i) => (
              <Reveal key={post.id} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={post.featuredImage || IMG.classMain}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                        <span className="px-3 py-1 bg-[#F04E23]/10 text-[#F04E23] rounded-full font-medium">
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(post.publishedAt)}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-gray-900 mb-2 group-hover:text-[#F04E23] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime} min read</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal delay={0.3}>
          <div className="mt-16 text-center">
            <Link href="/newsletter">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F04E23] to-[#E03E11] text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
              >
                Subscribe to Our Newsletter
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default Blog;
