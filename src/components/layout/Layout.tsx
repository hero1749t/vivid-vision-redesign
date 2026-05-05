import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { StickyBar } from "./StickyBar";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap } from "lucide-react";
import { ApplyModal } from "@/components/shared/ApplyModal";

// Fixed banner height — matches py + line-height in banner
const BANNER_H = 40; // px

export const Layout = () => {
  const { pathname, hash } = useLocation();
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      return;
    }
    window.setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }, [pathname, hash]);

  return (
    <div className="bg-cream min-h-screen flex flex-col">
      {/* ── Announcement banner — fixed at very top, z-[70] ── */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-0 z-[70] overflow-hidden bg-gradient-to-r from-[#D03D12] via-[#F04E23] to-[#D03D12]"
            style={{ height: `${BANNER_H}px` }}
          >
            <div className="container-wide h-full flex items-center justify-between gap-4">
              <div className="flex-1 flex items-center justify-center gap-2.5 text-xs font-medium">
                <Zap className="h-3.5 w-3.5 text-white/80 shrink-0" />
                <span className="text-white/90">
                  <span className="font-bold text-white">Only 4 seats left</span> for the March 2026 200-Hour YTT batch.
                </span>
                <ApplyModal
                  trigger={
                    <button className="hidden sm:inline-flex items-center gap-1 rounded-full bg-white/20 border border-white/40 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white hover:bg-white/30 transition-colors">
                      Reserve your spot
                    </button>
                  }
                />
              </div>
              <button
                onClick={() => setShowBanner(false)}
                className="flex-shrink-0 text-white/60 hover:text-white transition-colors p-0.5"
                aria-label="Close banner"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Nav — always below banner ── */}
      <Nav bannerHeight={showBanner ? BANNER_H : 0} />

      {/* ── Page content ── */}
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <Footer />
      <StickyBar />
    </div>
  );
};
