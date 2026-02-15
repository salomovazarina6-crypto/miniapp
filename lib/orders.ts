"use client";

import type { Order } from "@/lib/types";
import { lsGet, lsSet } from "@/lib/storage";

const KEY = "mega_orders_v1";

export function getOrders(): Order[] {
  return lsGet<Order[]>(KEY, []);
}

export function saveOrders(orders: Order[]) {
  lsSet(KEY, orders);
}

export function addOrder(order: Order) {
  const orders = getOrders();
  orders.unshift(order);
  saveOrders(orders);
}

export function updateOrder(id: string, patch: Partial<Order>) {
  const orders = getOrders();
  const idx = orders.findIndex(o => o.id === id);
  if (idx >= 0) {
    orders[idx] = { ...orders[idx], ...patch };
    saveOrders(orders);
  }
}
