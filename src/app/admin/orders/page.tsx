"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Order, type OrderStatus } from "@/types/order";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Search,
  Loader2,
  ChevronDown,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  pending: "bg-amber-50 text-amber-600",
  confirmed: "bg-emerald-50 text-emerald-600",
  processing: "bg-blue-50 text-blue-600",
  shipped: "bg-indigo-50 text-indigo-600",
  delivered: "bg-green-50 text-green-600",
  cancelled: "bg-red-50 text-red-600",
  refunded: "bg-gray-50 text-gray-600",
};

const paymentStatusColors: Record<string, string> = {
  pending: "bg-amber-50 text-amber-600",
  succeeded: "bg-emerald-50 text-emerald-600",
  failed: "bg-red-50 text-red-600",
  refunded: "bg-gray-50 text-gray-600",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const supabase = createClient();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    let query = supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (statusFilter) {
      query = query.eq("status", statusFilter);
    }

    const { data, error } = await query;

    if (!error && data) {
      setOrders(data);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: OrderStatus) => {
    await supabase.from("orders").update({ status }).eq("id", id);
    setOrders(
      orders.map((o) => (o.id === id ? { ...o, status } : o))
    );
  };

  const filteredOrders = orders.filter(
    (o) =>
      o.customer_email?.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-indra-900">
          Pedidos
        </h1>
        <p className="text-indra-500 mt-1">Gestiona los pedidos de tus clientes</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-indra-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar pedidos..."
            className={cn(
              "w-full pl-11 pr-4 py-3 bg-white border border-indra-200",
              "rounded-xl text-indra-900 placeholder:text-indra-400",
              "focus:border-saffron-400 focus:ring-2 focus:ring-saffron-400/20",
              "transition-all"
            )}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setLoading(true);
            setTimeout(() => fetchOrders(), 0);
          }}
          className="px-4 py-3 bg-white border border-indra-200 rounded-xl text-indra-700 focus:border-saffron-400 transition-all"
        >
          <option value="">Todos los estados</option>
          <option value="pending">Pendiente</option>
          <option value="confirmed">Confirmado</option>
          <option value="processing">En proceso</option>
          <option value="shipped">Enviado</option>
          <option value="delivered">Entregado</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-indra-100/50 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-saffron-500" />
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <ShoppingCart className="w-12 h-12 text-indra-200 mb-4" />
            <p className="text-indra-500 font-medium">No hay pedidos</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-indra-100">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-indra-500 uppercase tracking-wider">
                    Pedido
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-indra-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-indra-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-indra-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-indra-500 uppercase tracking-wider">
                    Pago
                  </th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-indra-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indra-50">
                {filteredOrders.map((order, index) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="hover:bg-indra-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-indra-900">
                        #{order.id.slice(0, 8)}
                      </span>
                      <p className="text-xs text-indra-400 mt-1">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-indra-900">
                        {order.customer_name || "N/A"}
                      </p>
                      <p className="text-xs text-indra-400">
                        {order.customer_email}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-indra-900">
                        ${order.total?.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative">
                        <select
                          value={order.status}
                          onChange={(e) => updateStatus(order.id, e.target.value as OrderStatus)}
                          className={cn(
                            "text-xs px-3 py-1.5 rounded-full border-0 cursor-pointer font-medium appearance-none pr-7",
                            statusColors[order.status] || "bg-gray-50 text-gray-600"
                          )}
                        >
                          <option value="pending">Pendiente</option>
                          <option value="confirmed">Confirmado</option>
                          <option value="processing">En proceso</option>
                          <option value="shipped">Enviado</option>
                          <option value="delivered">Entregado</option>
                          <option value="cancelled">Cancelado</option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none text-indra-400" />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "text-xs px-2 py-1 rounded-full",
                          paymentStatusColors[order.payment_status] || "bg-gray-50 text-gray-600"
                        )}
                      >
                        {order.payment_status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 rounded-lg hover:bg-indra-100 text-indra-500 hover:text-indra-700 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
