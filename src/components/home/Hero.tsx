"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, MapPin, Play, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { ApplyModal } from "@/components/shared/ApplyModal";
import { Link } from "@/i18n/routing";

export const Hero = () => {
  const t = useTranslations("Hero");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-charcoal">
      {/* Video Background */}
      <motion.div
        className="absolute inset-0"
        style={{ y }}
      >
        <video
          className="h-full w-full object-cover opacity-70"
          autoPlay
          muted
          loop
          playsInline
          poster="/bali-hero-bg.png"
        >
          <source src="/hero-yoga-1080.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Softer Overlay Gradients - Calm feel */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/30 to-charcoal/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/50 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />

      {/* Subtle grain texture for depth */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`
      }} />

      {/* Decorative Sage Green Accent */}
      <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-sage/10 blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex min-h-screen flex-col justify-end px-6 pb-12 pt-32 sm:px-8 md:px-12 lg:px-16"
      >
        <div className="mx-auto w-full max-w-7xl">
          {/* Location Badge - Cleaner design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.08] px-5 py-2.5 text-xs font-medium text-white/90 backdrop-blur-md">
              <span className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-brand-light" />
                <span>{t("location")}</span>
              </span>
              <span className="h-px w-4 bg-white/20" />
              <span className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-sage-light" />
                <span>Yoga Alliance RYS</span>
              </span>
            </div>
          </motion.div>

          {/* Main Heading - Premium Typography */}
          <div className="max-w-5xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-[clamp(2.8rem,7vw,5.5rem)] font-bold leading-[1.02] tracking-tight text-white"
            >
              {t("title").split(" ").map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="mr-[0.2em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subtitle - Softer, more inviting */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg md:text-xl"
            >
              {t("description")}
            </motion.p>

            {/* CTA Buttons - Premium styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <ApplyModal
                trigger={
                  <button className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-brand px-8 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-all duration-300 hover:bg-brand-dark hover:shadow-xl hover:shadow-brand/30 hover:-translate-y-0.5">
                    {t("applyBatch")}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                }
              />
              <Link
                href="/courses/200hr"
                className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/[0.1] px-8 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.15] hover:border-white/30"
              >
                <Play className="h-4 w-4 fill-white/80" />
                {t("explorePrograms")}
              </Link>
            </motion.div>
          </div>

          {/* Quick Tags - Clean pill design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 flex flex-wrap gap-3"
          >
            {[
              { label: "100hr YTT", color: "bg-sage/30" },
              { label: "200hr YTT", color: "bg-brand/30" },
              { label: "300hr YTT", color: "bg-gold/30" },
              { label: "Ubud, Bali", color: "bg-white/10" },
            ].map((tag) => (
              <span
                key={tag.label}
                className={`rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-white/80 backdrop-blur-sm ${tag.color}`}
              >
                {tag.label}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator - Subtle and elegant */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-medium uppercase tracking-widest text-white/50">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};
