// src/context/CartContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Product, getProductById } from "../utils/productService";

export interface CartItem {
  id: string;
  cantidad: number;
}

interface CartContextType {
  carrito: CartItem[];
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, cantidad: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  getProductInCart: (productId: string) => CartItem | undefined;
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

  // Cargar carrito desde localStorage al montar
  useEffect(() => {
    loadCarrito();
  }, []);

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    saveCarrito();
    updateCartCountInDOM();
  }, [carrito]);

  const loadCarrito = () => {
    const raw = localStorage.getItem("carrito");
    try {
      const parsed = raw ? JSON.parse(raw) : [];
      if (
        Array.isArray(parsed) &&
        parsed.length &&
        typeof parsed[0] === "string"
      ) {
        // Formato antiguo: array de strings
        setCarrito(parsed.map((id: string) => ({ id, cantidad: 1 })));
      } else if (Array.isArray(parsed)) {
        // Formato nuevo: array de objetos {id, cantidad}
        setCarrito(parsed);
      } else {
        setCarrito([]);
      }
    } catch (e) {
      setCarrito([]);
    }
  };

  const saveCarrito = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  };

  const updateCartCountInDOM = () => {
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
      const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
      cartCountElement.textContent = String(total);
    }
  };

  const addToCart = (productId: string) => {
    const producto = getProductById(productId);
    if (!producto) {
      alert("Producto no encontrado");
      return;
    }

    setCarrito((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (existing) {
        // Ya existe, verificar stock
        if (existing.cantidad >= producto.stock) {
          alert("No puedes agregar más, alcanzaste el stock disponible.");
          return prev;
        }
        // Incrementar cantidad
        return prev.map((item) =>
          item.id === productId
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        // Agregar nuevo producto
        return [...prev, { id: productId, cantidad: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCarrito((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, cantidad: number) => {
    const producto = getProductById(productId);
    if (!producto) return;

    if (cantidad <= 0) {
      removeFromCart(productId);
      return;
    }

    if (cantidad > producto.stock) {
      alert("No puedes agregar más, alcanzaste el stock disponible.");
      return;
    }

    setCarrito((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, cantidad } : item))
    );
  };

  const clearCart = () => {
    setCarrito([]);
    localStorage.removeItem("carrito");
  };

  const getCartTotal = (): number => {
    return carrito.reduce((total, item) => {
      const producto = getProductById(item.id);
      return total + (producto ? producto.precio * item.cantidad : 0);
    }, 0);
  };

  const getCartCount = (): number => {
    return carrito.reduce((count, item) => count + item.cantidad, 0);
  };

  const getProductInCart = (productId: string): CartItem | undefined => {
    return carrito.find((item) => item.id === productId);
  };

  const value: CartContextType = {
    carrito,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    getProductInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
