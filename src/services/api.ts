// src/services/api.ts
import axiosInstance from "../config/axios";

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
  apellido: string;
  correo: string;
  contrasena: string;
  rut: string;
  telefono?: string;
  direccion?: string;
  region?: string;
  comuna?: string;
  fechaNacimiento?: number;
  rol?: string;
}

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await axiosInstance.post("/login", data);
    return response.data;
  },

  register: async (data: RegisterRequest) => {
    // Apunta a la ruta pública
    const response = await axiosInstance.post("/api/v1/users/register", data);
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
    const response = await axiosInstance.get("/api/v1/users");
    return response.data;
  },

  // <--- 2. AQUÍ ESTÁ LA SOLUCIÓN AL ERROR: Agregamos getProfile
  getProfile: async (): Promise<UserResponse> => {
    const response = await axiosInstance.get("/api/v1/users/profile");
    return response.data;
  },
  // ---------------------------------------------------------

  getById: async (id: number): Promise<UserResponse> => {
    const response = await axiosInstance.get(`/api/v1/users/${id}`);
    return response.data;
  },

  create: async (data: RegisterRequest): Promise<UserResponse> => {
    const response = await axiosInstance.post("/api/v1/users", data);
    return response.data;
  },

  update: async (
    id: number,
    data: Partial<RegisterRequest>
  ): Promise<UserResponse> => {
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
    const response = await axiosInstance.get("/api/v1/products");
    return response.data;
  },

  getById: async (id: number): Promise<ProductResponse> => {
    const response = await axiosInstance.get(`/api/v1/products/${id}`);
    return response.data;
  },

  create: async (data: ProductRequest): Promise<ProductResponse> => {
    const response = await axiosInstance.post("/api/v1/products", data);
    return response.data;
  },

  update: async (
    id: number,
    data: Partial<ProductRequest>
  ): Promise<ProductResponse> => {
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
    const response = await axiosInstance.get("/api/v1/orders");
    return response.data;
  },

  getById: async (id: number): Promise<OrderResponse> => {
    const response = await axiosInstance.get(`/api/v1/orders/${id}`);
    return response.data;
  },

  create: async (data: OrderRequest): Promise<OrderResponse> => {
    const response = await axiosInstance.post("/api/v1/orders", data);
    return response.data;
  },

  update: async (
    id: number,
    data: Partial<OrderRequest>
  ): Promise<OrderResponse> => {
    const response = await axiosInstance.put(`/api/v1/orders/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/api/v1/orders/${id}`);
  },
};

// ==================== CARTS API ====================

export interface CartItemResponse {
  id: number;
  productId: number;
  quantity: number;
  unitPrice: number;
  cartId: number;
}

export interface CartResponse {
  id: number;
  userId: number;
  cartItems: CartItemResponse[];
}

export interface CartWithTotalResponse {
  cart: CartResponse;
  total: number;
  itemCount: number;
}

export interface AddToCartRequest {
  productId: number;
  quantity?: number;
}

export interface UpdateCartQuantityRequest {
  quantity: number;
}

export const cartsApi = {
  getMyCart: async (): Promise<CartWithTotalResponse> => {
    const response = await axiosInstance.get("/api/v1/carts");
    return response.data;
  },

  addToCart: async (data: AddToCartRequest): Promise<CartWithTotalResponse> => {
    const response = await axiosInstance.post("/api/v1/carts/items", data);
    return response.data;
  },

  updateQuantity: async (
    cartItemId: number,
    data: UpdateCartQuantityRequest
  ): Promise<CartWithTotalResponse> => {
    const response = await axiosInstance.put(
      `/api/v1/carts/items/${cartItemId}`,
      data
    );
    return response.data;
  },

  removeItem: async (cartItemId: number): Promise<CartWithTotalResponse> => {
    const response = await axiosInstance.delete(
      `/api/v1/carts/items/${cartItemId}`
    );
    return response.data;
  },

  clearCart: async (): Promise<void> => {
    await axiosInstance.delete("/api/v1/carts");
  },

  getTotal: async (): Promise<{ total: number }> => {
    const response = await axiosInstance.get("/api/v1/carts/total");
    return response.data;
  },
};

export default {
  auth: authApi,
  users: usersApi,
  products: productsApi,
  orders: ordersApi,
  carts: cartsApi,
};
