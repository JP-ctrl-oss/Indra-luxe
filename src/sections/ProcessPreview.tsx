"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Hand, Leaf, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProcessPreviewProps {
  locale: string;
}

export default function ProcessPreview({ locale }: ProcessPreviewProps) {
  const steps = [
    {
      icon: Leaf,
      title: "Selección de Materiales",
      description: "Seda natural, algodón orgánico y tintes vegetales",
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      icon: Hand,
      title: "Arte y Maestría",
      description: "Técnicas transmitidas durante siglos",
      color: "text-saffron-600 bg-saffron-50",
    },
    {
      icon: Truck,
      title: "Envío Mundial",
      description: "Más de 50 países con seguimiento completo",
      color: "text-indra-600 bg-indra-50",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-luxury">
              <Image
                src="https://images.unsplash.com/photo-1606293926075-69a00febf780?w=800&q=80"
                alt="Artesano trabajando"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indra-950/40 to-transparent" />
            </div>
            {/* Floating card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -right-8 bg-white rounded-2xl p-6 shadow-luxury max-w-xs"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-saffron-100 flex items-center justify-center">
                  <Hand className="w-5 h-5 text-saffron-600" />
                </div>
                <div>
                  <p className="font-semibold text-indra-900">Artesanal</p>
                  <p className="text-xs text-indra-400">100% Hecho a mano</p>
                </div>
              </div>
              <p className="text-sm text-indra-600">
                Cada pieza es elaborada individualmente por maestros artesanos.
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <span className="text-saffron-600 text-sm font-semibold uppercase tracking-wider">
                Proceso
              </span>
              <h2 className="mt-3 text-4xl sm:text-5xl font-bold font-display text-indra-900 leading-tight">
                Del Corazón de{" "}
                <span className="text-saffron-600">Asia</span> a tu Guardarropa
              </h2>
              <p className="mt-6 text-indra-600 leading-relaxed text-lg">
                Descubre cómo cada pieza cobra vida a través de un proceso
                meticuloso que combina tradición milenaria con estándares
                modernos de calidad y sostenibilidad.
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-4">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                      step.color
                    )}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-indra-900">
                      {step.title}
                    </h3>
                    <p className="text-sm text-indra-500 mt-1">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              href={`/${locale}/process`}
              className={cn(
                "inline-flex items-center gap-2 px-8 py-4 bg-indra-900 text-white",
                "rounded-2xl font-medium hover:bg-indra-800 transition-all btn-lift"
              )}
            >
              Conoce nuestro proceso
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
