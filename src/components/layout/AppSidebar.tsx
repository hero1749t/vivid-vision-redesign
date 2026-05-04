import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { NAV_GROUPS, SITE } from "@/data/site";
import {
  Home, Sprout, Flame, Star, BookOpen, Users, Mail, Image, MessageSquareQuote,
  MessageCircle, Sparkles,
} from "lucide-react";
import { ApplyModal } from "@/components/shared/ApplyModal";
import { Button } from "@/components/ui/button";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Home, Sprout, Flame, Star, BookOpen, Users, Mail, Image, MessageSquareQuote,
};

export const AppSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { pathname } = useLocation();

  return (
    <Sidebar
      collapsible="icon"
      className="border-r-0 [&>div[data-sidebar=sidebar]]:bg-warm-dark [&>div[data-sidebar=sidebar]]:text-cream"
    >
      <SidebarHeader className="bg-warm-dark border-b border-cream/10 py-5">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-terra grid place-items-center font-serif font-bold text-cream shrink-0 shadow-elev-sm">
            B
          </div>
          {!collapsed && (
            <div className="leading-none overflow-hidden">
              <p className="font-serif text-lg font-bold text-cream truncate">Bali YTTC</p>
              <p className="text-[9px] tracking-[0.28em] uppercase mt-1.5 text-cream/55">Ubud · Bali</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-warm-dark px-1 py-3">
        {NAV_GROUPS.map((group) => (
          <SidebarGroup key={group.label}>
            {!collapsed && (
              <SidebarGroupLabel className="text-cream/40 text-[10px] tracking-[0.25em] uppercase font-medium px-3 mt-2 mb-1">
                {group.label}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const Icon = ICONS[item.icon] ?? Sparkles;
                  const isActive =
                    item.to === "/"
                      ? pathname === "/"
                      : pathname === item.to || pathname.startsWith(item.to + "/");
                  return (
                    <SidebarMenuItem key={item.to}>
                      <SidebarMenuButton
                        asChild
                        tooltip={collapsed ? item.label : undefined}
                        className={`group/item h-10 rounded-md transition-colors ${
                          isActive
                            ? "bg-terra/15 text-cream hover:bg-terra/20"
                            : "text-cream/70 hover:bg-cream/5 hover:text-cream"
                        }`}
                      >
                        <NavLink to={item.to} className="flex items-center gap-3 relative">
                          {isActive && (
                            <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r bg-terra" />
                          )}
                          <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-terra-light" : "text-cream/55 group-hover/item:text-terra-light"}`} />
                          {!collapsed && (
                            <>
                              <span className="text-[13.5px] font-medium tracking-tight">{item.label}</span>
                              {(item as any).badge && (
                                <span className="ml-auto text-[9px] tracking-widest uppercase px-1.5 py-0.5 rounded bg-gold/20 text-gold-light font-semibold">
                                  {(item as any).badge}
                                </span>
                              )}
                            </>
                          )}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="bg-warm-dark border-t border-cream/10 p-3 gap-2">
        {collapsed ? (
          <a
            href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener"
            className="grid place-items-center h-10 w-10 mx-auto rounded-md bg-sage/20 text-sage-light hover:bg-sage/30"
            aria-label="WhatsApp"
          >
            <MessageCircle className="h-4 w-4" />
          </a>
        ) : (
          <>
            <ApplyModal trigger={
              <Button className="w-full h-10 bg-terra hover:bg-terra-deep text-cream font-medium shadow-elev-sm">
                Apply Now
              </Button>
            } />
            <a
              href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener"
              className="flex items-center justify-center gap-2 h-9 rounded-md border border-cream/15 text-cream/80 hover:border-cream/40 hover:text-cream text-xs"
            >
              <MessageCircle className="h-3.5 w-3.5" /> WhatsApp Us
            </a>
          </>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};
