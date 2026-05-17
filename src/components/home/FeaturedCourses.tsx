"use client";
import { COURSES } from "@/data/site";
import { Link } from "@/i18n/routing";
import { ArrowLeft, ArrowRight, ArrowUpRight, Flame, CheckCircle2 } from "lucide-react";
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

const getActiveCardIndex = (
  node: HTMLDivElement | null,
): number | null => {
  if (!node) return null;
  const cards = Array.from(node.children) as HTMLElement[];
  if (!cards.length) return null;

  const viewportCenter = node.getBoundingClientRect().left + node.clientWidth / 2;
  const nearest = cards.reduce(
    (closest, card, index) => {
      const rect = card.getBoundingClientRect();
      const distance = Math.abs(rect.left + rect.width / 2 - viewportCenter);
      return distance < closest.distance ? { index, distance } : closest;
    },
    { index: 0, distance: Number.POSITIVE_INFINITY },
  );

  return nearest.index;
};

const updateActiveCard = (
  node: HTMLDivElement | null,
  setActiveIndex: (index: number) => void,
) => {
  const index = getActiveCardIndex(node);
  if (index !== null) setActiveIndex(index);
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

const getMobileBadge = (course: DisplayCourse) => {
  if (course.featured) return "Most Popular";
  if (course.slug.includes("100")) return "Most Accessible";
  if (course.slug.includes("300")) return "Advanced Track";
  if (course.slug.includes("50")) return "Short Course";
  return "Open Seats";
};

const getCompactTitle = (title: string) =>
  title
    .replace("Yoga Teacher Training", "YTT")
    .replace("Advanced Teacher Training", "Advanced YTT")
    .replace("Hatha-Vinyasa Yoga Teacher Training", "Hatha-Vinyasa YTT");

const MobileCourseCard = ({ course }: { course: DisplayCourse }) => (
  <Link
    href={course.href}
    className="group flex w-[280px] shrink-0 snap-center flex-col overflow-hidden rounded-[22px] border border-stone-200 bg-white shadow-[0_16px_42px_rgba(35,35,30,0.12)] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(35,35,30,0.16)]"
  >
    <div className="relative h-[200px] overflow-hidden">
      <img
        src={course.image}
        alt={course.title}
        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/65 via-charcoal/10 to-transparent" />
      <span className="absolute left-4 top-4 rounded-full bg-sage px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-lg">
        {getMobileBadge(course)}
      </span>
      <span className="absolute bottom-4 left-4 rounded-full bg-white/92 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-charcoal shadow-sm">
        {course.seats}
      </span>
    </div>

    <div className="flex min-h-[230px] flex-col p-6">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-sage">{course.days}</p>
      <h3 className="mt-2 font-serif text-[1.55rem] leading-[1.08] text-charcoal">
        {getCompactTitle(course.title)}
      </h3>
      <p className="mt-4 line-clamp-3 text-sm leading-6 text-ink-soft">{course.summary}</p>

      <div className="mt-auto flex items-end justify-between border-t border-stone-100 pt-5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-faint">From</p>
          <p className="mt-1 font-serif text-2xl font-bold leading-none text-charcoal">EUR {course.priceFrom}</p>
        </div>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-sage">
          Details <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </div>
  </Link>
);

const CourseCard = ({
  course,
  index,
  active,
  t,
}: {
  course: DisplayCourse;
  index: number;
  active: boolean;
  t: any;
}) => {
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
      <article className={`relative flex h-full min-h-[530px] flex-col overflow-hidden rounded-[6px] bg-white shadow-[0_18px_48px_rgba(42,36,28,0.10)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(42,36,28,0.16)] ${course.featured || active ? "ring-1 ring-brand/75" : "ring-1 ring-stone-200"}`}>
        <div className="relative h-[210px] shrink-0 overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

          <div className="absolute left-4 right-4 top-4 flex items-start justify-between">
            {course.featured ? (
              <div className="flex items-center gap-1.5 rounded-[3px] bg-sage px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-lg">
                <Flame className="h-3 w-3" /> Most Popular
              </div>
            ) : (
              <div className="rounded-[3px] bg-sage px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-lg">
                {getMobileBadge(course)}
              </div>
            )}

            <div className={`rounded-full px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-sm ${
              course.seats.toLowerCase().includes("4") || course.seats.toLowerCase().includes("6")
                ? "bg-red-500/90 text-white"
                : "bg-white/90 text-charcoal"
            }`}>
              {course.seats}
            </div>
          </div>

          <div className="absolute bottom-4 left-5 right-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/80">{course.style}</p>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand">{course.days}</p>
          <h3 className="mt-2 font-serif text-[1.7rem] font-semibold leading-tight text-charcoal">
            {getCompactTitle(course.title)}
          </h3>
          <p className="mt-2 text-sm text-ink-soft">{course.duration} certification track</p>
          <div className="my-5 h-px bg-stone-200" />
          <p className="line-clamp-3 text-sm leading-6 text-ink-soft">{course.summary}</p>

          <ul className="mt-5 space-y-2.5">
            {course.highlights.slice(0, 3).map((h, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-ink-muted">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-sage" />
                <span className="line-clamp-1">{h}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto border-t border-stone-200 pt-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-ink-faint">Starts from</p>
                <p className="mt-1 font-serif text-3xl font-semibold leading-none text-charcoal">
                  EUR {course.priceFrom}
                </p>
              </div>
              <Link href={course.href} className="inline-flex items-center gap-1 text-sm font-semibold text-brand transition hover:text-brand-dark">
                Details <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-4">
              <ApplyModal
                defaultCourse={course.slug}
                trigger={
                  <button className="inline-flex h-11 w-full items-center justify-center rounded-full bg-charcoal px-5 text-sm font-semibold text-white transition hover:bg-brand">
                    {t("applyNow")}
                  </button>
                }
              />
            </div>
          </div>
        </div>
      </article>
    </motion.div>
  );
};

export const FeaturedCourses = () => {
  const params = useParams<{ locale?: string }>();
  const locale = useLocale();
  const t = useTranslations("Courses");
  const [apiCourses, setApiCourses] = useState<ApiCourse[] | null>(null);
  const mobileSliderRef = useRef<HTMLDivElement>(null);

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

  const scrollMobileSlider = (direction: "prev" | "next") => {
    const node = mobileSliderRef.current;
    if (!node) return;
    node.scrollBy({
      left: direction === "next" ? 300 : -300,
      behavior: "smooth",
    });
  };

  return (
    <section id="courses" className="relative overflow-hidden bg-[#f5f1ea] py-16 md:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-px bg-gray-200" />

      <div className="container-edit relative z-10">
        <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-serif text-5xl font-semibold leading-[0.95] text-charcoal md:text-6xl">
              Choose Your Path
            </h2>
            <div className="mt-9 flex items-center gap-4">
              <span className="h-px w-20 bg-sage" />
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-sage">
                Professional Certification Tracks
              </p>
            </div>
          </div>
          <div className="hidden md:block">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:text-brand-dark"
            >
              View All Programs <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="relative md:hidden">
          <button
            type="button"
            onClick={() => scrollMobileSlider("prev")}
            className="absolute left-0 top-[112px] z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-stone-200 bg-white text-charcoal shadow-[0_10px_26px_rgba(35,35,30,0.16)] transition hover:border-sage hover:text-sage"
            aria-label="Previous courses"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div
            ref={mobileSliderRef}
            className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain scroll-smooth px-5 pb-8 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {courses.map((course) => (
              <MobileCourseCard key={course.slug} course={course} />
            ))}
          </div>
          <button
            type="button"
            onClick={() => scrollMobileSlider("next")}
            className="absolute right-0 top-[112px] z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-stone-200 bg-white text-charcoal shadow-[0_10px_26px_rgba(35,35,30,0.16)] transition hover:border-sage hover:text-sage"
            aria-label="Next courses"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="hidden gap-6 md:grid md:grid-cols-2 xl:grid-cols-4">
          {courses.map((course, index) => (
            <CourseCard
              key={course.slug}
              course={course}
              index={index}
              active={course.featured || index === 1}
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
