import { ApplyModal } from "@/components/shared/ApplyModal";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/Reveal";
import { IMG } from "@/data/site";

export const FinalCTA = () => (
  <section className="relative py-32 md:py-44 overflow-hidden bg-warm-dark">
    <div className="absolute inset-0">
      <img src={IMG.graduation} alt="" className="w-full h-full object-cover opacity-25" />
    </div>
    <div className="absolute inset-0 bg-gradient-to-r from-warm-dark via-warm-dark/85 to-warm-dark/40" />

    <div className="relative container-edit text-center">
      <Reveal>
        <p className="eyebrow text-gold-light mb-6 justify-center inline-flex">Your next chapter</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-serif text-cream font-bold leading-[1.04]" style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.4rem)" }}>
          Your seat in <em className="text-terra-light">Bali 2026</em>
          <br /> awaits.
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-6 max-w-xl mx-auto text-cream/70 leading-relaxed">
          Begin your application today. No payment required — we'll send a personal reply within 24 hours.
        </p>
      </Reveal>
      <Reveal delay={0.15}>
        <div className="mt-10">
          <ApplyModal trigger={
            <Button size="lg" className="bg-terra hover:bg-terra-deep text-cream h-14 px-10 text-base font-medium shadow-elev-lg">
              Begin your application
            </Button>
          } />
        </div>
      </Reveal>
    </div>
  </section>
);
