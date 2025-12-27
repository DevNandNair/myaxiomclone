"use client";

import { useTokens, TokenCategory, Token } from "@/hooks/useTokens";
import { usePriceUpdates } from "@/hooks/usePriceUpdates";
import { useState, useEffect, useMemo } from "react";
import { TokenTableSkeleton } from "./TokenTableSkeleton";
import { TokenDetailModal } from "./TokenDetailModal";
import { TokenInfoPopover } from "./TokenInfoPopover";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setSort } from "@/store/tokenTableSlice";

type SortKey = "price" | "priceChange24h";
type SortDir = "asc" | "desc";

const SORTABLE_COLUMNS: { key: SortKey; label: string }[] = [
  { key: "price", label: "Price" },
  { key: "priceChange24h", label: "24h %" },
];

interface TokenTableProps {
  category: TokenCategory;
}

export function TokenTable({ category }: TokenTableProps) {
  // hooks
  const { data, isLoading, isError } = useTokens(category);
  usePriceUpdates(category);

  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useAppDispatch();
  const sortKey = useAppSelector((state) => state.tokenTable.sortKey);
  const sortDir = useAppSelector((state) => state.tokenTable.sortDir);


  const [lastChanged, setLastChanged] = useState<
    Record<string, "up" | "down" | null>
  >({});
  // const [sortKey, setSortKey] = useState<SortKey>("price");
  // const [sortDir, setSortDir] = useState<SortDir>("desc");

  const sortedData = useMemo(() => {
    if (!data) return [];
    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      return sortDir === "asc" ? aVal - bVal : bVal - aVal;
    });
  }, [data, sortKey, sortDir]);

  useEffect(() => {
    if (!data) return;
    const next: Record<string, "up" | "down" | null> = {};
    data.forEach((t) => {
      next[t.id] = null;
    });
    setLastChanged(next);
  }, [data]);

  // conditional returns
  if (isLoading) {
    return <TokenTableSkeleton />;
  }

  if (isError || !data) {
    return (
      <div className="p-4 text-sm text-red-400">
        Failed to load tokens for {category}.
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-950/60">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-900/80">
            <tr>
              <th className="px-3 py-2 text-left">Name</th>
            <th
  className="px-3 py-2 text-right cursor-pointer select-none"
  onClick={() => dispatch(setSort({ key: "price" }))}
>
  Price {sortKey === "price" ? (sortDir === "asc" ? "↑" : "↓") : ""}
</th>

<th
  className="px-3 py-2 text-right cursor-pointer select-none"
  onClick={() => dispatch(setSort({ key: "priceChange24h" }))}
>
  24h %{" "}
  {sortKey === "priceChange24h"
    ? sortDir === "asc"
      ? "↑"
      : "↓"
    : ""}
</th>

              <th className="px-3 py-2 text-right hidden sm:table-cell">
                Liquidity
              </th>
              <th className="px-3 py-2 text-right hidden md:table-cell">
                Mkt Cap
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((token) => {
              const changeDir = lastChanged[token.id];
              return (
                <tr
                  key={token.id}
                  className="border-t border-slate-800 cursor-pointer hover:bg-slate-900/60"
                  onClick={() => {
                    setSelectedToken(token);
                    setIsModalOpen(true);
                  }}
                >
                  <td className="px-3 py-2">
                    <TokenInfoPopover token={token} />
                  </td>
                  <td
                    className={`px-3 py-2 text-right transition-colors duration-200 ${changeDir === "up"
                        ? "bg-emerald-500/10"
                        : changeDir === "down"
                          ? "bg-red-500/10"
                          : ""
                      }`}
                  >
                    {token.price.toFixed(6)}
                  </td>
                  <td
                    className={`px-3 py-2 text-right ${token.priceChange24h >= 0
                        ? "text-emerald-400"
                        : "text-red-400"
                      }`}
                    title={`24h change: ${token.priceChange24h.toFixed(2)}%`}
                  >
                    {token.priceChange24h.toFixed(2)}%
                  </td>
                  <td className="px-3 py-2 text-right hidden sm:table-cell">
                    {token.liquidity.toLocaleString()}
                  </td>
                  <td className="px-3 py-2 text-right hidden md:table-cell">
                    {token.marketCap.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <TokenDetailModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        token={selectedToken}
      />
    </>
  );
}
