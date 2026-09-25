import { Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";

export function SiteHeader() {
  const { cart } = useCart();
  const itemCount = cart.items.length;

  return (
    <>
      <div className="bg-ink text-cream/90">
        <div className="mx-auto max-w-6xl px-6 py-2 text-center text-[11px] font-medium uppercase tracking-[0.14em] sm:text-xs">
          Every toy BIS/ISI certified · Free shipping over ₹999 · Handpicked for small hands
        </div>
      </div>
      <header className="sticky top-0 z-30 border-b border-line bg-cream/90 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link to="/" className="font-display text-2xl font-semibold tracking-tight text-ink">
            Khel<span className="text-clay">.</span>
          </Link>
          <nav className="flex items-center gap-5 text-sm font-medium text-ink-soft sm:gap-8">
            <Link to="/shop" className="transition-colors hover:text-ink">
              Shop
            </Link>
            <Link to="/orders" className="transition-colors hover:text-ink">
              Orders
            </Link>
            <Link to="/safety" className="hidden transition-colors hover:text-ink sm:inline">
              Why we vet
            </Link>
            <Link
              to="/checkout"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-cream transition-colors hover:bg-clay-deep"
            >
              Bag {itemCount > 0 && <span className="ml-0.5 rounded-full bg-butter px-1.5 py-0.5 text-[11px] font-bold text-ink">{itemCount}</span>}
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
