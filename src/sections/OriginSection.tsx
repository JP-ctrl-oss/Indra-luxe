"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function OriginSection() {
  const t = useTranslations("home");

  const origins = [
    {
      title: t("indiaTitle"),
      description: t("indiaDescription"),
      image:
        "https://images.unsplash.com/photo-1610189012906-4e9b1d5808bb?w=800&q=80",
      color: "from-orange-500/20 to-red-500/10",
      accent: "border-orange-300/30",
    },
    {
      title: t("thailandTitle"),
      description: t("thailandDescription"),
      image:
        "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80",
      color: "from-emerald-500/20 to-teal-500/10",
      accent: "border-emerald-300/30",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-indra-50/50 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-saffron-600 text-sm font-semibold uppercase tracking-wider">
            Origen
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold font-display text-indra-900">
            {t("categoriesTitle")}
          </h2>
          <p className="mt-4 text-indra-500 max-w-xl mx-auto">
            {t("categoriesSubtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {origins.map((origin, index) => (
            <motion.div
              key={origin.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className={cn(
                "group relative rounded-3xl overflow-hidden",
                "border-2 bg-gradient-to-br",
                origin.color,
                origin.accent
              )}
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={origin.image}
                  alt={origin.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indra-950/70 via-indra-950/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-3xl font-bold font-display text-white mb-2">
                    {origin.title}
                  </h3>
                  <p className="text-indra-200 text-sm leading-relaxed max-w-sm">
                    {origin.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
