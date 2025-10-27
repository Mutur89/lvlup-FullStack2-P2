// src/pages/admin/AdminProductos.tsx
import { Link } from 'react-router-dom';

const AdminProductos = () => {
  return (
    <main id="main-admin" className="col px-0" role="main">
      <header className="admin-header d-flex justify-content-between align-items-center p-4 bg-white border-bottom">
        <h3 className="fw-bold mb-0 text-dark">Panel de Productos</h3>
        <i className="bi bi-box-seam fs-4 text-secondary"></i>
      </header>

      <section className="admin-content p-4">
        <article>
          <p className="lead">Selecciona una opción del menú para gestionar los productos.</p>
          
          <div className="d-flex gap-2 mt-4">
            <Link to="/admin/productos/nuevo" className="btn btn-primary">
              <i className="bi bi-plus-circle me-2"></i>
              Nuevo Producto
            </Link>
            <Link to="/admin/productos/editar" className="btn btn-outline-primary">
              <i className="bi bi-pencil me-2"></i>
              Editar Producto
            </Link>
          </div>

          {/* Tu compañero agregará aquí la tabla de productos */}
          <div className="mt-4 p-4 bg-light rounded">
            <p className="text-muted mb-0">
              <i className="bi bi-info-circle me-2"></i>
              La tabla de productos se mostrará aquí (funcionalidad pendiente)
            </p>
          </div>
        </article>
      </section>
    </main>
  );
};

export default AdminProductos;