import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { validateAdminAuth } from "@/lib/auth";

const imagesDir = path.join(process.cwd(), "public", "images");

function isValidFileName(fileName: string) {
  return /^[a-zA-Z0-9._-]+$/.test(fileName);
}

export async function POST(request: NextRequest) {
  const isValid = await validateAdminAuth();
  if (!isValid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { fileName, dataUrl } = body;

  if (!fileName || !dataUrl) {
    return NextResponse.json({ error: "fileName and dataUrl are required" }, { status: 400 });
  }

  if (!isValidFileName(fileName)) {
    return NextResponse.json({ error: "fileName contains invalid characters" }, { status: 400 });
  }

  const match = dataUrl.match(/^data:(image\/[^;]+);base64,(.+)$/);
  if (!match) {
    return NextResponse.json({ error: "invalid image data url" }, { status: 400 });
  }

  const base64 = match[2];
  const buffer = Buffer.from(base64, "base64");

  await fs.promises.mkdir(imagesDir, { recursive: true });
  const filePath = path.join(imagesDir, fileName);
  await fs.promises.writeFile(filePath, buffer);

  return NextResponse.json({ url: `/images/${fileName}` });
}
