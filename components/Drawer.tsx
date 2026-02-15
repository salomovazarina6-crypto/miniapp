"use client";

import React, { useEffect } from "react";

export function Drawer({
  open,
  onClose,
  children,
  title,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-50"
          style={{ background: "rgba(2,6,23,.45)" }}
        />
      )}
      <div
        className="fixed right-0 top-0 z-[60] h-full w-[92vw] max-w-[420px] transition-transform"
        style={{
          transform: open ? "translateX(0)" : "translateX(110%)",
        }}
      >
        <div className="h-full card rounded-none rounded-l-[22px] flex flex-col">
          <div className="p-4 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(15,23,42,.08)" }}>
            <div className="font-extrabold text-[16px]">{title ?? "Panel"}</div>
            <button className="btn btn-ghost" onClick={onClose}>Yopish</button>
          </div>
          <div className="p-4 overflow-auto flex-1">{children}</div>
        </div>
      </div>
    </>
  );
}
