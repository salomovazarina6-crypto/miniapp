"use client";

import { useMemo, useState } from "react";
import { TopBar } from "@/components/TopBar";
import { PRODUCTS } from "@/data/seed";
import type { Product } from "@/lib/types";

function toCSV(products: Product[]) {
  const header = ["id","category","title","subtitle","price","image","inStock"];
  const rows = products.map(p => header.map(k => JSON.stringify((p as any)[k] ?? "")).join(","));
  return header.join(",") + "\n" + rows.join("\n");
}

function parseCSV(text: string): Product[] {
  // very simple CSV parser for this demo (expects no commas inside values)
  const lines = text.trim().split(/\r?\n/);
  const header = lines.shift()?.split(",").map(x => x.replaceAll('"','')) ?? [];
  return lines.map(line => {
    const cols = line.split(",").map(x => x.replace(/^"|"$/g, "").replaceAll('""','"'));
    const obj: any = {};
    header.forEach((h, i) => obj[h] = cols[i]);
    obj.price = Number(obj.price || 0);
    obj.inStock = obj.inStock === "false" ? false : true;
    return obj as Product;
  });
}

export function AdminProductsClient() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    if (!q.trim()) return products;
    const t = q.toLowerCase();
    return products.filter(p => (p.title + " " + (p.subtitle ?? "") + " " + p.category).toLowerCase().includes(t));
  }, [products, q]);

  function exportCSV() {
    const csv = toCSV(list);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "products.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function importCSV(file: File) {
    const text = await file.text();
    try {
      const next = parseCSV(text);
      setProducts(next);
      alert("Import bo‘ldi (demo).");
    } catch (e) {
      alert("CSV format xato.");
    }
  }

  return (
    <div>
      <TopBar
        title="Admin: Mahsulotlar"
        cartCount={0}
        onMenu={() => history.back()}
        onSearch={() => {
          const val = prompt("Qidirish:");
          if (val !== null) setQ(val);
        }}
        onCart={() => {}}
      />

      <div className="container-max space-y-4">
        <div className="card p-4 flex flex-wrap items-center gap-3 justify-between">
          <div>
            <div className="font-extrabold">{list.length} ta mahsulot</div>
            <div className="soft text-[13px] mt-1">CSV import/export (demo)</div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="btn btn-primary" onClick={exportCSV}>CSV export</button>
            <label className="btn btn-ghost cursor-pointer">
              CSV import
              <input
                type="file"
                accept=".csv,text/csv"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) importCSV(f);
                }}
              />
            </label>
          </div>
        </div>

        <div className="card p-4 overflow-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="soft">
                <th className="py-2">ID</th>
                <th className="py-2">Kategoriya</th>
                <th className="py-2">Nomi</th>
                <th className="py-2">Narx</th>
              </tr>
            </thead>
            <tbody>
              {list.map(p => (
                <tr key={p.id} style={{ borderTop: "1px solid rgba(15,23,42,.06)" }}>
                  <td className="py-2 font-mono">{p.id}</td>
                  <td className="py-2">{p.category}</td>
                  <td className="py-2 font-bold">{p.title}</td>
                  <td className="py-2 font-bold">{new Intl.NumberFormat("ru-RU").format(p.price).replaceAll(",", " ")} so‘m</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card p-4">
          <div className="soft text-[13px]">
            Excel (XLSX) importni ham qo‘shish mumkin, lekin buning uchun qo‘shimcha kutubxona va format kerak bo‘ladi.
            Hozircha CSV orqali “Excel’dan Save As → CSV” qilsangiz ishlaydi.
          </div>
        </div>
      </div>
    </div>
  );
}
