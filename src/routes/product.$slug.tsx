import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { getToy, formatINR } from "@/lib/toys";
import { ToyCard } from "@/components/ToyCard";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const toy = getToy(params.slug);
    if (!toy) throw notFound();
    return { toy };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Not found" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    return {
      meta: [
        { title: `${loaderData.toy.name} — Khel` },
        {
          name: "description",
          content: `${loaderData.toy.tagline}. ${loaderData.toy.ageLabel} · BIS/ISI certified · ${formatINR(loaderData.toy.price)}.`,
        },
        { property: "og:title", content: `${loaderData.toy.name} — Khel` },
        {
          property: "og:description",
          content: `${loaderData.toy.tagline}. ${loaderData.toy.ageLabel}.`,
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { toy } = Route.useLoaderData();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const related = getToy;
  void related;

  return (
    <main className="mx-auto max-w-6xl px-6 pb-20 pt-10">
      <a
        href="/shop"
        className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
      >
        ← Back to the shelf
      </a>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        {/* Image */}
        <div className="relative">
          <img
            src={toy.image}
            alt={toy.name}
            width={1024}
            height={1024}
            className="w-full rounded-2xl object-cover ring-1 ring-line"
          />
          <div className="floaty absolute bottom-5 left-5 rounded-xl bg-cream px-4 py-3 shadow-sm ring-1 ring-line">
            <p className="text-[11px] uppercase tracking-[0.14em] text-ink-soft">Builds</p>
            <p className="font-display text-sm font-semibold text-ink">
              {toy.whatItBuilds[0].title}
            </p>
          </div>
        </div>

        {/* Details */}
        <div>
          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            <span className="rounded-full bg-sage/15 px-2.5 py-1 font-medium text-sage">
              {toy.ageLabel}
            </span>
            <span className="rounded-full bg-butter/25 px-2.5 py-1 font-medium text-ink-soft">
              BIS/ISI certified
            </span>
            <span className="rounded-full bg-clay/10 px-2.5 py-1 font-medium text-clay">
              {toy.category}
            </span>
          </div>

          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-balance text-ink">
            {toy.name}
          </h1>
          <p className="mt-3 max-w-[48ch] text-base text-pretty text-ink-soft">
            {toy.description}
          </p>

          <div className="mt-4 flex items-center gap-2 text-sm text-ink-soft">
            <span className="font-semibold text-ink">★ {toy.rating.toFixed(1)}</span>
            <span>· {toy.reviews} parent reviews</span>
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-display text-3xl font-semibold text-ink">
              {formatINR(toy.price)}
            </span>
            {toy.mrp ? (
              <>
                <span className="text-sm text-ink-soft line-through">{formatINR(toy.mrp)}</span>
                <span className="text-xs font-semibold text-clay">
                  Save {formatINR(toy.mrp - toy.price)}
                </span>
              </>
            ) : null}
          </div>

          {/* What it builds */}
          <div className="mt-7">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-ink-soft">
              What it builds
            </p>
            <div className="grid grid-cols-2 gap-3">
              {toy.whatItBuilds.map((b) => (
                <div key={b.title} className="rounded-xl bg-cream-deep p-4 ring-1 ring-line">
                  <p className="font-display text-base font-semibold text-ink">{b.title}</p>
                  <p className="mt-1 text-sm text-pretty text-ink-soft">{b.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Safety */}
          <div className="mt-6 rounded-2xl bg-cream-deep p-5 ring-1 ring-line">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-sage/15 text-sm font-bold text-sage">
                ✓
              </span>
              <div>
                <p className="font-display text-base font-semibold text-ink">
                  Safety &amp; certification
                </p>
                <p className="mt-1 text-sm text-pretty text-ink-soft">{toy.safetyNotes}</p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {toy.certifications.map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-cream px-2.5 py-1 text-[11px] font-medium text-ink-soft ring-1 ring-line"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Details */}
          <ul className="mt-6 space-y-2">
            {toy.details.map((d) => (
              <li key={d} className="flex items-start gap-2 text-sm text-ink-soft">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-butter" />
                {d}
              </li>
            ))}
          </ul>

          {/* Quantity Selector */}
          <div className="mt-7 flex items-center gap-3">
            <div className="flex items-center rounded-full ring-1 ring-line">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-ink-soft hover:text-ink"
              >
                −
              </button>
              <span className="w-10 text-center font-semibold text-ink">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-ink-soft hover:text-ink"
              >
                +
              </button>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                addToCart(toy, quantity);
                setAdded(true);
                setTimeout(() => {
                  setAdded(false);
                }, 2000);
              }}
              className="inline-flex items-center gap-2 rounded-full bg-clay px-6 py-3 text-sm font-semibold text-primary-foreground ring-1 ring-clay transition-colors hover:bg-clay-deep"
            >
              {added ? "In your bag ✓" : "Add to bag"}
            </button>
            <button
              type="button"
              onClick={() => {
                addToCart(toy, quantity);
                void navigate({ to: "/checkout" });
              }}
              className="rounded-full px-6 py-3 text-sm font-medium text-ink ring-1 ring-line transition-colors hover:ring-ink/30"
            >
              Buy now
            </button>
          </div>
          <p className="mt-4 text-xs text-ink-soft">
            Ships in 48 hrs from Bengaluru · Free over ₹999 · 30-day returns
          </p>
        </div>
      </div>
    </main>
  );
}
