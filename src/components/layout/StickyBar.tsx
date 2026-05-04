import { useEffect, useState } from "react";
import { ApplyModal } from "@/components/shared/ApplyModal";
import { Button } from "@/components/ui/button";
import { SITE } from "@/data/site";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

export const StickyBar = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 inset-x-0 z-40 bg-warm-dark/95 backdrop-blur-md border-t border-cream/10"
          >
            <div className="container-wide py-3 flex items-center justify-between gap-4">
              <div className="hidden sm:block">
                <p className="text-cream font-medium text-sm">Next 200-Hour batch · March 2026</p>
                <p className="text-cream/60 text-xs mt-0.5">Only 4 seats remaining</p>
              </div>
              <div className="flex gap-2 ml-auto">
                <a
                  href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener"
                  className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm text-cream border border-cream/25 rounded-md hover:bg-cream/10"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
                <ApplyModal trigger={<Button className="bg-gold hover:bg-gold-light text-warm-dark font-semibold">Apply Now</Button>} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp */}
      <a
        href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-24 right-5 z-30 w-14 h-14 rounded-full bg-sage hover:bg-sage-light text-cream grid place-items-center shadow-elev-lg animate-soft-pulse"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </>
  );
};
