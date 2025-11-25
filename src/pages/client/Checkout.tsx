import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { getProductById, Product } from "../../utils/productService";
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
  const [productos, setProductos] = useState<Map<number, Product>>(new Map());

  const total = getCartTotal();

  // Cargar información de productos cuando cambia el carrito
  useEffect(() => {
    const loadProducts = async () => {
      const productMap = new Map<number, Product>();

      for (const item of carrito) {
        const producto = await getProductById(String(item.productId));
        if (producto) {
          productMap.set(item.productId, producto);
        }
      }

      setProductos(productMap);
    };

    if (carrito.length > 0) {
      loadProducts();
    } else {
      setProductos(new Map());
    }
  }, [carrito]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handlePagar = async () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío");
      return;
    }

    if (!form.nombre || !form.email || !form.direccion) {
      alert("Por favor completa nombre, email y dirección");
      return;
    }

    // Verificar que el token existe
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Tu sesión ha expirado. Por favor inicia sesión nuevamente.");
      navigate("/login");
      return;
    }

    setProcessing(true);

    try {
      // Simular delay de procesamiento de pago
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // PASO 1: Decrementar stock de cada producto en el backend
      const updatePromises = carrito.map(async (item) => {
        const producto = productos.get(item.productId);
        if (producto) {
          const nuevoStock = producto.stock - item.quantity;

          // Importar productsApi desde services/api.ts
          const { productsApi } = await import("../../services/api");

          // Actualizar el stock en el backend con TODOS los campos requeridos
          await productsApi.update(item.productId, {
            nombre: producto.nombre,
            categoria: producto.categoria,
            descripcion: producto.descripcion,
            imagen: producto.imagen,
            precio: producto.precio,
            stock: nuevoStock,
          });
        }
      });

      // Esperar a que todos los stocks se actualicen
      await Promise.all(updatePromises);

      // PASO 2: Limpiar carrito en el backend
      await clearCart();

      // PASO 3: Simular pago exitoso
      alert(
        `¡Pago recibido con éxito!\n\nGracias ${
          form.nombre || user?.nombre || "cliente"
        }!\n\nMonto total: $${total.toLocaleString("es-CL")} CLP\n\nRecibirás un correo de confirmación a ${form.email}`
      );

      // Redirigir al home
      navigate("/");
    } catch (error: any) {
      console.error("Error al procesar el pago:", error);

      // Si es un error 401, significa que el token expiró
      if (error.response?.status === 401) {
        alert("Tu sesión ha expirado. Por favor inicia sesión nuevamente.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      } else {
        alert("Error al procesar el pago. Por favor intenta nuevamente.");
      }
    } finally {
      setProcessing(false);
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
                  <label htmlFor="direccion" className="form-label text-success">
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

              {/* Resumen de items */}
              <div className="mt-3">
                <h5 className="text-light">Resumen de items</h5>
                {carrito.length === 0 ? (
                  <div className="alert alert-info">No hay productos en el carrito</div>
                ) : (
                  <ul className="list-group">
                    {carrito.map((item) => {
                      const producto = productos.get(item.productId);
                      if (!producto) {
                        return (
                          <li
                            key={item.id}
                            className="list-group-item bg-dark text-light border-0 mb-2 rounded"
                          >
                            <div className="text-muted">Cargando producto...</div>
                          </li>
                        );
                      }

                      const subtotal = item.unitPrice * item.quantity;

                      return (
                        <li
                          key={item.id}
                          className="list-group-item bg-dark text-light border-0 mb-2 rounded"
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <div className="fw-bold">{producto.nombre}</div>
                              <div className="text-success">
                                {item.quantity} x ${item.unitPrice.toLocaleString("es-CL")}
                              </div>
                            </div>
                            <div className="text-success fw-bold">
                              ${subtotal.toLocaleString("es-CL")}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>

            <div className="col-md-5">
              <article className="card p-4 shadow-sm bg-dark border-success">
                <h4 className="mb-3 text-success">Resumen de pago</h4>

                <div className="mb-3 text-success" style={{ fontSize: "1.3rem" }}>
                  <div>Total a pagar: ${total.toLocaleString("es-CL")} CLP</div>
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
