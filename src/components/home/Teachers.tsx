"use client";

import { TEACHERS } from "@/data/site";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { Link } from "@/i18n/routing";
import { ArrowUpRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { getHomeCopy } from "@/lib/home-localized";

export const Teachers = () => {
  const copy = getHomeCopy(useLocale());
  const teachers = TEACHERS.map((teacher, index) => ({ ...teacher, ...copy.teachers.items[index] }));

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream via-white to-white py-20 md:py-36">
      {/* Decorative elements */}
      <div className="absolute right-0 -top-20 h-80 w-80 rounded-full bg-sage-mist blur-3xl" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-brand-muted/30 blur-3xl" />

      <div className="container-edit relative z-10">
        {/* Section Header */}
        <div className="mb-14 grid items-end gap-8 md:mb-20 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <SectionHeading
              eyebrow={copy.teachers.eyebrow}
              title={
                <>
                  {copy.teachers.title}
                  <br />
                  <span className="text-sage">{copy.teachers.accent}</span>
                </>
              }
              sub={copy.teachers.subtitle}
            />
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link
              href="/instructors"
              className="inline-flex items-center gap-2 rounded-full border-2 border-gray-200 bg-white px-6 py-3 font-medium text-charcoal shadow-premium-sm transition-all duration-300 hover:border-sage hover:text-sage"
            >
              {copy.teachers.viewAll} <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Teachers Grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {teachers.map((teacher, index) => (
            <Reveal key={teacher.name} delay={index * 0.1}>
              <motion.article
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-br from-sage-pale to-sand shadow-premium-md transition-all duration-500 group-hover:shadow-premium-xl">
                  <img
                    src={teacher.img}
                    alt={teacher.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/20 to-transparent" />

                  {/* Credentials badge */}
                  <div className="absolute right-4 top-4 rounded-full bg-white/95 px-4 py-2 text-[9px] font-bold uppercase tracking-wider text-charcoal shadow-lg backdrop-blur">
                    {teacher.cred}
                  </div>

                  {/* Bottom info */}
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-sage-light">
                      {teacher.role}
                    </p>
                    <h3 className="font-serif text-xl font-bold leading-tight text-white md:text-2xl">
                      {teacher.name}
                    </h3>
                  </div>
                </div>

                {/* Bio Section */}
                <div className="mt-6">
                  <p className="line-clamp-2 text-sm leading-relaxed text-ink-soft">
                    {teacher.bio}
                  </p>

                  {/* Style tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {teacher.style.slice(0, 2).map((style, i) => (
                      <span
                        key={i}
                        className="rounded-full border border-sage/20 bg-sage-mist/50 px-3 py-1 text-[9px] font-medium uppercase tracking-wider text-sage md:text-xs"
                      >
                        {style}
                      </span>
                    ))}
                  </div>

                  {/* Experience */}
                  <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-4">
                    <Star className="h-4 w-4 fill-gold text-gold" />
                    <span className="text-xs font-medium text-ink-muted">{teacher.experience}</span>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="mb-6 text-base text-ink-muted md:text-lg">{copy.teachers.cta}</p>
        </div>
      </div>
    </section>
  );
};
