export interface Currency {
  code: string;
  name: string;
  symbol: string;
  rateToUsd: number;
  locale: string;
}

export const supportedCurrencies: Currency[] = [
  { code: "USD", name: "US Dollar", symbol: "$", rateToUsd: 1, locale: "en-US" },
  { code: "EUR", name: "Euro", symbol: "€", rateToUsd: 0.92, locale: "es-ES" },
  { code: "GBP", name: "British Pound", symbol: "£", rateToUsd: 0.79, locale: "en-GB" },
  { code: "THB", name: "Thai Baht", symbol: "฿", rateToUsd: 35.5, locale: "th-TH" },
  { code: "INR", name: "Indian Rupee", symbol: "₹", rateToUsd: 83.0, locale: "hi-IN" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", rateToUsd: 1.36, locale: "en-CA" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", rateToUsd: 1.52, locale: "en-AU" },
];

export function getCurrency(code: string): Currency {
  return supportedCurrencies.find((c) => c.code === code) || supportedCurrencies[0];
}

export function convertFromUsd(amount: number, currencyCode: string): number {
  const currency = getCurrency(currencyCode);
  return Math.round(amount * currency.rateToUsd * 100) / 100;
}

export function formatCurrency(amount: number, currencyCode: string): string {
  const currency = getCurrency(currencyCode);
  return new Intl.NumberFormat(currency.locale, {
    style: "currency",
    currency: currencyCode,
  }).format(amount);
}
