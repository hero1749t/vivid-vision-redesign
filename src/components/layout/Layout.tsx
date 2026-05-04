import { Outlet, useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Footer } from "./Footer";
import { StickyBar } from "./StickyBar";
import { AppSidebar } from "./AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ApplyModal } from "@/components/shared/ApplyModal";
import { Button } from "@/components/ui/button";
import { SeoHead } from "@/components/shared/SeoHead";
import { motion, AnimatePresence } from "framer-motion";

export const Layout = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return (
    <SidebarProvider defaultOpen={false}>
      <SeoHead />
      <div className="min-h-screen flex w-full bg-cream">
        <AppSidebar />

        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-40 h-14 flex items-center justify-between px-4 md:px-6 bg-cream/85 backdrop-blur-md border-b border-warm-dark/10">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-warm-dark hover:bg-sand" />
              <Link to="/" className="lg:hidden flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-terra grid place-items-center font-serif text-cream text-sm">
                  B
                </div>
                <span className="font-serif text-warm-dark">Bali YTTC</span>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <ApplyModal
                trigger={
                  <Button
                    size="sm"
                    className="bg-terra hover:bg-terra-deep text-cream h-9 px-5"
                  >
                    Apply Now
                  </Button>
                }
              />
            </div>
          </header>

          <AnimatePresence mode="wait">
            <motion.main
              key={pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1"
            >
              <Outlet />
            </motion.main>
          </AnimatePresence>

          <Footer />
        </div>

        <StickyBar />
      </div>
    </SidebarProvider>
  );
};
