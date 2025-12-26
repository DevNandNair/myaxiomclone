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
