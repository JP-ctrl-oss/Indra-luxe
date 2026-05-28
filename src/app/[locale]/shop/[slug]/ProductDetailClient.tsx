"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useCart } from "@/hooks/useCart";
import { useCurrency } from "@/hooks/useCurrency";
import { Product } from "@/types/product";
import ProductCard from "@/components/shop/ProductCard";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Shield,
  Truck,
  RefreshCw,
  Heart,
  ChevronRight,
} from "lucide-react";
import { cn, getTranslation } from "@/lib/utils";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
  locale: string;
}

export default function ProductDetailClient({
  product,
  relatedProducts,
  locale,
}: ProductDetailClientProps) {
  const [selectedSize, setSelectedSize] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();
  const { format } = useCurrency();
  const t = useTranslations("product");
  const translation = getTranslation(product.translations, locale);

  const images = product.images.length > 0 ? product.images : [product.cover_image].filter(Boolean);

  const handleAddToCart = () => {
    if (!selectedSize) {
      return;
    }
    addToCart(product, selectedSize);
  };

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-indra-400 mb-8"
        >
          <Link
            href={`/${locale}/shop`}
            className="flex items-center gap-1 hover:text-saffron-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a la tienda
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-indra-600 truncate">
            {translation.title || product.slug}
          </span>
        </motion.nav>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-indra-100 shadow-luxury-sm">
              {images[activeImage] ? (
                <Image
                  src={images[activeImage]!}
                  alt={translation.title || product.slug}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-indra-100 to-indra-200 flex items-center justify-center">
                  <span className="text-6xl">
                    {product.origin === "india" ? "🇮🇳" : "🇹🇭"}
                  </span>
                </div>
              )}

              {/* Origin badge */}
              <div className="absolute top-4 left-4">
                <span
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium",
                    product.origin === "india"
                      ? "bg-orange-500/90 text-white"
                      : "bg-emerald-600/90 text-white"
                  )}
                >
                  {product.origin === "india" ? "India" : "Thailand"}
                </span>
              </div>

              {/* Wishlist */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={cn(
                  "absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center",
                  "bg-white/90 backdrop-blur-sm shadow-md transition-all hover:scale-110",
                  isWishlisted && "text-red-500"
                )}
              >
                <Heart
                  className={cn("w-5 h-5", isWishlisted && "fill-current")}
                />
              </button>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 mt-4">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={cn(
                      "w-20 h-20 rounded-xl overflow-hidden border-2 transition-all",
                      activeImage === index
                        ? "border-saffron-500 shadow-md"
                        : "border-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <Image
                      src={img!}
                      alt={`${translation.title} - ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right: Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold font-display text-indra-900">
                {translation.title || product.slug}
              </h1>
              <p className="mt-4 text-indra-600 leading-relaxed">
                {translation.description}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-saffron-600">
                {format(product.base_price)}
              </span>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-indra-900">
                  {t("selectSize")}
                </span>
                <button className="text-sm text-saffron-600 hover:text-saffron-700">
                  {t("sizeGuide")}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => {
                  const inStock = (product.stock[size] || 0) > 0;
                  return (
                    <button
                      key={size}
                      onClick={() => inStock && setSelectedSize(size)}
                      disabled={!inStock}
                      className={cn(
                        "w-14 h-14 rounded-xl font-medium text-sm transition-all",
                        selectedSize === size
                          ? "bg-indra-900 text-white shadow-md"
                          : inStock
                          ? "bg-indra-50 text-indra-700 hover:bg-indra-100 border border-indra-200"
                          : "bg-indra-50/50 text-indra-300 border border-indra-100 cursor-not-allowed line-through"
                      )}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className={cn(
                "w-full py-4 rounded-2xl font-medium text-lg transition-all btn-lift",
                selectedSize
                  ? "bg-indra-900 text-white hover:bg-indra-800 shadow-luxury-sm"
                  : "bg-indra-100 text-indra-400 cursor-not-allowed"
              )}
            >
              {!selectedSize ? t("selectSize") : t("addToCart")}
            </button>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-indra-100">
              {[
                { icon: Truck, label: "Envío gratis" },
                { icon: Shield, label: "Pago seguro" },
                { icon: RefreshCw, label: "Devoluciones" },
              ].map((badge) => (
                <div key={badge.label} className="text-center">
                  <badge.icon className="w-5 h-5 text-saffron-500 mx-auto mb-1" />
                  <span className="text-xs text-indra-500">{badge.label}</span>
                </div>
              ))}
            </div>

            {/* Details Accordion */}
            <div className="space-y-3">
              {[
                { label: t("material"), value: translation.material || product.material },
                { label: t("origin"), value: product.origin },
                { label: t("care"), value: translation.care || product.care },
              ].map(
                (detail) =>
                  detail.value && (
                    <div
                      key={detail.label}
                      className="p-4 bg-indra-50/50 rounded-xl"
                    >
                      <span className="text-xs font-semibold text-indra-400 uppercase tracking-wider">
                        {detail.label}
                      </span>
                      <p className="mt-1 text-sm text-indra-700 capitalize">
                        {detail.value}
                      </p>
                    </div>
                  )
              )}
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="text-2xl font-bold font-display text-indra-900 mb-8">
              {t("relatedTitle")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p, index) => (
                <ProductCard key={p.id} product={p} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
