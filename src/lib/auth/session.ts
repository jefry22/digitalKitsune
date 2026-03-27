import "server-only";

import { cookies } from "next/headers";

import { DEMO_USERS, SESSION_COOKIE_NAME } from "@/lib/auth/config";
import {
  signSessionToken,
  type SessionPayload,
  verifySessionToken,
} from "@/lib/auth/token";

export async function authenticateUser(email: string, password: string) {
  return (
    DEMO_USERS.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password,
    ) ?? null
  );
}

export async function getCurrentSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return verifySessionToken(token);
}

export async function createSessionCookie(payload: SessionPayload) {
  const token = await signSessionToken(payload);
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
