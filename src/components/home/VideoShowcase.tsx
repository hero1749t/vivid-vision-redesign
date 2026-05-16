"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/shared/Reveal";
import { VideoPlayer } from "@/components/shared/VideoPlayer";
import { IMG } from "@/data/site";
import { CheckCircle, Flower2, Home, MapPin, Sunrise, Users, Utensils } from "lucide-react";
import { useLocale } from "next-intl";
import { getHomeCopy } from "@/lib/home-localized";

const facilityStyles = [
  { icon: MapPin, color: "bg-orange-50 text-[#F04E23]" },
  { icon: Flower2, color: "bg-emerald-50 text-emerald-600" },
  { icon: Home, color: "bg-blue-50 text-blue-600" },
  { icon: Utensils, color: "bg-amber-50 text-amber-600" },
  { icon: Users, color: "bg-purple-50 text-purple-600" },
  { icon: Sunrise, color: "bg-rose-50 text-rose-600" },
];

export const VideoShowcase = () => {
  const copy = getHomeCopy(useLocale());

  return (
    <section id="campus-video" className="relative overflow-hidden border-b border-gray-100 bg-[#FAFAFA] py-20 md:py-32">
      <div className="pointer-events-none absolute right-0 top-0 h-[800px] w-[800px] rounded-full bg-gradient-to-bl from-orange-100/40 to-transparent opacity-60 blur-[100px]" />

      <div className="container-wide relative z-10">
        <Reveal>
          <div className="mx-auto mb-12 max-w-3xl text-center md:mb-20">
            <div className="mb-6 inline-flex items-center justify-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#F04E23]" />
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#F04E23]">{copy.video.eyebrow}</p>
              <div className="h-2 w-2 rounded-full bg-[#F04E23]" />
            </div>
            <h2 className="mb-6 font-serif text-4xl font-bold leading-[1.1] tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
              {copy.video.title}
            </h2>
            <p className="text-lg leading-relaxed text-gray-600 md:text-xl">{copy.video.subtitle}</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} className="mb-20 overflow-hidden rounded-3xl bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] ring-1 ring-gray-900/5 md:mb-32">
            <VideoPlayer youtubeId="TNzFh1N3GI0" poster={IMG.heroCeremony} title="Bali YTTC Campus Tour" autoPlay={false} muted={true} />
          </motion.div>
        </Reveal>

        <div className="mb-24">
          <Reveal>
            <div className="mb-12 text-center">
              <h3 className="font-serif text-3xl font-bold text-gray-900 md:text-4xl">{copy.video.facilitiesTitle}</h3>
              <p className="mt-3 text-gray-600">{copy.video.facilitiesSubtitle}</p>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {copy.video.facilities.map((item, index) => {
              const style = facilityStyles[index];
              const Icon = style.icon;
              return (
                <Reveal key={item.title} delay={index * 0.1}>
                  <motion.div whileHover={{ y: -6, scale: 1.01 }} className="group flex h-full flex-col rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:border-gray-200 hover:shadow-xl">
                    <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${style.color}`}>
                      <Icon className="h-6 w-6" strokeWidth={2} />
                    </div>
                    <h4 className="mb-3 text-xl font-bold text-gray-900 transition-colors group-hover:text-[#F04E23]">{item.title}</h4>
                    <p className="leading-relaxed text-gray-600">{item.desc}</p>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal delay={0.2}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white p-10 shadow-xl md:p-16">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-orange-50 opacity-60 blur-3xl" />
            <div className="relative z-10 mb-12 text-center">
              <h3 className="font-serif text-3xl font-bold text-gray-900 md:text-4xl">{copy.video.whyTitle}</h3>
            </div>
            <div className="grid gap-x-12 gap-y-6 md:grid-cols-2 lg:gap-y-8">
              {copy.video.points.map((point, index) => (
                <motion.div key={point} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="flex items-start gap-4 rounded-2xl p-4 transition-colors hover:bg-gray-50">
                  <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-[#F04E23]" strokeWidth={2.5} />
                  <p className="font-semibold leading-relaxed text-gray-800">{point}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
};

export default VideoShowcase;
