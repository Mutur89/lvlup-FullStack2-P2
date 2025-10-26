import { Product, products as defaultProducts } from "../data/products";

type CartItem = { id: string; cantidad: number };

export type DetalleOptions = {
  containerId?: string;
  productos?: Product[];
};

export function renderDetalleHTML(producto: Product): string {
  const precioFormateado = `$${producto.precio.toLocaleString("es-CL")}`;
  const categoria = producto.categoria || "Categoría";

  const breadcrumb = `
    <nav aria-label="breadcrumb" class="mb-4">
      <ol class="breadcrumb bg-transparent p-0">
        <li class="breadcrumb-item"><a href="Home.html" class="text-success text-decoration-none">Home</a></li>
        <li class="breadcrumb-item"><a href="#" class="text-success text-decoration-none">${categoria}</a></li>
        <li class="breadcrumb-item active text-light" aria-current="page">${producto.nombre}</li>
      </ol>
    </nav>
  `;

  return `
    ${breadcrumb}
    <div class="row align-items-center">
      <div class="col-md-6 d-flex justify-content-start align-items-center mb-4 mb-md-0">
        <img src="${producto.imagen}" alt="${producto.nombre}" class="detalle-img img-fluid rounded shadow" style="max-height:400px;object-fit:contain; margin-left:0;">
      </div>
      <div class="col-md-6">
        <div class="caja-detalle">
          <div class="d-flex align-items-center mb-3">
            <h2 class="mb-0 flex-grow-1">${producto.nombre}</h2>
            <span class="badge bg-success fs-4 ms-3">${precioFormateado}</span>
          </div>
          <div class="mb-4 text-secondary" style="font-size:1.1rem;">${producto.descripcion}</div>
          <button id="agregar-carrito" class="btn btn-success btn-lg px-4">Agregar producto</button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Inicializa la vista de detalle del producto.
 * - Lee ?id=... desde la URL
 * - Busca el producto en la lista y renderiza
 * - Agrega comportamiento para añadir al carrito en localStorage
 */
export function initDetalleProducto(options?: DetalleOptions): void {
  const { containerId = "detalle-producto", productos = defaultProducts } =
    options || {};

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const contenedor = document.getElementById(containerId);
  if (!contenedor) {
    console.warn(`Contenedor con id "${containerId}" no encontrado.`);
    return;
  }

  if (!id) {
    contenedor.innerHTML = "<p>Producto no encontrado.</p>";
    return;
  }

  const producto = productos.find((p) => p.id === id);

  if (producto) {
    contenedor.innerHTML = renderDetalleHTML(producto);

    const boton = document.getElementById("agregar-carrito");
    if (!boton) {
      console.warn(
        "Botón 'agregar-carrito' no encontrado en el detalle del producto."
      );
      return;
    }

    boton.addEventListener("click", function () {
      let carrito: CartItem[] = [];
      const raw = localStorage.getItem("carrito");
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          // Normaliza: si son strings, convertirlos a objetos {id, cantidad}
          carrito = Array.isArray(parsed)
            ? parsed.map((item: any) =>
                typeof item === "string" ? { id: item, cantidad: 1 } : item
              )
            : [];
        } catch (e) {
          carrito = [];
        }
      }

      const existente = carrito.find((item) => item.id === producto.id);
      if (existente) {
        existente.cantidad++;
      } else {
        carrito.push({ id: producto.id, cantidad: 1 });
      }

      localStorage.setItem("carrito", JSON.stringify(carrito));
      alert("Producto agregado al carrito");

      // Si hay una función global updateCartCount, llamarla
      const win = window as any;
      if (typeof win.updateCartCount === "function") {
        try {
          win.updateCartCount();
        } catch (e) {
          // ignorar errores internos de la función global
        }
      }
    });
  } else {
    contenedor.innerHTML = "<p>Producto no encontrado.</p>";
  }
}

export default initDetalleProducto;
