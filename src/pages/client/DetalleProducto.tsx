// src/pages/client/DetalleProducto.tsx
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Product,
  getProductById,
  getProducts,
} from "../../utils/productService";
import { useCart } from "../../context/CartContext";

const DetalleProducto = () => {
  const [searchParams] = useSearchParams();
  const [producto, setProducto] = useState<Product | null>(null);
  const [productosRecomendados, setProductosRecomendados] = useState<Product[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const id = searchParams.get("id") || "";
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducto = async () => {
      setLoading(true);
      if (id) {
        // Buscar el producto por ID
        const productoEncontrado = await getProductById(id);
        setProducto(productoEncontrado || null);

        // Obtener productos recomendados (aleatorios)
        if (productoEncontrado) {
          const otrosProductos = (await getProducts()).filter((p) => p.id !== id);
          const recomendados = otrosProductos
            .sort(() => Math.random() - 0.5)
            .slice(0, 4);
          setProductosRecomendados(recomendados);
        }
      }
      setLoading(false);
    };

    fetchProducto();
  }, [id]);

  // Escuchar actualizaciones de productos (cuando se modifica stock)
  useEffect(() => {
    const handler = async () => {
      const updated = await getProductById(id);
      setProducto(updated || null);
    };

    window.addEventListener("products.updated", handler as EventListener);
    // también manejar storage para multi-tab
    const storageHandler = (ev: StorageEvent) => {
      if (ev.key === "products_v1") handler();
    };
    window.addEventListener("storage", storageHandler);

    return () => {
      window.removeEventListener("products.updated", handler as EventListener);
      window.removeEventListener("storage", storageHandler);
    };
  }, [id]);

  const handleAgregarCarrito = () => {
    if (producto) {
      addToCart(producto.id);
      alert(`"${producto.nombre}" agregado al carrito`);
    }
  };

  if (loading) {
    return (
      <main className="container py-5 text-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="text-light mt-3">Cargando producto...</p>
      </main>
    );
  }

  if (!producto) {
    return (
      <main className="container py-5">
        <div className="alert alert-danger text-center">
          <h3>Producto no encontrado</h3>
          <p>El producto que buscas no existe o fue eliminado.</p>
          <Link to="/productos" className="btn btn-primary">
            Volver a productos
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* Detalle del producto */}
      <section className="main-content">
        <article>
          <div id="detalle-producto" className="container mt-4">
            <div className="row">
              <div className="col-md-6">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="img-fluid rounded shadow"
                  style={{
                    maxHeight: "500px",
                    objectFit: "contain",
                    width: "100%",
                  }}
                />
              </div>
              <div className="col-md-6">
                <h1 className="fw-bold mb-3 text-light">{producto.nombre}</h1>
                <p className="badge bg-success fs-6 mb-3">
                  {producto.categoria}
                </p>
                <p className="fs-5 text-light mb-4">{producto.descripcion}</p>
                <div className="d-flex align-items-center mb-3">
                  <span className="fs-3 fw-bold text-success me-3">
                    ${producto.precio.toLocaleString("es-CL")} CLP
                  </span>
                  <span className="badge bg-secondary">
                    Stock: {producto.stock} unidades
                  </span>
                </div>
                <button
                  className="btn btn-success btn-lg w-100"
                  onClick={handleAgregarCarrito}
                  disabled={producto.stock === 0}
                >
                  {producto.stock > 0 ? "Agregar al carrito" : "Sin stock"}
                </button>
                <Link
                  to={`/productos?categoria=${producto.categoria}`}
                  className="btn btn-outline-light btn-lg w-100 mt-3"
                >
                  Ver más de {producto.categoria}
                </Link>
              </div>
            </div>
          </div>
        </article>
      </section>

      {/* Productos recomendados */}
      <section className="py-5 bg-dark text-light" id="productos">
        <div className="container">
          <h2 className="mb-4 fw-bold">Productos Recomendados</h2>
          <article>
            <div className="row g-4" id="destacados">
              {productosRecomendados.map((prod) => (
                <div
                  key={prod.id}
                  className="col-12 col-sm-6 col-md-4 col-lg-3"
                >
                  <div className="card h-100">
                    <div
                      className="bg-light d-flex align-items-center justify-content-center"
                      style={{
                        height: "180px",
                        overflow: "hidden",
                        borderRadius: "8px",
                      }}
                    >
                      <img
                        src={prod.imagen}
                        alt={prod.nombre}
                        className="w-100 h-100"
                        style={{ objectFit: "cover", borderRadius: "8px" }}
                      />
                    </div>
                    <div className="card-body bg-dark text-light d-flex flex-column h-100">
                      <h5 className="card-title">{prod.nombre}</h5>
                      <p className="fw-bold mb-2">
                        ${prod.precio.toLocaleString("es-CL")} CLP
                      </p>
                      <Link
                        to={`/detalle-producto?id=${prod.id}`}
                        className="btn btn-success w-100 mt-auto"
                      >
                        Ver detalle
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
};

export default DetalleProducto;
