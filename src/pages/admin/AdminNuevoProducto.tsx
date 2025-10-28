// src/pages/admin/AdminNuevoProducto.tsx
import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createProduct } from "../../utils/productService";

const AdminNuevoProducto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    categoria: "",
    precio: "",
    stock: "",
    imagen: "",
  });
  const navigate = useNavigate();

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Convertir campos a tipos correctos
    const payload = {
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      categoria: formData.categoria,
      precio: Number(formData.precio),
      stock: Number(formData.stock),
      imagen: formData.imagen,
    };

    const created = createProduct(payload as any);
    console.log("Producto creado:", created);
    alert(`Producto creado con ID ${created.id}`);
    navigate("/admin/productos/mostrar");
  };

  return (
    <main className="col px-0">
      {/* Submenu */}
      <aside className="d-flex border-bottom bg-light py-3 px-3">
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link active" to="/admin/productos/nuevo">
              Nuevo Producto
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/productos/editar">
              Editar Producto
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/productos">
              Mostrar Productos
            </Link>
          </li>
        </ul>
      </aside>

      <header className="admin-header p-4 bg-white border-bottom">
        <h3 className="fw-bold mb-0 text-dark">Nuevo Producto</h3>
      </header>

      <section
        className="admin-content d-flex justify-content-center align-items-center py-5"
        style={{ minHeight: "60vh" }}
      >
        <div
          className="card shadow-sm p-4"
          style={{ maxWidth: "600px", width: "100%", background: "#f8f9fa" }}
        >
          <h5 className="fw-bold mb-4">Registro de producto</h5>

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
                type="text"
                className="form-control"
                id="precio"
                value={formData.precio}
                onChange={handleChange}
                placeholder="Ej: 29990"
                required
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
                placeholder="https://ejemplo.com/imagen.jpg"
                required
              />
            </div>

            <button type="submit" className="btn btn-dark w-100 mt-2">
              REGISTRAR PRODUCTO
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default AdminNuevoProducto;
