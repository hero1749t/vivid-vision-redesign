import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { IMG } from "@/data/site";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { client, urlFor } from "@/lib/sanity";

const FALLBACK_POSTS = [
  {
    title: "10 Reasons Why You Should Do Your Yoga Teacher Training in Bali",
    excerpt: "Bali is the ultimate destination for yogis. Discover why this spiritual island is the perfect place to transform your practice.",
    img: IMG.course200,
    category: "Yoga Journey",
    date: "Aug 12, 2025"
  },
  {
    title: "The Difference Between Hatha, Vinyasa, and Ashtanga Yoga",
    excerpt: "Confused about which style to teach? We break down the differences and help you find your unique teaching voice.",
    img: IMG.classMain,
    category: "Yoga Education",
    date: "Sep 04, 2025"
  },
  {
    title: "What to Pack for Your Yoga Teacher Training in Ubud",
    excerpt: "Preparing for 3 weeks in the jungle? Here is our ultimate packing list for your upcoming YTT at Bali YTTC.",
    img: IMG.ceremony200,
    category: "Preparation",
    date: "Oct 21, 2025"
  }
];

const Blog = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query = `*[_type == "blog"] | order(publishedAt desc)`;
        const sanityPosts = await client.fetch(query);
        if (sanityPosts && sanityPosts.length > 0) {
          setPosts(sanityPosts);
        } else {
          setPosts(FALLBACK_POSTS);
        }
      } catch (error) {
        console.error("Sanity fetch error:", error);
        setPosts(FALLBACK_POSTS);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="pt-32 pb-24 bg-[#FAFAFA] min-h-screen">
      <div className="container-wide">
        <Reveal>
          <Link to="/" className="text-gray-500 hover:text-[#F04E23] text-xs font-bold tracking-widest uppercase mb-8 inline-block transition-colors">
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
          <div className="flex justify-center items-center py-24">
            <Loader2 className="animate-spin text-[#F04E23]" size={40} />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {posts.map((post, i) => (
              <Reveal key={post._id || post.title} delay={0.1 * i}>
                <motion.div 
                  whileHover={{ y: -8 }}
                  className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-500"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#F04E23]">
                      {post.category}
                    </div>
                    <img 
                      src={post.mainImage ? urlFor(post.mainImage).url() : (post.img || "")} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <p className="text-xs text-gray-400 font-medium mb-3">
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : post.date}
                    </p>
                    <h3 className="font-serif text-xl font-bold text-gray-900 mb-3 group-hover:text-[#F04E23] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <button className="text-[#F04E23] text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                        Read Article <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
