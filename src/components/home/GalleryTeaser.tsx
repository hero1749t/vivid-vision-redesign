import { GALLERY } from "@/data/site";
import { Reveal } from "@/components/shared/Reveal";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export const GalleryTeaser = () => (
  <section className="py-28 md:py-36 bg-cream">
    <div className="container-wide">
      <div className="container-edit flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div className="max-w-xl">
          <Reveal><p className="eyebrow text-terra mb-5">Inside the ashram</p></Reveal>
          <Reveal delay={0.05}>
            <h2 className="heading-xl text-warm-dark">
              Moments from <em className="text-terra">Ubud</em>
            </h2>
          </Reveal>
        </div>
        <Link to="/gallery" className="inline-flex items-center gap-2 text-warm-mid hover:text-terra link-underline text-sm">
          Full gallery <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {GALLERY.slice(0, 8).map((src, i) => (
          <Reveal key={src} delay={i * 0.04}>
            <Link to="/gallery" className={`block relative rounded-md overflow-hidden group ${i === 0 || i === 5 ? "row-span-2 aspect-[3/4]" : "aspect-square"}`}>
              <img src={src} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-warm-dark/0 group-hover:bg-warm-dark/30 transition-colors" />
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
