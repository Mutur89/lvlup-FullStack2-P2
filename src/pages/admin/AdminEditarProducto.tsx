// src/pages/admin/AdminEditarProducto.tsx
import { useState, useEffect, FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  getProductById,
  updateProduct,
  Product,
} from "../../utils/productService";

const AdminEditarProducto = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get("id"); // Obtenemos el ID de la URL (?id=...)

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    categoria: "",
    precio: "",
    stock: "",
    imagen: "",
  });

  const [loading, setLoading] = useState(false); // Cargando al guardar
  const [initialLoading, setInitialLoading] = useState(true); // Cargando datos iniciales

  const categorias = [
    "Juegos de Mesa",
    "Consola",
    "Computador Gamer",
    "Silla Gamer",
    "Accesorios",
    "Ropa",
    "Mouse",
    "Mousepad",
  ];

  // 1. Cargar datos al entrar
  useEffect(() => {
    if (!id) {
      alert("No se especificó un ID de producto");
      navigate("/admin/productos/mostrar");
      return;
    }

    const cargarProducto = async () => {
      try {
        const producto = await getProductById(id);
        if (producto) {
          // Rellenamos el formulario con los datos existentes
          setFormData({
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            categoria: producto.categoria,
            precio: producto.precio.toString(),
            stock: producto.stock.toString(),
            imagen: producto.imagen,
          });
        } else {
          alert("Producto no encontrado");
          navigate("/admin/productos/mostrar");
        }
      } catch (error) {
        console.error("Error al cargar producto:", error);
        alert("Error al cargar los datos del producto");
      } finally {
        setInitialLoading(false);
      }
    };

    cargarProducto();
  }, [id, navigate]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;

    setLoading(true);

    try {
      // Preparamos el objeto actualizado
      const productoActualizado: Product = {
        id: id, // Mantenemos el mismo ID
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        categoria: formData.categoria,
        precio: Number(formData.precio),
        stock: Number(formData.stock),
        imagen: formData.imagen,
      };

      const exito = await updateProduct(productoActualizado);

      if (exito) {
        alert("¡Producto actualizado correctamente!");
        navigate("/admin/productos/mostrar");
      } else {
        throw new Error("Falló la actualización");
      }
    } catch (error) {
      console.error(error);
      alert("Error al actualizar el producto. Verifica tus permisos.");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <main id="main-admin" className="col px-0">
      {/* Submenu */}
      <aside
        style={{
          backgroundColor: "#f8f9fa",
          borderBottom: "2px solid #dee2e6",
          padding: "1rem 1.5rem",
          display: "flex",
        }}
      >
        <ul
          className="nav"
          style={{
            gap: "0.5rem",
            display: "flex",
            margin: 0,
            padding: 0,
            listStyle: "none",
          }}
        >
          <li>
            <Link
              to="/admin/productos/nuevo"
              style={{
                color: "#212529",
                fontWeight: "600",
                fontSize: "1rem",
                padding: "0.6rem 1.2rem",
                backgroundColor: "transparent",
                borderRadius: "6px",
                textDecoration: "none",
                display: "block",
                border: "1px solid transparent",
              }}
            >
              Nuevo Producto
            </Link>
          </li>
          <li>
            <Link
              to="/admin/productos/editar"
              style={{
                color: "#ffffff",
                fontWeight: "700",
                fontSize: "1rem",
                padding: "0.6rem 1.2rem",
                backgroundColor: "#0d6efd",
                borderRadius: "6px",
                textDecoration: "none",
                display: "block",
              }}
            >
              Editar Producto
            </Link>
          </li>
          <li>
            <Link
              to="/admin/productos/mostrar"
              style={{
                color: "#212529",
                fontWeight: "600",
                fontSize: "1rem",
                padding: "0.6rem 1.2rem",
                backgroundColor: "transparent",
                borderRadius: "6px",
                textDecoration: "none",
                display: "block",
                border: "1px solid transparent",
              }}
            >
              Mostrar Productos
            </Link>
          </li>
        </ul>
      </aside>

      <header className="admin-header p-4 bg-white border-bottom">
        <h3 className="fw-bold mb-0 text-dark">
          Editar Producto <span className="text-muted fs-5">#{id}</span>
        </h3>
      </header>

      <section
        className="admin-content d-flex justify-content-center align-items-center py-5"
        style={{ minHeight: "60vh" }}
      >
        <div
          className="card shadow-sm p-4"
          style={{ maxWidth: "600px", width: "100%", background: "#f8f9fa" }}
        >
          <h5 className="fw-bold mb-4">Modificar datos</h5>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                NOMBRE DEL PRODUCTO
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="descripcion" className="form-label">
                DESCRIPCIÓN
              </label>
              <textarea
                className="form-control"
                id="descripcion"
                rows={3}
                value={formData.descripcion}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="categoria" className="form-label">
                CATEGORÍA
              </label>
              <select
                className="form-select"
                id="categoria"
                value={formData.categoria}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione la categoría...</option>
                {categorias.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="precio" className="form-label">
                PRECIO
              </label>
              <input
                type="number"
                className="form-control"
                id="precio"
                value={formData.precio}
                onChange={handleChange}
                required
                min="0"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="stock" className="form-label">
                STOCK
              </label>
              <input
                type="number"
                className="form-control"
                id="stock"
                min="0"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="imagen" className="form-label">
                IMAGEN DEL PRODUCTO (URL)
              </label>
              <input
                type="url"
                className="form-control"
                id="imagen"
                value={formData.imagen}
                onChange={handleChange}
                required
              />
              {/* Previsualización pequeña de la imagen */}
              {formData.imagen && (
                <div className="mt-2 text-center">
                  <img
                    src={formData.imagen}
                    alt="Previsualización"
                    style={{
                      maxHeight: "100px",
                      borderRadius: "4px",
                      border: "1px solid #ddd",
                    }}
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                </div>
              )}
            </div>

            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary w-50"
                onClick={() => navigate("/admin/productos/mostrar")}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary w-50"
                disabled={loading}
              >
                {loading ? "Guardando..." : "GUARDAR CAMBIOS"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default AdminEditarProducto;
