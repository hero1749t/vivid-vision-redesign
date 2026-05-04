import { DAILY_LIFE } from "@/data/site";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";

export const DailyLife = () => (
  <section className="py-28 md:py-36 bg-cream overflow-hidden">
    <div className="container-edit mb-12">
      <SectionHeading
        eyebrow="A day in your training"
        title={<>From sunrise meditation to <em className="text-terra">evening kirtan</em></>}
        sub="Every day in Ubud follows a gentle rhythm — practice, study, nourishment, ceremony. Here's what unfolds from morning to night."
      />
    </div>

    <div className="container-wide">
      <div className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
        {DAILY_LIFE.map((d, i) => (
          <Reveal key={d.title} delay={i * 0.05}>
            <article className="snap-start shrink-0 w-[280px] md:w-[320px] group">
              <div className="relative aspect-[3/4] rounded-md overflow-hidden">
                <img src={d.img} alt={d.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-warm-dark/85 via-warm-dark/20 to-transparent" />
                <div className="absolute top-4 left-4 bg-cream/95 backdrop-blur text-warm-dark text-xs font-mono px-3 py-1 rounded-full font-semibold">
                  {d.time}
                </div>
                <div className="absolute bottom-5 left-5 right-5 text-cream">
                  <h3 className="font-serif text-2xl leading-tight">{d.title}</h3>
                  <p className="mt-2 text-sm text-cream/75 leading-relaxed">{d.desc}</p>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
