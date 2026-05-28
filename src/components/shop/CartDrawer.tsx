"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useCart } from "@/hooks/useCart";
import type { Locale } from "@/lib/i18n";
import { useCurrency } from "@/hooks/useCurrency";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();
  const { format } = useCurrency();
  const locale = useLocale() as Locale;
  const t = useTranslations("cart");

  // Listen for custom event to open cart
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-cart" as any, handleOpen);
    return () => window.removeEventListener("open-cart" as any, handleOpen);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-indra-950/40 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-indra-100">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-saffron-500" />
                  <h2 className="text-lg font-semibold text-indra-900 font-display">
                    {t("title")}
                  </h2>
                  {totalItems > 0 && (
                    <span className="px-2 py-0.5 bg-saffron-100 text-saffron-700 text-xs font-semibold rounded-full">
                      {totalItems}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-indra-50 transition-colors"
                >
                  <X className="w-5 h-5 text-indra-500" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <ShoppingBag className="w-16 h-16 text-indra-200 mb-4" />
                    <p className="text-indra-500 font-medium mb-2">
                      {t("empty")}
                    </p>
                    <Link
                      href={`/${locale}/shop`}
                      onClick={() => setIsOpen(false)}
                      className="text-saffron-600 hover:text-saffron-700 text-sm font-medium"
                    >
                      {t("emptyCta")}
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                      {items.map((item) => (
                        <motion.div
                          key={`${item.product.id}-${item.size}`}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          className="flex gap-4 p-4 bg-indra-50/50 rounded-xl"
                        >
                          {/* Image */}
                          <div className="w-20 h-20 rounded-lg overflow-hidden bg-indra-100 flex-shrink-0">
                            {item.product.cover_image ? (
                              <Image
                                src={item.product.cover_image}
                                alt={item.product.translations[locale]?.title || ""}
                                width={80}
                                height={80}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-indra-200" />
                            )}
                          </div>

                          {/* Details */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium text-indra-900 truncate">
                              {item.product.translations[locale]?.title ||
                                item.product.slug}
                            </h3>
                            <p className="text-xs text-indra-500 mt-1">
                              {t("size")}: {item.size}
                            </p>
                            <p className="text-sm font-semibold text-saffron-600 mt-1">
                              {format(item.product.base_price)}
                            </p>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.size,
                                    item.quantity - 1
                                  )
                                }
                                className="w-7 h-7 rounded-lg bg-white border border-indra-200 flex items-center justify-center hover:border-saffron-400 transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-sm font-medium w-6 text-center">
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
                                className="w-7 h-7 rounded-lg bg-white border border-indra-200 flex items-center justify-center hover:border-saffron-400 transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() =>
                                  removeFromCart(item.product.id, item.size)
                                }
                                className="ml-auto p-1.5 text-indra-400 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-6 border-t border-indra-100 bg-indra-50/30">
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-indra-600">{t("subtotal")}</span>
                      <span className="font-medium text-indra-900">
                        {format(subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-indra-600">{t("shipping")}</span>
                      <span className="text-saffron-600 font-medium">
                        {t("shippingFree")}
                      </span>
                    </div>
                    <hr className="luxury" />
                    <div className="flex justify-between">
                      <span className="font-semibold text-indra-900">
                        {t("total")}
                      </span>
                      <span className="text-lg font-bold text-saffron-700">
                        {format(subtotal)}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/${locale}/checkout`}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "w-full flex items-center justify-center gap-2 py-3.5",
                      "bg-indra-900 text-white font-medium rounded-xl",
                      "hover:bg-indra-800 transition-all btn-lift"
                    )}
                  >
                    {t("checkout")}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center text-sm text-indra-500 hover:text-indra-700 mt-3 transition-colors"
                  >
                    {t("continueShopping")}
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
