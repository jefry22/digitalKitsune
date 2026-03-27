import Link from "next/link";
import { redirect } from "next/navigation";

import { LoginForm } from "@/components/login-form";
import { DEMO_USERS, ROLE_LABEL } from "@/lib/auth/config";
import { getCurrentSession } from "@/lib/auth/session";

export default async function LoginPage() {
  const session = await getCurrentSession();
  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#f6f3ec_0%,_#f2e8d8_45%,_#e4d0ac_100%)] px-6 py-10">
      <section className="mx-auto grid w-full max-w-5xl gap-8 rounded-3xl border border-amber-900/15 bg-white/85 p-8 shadow-[0_25px_60px_-30px_rgba(40,20,0,0.45)] backdrop-blur md:grid-cols-[1.1fr_0.9fr] md:p-12">
        <div className="space-y-6">
          <p className="inline-flex rounded-full border border-amber-900/20 bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-950">
            DigitalKitsune Intranet
          </p>
          <h1 className="text-balance text-4xl font-bold leading-tight text-stone-900 md:text-5xl">
            Accede al modulo de actividades y reportes diarios.
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-stone-700 md:text-lg">
            Este primer modulo gestiona inicio de sesion con roles para separar
            vistas de Administrador, PM y Developer.
          </p>
          <div className="rounded-2xl border border-amber-900/15 bg-amber-50 p-5">
            <p className="mb-3 text-sm font-semibold text-stone-900">
              Usuarios demo disponibles
            </p>
            <ul className="space-y-2 text-sm text-stone-700">
              {DEMO_USERS.map((user) => (
                <li key={user.id} className="rounded-lg bg-white px-3 py-2">
                  <span className="font-medium">{ROLE_LABEL[user.role]}</span> -{" "}
                  {user.email} / {user.password}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-stone-900/10 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-xl font-semibold text-stone-900">Iniciar sesion</h2>
          <p className="mt-1 text-sm text-stone-600">
            Usa tu correo corporativo y contrasena.
          </p>

          <LoginForm />

          <p className="mt-5 text-xs text-stone-600">
            Esta version es de arranque. En la siguiente fase conectamos base de
            datos real y permisos persistentes.
          </p>
          <Link href="/" className="mt-2 inline-block text-xs font-medium text-stone-800 underline">
            Volver al inicio
          </Link>
        </div>
      </section>
    </main>
  );
}
