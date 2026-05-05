import { GALLERY } from "@/data/site";
import { Reveal } from "@/components/shared/Reveal";
import { Link } from "react-router-dom";
import { ArrowUpRight, Eye } from "lucide-react";
import { motion } from "framer-motion";

export const GalleryTeaser = () => (
  <section className="relative py-20 md:py-36 bg-gradient-to-b from-white via-white to-orange-50/30 overflow-hidden">
    {/* Decorative Background */}
    <div className="absolute -top-20 right-0 w-80 h-80 bg-gradient-to-br from-amber-100/20 to-orange-100/10 rounded-full blur-3xl opacity-40" />

    <div className="container-wide relative z-10">
      {/* Header */}
      <div className="container-edit flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8 mb-12 md:mb-16 px-4 md:px-0">
        <div className="max-w-xl">
          <Reveal>
            <div className="inline-flex items-center gap-2 mb-5">
              <div className="w-2 h-2 rounded-full bg-amber-500"></div>
              <p className="eyebrow text-amber-700 font-semibold">Inside Bali YTTC</p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 
              className="font-serif font-bold text-gray-900 leading-[1.1]"
              style={{ fontSize: "clamp(1.8rem, 5vw, 3.4rem)" }}
            >
              Authentic Moments from
              <br />
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Ubud
              </span>
            </h2>
          </Reveal>
        </div>
        <Link 
          to="/gallery" 
          className="hidden md:inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-100 to-orange-100 hover:from-amber-200 hover:to-orange-200 text-amber-900 font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
        >
          View Full Gallery <ArrowUpRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Gallery Grid */}
      <div className="px-4 md:px-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
          {GALLERY.slice(0, 8).map((src, i) => (
            <Reveal key={src} delay={i * 0.05}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`relative rounded-xl md:rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 ${
                  i === 0 || i === 5 ? "md:col-span-1 md:row-span-2 aspect-[3/4]" : "aspect-square"
                }`}
              >
                <Link to="/gallery" className="block w-full h-full">
                  <img
                    src={src}
                    alt={`Gallery ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                  
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/60 group-hover:from-black/40 group-hover:to-black/80 transition-all duration-300" />

                  {/* Eye Icon - Shows on Hover */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full">
                      <Eye className="w-6 h-6 text-gray-900" />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Mobile CTA */}
      <div className="mt-10 md:hidden px-4 text-center">
        <Link 
          to="/gallery"
          className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg"
        >
          View Full Gallery <ArrowUpRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  </section>
);

