"use client";

import { useState } from "react";
import { TokenTable } from "@/components/token-table/TokenTable";
import type { TokenCategory } from "@/hooks/useTokens";

const TABS: { label: string; value: TokenCategory }[] = [
  { label: "New pairs", value: "new-pairs" },
  { label: "Final stretch", value: "final-stretch" },
  { label: "Migrated", value: "migrated" },
];

export default function HomePage() {
  const [active, setActive] = useState<TokenCategory>("new-pairs");

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4">
      <h1 className="text-xl font-semibold mb-4">Token Discovery</h1>

      <div className="mb-4 inline-flex rounded-lg border border-slate-800 bg-slate-900/60">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActive(tab.value)}
            className={`px-4 py-2 text-sm font-medium border-r border-slate-800 last:border-r-0
              ${
                active === tab.value
                  ? "bg-slate-800 text-slate-50"
                  : "text-slate-400 hover:text-slate-100 hover:bg-slate-900"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <TokenTable category={active} />
    </main>
  );
}
