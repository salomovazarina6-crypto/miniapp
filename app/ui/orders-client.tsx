"use client";

import { useEffect, useState } from "react";
import { TopBar } from "@/components/TopBar";
import { Drawer } from "@/components/Drawer";
import { SideMenu } from "@/components/SideMenu";
import { getOrders } from "@/lib/orders";
import { moneyUZS } from "@/lib/money";

type Order = {
  id: string;
  status: string;
  total?: number;
  createdAt?: string;
  address?: string;
  items?: any[];
};

export function OrdersClient() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const data = (getOrders() as unknown as Order[]) || [];
    setOrders(data);
  }, []);

  return (
    <div>
      <TopBar
        title="Buyurtmalarim"
        cartCount={0}
        onMenu={() => setMenuOpen(true)}
        onSearch={() => {}}
        onCart={() => {}}
      />
      <div className="container-max">
        {orders.length === 0 ? (
          <div className="card p-4">
            <div className="font-extrabold">Hozircha buyurtma yo‘q</div>
            <div className="soft text-[13px] mt-1">
              Buyurtma bersangiz shu yerda ko‘rinadi.
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((o) => (
              <div key={o.id} className="card p-4">
                <div className="flex items-center justify-between">
                  <div className="font-extrabold">#{o.id.slice(-6)}</div>
                  <span className="badge">{o.status}</span>
                </div>
                <div className="soft text-[12px] mt-1">
                  {o.createdAt ? new Date(o.createdAt).toLocaleString() : ""}
                </div>
                <div className="mt-3 font-extrabold text-[18px]">
                  {typeof o.total === "number" ? moneyUZS(o.total) : moneyUZS(0)} so‘m
                </div>
                {o.address ? <div className="soft text-[13px] mt-1">{o.address}</div> : null}
              </div>
            ))}
          </div>
        )}
      </div>

      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)} title="Menyu">
        <SideMenu />
      </Drawer>
    </div>
  );
}
