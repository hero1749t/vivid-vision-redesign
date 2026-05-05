import { useState, useEffect, useCallback } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LANGUAGES = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
];

export const LanguageSwitcher = ({ isLightMode }: { isLightMode: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(LANGUAGES[0]);

  const triggerTranslation = useCallback((langCode: string) => {
    const googleCombo = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (googleCombo) {
      googleCombo.value = langCode;
      googleCombo.dispatchEvent(new Event("change"));
      console.log(`Translation triggered for: ${langCode}`);
      return true;
    }
    console.warn("Google Translate combo not found yet...");
    return false;
  }, []);

  const handleLangChange = (lang: typeof LANGUAGES[0]) => {
    setCurrentLang(lang);
    setIsOpen(false);
    
    // Try to trigger immediately
    if (!triggerTranslation(lang.code)) {
      // If failed, retry with polling
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        if (triggerTranslation(lang.code) || attempts > 30) {
          clearInterval(interval);
        }
      }, 500);
    }
  };

  // Hide the Google Translate bar and other elements
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "google-translate-custom-styles";
    style.innerHTML = `
      .goog-te-banner-frame, .goog-te-balloon-frame, .skiptranslate, .goog-te-gadget-icon, .goog-te-menu-value { display: none !important; }
      body { top: 0 !important; }
      .goog-text-highlight { background-color: transparent !important; box-shadow: none !important; }
      #google_translate_element { height: 0; overflow: hidden; position: absolute; }
    `;
    document.head.appendChild(style);
    return () => {
      const existing = document.getElementById("google-translate-custom-styles");
      if (existing) existing.remove();
    };
  }, []);

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
                  onClick={() => handleLangChange(lang)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                    currentLang.code === lang.code 
                      ? "bg-orange-50 text-[#F04E23] font-bold" 
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </div>
                  {currentLang.code === lang.code && <Check size={14} />}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
