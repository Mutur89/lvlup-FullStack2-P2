// src/utils/productService.ts
import { productsApi, ProductResponse } from '../services/api';
import { Product } from "../data/products";

// Convertir ProductResponse del backend a Product del frontend
function mapToProduct(apiProduct: ProductResponse): Product {
  return {
    id: apiProduct.id.toString(),
    nombre: apiProduct.nombre,
    categoria: apiProduct.categoria,
    descripcion: apiProduct.descripcion || '',
    imagen: apiProduct.imagen,
    precio: apiProduct.precio,
    stock: apiProduct.stock,
  };
}

export async function getProducts(): Promise<Product[]> {
  try {
    const products = await productsApi.getAll();
    return products.map(mapToProduct);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | undefined> {
  try {
    const product = await productsApi.getById(Number(id));
    return mapToProduct(product);
  } catch (error) {
    console.error('Error al obtener producto por ID:', error);
    return undefined;
  }
}

export async function createProduct(data: Omit<Product, "id">): Promise<Product> {
  try {
    const created = await productsApi.create({
      nombre: data.nombre,
      categoria: data.categoria,
      descripcion: data.descripcion,
      imagen: data.imagen,
      precio: data.precio,
      stock: data.stock,
    });

    // Emitir evento para componentes que estén escuchando
    try {
      window.dispatchEvent(new Event("products.updated"));
    } catch (e) {
      // no hacer nada si falla
    }

    return mapToProduct(created);
  } catch (error) {
    console.error('Error al crear producto:', error);
    throw error;
  }
}

export async function updateProduct(updated: Product): Promise<boolean> {
  try {
    await productsApi.update(Number(updated.id), {
      nombre: updated.nombre,
      categoria: updated.categoria,
      descripcion: updated.descripcion,
      imagen: updated.imagen,
      precio: updated.precio,
      stock: updated.stock,
    });

    // Emitir evento para componentes que estén escuchando
    try {
      window.dispatchEvent(new Event("products.updated"));
    } catch (e) {
      // no hacer nada si falla
    }

    return true;
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    return false;
  }
}

export async function deleteProduct(id: string): Promise<boolean> {
  try {
    await productsApi.delete(Number(id));

    // Emitir evento para componentes que estén escuchando
    try {
      window.dispatchEvent(new Event("products.updated"));
    } catch (e) {
      // no hacer nada si falla
    }

    return true;
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    return false;
  }
}

export type CartItem = { id: string; cantidad: number };

export async function decrementStock(items: CartItem[]): Promise<{
  success: boolean;
  failed: { id: string; reason: string }[];
}> {
  try {
    const products = await getProducts();
    const failures: { id: string; reason: string }[] = [];

    // FASE 1: Validar todo antes de modificar
    for (const it of items) {
      const p = products.find((x) => x.id === it.id);
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

    // FASE 2: Aplicar cambios solo si todo está OK
    for (const it of items) {
      const p = products.find((x) => x.id === it.id);
      if (p) {
        const newStock = Math.max(0, p.stock - it.cantidad);
        await updateProduct({ ...p, stock: newStock });
      }
    }

    return { success: true, failed: [] };
  } catch (error) {
    console.error('Error al decrementar stock:', error);
    return { success: false, failed: [{ id: '', reason: 'Error al decrementar stock' }] };
  }
}

export type { Product };
