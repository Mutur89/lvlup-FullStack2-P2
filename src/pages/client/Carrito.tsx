// src/pages/client/Carrito.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { getProductById } from "../../data/products";
import { decrementStock } from "../../utils/productService";

const Carrito = () => {
  const { carrito, updateQuantity, clearCart, getCartTotal } = useCart();

  const [cupon, setCupon] = useState("");
  const [descuento, setDescuento] = useState(0);

  const handleAplicarCupon = () => {
    if (cupon.trim().toUpperCase() === "DESCUENTO10") {
      setDescuento(0.1); // 10% de descuento
      alert("¡Cupón aplicado! 10% de descuento");
    } else {
      alert("Cupón no válido");
      setDescuento(0);
    }
  };

  const handleVaciarCarrito = () => {
    if (window.confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
      clearCart();
      setDescuento(0);
      setCupon("");
    }
  };

  const navigate = useNavigate();

  const handleProcederCompra = () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío");
      return;
    }
    // Redirigir al checkout para completar datos del cliente y confirmar pago
    navigate("/checkout");
  };

  const handleSumar = (productId: string) => {
    const item = carrito.find((i) => i.id === productId);
    const producto = getProductById(productId);

    if (item && producto) {
      if (item.cantidad >= producto.stock) {
        alert("No puedes agregar más, alcanzaste el stock disponible.");
      } else {
        updateQuantity(productId, item.cantidad + 1);
      }
    }
  };

  const handleRestar = (productId: string) => {
    const item = carrito.find((i) => i.id === productId);
    if (item && item.cantidad > 1) {
      updateQuantity(productId, item.cantidad - 1);
    }
  };

  const total = getCartTotal();
  const totalConDescuento = total * (1 - descuento);

  return (
    <main>
      <section className="main-content">
        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-md-7">
              <h2 className="mb-4 text-light">Tu Carrito</h2>

              {carrito.length === 0 ? (
                <div
                  className="alert alert-info"
                  id="carrito-vacio"
                  style={{ display: "block" }}
                >
                  No hay productos en el carrito.
                </div>
              ) : (
                <ul id="lista-carrito" className="list-group">
                  {carrito.map((item) => {
                    const producto = getProductById(item.id);
                    if (!producto) return null;

                    const precioFormateado =
                      producto.precio.toLocaleString("es-CL");
                    const desactivarSumar = item.cantidad >= producto.stock;

                    return (
                      <li
                        key={item.id}
                        className="list-group-item border-0 bg-dark text-light mb-3 rounded"
                        style={{
                          display: "flex",
                          gap: "1rem",
                          padding: "1rem",
                        }}
                      >
                        <img
                          src={producto.imagen}
                          alt={producto.nombre}
                          className="rounded"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />
                        <div className="flex-grow-1">
                          <div className="fw-bold mb-2">{producto.nombre}</div>
                          <div className="text-success mb-2">
                            Precio: ${precioFormateado}
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <button
                              className="btn btn-outline-light btn-sm"
                              onClick={() => handleRestar(item.id)}
                              disabled={item.cantidad <= 1}
                            >
                              -
                            </button>
                            <span className="mx-2">{item.cantidad}</span>
                            <button
                              className="btn btn-outline-light btn-sm"
                              onClick={() => handleSumar(item.id)}
                              disabled={desactivarSumar}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="col-md-5">
              <article className="card p-4 shadow-sm bg-dark border-success">
                <h4 className="mb-3 text-success">Resumen</h4>

                <div
                  id="carrito-total"
                  className="mb-3 text-success"
                  style={{ fontSize: "1.3rem" }}
                >
                  {descuento > 0 ? (
                    <>
                      <div className="text-decoration-line-through text-muted">
                        Total: ${total.toLocaleString("es-CL")}
                      </div>
                      <div>
                        Total con cupón: $
                        {totalConDescuento.toLocaleString("es-CL")}
                      </div>
                    </>
                  ) : (
                    <div>Total: ${total.toLocaleString("es-CL")}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="cupon" className="form-label text-success">
                    Cupón de descuento
                  </label>
                  <input
                    type="text"
                    id="cupon"
                    className="form-control bg-dark text-light border-success"
                    placeholder="Ingresa tu cupón"
                    value={cupon}
                    onChange={(e) => setCupon(e.target.value)}
                  />
                </div>

                <button
                  id="aplicar-cupon"
                  className="btn btn-outline-success w-100 mb-2"
                  onClick={handleAplicarCupon}
                  disabled={carrito.length === 0}
                >
                  Aplicar cupón
                </button>

                <button
                  id="proceder-compra"
                  className="btn btn-success w-100 mb-2"
                  onClick={handleProcederCompra}
                  disabled={carrito.length === 0}
                >
                  Pagar
                </button>

                <button
                  id="borrar-carrito"
                  className="btn btn-danger w-100"
                  onClick={handleVaciarCarrito}
                  disabled={carrito.length === 0}
                >
                  Vaciar carrito
                </button>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Carrito;
