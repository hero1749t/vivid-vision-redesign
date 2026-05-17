"use client";

import { IMG } from "@/data/site";

const trustStats = [
  { value: "Yoga Alliance", label: "RYS 200 & 300" },
  { value: "2,500+", label: "Graduates" },
  { value: "4.9 / 5", label: "Average Rating" },
  { value: "Since 2018", label: "Years Teaching" },
  { value: "70+", label: "Nationalities" },
  { value: "98%", label: "Would Recommend" },
];

const trustLogos = [
  { src: IMG.yogaAlliance, label: "Yoga Alliance" },
  { src: IMG.rys200, label: "RYS 200" },
  { src: IMG.trustpilot, label: "Trustpilot" },
  { src: IMG.tripadvisor, label: "TripAdvisor" },
  { src: IMG.bookRetreat, label: "Book Yoga Retreats" },
];

const TrustItem = ({ value, label, mobile = false }: { value: string; label: string; mobile?: boolean }) => (
  <div
    className={`flex flex-col items-center justify-center gap-1 border-r border-stone-200 px-4 text-center last:border-r-0 ${
      mobile ? "h-[60px] min-w-[142px]" : "h-[72px] flex-1"
    }`}
  >
    <span className="font-serif text-lg font-medium leading-none text-sage md:text-xl">{value}</span>
    <span className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-ink-muted md:text-[0.65rem]">{label}</span>
  </div>
);

export const TrustStrip = () => {
  const marqueeStats = [...trustStats, ...trustStats, ...trustStats];
  const marqueeLogos = [...trustLogos, ...trustLogos, ...trustLogos];

  return (
    <section id="trust" className="overflow-hidden border-y border-stone-200 bg-white">
      <div className="relative h-[60px] overflow-hidden border-b border-stone-100 md:h-[72px]">
        <div className="flex h-full w-max animate-marquee items-center whitespace-nowrap">
          {marqueeStats.map((item, index) => (
            <TrustItem key={`${item.label}-${index}`} value={item.value} label={item.label} mobile />
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden py-5">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent md:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent md:w-24" />
        <div className="flex w-max animate-marquee items-center gap-12 whitespace-nowrap px-6 [animation-duration:55s] hover:[animation-play-state:paused] md:gap-16">
          {marqueeLogos.map((item, index) => (
            <img
              key={`${item.label}-${index}`}
              src={item.src}
              alt={item.label}
              className="h-9 w-auto shrink-0 object-contain opacity-75 grayscale transition duration-300 hover:scale-105 hover:opacity-100 hover:grayscale-0 md:h-11"
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
