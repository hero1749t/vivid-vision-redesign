import { PILLARS } from "@/data/site";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";

export const Pillars = () => (
  <section className="py-28 md:py-36 bg-warm-dark text-cream">
    <div className="container-edit">
      <SectionHeading
        light
        eyebrow="Curriculum pillars"
        title={<>Six foundations of an <em className="text-terra-light">authentic</em> teacher</>}
        sub="Each pillar is taught with depth, daily practice, and time to embody — not just memorise."
      />

      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-cream/10 border border-cream/10 rounded-md overflow-hidden">
        {PILLARS.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.05}>
            <div className="bg-warm-dark p-8 lg:p-10 h-full transition-colors hover:bg-warm-mid/40 group">
              <p className="font-serif text-xs text-terra-light tracking-[0.28em] uppercase">0{i + 1}</p>
              <h3 className="mt-4 font-serif text-2xl lg:text-3xl text-cream group-hover:text-terra-light transition-colors">{p.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-cream/65">{p.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
