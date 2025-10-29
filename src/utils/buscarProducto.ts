import { Product, products as defaultProducts } from "../data/products";

export type BuscarOptions = {
  idInputId?: string;
  buscarBtnId?: string;
  nombreInputId?: string;
  descripcionId?: string;
  categoriaSelectId?: string;
  precioInputId?: string;
  stockInputId?: string;
  imagenInputId?: string;
  productos?: Product[];
};

export function initBuscarProducto(options?: BuscarOptions): void {
  const {
    idInputId = "idProducto",
    buscarBtnId = "buscarProductoBtn",
    nombreInputId = "nombreProducto",
    descripcionId = "descripcion",
    categoriaSelectId = "categoria",
    precioInputId = "precio",
    stockInputId = "stock",
    imagenInputId = "imagen",
    productos = defaultProducts,
  } = options || {};

  document.addEventListener("DOMContentLoaded", () => {
    const idProductoInput = document.getElementById(
      idInputId
    ) as HTMLInputElement | null;
    const buscarProductoBtn = document.getElementById(
      buscarBtnId
    ) as HTMLButtonElement | null;
    const nombreProductoInput = document.getElementById(
      nombreInputId
    ) as HTMLInputElement | null;
    const descripcionInput = document.getElementById(
      descripcionId
    ) as HTMLInputElement | null;
    const categoriaSelect = document.getElementById(
      categoriaSelectId
    ) as HTMLSelectElement | null;
    const precioInput = document.getElementById(
      precioInputId
    ) as HTMLInputElement | null;
    const stockInput = document.getElementById(
      stockInputId
    ) as HTMLInputElement | null;
    const imagenInput = document.getElementById(
      imagenInputId
    ) as HTMLInputElement | null;

    if (!idProductoInput || !buscarProductoBtn) {
      console.warn(
        "Elementos necesarios para buscar producto no están presentes en el DOM."
      );
      return;
    }

    buscarProductoBtn.addEventListener("click", () => {
      const idBuscado = (idProductoInput.value || "").trim().toUpperCase();
      if (!idBuscado) {
        alert("Por favor, ingresa un ID de producto.");
        return;
      }

      const productoEncontrado = productos.find(
        (producto) => producto.id === idBuscado
      );
      if (productoEncontrado) {
        if (nombreProductoInput)
          nombreProductoInput.value = productoEncontrado.nombre || "";
        if (descripcionInput)
          descripcionInput.value = productoEncontrado.descripcion || "";

        // Formateo del precio
        const precioOriginal = productoEncontrado.precio;
        const precioNumero =
          parseFloat(String(precioOriginal).replace(/[^0-9]/g, "")) || 0;
        const precioFormateado = new Intl.NumberFormat("es-CL", {
          style: "currency",
          currency: "CLP",
          minimumFractionDigits: 0,
        }).format(precioNumero);
        console.log("Precio original:", precioOriginal);
        console.log("Precio formateado:", precioFormateado);
        if (precioInput) precioInput.value = precioFormateado;

        if (stockInput)
          stockInput.value = String(productoEncontrado.stock ?? "");
        if (imagenInput) imagenInput.value = productoEncontrado.imagen || "";

        // Determinar categoría por prefijo del ID (dos primeros caracteres)
        const categoriaId = (productoEncontrado.id || "").substring(0, 2);
        if (categoriaSelect) {
          // Chequear si la opción existe antes de asignar
          const opcion = categoriaSelect.querySelector(
            `option[value="${categoriaId}"]`
          ) as HTMLOptionElement | null;
          console.log("categoriaId:", categoriaId);
          console.log(
            "Opciones disponibles:",
            Array.from(categoriaSelect.options).map((opt) => opt.value)
          );
          if (opcion) {
            categoriaSelect.value = categoriaId;
          } else {
            // No existe la opción; como fallback dejar el select en vacío o primer valor
            categoriaSelect.value = "";
          }
        }
      } else {
        alert("Producto no encontrado. Por favor, verifica el ID.");
        if (nombreProductoInput) nombreProductoInput.value = "";
        if (descripcionInput) descripcionInput.value = "";
        if (categoriaSelect) categoriaSelect.value = "";
        if (precioInput) precioInput.value = "";
        if (stockInput) stockInput.value = "";
        if (imagenInput) imagenInput.value = "";
      }
    });
  });
}

export default initBuscarProducto;
