import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ApplyModal } from "@/components/shared/ApplyModal";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const TITLES: Record<string, string> = {
  "/": "Home",
  "/about": "About",
  "/instructors": "Instructors",
  "/gallery": "Gallery",
  "/contact": "Contact",
  "/courses/100hr": "100 Hour YTT",
  "/courses/200hr": "200 Hour YTT",
  "/courses/300hr": "300 Hour YTT",
};

export const TopBar = () => {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On home, top bar stays transparent over the hero video; on inner pages it's solid.
  const solid = scrolled || !onHome;

  return (
    <header
      className={`sticky top-0 z-40 h-14 flex items-center px-3 md:px-5 transition-all duration-300 ${
        solid
          ? "bg-cream/90 backdrop-blur-md border-b border-warm-dark/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <SidebarTrigger
        className={`shrink-0 ${solid ? "text-warm-dark hover:bg-sand" : "text-cream hover:bg-cream/10"}`}
      />

      <nav
        aria-label="Breadcrumb"
        className={`hidden sm:flex items-center gap-1.5 ml-3 text-[12px] tracking-tight ${
          solid ? "text-warm-mid" : "text-cream/85"
        }`}
      >
        <Link to="/" className={`font-serif font-semibold ${solid ? "text-warm-dark" : "text-cream"}`}>
          Bali YTTC
        </Link>
        {pathname !== "/" && (
          <>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            <span className="opacity-90">{TITLES[pathname] ?? "Page"}</span>
          </>
        )}
      </nav>

      <div className="ml-auto flex items-center gap-2">
        <ApplyModal trigger={
          <Button
            size="sm"
            className={`h-8 px-4 text-xs font-medium ${
              solid
                ? "bg-terra hover:bg-terra-deep text-cream"
                : "bg-cream/95 hover:bg-cream text-warm-dark"
            }`}
          >
            Apply Now
          </Button>
        } />
      </div>
    </header>
  );
};
