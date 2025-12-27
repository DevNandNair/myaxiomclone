"use client";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import type { Token } from "@/hooks/useTokens";

interface Props {
  token: Token;
}

export function TokenInfoPopover({ token }: Props) {
  return (
    <Popover className="relative inline-block">
      <PopoverButton className="text-left">
        <div className="font-medium underline decoration-dotted decoration-slate-500">
          {token.name}
        </div>
        <div className="text-xs text-slate-400">{token.symbol}</div>
      </PopoverButton>

      <PopoverPanel className="absolute z-50 mt-1 w-56 rounded-md bg-slate-900 border border-slate-700 p-3 shadow-lg">
        <div className="text-xs text-slate-200 space-y-1">
          <p>Score: {token.score}</p>
          <p>Buys: {token.numBuys}</p>
          <p>Sells: {token.numSells}</p>
          <p>Volume 24h: {token.volume24h.toLocaleString()}</p>
        </div>
      </PopoverPanel>
    </Popover>
  );
}
