"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const ERROR_TEXT: Record<string, string> = {
  missing_credentials: "Ingresa correo y contrasena para continuar.",
  invalid_credentials: "Credenciales invalidas. Revisa los datos e intenta otra vez.",
  invalid_payload: "No se pudo procesar la solicitud.",
};

export function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        setError(ERROR_TEXT[data.error ?? ""] ?? "No se pudo iniciar sesion.");
        return;
      }

      router.replace("/dashboard");
      router.refresh();
    } catch {
      setError("No fue posible conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      {error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <label className="block text-sm font-medium text-stone-800">
        Correo
        <input
          name="email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2 text-stone-900 outline-none ring-0 transition focus:border-stone-900"
          placeholder="dev@digitalkitsune.com"
        />
      </label>

      <label className="block text-sm font-medium text-stone-800">
        Contrasena
        <input
          name="password"
          type="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2 text-stone-900 outline-none ring-0 transition focus:border-stone-900"
          placeholder="********"
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-semibold text-amber-50 transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:bg-stone-500"
      >
        {loading ? "Ingresando..." : "Entrar al sistema"}
      </button>
    </form>
  );
}
