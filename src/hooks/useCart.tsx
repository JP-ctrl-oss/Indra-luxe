"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem, Product } from "@/types/product";
import toast from "react-hot-toast";

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalItems: 0,
  subtotal: 0,
});

const CART_STORAGE_KEY = "indra-luxe-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [initialized, setInitialized] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch {
      // Ignore parse errors
    }
    setInitialized(true);
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    if (initialized) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, initialized]);

  const addToCart = (product: Product, size: string) => {
    if (!size) {
      toast.error("Por favor selecciona una talla");
      return;
    }

    const stock = product.stock[size] || 0;
    if (stock <= 0) {
      toast.error("Producto agotado en esta talla");
      return;
    }

    setItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.size === size
      );

      if (existing) {
        if (existing.quantity >= stock) {
          toast.error("No hay más stock disponible");
          return prev;
        }
        toast.success("Cantidad actualizada en el carrito");
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent("open-cart"));
        }, 150);
        return prev.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      toast.success("Producto añadido al carrito");
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("open-cart"));
      }, 150);
      return [...prev, { product, size, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string, size: string) => {
    setItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.size === size)
      )
    );
    toast.success("Producto eliminado");
  };

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }

    setItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.size === size) {
          const stock = item.product.stock[size] || 0;
          if (quantity > stock) {
            toast.error("Stock máximo alcanzado");
            return { ...item, quantity: stock };
          }
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.base_price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
