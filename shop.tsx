import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  AGE_BANDS,
  CATEGORIES,
  CERTIFICATIONS,
  PRICE_BUCKETS,
  SKILL_FILTERS,
  toys,
} from "@/lib/toys";
import { ToyCard } from "@/components/ToyCard";

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>) => ({
    category: typeof search.category === "string" ? search.category : undefined,
    age: typeof search.age === "string" ? search.age : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop the shelf — Khel" },
      {
        name: "description",
        content:
          "Browse every hand-vetted Khel toy. Filter by age, category, price, skill and safety certification.",
      },
      { property: "og:title", content: "Shop the shelf — Khel" },
      {
        property: "og:description",
        content:
          "Browse every hand-vetted Khel toy. Filter by age, category, price, skill and safety certification.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopPage,
});

type FilterState = {
  ages: Set<string>;
  categories: Set<string>;
  prices: Set<string>;
  skills: Set<string>;
  certs: Set<string>;
};

const EMPTY: FilterState = {
  ages: new Set(),
  categories: new Set(),
  prices: new Set(),
  skills: new Set(),
  certs: new Set(),
};

function toggle(set: Set<string>, value: string): Set<string> {
  const next = new Set(set);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
}

function ShopPage() {
  const search = Route.useSearch();
  const [filters, setFilters] = useState<FilterState>(() => ({
    ...EMPTY,
    ages: new Set(search.age ? [search.age] : []),
    categories: new Set(search.category ? [search.category] : []),
  }));
  const [sort, setSort] = useState("featured");

  // Keep age/category in sync when the user navigates here from elsewhere.
  useEffect(() => {
    setFilters((f) => ({
      ...f,
      ages: new Set(search.age ? [search.age] : []),
      categories: new Set(search.category ? [search.category] : []),
    }));
  }, [search.age, search.category]);

  const results = useMemo(() => {
    let list = toys.filter((t) => {
      if (filters.ages.size > 0 && !filters.ages.has(t.ageBand)) return false;
      if (filters.categories.size > 0 && !filters.categories.has(t.category)) return false;
      if (filters.skills.size > 0 && !t.skills.some((s) => filters.skills.has(s))) return false;
      if (filters.certs.size > 0 && !t.certifications.some((c) => filters.certs.has(c)))
        return false;
      if (filters.prices.size > 0) {
        const matches = [...filters.prices].some((id) => {
          const bucket = PRICE_BUCKETS.find((b) => b.id === id);
          return bucket ? bucket.test(t.price) : false;
        });
        if (!matches) return false;
      }
      return true;
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [filters, sort]);

  const activeCount =
    filters.ages.size +
    filters.categories.size +
    filters.prices.size +
    filters.skills.size +
    filters.certs.size;

  const group = (
    label: string,
    options: readonly string[],
    key: keyof FilterState,
  ) => (
    <div>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-ink-soft">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = filters[key].has(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() =>
                setFilters((f) => ({
                  ...f,
                  [key]: toggle(f[key], opt),
                }))
              }
              aria-pressed={active}
              className={
                active
                  ? "rounded-full bg-clay px-3 py-1.5 text-xs font-medium text-primary-foreground"
                  : "rounded-full px-3 py-1.5 text-xs font-medium text-ink-soft ring-1 ring-line transition-colors hover:text-ink"
              }
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <main className="mx-auto max-w-6xl px-6 pb-20 pt-10">
      <div className="mb-8">
        <p className="eyebrow">The shelf</p>
        <h1 className="mt-1 font-display text-4xl font-semibold tracking-tight text-ink">
          Browse the collection
        </h1>
        <p className="mt-2 max-w-[60ch] text-sm text-pretty text-ink-soft">
          Every toy below has been hand-checked for the BIS/ISI toy-safety mark, labelled by
          age, and mapped to the skills it builds.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[230px_1fr]">
        <aside className="space-y-7 lg:sticky lg:top-24 lg:self-start">
          {group("Age", AGE_BANDS.map((b) => b.id), "ages")}
          {group("Category", CATEGORIES, "categories")}
          {group("Price", PRICE_BUCKETS.map((b) => b.id), "prices")}
          {group("Skill", SKILL_FILTERS, "skills")}
          {group("Certification", CERTIFICATIONS, "certs")}
          {activeCount > 0 ? (
            <button
              type="button"
              onClick={() => setFilters({ ...EMPTY })}
              className="text-xs font-semibold text-clay underline underline-offset-4 hover:text-clay-deep"
            >
              Clear all filters ({activeCount})
            </button>
          ) : null}
        </aside>

        <div>
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-ink-soft">
              {results.length} {results.length === 1 ? "toy" : "toys"}
            </p>
            <label className="flex items-center gap-2 text-sm text-ink-soft">
              Sort
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-full border border-line bg-cream px-3 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="rating">Highest rated</option>
              </select>
            </label>
          </div>

          {results.length === 0 ? (
            <div className="rounded-2xl bg-cream-deep p-10 text-center ring-1 ring-line">
              <p className="font-display text-xl font-semibold text-ink">
                Nothing on this shelf yet
              </p>
              <p className="mt-2 text-sm text-ink-soft">
                Try removing a filter — our shelf is small on purpose.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((toy) => (
                <ToyCard key={toy.slug} toy={toy} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
