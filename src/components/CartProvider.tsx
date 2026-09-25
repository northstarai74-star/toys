import { ReactNode, useState, useEffect } from "react";
import { CartContext, type CartContextType, type CartItem, calculateCartTotal } from "@/lib/cart";
import { type Toy } from "@/lib/toys";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    // Load from localStorage on mount
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("cart-items");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("cart-items", JSON.stringify(items));
  }, [items]);

  const total = calculateCartTotal(items);

  const value: CartContextType = {
    cart: { items, total },
    addToCart: (toy: Toy, quantity: number) => {
      setItems((prev) => {
        const existing = prev.find((item) => item.toy.slug === toy.slug);
        if (existing) {
          return prev.map((item) =>
            item.toy.slug === toy.slug
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prev, { toy, quantity }];
      });
    },
    removeFromCart: (slug: string) => {
      setItems((prev) => prev.filter((item) => item.toy.slug !== slug));
    },
    updateQuantity: (slug: string, quantity: number) => {
      if (quantity <= 0) {
        setItems((prev) => prev.filter((item) => item.toy.slug !== slug));
      } else {
        setItems((prev) =>
          prev.map((item) =>
            item.toy.slug === slug ? { ...item, quantity } : item
          )
        );
      }
    },
    clearCart: () => {
      setItems([]);
    },
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
