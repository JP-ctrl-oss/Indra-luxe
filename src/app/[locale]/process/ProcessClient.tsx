"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  MapPin,
  Leaf,
  Hand,
  Heart,
  CheckCircle,
  Truck,
  ArrowDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const processSteps = [
  {
    icon: MapPin,
    key: "section1",
    image: "https://images.unsplash.com/photo-1606293926075-69a00febf780?w=800&q=80",
    color: "from-amber-500/20 to-orange-500/10",
    iconBg: "bg-amber-50 text-amber-600",
  },
  {
    icon: Leaf,
    key: "section2",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80",
    color: "from-emerald-500/20 to-green-500/10",
    iconBg: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Hand,
    key: "section3",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&q=80",
    color: "from-saffron-500/20 to-amber-500/10",
    iconBg: "bg-saffron-50 text-saffron-600",
  },
  {
    icon: Heart,
    key: "section4",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    color: "from-rose-500/20 to-pink-500/10",
    iconBg: "bg-rose-50 text-rose-600",
  },
  {
    icon: CheckCircle,
    key: "section5",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    color: "from-indigo-500/20 to-blue-500/10",
    iconBg: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: Truck,
    key: "section6",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
    color: "from-sky-500/20 to-cyan-500/10",
    iconBg: "bg-sky-50 text-sky-600",
  },
];

export default function ProcessClient() {
  const t = useTranslations("process");

  return (
    <div className="min-h-screen pt-28 pb-16">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden mb-24">
        <div className="absolute inset-0 bg-indra-900">
          <Image
            src="https://images.unsplash.com/photo-1610189012906-4e9b1d5808bb?w=1200&q=80"
            alt="Proceso artesanal"
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-indra-950 via-indra-950/50 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-saffron-400 text-sm font-semibold uppercase tracking-wider"
          >
            Indra Luxe
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-5xl sm:text-6xl lg:text-7xl font-bold font-display text-white leading-tight"
          >
            {t("title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-xl text-indra-200 max-w-2xl mx-auto leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12"
          >
            <ArrowDown className="w-6 h-6 text-saffron-400 mx-auto animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* Process Steps */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-32">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={cn(
                  "grid lg:grid-cols-2 gap-12 lg:gap-16 items-center",
                  !isEven && "lg:direction-rtl"
                )}
              >
                {/* Image */}
                <div className={cn(!isEven && "lg:order-2")}>
                  <div
                    className={cn(
                      "relative aspect-[4/3] rounded-3xl overflow-hidden shadow-luxury",
                      "bg-gradient-to-br",
                      step.color
                    )}
                  >
                    <Image
                      src={step.image}
                      alt={t(`${step.key}Title`)}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-indra-950/30 to-transparent" />
                  </div>
                </div>

                {/* Content */}
                <div className={cn(!isEven && "lg:order-1")}>
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center",
                        step.iconBg
                      )}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-5xl font-bold text-indra-100 font-display">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h2 className="text-3xl font-bold font-display text-indra-900 mb-4">
                    {t(`${step.key}Title`)}
                  </h2>
                  <p className="text-indra-600 leading-relaxed text-lg">
                    {t(`${step.key}Text`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-32 py-16 bg-gradient-to-r from-saffron-50 via-amber-50 to-saffron-50 rounded-3xl"
        >
          <h3 className="text-3xl font-bold font-display text-indra-900 mb-4">
            ¿Listo para vestir arte?
          </h3>
          <p className="text-indra-600 mb-8 max-w-lg mx-auto">
            Explora nuestra colección de piezas únicas elaboradas a mano.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
