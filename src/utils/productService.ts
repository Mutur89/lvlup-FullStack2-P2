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

export type { Product };
