"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useCart } from "@/hooks/useCart";
import { useCurrency } from "@/hooks/useCurrency";
import { loadStripe } from "@stripe/stripe-js";
import type { Locale } from "@/lib/i18n";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CreditCard,
  Lock,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder"
);

function SimulatedCheckoutForm({
  total,
  locale,
  clearCart,
}: {
  total: number;
  locale: string;
  clearCart: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
  const [expiry, setExpiry] = useState("12/29");
  const [cvc, setCvc] = useState("123");
  const [name, setName] = useState("Administrador Indra");
  const router = useRouter();
  const t = useTranslations("checkout");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    clearCart();
    router.push(`/${locale}/success`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gradient-to-r from-amber-500/10 to-saffron-500/10 border border-saffron-200/50 rounded-2xl p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-saffron-100 flex items-center justify-center flex-shrink-0">
          <Lock className="w-5 h-5 text-saffron-600" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-indra-900">Modo de Demostración Activo</h4>
          <p className="text-xs text-indra-600 mt-1">
            Estás visualizando Indra Luxe en modo sandbox. No se realizarán cargos reales y puedes simular el pago usando cualquier dato de tarjeta de prueba.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-indra-100/50 p-6 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-saffron-50 flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-saffron-600" />
          </div>
          <div>
            <h3 className="font-semibold text-indra-900">Tarjeta de Crédito Simulada</h3>
            <p className="text-xs text-indra-400">Introduce datos simulados para completar tu pedido</p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-indra-500 uppercase tracking-wider mb-2">Número de Tarjeta</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="w-full px-4 py-3 bg-indra-50/50 border border-indra-200 rounded-xl text-indra-800 text-sm focus:border-saffron-400 focus:bg-white transition-all font-mono"
            placeholder="4242 4242 4242 4242"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-indra-500 uppercase tracking-wider mb-2">Vencimiento</label>
            <input
              type="text"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              className="w-full px-4 py-3 bg-indra-50/50 border border-indra-200 rounded-xl text-indra-800 text-sm focus:border-saffron-400 focus:bg-white transition-all font-mono"
              placeholder="MM/AA"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-indra-500 uppercase tracking-wider mb-2">CVC</label>
            <input
              type="text"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              className="w-full px-4 py-3 bg-indra-50/50 border border-indra-200 rounded-xl text-indra-800 text-sm focus:border-saffron-400 focus:bg-white transition-all font-mono"
              placeholder="123"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-indra-500 uppercase tracking-wider mb-2">Titular de la Tarjeta</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-indra-50/50 border border-indra-200 rounded-xl text-indra-800 text-sm focus:border-saffron-400 focus:bg-white transition-all"
            placeholder="Nombre Apellido"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={cn(
          "w-full flex items-center justify-center gap-2 py-4",
          "bg-indra-900 text-white font-medium rounded-xl",
          "hover:bg-indra-800 transition-all btn-lift disabled:opacity-50"
        )}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            {t("processing")}
          </>
        ) : (
          <>
            <Lock className="w-4 h-4" />
            Simular Pago — ${total.toFixed(2)}
          </>
        )}
      </button>
    </form>
  );
}

function CheckoutForm({
  total,
  locale,
}: {
  total: number;
  locale: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const t = useTranslations("checkout");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);
    setError("");

    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/${locale}/success`,
      },
    });

    if (submitError) {
      setError(submitError.message || t("error"));
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-indra-100/50 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-saffron-50 flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-saffron-600" />
          </div>
          <div>
            <h3 className="font-semibold text-indra-900">
              {t("paymentInfo")}
            </h3>
            <p className="text-xs text-indra-400">{t("securePayment")}</p>
          </div>
        </div>

        <PaymentElement />
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-xl text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || isLoading}
        className={cn(
          "w-full flex items-center justify-center gap-2 py-4",
          "bg-indra-900 text-white font-medium rounded-xl",
          "hover:bg-indra-800 transition-all btn-lift disabled:opacity-50"
        )}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            {t("processing")}
          </>
        ) : (
          <>
            <Lock className="w-4 h-4" />
            {t("payNow")} — ${total.toFixed(2)}
          </>
        )}
      </button>
    </form>
  );
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const { format } = useCurrency();
  const locale = useLocale() as Locale;
  const router = useRouter();
  const t = useTranslations("checkout");
  const [clientSecret, setClientSecret] = useState("");
  const [isMockMode, setIsMockMode] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      router.push(`/${locale}/cart`);
      return;
    }

    // Create PaymentIntent
    fetch("/api/stripe/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: Math.round(subtotal * 100),
        currency: "usd",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
          if (data.isMockMode || data.clientSecret.startsWith("mock_secret_placeholder")) {
            setIsMockMode(true);
          }
        }
      })
      .catch((err) => {
        console.error("Payment intent error:", err);
        // Fallback directly to mock in client side error
        setClientSecret("mock_secret_placeholder_fallback");
        setIsMockMode(true);
      });
  }, [items, subtotal, locale, router]);

  if (items.length === 0) return null;

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            href={`/${locale}/cart`}
            className="flex items-center gap-2 text-sm text-indra-500 hover:text-saffron-600 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al carrito
          </Link>

          <h1 className="text-3xl font-bold font-display text-indra-900 mb-8">
            {t("title")}
          </h1>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-3">
              {clientSecret ? (
                isMockMode ? (
                  <SimulatedCheckoutForm total={subtotal} locale={locale} clearCart={clearCart} />
                ) : (
                  <Elements
                    stripe={stripePromise}
                    options={{ clientSecret }}
                  >
                    <CheckoutForm total={subtotal} locale={locale} />
                  </Elements>
                )
              ) : (
                <div className="flex items-center justify-center py-24">
                  <Loader2 className="w-8 h-8 animate-spin text-saffron-500" />
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-indra-100/50 p-6 lg:sticky lg:top-28">
                <h2 className="font-semibold text-indra-900 mb-6">
                  {t("orderSummary")}
                </h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}`}
                      className="flex items-center gap-3"
                    >
                      <div className="w-12 h-12 rounded-lg bg-indra-100 flex items-center justify-center text-xs font-medium">
                        {item.quantity}x
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-indra-900 truncate">
                          {item.product.translations[locale]?.title ||
                            item.product.slug}
                        </p>
                        <p className="text-xs text-indra-400">
                          Talla: {item.size}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-indra-700">
                        {format(item.product.base_price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <hr className="my-6 border-indra-100" />
                <div className="flex justify-between">
                  <span className="font-semibold text-indra-900">Total</span>
                  <span className="text-xl font-bold text-saffron-700">
                    {format(subtotal)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
