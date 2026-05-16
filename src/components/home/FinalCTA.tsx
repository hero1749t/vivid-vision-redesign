"use client";

import { IMG } from "@/data/site";
import { ApplyModal } from "@/components/shared/ApplyModal";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/Reveal";
import { motion } from "framer-motion";
import { CheckCircle, Heart, Sparkles, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export const FinalCTA = () => {
  const t = useTranslations("FinalCTA");
  const tApply = useTranslations("Apply");

  const featurePills = [
    { icon: Heart, text: tApply("reply24h") },
    { icon: CheckCircle, text: tApply("yogaAlliance") },
    { icon: CheckCircle, text: tApply("freeCancel") },
  ];

  return (
    <section className="relative overflow-hidden py-24 md:py-40">
      {/* Background Image */}
      <div className="absolute inset-0 h-full w-full">
        <img src={IMG.graduation} alt="Yoga graduation ceremony Bali YTTC" className="h-full w-full object-cover" />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/60 to-charcoal/80" />

      {/* Accent glows */}
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute -top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-brand/30 blur-3xl"
      />
      <div className="absolute right-0 bottom-1/4 h-64 w-64 rounded-full bg-sage/20 blur-3xl" />

      <div className="container-edit relative z-10 text-center">
        {/* Badge */}
        <Reveal>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="mb-8 inline-flex items-center gap-3 rounded-full border border-brand/50 bg-brand/20 px-8 py-4 backdrop-blur-sm"
          >
            <Sparkles className="h-5 w-5 text-brand" />
            <p className="text-sm font-bold uppercase tracking-widest text-white">{t("title")}</p>
            <Sparkles className="h-5 w-5 text-brand" />
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
            <span className="bg-gradient-to-r from-brand via-gold to-brand bg-clip-text text-transparent">
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
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm text-white/90 md:gap-6">
            {featurePills.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-sm"
              >
                <Icon className="h-5 w-5 shrink-0 text-brand" />
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
                  className="group inline-flex h-16 items-center justify-center gap-3 rounded-full bg-brand px-14 text-lg font-bold text-white shadow-brand transition-all duration-300 hover:bg-brand-dark hover:shadow-xl hover:shadow-brand md:text-xl"
                >
                  {t("cta")}
                  <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
                </motion.button>
              }
            />
            <p className="text-base text-white/60">
              {tApply("noPayment")} · {tApply("reply24h")}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
