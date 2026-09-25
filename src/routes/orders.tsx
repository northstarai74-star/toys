import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { getOrdersByEmail } from "@/lib/orders";
import { formatINR } from "@/lib/toys";
import type { Order } from "@/lib/orders";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "My Orders — Khel" },
      { name: "description", content: "View and track your orders" },
    ],
  }),
  component: OrdersPage,
});

function OrdersPage() {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setSearched(true);
    const result = await getOrdersByEmail(email);
    setOrders(result);
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-amber-100 text-amber-900";
      case "shipped":
        return "bg-blue-100 text-blue-900";
      case "delivered":
        return "bg-sage/20 text-sage";
      case "cancelled":
        return "bg-red-100 text-red-900";
      default:
        return "bg-gray-100 text-gray-900";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "processing":
        return "Processing";
      case "shipped":
        return "Shipped";
      case "delivered":
        return "Delivered";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <a
        href="/"
        className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
      >
        ← Back to home
      </a>

      <div className="mt-8">
        <h1 className="font-display text-3xl font-semibold text-ink">My Orders</h1>
        <p className="mt-2 text-ink-soft">Track your toy orders and deliveries</p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mt-8">
        <div className="rounded-2xl bg-cream-deep p-6 ring-1 ring-line">
          <label className="block text-sm font-medium text-ink">
            Enter your email to find orders
          </label>
          <div className="mt-4 flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 rounded-lg border border-line bg-cream px-4 py-2.5 text-ink placeholder:text-ink-soft focus:outline-none focus:ring-2 focus:ring-clay"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-clay px-6 py-2.5 text-sm font-semibold text-primary-foreground ring-1 ring-clay transition-colors hover:bg-clay-deep disabled:opacity-50"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
      </form>

      {/* Orders List */}
      {searched && (
        <div className="mt-8">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-ink-soft">Searching for your orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="rounded-2xl bg-cream-deep p-8 text-center ring-1 ring-line">
              <p className="font-display text-lg font-semibold text-ink">
                No orders found
              </p>
              <p className="mt-2 text-sm text-ink-soft">
                No orders found for {email}. Start shopping!
              </p>
              <Link
                to="/shop"
                className="mt-6 inline-block rounded-full bg-clay px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-clay-deep"
              >
                Browse products
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-2xl bg-cream-deep p-6 ring-1 ring-line hover:ring-clay/30 transition-all"
                >
                  <div className="grid gap-4 sm:grid-cols-3">
                    {/* Order Info */}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-soft">
                        Order number
                      </p>
                      <Link
                        to="/order-confirmation/$orderId"
                        params={{ orderId: order.order_id }}
                        className="mt-1 font-display text-lg font-semibold text-clay hover:underline"
                      >
                        {order.order_id}
                      </Link>
                    </div>

                    {/* Date */}
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

                    {/* Status */}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-soft">
                        Status
                      </p>
                      <span className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="mt-4 border-t border-line pt-4">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-soft">
                      Items
                    </p>
                    <div className="mt-2 space-y-1">
                      {Array.isArray(order.items) &&
                        order.items.map((item: any, idx: number) => (
                          <p key={idx} className="text-sm text-ink">
                            {item.name} × {item.quantity}
                          </p>
                        ))}
                    </div>
                  </div>

                  {/* Total */}
                  <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
                    <p className="text-sm font-medium text-ink-soft">Total</p>
                    <p className="text-lg font-semibold text-clay">
                      {formatINR(order.total)}
                    </p>
                  </div>

                  {/* View Details Link */}
                  <Link
                    to="/order-confirmation/$orderId"
                    params={{ orderId: order.order_id }}
                    className="mt-4 inline-block text-sm font-medium text-clay transition-colors hover:text-clay-deep"
                  >
                    View details →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
}
