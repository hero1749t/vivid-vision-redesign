import { TEACHERS } from "@/data/site";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { Link } from "react-router-dom";
import { ArrowUpRight, Star } from "lucide-react";
import { motion } from "framer-motion";

export const Teachers = () => (
  <section className="relative py-20 md:py-36 bg-gradient-to-b from-orange-50/30 via-white to-white overflow-hidden">
    {/* Decorative Background */}
    <div className="absolute -top-20 right-0 w-80 h-80 rounded-full bg-gradient-to-br from-amber-100/20 to-orange-100/10 blur-3xl" />
    <div className="absolute -bottom-20 left-0 w-96 h-96 rounded-full bg-gradient-to-tr from-amber-50/20 to-orange-50/10 blur-3xl" />

    <div className="container-edit relative z-10">
      {/* Section Header */}
      <div className="grid lg:grid-cols-12 gap-8 md:gap-14 lg:gap-20 items-end mb-14 md:mb-20 px-4 md:px-0">
        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow="👨‍🏫 Meet Your Guides"
            title={
              <>
                World-Class Teachers
                <br />
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Walking the Path
                </span>
              </>
            }
            sub="Our renowned instructors bring 15+ years of expertise, deep wisdom, and genuine care. They guide you with precision, compassion, and lived experience through every step of your yoga journey."
          />
        </div>
        <div className="lg:col-span-5">
          <Link to="/instructors" className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-100 to-orange-100 hover:from-amber-200 hover:to-orange-200 text-amber-900 font-semibold rounded-lg transition-all duration-300 hover:shadow-lg">
            View All Teachers <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Teachers Grid */}
      <div className="grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 px-4 md:px-0">
        {TEACHERS.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1}>
            <motion.article
              whileHover={{ y: -8 }}
              className="group overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 shadow-lg">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                {/* Image Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

                {/* Credential Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="absolute top-5 right-5 bg-white/95 backdrop-blur text-gray-900 text-[10px] uppercase tracking-widest font-bold px-4 py-2 rounded-full shadow-lg"
                >
                  {t.cred}
                </motion.div>

                {/* Name Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-white">
                  <p className="text-[10px] tracking-[0.25em] uppercase font-semibold text-amber-200 mb-2">{t.role}</p>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold leading-tight">{t.name}</h3>
                </div>
              </div>

              {/* Teacher Info */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="mt-6 md:mt-8"
              >
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">{t.bio}</p>

                {/* Specializations */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {t.style.map((s, idx) => (
                    <motion.span
                      key={s}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="text-[10px] md:text-xs uppercase tracking-wider font-semibold px-3 py-1.5 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 rounded-full border border-amber-200"
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>

                {/* Experience Badge */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="mt-5 pt-5 border-t border-gray-200 flex items-center gap-2"
                >
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-xs md:text-sm text-gray-700 font-medium">
                    15+ years of teaching experience
                  </span>
                </motion.div>
              </motion.div>
            </motion.article>
          </Reveal>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="mt-14 md:mt-20 text-center"
      >
        <p className="text-gray-700 mb-6 text-base md:text-lg">
          Learn directly from Yoga Alliance certified instructors with international experience
        </p>
      </motion.div>
    </div>
  </section>
);
