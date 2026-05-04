import { EXPERIENCES } from "@/data/site";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";

export const Experiences = () => (
  <section className="py-28 md:py-36 bg-sand">
    <div className="container-edit">
      <SectionHeading
        eyebrow="Beyond the mat"
        title={<>Workshops, ceremonies, & <em className="text-terra">Bali immersion</em></>}
        sub="Every training week includes excursions, sacred ceremonies and skill workshops that go far beyond the studio."
      />
      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {EXPERIENCES.map((e, i) => (
          <Reveal key={e.title} delay={i * 0.05}>
            <article className="group relative aspect-square rounded-md overflow-hidden cursor-pointer">
              <img src={e.img} alt={e.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-warm-dark/90 via-warm-dark/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-7 text-cream">
                <h3 className="font-serif text-2xl">{e.title}</h3>
                <p className="mt-2 text-sm text-cream/80 leading-relaxed translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all">{e.desc}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
