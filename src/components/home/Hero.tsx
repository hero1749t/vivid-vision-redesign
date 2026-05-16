"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { ArrowRight, MapPin, Play, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { ApplyModal } from "@/components/shared/ApplyModal";
import { Link } from "@/i18n/routing";

export const Hero = () => {
  const t = useTranslations("Hero");
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  // Skip to 7 seconds when video loads
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      if (video.currentTime < 7) {
        video.currentTime = 7;
      }
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    // Also try to skip after a short delay
    const timeout = setTimeout(() => {
      if (video.currentTime < 7) {
        video.currentTime = 7;
      }
    }, 700);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          poster="/bali-hero-bg.png"
        >
          <source src="/hero-yoga-1080.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>

      {/* Clean gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/20 to-charcoal/60" />

      {/* Video content overlay - fades on scroll */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex min-h-screen flex-col justify-end px-6 pb-12 pt-32 sm:px-8 md:px-12 lg:px-16"
      >
        <div className="mx-auto w-full max-w-7xl">
          {/* Location Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-7 py-2.7 text-sm font-medium text-white backdrop-blur-sm">
              <MapPin className="h-4 w-4 text-brand" />
              <span>{t("location")}</span>
              <span className="h-px w-4 bg-white/30" />
              <Sparkles className="h-4 w-4 text-gold" />
              <span>Yoga Alliance RYS</span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <div className="max-w-7xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-[clamp(2.8rem,7vw,7.7rem)] font-bold leading-[1.02] tracking-tight text-white"
            >
              {t("title").split(" ").map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.06 }}
                  className="mr-[0.2em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <ApplyModal
                trigger={
                  <button className="group inline-flex h-14 items-center justify-center gap-2.7 rounded-full bg-brand px-10 text-base font-bold text-white shadow-brand transition-all duration-300 hover:bg-brand-dark hover:shadow-xl hover:-translate-y-1">
                    {t("applyBatch")}
                    <ArrowRight className="h-7 w-7 transition-transform group-hover:translate-x-1" />
                  </button>
                }
              />
              <Link
                href="/courses/200hr"
                className="group inline-flex h-14 items-center justify-center gap-2.7 rounded-full border-2 border-white/30 bg-white/10 px-10 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-charcoal"
              >
                <Play className="h-7 w-7 fill-current" />
                {t("explorePrograms")}
              </Link>
            </motion.div>
          </div>

          {/* Quick Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            {[
              { label: "100hr YTT", bg: "bg-brand" },
              { label: "200hr YTT", bg: "bg-sage" },
              { label: "300hr YTT", bg: "bg-gold" },
              { label: "Ubud, Bali", bg: "bg-white/17" },
            ].map((tag) => (
              <span
                key={tag.label}
                className={`rounded-full ${tag.bg} px-7 py-2.7 text-sm font-semibold text-white shadow-lg`}
              >
                {tag.label}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-semibold uppercase tracking-widest text-white/60">Scroll</span>
          <div className="h-10 w-px bg-gradient-to-b from-white/60 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};
