import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { formatINR } from "@/lib/toys";
import { getOrderById } from "@/lib/orders";
import type { Order } from "@/lib/orders";

export const Route = createFileRoute("/order-confirmation/$orderId")({
  head: () => ({
    meta: [
      { title: "Order Confirmed — Khel" },
      { name: "description", content: "Your order has been confirmed" },
    ],
  }),
  component: OrderConfirmationPage,
});

function OrderConfirmationPage() {
  const { orderId } = Route.useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      setLoading(true);
      try {
        // Try to fetch from Supabase first
        const supabaseOrder = await getOrderById(orderId);
        if (supabaseOrder) {
          setOrder(supabaseOrder);
          return;
        }

        // Fallback to localStorage if Supabase is not available
        const storedOrder = localStorage.getItem("last-order");
        if (storedOrder) {
          const orderData = JSON.parse(storedOrder);
          if (orderData.id === orderId) {
            // Convert localStorage format to match Supabase format
            setOrder({
              id: 0,
              order_id: orderData.id,
              customer_name: orderData.customer.name,
              customer_email: orderData.customer.email,
              customer_phone: orderData.customer.phone,
              customer_address: orderData.customer.address,
              customer_city: orderData.customer.city,
              customer_pincode: orderData.customer.pincode,
              items: orderData.items,
              subtotal: orderData.total - (orderData.total > 999 ? 0 : 99) - Math.round((orderData.total - (orderData.total > 999 ? 0 : 99)) * 0.05),
              shipping: orderData.total > 999 ? 0 : 99,
              tax: Math.round((orderData.total - (orderData.total > 999 ? 0 : 99)) * 0.05),
              total: orderData.total,
              status: "processing",
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              payment_method: orderData.paymentMethod || "card",
            } as any);
          }
        }
      } catch (error) {
        console.error("Failed to load order:", error);
      } finally {
        setLoading(false);
      }
    };

    void loadOrder();
  }, [orderId]);

  if (loading) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-20 text-center">
        <div className="rounded-2xl bg-cream-deep p-8 ring-1 ring-line">
          <p className="text-ink-soft">Loading order details...</p>
        </div>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-20 text-center">
        <div className="rounded-2xl bg-cream-deep p-8 ring-1 ring-line">
          <h1 className="font-display text-2xl font-semibold text-ink">Order not found</h1>
          <p className="mt-2 text-sm text-ink-soft">We couldn't find this order in our system.</p>
          <Link
            to="/"
            className="mt-6 inline-block rounded-full bg-clay px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-clay-deep"
          >
            Back to home
          </Link>
        </div>
      </main>
    );
  }

  const subtotal = order.subtotal;
  const shipping = order.shipping;
  const tax = order.tax;
  const total = order.total;

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      {/* Success Banner */}
      <div className="rounded-2xl bg-sage/10 p-8 ring-1 ring-sage/20">
        <div className="flex items-center justify-center">
          <div className="rounded-full bg-sage/20 p-3">
            <svg
              className="h-8 w-8 text-sage"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h1 className="mt-4 text-center font-display text-3xl font-semibold text-ink">
          Order confirmed!
        </h1>
        <p className="mt-2 text-center text-ink-soft">
          Thank you for your order. We'll send you an email confirmation shortly.
        </p>
      </div>

      {/* Order Details */}
      <div className="mt-8 space-y-6">
        {/* Order Info */}
        <div className="rounded-2xl bg-cream-deep p-6 ring-1 ring-line">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-soft">
                Order number
              </p>
              <p className="mt-1 font-display text-lg font-semibold text-ink">{order.order_id}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-soft">
                Order date
              </p>
              <p className="mt-1 font-display text-lg font-semibold text-ink">
                {new Date(order.created_at).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-soft">
                Payment method
              </p>
              <p className="mt-1 font-display text-lg font-semibold text-ink capitalize">
                {(order as any).payment_method ? (order as any).payment_method.replace(/([A-Z])/g, ' $1').trim() : "Card"}
              </p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-soft">
                Delivery status
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
                  Processing
                </span>
                <span className="text-sm text-ink-soft">Ships in 48 hours</span>
              </div>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="rounded-2xl bg-cream-deep p-6 ring-1 ring-line">
          <h2 className="font-display text-lg font-semibold text-ink">Order items</h2>
          <div className="mt-4 space-y-3">
            {Array.isArray(order.items) &&
              order.items.map((item: any) => (
                <div key={item.slug || item.name} className="flex items-start gap-4 border-b border-line pb-3">
                  <div className="flex-1">
                    <h3 className="font-medium text-ink">{item.name}</h3>
                    <p className="mt-1 text-sm text-ink-soft">
                      {item.quantity} × {formatINR(item.price)} = {formatINR(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="rounded-2xl bg-cream-deep p-6 ring-1 ring-line">
          <h2 className="font-display text-lg font-semibold text-ink">Order summary</h2>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-ink-soft">Subtotal</span>
              <span className="text-ink">{formatINR(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-ink-soft">Shipping</span>
              <span className="text-ink">
                {shipping === 0 ? (
                  <span className="text-sage font-semibold">FREE</span>
                ) : (
                  formatINR(shipping)
                )}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-ink-soft">Tax (5%)</span>
              <span className="text-ink">{formatINR(tax)}</span>
            </div>
            <div className="border-t border-line pt-3">
              <div className="flex justify-between text-base font-semibold">
                <span className="text-ink">Total</span>
                <span className="text-clay">{formatINR(total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="rounded-2xl bg-cream-deep p-6 ring-1 ring-line">
          <h2 className="font-display text-lg font-semibold text-ink">Delivery address</h2>
          <div className="mt-4 space-y-1 text-sm text-ink-soft">
            <p className="font-medium text-ink">{order.customer_name}</p>
            <p>{order.customer_address}</p>
            <p>
              {order.customer_city} - {order.customer_pincode}
            </p>
            <p className="mt-3 text-xs">
              <span className="font-semibold text-ink">Email:</span> {order.customer_email}
            </p>
            <p className="text-xs">
              <span className="font-semibold text-ink">Phone:</span> {order.customer_phone}
            </p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="rounded-2xl bg-butter/20 p-6 ring-1 ring-butter/30">
          <h2 className="font-display text-lg font-semibold text-ink">What happens next?</h2>
          <ul className="mt-4 space-y-2 text-sm text-ink-soft">
            <li className="flex gap-3">
              <span className="shrink-0 text-butter">✓</span>
              <span>We'll prepare your order and notify you with tracking details</span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 text-butter">✓</span>
              <span>Your package will be shipped within 48 hours</span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 text-butter">✓</span>
              <span>You have 30 days to return any item, no questions asked</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            to="/shop"
            className="flex-1 rounded-full bg-clay px-6 py-3 text-center text-sm font-semibold text-primary-foreground ring-1 ring-clay transition-colors hover:bg-clay-deep"
          >
            Continue shopping
          </Link>
          <Link
            to="/orders"
            className="flex-1 rounded-full border border-line px-6 py-3 text-center text-sm font-medium text-ink ring-1 ring-line transition-colors hover:bg-cream-deep"
          >
            View all orders
          </Link>
        </div>
      </div>
    </main>
  );
}
