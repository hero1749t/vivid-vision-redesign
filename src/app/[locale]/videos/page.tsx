"use client";
import { motion } from "framer-motion";
import { VideoPlayer } from "@/components/shared/VideoPlayer";
import { IMG } from "@/data/site";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Play, Users, Award, Heart, MessageCircle } from "lucide-react";
import Link from "next/link";

const videos = [
  {
    youtubeId: "TNzFh1N3GI0",
    poster: IMG.heroCeremony,
    title: "Bali YTTC Campus Tour",
    category: "Campus",
    duration: "5:32",
    description: "Walk through our world-class yoga sanctuary in Ubud. See the meditation halls, yoga studios, and cozy accommodations.",
  },
  {
    youtubeId: "dQw4w9WgXcQ",
    poster: IMG.classMain,
    title: "Student Transformation Stories",
    category: "Testimonials",
    duration: "8:15",
    description: "Hear from our alumni about how their yoga teacher training journey changed their lives and opened new career paths.",
  },
  {
    youtubeId: "ABC123demo123",
    poster: IMG.ceremony200,
    title: "A Day in the Life",
    category: "Student Life",
    duration: "6:48",
    description: "Experience a typical training day at Bali YTTC - from morning meditation to evening satsang.",
  },
  {
    youtubeId: "XYZ456demo456",
    poster: IMG.graduation,
    title: "Graduation Ceremony 2025",
    category: "Ceremony",
    duration: "12:20",
    description: "Celebrate with our latest batch of certified yoga teachers as they receive their Yoga Alliance certifications.",
  },
];

const videoCategories = [
  { name: "All Videos", count: videos.length },
  { name: "Campus", count: 1 },
  { name: "Testimonials", count: 1 },
  { name: "Student Life", count: 1 },
  { name: "Ceremony", count: 1 },
];

export default function VideosPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600 rounded-full blur-[120px]" />
        </div>

        <div className="container-wide relative z-10">
          <Reveal>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 mb-6">
                <Play className="h-5 w-5 text-orange-400" />
                <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">Video Gallery</span>
              </div>
              <h1 className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
                Experience Bali YTTC
              </h1>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                Watch videos from our campus, hear student stories, and see what makes our yoga teacher training unique.
              </p>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* Main Video */}
      <section className="py-16">
        <div className="container-wide">
          <Reveal>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <div className="rounded-3xl overflow-hidden shadow-[0_25px_60px_-12px_rgba(0,0,0,0.25)] ring-1 ring-gray-900/5">
                <VideoPlayer
                  youtubeId={videos[0].youtubeId}
                  poster={videos[0].poster}
                  title={videos[0].title}
                  autoPlay={false}
                  muted={true}
                />
              </div>
              <div className="mt-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">
                    {videos[0].category}
                  </span>
                  <span className="text-sm text-gray-500">{videos[0].duration}</span>
                </div>
                <h2 className="font-serif font-bold text-2xl md:text-3xl text-gray-900 mb-3">
                  {videos[0].title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {videos[0].description}
                </p>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* More Videos Grid */}
      <section className="pb-24">
        <div className="container-wide">
          <Reveal>
            <SectionHeading
              eyebrow="Video Library"
              title="More Videos"
              sub="Explore our collection of videos showcasing campus life, student experiences, and training programs."
              align="left"
            />
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.slice(1).map((video, index) => (
              <Reveal key={video.youtubeId} delay={index * 0.1}>
                <motion.article
                  whileHover={{ y: -8 }}
                  className="group cursor-pointer"
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                    <div className="aspect-video">
                      <VideoPlayer
                        youtubeId={video.youtubeId}
                        poster={video.poster}
                        title={video.title}
                        autoPlay={false}
                        muted={true}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                        {video.category}
                      </span>
                      <span className="text-xs text-gray-400">{video.duration}</span>
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-orange-600 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {video.description}
                    </p>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-orange-500 to-orange-600 py-20 text-white">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-6">
              Ready to Create Your Own Story?
            </h2>
            <p className="text-lg text-orange-100 mb-8">
              Join thousands of yoga teachers who have transformed their practice at Bali YTTC. Your journey starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses/200hr"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-orange-600 font-bold hover:bg-orange-50 transition-colors shadow-lg"
              >
                <Award className="h-5 w-5" />
                Apply for Training
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                Ask Questions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
