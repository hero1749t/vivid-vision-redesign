import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Home,
  GraduationCap,
  Info,
  Users,
  Image,
  Mail,
  MessageCircle,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { SITE } from "@/data/site";

const main = [
  { title: "Home", url: "/", icon: Home },
];

const courses = [
  { title: "100-Hour YTT", url: "/courses/100hr", icon: Sparkles },
  { title: "200-Hour YTT", url: "/courses/200hr", icon: Sparkles },
  { title: "300-Hour YTT", url: "/courses/300hr", icon: Sparkles },
];

const more = [
  { title: "About", url: "/about", icon: Info },
  { title: "Teachers", url: "/instructors", icon: Users },
  { title: "Gallery", url: "/gallery", icon: Image },
  { title: "Contact", url: "/contact", icon: Mail },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { pathname } = useLocation();
  const isActive = (url: string) => pathname === url;

  const linkCls = (active: boolean) =>
    `flex items-center gap-3 transition-colors ${
      active
        ? "bg-terra/10 text-terra font-medium"
        : "text-warm-mid hover:bg-sand hover:text-warm-dark"
    }`;

  return (
    <Sidebar collapsible="icon" className="border-r border-warm-dark/10 bg-cream">
      <SidebarHeader className="border-b border-warm-dark/10 bg-cream">
        <NavLink to="/" className="flex items-center gap-3 p-2">
          <div className="w-9 h-9 rounded-full bg-terra grid place-items-center font-serif text-cream text-lg shrink-0">
            B
          </div>
          {!collapsed && (
            <div className="leading-none min-w-0">
              <p className="font-serif text-base text-warm-dark truncate">Bali YTTC</p>
              <p className="text-[9px] tracking-[0.22em] uppercase text-warm-light mt-1">
                Ubud · Est 2018
              </p>
            </div>
          )}
        </NavLink>
      </SidebarHeader>

      <SidebarContent className="bg-cream">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {main.map((i) => (
                <SidebarMenuItem key={i.url}>
                  <SidebarMenuButton asChild isActive={isActive(i.url)} tooltip={i.title}>
                    <NavLink to={i.url} className={linkCls(isActive(i.url))}>
                      <i.icon className="h-4 w-4 shrink-0" />
                      <span>{i.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] tracking-[0.22em] uppercase text-warm-light">
            <GraduationCap className="w-3 h-3 mr-1" /> Courses
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {courses.map((i) => (
                <SidebarMenuItem key={i.url}>
                  <SidebarMenuButton asChild isActive={isActive(i.url)} tooltip={i.title}>
                    <NavLink to={i.url} className={linkCls(isActive(i.url))}>
                      <i.icon className="h-4 w-4 shrink-0" />
                      <span>{i.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] tracking-[0.22em] uppercase text-warm-light">
            School
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {more.map((i) => (
                <SidebarMenuItem key={i.url}>
                  <SidebarMenuButton asChild isActive={isActive(i.url)} tooltip={i.title}>
                    <NavLink to={i.url} className={linkCls(isActive(i.url))}>
                      <i.icon className="h-4 w-4 shrink-0" />
                      <span>{i.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-warm-dark/10 bg-cream p-2 gap-1">
        <a
          href={`https://wa.me/${SITE.whatsapp}`}
          target="_blank"
          rel="noopener"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-sage hover:bg-sage/10 transition-colors"
        >
          <MessageCircle className="w-4 h-4 shrink-0" />
          {!collapsed && <span>WhatsApp</span>}
        </a>
        <NavLink
          to="/admin"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-xs text-warm-light hover:bg-sand transition-colors"
        >
          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
          {!collapsed && <span>Admin</span>}
        </NavLink>
      </SidebarFooter>
    </Sidebar>
  );
}
