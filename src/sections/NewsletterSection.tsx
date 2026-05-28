"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Send, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NewsletterSection() {
  const t = useTranslations("home");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-indra-900" />
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a96a' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-saffron-400 text-sm font-semibold uppercase tracking-wider">
            Newsletter
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold font-display text-white">
            {t("newsletterTitle")}
          </h2>
          <p className="mt-4 text-indra-300 max-w-xl mx-auto">
            {t("newsletterSubtitle")}
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 flex items-center justify-center gap-3 text-emerald-400"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <span className="text-lg font-medium">
                ¡Gracias por suscribirte!
              </span>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
            >
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("newsletterPlaceholder")}
                  required
                  className={cn(
                    "w-full px-6 py-4 bg-white/10 border border-indra-700",
                    "rounded-xl text-white placeholder:text-indra-400",
                    "focus:border-saffron-500 focus:ring-2 focus:ring-saffron-500/20",
                    "transition-all"
                  )}
                />
              </div>
              <button
                type="submit"
                className={cn(
                  "flex items-center justify-center gap-2 px-8 py-4",
                  "bg-saffron-500 text-white font-medium rounded-xl",
                  "hover:bg-saffron-400 transition-all btn-lift"
                )}
              >
                {t("newsletterButton")}
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
