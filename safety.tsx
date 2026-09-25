import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/safety")({
  head: () => ({
    meta: [
      { title: "Why we vet — Khel" },
      {
        name: "description",
        content:
          "How every toy on Khel's shelf is sourced, safety-certified and age-labelled — the BIS/ISI mark, non-toxic finishes and our 30-day promise.",
      },
      { property: "og:title", content: "Why we vet — Khel" },
      {
        property: "og:description",
        content:
          "How every toy on Khel's shelf is sourced, safety-certified and age-labelled.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SafetyPage,
});

const steps = [
  {
    title: "Sourced small",
    detail:
      "We buy from a short list of makers we've visited or worked with for years. No marketplace drop-shipping, no anonymous supply chains.",
  },
  {
    title: "Tested & certified",
    detail:
      "Every batch arrives with its BIS/ISI toy-safety documentation. We verify the mark, the batch and the materials sheet before anything reaches the shelf.",
  },
  {
    title: "Played with",
    detail:
      "A toy doesn't list until children have played with it — our own kids, our neighbours' kids, and the parents who write our reviews.",
  },
  {
    title: "Age-labelled & skill-mapped",
    detail:
      "Each toy carries an honest age band and the specific skills it builds, so you can choose for the child in front of you, not a generic '3+'.",
  },
];

const standards = [
  {
    name: "BIS/ISI toy-safety mark",
    detail:
      "India's mandatory toy safety certification (IS 9873 series) covers mechanical, chemical and flammability hazards. We won't list a toy without it or an equivalent international certification.",
  },
  {
    name: "Non-toxic finishes",
    detail:
      "Paints and oils must be water-based and food-safe. We check heavy-metal limits on every supplier's material sheet.",
  },
  {
    name: "FSC-certified wood",
    detail:
      "Wood comes from responsibly managed forests, and pieces are sanded smooth with rounded corners — splinters and sharp edges don't ship.",
  },
  {
    name: "Small-parts discipline",
    detail:
      "For anything under 3 years, we verify part sizes against the small-parts cylinder test and check for detachable pieces, exposed magnets and long cords.",
  },
];

function SafetyPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-20 pt-10">
      <div className="max-w-2xl">
        <p className="eyebrow">Why we vet</p>
        <h1 className="mt-2 font-display text-4xl font-semibold leading-tight tracking-tight text-balance text-ink sm:text-5xl">
          A toy earns its shelf place. It isn't given one.
        </h1>
        <p className="mt-4 text-lg text-pretty text-ink-soft">
          India's toy market is enormous and largely unregulated in practice. Khel exists
          because parents deserve a small shelf they can trust more than a giant catalogue
          they can't.
        </p>
      </div>

      {/* Process */}
      <section className="mt-12 grid gap-5 sm:grid-cols-2">
        {steps.map((s, i) => (
          <div key={s.title} className="rounded-2xl bg-cream-deep p-6 ring-1 ring-line">
            <p className="font-display text-sm font-semibold text-clay">
              Step {String(i + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-2 font-display text-xl font-semibold text-ink">{s.title}</h2>
            <p className="mt-2 text-sm text-pretty text-ink-soft">{s.detail}</p>
          </div>
        ))}
      </section>

      {/* Standards */}
      <section className="mt-14">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">
          The standards we hold
        </h2>
        <div className="mt-6 space-y-4">
          {standards.map((s) => (
            <div
              key={s.name}
              className="flex items-start gap-4 rounded-2xl bg-cream p-5 ring-1 ring-line"
            >
              <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-sage/15 text-sm font-bold text-sage">
                ✓
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-ink">{s.name}</h3>
                <p className="mt-1 text-sm text-pretty text-ink-soft">{s.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promise */}
      <section className="mt-14">
        <div className="rounded-3xl bg-ink px-6 py-10 text-cream sm:px-10">
          <p className="font-display text-2xl font-semibold text-butter sm:text-3xl">
            The 30-day promise
          </p>
          <p className="mt-3 max-w-[60ch] text-sm text-pretty text-cream/70 sm:text-base">
            If a toy isn't the right fit for your child — wrong age, wrong interest, or it
            simply didn't earn its place on your shelf — send it back within 30 days for a
            full refund. We hand-check every return, refurbish what we can, and donate what
            we can't.
          </p>
          <Link
            to="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-butter px-5 py-3 text-sm font-semibold text-ink transition-colors hover:brightness-105"
          >
            Shop the shelf <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
