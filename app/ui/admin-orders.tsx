"use client";

import { useEffect, useMemo, useState } from "react";
import { TopBar } from "@/components/TopBar";
import { getOrders, updateOrder } from "@/lib/orders";
import { moneyUZS } from "@/lib/money";

export function AdminOrdersClient() {
  const [orders, setOrders] = useState<any[]>([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  const list = useMemo(() => {
    if (!q.trim()) return orders;
    const t = q.toLowerCase();
    return orders.filter(o =>
      (o.id + " " + o.name + " " + o.phone + " " + o.address).toLowerCase().includes(t)
    );
  }, [orders, q]);

  function setStatus(id: string, status: any) {
    updateOrder(id, { status });
    setOrders(getOrders());
  }

  function exportCSV() {
    const header = ["id","createdAt","name","phone","address","note","total","status"];
    const rows = list.map(o => header.map(k => JSON.stringify(o[k] ?? "")).join(","));
    const csv = header.join(",") + "\n" + rows.join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orders.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <TopBar
        title="Admin: Buyurtmalar"
        cartCount={0}
        onMenu={() => history.back()}
        onSearch={() => {
          const val = prompt("Qidirish:");
          if (val !== null) setQ(val);
        }}
        onCart={() => {}}
      />
      <div className="container-max space-y-4">
        <div className="card p-4 flex items-center justify-between">
          <div>
            <div className="font-extrabold">{list.length} ta buyurtma</div>
            <div className="soft text-[13px] mt-1">CSV eksport qilish mumkin</div>
          </div>
          <button className="btn btn-primary" onClick={exportCSV}>Excel/CSV export</button>
        </div>

        {list.length === 0 ? (
          <div className="card p-4">Hozircha buyurtma yo‘q.</div>
        ) : (
          <div className="space-y-3">
            {list.map((o) => (
              <div key={o.id} className="card p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-extrabold">#{o.id.slice(-6)} • {moneyUZS(o.total)} so‘m</div>
                    <div className="soft text-[12px] mt-1">{new Date(o.createdAt).toLocaleString()}</div>
                    <div className="soft text-[13px] mt-2">{o.name} • {o.phone}</div>
                    <div className="soft text-[13px]">{o.address}</div>
                  </div>
                  <span className="badge">{o.status}</span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <button className="btn btn-ghost" onClick={() => setStatus(o.id, "new")}>new</button>
                  <button className="btn btn-ghost" onClick={() => setStatus(o.id, "paid")}>paid</button>
                  <button className="btn btn-ghost" onClick={() => setStatus(o.id, "done")}>done</button>
                  <button className="btn btn-ghost" onClick={() => setStatus(o.id, "cancelled")}>cancel</button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="card p-4">
          <div className="soft text-[13px]">
            ⚠️ Demo: buyurtmalar localStorage’da saqlanadi. Real server bazasi uchun API kerak.
          </div>
        </div>
      </div>
    </div>
  );
}
