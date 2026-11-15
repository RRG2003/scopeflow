"use client";

const STORAGE_KEY = "scopeflow_pro_unlocked";

export function getPaymentLink(): string {
  return (
    process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK ||
    "https://buy.stripe.com/your-payment-link"
  );
}

export function isPro(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(STORAGE_KEY) === "1";
}

export function setPro(): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, "1");
}

export function clearPro(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

/**
 * Checks the current URL for success / unlock signals and persists
 * the unlock to localStorage if found. Returns true if it just unlocked.
 *
 * Supported signals:
 *  - ?paid=1                         (generic payment-provider success redirect)
 *  - ?license_key=SF99_SUCCESS       (Stripe success URL w/ literal placeholder)
 *  - ?unlock=<code>                  (manual/local test code, matched against
 *                                      NEXT_PUBLIC_PRO_UNLOCK_CODE)
 */
export function checkUnlockFromLocation(): boolean {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  const paid = params.get("paid");
  const licenseKey = params.get("license_key");
  const unlockCode = params.get("unlock");
  const expectedCode = process.env.NEXT_PUBLIC_PRO_UNLOCK_CODE || "SF9-DEMO";

  let justUnlocked = false;

  if (paid === "1") {
    setPro();
    justUnlocked = true;
  }
  if (licenseKey === "SF99_SUCCESS") {
    setPro();
    justUnlocked = true;
  }
  if (unlockCode && unlockCode === expectedCode) {
    setPro();
    justUnlocked = true;
  }

  return justUnlocked;
}

export function tryManualCode(code: string): boolean {
  const expectedCode = process.env.NEXT_PUBLIC_PRO_UNLOCK_CODE || "SF9-DEMO";
  if (code.trim() === expectedCode) {
    setPro();
    return true;
  }
  return false;
}
