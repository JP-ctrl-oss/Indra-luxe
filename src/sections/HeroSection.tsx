"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  const locale = useLocale();
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-indra-100 via-amber-50/80 to-saffron-100/40" />

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-saffron-200/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -10, 10, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gold-200/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-spice-200/15 rounded-full blur-2xl"
        />
      </div>

      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 C60 20 80 30 100 50 C80 70 60 80 50 100 C40 80 20 70 0 50 C20 30 40 20 50 0Z' fill='%23d4a96a'/%3E%3C/svg%3E")`,
        backgroundSize: '120px 120px',
      }} />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-saffron-200/50 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-saffron-500" />
            <span className="text-sm font-medium text-saffron-700">
              Ropa Artesanal de Lujo
            </span>
          </motion.div>

          {/* Title */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className={cn(
                "text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-display",
                "tracking-tight leading-[0.9]"
              )}
            >
              <span className="block text-indra-950">{t("title")}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="max-w-2xl mx-auto text-lg sm:text-xl text-indra-600 leading-relaxed"
            >
              {t("subtitle")}
            </motion.p>
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href={`/${locale}/shop`}
              className={cn(
                "group flex items-center gap-3 px-8 py-4 bg-indra-900 text-white",
                "rounded-2xl font-medium shadow-luxury hover:shadow-luxury-lg",
                "hover:bg-indra-800 transition-all duration-300 btn-lift"
              )}
            >
              {t("ctaShop")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href={`/${locale}/process`}
              className={cn(
                "flex items-center gap-3 px-8 py-4 bg-white/60 backdrop-blur-sm",
                "text-indra-800 border border-indra-200 rounded-2xl font-medium",
                "hover:bg-white hover:border-saffron-300 transition-all duration-300"
              )}
            >
              {t("ctaProcess")}
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex items-center justify-center gap-8 pt-8"
          >
            {[
              { icon: "🌍", label: "Envío mundial" },
              { icon: "✋", label: "Hecho a mano" },
              { icon: "🌱", label: "Comercio justo" },
              { icon: "🔒", label: "Pago seguro" },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex flex-col items-center gap-1.5 text-indra-400"
              >
                <span className="text-2xl">{badge.icon}</span>
                <span className="text-xs font-medium hidden sm:block">
                  {badge.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-indra-300 flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-indra-400"
          />
        </div>
      </motion.div>
    </section>
  );
}
