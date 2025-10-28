// src/context/CartContext.test.tsx
import { describe, expect, test, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCart } from "./CartContext";
import { ReactNode } from "react";

// Mock de getProductById
vi.mock("../data/products", () => ({
  getProductById: vi.fn((id: string) => {
    const productos: any = {
      "PROD001": { id: "PROD001", nombre: "PS5", precio: 500000, stock: 10 },
      "PROD002": { id: "PROD002", nombre: "Xbox", precio: 400000, stock: 5 },
      "PROD003": { id: "PROD003", nombre: "Switch", precio: 300000, stock: 2 },
    };
    return productos[id];
  }),
}));

// Mock de localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    clear: () => { store = {}; },
    removeItem: (key: string) => { delete store[key]; },
  };
})();

Object.defineProperty(globalThis, "localStorage", {
  value: localStorageMock,
});

globalThis.alert = vi.fn();

// Wrapper para el provider
const wrapper = ({ children }: { children: ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe('CartContext - Pruebas Esenciales', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  test('Debe agregar un producto al carrito', () => {
    //! 1 - Arrange
    const { result } = renderHook(() => useCart(), { wrapper });

    //! 2 - Act
    act(() => {
      result.current.addToCart("PROD001");
    });

    //! 3 - Assert
    expect(result.current.carrito).toHaveLength(1);
    expect(result.current.carrito[0].id).toBe("PROD001");
    expect(result.current.carrito[0].cantidad).toBe(1);
  });

  test('Debe eliminar un producto del carrito', () => {
    //! 1 - Arrange
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addToCart("PROD001");
      result.current.addToCart("PROD002");
    });

    //! 2 - Act
    act(() => {
      result.current.removeFromCart("PROD001");
    });

    //! 3 - Assert
    expect(result.current.carrito).toHaveLength(1);
    expect(result.current.carrito[0].id).toBe("PROD002");
  });

  test('Debe calcular el total del carrito correctamente', () => {
    //! 1 - Arrange
    const { result } = renderHook(() => useCart(), { wrapper });

    //! 2 - Act
    act(() => {
      result.current.addToCart("PROD001"); // PS5: 500000
      result.current.addToCart("PROD001"); // PS5: 500000 (cantidad: 2)
      result.current.addToCart("PROD002"); // Xbox: 400000
    });

    //! 3 - Assert
    const total = result.current.getCartTotal();
    expect(total).toBe(1400000); // 500000*2 + 400000
  });

  test('Debe vaciar el carrito completamente', () => {
    //! 1 - Arrange
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addToCart("PROD001");
      result.current.addToCart("PROD002");
      result.current.addToCart("PROD003");
    });

    //! 2 - Act
    act(() => {
      result.current.clearCart();
    });

    //! 3 - Assert
    expect(result.current.carrito).toHaveLength(0);
    expect(result.current.getCartTotal()).toBe(0);
    expect(result.current.getCartCount()).toBe(0);
  });
});