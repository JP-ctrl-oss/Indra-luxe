"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Product } from "@/types/product";
import ProductGrid from "@/components/shop/ProductGrid";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeaturedProductsProps {
  products: Product[];
  locale: string;
}

export default function FeaturedProducts({
  products,
  locale,
}: FeaturedProductsProps) {
  const t = useTranslations("home");

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-saffron-600 text-sm font-semibold uppercase tracking-wider">
            Colección
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold font-display text-indra-900">
            {t("featuredTitle")}
          </h2>
          <p className="mt-4 text-indra-500 max-w-xl mx-auto">
            {t("featuredSubtitle")}
          </p>
        </motion.div>

        {/* Products */}
        <ProductGrid products={products} />

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href={`/${locale}/shop`}
            className={cn(
              "inline-flex items-center gap-2 px-8 py-4 border-2 border-indra-900",
              "text-indra-900 rounded-2xl font-medium hover:bg-indra-900",
              "hover:text-white transition-all duration-300 btn-lift"
            )}
          >
            Ver toda la colección
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
