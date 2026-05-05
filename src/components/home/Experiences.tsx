import { EXPERIENCES } from "@/data/site";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { motion } from "framer-motion";
import { Sparkles, Eye } from "lucide-react";

const experienceIcons = {
  "Temple Purification": "🙏",
  "Arm Balancing Workshop": "💪",
  "Sound Healing": "🔔",
  "Acro Yoga": "🤸",
  "Beach Yoga": "🌅",
  "Mandala Painting": "🎨",
};

export const Experiences = () => (
  <section id="experiences" className="py-28 md:py-36 bg-gradient-to-b from-warm-dark/5 to-sand">
    <div className="container-edit">
      <SectionHeading
        eyebrow="✨ Beyond the Mat"
        title={<>Daily immersions, sacred ceremonies & <em className="text-amber-600">cultural integration</em></>}
        sub="Every training week features transformative experiences: temple rituals, advanced workshops, beach practices, and meditative arts that honor Balinese traditions."
      />
      
      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {EXPERIENCES.map((e, i) => (
          <Reveal key={e.title} delay={i * 0.05}>
            <motion.div
              whileHover={{ y: -8 }}
              className="h-full"
            >
              <article className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer h-full shadow-lg hover:shadow-2xl transition-shadow">
                {/* Background Image */}
                <img
                  src={e.img}
                  alt={e.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Multiple Gradient Overlays for Depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-warm-dark/95 via-warm-dark/40 to-warm-dark/0 group-hover:via-warm-dark/50 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-warm-dark/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-amber-600/0 group-hover:bg-amber-600/5 transition-colors duration-500" />

                {/* Content Overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="absolute inset-0 flex flex-col justify-between p-6 text-cream pointer-events-none group-hover:pointer-events-auto"
                >
                  {/* Top: Icon */}
                  <div className="flex items-start justify-between">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="text-4xl filter drop-shadow-lg"
                    >
                      {experienceIcons[e.title as keyof typeof experienceIcons] || "✨"}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-cream"
                    >
                      <Eye size={12} />
                      <span>View</span>
                    </motion.div>
                  </div>

                  {/* Bottom: Content */}
                  <div>
                    <motion.div
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 1 }}
                      className="space-y-2"
                    >
                      <h3 className="font-serif text-2xl font-semibold leading-tight drop-shadow-lg group-hover:text-amber-100 transition-colors">
                        {e.title}
                      </h3>
                      <motion.p
                        initial={{ opacity: 0.6, translateY: 10 }}
                        whileHover={{ opacity: 1, translateY: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-sm text-cream/90 leading-relaxed drop-shadow-md line-clamp-3"
                      >
                        {e.desc}
                      </motion.p>

                      {/* Action Hint */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="pt-3 text-xs flex items-center gap-2 text-amber-200"
                      >
                        <Sparkles size={14} className="animate-pulse" />
                        Learn more
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </article>
            </motion.div>
          </Reveal>
        ))}
      </div>

      {/* Mobile CTA */}
      <Reveal>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 md:hidden text-center"
        >
          <p className="text-sm text-warm-dark mb-4">
            Tap on any experience to learn more about what awaits you.
          </p>
        </motion.div>
      </Reveal>
    </div>
  </section>
);
