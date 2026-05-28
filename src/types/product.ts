export type Locale = "es" | "en" | "fr" | "de" | "hi" | "th";

export interface ProductTranslation {
  title: string;
  description: string;
  material?: string;
  care?: string;
}

export interface Product {
  id: string;
  slug: string;
  base_price: number;
  sizes: string[];
  stock: Record<string, number>;
  category: string;
  tags: string[];
  images: string[];
  cover_image: string | null;
  translations: Record<Locale, ProductTranslation>;
  origin: "india" | "thailand";
  material: string | null;
  care: string | null;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductInput {
  slug: string;
  base_price: number;
  sizes: string[];
  stock: Record<string, number>;
  category: string;
  tags: string[];
  origin: "india" | "thailand";
  material: string;
  care: string;
  is_active: boolean;
  is_featured: boolean;
  translations: Record<Locale, ProductTranslation>;
  images?: string[];
  cover_image?: string;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface ShippingAddress {
  full_name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}
