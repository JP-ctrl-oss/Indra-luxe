import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { mockProducts } from "@/lib/mockProducts";
import HeroSection from "@/sections/HeroSection";
import FeaturedProducts from "@/sections/FeaturedProducts";
import OriginSection from "@/sections/OriginSection";
import ProcessPreview from "@/sections/ProcessPreview";
import TestimonialsSection from "@/sections/TestimonialsSection";
import NewsletterSection from "@/sections/NewsletterSection";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

async function getFeaturedProducts() {
  const isMockMode = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder");
  if (isMockMode) {
    return mockProducts.filter(p => p.is_featured && p.is_active).slice(0, 8);
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_featured", true)
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(8);

    if (error) {
      console.error("Error fetching featured products from Supabase, falling back to mock:", error);
      return mockProducts.filter(p => p.is_featured && p.is_active).slice(0, 8);
    }

    return data && data.length > 0 ? data : mockProducts.filter(p => p.is_featured && p.is_active).slice(0, 8);
  } catch (error) {
    console.error("Supabase exception, falling back to mock products:", error);
    return mockProducts.filter(p => p.is_featured && p.is_active).slice(0, 8);
  }
}

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      <HeroSection />
      <FeaturedProducts products={featuredProducts} locale={locale} />
      <OriginSection />
      <ProcessPreview locale={locale} />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
}
