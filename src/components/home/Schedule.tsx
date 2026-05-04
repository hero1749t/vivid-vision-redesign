import { BATCHES } from "@/data/site";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { ApplyModal } from "@/components/shared/ApplyModal";

export const Schedule = () => (
  <section className="py-28 md:py-36 bg-sand">
    <div className="container-edit">
      <SectionHeading
        eyebrow="Upcoming Batches"
        title={<>Reserve your seat for <em className="text-terra">2026</em></>}
        sub="Limited cohort sizes ensure personal attention from our senior teachers. Early enrolment is recommended."
      />

      <Reveal>
        <div className="mt-14 bg-cream rounded-lg overflow-hidden border border-warm-dark/8 shadow-elev-sm">
          <div className="hidden md:grid grid-cols-12 px-6 py-4 bg-warm-dark text-cream text-[10px] uppercase tracking-[0.2em] font-semibold">
            <div className="col-span-3">Course</div>
            <div className="col-span-3">Start</div>
            <div className="col-span-2">End</div>
            <div className="col-span-2">From</div>
            <div className="col-span-2 text-right">Seats</div>
          </div>
          {BATCHES.map((b, i) => (
            <div key={i} className={`grid grid-cols-2 md:grid-cols-12 gap-y-2 px-6 py-5 items-center border-b border-warm-dark/5 last:border-0 hover:bg-sand/50 transition-colors`}>
              <div className="md:col-span-3">
                <p className="font-serif text-warm-dark font-semibold">{b.course}</p>
              </div>
              <div className="md:col-span-3 text-sm text-warm-mid">{b.start}</div>
              <div className="md:col-span-2 text-sm text-warm-mid">{b.end}</div>
              <div className="md:col-span-2 text-terra-deep font-semibold">{b.price}</div>
              <div className="md:col-span-2 flex md:justify-end items-center gap-3">
                <span className={`text-xs px-3 py-1 rounded-full ${b.urgent ? "bg-terra/15 text-terra-deep font-semibold" : "bg-sand-deep text-warm-mid"}`}>
                  {b.status}
                </span>
                <ApplyModal trigger={
                  <button className="text-xs text-terra hover:text-terra-deep font-medium link-underline">Apply</button>
                } />
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);
