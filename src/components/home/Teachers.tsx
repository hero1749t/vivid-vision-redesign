import { TEACHERS } from "@/data/site";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export const Teachers = () => (
  <section className="py-28 md:py-36 bg-cream">
    <div className="container-edit">
      <div className="grid lg:grid-cols-12 gap-14 lg:gap-20 items-end mb-14">
        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow="Meet your teachers"
            title={<>Guides who have <em className="text-terra">walked the path</em></>}
            sub="Our experienced teachers guide you step by step, helping you become confident and skilled in your own yoga practice and teaching."
          />
        </div>
        <div className="lg:col-span-5">
          <Link to="/instructors" className="inline-flex items-center gap-2 text-warm-mid hover:text-terra link-underline text-sm">
            All teachers <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        {TEACHERS.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1}>
            <article className="group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-sand-deep">
                <img src={t.img} alt={t.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                <div className="absolute top-5 right-5 bg-cream/95 backdrop-blur text-warm-dark text-[10px] uppercase tracking-widest font-semibold px-3 py-1 rounded-full">
                  {t.cred}
                </div>
              </div>
              <div className="mt-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] tracking-[0.28em] uppercase text-terra mb-1">{t.role}</p>
                  <h3 className="font-serif text-3xl text-warm-dark">{t.name}</h3>
                  <p className="mt-3 text-sm text-ink-soft leading-relaxed max-w-md">{t.bio}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {t.style.map((s) => (
                      <span key={s} className="text-[10px] uppercase tracking-wider px-2.5 py-1 bg-sand text-warm-mid rounded-full">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
