"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { mockProducts } from "@/lib/mockProducts";
import { Product } from "@/types/product";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Package,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { cn, getTranslation } from "@/lib/utils";

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const isMockMode = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder");

    if (isMockMode) {
      setProducts(mockProducts);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        setProducts(data);
      } else {
        setProducts(mockProducts);
      }
    } catch (e) {
      setProducts(mockProducts);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;

    setDeleting(id);
    await supabase.from("products").delete().eq("id", id);
    setProducts(products.filter((p) => p.id !== id));
    setDeleting(null);
  };

  const filteredProducts = products.filter((p) => {
    const searchLower = search.toLowerCase();
    return (
      p.slug.toLowerCase().includes(searchLower) ||
      Object.values(p.translations).some((t: any) =>
        t.title?.toLowerCase().includes(searchLower)
      )
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-indra-900">
            Productos
          </h1>
          <p className="text-indra-500 mt-1">
            Gestiona tu catálogo de productos
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className={cn(
            "flex items-center gap-2 px-5 py-2.5 bg-indra-900 text-white",
            "rounded-xl font-medium hover:bg-indra-800 transition-all"
          )}
        >
          <Plus className="w-4 h-4" />
          Nuevo Producto
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-indra-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar productos..."
          className={cn(
            "w-full pl-11 pr-4 py-3 bg-white border border-indra-200",
            "rounded-xl text-indra-900 placeholder:text-indra-400",
            "focus:border-saffron-400 focus:ring-2 focus:ring-saffron-400/20",
            "transition-all"
          )}
        />
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-indra-100/50 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-saffron-500" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Package className="w-12 h-12 text-indra-200 mb-4" />
            <p className="text-indra-500 font-medium">
              {search ? "No se encontraron productos" : "No hay productos aún"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-indra-100">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-indra-500 uppercase tracking-wider">
                    Producto
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-indra-500 uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-indra-500 uppercase tracking-wider">
                    Origen
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-indra-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-indra-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indra-50">
                {filteredProducts.map((product, index) => {
                  const translation = getTranslation(
                    product.translations,
                    "es"
                  );
                  return (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-indra-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-indra-100 flex items-center justify-center text-sm">
                            {product.origin === "india" ? "🇮🇳" : "🇹🇭"}
                          </div>
                          <div>
                            <p className="font-medium text-indra-900 text-sm">
                              {translation.title || product.slug}
                            </p>
                            <p className="text-xs text-indra-400">
                              {product.slug}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-indra-900">
                        ${product.base_price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={cn(
                            "text-xs px-2 py-1 rounded-full capitalize",
                            product.origin === "india"
                              ? "bg-orange-50 text-orange-600"
                              : "bg-emerald-50 text-emerald-600"
                          )}
                        >
                          {product.origin}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={cn(
                            "text-xs px-2 py-1 rounded-full",
                            product.is_active
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-red-50 text-red-600"
                          )}
                        >
                          {product.is_active ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/products/${product.id}`}
                            className="p-2 rounded-lg hover:bg-indra-100 text-indra-500 hover:text-indra-700 transition-colors"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(product.id)}
                            disabled={deleting === product.id}
                            className="p-2 rounded-lg hover:bg-red-50 text-indra-500 hover:text-red-600 transition-colors"
                          >
                            {deleting === product.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
