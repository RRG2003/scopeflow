import Link from "next/link";

export default function Header() {
  return (
    <header className="no-print sticky top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 font-display text-xl italic tracking-tight text-paper">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-ember shadow-[0_0_14px_2px_rgba(255,90,54,0.8)]" />
          ScopeFlow
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-paper/70 sm:flex">
          <a href="#how" className="transition hover:text-paper">How it works</a>
          <a href="#pricing" className="transition hover:text-paper">Pricing</a>
        </nav>
        <Link
          href="/studio"
          className="rounded-full bg-paper px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-lime"
        >
          Open Studio
        </Link>
      </div>
    </header>
  );
}
