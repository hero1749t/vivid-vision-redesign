import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { NAV } from "@/data/site";
import { ApplyModal } from "@/components/shared/ApplyModal";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const onLight = pathname === "/"; // hero is dark on home

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dark = scrolled || !onLight;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        dark
          ? "bg-cream/95 backdrop-blur-md border-b border-warm-dark/10 shadow-elev-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container-wide flex items-center justify-between h-[72px]">
        <Link to="/" className="flex items-center gap-3 group">
          <div className={`w-10 h-10 rounded-full grid place-items-center font-serif font-bold transition-colors ${
            dark ? "bg-terra text-cream" : "bg-cream/90 text-terra-deep"
          }`}>
            B
          </div>
          <div className="leading-none">
            <p className={`font-serif text-lg font-bold tracking-tight ${dark ? "text-warm-dark" : "text-cream"}`}>
              Bali YTTC
            </p>
            <p className={`text-[9px] tracking-[0.25em] uppercase mt-1 ${dark ? "text-warm-light" : "text-cream/60"}`}>
              Ubud · Est 2018
            </p>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((item) =>
            item.children ? (
              <div key={item.label} className="relative group">
                <button className={`flex items-center gap-1 text-sm px-4 py-2 rounded-md transition-colors ${
                  dark ? "text-warm-mid hover:text-terra" : "text-cream/90 hover:text-cream"
                }`}>
                  {item.label}
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="bg-cream rounded-lg shadow-elev-lg border border-warm-dark/10 p-1.5 min-w-[200px]">
                    {item.children.map((c) => (
                      <Link
                        key={c.to}
                        to={c.to}
                        className="block px-3 py-2 rounded-md text-sm text-warm-mid hover:bg-sand hover:text-terra transition-colors"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <NavLink
                key={item.to}
                to={item.to!}
                className={({ isActive }) =>
                  `text-sm px-4 py-2 rounded-md transition-colors ${
                    dark
                      ? isActive ? "text-terra bg-terra/10" : "text-warm-mid hover:text-terra"
                      : isActive ? "text-cream bg-cream/10" : "text-cream/90 hover:text-cream"
                  }`
                }
              >
                {item.label}
              </NavLink>
            )
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`https://wa.me/${(import.meta as any).env?.VITE_WA ?? '6281999333327'}`}
            target="_blank" rel="noopener"
            className={`text-xs font-medium px-4 py-2 rounded-md border transition-colors ${
              dark
                ? "border-sage text-sage hover:bg-sage hover:text-cream"
                : "border-cream/30 text-cream hover:bg-cream/10"
            }`}
          >
            WhatsApp
          </a>
          <ApplyModal
            trigger={
              <Button className="bg-terra hover:bg-terra-deep text-cream font-medium shadow-elev-sm">
                Apply Now
              </Button>
            }
          />
        </div>

        {/* Mobile */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className={`p-2 ${dark ? "text-warm-dark" : "text-cream"}`}>
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-cream border-warm-dark/10 w-[300px]">
              <div className="mt-8 space-y-1">
                {NAV.flatMap((i) =>
                  i.children
                    ? [
                        <p key={i.label} className="px-3 pt-4 pb-1 text-[10px] uppercase tracking-widest text-warm-light">{i.label}</p>,
                        ...i.children.map((c) => (
                          <Link key={c.to} to={c.to} className="block px-3 py-2.5 text-warm-mid hover:bg-sand rounded-md">{c.label}</Link>
                        )),
                      ]
                    : [<Link key={i.to} to={i.to!} className="block px-3 py-2.5 text-warm-dark font-medium hover:bg-sand rounded-md">{i.label}</Link>]
                )}
                <div className="pt-6">
                  <ApplyModal trigger={<Button className="w-full bg-terra hover:bg-terra-deep text-cream">Apply Now</Button>} />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
