"use client";

import { BATCHES as FALLBACK_BATCHES } from "@/data/site";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { ApplyModal } from "@/components/shared/ApplyModal";
import { motion } from "framer-motion";
import { CalendarDays, Loader2, ShieldCheck } from "lucide-react";
import { useLocale } from "next-intl";
import { getHomeCopy } from "@/lib/home-localized";

export const Schedule = () => {
  const copy = getHomeCopy(useLocale());
  const batches = FALLBACK_BATCHES.map((batch, index) => ({
    ...batch,
    course: copy.schedule.batchCourses[index] || batch.course,
    status: copy.schedule.batchStatuses[index] || batch.status,
  }));
  const loading = false;

  return (
    <section id="schedule" className="border-t border-gray-100 bg-[#FAFAFA] py-24 md:py-32">
      <div className="container-wide">
        <SectionHeading
          eyebrow={copy.schedule.eyebrow}
          title={
            <>
              {copy.schedule.title} <em className="text-[#F04E23]">2026</em>
            </>
          }
          sub={copy.schedule.subtitle}
        />

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="animate-spin text-[#F04E23]" size={40} />
          </div>
        ) : (
          <Reveal>
            <div className="mt-14 grid gap-6 md:mt-20 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {batches.map((batch, index) => (
                <motion.div
                  key={`${batch.course}-${batch.start}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex h-full flex-col rounded-3xl border bg-white transition-all duration-300 hover:-translate-y-1 ${
                    batch.urgent
                      ? "relative overflow-hidden border-[#F04E23]/30 shadow-[0_8px_30px_-4px_rgba(240,78,35,0.15)] ring-1 ring-[#F04E23]/10"
                      : "border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:border-gray-200 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)]"
                  }`}
                >
                  {batch.urgent && <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#F04E23] to-[#FF8A66]" />}
                  <div className="flex h-full flex-col p-8 md:p-10">
                    <div className="mb-6">
                      <span className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider ${batch.urgent ? "bg-red-50 text-red-600 ring-1 ring-red-100" : "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100"}`}>
                        {batch.urgent && <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-red-500" />}
                        {batch.status}
                      </span>
                    </div>
                    <h3 className="mb-3 font-serif text-2xl font-bold text-gray-900 md:text-3xl">{batch.course}</h3>
                    <div className="mb-8 flex items-center gap-2.5 font-medium text-gray-600">
                      <CalendarDays className="h-5 w-5 text-[#F04E23]" />
                      <span>{batch.start} <span className="mx-1 text-gray-400">→</span> {batch.end}</span>
                    </div>
                    <div className="mb-8 mt-auto border-t border-gray-100 pt-6">
                      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gray-400">{copy.schedule.batch.tuition}</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-extrabold text-gray-900">{batch.price}</span>
                        <span className="font-medium text-gray-500">{copy.schedule.batch.person}</span>
                      </div>
                    </div>
                    <ApplyModal
                      trigger={
                        <button className={`w-full rounded-xl py-4 text-[15px] font-bold shadow-sm transition-all duration-300 ${batch.urgent ? "bg-[#F04E23] text-white hover:bg-[#D03D12] hover:shadow-md" : "border-2 border-gray-200 bg-white text-gray-900 hover:border-gray-900 hover:bg-gray-50"}`}>
                          {copy.schedule.batch.cta}
                        </button>
                      }
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        )}

        <Reveal delay={0.2}>
          <div className="mx-auto mt-16 grid max-w-4xl gap-6 sm:grid-cols-3 md:mt-24">
            {copy.schedule.batch.guarantees.map((feature) => (
              <div key={feature.title} className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm">
                <ShieldCheck className="mb-3 h-8 w-8 text-[#F04E23]" strokeWidth={1.5} />
                <h4 className="mb-1 font-bold text-gray-900">{feature.title}</h4>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Schedule;
