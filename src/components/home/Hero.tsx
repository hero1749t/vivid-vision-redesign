"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { MapPin, ArrowRight, Play, ChevronDown, Clock } from "lucide-react";
import { ApplyModal } from "@/components/shared/ApplyModal";
import { Link } from "@/i18n/routing";

const floatingStats = [
  { value: "2,500+", label: "Graduates" },
  { value: "4.9★", label: "Rating" },
  { value: "RYS", label: "Certified" },
];

// Countdown Timer Component
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set target date to March 2, 2026
    const targetDate = new Date("2026-03-02T00:00:00").getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-3">
      <Clock className="h-4 w-4 text-amber-400" />
      <div className="flex gap-2">
        {[
          { value: timeLeft.days, label: "DAYS" },
          { value: timeLeft.hours, label: "HRS" },
          { value: timeLeft.minutes, label: "MIN" },
          { value: timeLeft.seconds, label: "SEC" },
        ].map((item, i) => (
          <div key={item.label} className="flex items-center gap-1">
            <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-lg px-2 py-1 min-w-[40px]">
              <span className="text-lg font-bold text-white">{String(item.value).padStart(2, "0")}</span>
              <span className="text-[8px] text-white/60 uppercase">{item.label}</span>
            </div>
            {i < 3 && <span className="text-white/60 text-lg font-bold">:</span>}
          </div>
        ))}
      </div>
      <span className="text-xs text-amber-300 font-medium ml-2">Next batch starts!</span>
    </div>
  );
}

export const Hero = () => {
  const content = {
    title: "Transform Your Life",
    subtitle: "with Yoga in Bali",
    description: "Yoga Alliance certified 100hr, 200hr & 300hr Teacher Training. Small batches, world-class instructors, and lifetime certification."
  };

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.65, 0.95]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* ── Parallax Video Background ── */}
      <motion.video
        className="absolute inset-0 h-full w-full object-cover"
        style={{ y }}
        autoPlay
        muted
        loop
        playsInline
        poster="/bali-hero-bg.png"
      >
        <source src="/hero-yoga-1080.mp4" type="video/mp4" />
      </motion.video>

      {/* ── Dynamic Overlays ── */}
      <motion.div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Subtle brand color glow */}
      <motion.div
        animate={{ opacity: [0.08, 0.15, 0.08], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#F04E23] blur-[140px] pointer-events-none"
      />

      {/* ── Center Aligned Content ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-[104px] pb-24 text-center"
      >
        {/* Location pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.25em] text-white/90 backdrop-blur-md shadow-2xl"
        >
          <MapPin className="h-3.5 w-3.5 text-[#F47348]" />
          Ubud, Bali
          <span className="h-1 w-1 rounded-full bg-[#F47348]/70" />
          Yoga Alliance RYS
        </motion.div>

        {/* Headline */}
        <div className="mx-auto max-w-[1000px]">
          <h1 className="font-serif font-bold leading-[1.05] tracking-tight text-white drop-shadow-2xl">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="block"
              style={{ fontSize: "clamp(3.5rem, 8vw, 6.5rem)" }}
            >
              {content.title}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="block text-[#F47348]"
              style={{ fontSize: "clamp(3.5rem, 8vw, 6.5rem)" }}
            >
              {content.subtitle}
            </motion.span>
          </h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mx-auto mt-8 max-w-[650px] text-base font-light leading-relaxed text-white/75 md:text-[19px]"
        >
          {content.description}
        </motion.p>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-8"
        >
          <CountdownTimer />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <ApplyModal
            trigger={
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(240, 78, 35, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex h-14 items-center gap-2.5 overflow-hidden rounded-xl bg-[#F04E23] px-10 text-base font-bold text-white shadow-2xl shadow-[#F04E23]/30"
              >
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                />
                Apply for 2026 Batch
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            }
          />
          <Link href="/courses/200hr"
            className="group inline-flex h-14 items-center gap-2.5 rounded-xl border border-white/25 bg-white/5 px-8 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:bg-white/15"
          >
            <Play className="h-4 w-4 fill-white/80 group-hover:fill-white" />
            Explore Programs
          </Link>
        </motion.div>

        {/* ── Floating Stats Bar (Now in normal flow to prevent overlap) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 flex justify-center w-full"
        >
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 rounded-2xl border border-white/10 bg-black/40 p-2 backdrop-blur-md">
            {floatingStats.map((s, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl bg-white/5 px-5 py-3 border border-white/5">
                <p className="font-serif text-xl font-bold text-[#F47348]">{s.value}</p>
                <div className="h-6 w-px bg-white/10" />
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>



      {/* ── Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 opacity-60"
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4 text-white" />
        </motion.div>
      </motion.div>
    </section>
  );
};
