import { NextResponse } from "next/server";

import { authenticateUser, createSessionCookie } from "@/lib/auth/session";

export async function POST(request: Request) {
  let payload: { email?: string; password?: string };

  try {
    payload = (await request.json()) as { email?: string; password?: string };
  } catch {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const email = String(payload.email ?? "").trim();
  const password = String(payload.password ?? "").trim();

  if (!email || !password) {
    return NextResponse.json({ error: "missing_credentials" }, { status: 400 });
  }

  const user = await authenticateUser(email, password);
  if (!user) {
    return NextResponse.json({ error: "invalid_credentials" }, { status: 401 });
  }

  await createSessionCookie({
    sub: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });

  return NextResponse.json({
    ok: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
}
