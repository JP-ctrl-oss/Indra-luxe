"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useCurrency } from "@/hooks/useCurrency";
import { Product } from "@/types/product";
import { motion } from "framer-motion";
import { Heart, Eye } from "lucide-react";
import { cn, getTranslation } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const locale = useLocale();
  const { format } = useCurrency();
  const t = useTranslations("product");
  const translation = getTranslation(product.translations, locale);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/${locale}/shop/${product.slug}`}>
        <div className="relative bg-white rounded-2xl overflow-hidden shadow-luxury-sm hover:shadow-luxury transition-all duration-500">
          {/* Image Container */}
          <div className="relative aspect-[3/4] overflow-hidden bg-indra-100">
            {product.cover_image ? (
              <Image
                src={product.cover_image}
                alt={translation.title || product.slug}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-indra-100 to-indra-200 flex items-center justify-center">
                <span className="text-indra-300 text-4xl font-display">
                  {product.origin === "india" ? "🇮🇳" : "🇹🇭"}
                </span>
              </div>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-indra-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Quick Actions */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
              <button
                className={cn(
                  "w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center",
                  "shadow-md hover:bg-white hover:scale-110 transition-all"
                )}
                onClick={(e) => e.preventDefault()}
              >
                <Heart className="w-4 h-4 text-indra-700" />
              </button>
              <button
                className={cn(
                  "w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center",
                  "shadow-md hover:bg-white hover:scale-110 transition-all"
                )}
                onClick={(e) => e.preventDefault()}
              >
                <Eye className="w-4 h-4 text-indra-700" />
              </button>
            </div>

            {/* Origin Badge */}
            <div className="absolute top-4 left-4">
              <span
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm",
                  product.origin === "india"
                    ? "bg-orange-500/80 text-white"
                    : "bg-emerald-600/80 text-white"
                )}
              >
                {product.origin === "india" ? "India" : "Thailand"}
              </span>
            </div>

            {/* Featured Badge */}
            {product.is_featured && (
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 bg-saffron-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                  Destacado
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-indra-900 truncate group-hover:text-saffron-700 transition-colors">
                  {translation.title || product.slug}
                </h3>
                <p className="text-xs text-indra-400 mt-1 line-clamp-1">
                  {translation.description?.slice(0, 60)}...
                </p>
              </div>
              <span className="text-lg font-bold text-saffron-600 whitespace-nowrap">
                {format(product.base_price)}
              </span>
            </div>

            {/* Sizes */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {product.sizes.map((size) => (
                <span
                  key={size}
                  className={cn(
                    "px-2 py-0.5 text-xs rounded-md border",
                    product.stock[size] > 0
                      ? "border-indra-200 text-indra-600 bg-indra-50"
                      : "border-indra-100 text-indra-300 bg-indra-50/50 line-through"
                  )}
                >
                  {size}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
