// src/pages/admin/AdminMostrarProductos.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminMostrarProductos = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [productos, setProductos] = useState<any[]>([]);

  const categorias = [
    'Juegos de Mesa',
    'Consolas',
    'Computadores Gamer',
    'Sillas Gamer',
    'Accesorios',
    'Ropa',
    'Mouse',
    'Mousepads'
  ];

  const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoria = e.target.value;
    setCategoriaSeleccionada(categoria);
    
    // Tu compañero agregará la lógica para filtrar productos por categoría
    if (categoria) {
      console.log('Filtrando productos por categoría:', categoria);
      // Aquí debería cargar los productos filtrados
      setProductos([]);
    }
  };

  return (
    <main id="main-admin" className="col px-0" role="main">
      {/* Submenu */}
      <aside className="d-flex border-bottom bg-light py-3 px-3">
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link" to="/admin/productos/nuevo">
              Nuevo Producto
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/productos/editar">
              Editar Producto
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/admin/productos/mostrar">
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
              <label htmlFor="categoria" className="form-label fw-bold">
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
          style={{ minHeight: '350px', background: '#f8f9fa' }}
        >
          <div className="card-body" id="listado-productos">
            {!categoriaSeleccionada ? (
              <p className="text-muted">
                Seleccione una categoría para ver los productos registrados.
              </p>
            ) : productos.length === 0 ? (
              <div>
                <p className="text-muted mb-3">
                  <i className="bi bi-info-circle me-2"></i>
                  No hay productos en la categoría "{categoriaSeleccionada}"
                </p>
                <p className="text-muted small">
                  (Tu compañero agregará la tabla de productos aquí)
                </p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th>Stock</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos.map((producto) => (
                      <tr key={producto.id}>
                        <td>{producto.id}</td>
                        <td>{producto.nombre}</td>
                        <td>${producto.precio.toLocaleString('es-CL')}</td>
                        <td>{producto.stock}</td>
                        <td>
                          <Link
                            to={`/admin/productos/editar?id=${producto.id}`}
                            className="btn btn-sm btn-outline-primary me-2"
                          >
                            Editar
                          </Link>
                          <button className="btn btn-sm btn-outline-danger">
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