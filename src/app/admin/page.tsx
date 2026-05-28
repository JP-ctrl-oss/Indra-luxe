"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  DollarSign,
  Package,
  Clock,
  TrendingUp,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  pendingOrders: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    pendingOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchStats = async () => {
      const isMockMode = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder");

      if (isMockMode) {
        setStats({
          totalOrders: 142,
          totalRevenue: 12450.00,
          totalProducts: 6,
          pendingOrders: 5,
        });
        setRecentOrders([
          {
            id: "order_mock1",
            customer_name: "María López",
            customer_email: "maria@example.com",
            total: 370.00,
            status: "pending",
            created_at: new Date().toISOString(),
          },
          {
            id: "order_mock2",
            customer_name: "Jean-Pierre",
            customer_email: "jp@example.com",
            total: 120.00,
            status: "confirmed",
            created_at: new Date().toISOString(),
          },
          {
            id: "order_mock3",
            customer_name: "Elena Schmidt",
            customer_email: "elena@example.com",
            total: 250.00,
            status: "completed",
            created_at: new Date().toISOString(),
          },
        ]);
        return;
      }

      try {
        // Total orders
        const { count: ordersCount } = await supabase
          .from("orders")
          .select("*", { count: "exact", head: true });

        // Total revenue
        const { data: revenueData } = await supabase
          .from("orders")
          .select("total")
          .eq("payment_status", "succeeded");

        const totalRevenue =
          revenueData?.reduce((sum, o) => sum + (o.total || 0), 0) || 0;

        // Total products
        const { count: productsCount } = await supabase
          .from("products")
          .select("*", { count: "exact", head: true });

        // Pending orders
        const { count: pendingCount } = await supabase
          .from("orders")
          .select("*", { count: "exact", head: true })
          .eq("status", "pending");

        setStats({
          totalOrders: ordersCount || 0,
          totalRevenue,
          totalProducts: productsCount || 0,
          pendingOrders: pendingCount || 0,
        });

        // Recent orders
        const { data: orders } = await supabase
          .from("orders")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5);

        setRecentOrders(orders || []);
      } catch (err) {
        console.error("Supabase stats error, falling back to mock:", err);
      }
    };

    fetchStats();
  }, [supabase]);

  const statCards = [
    {
      label: "Pedidos Totales",
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: "text-saffron-600 bg-saffron-50",
    },
    {
      label: "Ingresos Totales",
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      label: "Productos",
      value: stats.totalProducts,
      icon: Package,
      color: "text-indigo-600 bg-indigo-50",
    },
    {
      label: "Pedidos Pendientes",
      value: stats.pendingOrders,
      icon: Clock,
      color: "text-amber-600 bg-amber-50",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-display text-indra-900">
          Dashboard
        </h1>
        <p className="text-indra-500 mt-1">
          Resumen de tu tienda Indra Luxe
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-indra-100/50"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-bold text-indra-900">{stat.value}</p>
            <p className="text-sm text-indra-500 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm border border-indra-100/50">
        <div className="p-6 border-b border-indra-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-indra-900">
            Pedidos Recientes
          </h2>
          <Link
            href="/admin/orders"
            className="text-sm text-saffron-600 hover:text-saffron-700 font-medium"
          >
            Ver todos
          </Link>
        </div>
        <div className="divide-y divide-indra-50">
          {recentOrders.length === 0 ? (
            <div className="p-8 text-center text-indra-400">
              No hay pedidos aún
            </div>
          ) : (
            recentOrders.map((order) => (
              <div
                key={order.id}
                className="p-4 flex items-center justify-between hover:bg-indra-50/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-indra-100 flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4 text-indra-600" />
                  </div>
                  <div>
                    <p className="font-medium text-indra-900 text-sm">
                      #{order.id.slice(0, 8)}
                    </p>
                    <p className="text-xs text-indra-400">
                      {order.customer_name || order.customer_email}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-indra-900">
                    ${order.total?.toFixed(2)}
                  </p>
                  <span
                    className={cn(
                      "text-xs px-2 py-0.5 rounded-full",
                      order.status === "pending"
                        ? "bg-amber-50 text-amber-600"
                        : order.status === "confirmed"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-indra-50 text-indra-600"
                    )}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
