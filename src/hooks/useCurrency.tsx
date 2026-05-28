"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { convertFromUsd, formatCurrency } from "@/lib/currencies";

type CurrencyCode = "USD" | "EUR" | "GBP" | "THB" | "INR" | "CAD" | "AUD";

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  convert: (usdAmount: number) => number;
  format: (usdAmount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: "USD",
  setCurrency: () => {},
  convert: (amount) => amount,
  format: (amount) => `$${amount.toFixed(2)}`,
});

const CURRENCY_STORAGE_KEY = "indra-luxe-currency";

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("USD");
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CURRENCY_STORAGE_KEY) as CurrencyCode;
    if (stored) {
      setCurrencyState(stored);
    }
    setInitialized(true);
  }, []);

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(code);
    localStorage.setItem(CURRENCY_STORAGE_KEY, code);
  };

  const convert = (usdAmount: number) => convertFromUsd(usdAmount, currency);

  const format = (usdAmount: number) => {
    const converted = convertFromUsd(usdAmount, currency);
    return formatCurrency(converted, currency);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convert, format }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
