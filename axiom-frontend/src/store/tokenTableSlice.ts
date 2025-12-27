import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { TokenCategory } from "@/hooks/useTokens";

type SortKey = "price" | "priceChange24h";
type SortDir = "asc" | "desc";

interface TokenTableState {
  activeCategory: TokenCategory;
  sortKey: SortKey;
  sortDir: SortDir;
}

const initialState: TokenTableState = {
  activeCategory: "new-pairs",
  sortKey: "price",
  sortDir: "desc",
};

const tokenTableSlice = createSlice({
  name: "tokenTable",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<TokenCategory>) {
      state.activeCategory = action.payload;
    },
    setSort(state, action: PayloadAction<{ key: SortKey }>) {
      if (state.sortKey === action.payload.key) {
        state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
      } else {
        state.sortKey = action.payload.key;
        state.sortDir = "desc";
      }
    },
  },
});

export const { setCategory, setSort } = tokenTableSlice.actions;
export default tokenTableSlice.reducer;
export type { SortKey, SortDir, TokenTableState };
