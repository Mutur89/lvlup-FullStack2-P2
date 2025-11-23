// src/utils/ordersService.ts
import { ordersApi, OrderResponse, OrderItemRequest } from '../services/api';

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

// Convertir OrderResponse del backend a Order del frontend
function mapToOrder(apiOrder: OrderResponse): Order {
  return {
    id: apiOrder.id.toString(),
    createdAt: apiOrder.createdAt || new Date().toISOString(),
    customer: {
      userId: apiOrder.userId.toString(),
      direccion: apiOrder.direccionEnvio,
    },
    items: apiOrder.orderItems.map(item => ({
      id: item.productId.toString(),
      cantidad: item.cantidad,
      precioUnitario: item.precioUnitario,
    })),
    total: apiOrder.total,
    status: apiOrder.estado,
  };
}

export async function getOrders(): Promise<Order[]> {
  try {
    const orders = await ordersApi.getAll();
    return orders.map(mapToOrder).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  } catch (error) {
    console.error('Error al obtener órdenes:', error);
    return [];
  }
}

export async function getOrderById(id: string): Promise<Order | undefined> {
  try {
    const order = await ordersApi.getById(Number(id));
    return mapToOrder(order);
  } catch (error) {
    console.error('Error al obtener orden por ID:', error);
    return undefined;
  }
}

export async function createOrder(payload: Omit<Order, "id" | "createdAt">): Promise<Order> {
  try {
    const userId = payload.customer.userId ? Number(payload.customer.userId) : 0;

    const orderItems: OrderItemRequest[] = payload.items.map(item => ({
      productId: Number(item.id),
      cantidad: item.cantidad,
      precioUnitario: item.precioUnitario || 0,
    }));

    const created = await ordersApi.create({
      userId,
      total: payload.total,
      descuento: 0,
      estado: payload.status || 'Pendiente',
      metodoPago: 'Transferencia', // Valor por defecto, se puede personalizar
      direccionEnvio: payload.customer.direccion || '',
      orderItems,
    });

    return mapToOrder(created);
  } catch (error) {
    console.error('Error al crear orden:', error);
    throw error;
  }
}

export async function updateOrder(id: string, patch: Partial<Order>): Promise<Order | null> {
  try {
    const orderItems = patch.items?.map(item => ({
      productId: Number(item.id),
      cantidad: item.cantidad,
      precioUnitario: item.precioUnitario || 0,
    }));

    const updated = await ordersApi.update(Number(id), {
      ...(patch.customer?.userId && { userId: Number(patch.customer.userId) }),
      ...(patch.total !== undefined && { total: patch.total }),
      ...(patch.status && { estado: patch.status }),
      ...(patch.customer?.direccion && { direccionEnvio: patch.customer.direccion }),
      ...(orderItems && { orderItems }),
    });

    return mapToOrder(updated);
  } catch (error) {
    console.error('Error al actualizar orden:', error);
    return null;
  }
}

export default { getOrders, getOrderById, createOrder, updateOrder };
