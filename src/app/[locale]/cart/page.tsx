"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useCart } from "@/hooks/useCart";
import { useCurrency } from "@/hooks/useCurrency";
import { motion } from "framer-motion";
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, subtotal } = useCart();
  const { format } = useCurrency();
  const locale = useLocale() as Locale;
  const t = useTranslations("cart");

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold font-display text-indra-900">
            {t("title")}
          </h1>
        </motion.div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <ShoppingBag className="w-20 h-20 text-indra-200 mb-6" />
            <p className="text-xl font-medium text-indra-500 mb-4">
              {t("empty")}
            </p>
            <Link
              href={`/${locale}/shop`}
              className={cn(
                "flex items-center gap-2 px-6 py-3 bg-indra-900 text-white",
                "rounded-xl font-medium hover:bg-indra-800 transition-all"
              )}
            >
              {t("emptyCta")}
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <motion.div
                  key={`${item.product.id}-${item.size}`}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-indra-100/50"
                >
                  {/* Image */}
                  <Link
                    href={`/${locale}/shop/${item.product.slug}`}
                    className="w-24 h-24 rounded-xl overflow-hidden bg-indra-100 flex-shrink-0"
                  >
                    {item.product.cover_image ? (
                      <Image
                        src={item.product.cover_image}
                        alt={item.product.translations[locale]?.title || ""}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-indra-200" />
                    )}
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/${locale}/shop/${item.product.slug}`}>
                      <h3 className="font-medium text-indra-900 hover:text-saffron-600 transition-colors">
                        {item.product.translations[locale]?.title ||
                          item.product.slug}
                      </h3>
                    </Link>
                    <p className="text-sm text-indra-400 mt-1">
                      {t("size")}: {item.size}
                    </p>
                    <p className="text-lg font-semibold text-saffron-600 mt-2">
                      {format(item.product.base_price)}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          className="w-8 h-8 rounded-lg bg-indra-50 border border-indra-200 flex items-center justify-center hover:border-saffron-400 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.size,
                              item.quantity + 1
                            )
                          }
                          className="w-8 h-8 rounded-lg bg-indra-50 border border-indra-200 flex items-center justify-center hover:border-saffron-400 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() =>
                          removeFromCart(item.product.id, item.size)
                        }
                        className="p-2 text-indra-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:sticky lg:top-28"
            >
              <div className="bg-white rounded-2xl shadow-luxury-sm border border-indra-100/50 p-6">
                <h2 className="text-lg font-semibold text-indra-900 mb-6">
                  {t("title")}
                </h2>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-indra-500">{t("subtotal")}</span>
                    <span className="font-medium text-indra-900">
                      {format(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-indra-500">{t("shipping")}</span>
                    <span className="text-emerald-600 font-medium">
                      {t("shippingFree")}
                    </span>
                  </div>
                  <hr className="border-indra-100" />
                  <div className="flex justify-between">
                    <span className="font-semibold text-indra-900">
                      {t("total")}
                    </span>
                    <span className="text-xl font-bold text-saffron-700">
                      {format(subtotal)}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/${locale}/checkout`}
                  className={cn(
                    "mt-6 w-full flex items-center justify-center gap-2 py-4",
                    "bg-indra-900 text-white font-medium rounded-xl",
                    "hover:bg-indra-800 transition-all btn-lift"
                  )}
                >
                  {t("checkout")}
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href={`/${locale}/shop`}
                  className="mt-3 block text-center text-sm text-indra-500 hover:text-indra-700 transition-colors"
                >
                  {t("continueShopping")}
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
