// src/pages/admin/AdminUsuarios.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUsers, deleteUser, User } from "../../utils/userService"; // Import User type

const AdminUsuarios = () => {
  // Use the imported User type for better type safety
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [filtroRol, setFiltroRol] = useState<string>("");
  const [busqueda, setBusqueda] = useState<string>("");
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    // Make async
    setLoading(true);
    try {
      const usuariosData = await getUsers(); // Await the promise
      setUsuarios(usuariosData);
    } catch (e) {
      console.error("Error al cargar usuarios:", e);
      alert("Error al cargar la lista de usuarios");
    } finally {
      setLoading(false);
    }
  };

  const handleEliminarUsuario = async (usuario: User) => {
    // Make async
    if (!usuario.id) return; // Guard clause if ID is missing

    const confirmMsg = `¿Estás seguro de eliminar al usuario ${
      usuario.nombre || ""
    } ${usuario.apellidos || ""}?`;

    if (window.confirm(confirmMsg)) {
      try {
        const ok = await deleteUser(usuario.id); // Use ID, await result
        if (ok) {
          setUsuarios((prev) => prev.filter((u) => u.id !== usuario.id));
          alert("Usuario eliminado correctamente");
        } else {
          throw new Error("La operación falló");
        }
      } catch (error) {
        console.error(error);
        alert(
          "No se pudo eliminar el usuario. Verifica que no sea un administrador crítico."
        );
      }
    }
  };

  // Filtrar usuarios por rol y búsqueda
  const usuariosFiltrados = usuarios.filter((usuario) => {
    // Normalize strings for case-insensitive comparison
    const term = busqueda.toLowerCase();

    const cumpleFiltroRol =
      !filtroRol ||
      (usuario.rol && usuario.rol.toUpperCase() === filtroRol.toUpperCase());

    const cumpleBusqueda =
      !busqueda ||
      (usuario.nombre && usuario.nombre.toLowerCase().includes(term)) ||
      (usuario.apellidos && usuario.apellidos.toLowerCase().includes(term)) ||
      (usuario.apellido && usuario.apellido.toLowerCase().includes(term)) || // Check alias
      (usuario.correo && usuario.correo.toLowerCase().includes(term)) ||
      (usuario.rut && usuario.rut.toLowerCase().includes(term));

    return cumpleFiltroRol && cumpleBusqueda;
  });

  return (
    <main id="main-admin" className="col px-0" role="main">
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
              to="/admin/usuarios/nuevo"
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
              Nuevo Usuario
            </Link>
          </li>
          <li>
            <Link
              to="/admin/usuarios/editar"
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
              Editar Usuario
            </Link>
          </li>
          <li>
            <Link
              to="/admin/usuarios/mostrar"
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
              Mostrar Usuarios
            </Link>
          </li>
        </ul>
      </aside>

      <header className="admin-header d-flex justify-content-between align-items-center p-4 bg-white border-bottom">
        <h3 className="fw-bold mb-0 text-dark">Panel de Usuarios</h3>
        <i className="bi bi-person-badge fs-4 text-secondary"></i>
      </header>

      <section className="admin-content p-4">
        <article>
          <p className="lead">
            Gestiona los accesos y perfiles de los usuarios registrados.
          </p>

          {/* SECCIÓN DE FILTROS Y TABLA DE USUARIOS */}
          <div className="mt-4">
            {/* Filtros */}
            <div className="card mb-3 border-0 shadow-sm">
              <div className="card-body bg-light">
                <div className="row g-3">
                  <div className="col-md-4">
                    <label
                      htmlFor="filtroRol"
                      className="form-label fw-bold text-dark"
                    >
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
                      <option value="ADMIN">Administrador</option>
                      <option value="VENDEDOR">Vendedor</option>
                      <option value="CLIENTE">Cliente</option>
                    </select>
                  </div>
                  <div className="col-md-8">
                    <label
                      htmlFor="busqueda"
                      className="form-label fw-bold text-dark"
                    >
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
              className="card mt-2 border-0 shadow-sm"
              style={{
                minHeight: "350px",
                background: "#ffffff",
              }}
            >
              <div className="card-header bg-white py-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 fw-bold">
                    <i className="bi bi-people-fill me-2 text-primary"></i>
                    Lista de Usuarios
                  </h5>
                  <span className="badge bg-primary rounded-pill">
                    {usuariosFiltrados.length} usuario
                    {usuariosFiltrados.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
              <div className="card-body p-0" id="listado-usuarios">
                {loading ? (
                  <div className="text-center p-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Cargando...</span>
                    </div>
                  </div>
                ) : usuarios.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                    <i
                      className="bi bi-person-x"
                      style={{
                        fontSize: "3rem",
                        color: "#6c757d",
                        display: "block",
                        marginBottom: "1.5rem",
                      }}
                    ></i>
                    <p className="fw-bold fs-5 mb-2 text-dark">
                      No hay usuarios registrados
                    </p>
                    <p className="text-muted">
                      Los usuarios registrados en la tienda aparecerán aquí.
                    </p>
                  </div>
                ) : usuariosFiltrados.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                    <i
                      className="bi bi-search"
                      style={{
                        fontSize: "3rem",
                        color: "#ffc107",
                        display: "block",
                        marginBottom: "1.5rem",
                      }}
                    ></i>
                    <p className="fw-bold fs-5 mb-2 text-dark">
                      No se encontraron usuarios
                    </p>
                    <p className="text-muted">
                      Intenta ajustar los filtros de búsqueda.
                    </p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead className="bg-light">
                        <tr>
                          <th className="ps-4 fw-bold text-secondary">ID</th>
                          <th className="fw-bold text-secondary">
                            Nombre Completo
                          </th>
                          <th className="fw-bold text-secondary">Correo</th>
                          <th className="fw-bold text-secondary">RUT</th>
                          <th className="fw-bold text-secondary">Rol</th>
                          <th className="text-end pe-4 fw-bold text-secondary">
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {usuariosFiltrados.map((usuario) => (
                          <tr key={usuario.id}>
                            <td className="ps-4 text-muted small">
                              {usuario.id?.substring(0, 8)}...
                            </td>
                            <td className="fw-bold text-dark">
                              {usuario.nombre}{" "}
                              {usuario.apellido || usuario.apellidos}
                            </td>
                            <td className="text-primary">{usuario.correo}</td>
                            <td>
                              <span className="font-monospace bg-light px-2 py-1 rounded border">
                                {usuario.rut || "N/A"}
                              </span>
                            </td>
                            <td>
                              <span
                                className={`badge ${
                                  (usuario.rol || "")
                                    .toUpperCase()
                                    .includes("ADMIN")
                                    ? "bg-danger"
                                    : (usuario.rol || "")
                                        .toUpperCase()
                                        .includes("VENDEDOR")
                                    ? "bg-warning text-dark"
                                    : "bg-info text-dark"
                                }`}
                              >
                                {usuario.rol || "CLIENTE"}
                              </span>
                            </td>
                            <td className="text-end pe-4">
                              <div className="d-flex justify-content-end gap-2 flex-nowrap">
                                <Link
                                  to={`/admin/usuarios/editar?id=${usuario.id}`}
                                  className="btn btn-sm btn-outline-primary"
                                  title="Editar usuario"
                                  style={{ minWidth: '36px' }}
                                >
                                  <i className="bi bi-pencil"></i>
                                </Link>
                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => handleEliminarUsuario(usuario)}
                                  title="Eliminar usuario"
                                  style={{ minWidth: '36px' }}
                                >
                                  <i className="bi bi-trash"></i>
                                </button>
                              </div>
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
