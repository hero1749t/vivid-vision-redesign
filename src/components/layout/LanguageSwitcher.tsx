"use client";

import { useState } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter, Locale } from "@/i18n/routing";
import { useParams } from "next/navigation";

const LANGUAGES: { code: Locale; name: string; flag: string }[] = [
  { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
];

export const LanguageSwitcher = ({ isLightMode }: { isLightMode: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const currentLocale = (params?.locale as Locale) || 'en';

  const currentLang = LANGUAGES.find(l => l.code === currentLocale) || LANGUAGES[0];

  const handleLangChange = (langCode: Locale) => {
    setIsOpen(false);
    // Use the next-intl router to push the new locale
    router.push(pathname, { locale: langCode });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 h-9 px-2.5 rounded-lg transition-all duration-200 ${
          isLightMode 
            ? "hover:bg-gray-100 text-gray-700" 
            : "hover:bg-white/10 text-white/90"
        }`}
      >
        <Globe size={16} className={isLightMode ? "text-[#F04E23]" : "text-white"} />
        <span className="text-xs font-bold uppercase tracking-wider">{currentLang.code}</span>
        <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-[60]" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-[70] overflow-hidden"
            >
              <div className="px-3 py-1.5 mb-1 border-b border-gray-50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Select Language</span>
              </div>
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLangChange(lang.code)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                    currentLocale === lang.code 
                      ? "bg-orange-50 text-[#F04E23] font-bold" 
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </div>
                  {currentLocale === lang.code && <Check size={14} />}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
