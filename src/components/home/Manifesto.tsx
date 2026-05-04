import { Reveal } from "@/components/shared/Reveal";
import { IMG } from "@/data/site";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export const Manifesto = () => (
  <section className="py-28 md:py-36">
    <div className="container-edit grid lg:grid-cols-12 gap-14 lg:gap-20 items-center">
      <div className="lg:col-span-7">
        <Reveal><p className="eyebrow text-terra mb-6">Our Yoga School</p></Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-serif font-bold text-warm-dark leading-[1.05]" style={{ fontSize: "clamp(2rem, 4.4vw, 3.4rem)" }}>
            Authentic yoga,
            <br />
            <em className="text-terra">taught in lineage,</em>
            <br />
            lived in Ubud.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-8 space-y-5 text-ink-soft text-base leading-[1.8] max-w-xl">
            <p>
              Bali Yoga Teacher Training Center is the leading multi-style yoga school in Bali. Located in the peaceful surroundings of Ubud, we have been Yoga Alliance certified since 2018 — our certificates are accepted worldwide.
            </p>
            <p>
              Our 100-hour, 200-hour and 300-hour trainings are designed by experienced teachers to immerse you in the fundamentals of asana, pranayama, meditation, alignment and the art of hands-on adjustments.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <Link
            to="/about"
            className="mt-9 inline-flex items-center gap-2 text-terra-deep font-medium link-underline"
          >
            Read our story
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </Reveal>
      </div>

      <div className="lg:col-span-5 relative">
        <Reveal y={40}>
          <div className="relative aspect-[4/5] rounded-md overflow-hidden shadow-elev-lg">
            <img src={IMG.certified} alt="Certified yoga instructor in Bali" className="w-full h-full object-cover" />
          </div>
        </Reveal>
        <Reveal delay={0.2} y={20}>
          <div className="absolute -bottom-8 -left-8 hidden md:block bg-cream border border-warm-dark/10 rounded-md p-5 max-w-[230px] shadow-elev-md">
            <p className="font-serif text-3xl text-terra-deep font-bold leading-none">10+</p>
            <p className="mt-2 text-xs text-ink-soft leading-relaxed">years of teaching experience from our founders & senior teachers.</p>
          </div>
        </Reveal>
        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gold/30 blur-2xl -z-10" />
      </div>
    </div>
  </section>
);
