import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key-change-this-in-production";
const JWT_EXPIRATION = "7d";

export interface AuthPayload {
  username: string;
  iat?: number;
  exp?: number;
}

export async function createToken(username: string): Promise<string> {
  return jwt.sign({ username }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });
}

export async function verifyToken(token: string): Promise<AuthPayload | null> {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as AuthPayload;
    return payload;
  } catch {
    return null;
  }
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
  });
}

export async function getAuthCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  return token ?? null;
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
}

export async function validateAdminAuth(): Promise<boolean> {
  const token = await getAuthCookie();
  if (!token) return false;

  const payload = await verifyToken(token);
  return payload !== null && payload.username === "admin";
}
