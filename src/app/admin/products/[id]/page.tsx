"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Product } from "@/types/product";
import { motion } from "framer-motion";
import { Save, ArrowLeft, Loader2, Globe, Image, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const locales = ["es", "en", "fr", "de", "hi", "th"];
const localeNames: Record<string, string> = {
  es: "Español",
  en: "English",
  fr: "Français",
  de: "Deutsch",
  hi: "हिन्दी",
  th: "ไทย",
};

export default function ProductForm({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"basic" | "translations" | "images">("basic");
  const [activeLocale, setActiveLocale] = useState("es");

  const [form, setForm] = useState({
    slug: "",
    base_price: "",
    category: "clothing",
    origin: "india" as "india" | "thailand",
    material: "",
    care: "",
    sizes: "S,M,L,XL",
    stock: "",
    tags: "",
    is_active: true,
    is_featured: false,
    translations: {} as Record<string, { title: string; description: string; material?: string; care?: string }>,
    images: [] as string[],
  });

  useEffect(() => {
    if (!isNew) {
      fetchProduct();
    } else {
      setLoading(false);
    }
  }, [params.id]);

  const fetchProduct = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("id", params.id)
      .single();

    if (data) {
      const p = data as Product;
      setForm({
        slug: p.slug,
        base_price: p.base_price.toString(),
        category: p.category,
        origin: p.origin as "india" | "thailand",
        material: p.material || "",
        care: p.care || "",
        sizes: p.sizes.join(","),
        stock: JSON.stringify(p.stock),
        tags: p.tags.join(","),
        is_active: p.is_active,
        is_featured: p.is_featured,
        translations: p.translations || {},
        images: p.images || [],
      });
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);

    const sizes = form.sizes.split(",").map((s) => s.trim()).filter(Boolean);
    let stock: Record<string, number> = {};
    try {
      stock = JSON.parse(form.stock);
    } catch {
      sizes.forEach((s) => { stock[s] = 10; });
    }

    const payload = {
      slug: form.slug,
      base_price: parseFloat(form.base_price),
      category: form.category,
      origin: form.origin,
      material: form.material || null,
      care: form.care || null,
      sizes,
      stock,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      is_active: form.is_active,
      is_featured: form.is_featured,
      translations: form.translations,
      images: form.images,
      cover_image: form.images[0] || null,
    };

    if (isNew) {
      await supabase.from("products").insert(payload);
    } else {
      await supabase.from("products").update(payload).eq("id", params.id);
    }

    setSaving(false);
    router.push("/admin/products");
  };

  const updateTranslation = (locale: string, field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      translations: {
        ...prev.translations,
        [locale]: {
          ...prev.translations[locale],
          [field]: value,
        },
      },
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-8 h-8 animate-spin text-saffron-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/products"
            className="p-2 rounded-lg hover:bg-indra-100 text-indra-500 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold font-display text-indra-900">
            {isNew ? "Nuevo Producto" : "Editar Producto"}
          </h1>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className={cn(
            "flex items-center gap-2 px-5 py-2.5 bg-indra-900 text-white",
            "rounded-xl font-medium hover:bg-indra-800 transition-all disabled:opacity-50"
          )}
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          Guardar
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-white p-1.5 rounded-xl border border-indra-100 w-fit">
        {[
          { key: "basic" as const, label: "Básico", icon: Package },
          { key: "translations" as const, label: "Traducciones", icon: Globe },
          { key: "images" as const, label: "Imágenes", icon: Image },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
              activeTab === tab.key
                ? "bg-indra-900 text-white"
                : "text-indra-500 hover:text-indra-700 hover:bg-indra-50"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Basic Tab */}
      {activeTab === "basic" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-indra-100/50 p-6 space-y-6"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-indra-700 mb-2">
                Slug (URL)
              </label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full px-4 py-3 bg-indra-50 border border-indra-200 rounded-xl text-indra-900 focus:border-saffron-400 transition-all"
                placeholder="seda-thai-bordada"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-indra-700 mb-2">
                Precio Base (USD)
              </label>
              <input
                type="number"
                step="0.01"
                value={form.base_price}
                onChange={(e) => setForm({ ...form, base_price: e.target.value })}
                className="w-full px-4 py-3 bg-indra-50 border border-indra-200 rounded-xl text-indra-900 focus:border-saffron-400 transition-all"
                placeholder="189.00"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-indra-700 mb-2">
                Origen
              </label>
              <select
                value={form.origin}
                onChange={(e) => setForm({ ...form, origin: e.target.value as "india" | "thailand" })}
                className="w-full px-4 py-3 bg-indra-50 border border-indra-200 rounded-xl text-indra-900 focus:border-saffron-400 transition-all"
              >
                <option value="india">India</option>
                <option value="thailand">Tailandia</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-indra-700 mb-2">
                Categoría
              </label>
              <input
                type="text"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-3 bg-indra-50 border border-indra-200 rounded-xl text-indra-900 focus:border-saffron-400 transition-all"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-indra-700 mb-2">
                Tallas (separadas por coma)
              </label>
              <input
                type="text"
                value={form.sizes}
                onChange={(e) => setForm({ ...form, sizes: e.target.value })}
                className="w-full px-4 py-3 bg-indra-50 border border-indra-200 rounded-xl text-indra-900 focus:border-saffron-400 transition-all"
                placeholder="S,M,L,XL"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-indra-700 mb-2">
                Stock (JSON)
              </label>
              <input
                type="text"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className="w-full px-4 py-3 bg-indra-50 border border-indra-200 rounded-xl text-indra-900 focus:border-saffron-400 transition-all"
                placeholder='{"S":5,"M":3,"L":0}'
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-indra-700 mb-2">
              Material
            </label>
            <input
              type="text"
              value={form.material}
              onChange={(e) => setForm({ ...form, material: e.target.value })}
              className="w-full px-4 py-3 bg-indra-50 border border-indra-200 rounded-xl text-indra-900 focus:border-saffron-400 transition-all"
              placeholder="100% Seda natural"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-indra-700 mb-2">
              Cuidados
            </label>
            <textarea
              value={form.care}
              onChange={(e) => setForm({ ...form, care: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-indra-50 border border-indra-200 rounded-xl text-indra-900 focus:border-saffron-400 transition-all resize-none"
              placeholder="Instrucciones de cuidado..."
            />
          </div>

          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                className="w-4 h-4 rounded border-indra-300 text-saffron-600 focus:ring-saffron-500"
              />
              <span className="text-sm text-indra-700">Activo</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.is_featured}
                onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
                className="w-4 h-4 rounded border-indra-300 text-saffron-600 focus:ring-saffron-500"
              />
              <span className="text-sm text-indra-700">Destacado</span>
            </label>
          </div>
        </motion.div>
      )}

      {/* Translations Tab */}
      {activeTab === "translations" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Locale Selector */}
          <div className="flex gap-2 flex-wrap">
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => setActiveLocale(locale)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                  activeLocale === locale
                    ? "bg-saffron-600 text-white"
                    : "bg-white text-indra-500 hover:text-indra-700 border border-indra-200"
                )}
              >
                {localeNames[locale]}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-indra-100/50 p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-indra-700 mb-2">
                Título ({localeNames[activeLocale]})
              </label>
              <input
                type="text"
                value={form.translations[activeLocale]?.title || ""}
                onChange={(e) => updateTranslation(activeLocale, "title", e.target.value)}
                className="w-full px-4 py-3 bg-indra-50 border border-indra-200 rounded-xl text-indra-900 focus:border-saffron-400 transition-all"
                placeholder="Título del producto"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-indra-700 mb-2">
                Descripción ({localeNames[activeLocale]})
              </label>
              <textarea
                value={form.translations[activeLocale]?.description || ""}
                onChange={(e) => updateTranslation(activeLocale, "description", e.target.value)}
                rows={6}
                className="w-full px-4 py-3 bg-indra-50 border border-indra-200 rounded-xl text-indra-900 focus:border-saffron-400 transition-all resize-none"
                placeholder="Descripción del producto..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-indra-700 mb-2">
                Material ({localeNames[activeLocale]})
              </label>
              <input
                type="text"
                value={form.translations[activeLocale]?.material || ""}
                onChange={(e) => updateTranslation(activeLocale, "material", e.target.value)}
                className="w-full px-4 py-3 bg-indra-50 border border-indra-200 rounded-xl text-indra-900 focus:border-saffron-400 transition-all"
                placeholder="Descripción del material"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-indra-700 mb-2">
                Cuidados ({localeNames[activeLocale]})
              </label>
              <textarea
                value={form.translations[activeLocale]?.care || ""}
                onChange={(e) => updateTranslation(activeLocale, "care", e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-indra-50 border border-indra-200 rounded-xl text-indra-900 focus:border-saffron-400 transition-all resize-none"
                placeholder="Instrucciones de cuidado..."
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Images Tab */}
      {activeTab === "images" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-indra-100/50 p-6"
        >
          <div>
            <label className="block text-sm font-medium text-indra-700 mb-2">
              URLs de Imágenes (una por línea)
            </label>
            <textarea
              value={form.images.join("\n")}
              onChange={(e) =>
                setForm({
                  ...form,
                  images: e.target.value.split("\n").filter(Boolean),
                })
              }
              rows={8}
              className="w-full px-4 py-3 bg-indra-50 border border-indra-200 rounded-xl text-indra-900 focus:border-saffron-400 transition-all resize-none font-mono text-sm"
              placeholder={`https://supabase.co/storage/v1/object/public/product-images/image1.jpg\nhttps://supabase.co/storage/v1/object/public/product-images/image2.jpg`}
            />
          </div>

          {form.images.length > 0 && (
            <div className="mt-6 grid grid-cols-4 gap-4">
              {form.images.map((img, i) => (
                <div key={i} className="aspect-square rounded-xl bg-indra-100 overflow-hidden">
                  {img && (
                    <img
                      src={img}
                      alt={`Preview ${i + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
