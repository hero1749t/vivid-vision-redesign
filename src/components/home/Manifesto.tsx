"use client";
import { Reveal } from "@/components/shared/Reveal";
import { IMG } from "@/data/site";
import { Link } from "@/i18n/routing";
import { ArrowUpRight, CheckCircle2, Award, Leaf } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export const Manifesto = () => {
  const t = useTranslations("Manifesto");

  const translatedStats = [
    { num: "2,500+", label: t("yearsExperience") },
    { num: "8 yrs", label: t("title") },
    { num: "RYS 200 & 300", label: "Yoga Alliance" },
  ];

  const highlights = [
    { text: t("point1"), icon: Leaf },
    { text: t("point2"), icon: Award },
    { text: t("point3"), icon: CheckCircle2 },
  ];

  return (
    <section className="relative bg-white py-20 md:py-32 overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-sage-mist blur-3xl opacity-60" />
      <div className="absolute left-0 bottom-0 h-64 w-64 rounded-full bg-brand-muted blur-3xl opacity-40" />

      <div className="container-edit relative z-10 grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
        {/* Left Column - Content */}
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow text-sage">{t("eyebrow")}</p>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="mt-5 max-w-3xl font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05] tracking-tight text-charcoal">
              {t("titleLine1")}
              <br />
              <span className="text-brand">{t("titleLine2")}</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-7 max-w-2xl space-y-5 text-base leading-7 text-ink-soft md:text-lg">
              <p>{t("description1")}</p>
              <p>{t("description2")}</p>
            </div>
          </Reveal>

          {/* Stats row */}
          <Reveal delay={0.12}>
            <div className="mt-10 flex gap-8 md:gap-12">
              {translatedStats.map((s, i) => (
                <div key={i} className="flex flex-col">
                  <p className="font-serif text-2xl font-bold text-charcoal md:text-3xl">{s.num}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-ink-muted font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Highlights */}
          <Reveal delay={0.15}>
            <div className="mt-10 grid gap-3 sm:grid-cols-1 md:grid-cols-3">
              {highlights.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-gray-100 bg-cream/50 p-4 transition-all duration-300 hover:border-sage/30 hover:bg-sage-mist/50 hover:shadow-premium-sm"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sage/10">
                      <Icon className="h-5 w-5 text-sage" />
                    </div>
                    <p className="text-sm font-medium leading-6 text-ink-soft">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>

          {/* CTA Buttons */}
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/about"
                className="inline-flex items-center gap-2 rounded-full bg-charcoal px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-sage hover:shadow-lg"
              >
                {t("learnMore")}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="/instructors"
                className="inline-flex items-center gap-2 rounded-full border-2 border-gray-200 bg-transparent px-7 py-3.5 text-sm font-medium text-charcoal transition-all duration-300 hover:border-sage hover:text-sage"
              >
                Meet Our Teachers
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Right Column - Image */}
        <div className="relative lg:col-span-5">
          <Reveal y={30}>
            <div className="overflow-hidden rounded-3xl bg-sand shadow-premium-lg">
              <img
                src={IMG.certified}
                alt="Certified yoga teacher training in Bali"
                className="aspect-[4/5] h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </div>
          </Reveal>

          {/* Floating stat card */}
          <Reveal delay={0.18} y={18}>
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute -bottom-6 left-4 right-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-premium-xl md:left-auto md:right-8 md:w-64"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10">
                  <Award className="h-5 w-5 text-brand" />
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-ink-muted font-semibold">{t("yearsExperience")}</p>
              </div>
              <p className="font-serif text-4xl font-bold text-brand">15+</p>
              <p className="mt-2 text-sm leading-6 text-ink-soft">
                {t("description2")}
              </p>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
