export default function Footer() {
  return (
    <footer className="no-print mx-auto max-w-6xl px-6 py-12 text-sm text-paper/40">
      <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
        <div>© {new Date().getFullYear()} ScopeFlow. Built for freelancers who close.</div>
        <div className="flex gap-6">
          <a href="/studio" className="hover:text-paper/70">Studio</a>
          <a href="#pricing" className="hover:text-paper/70">Pricing</a>
        </div>
      </div>
    </footer>
  );
}
