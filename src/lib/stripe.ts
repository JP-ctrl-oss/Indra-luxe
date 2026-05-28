import Stripe from "stripe";
import { loadStripe, type Stripe as StripeClient } from "@stripe/stripe-js";

let stripePromise: Promise<StripeClient | null>;

export function getStripe() {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
}

export const stripeServer = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export function formatAmountForStripe(amount: number, currency: string): number {
  const zeroDecimalCurrencies = ["jpy", "krw", "vnd", "clp"];
  if (zeroDecimalCurrencies.includes(currency.toLowerCase())) {
    return Math.round(amount);
  }
  return Math.round(amount * 100);
}

export function formatAmountFromStripe(amount: number, currency: string): number {
  const zeroDecimalCurrencies = ["jpy", "krw", "vnd", "clp"];
  if (zeroDecimalCurrencies.includes(currency.toLowerCase())) {
    return amount;
  }
  return amount / 100;
}
