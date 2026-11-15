import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ScopeFlow — Proposals & contracts that close bigger deals",
  description:
    "Create interactive 3-tier proposals and signable client contracts in 2 minutes. No signup, private, free with watermark. $9 one-time unlock removes it.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen text-paper">
        <div className="atmosphere" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
