"use client";

import Link from "next/link";
import { TopBar } from "@/components/TopBar";

export function AdminHomeClient() {
  return (
    <div>
      <TopBar title="Admin Panel" cartCount={0} onMenu={() => history.back()} onSearch={() => {}} onCart={() => {}} />
      <div className="container-max space-y-4">
        <div className="card p-4">
          <div className="font-extrabold text-[18px]">Admin</div>
          <div className="soft text-[13px] mt-1">
            Demo panel: buyurtmalar, eksport CSV, mahsulot import CSV.
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link className="card p-4 block" href="/admin/orders">
            <div className="font-extrabold">📦 Buyurtmalar</div>
            <div className="soft text-[13px] mt-1">Ko‘rish, status o‘zgartirish</div>
          </Link>
          <Link className="card p-4 block" href="/admin/products">
            <div className="font-extrabold">🧾 Mahsulotlar</div>
            <div className="soft text-[13px] mt-1">CSV import / export</div>
          </Link>
        </div>

        <div className="card p-4">
          <div className="soft text-[13px]">
            Real “admin login” va server bazani ulash uchun backend (Node/Python) kerak bo‘ladi.
          </div>
        </div>
      </div>
    </div>
  );
}
