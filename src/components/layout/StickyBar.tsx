import { MessageCircle } from "lucide-react";
import { SITE } from "@/data/site";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export const StickyBar = () => {
  const [visible, setVisible] = useState(false);
  const [showLabel, setShowLabel] = useState(true);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hide label after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowLabel(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0, x: 20 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
        >
          {/* Label tooltip */}
          <AnimatePresence>
            {showLabel && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="hidden md:flex flex-col items-end"
              >
                <div className="rounded-xl bg-warm-dark px-4 py-2.5 shadow-elev-md">
                  <p className="text-xs font-semibold text-cream">Chat with us</p>
                  <p className="text-[10px] text-cream/60 mt-0.5">Reply in minutes</p>
                </div>
                <div className="mr-4 h-2 w-2 rotate-45 bg-warm-dark -mt-1" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* WhatsApp button */}
          <a
            href={`https://wa.me/${SITE.whatsapp}?text=Hi%20Bali%20YTTC!%20I'm%20interested%20in%20joining%20a%20Yoga%20Teacher%20Training.%20Please%20share%20more%20details.`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            onClick={() => setShowLabel(false)}
          >
            <motion.div
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.94 }}
              className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-2xl shadow-green-500/40"
            >
              {/* Pulse */}
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-25 animate-ping" />
              <MessageCircle className="h-7 w-7 fill-white text-white relative z-10" />
            </motion.div>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
