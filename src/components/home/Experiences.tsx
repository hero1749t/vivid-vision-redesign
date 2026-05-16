"use client";

import { EXPERIENCES } from "@/data/site";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { motion } from "framer-motion";
import { Eye, Sparkles } from "lucide-react";
import { useLocale } from "next-intl";
import { getHomeCopy } from "@/lib/home-localized";

const icons = ["🙏", "💪", "🔔", "🤸", "🌅", "🎨"];

export const Experiences = () => {
  const copy = getHomeCopy(useLocale());
  const experiences = EXPERIENCES.map((item, index) => ({ ...item, ...copy.experiences.cards[index] }));

  return (
    <section id="experiences" className="bg-gradient-to-b from-warm-dark/5 to-sand py-28 md:py-36">
      <div className="container-edit">
        <SectionHeading
          eyebrow={copy.experiences.eyebrow}
          title={
            <>
              {copy.experiences.title} <em className="text-amber-600">{copy.experiences.accent}</em>
            </>
          }
          sub={copy.experiences.subtitle}
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((experience, index) => (
            <Reveal key={experience.title} delay={index * 0.05}>
              <motion.div whileHover={{ y: -8 }} className="h-full">
                <article className="group relative aspect-square h-full cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-shadow hover:shadow-2xl">
                  <img src={experience.img} alt={experience.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-warm-dark/95 via-warm-dark/40 to-warm-dark/0 transition-all duration-500 group-hover:via-warm-dark/50" />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 text-cream group-hover:pointer-events-auto"
                  >
                    <div className="flex items-start justify-between">
                      <div className="text-4xl drop-shadow-lg">{icons[index] || "✨"}</div>
                      <div className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-xs text-cream backdrop-blur-sm">
                        <Eye size={12} />
                        <span>{copy.common.view}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-serif text-2xl font-semibold leading-tight drop-shadow-lg transition-colors group-hover:text-amber-100">
                        {experience.title}
                      </h3>
                      <p className="line-clamp-3 text-sm leading-relaxed text-cream/90 drop-shadow-md">{experience.desc}</p>
                      <div className="flex items-center gap-2 pt-3 text-xs text-amber-200">
                        <Sparkles size={14} className="animate-pulse" />
                        {copy.common.learnMore}
                      </div>
                    </div>
                  </motion.div>
                </article>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 text-center md:hidden">
            <p className="mb-4 text-sm text-warm-dark">{copy.experiences.mobileHint}</p>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
};
