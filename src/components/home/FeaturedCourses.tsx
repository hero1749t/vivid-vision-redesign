"use client";
import { COURSES } from "@/data/site";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Link } from "@/i18n/routing";
import { ArrowUpRight, CalendarDays, Clock, Users, Flame, CheckCircle2 } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { ApplyModal } from "@/components/shared/ApplyModal";
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

type ApiCourse = {
  id: string;
  slug: string;
  name: string;
  duration: string;
  summary: string;
  priceFrom: number;
  image?: string | null;
  modules?: Array<{ title?: string | null }>;
  batches?: Array<{ startDate?: string | null; seatsLeft?: number | null }>;
};

type DisplayCourse = {
  slug: string;
  title: string;
  duration: string;
  days: string;
  next: string;
  seats: string;
  style: string;
  image: string;
  summary: string;
  highlights: string[];
  href: string;
  priceFrom: number;
  featured?: boolean;
};

const formatBatchDate = (date?: string | null, locale = "en") => {
  if (!date) return "Next dates";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "Next dates";
  return new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }).format(parsed);
};

const normalizeApiCourse = (course: ApiCourse, index: number, locale: string): DisplayCourse => {
  const durationParts = course.duration.split("|").map((part) => part.trim()).filter(Boolean);
  const batch = course.batches?.[0];
  const highlights = course.modules?.map((module) => module.title).filter(Boolean).slice(0, 4) as string[] | undefined;

  return {
    slug: course.slug,
    title: course.name,
    duration: durationParts[0] || course.duration || "Yoga Training",
    days: durationParts[1] || "Residential",
    next: formatBatchDate(batch?.startDate, locale),
    seats: typeof batch?.seatsLeft === "number" ? `${batch.seatsLeft} seats left` : "Open seats",
    style: "Yoga Teacher Training",
    image: course.image || "/images/course-200hr.webp",
    summary: course.summary,
    highlights: highlights?.length ? highlights : ["Yoga Alliance curriculum", "Daily guided practice", "Residential Bali experience"],
    href: `/courses/${course.slug}`,
    priceFrom: course.priceFrom,
    featured: course.slug.includes("200") || index === 1,
  };
};

const normalizeStaticCourse = (course: (typeof COURSES)[number]): DisplayCourse => ({
  slug: course.slug,
  title: course.title,
  duration: course.duration,
  days: course.days,
  next: course.next,
  seats: course.seats,
  style: course.style,
  image: course.image,
  summary: course.summary,
  highlights: course.highlights,
  href: course.href,
  priceFrom: course.priceFrom,
  featured: course.featured,
});

// Premium Course Card Component
const CourseCard = ({ course, index, t }: { course: DisplayCourse; index: number; t: any }) => {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="group flex h-full flex-col"
    >
      {/* Card Container - Cleaner design */}
      <div className={`relative flex flex-1 flex-col overflow-hidden rounded-2xl bg-white transition-all duration-300 ${course.featured ? 'border-2 border-brand shadow-premium-md' : 'border border-gray-100 shadow-premium-sm'} hover:shadow-premium-xl hover:-translate-y-1`}>

        {/* Image Section */}
        <div className="relative overflow-hidden" style={{ height: "280px" }}>
          <img
            src={course.image}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
            {course.featured ? (
              <div className="flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
                <Flame className="h-3 w-3" /> {t("popular")}
              </div>
            ) : (
              <div className="h-8" />
            )}

            {/* Seat availability badge */}
            <div className={`rounded-full px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider backdrop-blur-sm ${
              course.seats.toLowerCase().includes("4") || course.seats.toLowerCase().includes("6")
                ? "bg-red-500/90 text-white"
                : "bg-white/90 text-charcoal"
            }`}>
              {course.seats}
            </div>
          </div>

          {/* Bottom Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-sage-light mb-1">{course.style}</p>
            <h3 className="font-serif text-xl font-bold leading-tight text-white md:text-2xl">{course.title}</h3>
            <div className="mt-3 flex items-center gap-4 text-white/80 text-xs">
              <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{course.duration}</span>
              <span className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" />{course.days}</span>
              <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />{course.next.split(" - ")[0]}</span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="flex flex-1 flex-col p-6">
          {/* Summary */}
          <p className="text-sm leading-6 text-ink-soft line-clamp-2">{course.summary}</p>

          {/* Highlights */}
          <ul className="mt-4 space-y-2">
            {course.highlights.slice(0, 3).map((h, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-ink-muted">
                <CheckCircle2 className="h-4 w-4 text-sage shrink-0" />
                <span className="line-clamp-1">{h}</span>
              </li>
            ))}
          </ul>

          {/* Price and CTA */}
          <div className="mt-auto flex items-end justify-between border-t border-gray-100 pt-5 mt-5">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-ink-faint">Starts from</p>
              <p className="mt-1 font-serif text-3xl font-bold leading-none text-charcoal">
                EUR {course.priceFrom}
              </p>
              <p className="text-[9px] text-ink-faint mt-0.5">All inclusive</p>
            </div>

            <Link
              href={course.href}
              className="inline-flex items-center gap-1.5 rounded-xl bg-sage-mist px-4 py-2.5 text-sm font-semibold text-sage transition-all duration-300 hover:bg-sage hover:text-white"
            >
              {t("viewDetails")} <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Apply Button - Below card */}
        <ApplyModal
          defaultCourse={course.slug}
          trigger={
            <button
              className={`mx-6 mb-6 w-auto rounded-xl py-3.5 text-sm font-semibold transition-all duration-300 ${
                course.featured
                  ? "bg-brand text-white hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/20"
                  : "border-2 border-gray-200 bg-white text-charcoal hover:border-sage hover:text-sage"
              }`}
            >
              {t("applyNow")} - {course.duration}
            </button>
          }
        />
      </div>
    </motion.div>
  );
};

export const FeaturedCourses = () => {
  const params = useParams<{ locale?: string }>();
  const locale = useLocale();
  const t = useTranslations("Courses");
  const [apiCourses, setApiCourses] = useState<ApiCourse[] | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const locale = params?.locale || "en";

    fetch(`/api/courses?locale=${encodeURIComponent(locale)}`, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (Array.isArray(data?.courses)) {
          setApiCourses(data.courses);
        }
      })
      .catch((error) => {
        if (error instanceof Error && error.name !== "AbortError") {
          setApiCourses(null);
        }
      });

    return () => controller.abort();
  }, [params?.locale]);

  const courses = useMemo(
    () => (apiCourses?.length ? apiCourses.map((course, index) => normalizeApiCourse(course, index, locale)) : COURSES.map(normalizeStaticCourse)),
    [apiCourses, locale],
  );

  return (
    <section id="courses" className="relative bg-gradient-to-b from-sand to-cream section-padding overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-sage-mist blur-3xl opacity-60" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-brand-muted blur-3xl opacity-40" />

      <div className="container-edit relative z-10">
        {/* Section Header */}
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow={t("title")}
            title={
              <>
                {t("subtitle")}
                <span className="text-brand"> Bali YTTC</span>
              </>
            }
            sub={t("enrolmentOpen")}
          />

          <Link href="/courses"
            className="hidden items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-charcoal transition-all duration-300 hover:border-sage hover:text-sage md:inline-flex shadow-premium-sm"
          >
            View All Courses <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Course Cards Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {courses.map((course, index) => (
            <CourseCard
              key={course.slug}
              course={course}
              index={index}
              t={t}
            />
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 text-center md:hidden">
          <Link href="/courses"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-charcoal px-6 py-4 text-sm font-medium text-white transition-colors hover:bg-sage"
          >
            View All Courses <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
