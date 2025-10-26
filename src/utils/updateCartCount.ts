/**
 * Actualiza el contador del carrito en el navbar.
 * - Lee localStorage 'carrito' de forma segura
 * - Soporta formatos antiguos (array de ids strings) y objetos {id, cantidad}
 */
export function updateCartCount(): void {
  const cartCountElement = document.getElementById("cart-count");
  if (!cartCountElement) return;

  let raw: string | null = null;
  try {
    raw = localStorage.getItem("carrito");
  } catch (e) {
    // localStorage inaccesible (modo privado u otro problema)
    cartCountElement.textContent = "0";
    return;
  }

  if (!raw) {
    cartCountElement.textContent = "0";
    return;
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      cartCountElement.textContent = "0";
      return;
    }

    // Calcular el total: si el item es string -> 1, si es objeto con cantidad -> sumar cantidad
    const total = parsed.reduce((acc: number, item: any) => {
      if (typeof item === "string") return acc + 1;
      if (item && typeof item === "object") {
        const c = Number(item.cantidad);
        return acc + (Number.isFinite(c) ? c : 1);
      }
      return acc + 0;
    }, 0);

    cartCountElement.textContent = String(total);
  } catch (e) {
    cartCountElement.textContent = "0";
  }
}

// Ejecutar inmediatamente si el DOM ya está listo, sino en DOMContentLoaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", updateCartCount);
} else {
  updateCartCount();
}

export default updateCartCount;
