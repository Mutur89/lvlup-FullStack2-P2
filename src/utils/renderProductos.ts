import { Product, products as defaultProducts } from "../data/products";

export type InitOptions = {
  containerId?: string; // id del contenedor donde inyectar los productos
  tituloId?: string; // id del elemento donde colocar el nombre de la categoría
  productos?: Product[]; // lista de productos a usar (por defecto importa los products)
};

export function renderProductoHTML(producto: Product): string {
  return `
  <div class="col-12 col-sm-6 col-md-4 col-lg-3">
    <div class="card h-100">
      <div class="bg-light d-flex align-items-center justify-content-center" style="height: 180px; overflow: hidden; border-radius: 8px;">
        <img src="${producto.imagen}" alt="${
    producto.nombre
  }" class="w-100 h-100" style="object-fit: cover; border-radius: 8px;" />
      </div>
      <div class="card-body bg-dark text-light d-flex flex-column h-100">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="fw-bold mb-2">$${producto.precio.toLocaleString(
          "es-CL"
        )} CLP</p>
        <a href="DetalleProducto.html?id=${
          producto.id
        }" class="btn btn-success w-100 mt-auto">Ver detalle</a>
      </div>
    </div>
  </div>
`;
}

/**
 * Inicializa el listado de productos en el DOM.
 * - Lee la categoría desde la querystring (?categoria=...)
 * - Actualiza el elemento `tituloId` con la categoría
 * - Filtra productos por categoría y los renderiza dentro de `containerId`
 */
export function initProductosList(options?: InitOptions): void {
  const {
    containerId = "contenedor-productos",
    tituloId = "titulo-categoria",
    productos = defaultProducts,
  } = options || {};

  const params = new URLSearchParams(window.location.search);
  const categoria = params.get("categoria") || "";

  const tituloEl = document.getElementById(tituloId);
  if (tituloEl) {
    tituloEl.textContent = categoria;
  }

  const productosFiltrados = categoria
    ? productos.filter((p) => p.categoria === categoria)
    : productos;

  const contenedor = document.getElementById(containerId);
  if (!contenedor) {
    // No romper; emitir advertencia para ayudar al desarrollador
    // (quien use este módulo debe asegurarse de que el elemento exista)
    // eslint-disable-next-line no-console
    console.warn(`Contenedor con id \"${containerId}\" no encontrado.`);
    return;
  }

  contenedor.innerHTML = productosFiltrados.map(renderProductoHTML).join("");
}

export default initProductosList;
