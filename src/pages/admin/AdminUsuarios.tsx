// src/pages/admin/AdminUsuarios.tsx
import { Link } from 'react-router-dom';

const AdminUsuarios = () => {
  return (
    <main id="main-admin" className="col px-0" role="main">
      <header className="admin-header d-flex justify-content-between align-items-center p-4 bg-white border-bottom">
        <h3 className="fw-bold mb-0 text-dark">Panel de Usuarios</h3>
        <i className="bi bi-person-badge fs-4 text-secondary"></i>
      </header>

      {/* Submenu */}
      <aside className="d-flex border-bottom bg-light py-3 px-3">
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link" to="/admin/usuarios/nuevo">
              Nuevo Usuario
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/usuarios/editar">
              Editar Usuario
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/admin/usuarios">
              Mostrar Usuarios
            </Link>
          </li>
        </ul>
      </aside>

      <section className="admin-content p-4">
        <article>
          <p className="lead">Selecciona una opción del menú para gestionar los usuarios.</p>
          
          <div className="d-flex gap-2 mt-4">
            <Link to="/admin/usuarios/nuevo" className="btn btn-primary">
              <i className="bi bi-person-plus me-2"></i>
              Nuevo Usuario
            </Link>
            <Link to="/admin/usuarios/editar" className="btn btn-outline-primary">
              <i className="bi bi-pencil me-2"></i>
              Editar Usuario
            </Link>
          </div>

          {/* Tu compañero agregará aquí la tabla de usuarios */}
          <div className="mt-4 p-4 bg-light rounded">
            <p className="text-muted mb-0">
              <i className="bi bi-info-circle me-2"></i>
              La tabla de usuarios se mostrará aquí (funcionalidad pendiente)
            </p>
          </div>
        </article>
      </section>
    </main>
  );
};

export default AdminUsuarios;