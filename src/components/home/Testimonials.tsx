"use client";
import { TESTIMONIALS as STATIC_TESTIMONIALS } from "@/data/site";
import { Reveal } from "@/components/shared/Reveal";
import { Star, Quote, ExternalLink, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { ApplyModal } from "@/components/shared/ApplyModal";
import { Button } from "@/components/ui/button";

const avatarColors = [
  "from-amber-400 to-orange-500",
  "from-emerald-400 to-teal-500",
  "from-violet-400 to-purple-500",
];

const platforms = [
  { name: "Google", color: "text-blue-400" },
  { name: "Trustpilot", color: "text-green-400" },
  { name: "TripAdvisor", color: "text-emerald-400" },
];

export const Testimonials = () => {
  const testimonials = STATIC_TESTIMONIALS;

  return (
    <section id="testimonials" className="relative py-20 md:py-36 bg-warm-dark overflow-hidden">
      {/* Rich background texture */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(circle, #d4a853 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-amber-500/6 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-3xl" />

      <div className="container-edit relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-24">
          <div>
            <Reveal>
              <p className="eyebrow mb-5">💬 Student Success Stories</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-serif font-bold leading-[1.06] tracking-tight text-cream"
                style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)" }}>
                Stories from our
                <br />
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  Empowered Graduates
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-xl text-base text-cream/55 leading-7">
                Real transformations from over 2,500 yoga students who've completed training in Ubud. Hear their journeys and breakthroughs.
              </p>
            </Reveal>
          </div>

          {/* Aggregate rating card — dark glass */}
          <Reveal delay={0.1}>
            <div className="shrink-0 rounded-2xl border border-amber-500/20 bg-white/5 backdrop-blur-md px-8 py-6 text-center shadow-xl">
              <div className="flex gap-1 justify-center mb-3">
                {[1,2,3,4,5].map(n => <Star key={n} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="font-serif text-4xl font-bold text-amber-300">4.9/5</p>
              <p className="text-xs text-cream/40 uppercase tracking-widest mt-2">200+ verified reviews</p>
              <div className="flex items-center justify-center gap-1 mt-3">
                <TrendingUp className="w-3 h-3 text-emerald-400" />
                <span className="text-[10px] text-emerald-400 font-semibold">Top rated in Bali</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.name + i} delay={i * 0.1}>
              <motion.article
                whileHover={{ y: -10, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative flex h-full flex-col rounded-2xl border border-cream/8 bg-white/5 backdrop-blur-sm p-7 shadow-xl hover:border-amber-500/30 hover:bg-white/8 transition-all duration-500"
              >
                {/* Platform Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(n => (
                      <Star key={n} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${platforms[i % 3].color}`}>
                    {platforms[i % 3].name} ✓
                  </span>
                </div>

                {/* Large quote mark */}
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-amber-500/30" />
                </div>

                {/* Quote */}
                <p className="font-serif italic text-lg md:text-xl text-cream/85 leading-relaxed flex-1 tracking-wide">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="mt-8 pt-6 border-t border-cream/8 flex items-center gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${avatarColors[i % 3]} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                    {t.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-semibold text-cream text-sm md:text-base">{t.name}</p>
                    <p className="text-[10px] uppercase tracking-widest text-amber-500/70 font-medium mt-0.5">{t.course}</p>
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-amber-500/4 to-transparent pointer-events-none" />
                {/* Bottom amber line on hover */}
                <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.article>
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-16 md:mt-24 text-center"
        >
          <p className="text-cream/45 text-sm mb-5">
            Read all 200+ verified reviews from graduates worldwide
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <ApplyModal
              trigger={
                <Button className="bg-[#F04E23] hover:bg-[#D03D12] text-white font-bold px-8 py-3 h-12 rounded-xl shadow-xl shadow-[#F04E23]/30">
                  Start Your Journey →
                </Button>
              }
            />
            <a
              href="https://baliyttc.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-cream/15 text-cream/60 font-semibold text-sm hover:border-amber-500/40 hover:text-amber-300 transition-all duration-300"
            >
              View All Reviews <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
