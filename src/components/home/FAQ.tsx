"use client";
import { FAQS as STATIC_FAQS, SITE as STATIC_SITE } from "@/data/site";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Mail, MessageCircle, Search, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";

export const FAQ = () => {
  const faqs = STATIC_FAQS;
  const site = STATIC_SITE;
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqs;
    const query = searchQuery.toLowerCase();
    return faqs.filter(
      (faq) =>
        faq.q.toLowerCase().includes(query) ||
        faq.a.toLowerCase().includes(query)
    );
  }, [searchQuery, faqs]);

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
  };

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

          {/* Search Bar */}
          <div className="mt-8 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearching(true);
              }}
              onFocus={() => setIsSearching(true)}
              placeholder="Search for answers..."
              className="w-full pl-12 pr-10 py-3.5 rounded-xl border-2 border-gray-200 bg-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Search Results Count */}
          {isSearching && searchQuery && (
            <p className="mt-3 text-sm text-gray-500">
              Found {filteredFaqs.length} result{filteredFaqs.length !== 1 ? "s" : ""} for "{searchQuery}"
            </p>
          )}

          {/* Contact Cards */}
          <div className="mt-8 space-y-4">
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
            {filteredFaqs.length > 0 ? (
              <Accordion type="single" collapsible className="space-y-3">
                {filteredFaqs.map((faq, index) => (
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
            ) : (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No results found for "{searchQuery}"</p>
                <p className="text-sm text-gray-400 mt-2">Try different keywords or contact us directly</p>
              </div>
            )}
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
