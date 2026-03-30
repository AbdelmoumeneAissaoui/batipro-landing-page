import { NextRequest, NextResponse } from "next/server";
import { createToken, setAuthCookie } from "@/lib/auth";
import { verifyAdminPassword } from "@/lib/password";

const ADMIN_USER = process.env.NEXT_PUBLIC_ADMIN_USER ?? "admin";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { username, password } = body;

  if (!username || !password) {
    return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
  }

  if (username !== ADMIN_USER) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const isPasswordValid = await verifyAdminPassword(password);
  if (!isPasswordValid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = await createToken(username);
  await setAuthCookie(token);

  return NextResponse.json({ success: true, token });
}
