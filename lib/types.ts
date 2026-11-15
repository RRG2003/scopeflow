export type TierKey = "essential" | "growth" | "premium";

export interface TierDef {
  key: TierKey;
  label: string;
  tagline: string;
  multiplier: number;
}

export const TIERS: TierDef[] = [
  { key: "essential", label: "Essential", tagline: "The core deliverable, done right.", multiplier: 1.0 },
  { key: "growth", label: "Growth", tagline: "More scope, faster turnaround.", multiplier: 1.35 },
  { key: "premium", label: "Premium", tagline: "White-glove, priority, everything.", multiplier: 1.75 },
];

export interface AddOn {
  id: string;
  label: string;
  price: number;
  enabled: boolean;
}

export const DEFAULT_ADDONS: AddOn[] = [
  { id: "rush", label: "Rush delivery (50% faster)", price: 350, enabled: false },
  { id: "revisions", label: "Extra revision round", price: 150, enabled: false },
  { id: "maintenance", label: "30-day post-launch support", price: 400, enabled: false },
  { id: "strategy", label: "Strategy workshop (90 min)", price: 250, enabled: false },
];

export type ClauseKey = "ipTransfer" | "lateFee" | "changeOrders";

export interface ClauseDef {
  key: ClauseKey;
  label: string;
  text: string;
}

export const CLAUSES: ClauseDef[] = [
  {
    key: "ipTransfer",
    label: "IP Transfer on Final Payment",
    text:
      "All intellectual property rights in the final deliverables transfer to the Client upon receipt of final payment in full. Prior to that, all work remains the exclusive property of the Provider.",
  },
  {
    key: "lateFee",
    label: "Late Payment Fee (1.5%/mo)",
    text:
      "Invoices not paid within 14 days of the due date accrue a late fee of 1.5% of the outstanding balance per month until paid in full.",
  },
  {
    key: "changeOrders",
    label: "Change Order Policy",
    text:
      "Work outside the agreed scope requires a written change order with updated pricing and timeline, approved by both parties before work begins.",
  },
];

export interface ProposalState {
  projectName: string;
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  yourName: string;
  yourCompany: string;
  baseRate: number;
  highlightedTier: TierKey;
  addons: AddOn[];
  clauses: Record<ClauseKey, boolean>;
  notes: string;
  validDays: number;
  brandColor: string;
  logoDataUrl: string | null;
  providerSignature: string | null;
  clientSignature: string | null;
  providerSignedName: string;
  clientSignedName: string;
}

export const DEFAULT_PROPOSAL: ProposalState = {
  projectName: "Brand Website Redesign",
  clientName: "Jordan Lee",
  clientCompany: "North & Pine Co.",
  clientEmail: "jordan@northandpine.com",
  yourName: "Alex Rivera",
  yourCompany: "Rivera Studio",
  baseRate: 3200,
  highlightedTier: "growth",
  addons: DEFAULT_ADDONS,
  clauses: { ipTransfer: true, lateFee: true, changeOrders: true },
  notes:
    "Timeline begins upon signed agreement and 50% deposit. Remaining balance due on delivery.",
  validDays: 14,
  brandColor: "#ff5a36",
  logoDataUrl: null,
  providerSignature: null,
  clientSignature: null,
  providerSignedName: "",
  clientSignedName: "",
};

export function tierTotal(state: ProposalState, tier: TierKey): number {
  const def = TIERS.find((t) => t.key === tier)!;
  const addonsTotal = state.addons
    .filter((a) => a.enabled)
    .reduce((sum, a) => sum + a.price, 0);
  return Math.round(state.baseRate * def.multiplier + addonsTotal);
}
