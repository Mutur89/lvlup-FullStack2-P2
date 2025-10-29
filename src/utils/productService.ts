// src/utils/productService.ts
import { products as initialProducts, Product } from "../data/products";

const STORAGE_KEY = "products_v1";

function initProducts() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
  }
}

export function getProducts(): Product[] {
  initProducts();
  const raw = localStorage.getItem(STORAGE_KEY) || "[]";
  try {
    return JSON.parse(raw) as Product[];
  } catch {
    return [];
  }
}

function saveProducts(list: Product[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  // Emitir un evento para que componentes en la misma ventana puedan reaccionar
  try {
    window.dispatchEvent(new Event("products.updated"));
  } catch (e) {
    // no hacer nada si falla (por ejemplo en entornos sin window)
  }
}

export function getProductById(id: string): Product | undefined {
  return getProducts().find((p) => p.id === id);
}

export function createProduct(data: Omit<Product, "id">): Product {
  const list = getProducts();
  const parts = data.categoria.match(/\b\w/g) || [];
  const prefix = (parts.slice(0, 2).join("") || "PR").toUpperCase();
  const id = `${prefix}${Date.now().toString().slice(-6)}`;
  const newProduct: Product = { id, ...data };
  list.push(newProduct);
  saveProducts(list);
  return newProduct;
}

export function updateProduct(updated: Product): boolean {
  const list = getProducts();
  const idx = list.findIndex((p) => p.id === updated.id);
  if (idx === -1) return false;
  list[idx] = updated;
  saveProducts(list);
  return true;
}

export function deleteProduct(id: string): boolean {
  const list = getProducts();
  const newList = list.filter((p) => p.id !== id);
  if (newList.length === list.length) return false;
  saveProducts(newList);
  return true;
}

export type CartItem = { id: string; cantidad: number };

/**
 * Reduce stock for given cart items. Returns an object with success and failures.
 */
export function decrementStock(items: CartItem[]): {
  success: boolean;
  failed: { id: string; reason: string }[];
} {
  const list = getProducts();
  const failures: { id: string; reason: string }[] = [];

  // Check availability first
  for (const it of items) {
    const p = list.find((x) => x.id === it.id);
    if (!p) {
      failures.push({ id: it.id, reason: "Producto no encontrado" });
      continue;
    }
    if (p.stock < it.cantidad) {
      failures.push({ id: it.id, reason: "Stock insuficiente" });
    }
  }

  if (failures.length > 0) {
    return { success: false, failed: failures };
  }

  // Apply reductions
  const newList = list.map((p) => {
    const found = items.find((it) => it.id === p.id);
    if (found) {
      return { ...p, stock: Math.max(0, p.stock - found.cantidad) };
    }
    return p;
  });

  saveProducts(newList);
  return { success: true, failed: [] };
}

export type { Product };
