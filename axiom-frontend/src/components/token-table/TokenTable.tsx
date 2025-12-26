"use client";

import { useTokens, TokenCategory } from "@/hooks/useTokens";

interface TokenTableProps {
  category: TokenCategory;
}

export function TokenTable({ category }: TokenTableProps) {
  const { data, isLoading, isError } = useTokens(category);

  if (isLoading) {
    return <div className="p-4">Loading {category}...</div>;
  }

  if (isError || !data) {
    return (
      <div className="p-4 text-sm text-red-400">
        Failed to load tokens for {category}.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-950/60">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-900/80">
          <tr>
            <th className="px-3 py-2 text-left">Name</th>
            <th className="px-3 py-2 text-right">Price</th>
            <th className="px-3 py-2 text-right">24h %</th>
            <th className="px-3 py-2 text-right">Liquidity</th>
            <th className="px-3 py-2 text-right">Mkt Cap</th>
          </tr>
        </thead>
        <tbody>
          {data.map((token) => (
            <tr key={token.id} className="border-t border-slate-800">
              <td className="px-3 py-2">
                <div className="font-medium">{token.name}</div>
                <div className="text-xs text-slate-400">{token.symbol}</div>
              </td>
              <td className="px-3 py-2 text-right">
                {token.price.toFixed(6)}
              </td>
              <td
                className={`px-3 py-2 text-right ${
                  token.priceChange24h >= 0
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >
                {token.priceChange24h.toFixed(2)}%
              </td>
              <td className="px-3 py-2 text-right">
                {token.liquidity.toLocaleString()}
              </td>
              <td className="px-3 py-2 text-right">
                {token.marketCap.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
