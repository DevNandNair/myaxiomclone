"use client";

import { TokenTable } from "@/components/token-table/TokenTable";
import type { TokenCategory } from "@/hooks/useTokens";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setCategory } from "@/store/tokenTableSlice";

const TABS: { label: string; value: TokenCategory }[] = [
  { label: "New pairs", value: "new-pairs" },
  { label: "Final stretch", value: "final-stretch" },
  { label: "Migrated", value: "migrated" },
];

export default function HomePage() {
  const dispatch = useAppDispatch();
  const active = useAppSelector((state) => state.tokenTable.activeCategory);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-2 py-4 sm:px-4">
      <div className="max-w-6xl mx-auto space-y-4">
        <h1 className="text-xl font-semibold">Token Discovery</h1>

        <div className="inline-flex rounded-lg border border-slate-800 bg-slate-900/60">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => dispatch(setCategory(tab.value))}
              className={`px-4 py-2 text-sm font-medium border-r border-slate-800 last:border-r-0 transition-colors
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
      </div>
    </main>
  );
}
