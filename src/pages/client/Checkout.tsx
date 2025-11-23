import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { decrementStock } from "../../utils/productService";
import { getProductById } from "../../data/products";
import { createOrder } from "../../utils/ordersService";
import { useAuth } from "../../context/AuthContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { carrito, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
  });

  const [processing, setProcessing] = useState(false);

  const total = getCartTotal();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handlePagar = () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío");
      return;
    }

    if (!form.nombre || !form.email || !form.direccion) {
      alert("Por favor completa nombre, email y dirección");
      return;
    }

    setProcessing(true);
  // PASO 1: Preparar items del carrito
    const items = carrito.map((c) => ({ id: c.id, cantidad: c.cantidad }));
  // PASO 2: Decrementar stock (validación transaccional)
    const result = decrementStock(items);

    if (!result.success) {
      const reasons = result.failed
        .map((f) => `${f.id}: ${f.reason}`)
        .join("\n");
      alert("No se pudo procesar la compra:\n" + reasons);
      setProcessing(false);
      return;
    }

    // Crear pedido y guardarlo en localStorage
    try {
      const order = createOrder({
        customer: {
          nombre: form.nombre,
          email: form.email,
          telefono: form.telefono,
          direccion: form.direccion,
          userId: user?.id || null,
        },
        items: carrito.map((c) => ({ id: c.id, cantidad: c.cantidad })),
        total,
        status: "pagado",
      });

      // Simular pago exitoso
      alert(
        `Pago recibido. ¡Gracias, ${
          form.nombre || user?.nombre || "cliente"
        }! Pedido ID: ${order.id} - Monto: $${total.toLocaleString("es-CL")}`
      );
      clearCart();
      setProcessing(false);
      navigate("/");
    } catch (err) {
      setProcessing(false);
      alert("Error al guardar el pedido. Por favor intenta nuevamente.");
    }
  };

  const handleCancelar = () => {
    navigate("/carrito");
  };

  return (
    <main>
      <section className="main-content">
        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-md-7">
              <h2 className="mb-4 text-light">Datos del comprador</h2>

              <div className="card p-4 bg-dark border-success text-light">
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label text-success">
                    Nombre completo
                  </label>
                  <input
                    id="nombre"
                    className="form-control bg-dark text-light border-success"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Nombre y apellidos"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-success">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="form-control bg-dark text-light border-success"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="correo@ejemplo.com"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="telefono" className="form-label text-success">
                    Teléfono
                  </label>
                  <input
                    id="telefono"
                    className="form-control bg-dark text-light border-success"
                    value={form.telefono}
                    onChange={handleChange}
                    placeholder="+56 9 1234 5678"
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="direccion"
                    className="form-label text-success"
                  >
                    Dirección
                  </label>
                  <input
                    id="direccion"
                    className="form-control bg-dark text-light border-success"
                    value={form.direccion}
                    onChange={handleChange}
                    placeholder="Calle, número, ciudad"
                  />
                </div>
              </div>

              {/* Opcional: mostrar resumen por ítem */}
              <div className="mt-3">
                <h5 className="text-light">Resumen de items</h5>
                <ul className="list-group">
                  {carrito.map((c) => {
                    const p = getProductById(c.id);
                    if (!p) return null;
                    return (
                      <li
                        key={c.id}
                        className="list-group-item bg-dark text-light border-0 mb-2 rounded"
                      >
                        <div className="d-flex justify-content-between">
                          <div>
                            <div className="fw-bold">{p.nombre}</div>
                            <div className="text-success">x{c.cantidad}</div>
                          </div>
                          <div className="text-success">
                            ${(p.precio * c.cantidad).toLocaleString("es-CL")}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="col-md-5">
              <article className="card p-4 shadow-sm bg-dark border-success">
                <h4 className="mb-3 text-success">Resumen de pago</h4>

                <div
                  className="mb-3 text-success"
                  style={{ fontSize: "1.3rem" }}
                >
                  <div>Total a pagar: ${total.toLocaleString("es-CL")}</div>
                </div>

                <button
                  className="btn btn-success w-100 mb-2"
                  onClick={handlePagar}
                  disabled={processing || carrito.length === 0}
                >
                  {processing ? "Procesando..." : "Pagar"}
                </button>

                <button
                  className="btn btn-outline-light w-100"
                  onClick={handleCancelar}
                  disabled={processing}
                >
                  Cancelar
                </button>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Checkout;
