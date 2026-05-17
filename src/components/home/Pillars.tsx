"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { IMG } from "@/data/site";
import { getHomeCopy } from "@/lib/home-localized";

const pillarImages = [
  IMG.classMain,
  IMG.pranayama,
  IMG.certified,
  IMG.templePurification,
  IMG.graduation,
  IMG.course100,
];

const pillarLabels = [
  "Asana Mastery",
  "Pranayama & Breath",
  "Applied Anatomy",
  "Vedic Philosophy",
  "Teaching Methodology",
  "Hands-on Adjustments",
];

const pillarPoints = [
  ["Multi-style lineage teaching", "Alignment, safety and modifications", "Sequencing for all levels"],
  ["Classical breath techniques", "Nervous-system regulation", "Daily pranayama practice"],
  ["Functional movement principles", "Injury-aware teaching choices", "Body mechanics for asana"],
  ["Yoga Sutras and eight limbs", "Bhagavad Gita foundations", "Living philosophy in practice"],
  ["Cueing and class architecture", "Holding space with confidence", "Practice teaching feedback"],
  ["Consent-led assisting", "Hands-on correction principles", "Clear, safe adjustment technique"],
];

export const Pillars = () => {
  const copy = getHomeCopy(useLocale());
  const [active, setActive] = useState(0);
  const current = copy.pillars[active] || copy.pillars[0];
  const currentTitle = pillarLabels[active] || current.title;

  return (
    <section id="pillars" className="bg-[#FAF9F6] py-24 md:py-28">
      <div className="container-edit">
        <div className="mx-auto mb-14 max-w-xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-sage">
            Our Curriculum
          </p>
          <div className="mx-auto my-5 h-px w-16 bg-brand" />
          <h2 className="font-serif text-4xl font-bold leading-tight text-charcoal md:text-6xl">
            The Six <em className="font-serif italic text-brand">Pillars</em>
          </h2>
        </div>

        <div className="hidden gap-8 lg:grid lg:grid-cols-[0.42fr_0.58fr]">
          <div className="flex flex-col gap-3">
            {copy.pillars.map((pillar, index) => {
              const isActive = index === active;
              return (
                <button
                  key={pillar.title}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`flex items-center gap-5 rounded-lg border px-6 py-5 text-left transition-all duration-300 ${
                    isActive
                      ? "translate-x-1.5 border-sage bg-[#FAF9F6] shadow-[0_16px_45px_rgba(33,30,26,0.08)]"
                      : "border-stone-200 bg-white hover:-translate-y-0.5 hover:border-stone-300"
                  }`}
                >
                  <span className={`font-serif text-lg font-semibold ${isActive ? "text-brand" : "text-stone-400"}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={`flex-1 font-serif text-lg ${isActive ? "font-semibold text-charcoal" : "font-normal text-charcoal"}`}>
                    {pillarLabels[index] || pillar.title}
                  </span>
                  <span className={`text-sm transition-all duration-300 ${isActive ? "translate-x-1 text-brand" : "text-stone-300"}`}>
                    *
                  </span>
                </button>
              );
            })}
          </div>

          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="flex min-h-[560px] flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[0_20px_70px_rgba(33,30,26,0.10)]"
          >
            <div className="relative h-[260px] overflow-hidden bg-[#FAF9F6]">
              <img
                src={pillarImages[active] || IMG.classMain}
                alt={currentTitle}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/15 to-transparent" />
              <span className="absolute bottom-5 left-6 font-serif text-2xl text-white">
                Pillar {String(active + 1).padStart(2, "0")}: {currentTitle}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-8">
              <p className="mb-8 text-base leading-8 text-ink-soft">{current.desc}</p>
              <div className="flex flex-col gap-4">
                {(pillarPoints[active] || []).map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <span className="mt-1 text-sm text-brand">*</span>
                    <span className="text-sm leading-6 text-charcoal">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="lg:hidden">
          <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[0_18px_55px_rgba(33,30,26,0.08)]">
            {copy.pillars.map((pillar, index) => {
              const isActive = index === active;
              const title = pillarLabels[index] || pillar.title;

              return (
                <div key={pillar.title} className="border-b border-stone-100 last:border-b-0">
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    className={`flex w-full items-center gap-4 px-5 py-4 text-left transition ${
                      isActive ? "bg-[#FAF9F6]" : "bg-white hover:bg-stone-50"
                    }`}
                    aria-expanded={isActive}
                  >
                    <span className={`font-serif text-lg font-semibold ${isActive ? "text-brand" : "text-stone-400"}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={`flex-1 font-serif text-lg leading-tight ${isActive ? "text-charcoal" : "text-ink-soft"}`}>
                      {title}
                    </span>
                    <span className={`text-xl leading-none transition-transform ${isActive ? "rotate-45 text-brand" : "text-stone-400"}`}>
                      +
                    </span>
                  </button>

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="overflow-hidden bg-[#FAF9F6]"
                    >
                      <div className="px-5 pb-5">
                        <div className="relative h-44 overflow-hidden rounded-xl">
                          <img
                            src={pillarImages[index] || IMG.classMain}
                            alt={title}
                            className="h-full w-full object-cover"
                            loading="lazy"
                            decoding="async"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/10 to-transparent" />
                          <span className="absolute bottom-3 left-4 font-serif text-lg text-white">
                            Pillar {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>

                        <p className="mt-5 text-sm leading-7 text-ink-soft">{pillar.desc}</p>

                        <div className="mt-4 grid gap-2">
                          {(pillarPoints[index] || []).map((point) => (
                            <div key={point} className="flex items-start gap-2">
                              <span className="mt-1 text-sm text-brand">*</span>
                              <span className="text-sm leading-6 text-charcoal">{point}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pillars;
