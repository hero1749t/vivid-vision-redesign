"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Users, GraduationCap, CreditCard, Settings, 
  BarChart3, BookOpen, Tag, Bell, HelpCircle, LogOut, Menu, X
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/en/admin/dashboard" },
  { icon: Users, label: "Students", href: "/en/admin/dashboard?tab=students" },
  { icon: GraduationCap, label: "Enrollments", href: "/en/admin/dashboard?tab=enrollments" },
  { icon: CreditCard, label: "Finance", href: "/en/admin/dashboard?tab=finance" },
  { icon: BarChart3, label: "Analytics", href: "/en/admin/dashboard?tab=analytics" },
  { icon: BookOpen, label: "Batches", href: "/en/admin/dashboard?tab=batches" },
  { icon: Tag, label: "Coupons", href: "/en/admin/dashboard?tab=coupons" },
  { icon: Bell, label: "Announcements", href: "/en/admin/dashboard?tab=announcements" },
];

const bottomNav = [
  { icon: Settings, label: "Settings", href: "/en/admin/dashboard?tab=settings" },
  { icon: HelpCircle, label: "Help", href: "/en/admin/dashboard?tab=help" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`bg-gray-900 border-r border-gray-800 flex flex-col h-screen transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        {!isCollapsed && (
          <div>
            <h2 className="font-bold text-lg text-white">Bali YTTC</h2>
            <p className="text-[10px] text-orange-500 uppercase tracking-wider font-semibold">Admin Panel</p>
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {!isCollapsed && (
          <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold px-3 mb-2">Main</p>
        )}
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                isActive 
                  ? "bg-orange-500 text-white" 
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <Icon size={20} className={isActive ? "text-white" : ""} />
              {!isCollapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-3 border-t border-gray-800 space-y-1">
        {bottomNav.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                isActive 
                  ? "bg-orange-500 text-white" 
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <Icon size={20} />
              {!isCollapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </Link>
          );
        })}
        
        {/* User Profile */}
        <div className={`flex items-center gap-3 px-3 py-3 mt-2 rounded-lg bg-gray-800/50 ${isCollapsed ? "justify-center" : ""}`}>
          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xs">
            A
          </div>
          {!isCollapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Admin User</p>
                <p className="text-xs text-gray-500 truncate">Super Admin</p>
              </div>
              <LogOut size={16} className="text-gray-500 hover:text-white cursor-pointer" />
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
