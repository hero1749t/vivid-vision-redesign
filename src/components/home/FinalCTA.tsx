"use client";

import { IMG } from "@/data/site";
import { ApplyModal } from "@/components/shared/ApplyModal";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/Reveal";
import { motion } from "framer-motion";
import { CheckCircle, Heart, Sparkles, Zap, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export const FinalCTA = () => {
  const t = useTranslations("FinalCTA");
  const tApply = useTranslations("Apply");

  const featurePills = [
    { icon: Heart, text: tApply("reply24h") },
    { icon: Zap, text: tApply("yogaAlliance") },
    { icon: CheckCircle, text: tApply("freeCancel") },
  ];

  return (
    <section className="relative overflow-hidden py-24 md:py-40">
      {/* Background Image */}
      <div className="absolute inset-0 h-full w-full">
        <img src={IMG.graduation} alt="Yoga graduation ceremony Bali YTTC" className="h-full w-full object-cover" />
      </div>

      {/* Overlay - Softer gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/55 to-charcoal/80" />

      {/* Decorative glows */}
      <motion.div
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute -top-1/2 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-br from-sage/30 to-brand/20 blur-3xl"
      />

      {/* Sage accent */}
      <div className="absolute right-0 bottom-1/4 h-64 w-64 rounded-full bg-sage/10 blur-3xl" />

      <div className="container-edit relative z-10 text-center">
        {/* Badge */}
        <Reveal>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="mb-8 inline-flex items-center gap-3 rounded-full border border-sage/30 bg-sage/10 px-6 py-3 backdrop-blur-sm"
          >
            <Sparkles className="h-5 w-5 text-sage-light" />
            <p className="text-xs font-semibold uppercase tracking-widest text-white">{t("title")}</p>
            <Sparkles className="h-5 w-5 text-sage-light" />
          </motion.div>
        </Reveal>

        {/* Heading */}
        <Reveal delay={0.06}>
          <h2
            className="font-serif font-bold leading-[1.05] tracking-tight text-white"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            Begin Your Journey at
            <br />
            <span className="bg-gradient-to-r from-sage-light via-brand-light to-gold bg-clip-text text-transparent">
              Bali YTTC
            </span>
          </h2>
        </Reveal>

        {/* Subtitle */}
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-white/80 md:text-lg">
            {t("subtitle")}
          </p>
        </Reveal>

        {/* Feature pills */}
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm text-white/90 md:gap-5">
            {featurePills.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-5 py-2 backdrop-blur-sm"
              >
                <Icon className="h-4 w-4 shrink-0 text-sage-light" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col items-center justify-center gap-5 md:mt-16 sm:flex-row">
            <ApplyModal
              trigger={
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-brand px-10 text-base font-semibold text-white shadow-xl shadow-brand/30 transition-all duration-300 hover:bg-brand-dark hover:shadow-2xl hover:shadow-brand/40 md:h-16 md:px-14 md:text-lg"
                >
                  {t("cta")}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </motion.button>
              }
            />
            <p className="text-sm text-white/50">
              {tApply("noPayment")} · {tApply("reply24h")}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
