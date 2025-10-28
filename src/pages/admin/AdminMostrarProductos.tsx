// src/pages/admin/AdminMostrarProductos.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "../../utils/productService";

const AdminMostrarProductos = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [productos, setProductos] = useState<any[]>([]);

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

  const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoria = e.target.value;
    setCategoriaSeleccionada(categoria);

    if (categoria) {
      const all = getProducts();
      const filtered = all.filter((p) => p.categoria === categoria);
      setProductos(filtered);
    } else {
      setProductos([]);
    }
  };

  useEffect(() => {
    // Inicialmente no mostramos nada hasta seleccionar categoría
  }, []);

  const handleEliminar = (id: string) => {
    if (!confirm("¿Eliminar producto? Esta acción no se puede deshacer."))
      return;
    const ok = deleteProduct(id);
    if (ok) {
      setProductos((prev) => prev.filter((p) => p.id !== id));
      alert("Producto eliminado");
    } else {
      alert("No se pudo eliminar el producto");
    }
  };

  return (
    <main id="main-admin" className="col px-0" role="main">
      {/* Submenu - INTEGRADO CON ESTILOS INLINE */}
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
              Editar Producto
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/productos/mostrar"
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
              Mostrar Productos
            </Link>
          </li>
        </ul>
      </aside>

      <header className="admin-header p-4 bg-white border-bottom">
        <h3 className="fw-bold mb-0 text-dark">Mostrar Productos</h3>
      </header>

      <section className="admin-content p-4">
        {/* Filtro de categoría */}
        <form className="mb-4">
          <div className="row align-items-center">
            <div className="col-md-4 mb-3 mb-md-0">
              <label 
                htmlFor="categoria" 
                className="form-label fw-bold"
                style={{
                  color: '#28a745',
                  fontSize: '1.1rem'
                }}
              >
                Escoger categoría
              </label>
              <select
                className="form-select"
                id="categoria"
                value={categoriaSeleccionada}
                onChange={handleCategoriaChange}
              >
                <option value="">Seleccione la categoría...</option>
                {categorias.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>

        {/* Card con listado de productos */}
        <article
          className="card mt-2"
          style={{ 
            minHeight: "350px", 
            background: "#ffffff",
            border: '1px solid #dee2e6'
          }}
        >
          <div className="card-body" id="listado-productos">
            {!categoriaSeleccionada ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <i 
                  className="bi bi-box-seam" 
                  style={{ 
                    fontSize: '3rem', 
                    color: '#0d6efd',
                    display: 'block',
                    marginBottom: '1.5rem'
                  }}
                ></i>
                <p style={{ 
                  color: '#000000',
                  fontWeight: '700',
                  fontSize: '1.25rem',
                  marginBottom: '0.75rem'
                }}>
                  Seleccione una categoría para ver los productos registrados.
                </p>
                <p style={{ 
                  color: '#6c757d',
                  fontSize: '1rem'
                }}>
                  Use el filtro de categoría para mostrar los productos disponibles.
                </p>
              </div>
            ) : productos.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <i 
                  className="bi bi-info-circle" 
                  style={{ 
                    fontSize: '3rem', 
                    color: '#ffc107',
                    display: 'block',
                    marginBottom: '1.5rem'
                  }}
                ></i>
                <p style={{ 
                  color: '#000000',
                  fontWeight: '700',
                  fontSize: '1.25rem',
                  marginBottom: '0.75rem'
                }}>
                  No hay productos en la categoría "{categoriaSeleccionada}"
                </p>
                <p style={{ 
                  color: '#6c757d',
                  fontSize: '1rem'
                }}>
                  Intenta con otra categoría o agrega productos a esta categoría.
                </p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead style={{ backgroundColor: '#f8f9fa' }}>
                    <tr>
                      <th style={{ color: '#212529', fontWeight: '600' }}>ID</th>
                      <th style={{ color: '#212529', fontWeight: '600' }}>Nombre</th>
                      <th style={{ color: '#212529', fontWeight: '600' }}>Precio</th>
                      <th style={{ color: '#212529', fontWeight: '600' }}>Stock</th>
                      <th style={{ color: '#212529', fontWeight: '600' }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos.map((producto) => (
                      <tr key={producto.id}>
                        <td style={{ color: '#6c757d' }}>{producto.id}</td>
                        <td style={{ color: '#212529', fontWeight: '500' }}>{producto.nombre}</td>
                        <td style={{ color: '#28a745', fontWeight: '700' }}>
                          ${producto.precio.toLocaleString("es-CL")}
                        </td>
                        <td>
                          <span 
                            className="badge"
                            style={{
                              backgroundColor: producto.stock < 5 ? '#dc3545' : '#28a745',
                              color: '#ffffff',
                              padding: '0.35rem 0.65rem'
                            }}
                          >
                            {producto.stock}
                          </span>
                        </td>
                        <td>
                          <Link
                            to={`/admin/productos/editar?id=${producto.id}`}
                            className="btn btn-sm btn-outline-primary me-2"
                          >
                            <i className="bi bi-pencil me-1"></i>
                            Editar
                          </Link>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleEliminar(producto.id)}
                          >
                            <i className="bi bi-trash me-1"></i>
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </article>
      </section>
    </main>
  );
};

export default AdminMostrarProductos;