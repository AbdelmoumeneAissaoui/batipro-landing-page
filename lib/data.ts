import fs from "fs";
import path from "path";
import { Product } from "@/lib/types";

const getProductsFilePath = () => path.join(process.cwd(), "data", "products.json");

export async function readProducts(): Promise<Product[]> {
  const filePath = getProductsFilePath();
  if (!fs.existsSync(filePath)) {
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
    await fs.promises.writeFile(filePath, JSON.stringify([]));
    return [];
  }

  const raw = await fs.promises.readFile(filePath, "utf-8");
  try {
    const products = JSON.parse(raw);
    if (!Array.isArray(products)) return [];
    return products;
  } catch {
    return [];
  }
}

export async function writeProducts(products: Product[]): Promise<void> {
  const filePath = getProductsFilePath();
  await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
  await fs.promises.writeFile(filePath, JSON.stringify(products, null, 2), "utf-8");
}
