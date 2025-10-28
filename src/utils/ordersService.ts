// src/utils/ordersService.ts
export interface OrderItem {
  id: string;
  cantidad: number;
  precioUnitario?: number;
}

export interface Order {
  id: string;
  createdAt: string; // ISO
  customer: {
    nombre?: string;
    email?: string;
    telefono?: string;
    direccion?: string;
    userId?: string | null; // si hay usuario autenticado
  };
  items: OrderItem[];
  total: number;
  status?: string;
}

const KEY = "pedidos";

function load(): Order[] {
  try {
    const raw = localStorage.getItem(KEY) || "[]";
    return JSON.parse(raw) as Order[];
  } catch {
    return [];
  }
}

function save(list: Order[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function getOrders(): Order[] {
  return load().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function getOrderById(id: string): Order | undefined {
  return load().find((o) => o.id === id);
}

export function createOrder(payload: Omit<Order, "id" | "createdAt">): Order {
  const list = load();
  const id = `P${Date.now().toString().slice(-6)}`;
  const order: Order = {
    id,
    createdAt: new Date().toISOString(),
    ...payload,
  };
  list.push(order);
  save(list);
  return order;
}

export function updateOrder(id: string, patch: Partial<Order>): Order | null {
  const list = load();
  const idx = list.findIndex((o) => o.id === id);
  if (idx === -1) return null;
  const merged = { ...list[idx], ...patch } as Order;
  // ensure createdAt and id not overwritten
  merged.id = list[idx].id;
  merged.createdAt = list[idx].createdAt;
  list[idx] = merged;
  save(list);
  return merged;
}

export default { getOrders, getOrderById, createOrder, updateOrder };
