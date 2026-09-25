import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-cream/80">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-2xl font-semibold text-cream">
              Khel<span className="text-butter">.</span>
            </p>
            <p className="mt-1 text-sm text-cream/60">
              Quality, safety, and learning — one shelf at a time.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link to="/shop" className="transition-colors hover:text-cream">
              Shop
            </Link>
            <Link to="/safety" className="transition-colors hover:text-cream">
              Why we vet
            </Link>
            <Link to="/" className="transition-colors hover:text-cream">
              Home
            </Link>
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-2 border-t border-cream/10 pt-6 text-xs text-cream/50 sm:flex-row">
          <span>© 2026 Khel · Made for curious kids across India</span>
          <span>BIS/ISI certified · FSC wood · Non-toxic finishes</span>
        </div>
      </div>
    </footer>
  );
}
