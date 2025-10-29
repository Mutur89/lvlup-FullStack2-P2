// src/pages/admin/AdminEditarUsuario.tsx
import { useState, FormEvent, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getUserByCorreo, updateUser } from "../../utils/userService";
import { comunasPorRegion } from "../../utils/comunas";
import "../../styles/admin-submenu.css";

const AdminEditarUsuario = () => {
  const [buscarCorreo, setBuscarCorreo] = useState("");
  const [usuarioEncontrado, setUsuarioEncontrado] = useState(false);
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    rol: "",
    contraseña: "",
    confirmar: "",
    telefono: "",
    region: "",
    comuna: "",
  });

  const handleBuscar = () => {
    console.log("Buscando usuario:", buscarCorreo);
    if (!buscarCorreo) {
      alert("Por favor ingresa un correo");
      return;
    }
    const u = getUserByCorreo(buscarCorreo);
    if (u) {
      setUsuarioEncontrado(true);
      setFormData({
        nombres: u.nombre || u.nombres || "",
        apellidos: u.apellidos || "",
        correo: u.correo || "",
        rol: u.rol || "",
        contraseña: "",
        confirmar: "",
        telefono: u.telefono || "",
        region: u.region || "",
        comuna: u.comuna || "",
      });
      alert("Usuario encontrado");
    } else {
      alert("Usuario no encontrado");
    }
  };

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const correo = searchParams.get("correo");
    if (correo) {
      setBuscarCorreo(correo);
      const u = getUserByCorreo(correo);
      if (u) {
        setUsuarioEncontrado(true);
        setFormData({
          nombres: u.nombre || u.nombres || "",
          apellidos: u.apellidos || "",
          correo: u.correo || "",
          rol: u.rol || "",
          contraseña: "",
          confirmar: "",
          telefono: u.telefono || "",
          region: u.region || "",
          comuna: u.comuna || "",
        });
      }
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.contraseña && formData.contraseña.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    if (formData.contraseña !== formData.confirmar) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const payload = {
      nombres: formData.nombres,
      apellidos: formData.apellidos,
      correo: formData.correo,
      rol: formData.rol,
      telefono: formData.telefono,
      region: formData.region,
      comuna: formData.comuna,
    } as any;

    const existing = getUserByCorreo(formData.correo);
    if (!existing) {
      alert("Usuario no encontrado para actualizar");
      return;
    }
    const ok = updateUser({
      ...payload,
      id: existing.id,
      correo: formData.correo,
    });
    if (ok) alert("Usuario actualizado");
    else {
      const conflict = getUserByCorreo(formData.correo);
      if (conflict && conflict.id !== existing.id) {
        alert("El correo ya está en uso por otro usuario");
      } else {
        alert("No se pudo actualizar el usuario");
      }
    }
  };

  return (
    <main className="col px-0">
      {/* Submenu */}
      <aside className="d-flex border-bottom bg-light py-3 px-3 admin-submenu">
        <ul className="nav" style={{ gap: '0.5rem' }}>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/usuarios/nuevo">
              Nuevo Usuario
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/admin/usuarios/editar">
              Editar Usuario
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/usuarios">
              Mostrar Usuarios
            </Link>
          </li>
        </ul>
      </aside>

      <header className="admin-header p-4 bg-white border-bottom">
        <h3 className="fw-bold mb-0 text-dark">Editar Usuario</h3>
      </header>

      <section
        className="admin-content d-flex justify-content-center align-items-center py-5"
        style={{ minHeight: "60vh" }}
      >
        <div
          className="card shadow-sm p-4"
          style={{ maxWidth: "600px", width: "100%", background: "#f8f9fa" }}
        >
          <h5 className="fw-bold mb-4">Editor de usuario</h5>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="buscarCorreo" className="form-label">
                CORREO
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="buscarCorreo"
                  placeholder="Ingresa el correo"
                  value={buscarCorreo}
                  onChange={(e) => setBuscarCorreo(e.target.value)}
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

            <div className="mb-3">
              <label htmlFor="nombres" className="form-label">
                NOMBRE
              </label>
              <input
                type="text"
                className="form-control"
                id="nombres"
                value={formData.nombres}
                onChange={handleChange}
                disabled={!usuarioEncontrado}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="apellidos" className="form-label">
                APELLIDOS
              </label>
              <input
                type="text"
                className="form-control"
                id="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                disabled={!usuarioEncontrado}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="correo" className="form-label">
                CORREO
              </label>
              <input
                type="email"
                className="form-control"
                id="correo"
                autoComplete="email"
                value={formData.correo}
                onChange={handleChange}
                disabled={!usuarioEncontrado}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="rol" className="form-label">
                ROL
              </label>
              <select
                className="form-select"
                id="rol"
                value={formData.rol}
                onChange={handleChange}
                disabled={!usuarioEncontrado}
                required
              >
                <option value="">Seleccione un rol</option>
                <option value="admin">Administrador</option>
                <option value="vendedor">Vendedor</option>
                <option value="visualizador">Visualizador</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="contraseña" className="form-label">
                CONTRASEÑA
              </label>
              <input
                type="password"
                className="form-control"
                id="contraseña"
                autoComplete="new-password"
                value={formData.contraseña}
                onChange={handleChange}
                disabled={!usuarioEncontrado}
              />
              <div className="form-text">
                Mínimo 8 caracteres. Déjalo vacío si no deseas cambiarla.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="confirmar" className="form-label">
                CONFIRMAR CONTRASEÑA
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmar"
                autoComplete="new-password"
                value={formData.confirmar}
                onChange={handleChange}
                disabled={!usuarioEncontrado}
              />
              <div className="form-text">Repite la contraseña.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="telefono" className="form-label">
                TELÉFONO (opcional)
              </label>
              <input
                type="tel"
                className="form-control"
                id="telefono"
                value={formData.telefono}
                onChange={handleChange}
                disabled={!usuarioEncontrado}
              />
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="region" className="form-label">
                  Región
                </label>
                <select
                  className="form-select"
                  id="region"
                  value={formData.region}
                  onChange={handleChange}
                  disabled={!usuarioEncontrado}
                  required
                >
                  <option value="">Seleccione la región...</option>
                  {Object.keys(comunasPorRegion).map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label htmlFor="comuna" className="form-label">
                  Comuna
                </label>
                <select
                  className="form-select"
                  id="comuna"
                  value={formData.comuna}
                  onChange={handleChange}
                  disabled={!usuarioEncontrado}
                  required
                >
                  <option value="">Seleccione la comuna...</option>
                  {(comunasPorRegion[formData.region] || []).map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-dark w-100 mt-2"
              disabled={!usuarioEncontrado}
            >
              ACTUALIZAR USUARIO
            </button>

            <div
              className="validation-errors text-danger mt-2"
              aria-live="polite"
            ></div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default AdminEditarUsuario;