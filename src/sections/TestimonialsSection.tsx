"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TestimonialsSection() {
  const t = useTranslations("home");

  const testimonials = [
    {
      name: "María García",
      location: "Madrid, España",
      text: "La calidad de la seda es excepcional. Se nota que es trabajo artesanal auténtico. El bordado es simplemente espectacular.",
      rating: 5,
      avatar: "M",
    },
    {
      name: "Emma Thompson",
      location: "London, UK",
      text: "I've ordered three pieces and each one is unique. The shipping was fast and the packaging was beautiful. Highly recommended!",
      rating: 5,
      avatar: "E",
    },
    {
      name: "Sophie Martin",
      location: "Paris, France",
      text: "Un service impeccable et des vêtements d'une qualité rare. On sent l'amour du métier dans chaque détail.",
      rating: 5,
      avatar: "S",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-indra-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-saffron-600 text-sm font-semibold uppercase tracking-wider">
            Testimonios
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold font-display text-indra-900">
            {t("testimonialsTitle")}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className={cn(
                "relative bg-white rounded-2xl p-8 shadow-luxury-sm",
                "hover:shadow-luxury transition-shadow duration-500"
              )}
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-saffron-100" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-saffron-400 text-saffron-400"
                  />
                ))}
              </div>

              <p className="text-indra-600 leading-relaxed mb-6 text-sm">
                “{testimonial.text}”
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indra-900 flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-indra-900 text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-indra-400">
                    {testimonial.location}
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
