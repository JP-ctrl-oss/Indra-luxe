import { Inter, Playfair_Display } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { locales, type Locale } from "@/lib/i18n";
import { AuthProvider } from "@/hooks/useAuth";
import { CartProvider } from "@/hooks/useCart";
import { CurrencyProvider } from "@/hooks/useCurrency";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/shop/CartDrawer";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: LocaleLayoutProps) {
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-gradient-to-b from-indra-50 via-amber-50/30 to-saffron-50/20">
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
          timeZone="Europe/Madrid"
        >
          <AuthProvider>
            <CurrencyProvider>
              <CartProvider>
                <div className="flex flex-col min-h-screen">
                  <Navbar locale={locale} />
                  <CartDrawer />
                  <main className="flex-grow">{children}</main>
                  <Footer />
                </div>
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 3000,
                    style: {
                      background: "#2d1f14",
                      color: "#fdf8f0",
                      fontFamily: "var(--font-inter)",
                      border: "1px solid rgba(212, 169, 106, 0.3)",
                    },
                    success: {
                      iconTheme: {
                        primary: "#d4a96a",
                        secondary: "#2d1f14",
                      },
                    },
                    error: {
                      iconTheme: {
                        primary: "#dc2626",
                        secondary: "#fdf8f0",
                      },
                    },
                  }}
                />
              </CartProvider>
            </CurrencyProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
