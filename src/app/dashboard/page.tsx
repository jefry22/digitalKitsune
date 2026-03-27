import Link from "next/link";
import { redirect } from "next/navigation";

import { LogoutButton } from "@/components/logout-button";
import { ROLE_LABEL } from "@/lib/auth/config";
import { getCurrentSession } from "@/lib/auth/session";

export default async function DashboardPage() {
  const session = await getCurrentSession();
  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-stone-100 px-6 py-10">
      <section className="mx-auto max-w-5xl rounded-3xl border border-stone-900/10 bg-white p-8 shadow-sm md:p-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
              Panel principal
            </p>
            <h1 className="mt-2 text-3xl font-bold text-stone-900">
              Bienvenido, {session.name}
            </h1>
            <p className="mt-2 text-sm text-stone-700">
              Rol activo: <span className="font-semibold">{ROLE_LABEL[session.role]}</span>
            </p>
          </div>

          <LogoutButton />
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Link
            href="/admin"
            className="rounded-2xl border border-stone-200 bg-stone-50 p-4 text-sm text-stone-700 transition hover:border-stone-400"
          >
            <p className="font-semibold text-stone-900">Modulo Admin</p>
            <p className="mt-1">Configuracion global de usuarios y proyectos.</p>
          </Link>

          <Link
            href="/pm"
            className="rounded-2xl border border-stone-200 bg-stone-50 p-4 text-sm text-stone-700 transition hover:border-stone-400"
          >
            <p className="font-semibold text-stone-900">Modulo PM</p>
            <p className="mt-1">Asignacion de actividades y fechas al equipo.</p>
          </Link>

          <Link
            href="/developer"
            className="rounded-2xl border border-stone-200 bg-stone-50 p-4 text-sm text-stone-700 transition hover:border-stone-400"
          >
            <p className="font-semibold text-stone-900">Modulo Developer</p>
            <p className="mt-1">Vista Mi Dia para ejecutar y cerrar tareas.</p>
          </Link>
        </div>
      </section>
    </main>
  );
}
