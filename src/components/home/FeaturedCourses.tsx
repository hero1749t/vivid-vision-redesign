import { COURSES } from "@/data/site";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Link } from "react-router-dom";
import { ArrowUpRight, Clock, CalendarDays } from "lucide-react";

export const FeaturedCourses = () => (
  <section className="py-28 md:py-36 bg-sand">
    <div className="container-edit">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
        <SectionHeading
          eyebrow="Yoga Teacher Training"
          title={<>Choose your <em className="text-terra">path</em></>}
          sub="Three immersions, one lineage. Each course is Yoga Alliance certified and includes accommodation, sattvic meals, ceremonies and lifelong community."
        />
        <Link to="/courses/200hr" className="hidden md:inline-flex items-center gap-2 text-warm-mid hover:text-terra link-underline text-sm">
          View all courses <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {COURSES.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.08}>
            <Link
              to={c.href}
              className={`group block rounded-lg overflow-hidden bg-cream border transition-all duration-500 hover:-translate-y-1 hover:shadow-elev-lg ${
                c.featured ? "border-terra ring-1 ring-terra/30 lg:scale-[1.02]" : "border-warm-dark/8"
              }`}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={c.image} alt={c.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-warm-dark/80 via-transparent to-transparent" />
                {c.featured && (
                  <span className="absolute top-4 left-4 bg-terra text-cream text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
                    Flagship
                  </span>
                )}
                <div className="absolute top-4 right-4 bg-cream/95 backdrop-blur text-warm-dark text-[10px] tracking-wider uppercase font-semibold px-3 py-1 rounded-full">
                  {c.days}
                </div>
                <div className="absolute bottom-5 left-5 right-5 text-cream">
                  <p className="text-[10px] tracking-[0.28em] uppercase opacity-80">{c.style}</p>
                  <p className="mt-2 font-serif text-2xl leading-tight">{c.title}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-ink-soft leading-relaxed">{c.summary}</p>
                <div className="mt-5 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-warm-mid"><CalendarDays className="w-3.5 h-3.5" /> {c.next}</span>
                  <span className={`px-2 py-1 rounded-full ${c.featured ? "bg-terra/10 text-terra-deep font-semibold" : "bg-sand-deep text-warm-mid"}`}>{c.seats}</span>
                </div>
                <div className="mt-5 pt-5 border-t border-warm-dark/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] tracking-widest uppercase text-warm-light">From</span>
                    <p className="font-serif text-2xl text-terra-deep font-bold leading-none">${c.priceFrom}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-warm-dark font-medium text-sm group-hover:text-terra transition-colors">
                    Explore <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
