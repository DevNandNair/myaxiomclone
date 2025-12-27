"use client";

import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import type { Token, TokenCategory } from "./useTokens";

const WS_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4001";

let socket: Socket | null = null;

export function usePriceUpdates(category: TokenCategory) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) {
      socket = io(WS_URL, {
        transports: ["websocket"],
      });
    }

    const handler = (updates: { id: string; price: number; priceChange24h: number }[]) => {
      queryClient.setQueryData<Token[]>(["tokens", category], (old) => {
        if (!old) return old;
        const map = new Map(old.map((t) => [t.id, t]));
        updates.forEach((u) => {
          const existing = map.get(u.id);
          if (existing) {
            map.set(u.id, {
              ...existing,
              price: u.price,
              priceChange24h: u.priceChange24h,
            });
          }
        });
        return Array.from(map.values());
      });
    };

    socket.on("prices:update", handler);

    return () => {
      socket?.off("prices:update", handler);
    };
  }, [category, queryClient]);
}
