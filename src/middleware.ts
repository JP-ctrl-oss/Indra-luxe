import createMiddleware from "next-intl/middleware";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const locales = ["es", "en", "fr", "de", "hi", "th"];
const defaultLocale = "es";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
  localeDetection: true,
});

export async function middleware(request: NextRequest) {
  // 1. Ejecutar middleware de i18n primero
  const response = intlMiddleware(request);

  // 2. Crear cliente Supabase para manejar sesiones
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  // 3. Verificar sesion para proteccion de rutas admin
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 4. Proteger rutas /admin - solo admin_email puede acceder
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!session) {
      return NextResponse.redirect(
        new URL(
          `/${defaultLocale}/admin/login`,
          request.url
        )
      );
    }

    // Verificar que el email sea el del admin
    const adminEmail = process.env.ADMIN_EMAIL || "admin@indra-luxe.com";
    if (session.user.email !== adminEmail) {
      // Usuario autenticado pero no es admin -> redirigir a home
      return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
    }
  }

  // 5. Si esta en /admin/login y ya es admin autenticado, redirigir al dashboard
  if (request.nextUrl.pathname === "/admin/login" && session) {
    const adminEmail = process.env.ADMIN_EMAIL || "admin@indra-luxe.com";
    if (session.user.email === adminEmail) {
      return NextResponse.redirect(new URL(`/${defaultLocale}/admin`, request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
