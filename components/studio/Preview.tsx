"use client";

import {
  CLAUSES,
  ProposalState,
  TIERS,
  tierTotal,
} from "@/lib/types";

interface Props {
  state: ProposalState;
  pro: boolean;
}

const currency = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function Preview({ state, pro }: Props) {
  const brand = state.brandColor || "#ff5a36";

  return (
    <div
      id="print-root"
      className="mx-auto w-full max-w-[780px] rounded-sm bg-paper text-ink shadow-[0_30px_80px_rgba(0,0,0,0.45)] print:max-w-none print:rounded-none print:shadow-none"
    >
      <div className="p-8 sm:p-12 print:p-0">
        {/* Header */}
        <div className="flex items-start justify-between gap-6 border-b pb-6" style={{ borderColor: brand }}>
          <div className="flex items-center gap-4">
            {state.logoDataUrl && pro ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={state.logoDataUrl} alt="logo" className="h-12 w-12 rounded object-contain" />
            ) : (
              <div
                className="flex h-12 w-12 items-center justify-center rounded font-display text-lg font-semibold text-white"
                style={{ background: brand }}
              >
                {state.yourCompany?.[0]?.toUpperCase() || "S"}
              </div>
            )}
            <div>
              <div className="font-display text-sm font-semibold uppercase tracking-wide text-ink/60">
                {state.yourCompany || "Your Company"}
              </div>
              <div className="font-mono-ui text-xs text-ink/40">{state.yourName}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono-ui text-xs uppercase tracking-[0.2em] text-ink/40">
              Proposal
            </div>
            <div className="mt-1 text-xs text-ink/50">
              Valid {state.validDays} days from issue
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="mt-8">
          <h1 className="font-display text-3xl font-semibold leading-tight text-ink">
            {state.projectName || "Untitled Project"}
          </h1>
          <p className="mt-2 text-sm text-ink/60">
            Prepared for{" "}
            <span className="font-semibold text-ink">
              {state.clientName || "Client Name"}
            </span>
            {state.clientCompany ? `, ${state.clientCompany}` : ""}
          </p>
        </div>

        {/* Tiers */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {TIERS.map((tier) => {
            const isHighlighted = tier.key === state.highlightedTier;
            return (
              <div
                key={tier.key}
                className="relative rounded-xl border p-5"
                style={{
                  borderColor: isHighlighted ? brand : "rgba(10,11,13,0.12)",
                  borderWidth: isHighlighted ? 2 : 1,
                  background: isHighlighted ? `${brand}0d` : "transparent",
                }}
              >
                {isHighlighted && (
                  <span
                    className="absolute -top-3 left-4 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white"
                    style={{ background: brand }}
                  >
                    Recommended
                  </span>
                )}
                <div className="font-display text-lg font-semibold text-ink">{tier.label}</div>
                <div className="mt-1 text-xs text-ink/50">{tier.tagline}</div>
                <div className="mt-4 font-display text-2xl font-semibold text-ink">
                  {currency(tierTotal(state, tier.key))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Add-ons */}
        {state.addons.some((a) => a.enabled) && (
          <div className="mt-8">
            <div className="font-mono-ui text-xs uppercase tracking-[0.2em] text-ink/40">
              Included add-ons
            </div>
            <ul className="mt-3 space-y-1.5 text-sm text-ink/75">
              {state.addons
                .filter((a) => a.enabled)
                .map((a) => (
                  <li key={a.id} className="flex items-center justify-between border-b border-dashed border-ink/10 py-1.5">
                    <span>{a.label}</span>
                    <span className="font-mono-ui text-ink/50">+{currency(a.price)}</span>
                  </li>
                ))}
            </ul>
          </div>
        )}

        {/* Notes */}
        {state.notes && (
          <div className="mt-8">
            <div className="font-mono-ui text-xs uppercase tracking-[0.2em] text-ink/40">
              Notes
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">{state.notes}</p>
          </div>
        )}

        {/* Clauses */}
        {CLAUSES.some((c) => state.clauses[c.key]) && (
          <div className="mt-8">
            <div className="font-mono-ui text-xs uppercase tracking-[0.2em] text-ink/40">
              Terms
            </div>
            <div className="mt-3 space-y-3">
              {CLAUSES.filter((c) => state.clauses[c.key]).map((c) => (
                <div key={c.key}>
                  <div className="text-xs font-semibold text-ink/70">{c.label}</div>
                  <p className="mt-0.5 text-xs leading-relaxed text-ink/50">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Signatures */}
        <div className="mt-10 grid gap-8 border-t border-ink/10 pt-8 sm:grid-cols-2">
          <SignatureBlock label="Provider" name={state.providerSignedName} dataUrl={state.providerSignature} />
          <SignatureBlock label="Client" name={state.clientSignedName} dataUrl={state.clientSignature} />
        </div>

        {/* Watermark */}
        {!pro && (
          <div className="mt-10 border-t border-dashed border-ink/15 pt-4 text-center text-[11px] tracking-wide text-ink/30">
            Made with ScopeFlow — remove this footer with the $9 Pro unlock
          </div>
        )}
      </div>
    </div>
  );
}

function SignatureBlock({
  label,
  name,
  dataUrl,
}: {
  label: string;
  name: string;
  dataUrl: string | null;
}) {
  return (
    <div>
      <div className="font-mono-ui text-xs uppercase tracking-[0.2em] text-ink/40">{label}</div>
      <div className="mt-2 h-16 border-b border-ink/30">
        {dataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={dataUrl} alt={`${label} signature`} className="h-16 object-contain" />
        ) : null}
      </div>
      <div className="mt-1 text-xs text-ink/50">{name || "Not signed yet"}</div>
    </div>
  );
}
