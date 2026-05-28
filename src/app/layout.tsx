import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Indra Luxe — Ropa de Lujo de India y Tailandia",
  description:
    "Descubre ropa artesanal de lujo importada de India y Tailandia. Piezas únicas elaboradas a mano por artesanos. Envío mundial.",
  keywords: [
    "ropa de lujo",
    "India",
    "Tailandia",
    "artesanal",
    "seda",
    "comercio justo",
    "moda sostenible",
  ],
  openGraph: {
    title: "Indra Luxe",
    description: "Arte que viste el alma",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
