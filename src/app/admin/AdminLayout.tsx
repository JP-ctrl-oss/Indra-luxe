"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Image,
  LogOut,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  user: User;
  children: React.ReactNode;
}

export default function AdminLayout({ user, children }: AdminLayoutProps) {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/products", label: "Productos", icon: Package },
    { href: "/admin/orders", label: "Pedidos", icon: ShoppingCart },
    { href: "/admin/media", label: "Medios", icon: Image },
  ];

  return (
    <div className="min-h-screen bg-indra-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-indra-900 text-white flex-shrink-0 flex flex-col">
        {/* Brand */}
        <div className="p-6 border-b border-indra-800">
          <Link href="/admin" className="flex items-center gap-3">
            <Crown className="w-7 h-7 text-saffron-400" />
            <div>
              <span className="text-lg font-bold font-display">INDRA</span>
              <span className="text-xs text-saffron-400 ml-1">Admin</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  isActive
                    ? "bg-saffron-600 text-white"
                    : "text-indra-300 hover:bg-indra-800 hover:text-white"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-indra-800">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-saffron-600 flex items-center justify-center">
              <span className="text-sm font-semibold">
                {user.email?.[0].toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.email}</p>
              <p className="text-xs text-indra-400">Administrador</p>
            </div>
          </div>
          <form action="/api/auth/signout" method="post">
            <button
              type="submit"
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2 mt-2 rounded-xl",
                "text-sm text-indra-300 hover:bg-indra-800 hover:text-white transition-all"
              )}
            >
              <LogOut className="w-4 h-4" />
              Cerrar Sesión
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
