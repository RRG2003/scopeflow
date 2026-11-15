import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative mx-auto flex max-w-6xl flex-col items-start px-6 pb-20 pt-16 sm:pt-24">
      <div className="no-print mb-6 inline-flex animate-[float_6s_ease-in-out_infinite] items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-teal">
        <span className="h-1.5 w-1.5 rounded-full bg-teal" />
        No signup · 100% private · Free to start
      </div>

      <h1 className="max-w-3xl font-display text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-paper sm:text-[3.75rem]">
        Close freelance deals{" "}
        <span className="italic text-ember">40% larger</span>
        <br />
        without the $50/mo subscription.
      </h1>

      <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/70">
        Stunning interactive 3-tier proposals &amp; protective contracts in 2
        minutes. Free, zero signup, 100% private — everything lives in your
        browser.
      </p>

      <div className="mt-9 flex flex-wrap items-center gap-4">
        <Link
          href="/studio"
          className="group relative overflow-hidden rounded-full bg-ember px-7 py-4 text-base font-semibold text-ink shadow-[0_8px_30px_rgba(255,90,54,0.35)] transition hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(255,90,54,0.5)]"
        >
          Build a Proposal Now (Free)
        </Link>
        <a
          href="#how"
          className="rounded-full border border-white/15 px-7 py-4 text-base font-medium text-paper/80 transition hover:border-white/40 hover:text-paper"
        >
          See how it works
        </a>
      </div>

      <div className="mt-16 grid w-full grid-cols-2 gap-6 border-t border-white/10 pt-8 text-sm text-paper/50 sm:grid-cols-4">
        <div>
          <div className="font-display text-2xl text-paper">2 min</div>
          avg. time to send
        </div>
        <div>
          <div className="font-display text-2xl text-paper">3 tiers</div>
          built-in upsell path
        </div>
        <div>
          <div className="font-display text-2xl text-paper">$9</div>
          one-time, lifetime
        </div>
        <div>
          <div className="font-display text-2xl text-paper">0</div>
          accounts to create
        </div>
      </div>
    </section>
  );
}
