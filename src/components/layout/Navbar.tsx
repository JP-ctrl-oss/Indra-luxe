"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import LocaleSwitcher from "./LocaleSwitcher";
import CurrencySwitcher from "./CurrencySwitcher";
import MobileMenu from "./MobileMenu";
import {
  ShoppingBag,
  Menu,
  X,
  Crown,
  LayoutDashboard,
  LogOut,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

interface NavbarProps {
  locale: string;
}

export default function Navbar({ locale }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const t = useTranslations("nav");
  const localeActive = useLocale() as Locale;
  const pathname = usePathname();
  const { user, isAdmin, signOut } = useAuth();
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: `/${localeActive}`, label: t("home"), exact: true },
    { href: `/${localeActive}/shop`, label: t("shop"), exact: false },
    { href: `/${localeActive}/process`, label: t("process"), exact: false },
  ];

  const isActive = (href: string, exact: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          scrolled
            ? "glass shadow-luxury-sm py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href={`/${localeActive}`}
              className="flex items-center gap-3 group"
            >
              <Crown className="w-7 h-7 text-saffron-500 group-hover:text-saffron-600 transition-colors" />
              <div className="flex flex-col">
                <span
                  className={cn(
                    "text-xl font-bold tracking-wide font-display",
                    "bg-gradient-to-r from-indra-900 via-indra-800 to-saffron-700",
                    "bg-clip-text text-transparent"
                  )}
                >
                  INDRA
                </span>
                <span className="text-[0.6rem] uppercase tracking-[0.3em] text-saffron-600 -mt-1">
                  Luxe
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg",
                    "hover:bg-indra-100/30",
                    isActive(link.href, link.exact)
                      ? "text-saffron-700"
                      : "text-indra-700 hover:text-indra-900"
                  )}
                >
                  {link.label}
                  {isActive(link.href, link.exact) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-saffron-400 rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-1">
              <div className="hidden md:flex items-center gap-1">
                <LocaleSwitcher />
                <CurrencySwitcher />
              </div>

              {isAdmin && (
                <Link
                  href="/admin"
                  className={cn(
                    "hidden md:flex items-center gap-2 px-3 py-2 rounded-lg",
                    "text-sm font-medium text-indra-700 hover:bg-indra-100/50",
                    "transition-all duration-300"
                  )}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="sr-only lg:not-sr-only">{t("admin")}</span>
                </Link>
              )}

              {user && (
                <button
                  onClick={() => signOut()}
                  className={cn(
                    "hidden md:flex items-center gap-2 px-3 py-2 rounded-lg",
                    "text-sm font-medium text-indra-700 hover:bg-indra-100/50",
                    "transition-all duration-300"
                  )}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}

              {/* Cart Button */}
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("open-cart"))}
                className={cn(
                  "relative flex items-center gap-2 px-3 py-2 rounded-lg",
                  "text-sm font-medium text-indra-700 hover:bg-indra-100/50",
                  "transition-all duration-300"
                )}
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span
                    className={cn(
                      "absolute -top-0.5 -right-0.5 w-5 h-5 flex items-center justify-center",
                      "bg-saffron-500 text-white text-[0.65rem] font-bold rounded-full",
                      "animate-scale-in"
                    )}
                  >
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 rounded-lg text-indra-700 hover:bg-indra-100/50 transition-all"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
        locale={localeActive}
      />
    </>
  );
}
