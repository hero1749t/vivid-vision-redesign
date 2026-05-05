import { COURSES } from "@/data/site";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Link } from "react-router-dom";
import { ArrowUpRight, CalendarDays, Clock, Users, Flame, Star, CheckCircle2 } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ApplyModal } from "@/components/shared/ApplyModal";
import { useRef } from "react";

// 3D tilt card component
const TiltCard = ({ children, featured }: { children: React.ReactNode; featured?: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const resetTilt = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={resetTilt}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: "1000px" }}
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-300 ${
        featured
          ? "border-amber-400/60 shadow-2xl shadow-amber-500/20"
          : "border-warm-dark/12 shadow-elev-md"
      } bg-white`}
    >
      {children}
    </motion.div>
  );
};

export const FeaturedCourses = () => (
  <section id="courses" className="relative bg-sand py-20 md:py-32 overflow-hidden">
    {/* Subtle decorative orbs */}
    <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-amber-100/40 to-transparent blur-3xl" />
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-orange-100/30 to-transparent blur-3xl" />

    <div className="container-edit relative z-10">
      <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Yoga Teacher Training"
          title={
            <>
              Choose the training
              <br />
              that matches your path
            </>
          }
          sub="Yoga Alliance certified 100, 200 and 300 hour programs. Small cohorts, clear schedules, and a fully residential Bali experience."
        />
        <Link
          to="/gallery"
          className="hidden items-center gap-2 rounded-xl border border-warm-dark/15 bg-white/80 backdrop-blur-sm px-5 py-3 text-sm font-semibold text-warm-dark transition-all duration-300 hover:bg-white hover:shadow-elev-md md:inline-flex"
        >
          See gallery <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Cards — tall cinematic layout inspired by Gemini concept */}
      <div className="grid gap-6 md:grid-cols-3" style={{ perspective: "1200px" }}>
        {COURSES.map((course, index) => (
          <Reveal key={course.slug} delay={index * 0.1}>
            <div className="flex h-full flex-col">
              <TiltCard featured={course.featured}>
                {/* Full-bleed tall image */}
                <div className="relative overflow-hidden" style={{ height: "340px" }}>
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Cinematic bottom gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                    {course.featured ? (
                      <div className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
                        <Flame className="h-3 w-3" /> Most Popular
                      </div>
                    ) : <div />}
                    <div className={`rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider ${
                      course.seats.toLowerCase().includes("4") || course.seats.toLowerCase().includes("6")
                        ? "bg-red-500/90 text-white"
                        : "bg-black/50 backdrop-blur-sm text-cream/90"
                    }`}>
                      {course.seats}
                    </div>
                  </div>

                  {/* Bottom name overlay — glassmorphism panel */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-amber-300 mb-1">{course.style}</p>
                    <h3 className="font-serif text-xl font-bold leading-tight text-white md:text-2xl">{course.title}</h3>
                    <div className="mt-3 flex items-center gap-4 text-cream/70 text-xs">
                      <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{course.duration}</span>
                      <span className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" />{course.days}</span>
                      <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />{course.next.split(" - ")[0]}</span>
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <p className="text-sm leading-7 text-ink-soft">{course.summary}</p>

                  {/* Highlights */}
                  <ul className="mt-4 space-y-1.5">
                    {course.highlights.map(h => (
                      <li key={h} className="flex items-center gap-2 text-xs text-warm-mid">
                        <CheckCircle2 className="h-3.5 w-3.5 text-terra shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Price + explore */}
                  <div className="mt-auto flex items-end justify-between border-t border-warm-dark/8 pt-5 mt-5">
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.20em] text-warm-light">Starts from</p>
                      <p className="mt-1 font-serif text-4xl font-bold leading-none text-warm-dark">
                        ${course.priceFrom}
                      </p>
                      <p className="text-[9px] text-warm-light mt-0.5">All inclusive</p>
                    </div>
                    <Link
                      to={course.href}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-2.5 text-sm font-bold text-amber-800 transition-all duration-300 group-hover:from-amber-500 group-hover:to-orange-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-amber-500/30"
                    >
                      Explore <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </TiltCard>

              {/* Apply button below — highlighted for featured */}
              <ApplyModal
                defaultCourse={course.slug}
                trigger={
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className={`mt-3 w-full rounded-xl py-3.5 text-sm font-bold transition-all duration-300 ${
                      course.featured
                        ? "bg-[#F04E23] text-white shadow-xl shadow-[#F04E23]/25 hover:bg-[#D03D12] hover:shadow-[#F04E23]/40"
                        : "border-2 border-warm-dark/12 bg-white text-warm-dark hover:border-[#F04E23]/50 hover:text-[#F04E23] hover:bg-orange-50"
                    }`}
                  >
                    Apply for {course.duration} Training →
                  </motion.button>
                }
              />
            </div>
          </Reveal>
        ))}
      </div>

      {/* Mobile CTA */}
      <Link
        to="/#courses"
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-warm-dark px-5 py-4 text-sm font-bold text-cream transition-colors hover:bg-terra-deep md:hidden"
      >
        View all programs <ArrowUpRight className="h-4 w-4" />
      </Link>
    </div>
  </section>
);
