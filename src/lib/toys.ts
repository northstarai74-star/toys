import heroShelf from "@/assets/hero-shelf.jpg";

export { heroShelf };

import sensoryBall from "@/assets/toy-sensory-ball.jpg";
import stackingRings from "@/assets/toy-stacking-rings.jpg";
import shapeSorter from "@/assets/toy-shape-sorter.jpg";
import buildingBlocks from "@/assets/toy-building-blocks.jpg";
import abacus from "@/assets/toy-abacus.jpg";
import trainSet from "@/assets/toy-train-set.jpg";
import peacockPuzzle from "@/assets/toy-peacock-puzzle.jpg";
import robotKit from "@/assets/toy-robot-kit.jpg";

export type WhatItBuilds = { title: string; detail: string };

export type Toy = {
  slug: string;
  name: string;
  tagline: string;
  price: number;
  mrp?: number;
  category: string;
  ageBand: string;
  ageLabel: string;
  skills: string[];
  certifications: string[];
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  description: string;
  whatItBuilds: WhatItBuilds[];
  safetyNotes: string;
  details: string[];
};

export const AGE_BANDS = [
  { id: "0–18 mo", title: "First Touch", blurb: "Sensory play & first grasp" },
  { id: "18 mo–3 yr", title: "Little Builders", blurb: "Stacking, sorting & cause" },
  { id: "3–6 yr", title: "Busy Hands", blurb: "Logic, language & narrative" },
  { id: "6–12 yr", title: "Deep Focus", blurb: "Strategy, engineering & STEM" },
] as const;

export const CATEGORIES = [
  "Sensory",
  "Wooden",
  "Puzzles",
  "STEM & Builds",
] as const;

export const PRICE_BUCKETS = [
  { id: "under-1000", label: "Under ₹1,000", test: (p: number) => p < 1000 },
  { id: "1000-2000", label: "₹1,000–2,000", test: (p: number) => p >= 1000 && p < 2000 },
  { id: "2000-plus", label: "₹2,000+", test: (p: number) => p >= 2000 },
] as const;

export const SKILL_FILTERS = [
  "Fine motor",
  "Sensory exploration",
  "Spatial reasoning",
  "Number sense",
  "Problem solving",
  "Creativity",
  "Narrative play",
  "Engineering",
] as const;

export const CERTIFICATIONS = ["BIS/ISI", "FSC wood", "Non-toxic finish", "OEKO-TEX cotton"] as const;

