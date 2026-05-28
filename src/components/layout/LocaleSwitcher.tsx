"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "@/lib/navigation";
import { locales, type Locale } from "@/lib/i18n";
import { useTranslations, useLocale } from "next-intl";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const localeNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
  fr: "Français",
  de: "Deutsch",
  hi: "हिन्दी",
  th: "ไทย",
};

const localeFlags: Record<Locale, string> = {
  es: "🇪🇸",
  en: "🇬🇧",
  fr: "🇫🇷",
  de: "🇩🇪",
  hi: "🇮🇳",
  th: "🇹🇭",
};

export default function LocaleSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("locale");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLocaleChange = (newLocale: Locale) => {
    setIsOpen(false);
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium",
          "transition-all duration-300 hover:bg-indra-100/50",
          "text-indra-800 hover:text-indra-950",
          isOpen && "bg-indra-100/50"
        )}
        aria-label={t("label")}
      >
        <Globe className="w-4 h-4 text-saffron-500" />
        <span className="hidden sm:inline">{localeNames[locale]}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-luxury border border-indra-100/50 py-2 z-50 animate-scale-in">
          <div className="px-3 py-2 text-xs font-semibold text-indra-400 uppercase tracking-wider">
            {t("label")}
          </div>
          {locales.map((l) => (
            <button
              key={l}
              onClick={() => handleLocaleChange(l)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200",
                "hover:bg-saffron-50",
                locale === l
                  ? "text-saffron-700 font-semibold bg-saffron-50/50"
                  : "text-indra-700"
              )}
            >
              <span className="text-base">{localeFlags[l]}</span>
              <span>{localeNames[l]}</span>
              {locale === l && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-saffron-400" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
