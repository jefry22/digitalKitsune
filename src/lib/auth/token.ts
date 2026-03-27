import { SignJWT, jwtVerify } from "jose";

import { type Role } from "@/lib/auth/config";

export type SessionPayload = {
  sub: string;
  name: string;
  email: string;
  role: Role;
};

const secretValue =
  process.env.AUTH_SECRET ?? "dev-secret-change-this-before-production";
const secretKey = new TextEncoder().encode(secretValue);

export async function signSessionToken(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(secretKey);
}

export async function verifySessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey, {
      algorithms: ["HS256"],
    });

    if (
      typeof payload.sub !== "string" ||
      typeof payload.name !== "string" ||
      typeof payload.email !== "string" ||
      (payload.role !== "admin" &&
        payload.role !== "pm" &&
        payload.role !== "developer")
    ) {
      return null;
    }

    return payload as SessionPayload;
  } catch {
    return null;
  }
}
