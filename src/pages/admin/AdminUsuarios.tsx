// src/pages/admin/AdminUsuarios.tsx
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { getUsers, deleteUser } from "../../utils/userService";

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

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [filtroRol, setFiltroRol] = useState<string>("");
  const [busqueda, setBusqueda] = useState<string>("");

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = () => {
    try {
      const usuariosData = getUsers();
      setUsuarios(usuariosData);
    } catch (e) {
      console.error("Error al cargar usuarios:", e);
    }
  };

  const handleEliminarUsuario = (usuario: Usuario) => {
    if (window.confirm(`¿Estás seguro de eliminar al usuario ${usuario.nombre} ${usuario.apellidos}?`)) {
      const ok = deleteUser(usuario.id || usuario.correo || "");
      if (ok) {
        setUsuarios((prev) => prev.filter((u) => u !== usuario));
        alert("Usuario eliminado correctamente");
      } else {
        alert("No se pudo eliminar el usuario");
      }
    }
  };

  // Filtrar usuarios por rol y búsqueda
  const usuariosFiltrados = usuarios.filter((usuario) => {
    const cumpleFiltroRol = !filtroRol || usuario.rol === filtroRol;
    const cumpleBusqueda = !busqueda || 
      usuario.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      usuario.apellidos?.toLowerCase().includes(busqueda.toLowerCase()) ||
      usuario.correo?.toLowerCase().includes(busqueda.toLowerCase()) ||
      usuario.rut?.toLowerCase().includes(busqueda.toLowerCase());
    
    return cumpleFiltroRol && cumpleBusqueda;
  });

  return (
    <main id="main-admin" className="col px-0" role="main">
      <header className="admin-header d-flex justify-content-between align-items-center p-4 bg-white border-bottom">
        <h3 className="fw-bold mb-0 text-dark">Panel de Usuarios</h3>
        <i className="bi bi-person-badge fs-4 text-secondary"></i>
      </header>

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

          {/* SECCIÓN DE FILTROS Y TABLA DE USUARIOS */}
          <div className="mt-4">
            {/* Filtros */}
            <div className="card mb-3">
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-4">
                    <label htmlFor="filtroRol" className="form-label fw-bold">
                      <i className="bi bi-funnel me-2"></i>
                      Filtrar por Rol
                    </label>
                    <select
                      id="filtroRol"
                      className="form-select"
                      value={filtroRol}
                      onChange={(e) => setFiltroRol(e.target.value)}
                    >
                      <option value="">Todos los roles</option>
                      <option value="admin">Administrador</option>
                      <option value="vendedor">Vendedor</option>
                      <option value="cliente">Cliente</option>
                    </select>
                  </div>
                  <div className="col-md-8">
                    <label htmlFor="busqueda" className="form-label fw-bold">
                      <i className="bi bi-search me-2"></i>
                      Buscar Usuario
                    </label>
                    <input
                      type="text"
                      id="busqueda"
                      className="form-control"
                      placeholder="Buscar por nombre, correo o RUT..."
                      value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Card con listado de usuarios */}
            <article
              className="card mt-2"
              style={{ 
                minHeight: "350px", 
                background: "#ffffff",
                border: '1px solid #dee2e6'
              }}
            >
              <div className="card-header bg-light">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <i className="bi bi-people-fill me-2 text-primary"></i>
                    Lista de Usuarios
                  </h5>
                  <span className="badge bg-primary">
                    {usuariosFiltrados.length} usuario{usuariosFiltrados.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
              <div className="card-body" id="listado-usuarios">
                {usuarios.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                    <i 
                      className="bi bi-person-x" 
                      style={{ 
                        fontSize: '3rem', 
                        color: '#6c757d',
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
                      No hay usuarios registrados
                    </p>
                    <p style={{ 
                      color: '#6c757d',
                      fontSize: '1rem'
                    }}>
                      Los usuarios registrados en la tienda aparecerán aquí.
                    </p>
                  </div>
                ) : usuariosFiltrados.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                    <i 
                      className="bi bi-search" 
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
                      No se encontraron usuarios
                    </p>
                    <p style={{ 
                      color: '#6c757d',
                      fontSize: '1rem'
                    }}>
                      Intenta ajustar los filtros de búsqueda.
                    </p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead style={{ backgroundColor: '#f8f9fa' }}>
                        <tr>
                          <th style={{ color: '#212529', fontWeight: '600' }}>ID</th>
                          <th style={{ color: '#212529', fontWeight: '600' }}>Nombre Completo</th>
                          <th style={{ color: '#212529', fontWeight: '600' }}>Correo</th>
                          <th style={{ color: '#212529', fontWeight: '600' }}>RUT</th>
                          <th style={{ color: '#212529', fontWeight: '600' }}>Teléfono</th>
                          <th style={{ color: '#212529', fontWeight: '600' }}>Región</th>
                          <th style={{ color: '#212529', fontWeight: '600' }}>Comuna</th>
                          <th style={{ color: '#212529', fontWeight: '600' }}>Rol</th>
                          <th style={{ color: '#212529', fontWeight: '600', textAlign: 'center' }}>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {usuariosFiltrados.map((usuario) => (
                          <tr key={usuario.id || usuario.correo}>
                            <td style={{ color: '#6c757d', fontSize: '0.875rem' }}>
                              {usuario.id?.substring(0, 8) || "-"}
                            </td>
                            <td style={{ color: '#212529', fontWeight: '500' }}>
                              {usuario.nombre} {usuario.apellidos}
                            </td>
                            <td style={{ color: '#0d6efd' }}>
                              <i className="bi bi-envelope me-1"></i>
                              {usuario.correo || "-"}
                            </td>
                            <td style={{ color: '#212529' }}>
                              {usuario.rut || "-"}
                            </td>
                            <td style={{ color: '#212529' }}>
                              <i className="bi bi-telephone me-1"></i>
                              {usuario.telefono || "-"}
                            </td>
                            <td style={{ color: '#6c757d', fontSize: '0.875rem' }}>
                              {usuario.region || "-"}
                            </td>
                            <td style={{ color: '#6c757d', fontSize: '0.875rem' }}>
                              {usuario.comuna || "-"}
                            </td>
                            <td>
                              <span
                                className="badge"
                                style={{
                                  backgroundColor: 
                                    usuario.rol === "admin" ? '#dc3545' :
                                    usuario.rol === "vendedor" ? '#ffc107' :
                                    '#6c757d',
                                  color: usuario.rol === "vendedor" ? '#000' : '#ffffff',
                                  padding: '0.35rem 0.65rem',
                                  textTransform: 'capitalize'
                                }}
                              >
                                <i className={`bi ${
                                  usuario.rol === "admin" ? 'bi-shield-fill-check' :
                                  usuario.rol === "vendedor" ? 'bi-shop' :
                                  'bi-person-fill'
                                } me-1`}></i>
                                {usuario.rol || "Cliente"}
                              </span>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <Link
                                to={`/admin/usuarios/editar?correo=${usuario.correo}`}
                                className="btn btn-sm btn-outline-primary me-2"
                                title="Editar usuario"
                              >
                                <i className="bi bi-pencil"></i>
                              </Link>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleEliminarUsuario(usuario)}
                                title="Eliminar usuario"
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
          </div>
        </article>
      </section>
    </main>
  );
};

export default AdminUsuarios;