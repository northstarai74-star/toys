import { supabase, isSupabaseConfigured, type Database } from "./supabase";
import type { CartItem } from "./cart";

export type Order = Database["public"]["Tables"]["orders"]["Row"];

export async function createOrder(
  orderData: Omit<Order, "id" | "created_at" | "updated_at">
): Promise<Order | null> {
  if (!isSupabaseConfigured) {
    console.warn("Supabase not configured. Order will be saved to localStorage only.");
    return null;
  }

  try {
    if (!supabase) throw new Error("Supabase client not initialized");

    const { data, error } = await supabase
      .from("orders")
      .insert([orderData])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating order:", error);
    return null;
  }
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  if (!isSupabaseConfigured || !supabase) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("order_id", orderId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
  }
}

export async function getOrdersByEmail(email: string): Promise<Order[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("customer_email", email)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}

export async function updateOrderStatus(
  orderId: string,
  status: Order["status"]
): Promise<Order | null> {
  if (!isSupabaseConfigured || !supabase) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from("orders")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("order_id", orderId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error updating order:", error);
    return null;
  }
}

export async function formatOrderForDatabase(
  orderId: string,
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
  },
  items: CartItem[],
  totals: {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  }
): Promise<Omit<Order, "id" | "created_at" | "updated_at">> {
  return {
    order_id: orderId,
    customer_name: customer.name,
    customer_email: customer.email,
    customer_phone: customer.phone,
    customer_address: customer.address,
    customer_city: customer.city,
    customer_pincode: customer.pincode,
    items: items.map((item) => ({
      slug: item.toy.slug,
      name: item.toy.name,
      price: item.toy.price,
      quantity: item.quantity,
    })),
    subtotal: totals.subtotal,
    shipping: totals.shipping,
    tax: totals.tax,
    total: totals.total,
    status: "processing" as const,
  };
}
