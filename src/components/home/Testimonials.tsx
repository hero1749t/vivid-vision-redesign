"use client";

import { TESTIMONIALS as STATIC_TESTIMONIALS } from "@/data/site";
import { Reveal } from "@/components/shared/Reveal";
import { ExternalLink, Quote, Star, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { ApplyModal } from "@/components/shared/ApplyModal";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { getHomeCopy } from "@/lib/home-localized";

type PublicTestimonial = {
  name: string;
  course: string;
  quote: string;
  rating: number;
};

const avatarColors = ["from-sage to-sage-light", "from-brand to-brand-light", "from-gold to-gold-light"];

export const Testimonials = () => {
  const copy = getHomeCopy(useLocale());
  const fallbackTestimonials = STATIC_TESTIMONIALS.map((item, index) => ({
    ...item,
    course: copy.testimonials.items[index]?.course || item.course,
    quote: copy.testimonials.items[index]?.quote || item.quote,
    rating: 5,
  }));
  const [testimonials, setTestimonials] = useState<PublicTestimonial[]>(fallbackTestimonials);
  const [stats, setStats] = useState({ averageRating: 4.9, totalApproved: 200 });

  useEffect(() => {
    void fetch("/api/testimonials?limit=6")
      .then((response) => response.json())
      .then((result) => {
        if (Array.isArray(result.testimonials) && result.testimonials.length > 0) {
          setTestimonials(result.testimonials);
        }
        if (result.stats) {
          setStats({
            averageRating: result.stats.averageRating || 4.9,
            totalApproved: result.stats.totalApproved || 200,
          });
        }
      })
      .catch(console.error);
  }, []);

  return (
    <section id="testimonials" className="relative overflow-hidden bg-gradient-to-b from-charcoal to-charcoal-mid py-20 md:py-32">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, hsl(var(--sage)) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      {/* Decorative glows */}
      <div className="absolute left-1/4 top-0 h-[400px] w-[400px] rounded-full bg-sage/10 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-brand/10 blur-3xl" />

      <div className="container-wide relative z-10">
        {/* Section Header */}
        <div className="mb-12 flex flex-col gap-8 md:mb-20 md:flex-row md:items-end md:justify-between lg:container-edit">
          <div>
            <Reveal>
              <p className="eyebrow mb-5 text-sage-light">{copy.testimonials.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-serif font-bold leading-[1.05] tracking-tight text-white" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
                {copy.testimonials.title}
                <br />
                <span className="bg-gradient-to-r from-sage-light to-brand bg-clip-text text-transparent">{copy.testimonials.accent}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-xl text-base leading-7 text-white/60">{copy.testimonials.subtitle}</p>
            </Reveal>
          </div>

          {/* Rating Card */}
          <Reveal delay={0.1}>
            <div className="shrink-0 rounded-2xl border border-white/10 bg-white/[0.05] p-8 backdrop-blur-sm">
              <div className="mb-4 flex items-center justify-center gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star key={n} className="h-5 w-5 fill-gold text-gold" />
                ))}
              </div>
              <p className="font-serif text-4xl font-bold text-white text-center">{stats.averageRating.toFixed(1)}/5</p>
              <p className="mt-3 text-center text-[10px] uppercase tracking-widest text-white/40">
                {stats.totalApproved}+ {copy.testimonials.verified}
              </p>
              <div className="mt-4 flex items-center justify-center gap-2">
                <TrendingUp className="h-4 w-4 text-sage-light" />
                <span className="text-xs font-semibold text-sage-light">{copy.testimonials.topRated}</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:container-edit">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name + index} delay={index * 0.1}>
              <motion.article
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-500 hover:border-sage/30 hover:bg-white/[0.06]"
              >
                {/* Top section with stars and quote icon */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating || 5 }).map((_, n) => (
                      <Star key={n} className="h-4 w-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <Quote className="h-6 w-6 text-sage/40" />
                </div>

                {/* Quote text */}
                <p className="flex-1 font-serif text-lg italic leading-relaxed text-white/80 md:text-xl">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Author info */}
                <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${avatarColors[index % 3]} text-sm font-bold text-white shadow-lg`}>
                    {testimonial.name.split(" ").map((name) => name[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white md:text-base">{testimonial.name}</p>
                    <p className="mt-0.5 text-[10px] font-medium uppercase tracking-widest text-sage-light/70">
                      {testimonial.course}
                    </p>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center md:mt-24 lg:container-edit"
        >
          <p className="mb-6 text-sm text-white/50">{copy.testimonials.readVerified}</p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ApplyModal trigger={
              <Button className="h-12 rounded-full bg-brand px-8 py-3 font-semibold text-white shadow-lg shadow-brand/20 hover:bg-brand-dark hover:shadow-xl hover:shadow-brand/30">
                {copy.testimonials.startJourney}
              </Button>
            } />
            <a
              href="https://baliyttc.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/60 transition-all duration-300 hover:border-sage/40 hover:text-sage-light"
            >
              {copy.testimonials.viewAll} <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
