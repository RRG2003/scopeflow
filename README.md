# ScopeFlow

**Create interactive 3-tier proposals and signable client contracts in 2 minutes. No signup, private, free with a watermark.**

ScopeFlow is a local-first, browser-only proposal & contract studio for
freelancers and agencies. Everything — state, signatures, branding — lives
in the browser. Nothing is sent to a server. Export to PDF with the
browser's native print dialog.

## Features

- **Split studio UI** — editor on the left, live document preview on the right
- **3 pricing tiers** built from one base rate: Essential (1.0×), Growth (1.35×), Premium (1.75×)
- **Add-ons** with dynamic running totals (rush delivery, extra revisions, support, strategy call)
- **Toggleable legal clauses** — IP transfer, late payment fee, change order policy
- **Dual signature pads** (HTML5 canvas, mouse + touch, clear button)
- **One-click PDF export** via the browser print dialog (`window.print()` + `@media print` rules that hide all app chrome and print only the document)
- **Freemium paywall**: free plan ships a subtle "Made with ScopeFlow" watermark; Pro ($9 one-time) removes it and unlocks custom brand color + logo upload
- **No backend required** — unlock state is stored in `localStorage`

## Run it locally

```bash
npm install
cp .env.local.example .env.local   # then fill in your Stripe Payment Link
npm run dev
```

Visit `http://localhost:3000` for the landing page, or `http://localhost:3000/studio` to jump straight into the builder.

## How to take money (do this in under 5 minutes)

1. **Create a Stripe Payment Link** (or Lemon Squeezy / Polar if you prefer):
   - Stripe Dashboard → Payment Links → New → $9.00 USD, one-time.
   - Under "After payment", set the confirmation page to **redirect to your URL**:
     `https://your-deployed-domain.com/studio?paid=1`
   - Save and copy the Payment Link URL (looks like `https://buy.stripe.com/xxxx`).

2. **Set the env var** (locally in `.env.local`, and in your Vercel/Netlify project settings):
   ```
   NEXT_PUBLIC_STRIPE_PAYMENT_LINK=https://buy.stripe.com/xxxx
   ```

3. **Redeploy.** The "Unlock Pro — $9" buttons on the landing page and in the studio now point straight at your live Payment Link.

4. **When a customer pays**, Stripe redirects them back to `/studio?paid=1`, which flips a `localStorage` flag and permanently removes the watermark + unlocks branding on that device — no backend, webhook, or database needed for v1.

5. **Testing without paying**: visit `/studio?unlock=SF9-DEMO` (or whatever you set `NEXT_PUBLIC_PRO_UNLOCK_CODE` to), or click "Have a code?" in the studio header and type the code. The success URL `?license_key=SF99_SUCCESS` is also recognized if your payment provider only supports a fixed success token.

> **Note:** This MVP unlock is per-device/per-browser (localStorage), which is the fastest way to start charging today. If you want unlock to follow a customer across devices, add a backend check against the Stripe Checkout Session ID (`?session_id={CHECKOUT_SESSION_ID}` on the success URL) and verify server-side — see "Roadmap" below.

## Deploy

### Vercel (recommended, fastest)

```bash
npm i -g vercel        # if not installed
vercel login           # one-time browser auth
vercel --prod --yes
```

Then add `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` (and optionally `NEXT_PUBLIC_PRO_UNLOCK_CODE`) under Project Settings → Environment Variables, and redeploy.

### Netlify

```bash
npm i -g netlify-cli
netlify deploy --build --prod
```

### Any Node host

```bash
npm run build
npm run start
```

## Project structure

```
app/
  page.tsx            landing page (hero, how-it-works, pricing)
  studio/page.tsx      the editor + preview studio
  layout.tsx           fonts, global atmosphere background
components/
  Header.tsx, Hero.tsx, HowItWorks.tsx, PricingSection.tsx, Footer.tsx
  studio/Editor.tsx     left-panel form (project, pricing, add-ons, clauses, branding, signatures)
  studio/Preview.tsx    live document preview + #print-root (what gets printed to PDF)
  studio/SignaturePad.tsx  canvas-based signature capture
lib/
  types.ts             proposal data model, tier/addon/clause definitions, pricing math
  unlock.ts            localStorage paywall logic + URL-based unlock detection
```

## Roadmap (not required to start earning, but next upgrades)

- Stripe webhook + server-verified license keys for cross-device unlock
- Save/share proposals via a shareable link (currently local-only by design for privacy)
- E-signature legal timestamping / audit trail
- PDF export via a headless renderer for pixel-perfect output instead of browser print
