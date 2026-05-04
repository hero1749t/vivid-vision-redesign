import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ApplyModal } from "@/components/shared/ApplyModal";
import { Button } from "@/components/ui/button";
import { IMG, SITE } from "@/data/site";
import { ArrowDown, PlayCircle, Star } from "lucide-react";

export const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section ref={ref} className="relative min-h-[100vh] flex items-end overflow-hidden bg-warm-dark">
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <img src={IMG.heroCeremony} alt="Yoga ceremony in Ubud, Bali" className="w-full h-full object-cover animate-ken-burns" />
      </motion.div>
      <div className="absolute inset-0" style={{ background: "var(--gradient-overlay)" }} />
      <div className="absolute inset-0 bg-gradient-to-t from-warm-dark via-warm-dark/30 to-transparent" />

      <div className="relative z-10 container-wide pb-32 pt-40 w-full">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="eyebrow text-gold-light mb-6"
          >
            Bali · Ubud · Established {SITE.established}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif font-bold text-cream leading-[1.02] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2.6rem, 7vw, 5.4rem)" }}
          >
            Become a certified
            <br />
            <em className="text-terra-light not-italic font-normal">yoga teacher</em>
            <span className="font-normal italic text-cream/90"> in the heart of Bali.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-7 max-w-xl text-cream/75 text-base md:text-lg leading-relaxed font-light"
          >
            Yoga Alliance certified Hatha, Ashtanga & Vinyasa trainings — hosted in a serene Ubud ashram surrounded by jungle, river and ceremony.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="mt-9 flex flex-wrap gap-4 items-center"
          >
            <ApplyModal trigger={
              <Button size="lg" className="bg-terra hover:bg-terra-deep text-cream font-medium px-8 h-12 shadow-elev-lg">
                Apply for 2026
              </Button>
            } />
            <button className="inline-flex items-center gap-2 text-cream/90 hover:text-cream text-sm border border-cream/30 hover:border-cream/60 px-6 h-12 rounded-md transition-colors">
              <PlayCircle className="w-5 h-5" /> Watch student stories
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-14 pt-8 border-t border-cream/15 grid grid-cols-2 sm:grid-cols-4 gap-6"
          >
            {[
              { n: SITE.graduates, l: "Graduated" },
              { n: "4.9★", l: "Google rating" },
              { n: "2018", l: "Established" },
              { n: "RYS", l: "Yoga Alliance" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-serif text-3xl md:text-4xl text-terra-light font-bold leading-none">{s.n}</p>
                <p className="mt-2 text-[10px] tracking-[0.25em] uppercase text-cream/50">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cream/60 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </motion.div>

      {/* Floating review card */}
      <motion.div
        initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 1.1 }}
        className="hidden xl:block absolute right-14 top-1/2 -translate-y-1/2 w-[280px] bg-cream/95 backdrop-blur-md rounded-lg p-5 shadow-elev-lg"
      >
        <div className="flex gap-0.5 mb-2">
          {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />)}
        </div>
        <p className="font-serif italic text-warm-dark text-sm leading-relaxed">
          "Vivek truly has a lot of knowledge — a fantastic and patient teacher."
        </p>
        <p className="mt-3 text-xs text-warm-light">— Emma · 100hr Graduate</p>
      </motion.div>
    </section>
  );
};
