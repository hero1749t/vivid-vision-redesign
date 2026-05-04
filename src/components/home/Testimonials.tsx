import { TESTIMONIALS } from "@/data/site";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { Star, Quote } from "lucide-react";

export const Testimonials = () => (
  <section className="py-28 md:py-36 bg-cream">
    <div className="container-edit">
      <SectionHeading
        eyebrow="Student stories"
        title={<>Voices from our <em className="text-terra">graduates</em></>}
        sub="Read what our students say after completing their training in Ubud."
      />

      <div className="mt-16 grid lg:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.08}>
            <article className="bg-sand rounded-lg p-8 lg:p-10 h-full flex flex-col relative border border-warm-dark/5">
              <Quote className="w-8 h-8 text-terra/30 mb-4" />
              <div className="flex gap-0.5 mb-5">
                {[1,2,3,4,5].map(n => <Star key={n} className="w-4 h-4 fill-gold text-gold" />)}
              </div>
              <p className="font-serif italic text-lg text-warm-dark leading-relaxed flex-1">"{t.quote}"</p>
              <div className="mt-7 pt-5 border-t border-warm-dark/10">
                <p className="font-medium text-warm-dark">{t.name}</p>
                <p className="text-xs tracking-wider uppercase text-warm-light mt-1">{t.course}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
