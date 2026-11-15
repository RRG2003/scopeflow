"use client";

import { useEffect, useState } from "react";
import { getPaymentLink, isPro } from "@/lib/unlock";

export default function PricingSection() {
  const [pro, setProState] = useState(false);

  useEffect(() => {
    setProState(isPro());
  }, []);

  return (
    <section id="pricing" className="mx-auto max-w-6xl px-6 py-20">
      <div className="glass relative overflow-hidden rounded-3xl p-10 sm:p-14">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-ember/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-teal/20 blur-3xl" />

        <div className="relative flex flex-col items-start justify-between gap-10 sm:flex-row sm:items-end">
          <div>
            <div className="font-mono-ui text-xs uppercase tracking-[0.2em] text-teal">
              Simple pricing
            </div>
            <h2 className="mt-3 font-display text-3xl font-semibold text-paper sm:text-4xl">
              Free forever. Pay once to go pro.
            </h2>
            <p className="mt-4 max-w-lg text-paper/65">
              Every proposal you build is yours — full tiers, clauses, and
              signatures, free with a small ScopeFlow watermark. Unlock Pro
              once and watermarks are gone for good, on every device.
            </p>
          </div>

          <div className="w-full max-w-sm shrink-0 rounded-2xl border border-white/10 bg-ink/60 p-8">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-5xl font-semibold text-paper">$9</span>
              <span className="text-paper/50">one-time</span>
            </div>
            <ul className="mt-6 space-y-3 text-sm text-paper/75">
              <li className="flex items-center gap-2">
                <Dot /> No watermark on PDFs
              </li>
              <li className="flex items-center gap-2">
                <Dot /> Custom brand color
              </li>
              <li className="flex items-center gap-2">
                <Dot /> Upload your own logo
              </li>
              <li className="flex items-center gap-2">
                <Dot /> Unlimited proposals, forever
              </li>
            </ul>

            {pro ? (
              <div className="mt-7 rounded-full bg-lime/90 px-6 py-3 text-center text-sm font-semibold text-ink">
                ✓ Pro unlocked on this device
              </div>
            ) : (
              <a
                href={getPaymentLink()}
                className="mt-7 block rounded-full bg-ember px-6 py-3.5 text-center text-sm font-semibold text-ink transition hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(255,90,54,0.4)]"
              >
                Unlock ScopeFlow Pro — $9
              </a>
            )}
            <a
              href="/studio"
              className="mt-3 block text-center text-xs text-paper/40 underline-offset-2 hover:text-paper/60 hover:underline"
            >
              Have a code? Enter it in the Studio
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Dot() {
  return <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />;
}
