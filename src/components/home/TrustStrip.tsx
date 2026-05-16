"use client";
import { IMG } from "@/data/site";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Award, MapPin, Star, Users, BookOpen, Heart } from "lucide-react";
import { useLocale } from "next-intl";
import { getHomeCopy } from "@/lib/home-localized";

const trustIcons = [
  { src: IMG.yogaAlliance, label: "Yoga Alliance RYS" },
  { src: IMG.rys200, label: "RYS 200" },
  { src: IMG.trustpilot, label: "Trustpilot" },
  { src: IMG.tripadvisor, label: "TripAdvisor" },
];

// Animated counter hook
function useCounter(end: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
}

// Premium metrics with calm sage/terracotta palette
const metrics = [
  {
    icon: Users,
    end: 2500,
    suffix: "+",
    label: "Students Trained",
    sub: "worldwide since 2018",
    iconBg: "bg-sage",
    numberClass: "text-sage",
  },
  {
    icon: Star,
    end: 49,
    suffix: "/5",
    label: "Average Rating",
    sub: "verified reviews",
    divideBy: 10,
    iconBg: "bg-gold",
    numberClass: "text-gold",
  },
  {
    icon: Award,
    end: 300,
    suffix: "+",
    label: "Graduates",
    sub: "this year alone",
    iconBg: "bg-brand",
    numberClass: "text-brand",
  },
  {
    icon: Heart,
    end: 98,
    suffix: "%",
    label: "Would Recommend",
    sub: "student satisfaction",
    iconBg: "bg-sage-light",
    numberClass: "text-sage-light",
  },
];

export const TrustStrip = () => {
  const copy = getHomeCopy(useLocale());
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const c0 = useCounter(2500, 2200, isInView);
  const c1 = useCounter(49, 1800, isInView);
  const c2 = useCounter(300, 2000, isInView);
  const c3 = useCounter(98, 1600, isInView);
  const counters = [c0, c1, c2, c3];

  return (
    <section id="trust" className="relative overflow-hidden bg-cream py-20 md:py-28">
      {/* Subtle decorative elements */}
      <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-sage-mist blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-brand-muted blur-3xl" />

      <div className="container-wide relative z-10">
        {/* Section header - Clean and minimal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="eyebrow mx-auto mb-4">{copy.trust.recognised}</p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {trustIcons.map((item, index) => (
              <motion.img
                key={index}
                src={item.src}
                alt={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="h-8 md:h-10 object-contain hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
            ))}
          </div>
        </motion.div>

        {/* Premium Metric Cards - Softer design */}
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {metrics.map((m, i) => {
            const Icon = m.icon;
            const rawVal = counters[i];
            const displayVal = m.divideBy ? (rawVal / m.divideBy).toFixed(1) : rawVal.toLocaleString();

            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-2xl bg-white p-6 md:p-8 border border-gray-100 shadow-premium-sm transition-all duration-300 hover:shadow-premium-lg hover:-translate-y-1"
              >
                {/* Top accent line */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${m.iconBg === 'bg-sage' ? 'from-sage to-sage-light' : m.iconBg === 'bg-gold' ? 'from-gold to-gold-light' : m.iconBg === 'bg-brand' ? 'from-brand to-brand-light' : 'from-sage-light to-sage-pale'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Icon */}
                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${m.iconBg} mb-6 transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="h-6 w-6 text-white" strokeWidth={2} />
                </div>

                {/* Number */}
                <p className={`text-4xl md:text-5xl font-bold ${m.numberClass} tracking-tight`}>
                  {displayVal}{m.suffix}
                </p>

                {/* Labels */}
                <p className="mt-3 text-base font-semibold text-ink">{m.label}</p>
                <p className="mt-1 text-xs font-medium text-ink-muted uppercase tracking-wider">{m.sub}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
