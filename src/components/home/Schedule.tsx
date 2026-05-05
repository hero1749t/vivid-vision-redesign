import { BATCHES as FALLBACK_BATCHES } from "@/data/site";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { ApplyModal } from "@/components/shared/ApplyModal";
import { motion } from "framer-motion";
import { CalendarDays, ShieldCheck, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { client } from "@/lib/sanity";

export const Schedule = () => {
  const [batches, setBatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const query = `*[_type == "schedule"] | order(startDate asc) {
          _id,
          startDate,
          endDate,
          status,
          price,
          discountPrice,
          "course": course->title
        }`;
        const sanityBatches = await client.fetch(query);
        
        if (sanityBatches && sanityBatches.length > 0) {
          // Format Sanity data to match UI needs
          const formatted = sanityBatches.map((b: any) => ({
            course: b.course,
            start: new Date(b.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            end: new Date(b.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            price: `$${b.discountPrice || b.price || "1,899"}`,
            status: b.status,
            urgent: b.status === "Few Seats Left" || b.status === "Waitlist"
          }));
          setBatches(formatted);
        } else {
          setBatches(FALLBACK_BATCHES);
        }
      } catch (error) {
        console.error("Sanity fetch error (schedule):", error);
        setBatches(FALLBACK_BATCHES);
      } finally {
        setLoading(false);
      }
    };

    fetchBatches();
  }, []);

  return (
    <section id="schedule" className="py-24 md:py-32 bg-[#FAFAFA] border-t border-gray-100">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Upcoming batches"
          title={<>Secure Your Place for <em className="text-[#F04E23]">2026</em></>}
          sub="Small cohorts for personalized attention. Early enrolment unlocks exclusive perks. Limited spots available per batch."
        />

        {/* Grid of Beautiful Course Cards */}
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="animate-spin text-[#F04E23]" size={40} />
          </div>
        ) : (
          <Reveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-14 md:mt-20">
              {batches.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex flex-col h-full bg-white rounded-3xl border transition-all duration-300 hover:-translate-y-1 ${
                    b.urgent
                      ? "border-[#F04E23]/30 shadow-[0_8px_30px_-4px_rgba(240,78,35,0.15)] ring-1 ring-[#F04E23]/10 relative overflow-hidden"
                      : "border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] hover:border-gray-200"
                  }`}
                >
                  {/* Top Accent Line for Urgent */}
                  {b.urgent && (
                    <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#F04E23] to-[#FF8A66]" />
                  )}

                  <div className="p-8 md:p-10 flex flex-col h-full">
                    {/* Status Badge */}
                    <div className="mb-6">
                      <span className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                        b.urgent 
                          ? "bg-red-50 text-red-600 ring-1 ring-red-100" 
                          : "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100"
                      }`}>
                        {b.urgent && <span className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse" />}
                        {b.status}
                      </span>
                    </div>

                    {/* Course Name & Dates */}
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                      {b.course}
                    </h3>
                    <div className="flex items-center gap-2.5 text-gray-600 font-medium mb-8">
                      <CalendarDays className="w-5 h-5 text-[#F04E23]" />
                      <span>{b.start} <span className="mx-1 text-gray-400">→</span> {b.end}</span>
                    </div>

                    {/* Price Section */}
                    <div className="mt-auto pt-6 border-t border-gray-100 mb-8">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Tuition Fee</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-extrabold text-gray-900">{b.price}</span>
                        <span className="text-gray-500 font-medium">/ person</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <ApplyModal
                      trigger={
                        <button className={`w-full py-4 rounded-xl font-bold text-[15px] transition-all duration-300 shadow-sm ${
                          b.urgent
                            ? "bg-[#F04E23] text-white hover:bg-[#D03D12] hover:shadow-md"
                            : "bg-white text-gray-900 border-2 border-gray-200 hover:border-gray-900 hover:bg-gray-50"
                        }`}>
                          Secure Your Spot
                        </button>
                      }
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        )}

        {/* Trust Message / Guarantees */}
        <Reveal delay={0.2}>
          <div className="mt-16 md:mt-24 max-w-4xl mx-auto grid sm:grid-cols-3 gap-6">
            {[
              { title: "Money-back Guarantee", desc: "If you're not satisfied" },
              { title: "Flexible Dates", desc: "Switch batches anytime" },
              { title: "Early Bird Perks", desc: "Discounts available" }
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <ShieldCheck className="w-8 h-8 text-[#F04E23] mb-3" strokeWidth={1.5} />
                <h4 className="font-bold text-gray-900 mb-1">{feature.title}</h4>
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
