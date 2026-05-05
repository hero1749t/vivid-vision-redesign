import { useEffect, useState } from "react";
import { FAQS as STATIC_FAQS, SITE as STATIC_SITE } from "@/data/site";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Mail, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { client } from "@/lib/sanity";

export const FAQ = () => {
  const [faqs, setFaqs] = useState(STATIC_FAQS);
  const [site, setSite] = useState(STATIC_SITE);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [faqData, settingsData] = await Promise.all([
          client.fetch(`*[_type == "faq"] | order(_createdAt asc)`),
          client.fetch(`*[_type == "settings"][0]`)
        ]);
        
        if (faqData?.length > 0) {
          setFaqs(faqData.map((f: any) => ({ q: f.question, a: f.answer })));
        }
        
        if (settingsData?.contactInfo) {
          setSite({
            ...STATIC_SITE,
            email: settingsData.contactInfo.email || STATIC_SITE.email,
            phone: settingsData.contactInfo.phone || STATIC_SITE.phone,
            whatsapp: settingsData.contactInfo.whatsapp || STATIC_SITE.whatsapp,
          });
        }
      } catch (err) {
        console.error("FAQ fetch error:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <section id="faq" className="bg-white py-20 md:py-32">
      <div className="container-edit grid gap-10 lg:grid-cols-12 lg:gap-20">
        {/* Left Column */}
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Frequently asked"
            title={
              <>
                Everything you need
                <br />
                to know
              </>
            }
            sub="Have questions before applying? Our team is ready to help you choose the right training and answer anything."
          />

          {/* Contact Cards */}
          <div className="mt-10 space-y-4">
            <motion.a
              href={`mailto:${site.email}`}
              whileHover={{ y: -3 }}
              className="flex items-center gap-4 rounded-xl border border-warm-dark/10 bg-cream p-4 transition-all duration-300 hover:border-amber-300 hover:shadow-elev-md group"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 text-white group-hover:shadow-md">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-warm-dark text-sm">Email us</p>
                <p className="text-xs text-warm-light mt-0.5">{site.email}</p>
              </div>
            </motion.a>

            <motion.a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              className="flex items-center gap-4 rounded-xl border border-warm-dark/10 bg-cream p-4 transition-all duration-300 hover:border-green-400 hover:shadow-elev-md group"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#25D366] text-white group-hover:shadow-md">
                <MessageCircle className="h-5 w-5 fill-white" />
              </div>
              <div>
                <p className="font-semibold text-warm-dark text-sm">WhatsApp us</p>
                <p className="text-xs text-warm-light mt-0.5">{site.phone}</p>
              </div>
            </motion.a>
          </div>

          {/* Decorative visual */}
          <div className="mt-10 hidden lg:block rounded-2xl overflow-hidden shadow-elev-md">
            <img
              src="https://ml4wp2nfx5ts.i.optimole.com/cb:JBht.f40/w:600/q:mauto/g:sm/f:best/https://baliyttc.com/wp-content/uploads/2025/08/Yoga-Teacher-Training-ceremony-bali-1.jpg"
              alt="Bali YTTC ceremony"
              className="w-full h-52 object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Right Column - Accordion */}
        <div className="lg:col-span-7">
          <Reveal>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.q}
                  value={`q${index}`}
                  className="overflow-hidden rounded-xl border border-warm-dark/10 bg-cream shadow-elev-sm transition-all duration-300 hover:border-amber-200 hover:shadow-elev-md"
                >
                  <AccordionTrigger className="px-5 py-5 text-left font-serif text-base text-warm-dark hover:text-terra hover:no-underline md:px-7 md:text-lg [&[data-state=open]]:text-terra">
                    <span className="flex w-full items-start gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-100 to-orange-100 text-sm font-bold text-amber-700">
                        {index + 1}
                      </span>
                      <span className="leading-relaxed">{faq.q}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-6 text-sm leading-7 text-ink-soft md:px-7 md:text-base pl-[4.5rem]">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>

          {/* Did not find answer */}
          <div className="mt-10 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <HelpCircle className="h-5 w-5 text-terra" />
              <p className="font-semibold text-warm-dark">Did not find your answer?</p>
            </div>
            <p className="mb-4 text-sm text-ink-soft">
              Contact our admissions team for personal guidance on choosing the right program.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-lg bg-warm-dark px-5 py-2.5 text-sm font-semibold text-cream transition-all duration-300 hover:bg-terra-deep hover:shadow-elev-md"
            >
              <Mail className="h-4 w-4" />
              Email admissions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
