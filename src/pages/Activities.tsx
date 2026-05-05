import { EXPERIENCES } from "@/data/site";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Activities = () => {
  return (
    <div className="pt-32 pb-24 bg-[#FAFAFA] min-h-screen">
      <div className="container-wide">
        <Reveal>
          <Link to="/" className="text-gray-500 hover:text-[#F04E23] text-xs font-bold tracking-widest uppercase mb-8 inline-block transition-colors">
            ← Back to Home
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <SectionHeading
            eyebrow="Yoga Experiences"
            title={<>Beyond the <em className="text-[#F04E23]">Mat</em></>}
            sub="Immerse yourself in the spiritual culture of Bali. Our teacher training includes these transformative excursions and activities."
          />
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mt-16">
          {EXPERIENCES.map((exp, i) => (
            <Reveal key={exp.title} delay={0.1 * i}>
              <motion.div 
                whileHover={{ y: -8 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-500"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={exp.img} 
                    alt={exp.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                </div>
                <div className="p-8">
                  <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#F04E23] transition-colors">{exp.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{exp.desc}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activities;
