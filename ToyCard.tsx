import { Link } from "@tanstack/react-router";
import { formatINR, type Toy } from "@/lib/toys";

export function ToyCard({ toy }: { toy: Toy }) {
  return (
    <Link
      to="/product/$slug"
      params={{ slug: toy.slug }}
      className="group block overflow-hidden rounded-2xl bg-card ring-1 ring-line transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative overflow-hidden">
        <img
          src={toy.image}
          alt={toy.name}
          width={1024}
          height={1024}
          loading="lazy"
          className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {toy.badge ? (
          <span className="absolute left-3 top-3 rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-cream">
            {toy.badge}
          </span>
        ) : null}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-[11px]">
          <span className="rounded-full bg-sage/15 px-2 py-0.5 font-medium text-sage">
            {toy.ageLabel}
          </span>
          <span className="rounded-full bg-butter/25 px-2 py-0.5 font-medium text-ink-soft">
            BIS/ISI
          </span>
        </div>
        <h3 className="mt-3 font-display text-lg font-semibold text-ink">{toy.name}</h3>
        <p className="mt-1 text-sm text-ink-soft">{toy.tagline}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="flex items-baseline gap-2 font-display text-lg font-semibold text-ink">
            {formatINR(toy.price)}
            {toy.mrp ? (
              <span className="text-xs font-normal text-ink-soft line-through">
                {formatINR(toy.mrp)}
              </span>
            ) : null}
          </span>
          <span className="text-xs text-ink-soft">
            ★ {toy.rating.toFixed(1)} · {toy.reviews}
          </span>
        </div>
      </div>
    </Link>
  );
}
