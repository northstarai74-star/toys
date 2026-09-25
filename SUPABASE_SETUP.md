# Supabase Database Setup

This guide will help you set up the Supabase database for the Khel toy shop website.

## Step 1: Get Your Supabase Credentials

1. Go to [https://app.supabase.com/project/dunljlmbrjrjctjqapsm/settings/api](https://app.supabase.com/project/dunljlmbrjrjctjqapsm/settings/api)
2. Copy your **Anon key** (starts with `eyJ...`)
3. Paste it in `.env.local`:
   ```
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```

## Step 2: Create the Orders Table

1. Go to [https://app.supabase.com/project/dunljlmbrjrjctjqapsm/sql/new](https://app.supabase.com/project/dunljlmbrjrjctjqapsm/sql/new)
2. Create a new SQL query and run this:

```sql
-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  order_id VARCHAR(255) UNIQUE NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  customer_address TEXT NOT NULL,
  customer_city VARCHAR(100) NOT NULL,
  customer_pincode VARCHAR(10) NOT NULL,
  items JSONB NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  shipping DECIMAL(10, 2) NOT NULL,
  tax DECIMAL(10, 2) NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'processing',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for email searches
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(customer_email);

-- Create index for order_id searches
CREATE INDEX IF NOT EXISTS idx_orders_order_id ON orders(order_id);

-- Enable RLS (Row Level Security)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert orders
CREATE POLICY "Allow insert orders" ON orders
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow read orders by email
CREATE POLICY "Allow read orders by email" ON orders
  FOR SELECT
  USING (true);
```

## Step 3: Test the Connection

1. Restart your dev server:
   ```bash
   npm run dev
   ```

2. Go to http://localhost:8086/orders

3. Try searching for an order with an email address from a past order

## Step 4: Verify Database Operations

After placing an order:
- Check your Supabase dashboard: https://app.supabase.com/project/dunljlmbrjrjctjqapsm/editor/orders
- You should see your order listed there
- The order will be saved in both Supabase (primary) and localStorage (backup)

## Database Schema

The `orders` table stores:
- `order_id`: Unique order identifier (ORD-timestamp)
- `customer_*`: Customer details (name, email, phone, address, city, pincode)
- `items`: Array of ordered items in JSON format
- `subtotal`, `shipping`, `tax`, `total`: Price breakdown
- `status`: Order status (processing, shipped, delivered, cancelled)
- `created_at`, `updated_at`: Timestamps

## Security Notes

- The API key is for **public access only** (Anon key)
- Row Level Security (RLS) is enabled
- Anyone can create and view orders (suitable for public e-commerce)
- For production, consider adding authentication

## Troubleshooting

### Orders not saving?
- Check if `.env.local` has the correct `VITE_SUPABASE_ANON_KEY`
- Check browser console for errors
- Verify table exists in Supabase dashboard

### Can't fetch orders?
- Ensure RLS policies allow SELECT operations
- Check if email format matches exactly

### Environment variable not loading?
- Restart the dev server after updating `.env.local`
- Vite loads env vars on startup
