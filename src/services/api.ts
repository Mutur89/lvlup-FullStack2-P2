// src/services/api.ts
import axiosInstance from '../config/axios';

// ==================== AUTH API ====================

export interface LoginRequest {
  correo: string;
  contrasena: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  message: string;
}

export interface RegisterRequest {
  nombre: string;
  correo: string;
  contrasena: string;
  rut?: string;
  telefono?: string;
  direccion?: string;
  rol?: string;
}

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await axiosInstance.post('/login', data);
    return response.data;
  },

  register: async (data: RegisterRequest) => {
    const response = await axiosInstance.post('/api/v1/users', data);
    return response.data;
  },
};

// ==================== USERS API ====================

export interface UserResponse {
  id: number;
  nombre: string;
  correo: string;
  rut?: string;
  telefono?: string;
  direccion?: string;
  rol: string;
  createdAt?: string;
  updatedAt?: string;
}

export const usersApi = {
  getAll: async (): Promise<UserResponse[]> => {
    const response = await axiosInstance.get('/api/v1/users');
    return response.data;
  },

  getById: async (id: number): Promise<UserResponse> => {
    const response = await axiosInstance.get(`/api/v1/users/${id}`);
    return response.data;
  },

  create: async (data: RegisterRequest): Promise<UserResponse> => {
    const response = await axiosInstance.post('/api/v1/users', data);
    return response.data;
  },

  update: async (id: number, data: Partial<RegisterRequest>): Promise<UserResponse> => {
    const response = await axiosInstance.put(`/api/v1/users/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/api/v1/users/${id}`);
  },
};

// ==================== PRODUCTS API ====================

export interface ProductResponse {
  id: number;
  nombre: string;
  categoria: string;
  descripcion?: string;
  imagen: string;
  precio: number;
  stock: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductRequest {
  nombre: string;
  categoria: string;
  descripcion?: string;
  imagen: string;
  precio: number;
  stock: number;
}

export const productsApi = {
  getAll: async (): Promise<ProductResponse[]> => {
    const response = await axiosInstance.get('/api/v1/products');
    return response.data;
  },

  getById: async (id: number): Promise<ProductResponse> => {
    const response = await axiosInstance.get(`/api/v1/products/${id}`);
    return response.data;
  },

  create: async (data: ProductRequest): Promise<ProductResponse> => {
    const response = await axiosInstance.post('/api/v1/products', data);
    return response.data;
  },

  update: async (id: number, data: Partial<ProductRequest>): Promise<ProductResponse> => {
    const response = await axiosInstance.put(`/api/v1/products/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/api/v1/products/${id}`);
  },
};

// ==================== ORDERS API ====================

export interface OrderItemRequest {
  productId: number;
  cantidad: number;
  precioUnitario: number;
}

export interface OrderRequest {
  userId: number;
  total: number;
  descuento: number;
  estado: string;
  metodoPago: string;
  direccionEnvio: string;
  codigoCupon?: string;
  orderItems: OrderItemRequest[];
}

export interface OrderItemResponse {
  id: number;
  productId: number;
  cantidad: number;
  precioUnitario: number;
}

export interface OrderResponse {
  id: number;
  userId: number;
  total: number;
  descuento: number;
  estado: string;
  metodoPago: string;
  direccionEnvio: string;
  codigoCupon?: string;
  orderItems: OrderItemResponse[];
  createdAt?: string;
  updatedAt?: string;
}

export const ordersApi = {
  getAll: async (): Promise<OrderResponse[]> => {
    const response = await axiosInstance.get('/api/v1/orders');
    return response.data;
  },

  getById: async (id: number): Promise<OrderResponse> => {
    const response = await axiosInstance.get(`/api/v1/orders/${id}`);
    return response.data;
  },

  create: async (data: OrderRequest): Promise<OrderResponse> => {
    const response = await axiosInstance.post('/api/v1/orders', data);
    return response.data;
  },

  update: async (id: number, data: Partial<OrderRequest>): Promise<OrderResponse> => {
    const response = await axiosInstance.put(`/api/v1/orders/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/api/v1/orders/${id}`);
  },
};

export default {
  auth: authApi,
  users: usersApi,
  products: productsApi,
  orders: ordersApi,
};
