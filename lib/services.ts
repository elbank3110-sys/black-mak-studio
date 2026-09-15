// ============================================================================
// Services + pricing — the SINGLE source of truth.
// Both the Services rows (04) and the Investment cards (08) render from
// this file. The S.0X ids and prices are defined once — a mismatch between
// the two sections can never happen again.
//
// Pricing strategy (2026): the design and copy position BLACK-MAK as a
// high-end identity practice, so the entry points reflect it. Starting
// prices are honest floors for focused scopes — real projects are quoted
// individually after the brief.
// ============================================================================

export type ServiceTier = {
  id: "S.01" | "S.02" | "S.03" | "S.04" | "S.05" | "S.06";
  /** Services row copy */
  nameKey: string;
  descKey: string;
  incKey: string;
  /** Investment card copy (name/desc reuse the same meaning, card voice) */
  planNameKey: string;
  planDescKey: string;
  planItemsKeys: string[];
  planExtraKey: string;
  planCtaKey: string;
  /** Starting price anchor — null = custom-scoped, no fixed anchor */
  from: number | null;
  featured?: boolean;
};

export const SERVICE_TIERS: ServiceTier[] = [
  {
    id: "S.01",
    nameKey: "services.s1name",
    descKey: "services.s1desc",
    incKey: "services.s1inc",
    planNameKey: "pricing.1name",
    planDescKey: "pricing.1desc",
    planItemsKeys: [
      "pricing.1a", "pricing.1b",
      "pricing.1c1", "pricing.1c2", "pricing.1c3", "pricing.1c4", "pricing.1c5",
      "pricing.1c6", "pricing.1d",
    ],
    planExtraKey: "pricing.1e",
    planCtaKey: "pricing.cta1",
    from: 249,
  },
  {
    id: "S.02",
    nameKey: "services.s2name",
    descKey: "services.s2desc",
    incKey: "services.s2inc",
    planNameKey: "pricing.3name",
    planDescKey: "pricing.3desc",
    planItemsKeys: [
      "pricing.3a",
      "pricing.3b1", "pricing.3b2", "pricing.3b3", "pricing.3b4", "pricing.3b5",
      "pricing.3b6", "pricing.3b7", "pricing.3b8", "pricing.3b9", "pricing.3b10",
      "pricing.3b11", "pricing.3b12", "pricing.3b13", "pricing.3b14", "pricing.3c",
    ],
    planExtraKey: "pricing.3d",
    planCtaKey: "pricing.cta3",
    from: 749,
    featured: true,
  },
  {
    id: "S.03",
    nameKey: "services.s3name",
    descKey: "services.s3desc",
    incKey: "services.s3inc",
    planNameKey: "pricing.2name",
    planDescKey: "pricing.2desc",
    planItemsKeys: [
      "pricing.2a", "pricing.2b",
      "pricing.2c1", "pricing.2c2", "pricing.2c3", "pricing.2c4", "pricing.2c5",
      "pricing.2c6", "pricing.2c7", "pricing.2d",
    ],
    planExtraKey: "pricing.2e",
    planCtaKey: "pricing.cta2",
    from: 390,
  },
  {
    id: "S.04",
    nameKey: "services.s4name",
    descKey: "services.s4desc",
    incKey: "services.s4inc",
    planNameKey: "",
    planDescKey: "",
    planItemsKeys: [],
    planExtraKey: "",
    planCtaKey: "",
    from: null,
  },
  {
    id: "S.05",
    nameKey: "services.s5name",
    descKey: "services.s5desc",
    incKey: "services.s5inc",
    planNameKey: "",
    planDescKey: "",
    planItemsKeys: [],
    planExtraKey: "",
    planCtaKey: "",
    from: 590,
  },
  {
    id: "S.06",
    nameKey: "services.s6name",
    descKey: "services.s6desc",
    incKey: "services.s6inc",
    planNameKey: "",
    planDescKey: "",
    planItemsKeys: [],
    planExtraKey: "",
    planCtaKey: "",
    from: 999,
  },
];

/** The investment cards (08) — rendered top-to-bottom from this order. */
export const INVESTMENT_PLAN_TIERS = SERVICE_TIERS.filter(
  (s) => s.planNameKey !== ""
);

export const fmtPrice = (n: number) => `$${n.toLocaleString("en-US")}`;
