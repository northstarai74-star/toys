import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dunljlmbrjrjctjqapsm.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const supabase = supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const isSupabaseConfigured = !!supabaseAnonKey;

export type Database = {
  public: {
    Tables: {
      orders: {
        Row: {
          id: string;
          order_id: string;
          customer_name: string;
          customer_email: string;
          customer_phone: string;
          customer_address: string;
          customer_city: string;
          customer_pincode: string;
          items: any[];
          subtotal: number;
          shipping: number;
          tax: number;
          total: number;
          status: "processing" | "shipped" | "delivered" | "cancelled";
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["orders"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["orders"]["Row"]>;
      };
    };
  };
};
