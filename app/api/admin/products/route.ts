import { NextRequest, NextResponse } from "next/server";
import { readProducts, writeProducts } from "@/lib/data";
import { validateAdminAuth } from "@/lib/auth";
import { Product } from "@/lib/types";

async function checkAuth() {
  const isValid = await validateAdminAuth();
  if (!isValid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function GET() {
  const authError = await checkAuth();
  if (authError) return authError;

  const products = await readProducts();
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  const authError = await checkAuth();
  if (authError) return authError;

  const body = await request.json();
  const { name, price, badge, rating, image, categoryId } = body;

  if (!name || !price || !image) {
    return NextResponse.json({ error: "name, price and image are required" }, { status: 400 });
  }

  const products = await readProducts();
  const nextId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;

  const newProduct: Product = {
    id: nextId,
    name: String(name),
    price: String(price),
    badge: badge ? String(badge) : null,
    rating: rating !== undefined ? Number(rating) : 0,
    image: String(image),
    categoryId: categoryId ? Number(categoryId) : undefined,
  };

  products.push(newProduct);
  await writeProducts(products);

  return NextResponse.json(newProduct, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const authError = await checkAuth();
  if (authError) return authError;

  const { id, ...update } = await request.json();
  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const products = await readProducts();
  const index = products.findIndex((p) => p.id === Number(id));
  if (index === -1) {
    return NextResponse.json({ error: "product not found" }, { status: 404 });
  }

  const updatedProduct = {
    ...products[index],
    ...update,
    id: Number(id),
    badge: update.badge !== undefined ? (update.badge === null ? null : String(update.badge)) : products[index].badge,
    rating: update.rating !== undefined ? Number(update.rating) : products[index].rating,
    categoryId: update.categoryId !== undefined ? Number(update.categoryId) : products[index].categoryId,
  };

  products[index] = updatedProduct;
  await writeProducts(products);

  return NextResponse.json(updatedProduct);
}

export async function DELETE(request: NextRequest) {
  const authError = await checkAuth();
  if (authError) return authError;

  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const products = await readProducts();
  const filtered = products.filter((p) => p.id !== Number(id));
  if (filtered.length === products.length) {
    return NextResponse.json({ error: "product not found" }, { status: 404 });
  }

  await writeProducts(filtered);
  return NextResponse.json({ success: true });
}
