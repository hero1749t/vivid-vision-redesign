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
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <motion.div
        className="absolute inset-0"
        style={{ y }}
      >
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/bali-hero-bg.png"
        >
          <source src="/hero-yoga-1080.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Vibrant gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal/75" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/50 via-transparent to-transparent" />

      {/* Accent glows */}
      <div className="absolute right-1/4 top-1/3 h-80 w-80 rounded-full bg-brand/20 blur-3xl" />
      <div className="absolute left-1/4 bottom-1/4 h-60 w-60 rounded-full bg-sage/15 blur-3xl" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex min-h-screen flex-col justify-end px-6 pb-12 pt-32 sm:px-8 md:px-12 lg:px-16"
      >
        <div className="mx-auto w-full max-w-7xl">
          {/* Location Badge - Vibrant */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand" />
                <span>{t("location")}</span>
              </span>
              <span className="h-px w-5 bg-white/30" />
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-gold" />
                <span>Yoga Alliance RYS</span>
              </span>
            </div>
          </motion.div>

          {/* Main Heading */}
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

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 max-w-2xl text-base leading-7 text-white/90 sm:text-lg md:text-xl"
            >
              {t("description")}
            </motion.p>

            {/* CTA Buttons - Vibrant */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <ApplyModal
                trigger={
                  <button className="group inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-brand px-10 text-base font-bold text-white shadow-brand transition-all duration-300 hover:bg-brand-dark hover:shadow-xl hover:-translate-y-1">
                    {t("applyBatch")}
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </button>
                }
              />
              <Link
                href="/courses/200hr"
                className="group inline-flex h-14 items-center justify-center gap-2.5 rounded-full border-2 border-white/30 bg-white/10 px-10 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-charcoal"
              >
                <Play className="h-5 w-5 fill-current" />
                {t("explorePrograms")}
              </Link>
            </motion.div>
          </div>

          {/* Quick Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 flex flex-wrap gap-3"
          >
            {[
              { label: "100hr YTT", bg: "bg-brand" },
              { label: "200hr YTT", bg: "bg-sage" },
              { label: "300hr YTT", bg: "bg-gold" },
              { label: "Ubud, Bali", bg: "bg-white/15" },
            ].map((tag) => (
              <span
                key={tag.label}
                className={`rounded-full ${tag.bg} px-5 py-2.5 text-sm font-semibold text-white shadow-lg`}
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
