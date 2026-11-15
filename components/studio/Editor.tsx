"use client";

import { CLAUSES, ClauseKey, ProposalState, TIERS, TierKey } from "@/lib/types";
import SignaturePad from "./SignaturePad";

interface Props {
  state: ProposalState;
  setState: React.Dispatch<React.SetStateAction<ProposalState>>;
  pro: boolean;
  onUnlockClick: () => void;
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-paper/50">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-paper placeholder:text-paper/30 outline-none transition focus:border-ember/70 focus:bg-white/10";

export default function Editor({ state, setState, pro, onUnlockClick }: Props) {
  const update = <K extends keyof ProposalState>(key: K, value: ProposalState[K]) =>
    setState((s) => ({ ...s, [key]: value }));

  const toggleAddon = (id: string) =>
    setState((s) => ({
      ...s,
      addons: s.addons.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a)),
    }));

  const toggleClause = (key: ClauseKey) =>
    setState((s) => ({ ...s, clauses: { ...s.clauses, [key]: !s.clauses[key] } }));

  const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update("logoDataUrl", reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-8 pb-24">
      <section>
        <h2 className="font-display text-lg text-paper">Project &amp; client</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Project name">
            <input className={inputCls} value={state.projectName} onChange={(e) => update("projectName", e.target.value)} />
          </Field>
          <Field label="Client name">
            <input className={inputCls} value={state.clientName} onChange={(e) => update("clientName", e.target.value)} />
          </Field>
          <Field label="Client company">
            <input className={inputCls} value={state.clientCompany} onChange={(e) => update("clientCompany", e.target.value)} />
          </Field>
          <Field label="Client email">
            <input className={inputCls} value={state.clientEmail} onChange={(e) => update("clientEmail", e.target.value)} />
          </Field>
          <Field label="Your name">
            <input className={inputCls} value={state.yourName} onChange={(e) => update("yourName", e.target.value)} />
          </Field>
          <Field label="Your company">
            <input className={inputCls} value={state.yourCompany} onChange={(e) => update("yourCompany", e.target.value)} />
          </Field>
        </div>
      </section>

      <section>
        <h2 className="font-display text-lg text-paper">Pricing</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Base rate (Essential tier, USD)">
            <input
              type="number"
              className={inputCls}
              value={state.baseRate}
              onChange={(e) => update("baseRate", Number(e.target.value) || 0)}
            />
          </Field>
          <Field label="Proposal valid for (days)">
            <input
              type="number"
              className={inputCls}
              value={state.validDays}
              onChange={(e) => update("validDays", Number(e.target.value) || 0)}
            />
          </Field>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {TIERS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => update("highlightedTier", t.key as TierKey)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                state.highlightedTier === t.key
                  ? "border-ember bg-ember/15 text-ember"
                  : "border-white/15 text-paper/60 hover:border-white/30"
              }`}
            >
              Recommend {t.label} ({t.multiplier}×)
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-lg text-paper">Add-ons</h2>
        <div className="mt-4 space-y-2">
          {state.addons.map((a) => (
            <label
              key={a.id}
              className="flex cursor-pointer items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm transition hover:border-white/20"
            >
              <span className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={a.enabled}
                  onChange={() => toggleAddon(a.id)}
                  className="h-4 w-4 accent-ember"
                />
                {a.label}
              </span>
              <span className="font-mono-ui text-paper/50">+${a.price}</span>
            </label>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-lg text-paper">Legal clauses</h2>
        <div className="mt-4 space-y-2">
          {CLAUSES.map((c) => (
            <label
              key={c.key}
              className="flex cursor-pointer items-start gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm transition hover:border-white/20"
            >
              <input
                type="checkbox"
                checked={state.clauses[c.key]}
                onChange={() => toggleClause(c.key)}
                className="mt-0.5 h-4 w-4 accent-teal"
              />
              <span>
                <span className="block font-medium text-paper">{c.label}</span>
                <span className="mt-0.5 block text-xs text-paper/45">{c.text}</span>
              </span>
            </label>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-lg text-paper">Notes</h2>
        <textarea
          className={`${inputCls} mt-4 min-h-[90px]`}
          value={state.notes}
          onChange={(e) => update("notes", e.target.value)}
        />
      </section>

      <section>
        <h2 className="flex items-center gap-2 font-display text-lg text-paper">
          Branding
          {!pro && (
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-paper/50">
              Pro
            </span>
          )}
        </h2>
        <div className={`mt-4 grid gap-4 sm:grid-cols-2 ${!pro ? "pointer-events-none opacity-40" : ""}`}>
          <Field label="Brand color">
            <input
              type="color"
              className="h-11 w-full rounded-lg border border-white/15 bg-white/5"
              value={state.brandColor}
              onChange={(e) => update("brandColor", e.target.value)}
            />
          </Field>
          <Field label="Logo upload">
            <input type="file" accept="image/*" onChange={handleLogo} className="text-xs text-paper/60" />
          </Field>
        </div>
        {!pro && (
          <button
            type="button"
            onClick={onUnlockClick}
            className="mt-3 text-xs font-medium text-ember underline-offset-2 hover:underline"
          >
            Unlock Pro to customize branding →
          </button>
        )}
      </section>

      <section>
        <h2 className="font-display text-lg text-paper">Signatures</h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <div>
            <input
              className={`${inputCls} mb-3`}
              placeholder="Provider full name"
              value={state.providerSignedName}
              onChange={(e) => update("providerSignedName", e.target.value)}
            />
            <SignaturePad
              label="Provider signature"
              value={state.providerSignature}
              onChange={(v) => update("providerSignature", v)}
            />
          </div>
          <div>
            <input
              className={`${inputCls} mb-3`}
              placeholder="Client full name"
              value={state.clientSignedName}
              onChange={(e) => update("clientSignedName", e.target.value)}
            />
            <SignaturePad
              label="Client signature"
              value={state.clientSignature}
              onChange={(v) => update("clientSignature", v)}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
