// src/pages/admin/AdminMostrarUsuarios.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUsers, deleteUser, User } from "../../utils/userService";
// Asegúrate de que el archivo CSS exista, o borra esta línea
import "../../styles/admin-submenu.css";

const AdminMostrarUsuarios = () => {
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsuarios(data);
    } catch (e) {
      console.error("Error al cargar usuarios:", e);
      alert("No se pudieron cargar los usuarios");
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (usuario: User) => {
    if (!usuario.id) return;

    if (
      window.confirm(`¿Estás seguro de eliminar al usuario ${usuario.nombre}?`)
    ) {
      try {
        const exito = await deleteUser(usuario.id);
        if (exito) {
          // Actualizar estado local
          setUsuarios((prev) => prev.filter((u) => u.id !== usuario.id));
          alert("Usuario eliminado correctamente");
        } else {
          throw new Error("Falló la eliminación");
        }
      } catch (error) {
        console.error(error);
        alert("Error al eliminar. Verifica que no sea el último Admin.");
      }
    }
  };

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

      <header className="admin-header p-4 bg-white border-bottom">
        <h3 className="fw-bold mb-0 text-dark">Gestión de Usuarios</h3>
      </header>

      <section className="admin-content p-4">
        <article
          className="card border-0 shadow-sm"
          style={{ minHeight: "350px", background: "#fff" }}
        >
          <div className="card-body p-0">
            {loading ? (
              <div className="text-center p-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
              </div>
            ) : usuarios.length === 0 ? (
              <div className="text-center p-5 text-muted">
                <i className="bi bi-people display-4 mb-3 d-block"></i>
                No hay usuarios registrados.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover mb-0 align-middle">
                  <thead className="bg-light">
                    <tr>
                      <th className="ps-4">ID</th>
                      <th>Nombre</th>
                      <th>Apellidos</th>
                      <th>Correo</th>
                      <th>RUT</th>
                      <th>Rol</th>
                      <th className="text-end pe-4">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map((u) => (
                      <tr key={u.id}>
                        <td className="ps-4 text-muted">#{u.id}</td>
                        <td className="fw-bold">{u.nombre}</td>
                        <td>{u.apellido || u.apellidos || "-"}</td>
                        <td>{u.correo}</td>
                        <td>
                          <span className="font-monospace">{u.rut}</span>
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              (u.rol || "").toUpperCase().includes("ADMIN")
                                ? "bg-danger"
                                : (u.rol || "")
                                    .toUpperCase()
                                    .includes("VENDEDOR")
                                ? "bg-warning text-dark"
                                : "bg-info text-dark"
                            }`}
                          >
                            {u.rol || "CLIENTE"}
                          </span>
                        </td>
                        <td className="text-end pe-4">
                          {/* Editamos usando ID, no correo, es más seguro */}
                          <Link
                            to={`/admin/usuarios/editar?id=${u.id}`}
                            className="btn btn-sm btn-outline-primary me-2"
                          >
                            <i className="bi bi-pencil"></i>
                          </Link>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleEliminar(u)}
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
