import { IMG } from "@/data/site";
import { ApplyModal } from "@/components/shared/ApplyModal";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/Reveal";
import { motion } from "framer-motion";
import { Sparkles, Heart, Zap, CheckCircle } from "lucide-react";

export const FinalCTA = () => (
  <section className="relative py-24 md:py-44 overflow-hidden">
    {/* Background Image — using local graduation photo */}
    <div className="absolute inset-0 w-full h-full">
      <img
        src={IMG.graduation}
        alt="Yoga graduation ceremony Bali YTTC"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Gradient overlays */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/85" />
    <div className="absolute inset-0 bg-gradient-to-br from-amber-950/30 via-transparent to-orange-950/40" />

    {/* Animated glow */}
    <motion.div
      animate={{ opacity: [0.2, 0.5, 0.2] }}
      transition={{ duration: 5, repeat: Infinity }}
      className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-amber-600/20 to-orange-600/15 rounded-full blur-3xl"
    />

    {/* Content */}
    <div className="relative container-edit text-center z-10">
      {/* Eyebrow */}
      <Reveal>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mb-6 inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-full px-5 py-2 backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <p className="text-amber-200 font-semibold text-xs tracking-widest uppercase">
            Transform Your Life Today
          </p>
          <Sparkles className="w-4 h-4 text-amber-300" />
        </motion.div>
      </Reveal>

      {/* Main Heading */}
      <Reveal delay={0.06}>
        <h2
          className="font-serif font-bold text-white leading-[1.08] drop-shadow-2xl tracking-tight"
          style={{ fontSize: "clamp(2.2rem, 6vw, 4.5rem)" }}
        >
          Begin Your Wellness
          <br />
          <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-amber-300 bg-clip-text text-transparent">
            Journey at Bali YTTC
          </span>
        </h2>
      </Reveal>

      {/* Subtext */}
      <Reveal delay={0.1}>
        <p className="mt-6 max-w-2xl mx-auto text-gray-200 leading-relaxed text-base md:text-lg drop-shadow-lg font-light">
          Join over 2,500 graduates who've transformed their lives through authentic yoga training in Ubud.
          Secure your place in our next batch and start your path to wellness.
        </p>
      </Reveal>

      {/* Feature pills */}
      <Reveal delay={0.15}>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-6 text-gray-200 text-sm">
          {[
            { icon: Heart, text: "Lifetime Alumni Support" },
            { icon: Zap, text: "Yoga Alliance Certified" },
            { icon: Sparkles, text: "World-Class Instructors" },
            { icon: CheckCircle, text: "100% Money-Back" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
              <Icon className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </Reveal>

      {/* CTA Buttons */}
      <Reveal delay={0.2}>
        <div className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          <ApplyModal
            trigger={
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-[#F04E23] hover:bg-[#D03D12] text-white h-14 md:h-16 px-10 md:px-14 text-base md:text-lg font-bold shadow-2xl shadow-[#F04E23]/40 rounded-xl transition-all duration-300 border border-white/20"
                >
                  Secure Your Spot Now →
                </Button>
              </motion.div>
            }
          />
          <p className="text-xs md:text-sm text-gray-400">
            ✓ No payment required now &nbsp;·&nbsp; ✓ Reply within 24 hours
          </p>
        </div>
      </Reveal>

      {/* Trust stats bar */}
      <Reveal delay={0.25}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-14 md:mt-16 pt-10 border-t border-amber-500/20 flex flex-wrap items-center justify-center gap-8 md:gap-14 text-gray-300 text-sm"
        >
          {[
            { num: "2,500+", label: "Students Trained" },
            { num: "4.9★", label: "Average Rating" },
            { num: "RYS", label: "Yoga Alliance" },
            { num: "Est. 2018", label: "Years Running" },
          ].map(s => (
            <motion.div key={s.label} className="text-center" whileHover={{ scale: 1.08 }}>
              <p className="font-serif font-bold text-white text-xl md:text-2xl">{s.num}</p>
              <p className="text-xs text-gray-400 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </Reveal>
    </div>
  </section>
);
