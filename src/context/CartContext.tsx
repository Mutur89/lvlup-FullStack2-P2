// src/context/CartContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { cartsApi, CartWithTotalResponse } from "../services/api";
import { getProductById, Product } from "../utils/productService";

export interface CartItem {
  id: number; // ID del CartItem en el backend
  productId: number; // ID del producto
  quantity: number;
  unitPrice: number;
  product?: Product; // Datos del producto (opcional, lo obtenemos del backend)
}

interface CartContextType {
  carrito: CartItem[];
  loading: boolean;
  addToCart: (productId: string) => Promise<void>;
  removeFromCart: (cartItemId: number) => Promise<void>;
  updateQuantity: (cartItemId: number, cantidad: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotal: () => number;
  getCartCount: () => number;
  getProductInCart: (productId: string) => CartItem | undefined;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [carrito, setCarrito] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  // Cargar carrito desde el backend al montar (solo si está autenticado)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      refreshCart();
    }
  }, []);

  // Actualizar el contador del DOM cuando cambie el carrito
  useEffect(() => {
    updateCartCountInDOM();
  }, [carrito]);

  const refreshCart = async () => {
    try {
      setLoading(true);
      const response: CartWithTotalResponse = await cartsApi.getMyCart();

      // Convertir los CartItemResponse del backend a nuestro formato local
      const items: CartItem[] = response.cart.cartItems.map((item) => ({
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      }));

      setCarrito(items);
      setTotal(response.total);
    } catch (error: any) {
      // Si hay error 401 (no autenticado), limpiar carrito local
      if (error.response?.status === 401) {
        setCarrito([]);
        setTotal(0);
      } else {
        console.error("Error al obtener carrito:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const updateCartCountInDOM = () => {
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
      const totalCount = carrito.reduce((acc, item) => acc + item.quantity, 0);
      cartCountElement.textContent = String(totalCount);
    }
  };

  const addToCart = async (productId: string) => {
    try {
      setLoading(true);

      // Verificar que el usuario esté autenticado
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Debes iniciar sesión para agregar productos al carrito");
        return;
      }

      // Verificar stock localmente antes de llamar al backend
      const producto = await getProductById(productId);
      if (!producto) {
        alert("Producto no encontrado");
        return;
      }

      const existingItem = carrito.find(
        (item) => item.productId === Number(productId)
      );

      if (existingItem && existingItem.quantity >= producto.stock) {
        alert("No puedes agregar más, alcanzaste el stock disponible.");
        return;
      }

      // Llamar al backend
      const response = await cartsApi.addToCart({
        productId: Number(productId),
        quantity: 1,
      });

      // Actualizar el estado local con la respuesta del backend
      const items: CartItem[] = response.cart.cartItems.map((item) => ({
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      }));

      setCarrito(items);
      setTotal(response.total);
    } catch (error: any) {
      console.error("Error al agregar al carrito:", error);
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      } else {
        alert("Error al agregar producto al carrito");
      }
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (cartItemId: number) => {
    try {
      setLoading(true);

      const response = await cartsApi.removeItem(cartItemId);

      // Actualizar el estado local
      const items: CartItem[] = response.cart.cartItems.map((item) => ({
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      }));

      setCarrito(items);
      setTotal(response.total);
    } catch (error: any) {
      console.error("Error al eliminar del carrito:", error);
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      } else {
        alert("Error al eliminar producto del carrito");
      }
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (cartItemId: number, cantidad: number) => {
    try {
      setLoading(true);

      // Si la cantidad es 0 o menor, eliminar el item
      if (cantidad <= 0) {
        await removeFromCart(cartItemId);
        return;
      }

      // Verificar stock localmente
      const cartItem = carrito.find((item) => item.id === cartItemId);
      if (cartItem) {
        const producto = await getProductById(String(cartItem.productId));
        if (producto && cantidad > producto.stock) {
          alert("No puedes agregar más, alcanzaste el stock disponible.");
          setLoading(false);
          return;
        }
      }

      const response = await cartsApi.updateQuantity(cartItemId, {
        quantity: cantidad,
      });

      // Actualizar el estado local
      const items: CartItem[] = response.cart.cartItems.map((item) => ({
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      }));

      setCarrito(items);
      setTotal(response.total);
    } catch (error: any) {
      console.error("Error al actualizar cantidad:", error);
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      } else {
        alert("Error al actualizar cantidad");
      }
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      await cartsApi.clearCart();
      setCarrito([]);
      setTotal(0);
    } catch (error) {
      console.error("Error al limpiar carrito:", error);
      alert("Error al limpiar el carrito");
    } finally {
      setLoading(false);
    }
  };

  const getCartTotal = (): number => {
    return total;
  };

  const getCartCount = (): number => {
    return carrito.reduce((count, item) => count + item.quantity, 0);
  };

  const getProductInCart = (productId: string): CartItem | undefined => {
    return carrito.find((item) => item.productId === Number(productId));
  };

  const value: CartContextType = {
    carrito,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    getProductInCart,
    refreshCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
