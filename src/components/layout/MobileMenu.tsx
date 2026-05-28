"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Crown, LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { href: string; label: string; exact: boolean }[];
  locale: Locale;
}

export default function MobileMenu({
  isOpen,
  onClose,
  navLinks,
  locale,
}: MobileMenuProps) {
  const { user, isAdmin, signOut } = useAuth();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-indra-950/40 backdrop-blur-sm z-50"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-80 max-w-full bg-white shadow-2xl z-50"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-indra-100">
                <div className="flex items-center gap-3">
                  <Crown className="w-6 h-6 text-saffron-500" />
                  <span className="text-lg font-bold font-display text-indra-900">
                    INDRA Luxe
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-indra-50 transition-colors"
                >
                  <X className="w-5 h-5 text-indra-600" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 py-6 px-4">
                <div className="space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className={cn(
                          "block px-4 py-3 rounded-xl text-base font-medium transition-all",
                          "hover:bg-saffron-50 hover:text-saffron-700",
                          "text-indra-700"
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {isAdmin && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-4 pt-4 border-t border-indra-100"
                  >
                    <Link
                      href="/admin"
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl",
                        "text-sm font-medium text-indra-600 hover:bg-indra-50",
                        "transition-all"
                      )}
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Panel de Administración
                    </Link>
                  </motion.div>
                )}
              </nav>

              {/* Footer */}
              <div className="p-6 border-t border-indra-100 bg-indra-50/30">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 px-4 py-2">
                      <div className="w-8 h-8 rounded-full bg-saffron-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-saffron-700">
                          {user.email?.[0].toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm text-indra-700 truncate">
                        {user.email}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        signOut();
                        onClose();
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl",
                        "text-sm font-medium text-red-600 hover:bg-red-50",
                        "transition-all"
                      )}
                    >
                      <LogOut className="w-4 h-4" />
                      Cerrar Sesión
                    </button>
                  </div>
                ) : (
                  <p className="text-xs text-center text-indra-400">
                    Indra Luxe — Arte que viste el alma
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
