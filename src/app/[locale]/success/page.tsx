"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Check, ArrowRight, Package } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SuccessPage() {
  const locale = useLocale();
  const t = useTranslations("success");

  return (
    <div className="min-h-screen pt-28 pb-16 flex items-center justify-center">
      <div className="max-w-lg mx-auto px-4 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-8"
        >
          <Check className="w-12 h-12 text-emerald-500" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold font-display text-indra-900 mb-4">
            {t("title")}
          </h1>
          <p className="text-indra-500 mb-2">{t("subtitle")}</p>
          <p className="text-sm text-indra-400 mb-8">
            {t("emailSent")} tu correo electrónico.
          </p>

          <div className="flex items-center justify-center gap-2 p-4 bg-indra-50 rounded-xl mb-8">
            <Package className="w-5 h-5 text-saffron-500" />
            <span className="text-sm font-medium text-indra-700">
              {t("orderNumber")}: #
              {Math.random().toString(36).substr(2, 9).toUpperCase()}
            </span>
          </div>

          <Link
            href={`/${locale}/shop`}
            className={cn(
              "inline-flex items-center gap-2 px-8 py-4 bg-indra-900 text-white",
              "rounded-2xl font-medium hover:bg-indra-800 transition-all btn-lift"
            )}
          >
            {t("continueShopping")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
