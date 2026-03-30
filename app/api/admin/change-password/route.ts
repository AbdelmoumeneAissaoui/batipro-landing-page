import { NextRequest, NextResponse } from "next/server";
import { verifyAdminPassword, setPasswordHash } from "@/lib/password";
import { getAuthCookie, verifyToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const token = await getAuthCookie();

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await verifyToken(token);
  if (!payload || payload.username !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { currentPassword, newPassword } = body;

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: "Current password and new password are required" }, { status: 400 });
  }

  if (newPassword.length < 8) {
    return NextResponse.json({ error: "New password must be at least 8 characters" }, { status: 400 });
  }

  const isCurrentPasswordValid = await verifyAdminPassword(currentPassword);
  if (!isCurrentPasswordValid) {
    return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 });
  }

  if (currentPassword === newPassword) {
    return NextResponse.json({ error: "New password must be different from current password" }, { status: 400 });
  }

  await setPasswordHash(newPassword);

  return NextResponse.json({ success: true, message: "Password updated successfully" });
}
