"use client";

import { useEffect, useMemo, useState } from "react";
import type { CartItem, Product } from "@/lib/types";
import { lsGet, lsSet } from "@/lib/storage";

const KEY = "mega_cart_v1";

export function useCart(products: Product[]) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(lsGet<CartItem[]>(KEY, []));
  }, []);

  useEffect(() => {
    lsSet(KEY, items);
  }, [items]);

  const map = useMemo(() => new Map(products.map(p => [p.id, p])), [products]);

  const enriched = useMemo(() => {
    return items
      .map(it => {
        const p = map.get(it.productId);
        if (!p) return null;
        return { ...it, product: p, line: p.price * it.qty };
      })
      .filter(Boolean) as Array<CartItem & { product: Product; line: number }>;
  }, [items, map]);

  const total = useMemo(() => enriched.reduce((a, x) => a + x.line, 0), [enriched]);
  const count = useMemo(() => enriched.reduce((a, x) => a + x.qty, 0), [enriched]);

  function add(productId: string, qty = 1) {
    setItems(prev => {
      const idx = prev.findIndex(x => x.productId === productId);
      if (idx === -1) return [...prev, { productId, qty }];
      const copy = prev.slice();
      copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
      return copy;
    });
  }

  function dec(productId: string, qty = 1) {
    setItems(prev => {
      const idx = prev.findIndex(x => x.productId === productId);
      if (idx === -1) return prev;
      const copy = prev.slice();
      const nextQty = copy[idx].qty - qty;
      if (nextQty <= 0) return copy.filter(x => x.productId !== productId);
      copy[idx] = { ...copy[idx], qty: nextQty };
      return copy;
    });
  }

  function remove(productId: string) {
    setItems(prev => prev.filter(x => x.productId !== productId));
  }

  function clear() {
    setItems([]);
  }

  return { items, enriched, total, count, add, dec, remove, clear };
}
