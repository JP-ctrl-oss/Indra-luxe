"use client";

import { useState, useRef, useEffect } from "react";
import { useCurrency } from "@/hooks/useCurrency";
import { supportedCurrencies } from "@/lib/currencies";
import { useTranslations } from "next-intl";
import { DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CurrencySwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { currency, setCurrency } = useCurrency();
  const t = useTranslations("currency");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const current = supportedCurrencies.find((c) => c.code === currency);

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
        <DollarSign className="w-4 h-4 text-gold-600" />
        <span className="hidden sm:inline">
          {current?.symbol} {current?.code}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-luxury border border-indra-100/50 py-2 z-50 animate-scale-in">
          <div className="px-3 py-2 text-xs font-semibold text-indra-400 uppercase tracking-wider">
            {t("label")}
          </div>
          {supportedCurrencies.map((c) => (
            <button
              key={c.code}
              onClick={() => {
                setCurrency(c.code as any);
                setIsOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200",
                "hover:bg-gold-50",
                currency === c.code
                  ? "text-gold-700 font-semibold bg-gold-50/50"
                  : "text-indra-700"
              )}
            >
              <span className="font-semibold w-8">{c.symbol}</span>
              <span>{t(c.code)}</span>
              <span className="ml-auto text-xs text-indra-400">{c.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
