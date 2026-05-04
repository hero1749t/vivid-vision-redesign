import { TEACHERS } from "@/data/site";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Seo } from "@/components/Seo";
import { SEO } from "@/data/seo";

const Instructors = () => (
  <>
    <Seo data={SEO.instructors} />
    <section className="pt-40 pb-16 bg-cream">
      <div className="container-edit">
        <SectionHeading
          eyebrow="Meet your teachers"
          title={<>Guides who have <em className="text-terra">walked the path</em></>}
          sub="A circle of senior teachers, each bringing decades of practice and a unique lineage to your training."
        />
      </div>
    </section>

    <section className="pb-28 bg-cream">
      <div className="container-edit grid md:grid-cols-2 gap-14 lg:gap-20">
        {TEACHERS.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.08}>
            <article>
              <div className="aspect-[4/5] rounded-md overflow-hidden">
                <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
              </div>
              <p className="mt-6 text-[10px] tracking-[0.28em] uppercase text-terra">{t.role} · {t.cred}</p>
              <h2 className="font-serif text-3xl text-warm-dark mt-2">{t.name}</h2>
              <p className="mt-4 text-ink-soft leading-relaxed">{t.bio}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {t.style.map((s) => (
                  <span key={s} className="text-[10px] uppercase tracking-wider px-3 py-1 bg-sand text-warm-mid rounded-full">{s}</span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  </>
);

export default Instructors;
