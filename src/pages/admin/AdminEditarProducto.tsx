// src/pages/admin/AdminEditarProducto.tsx
import { useState, FormEvent, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../../utils/productService";

const AdminEditarProducto = () => {
  const navigate = useNavigate(); 
  const [buscarId, setBuscarId] = useState("");
  const [productoEncontrado, setProductoEncontrado] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    categoria: "",
    precio: "",
    stock: "",
    imagen: "",
  });

  const categorias = [
    { value: "Juegos de Mesa", label: "Juegos de Mesa" },
    { value: "Consola", label: "Consola" },
    { value: "Computador Gamer", label: "Computador Gamer" },
    { value: "Silla Gamer", label: "Silla Gamer" },
    { value: "Accesorios", label: "Accesorios" },
    { value: "Ropa", label: "Ropa" },
    { value: "Mouse", label: "Mouse" },
    { value: "Mousepad", label: "Mousepad" },
  ];

  const handleBuscar = () => {
    console.log("Buscando producto con ID:", buscarId);
    if (!buscarId) {
      alert("Por favor ingresa un ID");
      return;
    }
    const p = getProductById(buscarId);
    if (p) {
      setProductoEncontrado(true);
      setFormData({
        id: p.id,
        nombre: p.nombre,
        descripcion: p.descripcion,
        categoria: p.categoria,
        precio: String(p.precio),
        stock: String(p.stock),
        imagen: p.imagen,
      });
      alert("Producto encontrado");
    } else {
      alert("Producto no encontrado");
    }
  };

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setBuscarId(id);
      const p = getProductById(id);
      if (p) {
        setProductoEncontrado(true);
        setFormData({
          id: p.id,
          nombre: p.nombre,
          descripcion: p.descripcion,
          categoria: p.categoria,
          precio: String(p.precio),
          stock: String(p.stock),
          imagen: p.imagen,
        });
      }
    }
  }, [searchParams]);

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
    const updated = {
      id: formData.id,
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      categoria: formData.categoria,
      precio: Number(formData.precio),
      stock: Number(formData.stock),
      imagen: formData.imagen,
    };
    const ok = updateProduct(updated as any);
    if (ok) {
      alert("Producto actualizado");
    
      navigate("/admin/productos/mostrar");
    } else {
      alert("No se pudo actualizar el producto");
    }
  };

  return (
    <main id="main-admin" className="col px-0">
      {/* Submenu - CON ESTILOS LEGIBLES */}
      <aside 
        style={{
          backgroundColor: '#f8f9fa',
          borderBottom: '2px solid #dee2e6',
          padding: '1rem 1.5rem',
          display: 'flex'
        }}
      >
        <ul className="nav" style={{ gap: '0.5rem', display: 'flex', margin: 0, padding: 0, listStyle: 'none' }}>
          <li>
            <Link 
              to="/admin/productos/nuevo"
              style={{
                color: '#212529',
                fontWeight: '600',
                fontSize: '1rem',
                padding: '0.6rem 1.2rem',
                backgroundColor: 'transparent',
                borderRadius: '6px',
                textDecoration: 'none',
                display: 'block',
                transition: 'all 0.2s',
                border: '1px solid transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e9ecef';
                e.currentTarget.style.borderColor = '#dee2e6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              Nuevo Producto
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/productos/editar"
              style={{
                color: '#ffffff',
                fontWeight: '700',
                fontSize: '1rem',
                padding: '0.6rem 1.2rem',
                backgroundColor: '#0d6efd',
                borderRadius: '6px',
                textDecoration: 'none',
                display: 'block'
              }}
            >
              Editar Producto
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/productos/mostrar"
              style={{
                color: '#212529',
                fontWeight: '600',
                fontSize: '1rem',
                padding: '0.6rem 1.2rem',
                backgroundColor: 'transparent',
                borderRadius: '6px',
                textDecoration: 'none',
                display: 'block',
                transition: 'all 0.2s',
                border: '1px solid transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e9ecef';
                e.currentTarget.style.borderColor = '#dee2e6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              Mostrar Productos
            </Link>
          </li>
        </ul>
      </aside>

      <header className="admin-header p-4 bg-white border-bottom">
        <h3 className="fw-bold mb-0 text-dark">Editor de Producto</h3>
      </header>

      <section
        className="admin-content d-flex justify-content-center align-items-center py-5"
        style={{ minHeight: "60vh" }}
      >
        <div
          className="card shadow-sm p-4"
          style={{ maxWidth: "600px", width: "100%", background: "#f8f9fa" }}
        >
          <h5 className="fw-bold mb-4">Editor de producto</h5>

          <form onSubmit={handleSubmit}>
            {/* Campo de búsqueda por ID */}
            <div className="mb-3">
              <label htmlFor="idProducto" className="form-label">
                ID DEL PRODUCTO
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="idProducto"
                  placeholder="Ingresa el ID para buscar"
                  value={buscarId}
                  onChange={(e) => setBuscarId(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleBuscar}
                >
                  Buscar
                </button>
              </div>
            </div>

            {/* Campos del formulario (deshabilitados hasta buscar) */}
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
                disabled={!productoEncontrado}
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
                disabled={!productoEncontrado}
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
                disabled={!productoEncontrado}
                required
              >
                <option value="">Seleccione la categoría...</option>
                {categorias.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
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
                disabled={!productoEncontrado}
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
                disabled={!productoEncontrado}
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
                disabled={!productoEncontrado}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-dark w-100 mt-2"
              disabled={!productoEncontrado}
            >
              Actualizar Producto
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default AdminEditarProducto;