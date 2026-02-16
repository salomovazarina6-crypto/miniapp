"use client";

import { useMemo, useState } from "react";
import { moneyUZS } from "@/lib/money";
import { getTg } from "@/lib/telegram";
import { addOrder } from "@/lib/orders";
import type { Order } from "@/lib/types";

function uid() {
  return (
    Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2)
  );
}

export function CheckoutForm({
  cartItems,
  total,
  onDone,
}: {
  cartItems: Array<{
    productId: string;
    qty: number;
    product: { id: string; title: string; price: number };
    line: number;
  }>;
  total: number;
  onDone: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [step, setStep] = useState<"form" | "pay">("form");

  // Location state
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [locLoading, setLocLoading] = useState(false);

  async function getLocation() {
    setLocLoading(true);

    try {
      if (!navigator.geolocation) {
        alert("Telefon/brauzer lokatsiyani qo‘llamaydi.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLat(pos.coords.latitude);
          setLng(pos.coords.longitude);
          setLocLoading(false);
        },
        () => {
          setLocLoading(false);
          alert(
            "Lokatsiya olinmadi. Telefon sozlamasidan Location’ni yoqing va qayta urinib ko‘ring."
          );
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
      );
    } finally {
      // agar success callback ishlasa ham setLocLoading(false) bor,
      // lekin xatoda doim yopiladi
      setLocLoading(false);
    }
  }

  const payload = useMemo(() => {
    const order: Omit<Order, "status"> & { status?: Order["status"] } = {
      id: uid(),
      createdAt: new Date().toISOString(),
      name,
      phone,
      address,
      note,
      items: cartItems.map((x) => ({
        id: x.product.id,
        title: x.product.title,
        price: x.product.price,
        qty: x.qty,
      })),
      total,
      status: "new",

      // location (optional)
      // @ts-ignore
      lat: lat ?? undefined,
      // @ts-ignore
      lng: lng ?? undefined,
      // @ts-ignore
      locationUpdatedAt: lat && lng ? new Date().toISOString() : undefined,
    };

    return order;
  }, [name, phone, address, note, cartItems, total, lat, lng]);

  function submit() {
    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert("Iltimos: Ism, Telefon, Manzilni to‘ldiring.");
      return;
    }

    // Save locally (demo)
    addOrder(payload as Order);

    // Send to Telegram bot (backend) if miniapp opened inside Telegram
    const tg = getTg();
    try {
      tg?.sendData?.(JSON.stringify({ type: "order", order: payload }));
    } catch {}

    setStep("pay");
  }

  function pay(provider: "payme" | "click") {
    // TODO: Replace these URLs with real payment links
    const url =
      provider === "payme"
        ? "https://payme.uz/" // replace
        : "https://click.uz/"; // replace

    const tg = getTg();
    try {
      tg?.openLink?.(url);
    } catch {
      window.open(url, "_blank");
    }

    alert(
      "Demo: to‘lov sahifasi ochildi. Real integratsiya backend bilan bo‘ladi."
    );
    onDone();
  }

  return (
    <div className="space-y-4">
      {step === "form" ? (
        <>
          {/* Customer info */}
          <div className="card p-4">
            <div className="font-extrabold">Ma’lumotlar</div>
            <div className="soft text-[13px] mt-1">Buyurtma uchun kerak.</div>

            <div className="mt-4 space-y-3">
              <input
                className="input"
                placeholder="Ism"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="input"
                placeholder="Telefon (+998...)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                className="input"
                placeholder="Manzil"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                className="input"
                placeholder="Izoh (ixtiyoriy)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </div>

          {/* Location */}
          <div className="card p-4">
            <div className="font-extrabold">Lokatsiya</div>
            <div className="soft text-[13px] mt-1">
              Kuryer uchun aniq joylashuv. (Ixtiyoriy, lekin tavsiya qilinadi)
            </div>

            <div className="mt-3 flex gap-2">
              <button
                type="button"
                className="btn w-full"
                onClick={getLocation}
                disabled={locLoading}
              >
                {locLoading ? "Olinyapti..." : "📍 Lokatsiyani olish"}
              </button>
            </div>

            {lat && lng ? (
              <div className="mt-3 text-[13px]">
                ✅ Saqlandi:{" "}
                <span className="font-semibold">
                  {lat.toFixed(5)}, {lng.toFixed(5)}
                </span>
                <div className="mt-2">
                  <a
                    className="link"
                    href={`https://maps.google.com/?q=${lat},${lng}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Xaritada ko‘rish
                  </a>
                </div>
              </div>
            ) : (
              <div className="mt-3 soft text-[13px]">Lokatsiya hali olinmagan.</div>
            )}
          </div>

          {/* Total + submit */}
          <div className="card p-4 flex items-center justify-between">
            <div>
              <div className="soft text-[12px]">Jami</div>
              <div className="text-[22px] font-extrabold">
                {moneyUZS(total)} so‘m
              </div>
            </div>
            <button className="btn btn-primary" onClick={submit}>
              Davom etish
            </button>
          </div>

          <div className="card p-4">
            <div className="soft text-[13px]">
              ⚠️ Bu demo. Real Buyurtmalar bazasi, Payme/Click va Admin API keyin
              ulab beriladi.
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Payment */}
          <div className="card p-4">
            <div className="font-extrabold">To‘lov</div>
            <div className="soft text-[13px] mt-1">Qaysi to‘lov tizimi?</div>

            <div className="mt-4 grid grid-cols-1 gap-3">
              <button
                className="btn btn-primary"
                onClick={() => pay("payme")}
              >
                Payme orqali to‘lash
              </button>
              <button className="btn btn-ghost" onClick={() => pay("click")}>
                Click orqali to‘lash
              </button>
            </div>
          </div>

          {/* Done */}
          <div className="card p-4">
            <div className="font-extrabold">Buyurtma yuborildi ✅</div>
            <div className="soft text-[13px] mt-1">
              Admin panelda (demo) buyurtma ro‘yxati saqlanadi.
            </div>

            {lat && lng ? (
              <div className="mt-3 text-[13px]">
                📍 Lokatsiya:{" "}
                <span className="font-semibold">
                  {lat.toFixed(5)}, {lng.toFixed(5)}
                </span>{" "}
                —{" "}
                <a
                  className="link"
                  href={`https://maps.google.com/?q=${lat},${lng}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  xaritada
                </a>
              </div>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}
