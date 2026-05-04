import { IMG } from "@/data/site";

const items = [
  { src: IMG.yogaAlliance, label: "Yoga Alliance RYS" },
  { src: IMG.rys200, label: "RYS 200" },
  { src: IMG.trustpilot, label: "Trustpilot" },
  { src: IMG.tripadvisor, label: "TripAdvisor" },
  { src: IMG.bookRetreat, label: "Book Yoga Retreats" },
];

export const TrustStrip = () => (
  <section className="border-y border-warm-dark/10 bg-cream py-8">
    <div className="container-wide flex flex-wrap items-center justify-around gap-x-10 gap-y-6">
      <p className="text-[10px] tracking-[0.28em] uppercase text-warm-light">Recognised by</p>
      {items.map((i) => (
        <img key={i.label} src={i.src} alt={i.label} className="h-9 md:h-11 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
      ))}
    </div>
  </section>
);
