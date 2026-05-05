import { DAILY_LIFE } from "@/data/site";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { motion } from "framer-motion";

export const DailyLife = () => (
  <section id="daily-life" className="relative py-20 md:py-36 bg-gradient-to-b from-white via-orange-50/20 to-white overflow-hidden">
    {/* Decorative Background */}
    <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-amber-100/20 to-orange-100/10 rounded-full blur-3xl opacity-40" />
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-amber-50/20 to-orange-50/10 rounded-full blur-3xl opacity-30" />

    <div className="container-edit relative z-10 mb-12 md:mb-16 px-4 md:px-0">
      <SectionHeading
        eyebrow="A day in training"
        title={
          <>
            From Sunrise Meditation to
            <br />
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Evening Kirtan
            </span>
          </>
        }
        sub="Experience a holistic rhythm of practice, study, mindfulness, and ceremony. Each day is thoughtfully designed to deepen your yoga journey through balanced living."
      />
    </div>

    {/* Horizontal Scrollable Cards */}
    <div className="container-wide relative z-10">
      <div className="flex gap-4 md:gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:px-0 md:mx-0">
        {DAILY_LIFE.map((d, i) => (
          <Reveal key={d.title} delay={i * 0.05}>
            <motion.article
              whileHover={{ y: -8, scale: 1.02 }}
              className="snap-start shrink-0 w-[280px] md:w-[340px] lg:w-[380px] group cursor-pointer"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-gray-200 to-gray-300">
                <img
                  src={d.img}
                  alt={d.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />

                {/* Multiple Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Time Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="absolute top-4 left-4 bg-white/95 backdrop-blur text-gray-900 text-xs font-bold px-4 py-2 rounded-full shadow-lg font-mono tracking-wider"
                >
                  {d.time}
                </motion.div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-white">
                  <h3 className="font-serif text-2xl md:text-3xl leading-tight font-bold mb-2">{d.title}</h3>
                  <p className="text-sm md:text-base text-white/85 leading-relaxed font-light">{d.desc}</p>

                  {/* Decorative element */}
                  <motion.div
                    className="mt-4 flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <div className="w-1 h-1 rounded-full bg-amber-300" />
                    <span className="text-[10px] uppercase tracking-widest text-amber-300">Experience it</span>
                  </motion.div>
                </div>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="mt-6 md:mt-8 flex items-center justify-center gap-2 text-gray-500 text-xs">
        <span>Swipe to explore</span>
      </div>
    </div>
  </section>
);

