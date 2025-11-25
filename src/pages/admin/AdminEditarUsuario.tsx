// src/pages/admin/AdminEditarUsuario.tsx
import { useState, useEffect, FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getUserById, updateUser, User } from "../../utils/userService";

const AdminEditarUsuario = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get("id"); // Obtenemos ?id=123 de la URL

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    rut: "",
    correo: "",
    rol: "",
    telefono: "",
    direccion: "",
    region: "",
    comuna: "",
  });

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // 1. Cargar datos del usuario al entrar
  useEffect(() => {
    if (!id) {
      alert("No se especificó un ID de usuario");
      navigate("/admin/usuarios/mostrar");
      return;
    }

    const cargarDatos = async () => {
      try {
        const usuario = await getUserById(id);
        if (usuario) {
          setFormData({
            nombre: usuario.nombre || "",
            apellido: usuario.apellido || usuario.apellidos || "",
            rut: usuario.rut || "",
            correo: usuario.correo || "",
            rol: usuario.rol || "CLIENTE",
            telefono: usuario.telefono || "",
            direccion: usuario.direccion || "",
            region: usuario.region || "",
            comuna: usuario.comuna || "",
          });
        } else {
          alert("Usuario no encontrado");
          navigate("/admin/usuarios/mostrar");
        }
      } catch (error) {
        console.error("Error cargando usuario:", error);
        alert("Error al cargar los datos del usuario");
      } finally {
        setInitialLoading(false);
      }
    };

    cargarDatos();
  }, [id, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;
    setLoading(true);

    try {
      // Preparamos el objeto para actualizar
      // Nota: No enviamos contraseña aquí para no sobreescribirla (el backend la mantiene si viene null)
      const usuarioActualizado: Partial<User> & { id: string } = {
        id: id,
        nombre: formData.nombre,
        apellido: formData.apellido,
        rut: formData.rut,
        correo: formData.correo,
        rol: formData.rol,
        telefono: formData.telefono,
        direccion: formData.direccion,
        region: formData.region,
        comuna: formData.comuna,
      };

      const exito = await updateUser(usuarioActualizado);

      if (exito) {
        alert("¡Usuario actualizado correctamente!");
        navigate("/admin/usuarios/mostrar");
      } else {
        throw new Error("La API respondió con error");
      }
    } catch (error) {
      console.error(error);
      alert("Error al actualizar usuario. Revisa la consola.");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <main id="main-admin" className="col px-0">
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
              Editar Usuario
            </Link>
          </li>
          <li>
            <Link
              to="/admin/usuarios/mostrar"
              style={{
                color: "#212529",
                fontWeight: "600",
                fontSize: "1rem",
                padding: "0.6rem 1.2rem",
                backgroundColor: "transparent",
                borderRadius: "6px",
                textDecoration: "none",
                display: "block",
                transition: "all 0.2s",
                border: "1px solid transparent",
              }}
            >
              Mostrar Usuarios
            </Link>
          </li>
        </ul>
      </aside>

      <header className="admin-header p-4 bg-white border-bottom">
        <h3 className="fw-bold mb-0 text-dark">
          Editar Usuario <span className="text-muted fs-5">#{id}</span>
        </h3>
      </header>

      <section
        className="admin-content d-flex justify-content-center align-items-center py-5"
        style={{ minHeight: "60vh" }}
      >
        <div
          className="card shadow-sm p-4"
          style={{ maxWidth: "700px", width: "100%", background: "#f8f9fa" }}
        >
          <h5 className="fw-bold mb-4 text-primary">Modificar Datos</h5>

          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Columna Izquierda */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label fw-bold">
                    Nombre
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
                  <label htmlFor="apellido" className="form-label fw-bold">
                    Apellido
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="rut" className="form-label fw-bold">
                    RUT
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="rut"
                    value={formData.rut}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="telefono" className="form-label">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Columna Derecha */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="correo" className="form-label fw-bold">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="rol"
                    className="form-label fw-bold text-success"
                  >
                    Rol de Usuario
                  </label>
                  <select
                    className="form-select border-success"
                    id="rol"
                    value={formData.rol}
                    onChange={handleChange}
                  >
                    <option value="CLIENTE">CLIENTE</option>
                    <option value="VENDEDOR">VENDEDOR</option>
                    <option value="ADMIN">ADMINISTRADOR</option>
                  </select>
                  <div className="form-text">
                    Cuidado: Asignar rol ADMIN otorga acceso total.
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="region" className="form-label">
                    Región
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="region"
                    value={formData.region}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="comuna" className="form-label">
                    Comuna
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="comuna"
                    value={formData.comuna}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="direccion" className="form-label">
                Dirección
              </label>
              <input
                type="text"
                className="form-control"
                id="direccion"
                value={formData.direccion}
                onChange={handleChange}
              />
            </div>

            <div className="d-flex gap-2 mt-4">
              <button
                type="button"
                className="btn btn-outline-secondary w-50"
                onClick={() => navigate("/admin/usuarios/mostrar")}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary w-50 fw-bold"
                disabled={loading}
              >
                {loading ? "Guardando..." : "GUARDAR CAMBIOS"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default AdminEditarUsuario;
