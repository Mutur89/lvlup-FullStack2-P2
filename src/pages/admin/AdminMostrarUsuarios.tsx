// src/pages/admin/AdminMostrarUsuarios.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Usuario {
  id?: string;
  nombre?: string;
  apellidos?: string;
  correo?: string;
  rut?: string;
  region?: string;
  comuna?: string;
  direccion?: string;
  telefono?: string;
  rol?: string;
}

const AdminMostrarUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    // Tu compañero agregará la lógica para cargar usuarios desde localStorage
    // usando initListadoUsuarios de listadoUsuarios.ts
    cargarUsuarios();
  }, []);

  const cargarUsuarios = () => {
    try {
      const usuariosLS = localStorage.getItem('usuarios');
      if (usuariosLS) {
        const usuariosData = JSON.parse(usuariosLS);
        setUsuarios(usuariosData);
      }
    } catch (e) {
      console.error('Error al cargar usuarios:', e);
    }
  };

  return (
    <main id="main-admin" className="col px-0" role="main">
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
            <Link className="nav-link active" to="/admin/usuarios/mostrar">
              Mostrar Usuarios
            </Link>
          </li>
        </ul>
      </aside>

      <header className="admin-header p-4 bg-white border-bottom">
        <h3 className="fw-bold mb-0 text-dark">Mostrar Usuarios</h3>
      </header>

      <section className="admin-content p-4">
        {/* Card con listado de usuarios */}
        <article
          className="card mt-2"
          style={{ minHeight: '350px', background: '#f8f9fa' }}
        >
          <div className="card-body" id="listado-usuarios">
            {usuarios.length === 0 ? (
              <div>
                <p className="text-muted mb-3">
                  Aquí aparecerán los usuarios registrados en la tienda.
                </p>
                <p className="text-muted small">
                  <i className="bi bi-info-circle me-2"></i>
                  No hay usuarios registrados o la funcionalidad está pendiente.
                </p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Apellidos</th>
                      <th>Correo</th>
                      <th>RUN</th>
                      <th>Región</th>
                      <th>Comuna</th>
                      <th>Dirección</th>
                      <th>Teléfono</th>
                      <th>Rol</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map((usuario) => (
                      <tr key={usuario.id || usuario.correo}>
                        <td>{usuario.id || '-'}</td>
                        <td>{usuario.nombre || '-'}</td>
                        <td>{usuario.apellidos || '-'}</td>
                        <td>{usuario.correo || '-'}</td>
                        <td>{usuario.rut || '-'}</td>
                        <td>{usuario.region || '-'}</td>
                        <td>{usuario.comuna || '-'}</td>
                        <td>{usuario.direccion || '-'}</td>
                        <td>{usuario.telefono || '-'}</td>
                        <td>
                          <span
                            className={`badge ${
                              usuario.rol === 'admin'
                                ? 'bg-danger'
                                : usuario.rol === 'vendedor'
                                ? 'bg-warning'
                                : 'bg-secondary'
                            }`}
                          >
                            {usuario.rol || 'Cliente'}
                          </span>
                        </td>
                        <td>
                          <Link
                            to={`/admin/usuarios/editar?correo=${usuario.correo}`}
                            className="btn btn-sm btn-outline-primary me-2"
                          >
                            <i className="bi bi-pencil"></i>
                          </Link>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => {
                              if (
                                window.confirm(
                                  `¿Eliminar usuario ${usuario.nombre}?`
                                )
                              ) {
                                // Tu compañero agregará la lógica de eliminación
                                console.log('Eliminar usuario:', usuario.id);
                              }
                            }}
                          >
                            <i className="bi bi-trash"></i>
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

export default AdminMostrarUsuarios;