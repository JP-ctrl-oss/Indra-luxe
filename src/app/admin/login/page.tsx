"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { Crown, Mail, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@indra-luxe.com";

    if (email !== adminEmail) {
      setError("Este correo no tiene acceso al panel de administración.");
      setLoading(false);
      return;
    }

    const isMockMode = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder");

    if (isMockMode) {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Set preview cookie
      document.cookie = "indra-luxe-admin-session=active; path=/";
      router.push("/admin");
      setLoading(false);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/admin`,
      },
    });

    if (signInError) {
      setError(signInError.message);
    } else {
      setMagicLinkSent(true);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-indra-950 flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-saffron-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indra-800/50 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-white/5 backdrop-blur-xl border border-indra-800 rounded-3xl p-8">
          {/* Brand */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-saffron-500/20 flex items-center justify-center mx-auto mb-4">
              <Crown className="w-8 h-8 text-saffron-400" />
            </div>
            <h1 className="text-2xl font-bold font-display text-white">
              Acceso Administrativo
            </h1>
            <p className="mt-2 text-sm text-indra-400">
              Este panel es exclusivo para administradores autorizados.
            </p>
          </div>

          {magicLinkSent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Enlace enviado
              </h3>
              <p className="text-sm text-indra-400">
                Revisa tu correo electrónico para acceder al panel.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-indra-300 mb-2">
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-indra-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="admin@indra-luxe.com"
                    className={cn(
                      "w-full pl-11 pr-4 py-3 bg-indra-900/50 border border-indra-700",
                      "rounded-xl text-white placeholder:text-indra-500",
                      "focus:border-saffron-500 focus:ring-2 focus:ring-saffron-500/20",
                      "transition-all"
                    )}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={cn(
                  "w-full flex items-center justify-center gap-2 py-3.5",
                  "bg-saffron-600 text-white font-medium rounded-xl",
                  "hover:bg-saffron-500 transition-all btn-lift disabled:opacity-50"
                )}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>Acceder con Email</>
                )}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
