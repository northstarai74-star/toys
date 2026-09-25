import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatINR } from "@/lib/toys";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Khel" },
      { name: "description", content: "Complete your order at Khel" },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Calculate totals
      const subtotal = cart.total;
      const shipping = subtotal > 999 ? 0 : 99;
      const tax = Math.round(subtotal * 0.05);
      const total = subtotal + shipping + tax;

      const orderId = `ORD-${Date.now()}`;

      // Save order to localStorage
      localStorage.setItem(
        "last-order",
        JSON.stringify({
          id: orderId,
          date: new Date().toISOString(),
          customer: formData,
          items: cart.items,
          subtotal,
          shipping,
          tax,
          total,
          paymentMethod,
        })
      );

      clearCart();

      // Navigate to confirmation
      void navigate({
        to: "/order-confirmation/$orderId",
        params: { orderId: orderId },
      });
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
      setIsProcessing(false);
    }
  };

  const subtotal = cart.total;
  const shipping = subtotal > 999 ? 0 : 99;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <a
        href="/shop"
        className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
      >
        ← Back to shop
      </a>

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 rounded-2xl bg-cream-deep p-6 ring-1 ring-line">
            <h2 className="font-display text-lg font-semibold text-ink">Order Summary</h2>

            {cart.items.length === 0 ? (
              <p className="mt-4 text-sm text-ink-soft">Your cart is empty</p>
            ) : (
              <>
                <div className="mt-4 space-y-3">
                  {cart.items.map((item) => (
                    <div key={item.toy.slug} className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-ink">{item.toy.name}</p>
                        <p className="mt-1 text-xs text-ink-soft">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold text-ink">
                        {formatINR(item.toy.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-2 border-t border-line pt-4">
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
                    <span className="text-ink-soft">Tax</span>
                    <span className="text-ink">{formatINR(tax)}</span>
                  </div>
                  <div className="flex justify-between border-t border-line pt-2 text-base font-semibold">
                    <span>Total</span>
                    <span className="text-clay">{formatINR(total)}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Checkout Form */}
        <div className="lg:col-span-2">
          {cart.items.length === 0 ? (
            <div className="rounded-2xl bg-cream-deep p-8 text-center ring-1 ring-line">
              <p className="text-lg font-semibold text-ink">Your cart is empty</p>
              <p className="mt-2 text-sm text-ink-soft">Add some toys before checking out!</p>
              <a
                href="/shop"
                className="mt-6 inline-block rounded-full bg-clay px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-clay-deep"
              >
                Continue shopping
              </a>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-ink">Review Cart</h2>
                <div className="mt-4 space-y-3">
                  {cart.items.map((item) => (
                    <div
                      key={item.toy.slug}
                      className="flex items-center gap-4 rounded-lg bg-cream-deep p-4 ring-1 ring-line"
                    >
                      <img
                        src={item.toy.image}
                        alt={item.toy.name}
                        className="h-20 w-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-ink">{item.toy.name}</h3>
                        <p className="mt-1 text-sm text-ink-soft">{formatINR(item.toy.price)} each</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.toy.slug, item.quantity - 1)}
                          className="px-2 py-1 text-sm text-ink-soft hover:text-ink"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.toy.slug, item.quantity + 1)}
                          className="px-2 py-1 text-sm text-ink-soft hover:text-ink"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.toy.slug)}
                        className="text-xs text-ink-soft transition-colors hover:text-ink"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handlePlaceOrder} className="space-y-6">
                <div>
                  <h2 className="font-display text-lg font-semibold text-ink">Delivery Details</h2>

                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-ink">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="mt-1 w-full rounded-lg border border-line bg-cream px-4 py-2.5 text-ink placeholder:text-ink-soft focus:outline-none focus:ring-2 focus:ring-clay"
                        placeholder="Your name"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-ink">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="mt-1 w-full rounded-lg border border-line bg-cream px-4 py-2.5 text-ink placeholder:text-ink-soft focus:outline-none focus:ring-2 focus:ring-clay"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-ink">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="mt-1 w-full rounded-lg border border-line bg-cream px-4 py-2.5 text-ink placeholder:text-ink-soft focus:outline-none focus:ring-2 focus:ring-clay"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-ink">Address</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        className="mt-1 w-full rounded-lg border border-line bg-cream px-4 py-2.5 text-ink placeholder:text-ink-soft focus:outline-none focus:ring-2 focus:ring-clay"
                        placeholder="Street address, apartment, etc."
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-ink">City</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="mt-1 w-full rounded-lg border border-line bg-cream px-4 py-2.5 text-ink placeholder:text-ink-soft focus:outline-none focus:ring-2 focus:ring-clay"
                          placeholder="Bengaluru"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-ink">PIN Code</label>
                        <input
                          type="text"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          required
                          className="mt-1 w-full rounded-lg border border-line bg-cream px-4 py-2.5 text-ink placeholder:text-ink-soft focus:outline-none focus:ring-2 focus:ring-clay"
                          placeholder="560001"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-lg font-semibold text-ink">Payment Method</h2>
                  <p className="mt-1 text-sm text-ink-soft">Choose how you'd like to pay</p>

                  <div className="mt-4 space-y-3">
                    {/* Credit/Debit Card */}
                    <label className="flex cursor-pointer items-start gap-4 rounded-lg border-2 border-line p-4 transition-all hover:bg-cream-deep" style={{ borderColor: paymentMethod === 'card' ? 'var(--color-clay)' : 'var(--color-line)' }}>
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-ink">Credit / Debit Card</p>
                        <p className="mt-1 text-xs text-ink-soft">Visa, Mastercard, RuPay</p>
                      </div>
                      <svg className="h-6 w-6 text-clay" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 012-2h6a2 2 0 012 2v15m-9 0h6" />
                      </svg>
                    </label>

                    {/* UPI */}
                    <label className="flex cursor-pointer items-start gap-4 rounded-lg border-2 border-line p-4 transition-all hover:bg-cream-deep" style={{ borderColor: paymentMethod === 'upi' ? 'var(--color-clay)' : 'var(--color-line)' }}>
                      <input
                        type="radio"
                        name="payment"
                        value="upi"
                        checked={paymentMethod === "upi"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-ink">UPI</p>
                        <p className="mt-1 text-xs text-ink-soft">Google Pay, PhonePe, Paytm</p>
                      </div>
                      <svg className="h-6 w-6 text-clay" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </label>

                    {/* Net Banking */}
                    <label className="flex cursor-pointer items-start gap-4 rounded-lg border-2 border-line p-4 transition-all hover:bg-cream-deep" style={{ borderColor: paymentMethod === 'netbanking' ? 'var(--color-clay)' : 'var(--color-line)' }}>
                      <input
                        type="radio"
                        name="payment"
                        value="netbanking"
                        checked={paymentMethod === "netbanking"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-ink">Net Banking</p>
                        <p className="mt-1 text-xs text-ink-soft">All major banks supported</p>
                      </div>
                      <svg className="h-6 w-6 text-clay" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </label>

                    {/* Wallet */}
                    <label className="flex cursor-pointer items-start gap-4 rounded-lg border-2 border-line p-4 transition-all hover:bg-cream-deep" style={{ borderColor: paymentMethod === 'wallet' ? 'var(--color-clay)' : 'var(--color-line)' }}>
                      <input
                        type="radio"
                        name="payment"
                        value="wallet"
                        checked={paymentMethod === "wallet"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-ink">Digital Wallet</p>
                        <p className="mt-1 text-xs text-ink-soft">Amazon Pay, Apple Pay</p>
                      </div>
                      <svg className="h-6 w-6 text-clay" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h10m4 0a1 1 0 11-2 0 1 1 0 012 0z" />
                      </svg>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full rounded-full bg-clay px-6 py-3 text-sm font-semibold text-primary-foreground ring-1 ring-clay transition-colors hover:bg-clay-deep disabled:opacity-50"
                >
                  {isProcessing ? "Processing order..." : `Pay ${formatINR(total)} with ${paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}`}
                </button>
              </form>

              <p className="mt-4 text-center text-xs text-ink-soft">
                Ships in 48 hrs from Bengaluru · 30-day returns · We protect your data
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
