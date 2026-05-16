"use client";

import { PILLARS } from "@/data/site";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { getHomeCopy } from "@/lib/home-localized";

export const Pillars = () => {
  const t = useTranslations("Pillars");
  const copy = getHomeCopy(useLocale());

  return (
    <section id="pillars" className="relative overflow-hidden bg-gradient-to-br from-charcoal via-charcoal to-charcoal-mid py-20 text-white md:py-32">
      {/* Decorative elements */}
      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-sage/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-brand/10 blur-3xl" />

      <div className="container-edit relative z-10">
        <SectionHeading
          light
          eyebrow={t("title")}
          title={
            <>
              {t("title")}
              <br />
              <span className="bg-gradient-to-r from-sage-light to-brand bg-clip-text text-transparent">
                Bali YTTC
              </span>
            </>
          }
          sub={t("subtitle")}
        />

        {/* Pillars Grid */}
        <div className="mt-16 grid gap-1 overflow-hidden rounded-2xl bg-gradient-to-br from-sage/20 to-brand/10 p-px shadow-premium-xl sm:grid-cols-2 md:mt-20 lg:grid-cols-3">
          {copy.pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.06}>
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                className="group relative h-full border border-white/10 bg-gradient-to-br from-charcoal/90 to-charcoal-mid/90 p-6 backdrop-blur-sm transition-all duration-500 hover:border-sage/30 hover:from-charcoal-mid/90 hover:to-charcoal/90 md:p-8"
              >
                {/* Number badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sage to-sage-light font-serif text-lg font-bold text-white shadow-lg shadow-sage/20"
                >
                  {index + 1}
                </motion.div>

                {/* Title */}
                <h3 className="mt-6 font-serif text-2xl leading-tight text-white transition-colors duration-300 group-hover:text-sage-light md:text-2xl">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="mt-4 text-sm leading-relaxed text-white/70 transition-colors group-hover:text-white/90 md:text-base">
                  {pillar.desc}
                </p>

                {/* Decorative glow on hover */}
                <div className="absolute -right-1 -top-1 h-8 w-8 rounded-full bg-gradient-to-br from-sage to-brand opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-30" />

                {/* Bottom line accent on hover */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-sage to-brand transition-all duration-500 group-hover:w-full" />
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Summary Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-14 rounded-2xl border border-sage/30 bg-gradient-to-r from-sage/15 to-brand/10 p-8 backdrop-blur-sm md:mt-20 md:p-10"
        >
          <p className="text-center text-base leading-relaxed text-white/80 md:text-lg">
            <span className="font-semibold text-sage-light">{t("title")}:</span> {t("subtitle")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
