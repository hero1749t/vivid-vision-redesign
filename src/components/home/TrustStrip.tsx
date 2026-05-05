import { IMG } from "@/data/site";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Award, Shield, TrendingUp, Users } from "lucide-react";

const trustIcons = [
  { src: IMG.yogaAlliance, label: "Yoga Alliance RYS" },
  { src: IMG.rys200, label: "RYS 200" },
  { src: IMG.trustpilot, label: "Trustpilot" },
  { src: IMG.tripadvisor, label: "TripAdvisor" },
  { src: IMG.bookRetreat, label: "Book Yoga Retreats" },
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
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
}

// Colorful theme data for each metric
const metrics = [
  { 
    icon: Users, end: 2500, suffix: "+", label: "Students trained", sub: "worldwide since 2018", 
    iconBg: "bg-blue-50 group-hover:bg-blue-100", iconColor: "text-blue-500 group-hover:text-blue-600", numColor: "text-blue-600", borderHover: "hover:border-blue-200", line: "bg-blue-500"
  },
  { 
    icon: Award, end: 49, suffix: "★", label: "Average rating", sub: "verified reviews", divideBy: 10,
    iconBg: "bg-amber-50 group-hover:bg-amber-100", iconColor: "text-amber-500 group-hover:text-amber-600", numColor: "text-amber-500", borderHover: "hover:border-amber-200", line: "bg-amber-400"
  },
  { 
    icon: Shield, end: 300, suffix: " RYS", label: "Yoga Alliance", sub: "200hr & 300hr certified",
    iconBg: "bg-emerald-50 group-hover:bg-emerald-100", iconColor: "text-emerald-500 group-hover:text-emerald-600", numColor: "text-emerald-600", borderHover: "hover:border-emerald-200", line: "bg-emerald-500"
  },
  { 
    icon: TrendingUp, end: 15, suffix: "+", label: "Years experience", sub: "combined faculty",
    iconBg: "bg-orange-50 group-hover:bg-orange-100", iconColor: "text-[#F04E23]", numColor: "text-[#F04E23]", borderHover: "hover:border-[#F04E23]/30", line: "bg-[#F04E23]"
  },
];

export const TrustStrip = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const c0 = useCounter(2500, 2200, isInView);
  const c1 = useCounter(49, 1800, isInView);
  const c2 = useCounter(300, 2000, isInView);
  const c3 = useCounter(15, 1600, isInView);
  const counters = [c0, c1, c2, c3];

  return (
    <section id="trust" className="relative bg-[#FAFAFA] overflow-hidden py-16 md:py-24 border-y border-gray-200">
      <div className="relative z-10">
        {/* Marquee logo strip - Now colorful and highly visible */}
        <div className="mb-14 md:mb-20">
          <p className="text-center text-[12px] font-extrabold uppercase tracking-[0.25em] text-gray-500 mb-8">
            Recognised & certified by
          </p>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#FAFAFA] to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#FAFAFA] to-transparent" />
            <motion.div
              className="flex gap-16 items-center"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              {[...trustIcons, ...trustIcons].map((item, index) => (
                <img
                  key={index}
                  src={item.src}
                  alt={item.label}
                  // Removed grayscale completely so logos are colorful, clear, and visible
                  className="h-10 md:h-12 object-contain hover:scale-110 transition-transform duration-300 flex-shrink-0"
                  loading="lazy"
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Colorful & Highly Visible Metric Cards */}
        <div ref={ref} className="container-wide grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {metrics.map((m, i) => {
            const Icon = m.icon;
            const rawVal = counters[i];
            const displayVal = m.divideBy ? (rawVal / m.divideBy).toFixed(1) : rawVal.toLocaleString();

            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className={`group relative overflow-hidden rounded-2xl bg-white p-6 md:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 transition-all duration-300 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] ${m.borderHover}`}
              >
                {/* Colorful Icon Container */}
                <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-colors duration-300 ${m.iconBg} ${m.iconColor}`}>
                  <Icon className="h-6 w-6" strokeWidth={2.5} />
                </div>

                {/* Big, bold, colorful numbers */}
                <p className={`text-3xl md:text-5xl font-extrabold tracking-tight ${m.numColor}`}>
                  {displayVal}{m.suffix}
                </p>

                <p className="mt-2 text-base font-bold text-gray-800">{m.label}</p>
                <p className="mt-1 text-[11px] font-bold text-gray-500 uppercase tracking-wider">{m.sub}</p>

                {/* Solid colored bottom line on hover */}
                <div className={`absolute bottom-0 left-0 h-1 w-0 transition-all duration-500 ease-out group-hover:w-full ${m.line}`} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
