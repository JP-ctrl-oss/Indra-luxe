"use client";

import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";
import { Package } from "lucide-react";
import { useTranslations } from "next-intl";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const t = useTranslations("shop");

  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-24 text-center"
      >
        <Package className="w-16 h-16 text-indra-200 mb-4" />
        <p className="text-lg font-medium text-indra-500">{t("noResults")}</p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}
