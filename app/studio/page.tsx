"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Editor from "@/components/studio/Editor";
import Preview from "@/components/studio/Preview";
import { DEFAULT_PROPOSAL, ProposalState } from "@/lib/types";
import {
  checkUnlockFromLocation,
  getPaymentLink,
  isPro,
  tryManualCode,
} from "@/lib/unlock";

export default function StudioPage() {
  const [state, setState] = useState<ProposalState>(DEFAULT_PROPOSAL);
  const [pro, setPro] = useState(false);
  const [justUnlocked, setJustUnlocked] = useState(false);
  const [showCodeBox, setShowCodeBox] = useState(false);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState(false);

  useEffect(() => {
    const unlockedNow = checkUnlockFromLocation();
    if (unlockedNow) setJustUnlocked(true);
    setPro(isPro());
  }, []);

  function handlePrint() {
    window.print();
  }

  function handleCodeSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (tryManualCode(code)) {
      setPro(true);
      setCodeError(false);
      setShowCodeBox(false);
    } else {
      setCodeError(true);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="no-print sticky top-0 z-20 border-b border-white/10 bg-ink/80 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-5 py-3.5">
          <Link href="/" className="flex items-center gap-2 font-display text-lg italic text-paper">
            <span className="inline-block h-2 w-2 rounded-full bg-ember" />
            ScopeFlow
          </Link>

          <div className="flex items-center gap-3">
            {pro ? (
              <span className="rounded-full bg-lime/90 px-3 py-1.5 text-xs font-semibold text-ink">
                ✓ Pro unlocked
              </span>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setShowCodeBox((v) => !v)}
                  className="text-xs text-paper/50 underline-offset-2 hover:text-paper/80 hover:underline"
                >
                  Have a code?
                </button>
                <a
                  href={getPaymentLink()}
                  className="rounded-full bg-ember px-4 py-2 text-xs font-semibold text-ink transition hover:scale-105"
                >
                  Unlock Pro — $9
                </a>
              </>
            )}
            <button
              type="button"
              onClick={handlePrint}
              className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-paper transition hover:border-white/40"
            >
              Download PDF
            </button>
          </div>
        </div>

        {showCodeBox && !pro && (
          <form onSubmit={handleCodeSubmit} className="mx-auto flex max-w-[1500px] items-center gap-2 px-5 pb-3">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter unlock code"
              className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-paper outline-none focus:border-ember/70"
            />
            <button type="submit" className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-paper hover:bg-white/20">
              Apply
            </button>
            {codeError && <span className="text-xs text-ember">Invalid code</span>}
          </form>
        )}

        {justUnlocked && (
          <div className="mx-auto max-w-[1500px] px-5 pb-3 text-xs font-medium text-lime">
            🎉 Payment confirmed — ScopeFlow Pro is unlocked on this device.
          </div>
        )}
      </header>

      <div className="mx-auto grid w-full max-w-[1500px] flex-1 gap-8 px-5 py-8 lg:grid-cols-[minmax(0,480px)_1fr]">
        <div className="no-print scrollbar-thin lg:max-h-[calc(100vh-110px)] lg:overflow-y-auto lg:pr-4">
          <Editor state={state} setState={setState} pro={pro} onUnlockClick={() => (window.location.href = getPaymentLink())} />
        </div>
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Preview state={state} pro={pro} />
        </div>
      </div>

      {/* Print-only container is #print-root inside Preview; it's rendered above but
          CSS hides everything else via globals.css @media print rules. */}
    </div>
  );
}
