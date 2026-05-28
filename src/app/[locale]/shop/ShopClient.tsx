"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Product } from "@/types/product";
import ProductGrid from "@/components/shop/ProductGrid";
import { motion } from "framer-motion";
import { SlidersHorizontal, Grid3X3, LayoutList } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShopClientProps {
  products: Product[];
  locale: string;
}

export default function ShopClient({ products, locale }: ShopClientProps) {
  const t = useTranslations("shop");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <span className="text-saffron-600 text-sm font-semibold uppercase tracking-wider">
            Indra Luxe
          </span>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold font-display text-indra-900">
            {t("title")}
          </h1>
          <p className="mt-4 text-indra-500 max-w-xl">{t("subtitle")}</p>
        </motion.div>

        {/* Filters Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-white rounded-2xl shadow-sm border border-indra-100/50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-indra-600">
              <SlidersHorizontal className="w-4 h-4" />
              <span className="font-medium">
                {products.length} productos
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={cn(
                "px-4 py-2 bg-indra-50 border border-indra-200 rounded-lg",
                "text-sm text-indra-700 focus:border-saffron-400",
                "transition-all cursor-pointer"
              )}
            >
              <option value="newest">{t("filters.sortNewest")}</option>
              <option value="price-low">{t("filters.sortPriceLow")}</option>
              <option value="price-high">{t("filters.sortPriceHigh")}</option>
            </select>

            {/* View Mode */}
            <div className="flex items-center bg-indra-50 rounded-lg border border-indra-200">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-2 rounded-l-lg transition-all",
                  viewMode === "grid"
                    ? "bg-white text-saffron-600 shadow-sm"
                    : "text-indra-400 hover:text-indra-600"
                )}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-2 rounded-r-lg transition-all",
                  viewMode === "list"
                    ? "bg-white text-saffron-600 shadow-sm"
                    : "text-indra-400 hover:text-indra-600"
                )}
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Products */}
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
