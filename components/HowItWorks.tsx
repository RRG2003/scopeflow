const steps = [
  {
    n: "01",
    title: "Fill the brief",
    body: "Project, client, and your base rate. ScopeFlow builds three priced tiers instantly.",
  },
  {
    n: "02",
    title: "Tune the deal",
    body: "Toggle add-ons and legal clauses. Watch the live document update in real time.",
  },
  {
    n: "03",
    title: "Sign & send",
    body: "Both parties sign on-screen. Export a clean PDF straight from the browser.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="font-display text-3xl font-semibold text-paper sm:text-4xl">
        From blank page to signed deal.
      </h2>
      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {steps.map((s) => (
          <div
            key={s.n}
            className="glass rounded-2xl p-7 transition hover:-translate-y-1 hover:border-white/20"
          >
            <div className="font-mono-ui text-sm text-ember">{s.n}</div>
            <h3 className="mt-4 font-display text-xl text-paper">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-paper/60">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
