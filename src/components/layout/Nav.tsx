"use client";
import { useEffect, useState } from "react";
import { Link, usePathname as useLocation } from "@/i18n/routing";
import { AnimatePresence, motion } from "framer-motion";
import { X, Menu } from "lucide-react";
import { ApplyModal } from "@/components/shared/ApplyModal";
import { BalieytcLogo } from "@/components/shared/BalieytcLogo";
import { Button } from "@/components/ui/button";
import { SITE } from "@/data/site";
import { LanguageSwitcher } from "./LanguageSwitcher";

const menuColumns = [
  {
    title: "Trainings",
    links: [
      { label: "All Trainings", to: "/#courses", strong: true },
      { label: "100hr Foundation", to: "/courses/100hr" },
      { label: "200hr Yoga Teacher Training", to: "/courses/200hr" },
      { label: "300hr Advanced", to: "/courses/300hr" },
      { label: "Retreats", to: "/retreats", strong: true },
      { label: "Workshops", to: "/workshops" },
    ],
  },
  {
    title: "Experience",
    links: [
      { label: "Gallery", to: "/gallery", strong: true },
      { label: "Activities", to: "/activities" },
      { label: "Student Stories", to: "/#testimonials" },
      { label: "Youtube Videos", to: "/#campus-video" },
      { label: "Blog", to: "/blog" },
      { label: "Why Ubud", to: "/about" },
    ],
  },
  {
    title: "Plan Your Trip",
    links: [
      { label: "Pricing & Fees", to: "/pricing", strong: true },
      { label: "Visa Information", to: "/visa" },
      { label: "FAQ", to: "/#faq" },
      { label: "Contact Us", to: "/contact" },
      { label: SITE.email, href: `mailto:${SITE.email}` },
    ],
  },
  {
    title: "School",
    links: [
      { label: "About Bali YTTC", to: "/about", strong: true },
      { label: "Teachers", to: "/instructors" },
      { label: "Yoga Alliance", to: "/#trust" },
      { label: "Student Reviews", to: "/#testimonials" },
      { label: "Terms & Policy", to: "/terms" },
    ],
  },
];

const MenuLink = ({
  label, to, href, strong, onClick,
}: {
  label: string; to?: string; href?: string; strong?: boolean; onClick: () => void;
}) => {
  const cls = strong
    ? "block text-sm font-bold text-white hover:text-[#F47348] transition-colors"
    : "block text-sm text-white/65 hover:text-white transition-colors leading-6";
  if (href)
    return <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener" onClick={onClick} className={cls}>{label}</a>;
  return <Link href={to ?? "/"} onClick={onClick} className={cls}>{label}</Link>;
};

export const Nav = ({ bannerHeight = 0 }: { bannerHeight?: number }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useLocation();
  const onHome = pathname === "/";
  const NAV_H = 64;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isLightMode = scrolled || !onHome || menuOpen;

  const textClass = isLightMode ? "text-gray-900" : "text-white";
  const subTextClass = isLightMode ? "text-gray-500" : "text-white/60";
  const iconClass = isLightMode ? "text-gray-900 hover:bg-gray-100" : "text-white hover:bg-white/10";

  return (
    <>
      <header
        style={{ top: `${bannerHeight}px` }}
        className={`fixed inset-x-0 z-50 transition-all duration-300 ${
          isLightMode ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm" : "bg-transparent"
        }`}
      >
        {/* Sticky Urgency Banner - shows when scrolled */}
        {scrolled && (
          <div className="bg-gradient-to-r from-[#D03D12] to-[#F04E23] text-white text-center py-1.5 text-xs font-medium">
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              Only 4 seats left for March 2026 batch!
              <a href="/courses/200hr" className="underline font-bold hover:text-amber-200 ml-1">
                Apply Now
              </a>
            </span>
          </div>
        )}
        <div className="container-wide" style={{ height: `${NAV_H}px` }}>
          <div className="flex h-full items-center justify-between">

            {/* ── Logo ────────────────────────── */}
            <Link href="/" className="group flex items-center gap-2.5 hover:opacity-90 transition-opacity">
              <BalieytcLogo className="h-8 w-8 flex-shrink-0" showText={false} />
              <div className="flex flex-col leading-none">
                <span className={`font-bold text-sm tracking-[0.04em] transition-colors ${textClass}`}>Bali YTTC</span>
                <span className={`text-[9px] uppercase tracking-[0.16em] mt-[3px] font-semibold transition-colors ${subTextClass}`}>Yoga Teacher Training</span>
              </div>
            </Link>

            {/* ── Actions ─────────────────────── */}
            <div className="flex items-center gap-2">
              <LanguageSwitcher isLightMode={isLightMode} />
              <Link
                href="/login"
                className={`hidden sm:inline-flex h-9 items-center gap-1.5 rounded-lg border-2 px-4 text-sm font-semibold transition-colors ${
                  isLightMode
                    ? "border-[#F04E23] text-[#F04E23] hover:bg-[#F04E23] hover:text-white"
                    : "border-white text-white hover:bg-white hover:text-[#F04E23]"
                }`}
              >
                Login
              </Link>
              <ApplyModal
                trigger={
                  <button className="hidden sm:inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#F04E23] px-4 text-sm font-semibold text-white hover:bg-[#D03D12] transition-colors shadow-sm">
                    Apply Now <span aria-hidden>→</span>
                  </button>
                }
              />
              <button
                type="button"
                onClick={() => setMenuOpen(o => !o)}
                className={`h-9 w-9 flex items-center justify-center rounded-md transition-colors ${iconClass}`}
                aria-label="Menu"
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mega-menu dropdown ──────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              top: `${bannerHeight + NAV_H}px`,
              maxHeight: `calc(100vh - ${bannerHeight + NAV_H}px)`,
            }}
            className="fixed inset-x-0 z-40 overflow-y-auto bg-white border-t border-gray-100 shadow-2xl"
          >
            <div className="container-wide grid gap-8 py-10 md:grid-cols-4 md:gap-12 md:py-14">
              {menuColumns.map(col => (
                <div key={col.title}>
                  <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">
                    {col.title}
                  </p>
                  <div className="space-y-3.5">
                    {col.links.map(link => {
                      const cls = link.strong
                        ? "block text-sm font-bold text-gray-900 hover:text-[#F04E23] transition-colors"
                        : "block text-sm text-gray-600 hover:text-gray-900 hover:pl-1 transition-all leading-6";
                      if (link.href)
                        return <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noopener" onClick={() => setMenuOpen(false)} className={cls}>{link.label}</a>;
                      return <Link key={link.label} href={link.to ?? "/"} onClick={() => setMenuOpen(false)} className={cls}>{link.label}</Link>;
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-100 bg-gray-50 py-4">
              <div className="container-wide flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs font-medium text-gray-500">
                  Need help?{" "}
                  <a href={`tel:${SITE.phone}`} className="text-[#F04E23] hover:text-[#D03D12] transition-colors font-bold">
                    {SITE.phone}
                  </a>
                </p>
                <ApplyModal
                  trigger={
                    <button className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#F04E23] px-5 text-sm font-semibold text-white hover:bg-[#D03D12] transition-colors shadow-sm">
                      Apply for 2026 Batch →
                    </button>
                  }
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
