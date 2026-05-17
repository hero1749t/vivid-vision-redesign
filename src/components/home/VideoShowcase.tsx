"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/shared/Reveal";
import { VideoPlayer } from "@/components/shared/VideoPlayer";
import { IMG } from "@/data/site";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { useLocale } from "next-intl";
import { getHomeCopy } from "@/lib/home-localized";
import { useRef, useState } from "react";

const alumniJournals = [
  {
    name: "Eva from Germany",
    course: "200-Hour YTT Graduate",
    quote: "I arrived for certification and left with a clearer practice, real teaching confidence, and a global community.",
    image: IMG.evaReview,
    youtubeId: "TNzFh1N3GI0",
  },
  {
    name: "July 2026 Batch",
    course: "Graduation Journal",
    quote: "Watch students share what changed during the final ceremony, from first class nerves to confident teaching.",
    image: IMG.graduation,
    youtubeId: "TNzFh1N3GI0",
  },
  {
    name: "Ubud Practice Story",
    course: "Life at Bali YTTC",
    quote: "A short glimpse into practice, philosophy classes, temple culture, and the rhythm of training in Bali.",
    image: IMG.classMain,
    youtubeId: "TNzFh1N3GI0",
  },
];

export const VideoShowcase = () => {
  const copy = getHomeCopy(useLocale());
  const journalRef = useRef<HTMLDivElement>(null);
  const [activeVideo, setActiveVideo] = useState<(typeof alumniJournals)[number] | null>(null);

  const scrollJournal = (direction: "prev" | "next") => {
    const node = journalRef.current;
    if (!node) return;
    node.scrollBy({ left: direction === "next" ? 340 : -340, behavior: "smooth" });
  };

  return (
    <section id="campus-video" className="relative overflow-hidden border-b border-gray-100 bg-[#FAFAFA] py-20 md:py-32">
      <div className="pointer-events-none absolute right-0 top-0 h-[800px] w-[800px] rounded-full bg-gradient-to-bl from-orange-100/40 to-transparent opacity-60 blur-[100px]" />

      <div className="container-wide relative z-10">
        <Reveal>
          <div className="mx-auto mb-12 max-w-3xl text-center md:mb-20">
            <div className="mb-6 inline-flex items-center justify-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#F04E23]" />
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#F04E23]">{copy.video.eyebrow}</p>
              <div className="h-2 w-2 rounded-full bg-[#F04E23]" />
            </div>
            <h2 className="mb-6 font-serif text-4xl font-bold leading-[1.1] tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
              {copy.video.title}
            </h2>
            <p className="text-lg leading-relaxed text-gray-600 md:text-xl">{copy.video.subtitle}</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} className="mb-20 overflow-hidden rounded-3xl bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] ring-1 ring-gray-900/5 md:mb-32">
            <VideoPlayer youtubeId="TNzFh1N3GI0" poster={IMG.heroCeremony} title="Bali YTTC Campus Tour" autoPlay={false} muted={true} />
          </motion.div>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="relative">
            <div className="mb-8 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#F04E23]">Alumni Video Journal</p>
                <h3 className="mt-4 font-serif text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
                  Watch Alumni Stories
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600 md:text-base">
                  Real students, real training days, and honest moments from Bali YTTC graduates.
                </p>
              </div>

              <div className="hidden items-center gap-3 md:flex">
                <button
                  type="button"
                  onClick={() => scrollJournal("prev")}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 shadow-sm transition hover:border-[#F04E23] hover:text-[#F04E23]"
                  aria-label="Previous alumni video"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollJournal("next")}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 shadow-sm transition hover:border-[#F04E23] hover:text-[#F04E23]"
                  aria-label="Next alumni video"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div
              ref={journalRef}
              className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-4 [scrollbar-width:none] md:gap-6 md:px-1 [&::-webkit-scrollbar]:hidden"
            >
              {alumniJournals.map((item, index) => (
                <motion.article
                  key={item.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="group w-[286px] shrink-0 snap-center overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.10)] md:w-[360px]"
                >
                  <button
                    type="button"
                    onClick={() => setActiveVideo(item)}
                    className="relative block h-[390px] w-full overflow-hidden text-left md:h-[460px]"
                    aria-label={`Watch ${item.name} alumni video`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/20" />
                    <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/45 bg-white/15 text-white backdrop-blur-md transition group-hover:scale-110 group-hover:bg-[#F04E23]">
                      <Play className="ml-1 h-7 w-7 fill-current" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/60">{item.course}</p>
                      <h4 className="mt-2 font-serif text-2xl font-bold leading-tight text-white">{item.name}</h4>
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/75">{item.quote}</p>
                    </div>
                  </button>
                </motion.article>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {activeVideo && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl">
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-lg font-bold text-charcoal shadow-lg transition hover:bg-white"
              aria-label="Close alumni video"
            >
              x
            </button>
            <VideoPlayer youtubeId={activeVideo.youtubeId} poster={activeVideo.image} title={activeVideo.name} autoPlay={true} muted={false} />
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoShowcase;
