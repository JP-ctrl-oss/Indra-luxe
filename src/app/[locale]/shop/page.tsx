import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { mockProducts } from "@/lib/mockProducts";
import ShopClient from "./ShopClient";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "shop" });
  return {
    title: `${t("title")} | Indra Luxe`,
    description: t("subtitle"),
  };
}

function filterAndSortMockProducts(searchParams: { [key: string]: string | undefined }) {
  let filtered = [...mockProducts].filter(p => p.is_active);

  if (searchParams?.origin) {
    filtered = filtered.filter(p => p.origin === searchParams.origin);
  }

  if (searchParams?.featured === "true") {
    filtered = filtered.filter(p => p.is_featured);
  }

  if (searchParams?.category) {
    filtered = filtered.filter(p => p.category.toLowerCase() === searchParams.category?.toLowerCase());
  }

  // Sort
  const sort = searchParams?.sort || "newest";
  if (sort === "price-low") {
    filtered.sort((a, b) => a.base_price - b.base_price);
  } else if (sort === "price-high") {
    filtered.sort((a, b) => b.base_price - a.base_price);
  } else {
    // Newest
    filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  return filtered;
}

async function getProducts(searchParams: { [key: string]: string | undefined }) {
  const isMockMode = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder");

  if (isMockMode) {
    return filterAndSortMockProducts(searchParams);
  }

  try {
    const supabase = createClient();
    let query = supabase
      .from("products")
      .select("*")
      .eq("is_active", true);

    if (searchParams?.origin) {
      query = query.eq("origin", searchParams.origin);
    }

    if (searchParams?.featured === "true") {
      query = query.eq("is_featured", true);
    }

    if (searchParams?.category) {
      query = query.eq("category", searchParams.category);
    }

    // Sort
    const sort = searchParams?.sort || "newest";
    if (sort === "price-low") {
      query = query.order("base_price", { ascending: true });
    } else if (sort === "price-high") {
      query = query.order("base_price", { ascending: false });
    } else {
      query = query.order("created_at", { ascending: false });
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching products from Supabase, falling back to mock:", error);
      return filterAndSortMockProducts(searchParams);
    }

    return data && data.length > 0 ? data : filterAndSortMockProducts(searchParams);
  } catch (error) {
    console.error("Supabase exception, falling back to mock products:", error);
    return filterAndSortMockProducts(searchParams);
  }
}

export default async function ShopPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams: { [key: string]: string | undefined };
}) {
  const products = await getProducts(searchParams);

  return <ShopClient products={products} locale={locale} />;
}
