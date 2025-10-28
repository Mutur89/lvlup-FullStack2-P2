// src/utils/productService.test.ts
import { describe, expect, test, beforeEach } from "vitest";
import {
  getProducts,
  createProduct,
  deleteProduct,
  decrementStock,
  type Product,
  type CartItem,
} from "./productService";

// Mock simple de localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(globalThis, "localStorage", {
  value: localStorageMock,
});

describe('ProductService - Pruebas Esenciales', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('Debe obtener la lista de productos', () => {
    //! 1 - Arrange & Act
    const productos = getProducts();

    //! 2 - Assert
    expect(Array.isArray(productos)).toBe(true);
    expect(productos.length).toBeGreaterThan(0);
  });

  test('Debe crear un nuevo producto con ID único', () => {
    //! 1 - Arrange
    const datos: Omit<Product, "id"> = {
      nombre: "PlayStation 5",
      precio: 599990,
      descripcion: "Consola de última generación",
      categoria: "Consola",
      stock: 10,
      imagen: "/images/ps5.jpg",
    };

    //! 2 - Act
    const producto = createProduct(datos);

    //! 3 - Assert
    expect(producto.id).toBeDefined();
    expect(producto.nombre).toBe("PlayStation 5");
    expect(producto.precio).toBe(599990);
  });

  test('Debe eliminar un producto existente', () => {
    //! 1 - Arrange
    const datos: Omit<Product, "id"> = {
      nombre: "Xbox Series X",
      precio: 499990,
      descripcion: "Consola Xbox",
      categoria: "Consola",
      stock: 5,
      imagen: "/images/xbox.jpg",
    };
    const producto = createProduct(datos);
    const productosAntes = getProducts().length;

    //! 2 - Act
    const resultado = deleteProduct(producto.id);
    const productosDespues = getProducts().length;

    //! 3 - Assert
    expect(resultado).toBe(true);
    expect(productosDespues).toBe(productosAntes - 1);
  });

  test('Debe reducir el stock de productos correctamente', () => {
    //! 1 - Arrange
    const datos: Omit<Product, "id"> = {
      nombre: "Mouse Gamer",
      precio: 30000,
      descripcion: "Mouse RGB",
      categoria: "Mouse",
      stock: 10,
      imagen: "/images/mouse.jpg",
    };
    const producto = createProduct(datos);
    const items: CartItem[] = [{ id: producto.id, cantidad: 3 }];

    //! 2 - Act
    const resultado = decrementStock(items);
    const productos = getProducts();
    const actualizado = productos.find((p) => p.id === producto.id);

    //! 3 - Assert
    expect(resultado.success).toBe(true);
    expect(actualizado?.stock).toBe(7);
  });
});