import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { redirect } from "next/navigation";
import AdminLayout from "./AdminLayout";

export const metadata = {
  title: "Panel de Administración | Indra Luxe",
};

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const adminEmail = process.env.ADMIN_EMAIL || "admin@indra-luxe.com";
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY;
  const isMockMode = !SUPABASE_URL || SUPABASE_URL.includes("placeholder");

  if (isMockMode) {
    const hasMockSession = cookieStore.get("indra-luxe-admin-session")?.value === "active";
    if (!hasMockSession) {
      redirect("/admin/login");
    }
    const mockUser = {
      id: "mock-admin-id",
      email: adminEmail,
      aud: "authenticated",
      role: "authenticated",
      created_at: new Date().toISOString(),
      app_metadata: {},
      user_metadata: {},
    };
    return <AdminLayout user={mockUser as any}>{children}</AdminLayout>;
  }

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    redirect("/admin/login");
  }

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
    },
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If not authenticated, redirect to login
  if (!session) {
    redirect("/admin/login");
  }

  // If authenticated but not admin, redirect to home
  if (session.user.email !== adminEmail) {
    redirect("/");
  }

  return <AdminLayout user={session.user}>{children}</AdminLayout>;
}
