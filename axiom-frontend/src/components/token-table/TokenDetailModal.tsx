"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import type { Token } from "@/hooks/useTokens";

interface TokenDetailModalProps {
  open: boolean;
  onClose: () => void;
  token: Token | null;
}

export function TokenDetailModal({ open, onClose, token }: TokenDetailModalProps) {
  if (!token) return null;

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="max-w-md w-full rounded-lg bg-slate-900 border border-slate-700 p-4">
          <DialogTitle className="text-lg font-semibold mb-2">
            {token.name} <span className="text-xs text-slate-400">{token.symbol}</span>
          </DialogTitle>
          <div className="space-y-2 text-sm text-slate-200">
            <p>Price: {token.price.toFixed(6)}</p>
            <p>24h %: {token.priceChange24h.toFixed(2)}%</p>
            <p>Liquidity: {token.liquidity.toLocaleString()}</p>
            <p>Market Cap: {token.marketCap.toLocaleString()}</p>
            <p>Volume 24h: {token.volume24h.toLocaleString()}</p>
            <p>Txns 24h: {token.txns24h}</p>
            <p>Score: {token.score}</p>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-sm rounded bg-slate-800 hover:bg-slate-700"
            >
              Close
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