export const toys: Toy[] = [
  {
    slug: "first-grasp-sensory-ball",
    name: "First Grasp Sensory Ball + Teether",
    tagline: "Knitted textures that ask to be touched",
    price: 649,
    category: "Sensory",
    ageBand: "0–18 mo",
    ageLabel: "Ages 0–18 mo",
    skills: ["Sensory exploration", "Fine motor", "Grasp & reach"],
    certifications: ["BIS/ISI", "OEKO-TEX cotton", "Non-toxic finish"],
    rating: 4.8,
    reviews: 214,
    image: sensoryBall,
    description:
      "Six knitted textures on one soft cotton ball, paired with a smooth beech teether ring. Light enough for small hands to pass from palm to palm — often the first toy a baby chooses for themselves.",
    whatItBuilds: [
      { title: "Tactile awareness", detail: "Six distinct weaves invite comparing, naming and reaching back for more." },
      { title: "Grasp & release", detail: "A size that fits emerging palm grips without frustrating them." },
      { title: "Cause & effect", detail: "It rolls, it squishes, it responds — early physics, softly." },
      { title: "Soothing", detail: "The teether ring eases sore gums through the teething months." },
    ],
    safetyNotes:
      "Carries the BIS/ISI toy-safety mark. Organic cotton outer, OEKO-TEX certified yarns, and a sealed beech teether with no detachable parts. Machine-washable at 30°C.",
    details: [
      "Organic cotton outer, hypoallergenic fill",
      "Sealed beech teether ring, sanded smooth",
      "Machine-washable, tumble-dry low",
      "Weight: 110 g — light enough for newborn hands",
    ],
  },
  {
    slug: "ring-by-ring-stacker",
    name: "Ring by Ring Stacker",
    tagline: "Seven rings, quietly teaching order",
    price: 899,
    mrp: 1099,
    category: "Wooden",
    ageBand: "18 mo–3 yr",
    ageLabel: "Ages 18 mo – 3 yr",
    skills: ["Fine motor", "Size gradation", "Colour sorting"],
    certifications: ["BIS/ISI", "FSC wood", "Non-toxic finish"],
    rating: 4.9,
    reviews: 187,
    image: stackingRings,
    badge: "Bestseller",
    description:
      "A classic re-finished: seven rings in warm terracotta, sage and butter tones, each sanded smooth and finished with food-grade oil. Children discover size order long before we name it for them.",
    whatItBuilds: [
      { title: "Size gradation", detail: "Big to small — the first pre-maths sequence children master with their hands." },
      { title: "Fine motor", detail: "Threading rings onto the post refines wrist rotation and finger control." },
      { title: "Colour language", detail: "Warm, muted tones are easy to name and compare." },
      { title: "Persistence", detail: "A toppled tower is a beginning, not a failure." },
    ],
    safetyNotes:
      "Carries the BIS/ISI toy-safety mark. FSC-certified beech and maple, finished with water-based, food-safe colour. One solid piece — no small detachable parts; post caps are permanently fixed.",
    details: [
      "7 painted rings + solid wood base, one piece",
      "FSC-certified beech & maple",
      "Water-based, food-safe colour finish",
      "Height: 22 cm · Weight: 540 g",
    ],
  },
  {
    slug: "shape-sorter-cube",
    name: "Shape Sorter Cube",
    tagline: "Six shapes, one satisfying thunk",
    price: 1299,
    category: "Wooden",
    ageBand: "18 mo–3 yr",
    ageLabel: "Ages 18 mo – 3 yr",
    skills: ["Spatial reasoning", "Fine motor", "Problem solving"],
    certifications: ["BIS/ISI", "FSC wood", "Non-toxic finish"],
    rating: 4.9,
    reviews: 156,
    image: shapeSorter,
    description:
      "A beech cube with softly routed openings and six solid pieces. The matching moment — trial, rotate, drop, thunk — is one of the most rewarding problems a toddler will solve this year.",
    whatItBuilds: [
      { title: "Spatial reasoning", detail: "Rotation and fitting build the mental toolbox behind later geometry." },
      { title: "Hand-eye coordination", detail: "Aim, align, release — repeated until it feels easy." },
      { title: "Shape vocabulary", detail: "Circle, star, triangle: words attach to things they can hold." },
      { title: "Independent play", detail: "Self-correcting by design — no adult needed to say 'well done'." },
    ],
    safetyNotes:
      "Carries the BIS/ISI toy-safety mark. Solid FSC beech with hand-sanded edges; pieces are sized well above small-parts thresholds and finished with water-based, non-toxic colour.",
    details: [
      "6 solid shapes + routed cube with lift-off lid",
      "FSC-certified beech",
      "Water-based, non-toxic finish",
      "Cube: 14 × 14 × 14 cm",
    ],
  },
  {
    slug: "block-and-beam-set",
    name: "Block & Beam Building Set",
    tagline: "48 blocks that become anything",
    price: 1899,
    category: "Wooden",
    ageBand: "3–6 yr",
    ageLabel: "Ages 3–6 yr",
    skills: ["Creativity", "Spatial reasoning", "Problem solving"],
    certifications: ["BIS/ISI", "FSC wood", "Non-toxic finish"],
    rating: 4.9,
    reviews: 98,
    image: buildingBlocks,
    badge: "New",
    description:
      "Forty-eight blocks in arcs, cylinders, cubes and prisms — the geometry of bridges, zoos and rocket launch pads. Open-ended by design: the set has one rule, and it is gravity.",
    whatItBuilds: [
      { title: "Construction logic", detail: "Balance and counterweight are learned long before they're named." },
      { title: "Spatial reasoning", detail: "Three-dimensional thinking grows with every rebuild." },
      { title: "Creative confidence", detail: "No single right answer — the set rewards bold ideas." },
      { title: "Cooperation", detail: "Big builds need two sets of hands." },
    ],
    safetyNotes:
      "Carries the BIS/ISI toy-safety mark. FSC-certified beech and rubberwood, finished with water-based non-toxic colour. Every block is a single solid piece with rounded corners.",
    details: [
      "48 solid blocks in 8 shapes",
      "Cotton storage drawstring bag",
      "FSC-certified beech & rubberwood",
      "Largest block: 12 × 6 × 3 cm",
    ],
  },
  {
    slug: "counting-abacus",
    name: "Counting Abacus",
    tagline: "Numbers you can hold",
    price: 1249,
    category: "Wooden",
    ageBand: "3–6 yr",
    ageLabel: "Ages 3–6 yr",
    skills: ["Number sense", "Fine motor", "Focus"],
    certifications: ["BIS/ISI", "FSC wood", "Non-toxic finish"],
    rating: 4.8,
    reviews: 142,
    image: abacus,
    description:
      "Eighty weighted beads on a sturdy beech frame. A quiet, screen-free way to make counting, grouping and place value feel tangible — the arithmetic foundation starts here.",
    whatItBuilds: [
      { title: "Number sense", detail: "Counting, grouping and early place value, one bead at a time." },
      { title: "Fine motor", detail: "Precise bead movement strengthens the small muscles that later hold pencils." },
      { title: "Focus", detail: "One task at a time builds sustained attention." },
      { title: "Patience", detail: "Open-ended play rewards slow, careful thinking." },
    ],
    safetyNotes:
      "Carries the BIS/ISI toy-safety mark. FSC-certified beech frame with lacquered steel rails and painted, non-toxic beads. Beads are too large to pose a small-parts risk.",
    details: [
      "80 weighted beads on 8 rails",
      "FSC-certified beech frame",
      "Non-toxic painted beads",
      "Frame: 28 × 26 cm · Weight: 890 g",
    ],
  },
  {
    slug: "little-express-train-set",
    name: "The Little Express Train Set",
    tagline: "A railway that never runs the same route twice",
    price: 2199,
    category: "Wooden",
    ageBand: "3–6 yr",
    ageLabel: "Ages 3–6 yr",
    skills: ["Narrative play", "Problem solving", "Fine motor"],
    certifications: ["BIS/ISI", "FSC wood", "Non-toxic finish"],
    rating: 4.9,
    reviews: 76,
    image: trainSet,
    description:
      "An engine, two carriages, a load of cargo and sixteen curved and straight track pieces. Every session ends with a new layout — and a new story about where the little express is going.",
    whatItBuilds: [
      { title: "Narrative play", detail: "Routes become journeys; journeys become stories told out loud." },
      { title: "Planning", detail: "Closed loops need spatial planning — and a few happy crashes." },
      { title: "Fine motor", detail: "Clicking track joints together is quietly demanding work." },
      { title: "Turn-taking", detail: "One engine, many station masters." },
    ],
    safetyNotes:
      "Carries the BIS/ISI toy-safety mark. FSC-certified beech with water-based non-toxic finish; magnetic couplings are fully enclosed with no exposed magnets.",
    details: [
      "Engine + 2 carriages + 16 track pieces + 4 cargo blocks",
      "FSC-certified beech",
      "Enclosed magnetic couplings",
      "Track loop builds up to 90 × 50 cm",
    ],
  },
  {
    slug: "monsoon-peacock-puzzle",
    name: "Monsoon Peacock Wooden Puzzle",
    tagline: "Twenty-four pieces of patient work",
    price: 999,
    category: "Puzzles",
    ageBand: "3–6 yr",
    ageLabel: "Ages 3–6 yr",
    skills: ["Problem solving", "Fine motor", "Patience"],
    certifications: ["BIS/ISI", "FSC wood", "Non-toxic finish"],
    rating: 4.8,
    reviews: 121,
    image: peacockPuzzle,
    description:
      "A hand-illustrated peacock in full monsoon plumage, cut into twenty-four thick wooden pieces that sit in a matching tray. Challenging enough to matter, gentle enough to finish.",
    whatItBuilds: [
      { title: "Problem solving", detail: "Colour, edge and shape clues are tested and revised piece by piece." },
      { title: "Visual memory", detail: "Remembering where a piece belongs is quiet, real cognitive work." },
      { title: "Fine motor", detail: "Picking up, rotating and seating pieces builds precise control." },
      { title: "Patience", detail: "The last piece is earned, not given." },
    ],
    safetyNotes:
      "Carries the BIS/ISI toy-safety mark. 4 mm FSC birch ply with rounded corners and non-toxic inks; pieces sized well above small-parts thresholds.",
    details: [
      "24 wooden pieces in a matching storage tray",
      "4 mm FSC birch ply",
      "Hand-illustrated, non-toxic inks",
      "Finished size: 30 × 24 cm",
    ],
  },
  {
    slug: "solar-robot-lab",
    name: "Solar Robot Lab",
    tagline: "Build a bot that runs on sunlight",
    price: 2499,
    mrp: 2999,
    category: "STEM & Builds",
    ageBand: "6–12 yr",
    ageLabel: "Ages 6–12 yr",
    skills: ["Engineering", "Problem solving", "Number sense"],
    certifications: ["BIS/ISI", "Non-toxic finish"],
    rating: 4.9,
    reviews: 203,
    image: robotKit,
    badge: "Bestseller",
    description:
      "A wooden-bodied robot kit with a real solar panel, motor and gear train. Assembly takes a focused afternoon; the payoff is a bot that walks, then a child who explains photovoltaics at dinner.",
    whatItBuilds: [
      { title: "Engineering intuition", detail: "Gears, torque and friction — discovered with a screwdriver in hand." },
      { title: "Renewable energy", detail: "The sun moves it. That fact does more teaching than any diagram." },
      { title: "Sequencing", detail: "Steps build on steps — skip one and the bot politely refuses." },
      { title: "Persistence", detail: "Real builds stall; real builders troubleshoot." },
    ],
    safetyNotes:
      "Carries the BIS/ISI toy-safety mark. Solar panel outputs under 1.5 V — no batteries, no mains. Blunted assembly tools, splinter-free laser-cut ply, and a screw-set tray to keep parts off the floor.",
    details: [
      "Laser-cut ply body, solar panel, DC motor, gear set",
      "Illustrated assembly guide with physics sidebars",
      "No batteries required — solar powered",
      "Build time: 2–4 hours with a grown-up",
    ],
  },
];

export function getToy(slug: string): Toy | undefined {
  return toys.find((t) => t.slug === slug);
}

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export const collections = [
  {
    title: "The First Year",
    blurb: "Soft, graspable, washable — play for the earliest months.",
    ageBand: "0–18 mo",
    image: sensoryBall,
  },
  {
    title: "The Oak Shelf",
    blurb: "Wooden classics that grow with the child, not past them.",
    ageBand: "18 mo–3 yr",
    image: buildingBlocks,
  },
  {
    title: "Little Problem Solvers",
    blurb: "Puzzles, sorts and trains for determined thinking.",
    ageBand: "3–6 yr",
    image: peacockPuzzle,
  },
];
