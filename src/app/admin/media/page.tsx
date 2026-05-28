"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Upload, ImageIcon, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Note: This is a simplified media library.
// In production, integrate with Supabase Storage for actual uploads.
export default function AdminMedia() {
  const [images, setImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1610189012906-4e9b1d5808bb?w=400&q=80",
    "https://images.unsplash.com/photo-1606293926075-69a00febf780?w=400&q=80",
    "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&q=80",
    "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80",
  ]);
  const [copied, setCopied] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    // In production: upload to Supabase Storage
    // For demo, just show alert
    alert("En producción: las imágenes se subirían a Supabase Storage");
  }, []);

  const copyUrl = (url: string, index: number) => {
    navigator.clipboard.writeText(url);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-indra-900">
          Biblioteca de Medios
        </h1>
        <p className="text-indra-500 mt-1">
          Gestiona las imágenes de tus productos
        </p>
      </div>

      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-2xl p-12 text-center transition-all",
          dragOver
            ? "border-saffron-500 bg-saffron-50"
            : "border-indra-200 bg-white hover:border-indra-300"
        )}
      >
        <Upload className="w-12 h-12 text-indra-300 mx-auto mb-4" />
        <p className="text-lg font-medium text-indra-700 mb-2">
          Arrastra imágenes aquí
        </p>
        <p className="text-sm text-indra-400">
          o haz clic para seleccionar archivos
        </p>
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={() =>
            alert("En producción: las imágenes se subirían a Supabase Storage")
          }
        />
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((url, index) => (
          <motion.div
            key={url}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="group relative aspect-square rounded-xl overflow-hidden bg-indra-100"
          >
            <img
              src={url}
              alt={`Media ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-indra-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                onClick={() => copyUrl(url, index)}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
              >
                {copied === index ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
