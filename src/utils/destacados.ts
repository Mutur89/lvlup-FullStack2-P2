import { Product, products as defaultProducts } from "../data/products";

export type DestacadosOptions = {
  containerId?: string;
  productos?: Product[];
  cantidad?: number;
};


export function obtenerProductosAleatorios<T>(arr: T[], n: number): T[] {
  const copia = [...arr];
  const resultado: T[] = [];
  while (resultado.length < n && copia.length > 0) {
    const idx = Math.floor(Math.random() * copia.length);

    resultado.push(copia.splice(idx, 1)[0]);
  }
  return resultado;
}

export function renderDestacadoHTML(producto: Product): string {
  const precioFormateado = `$${producto.precio.toLocaleString("es-CL")} CLP`;
  const descripcionCortada = producto.descripcion
    ? `${producto.descripcion.slice(0, 50)}...`
    : "";

  return `
    <div class="col-6 col-md-4 col-lg-3">
      <div class="card h-100">
        <div class="bg-dark-img d-flex align-items-center justify-content-center">
          <img src="${producto.imagen}" alt="${producto.nombre}" class="w-100 h-100" style="object-fit:contain;max-height:180px;">
        </div>
        <div class="card-body" style="background-color:#1a1a1a;">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">${descripcionCortada}</p>
          <p class="fw-bold mb-2">${precioFormateado}</p>
          <a href="DetalleProducto.html?id=${producto.id}" class="btn btn-dark w-100">Ver detalle</a>
        </div>
      </div>
    </div>
  `;
}


export function initDestacados(options?: DestacadosOptions): void {
  const {
    containerId = "destacados",
    productos = defaultProducts,
    cantidad = 4,
  } = options || {};

  const contenedor = document.getElementById(containerId);
  if (!contenedor) {
    console.warn(`Contenedor con id "${containerId}" no encontrado.`);
    return;
  }

  const seleccion = obtenerProductosAleatorios(productos, cantidad);
  const html = seleccion.map(renderDestacadoHTML).join("");
  // Append para no borrar posible contenido existente
  contenedor.innerHTML += html;
}

export default initDestacados;
