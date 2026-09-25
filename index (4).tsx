import { createFileRoute } from "@tanstack/react-router";
import heroShelf from "@/assets/hero-shelf.jpg";
import { AGE_BANDS, collections, toys, getToy } from "@/lib/toys";
import { ToyCard } from "@/components/ToyCard";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Khel — Curated toys for curious kids in India" },
      {
        name: "description",
        content:
          "A hand-vetted shelf of wooden, sensory and open-ended toys — every piece BIS/ISI certified, age-labelled and chosen for the skills it builds.",
      },
      {
        property: "og:title",
        content: "Khel — Curated toys for curious kids in India",
      },
      {
        property: "og:description",
        content:
          "Quality, safety and learning — a hand-vetted toy shelf for Indian families.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const featuredSlugs = ["ring-by-ring-stacker", "counting-abacus", "solar-robot-lab"];

function Index() {
  const featured = featuredSlugs.map((s) => getToy(s)!).filter(Boolean);

  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 pb-10 pt-10 sm:pt-14">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="rise lg:col-span-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-sage/15 px-3 py-1 text-xs font-semibold tracking-wide text-sage">
                <span className="size-1.5 rounded-full bg-sage" />
                The Montessori shelf, delivered
              </span>
              <h1 className="mt-5 max-w-[20ch] font-display text-4xl font-semibold leading-tight tracking-tight text-balance text-ink sm:text-5xl lg:text-6xl">
                Toys that teach, built to be kept.
              </h1>
              <p className="mt-4 max-w-[46ch] text-base text-pretty text-ink-soft sm:text-lg">
                A small, curated shelf of wooden and open-ended play — every piece BIS/ISI
                certified, age-labelled, and chosen for the skills it builds.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 rounded-full bg-clay px-5 py-3 text-sm font-semibold text-primary-foreground ring-1 ring-clay transition-colors hover:bg-clay-deep"
                >
                  Shop the shelf <span aria-hidden>→</span>
                </Link>
                <Link
                  to="/safety"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-ink/5"
                >
                  How we vet toys
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink-soft">
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-clay" /> BIS/ISI certified
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-sage" /> FSC wood
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-butter" /> Non-toxic finishes
                </span>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="relative">
                <div className="floaty-slow absolute -top-5 right-2 z-10 rounded-2xl bg-cream px-4 py-3 shadow-sm ring-1 ring-line sm:-right-2">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-ink-soft">
                    Ages 3–6
                  </p>
                  <p className="font-display text-base font-semibold text-ink">Number sense</p>
                </div>
                <img
                  src={heroShelf}
                  alt="A sunlit wooden shelf of curated toys"
                  width={1440}
                  height={1088}
                  className="w-full rounded-2xl object-cover shadow-sm ring-1 ring-line"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AGE BANDS */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="eyebrow">Find by age</p>
              <h2 className="mt-1 font-display text-3xl font-semibold tracking-tight text-balance text-ink">
                Start where your child is
              </h2>
            </div>
            <Link
              to="/shop"
              className="hidden text-sm font-medium text-ink-soft transition-colors hover:text-ink sm:inline"
            >
              All ages →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {AGE_BANDS.map((band) => (
              <Link
                key={band.id}
                to="/shop"
                search={{ age: band.id }}
                className="rounded-2xl bg-cream-deep p-5 ring-1 ring-line transition-transform hover:-translate-y-1"
              >
                <p className="font-display text-2xl font-semibold text-ink">{band.id}</p>
                <p className="mt-1 text-sm text-ink-soft">{band.blurb}</p>
                <p className="mt-4 text-xs font-semibold text-clay">Shop this age →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="bg-cream-deep/50 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-6">
            <p className="eyebrow">Curated shelves</p>
            <h2 className="mt-1 font-display text-3xl font-semibold tracking-tight text-balance text-ink">
              Collections we stand behind
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {collections.map((c) => (
              <Link
                key={c.title}
                to="/shop"
                search={{ age: c.ageBand }}
                className="group overflow-hidden rounded-2xl bg-cream ring-1 ring-line transition-transform hover:-translate-y-1"
              >
                <img
                  src={c.image}
                  alt={c.title}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="p-5">
                  <h3 className="font-display text-xl font-semibold text-ink">{c.title}</h3>
                  <p className="mt-1 text-sm text-pretty text-ink-soft">{c.blurb}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BAND */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-3xl bg-ink px-6 py-10 text-cream sm:px-10">
            <div className="grid gap-8 sm:grid-cols-3">
              <div>
                <p className="font-display text-3xl font-semibold text-butter">100%</p>
                <p className="mt-2 text-sm text-pretty text-cream/70">
                  Every product carries the BIS/ISI toy-safety mark or an equivalent
                  certification.
                </p>
              </div>
              <div>
                <p className="font-display text-3xl font-semibold text-butter">48 hrs</p>
                <p className="mt-2 text-sm text-pretty text-cream/70">
                  Hand-checked and dispatched from our Bengaluru studio.
                </p>
              </div>
              <div>
                <p className="font-display text-3xl font-semibold text-butter">30 days</p>
                <p className="mt-2 text-sm text-pretty text-cream/70">
                  Easy returns if it isn't the right fit for your child.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="eyebrow">Loved this week</p>
              <h2 className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink">
                Parent favourites
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              See all →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((toy) => (
              <ToyCard key={toy.slug} toy={toy} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
