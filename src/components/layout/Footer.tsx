"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Crown, Mail, MapPin, Phone, Instagram, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

export default function Footer() {
  const locale = useLocale() as Locale;
  const t = useTranslations("home");

  const footerLinks = {
    shop: [
      { href: `/${locale}/shop`, label: "Todos los productos" },
      { href: `/${locale}/shop?origin=india`, label: "Colección India" },
      { href: `/${locale}/shop?origin=thailand`, label: "Colección Tailandia" },
      { href: `/${locale}/shop?featured=true`, label: "Piezas destacadas" },
    ],
    company: [
      { href: `/${locale}/process`, label: "Nuestro Proceso" },
      { href: "#", label: "Sobre Nosotros" },
      { href: "#", label: "Sostenibilidad" },
      { href: "#", label: "Comercio Justo" },
    ],
    support: [
      { href: "#", label: "Contacto" },
      { href: "#", label: "Envíos y Devoluciones" },
      { href: "#", label: "Preguntas Frecuentes" },
      { href: "#", label: "Términos y Condiciones" },
    ],
  };

  return (
    <footer className="bg-indra-950 text-indra-100 relative overflow-hidden">
      {/* Decorative top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-saffron-500/50 to-transparent" />

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a96a' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href={`/${locale}`} className="flex items-center gap-3 mb-6">
              <Crown className="w-8 h-8 text-saffron-400" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold font-display text-white tracking-wide">
                  INDRA
                </span>
                <span className="text-[0.65rem] uppercase tracking-[0.3em] text-saffron-400 -mt-1">
                  Luxe
                </span>
              </div>
            </Link>
            <p className="text-indra-300 text-sm leading-relaxed mb-6 max-w-xs">
              Ropa artesanal de lujo importada de India y Tailandia. Cada pieza
              cuenta una historia de tradición y maestría.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-indra-300">
                <MapPin className="w-4 h-4 text-saffron-400 flex-shrink-0" />
                <span>Madrid, España</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-indra-300">
                <Mail className="w-4 h-4 text-saffron-400 flex-shrink-0" />
                <span>hola@indra-luxe.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-indra-300">
                <Phone className="w-4 h-4 text-saffron-400 flex-shrink-0" />
                <span>+34 612 345 678</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Tienda
            </h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-indra-300 hover:text-saffron-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Empresa
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-indra-300 hover:text-saffron-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Soporte
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-indra-300 hover:text-saffron-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 pt-12 border-t border-indra-800">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-lg font-semibold text-white mb-2">
              {t("newsletterTitle")}
            </h3>
            <p className="text-sm text-indra-300 mb-6">
              {t("newsletterSubtitle")}
            </p>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indra-400" />
                <input
                  type="email"
                  placeholder={t("newsletterPlaceholder")}
                  className={cn(
                    "w-full pl-10 pr-4 py-3 bg-indra-900/50 border border-indra-700",
                    "rounded-xl text-sm text-white placeholder:text-indra-400",
                    "focus:border-saffron-500 focus:ring-1 focus:ring-saffron-500/30",
                    "transition-all"
                  )}
                />
              </div>
              <button
                className={cn(
                  "px-6 py-3 bg-saffron-600 text-white text-sm font-medium rounded-xl",
                  "hover:bg-saffron-500 transition-all btn-lift flex items-center gap-2"
                )}
              >
                {t("newsletterButton")}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-indra-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-indra-400">
            &copy; {new Date().getFullYear()} Indra Luxe. Todos los derechos
            reservados.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-indra-400">
              Envío mundial | Pago seguro
            </span>
            <div className="flex items-center gap-3">
              <Instagram className="w-4 h-4 text-indra-400 hover:text-saffron-400 cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
