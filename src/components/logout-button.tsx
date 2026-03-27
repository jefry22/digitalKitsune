"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onLogout() {
    setLoading(true);
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      router.replace("/login");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={onLogout}
      disabled={loading}
      className="rounded-xl border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? "Cerrando..." : "Cerrar sesion"}
    </button>
  );
}
