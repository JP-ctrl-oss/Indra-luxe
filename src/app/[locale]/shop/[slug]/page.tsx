import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { mockProducts } from "@/lib/mockProducts";
import ProductDetailClient from "./ProductDetailClient";

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  const isMockMode = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder");
  let product: any = null;

  if (!isMockMode) {
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from("products")
        .select("translations")
        .eq("slug", slug)
        .single();
      product = data;
    } catch (e) {
      // Ignorar e ir a mock
    }
  }

  if (!product) {
    product = mockProducts.find(p => p.slug === slug);
  }

  const title = product?.translations?.[locale]?.title || slug;

  return {
    title: `${title} | Indra Luxe`,
    description: product?.translations?.[locale]?.description || "",
  };
}

async function getProduct(slug: string) {
  const isMockMode = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder");

  if (isMockMode) {
    return mockProducts.find(p => p.slug === slug && p.is_active) || null;
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .single();

    if (error || !data) {
      console.warn("Product not found in Supabase, checking mockProducts:", slug);
      return mockProducts.find(p => p.slug === slug && p.is_active) || null;
    }

    return data;
  } catch (error) {
    console.error("Supabase exception in getProduct, checking mockProducts:", error);
    return mockProducts.find(p => p.slug === slug && p.is_active) || null;
  }
}

async function getRelatedProducts(productId: string, origin: string) {
  const isMockMode = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder");

  if (isMockMode) {
    return mockProducts.filter(p => p.origin === origin && p.is_active && p.id !== productId).slice(0, 4);
  }

  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("origin", origin)
      .eq("is_active", true)
      .neq("id", productId)
      .limit(4);

    return data && data.length > 0
      ? data
      : mockProducts.filter(p => p.origin === origin && p.is_active && p.id !== productId).slice(0, 4);
  } catch (error) {
    console.error("Supabase exception in getRelatedProducts, checking mockProducts:", error);
    return mockProducts.filter(p => p.origin === origin && p.is_active && p.id !== productId).slice(0, 4);
  }
}

export default async function ProductPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.id, product.origin);

  return (
    <ProductDetailClient
      product={product}
      relatedProducts={relatedProducts}
      locale={locale}
    />
  );
}
