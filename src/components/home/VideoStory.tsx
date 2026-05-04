import { useState } from "react";
import { motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { IMG } from "@/data/site";
import { Reveal } from "@/components/shared/Reveal";

const YT_ID = "M7lc1UVf-VE";
const POSTER = IMG.classMain;

export const VideoStory = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative bg-warm-dark py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img src={IMG.beachYoga} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-warm-dark via-warm-dark/90 to-warm-dark" />

      <div className="container-edit relative z-10">
        <Reveal>
          <p className="eyebrow text-gold-light text-center justify-center mb-5">The Experience</p>
          <h2 className="font-serif text-cream text-center mx-auto max-w-3xl leading-[1.05]"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
            Step inside our Ubud ashram —{" "}
            <em className="text-terra-light">a 90-second journey.</em>
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-14 max-w-5xl mx-auto">
            <button onClick={() => setOpen(true)}
              className="group relative block w-full aspect-video rounded-2xl overflow-hidden shadow-elev-lg"
              aria-label="Play intro video">
              <img src={POSTER} alt="Bali YTTC intro video preview" loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-warm-dark/70 via-transparent to-warm-dark/30" />
              <motion.div whileHover={{ scale: 1.08 }} className="absolute inset-0 grid place-items-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-terra/40 animate-soft-pulse blur-2xl" />
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-cream/95 grid place-items-center shadow-elev-lg">
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-terra translate-x-0.5" fill="currentColor" />
                  </div>
                </div>
              </motion.div>
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-cream">
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-cream/70">Watch</p>
                  <p className="font-serif text-2xl md:text-3xl mt-1">A day at Bali YTTC</p>
                </div>
                <p className="hidden md:block text-xs text-cream/70">1:32</p>
              </div>
            </button>
          </div>
        </Reveal>
      </div>

      {open && (
        <div className="fixed inset-0 z-[80] bg-warm-dark/95 backdrop-blur-md grid place-items-center p-4 animate-fade-in"
             onClick={() => setOpen(false)}>
          <button className="absolute top-6 right-6 text-cream/80 hover:text-cream"
                  onClick={() => setOpen(false)} aria-label="Close video">
            <X className="w-7 h-7" />
          </button>
          <div className="w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-elev-lg"
               onClick={(e) => e.stopPropagation()}>
            <iframe className="w-full h-full"
              src={`https://www.youtube.com/embed/${YT_ID}?autoplay=1&rel=0`}
              title="Bali YTTC intro"
              allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
          </div>
        </div>
      )}
    </section>
  );
};
