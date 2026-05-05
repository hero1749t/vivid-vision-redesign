import { PILLARS } from "@/data/site";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { motion } from "framer-motion";

export const Pillars = () => (
  <section id="pillars" className="relative py-20 md:py-36 bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white overflow-hidden">
    {/* Background Decorative Elements */}
    <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-amber-600/20 to-orange-600/10 rounded-full blur-3xl opacity-20" />
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-amber-500/15 to-orange-500/5 rounded-full blur-3xl opacity-20" />

    <div className="container-edit relative z-10">
      <SectionHeading
        light
        eyebrow="🏛️ Core Curriculum Pillars"
        title={
          <>
            Six Foundations of
            <br />
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Authentic Yoga Teaching
            </span>
          </>
        }
        sub="Each pillar is taught with depth, daily embodied practice, and integration — creating transformational mastery, not just knowledge."
      />

      {/* Pillars Grid */}
      <div className="mt-16 md:mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-1 bg-gradient-to-br from-amber-500/20 to-orange-500/10 p-px rounded-2xl overflow-hidden shadow-2xl">
        {PILLARS.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06}>
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              className="relative bg-gradient-to-br from-gray-800/80 to-black/80 backdrop-blur-sm p-6 md:p-8 h-full transition-all duration-500 hover:from-gray-700/80 hover:to-gray-900/80 group border border-amber-500/10 hover:border-amber-500/30"
            >
              {/* Number Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-white font-bold font-serif text-lg"
              >
                {i + 1}
              </motion.div>

              {/* Title */}
              <h3 className="mt-5 font-serif text-2xl md:text-3xl text-white group-hover:text-amber-300 transition-colors duration-300 leading-tight">
                {p.title}
              </h3>

              {/* Description */}
              <p className="mt-4 text-sm md:text-base leading-relaxed text-gray-300 group-hover:text-gray-100 transition-colors">{p.desc}</p>

              {/* Decorative corner accent */}
              <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl" />

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-amber-500 to-orange-500 group-hover:w-full transition-all duration-500" />
            </motion.div>
          </Reveal>
        ))}
      </div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="mt-14 md:mt-20 p-8 md:p-10 rounded-2xl bg-gradient-to-r from-amber-500/15 to-orange-500/10 border border-amber-500/30 backdrop-blur-sm"
      >
        <p className="text-base md:text-lg text-gray-200 leading-relaxed text-center">
          <span className="text-amber-300 font-semibold">✨ Daily Integration:</span> Each pillar is woven throughout your training with consistent practice, study, and real-world application — ensuring deep embodiment and readiness to teach.
        </p>
      </motion.div>
    </div>
  </section>
);
