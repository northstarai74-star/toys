import { createContext, useContext } from "react";
import { type Toy } from "./toys";

export type CartItem = {
  toy: Toy;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
  total: number;
};

export type CartContextType = {
  cart: Cart;
  addToCart: (toy: Toy, quantity: number) => void;
  removeFromCart: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.toy.price * item.quantity, 0);
}
