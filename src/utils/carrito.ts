import { Product, products as defaultProducts } from "../data/products";

type CartItem = { id: string; cantidad: number };

export type CarritoOptions = {
  listaId?: string;
  vacioId?: string;
  totalId?: string;
  procederId?: string;
  borrarId?: string;
  cuponBtnId?: string;
  cuponInputId?: string;
  productos?: Product[];
};

/**
 * Inicializa el carrito: renderiza y conecta eventos.
 */
export function initCarrito(options?: CarritoOptions): void {
  const {
    listaId = "lista-carrito",
    vacioId = "carrito-vacio",
    totalId = "carrito-total",
    procederId = "proceder-compra",
    borrarId = "borrar-carrito",
    cuponBtnId = "aplicar-cupon",
    cuponInputId = "cupon",
    productos = defaultProducts,
  } = options || {};

  const lista = document.getElementById(listaId);
  const vacio = document.getElementById(vacioId);
  const totalDiv = document.getElementById(totalId);

  if (!lista || !vacio || !totalDiv) {
    console.warn("Elementos del carrito no encontrados en el DOM.");
    return;
  }

  let carrito: CartItem[] = [];

  function loadCarrito(): void {
    const raw = localStorage.getItem("carrito");
    try {
      const parsed = raw ? JSON.parse(raw) : [];
      if (
        Array.isArray(parsed) &&
        parsed.length &&
        typeof parsed[0] === "string"
      ) {
        carrito = parsed.map((id: string) => ({ id, cantidad: 1 }));
      } else if (Array.isArray(parsed)) {
        carrito = parsed;
      } else {
        carrito = [];
      }
    } catch (e) {
      carrito = [];
    }
  }

  function saveCarrito(): void {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  function renderCarrito(): void {
    // Crear referencias locales y comprobar non-null para satisfacer a TypeScript
    const listaEl = lista;
    const vacioEl = vacio;
    const totalEl = totalDiv;

    if (!listaEl || !vacioEl || !totalEl) {
      console.warn(
        "Elementos necesarios para renderizar el carrito no están presentes."
      );
      return;
    }

    listaEl.innerHTML = "";
    let total = 0;

    const btnPagar = document.getElementById(
      procederId
    ) as HTMLButtonElement | null;
    const btnVaciar = document.getElementById(
      borrarId
    ) as HTMLButtonElement | null;
    const btnCupon = document.getElementById(
      cuponBtnId
    ) as HTMLButtonElement | null;

    if (carrito.length === 0) {
      vacioEl.style.display = "block";
      totalEl.textContent = "Total: $0";
      if (btnPagar) btnPagar.disabled = true;
      if (btnVaciar) btnVaciar.disabled = true;
      if (btnCupon) btnCupon.disabled = true;
      saveCarrito();
      return;
    } else {
      vacioEl.style.display = "none";
      if (btnPagar) btnPagar.disabled = false;
      if (btnVaciar) btnVaciar.disabled = false;
      if (btnCupon) btnCupon.disabled = false;
    }

    carrito.forEach((item) => {
      const producto = productos.find((p) => p.id === item.id);
      if (!producto) return;
      const precioNumero = Number(producto.precio) || 0;
      const precioFormateado = precioNumero.toLocaleString("es-CL");
      total += precioNumero * item.cantidad;
      const desactivarSumar = item.cantidad >= producto.stock ? "disabled" : "";

      const li = document.createElement("li");
      li.className = "carrito-item caja-clara list-group-item border-0";
      li.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" class="carrito-img">
        <div class="flex-grow-1">
          <div class="nombre-producto">${producto.nombre}</div>
          <div class="caja-precio">Precio: $${precioFormateado}</div>
          <div class="cantidad-control mt-2">
            <button class="btn btn-outline-dark btn-sm cantidad-btn" data-id="${item.id}" data-action="restar">-</button>
            <span class="mx-2">${item.cantidad}</span>
            <button class="btn btn-outline-dark btn-sm cantidad-btn" data-id="${item.id}" data-action="sumar" ${desactivarSumar}>+</button>
          </div>
        </div>
      `;
      listaEl.appendChild(li);
    });

    totalEl.textContent = `Total: $${total.toLocaleString("es-CL")}`;
    saveCarrito();
  }

  // Manejo de botones de cantidad dentro del listado
  lista.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (!target) return;
    if (target.classList.contains("cantidad-btn")) {
      const id = target.getAttribute("data-id");
      const action = target.getAttribute("data-action");
      if (!id || !action) return;
      const item = carrito.find((i) => i.id === id);
      const producto = productos.find((p) => p.id === id);
      if (item && producto) {
        if (action === "sumar") {
          if (item.cantidad < producto.stock) {
            item.cantidad++;
          } else {
            alert("No puedes agregar más, alcanzaste el stock disponible.");
          }
        }
        if (action === "restar" && item.cantidad > 1) {
          item.cantidad--;
        }
        renderCarrito();
      }
    }
  });

  // Vaciar carrito
  const btnVaciarEl = document.getElementById(borrarId);
  if (btnVaciarEl) {
    btnVaciarEl.addEventListener("click", () => {
      carrito = [];
      localStorage.removeItem("carrito");
      renderCarrito();
    });
  }

  // Proceder compra
  const btnPagarEl = document.getElementById(procederId);
  if (btnPagarEl) {
    btnPagarEl.addEventListener("click", () => {
      alert("¡Gracias por tu compra!");
      carrito = [];
      localStorage.removeItem("carrito");
      renderCarrito();
    });
  }

  // Aplicar cupón
  const btnCuponEl = document.getElementById(cuponBtnId);
  if (btnCuponEl) {
    btnCuponEl.addEventListener("click", () => {
      const input = document.getElementById(
        cuponInputId
      ) as HTMLInputElement | null;
      const cupon = input ? input.value.trim() : "";
      if (cupon === "DESCUENTO10") {
        let total = carrito.reduce((acc, item) => {
          const producto = productos.find((p) => p.id === item.id);
          return acc + (producto ? producto.precio * item.cantidad : 0);
        }, 0);
        total = total * 0.9;
        totalDiv.textContent = `Total con cupón: $${total.toLocaleString(
          "es-CL"
        )}`;
      } else {
        alert("Cupón no válido");
      }
    });
  }

  // Inicializar
  loadCarrito();
  renderCarrito();
}

export default initCarrito;
