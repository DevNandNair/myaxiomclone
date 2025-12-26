"use client";

import { useQuery } from "@tanstack/react-query";

export type TokenCategory = "new-pairs" | "final-stretch" | "migrated";

export interface Token {
  id: string;
  name: string;
  symbol: string;
  category: TokenCategory;
  price: number;
  priceChange24h: number;
  liquidity: number;
  marketCap: number;
  volume24h: number;
  txns24h: number;
  numBuys: number;
  numSells: number;
  createdAt: string;
  score: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4001";

export function useTokens(category: TokenCategory) {
  return useQuery<Token[]>({
    queryKey: ["tokens", category],
    queryFn: async () => {
      const url = `${API_URL}/tokens?category=${category}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch tokens");
      }
      return res.json();
    },
    refetchInterval: 15000, // optional periodic refresh
  });
}
