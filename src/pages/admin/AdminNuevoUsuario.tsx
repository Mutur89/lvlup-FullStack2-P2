// src/pages/admin/AdminNuevoUsuario.tsx
import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../utils/userService";
import { comunasPorRegion } from "../../utils/comunas";
import "../../styles/admin-submenu.css"; // ← Importar CSS

const AdminNuevoUsuario = () => {
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

    // Validaciones básicas
    if (formData.contraseña.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    if (formData.contraseña !== formData.confirmar) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Normalizar y crear usuario
    const payload = {
      nombres: formData.nombres,
      apellidos: formData.apellidos,
      correo: formData.correo,
      rol: formData.rol,
      telefono: formData.telefono,
      region: formData.region,
      comuna: formData.comuna,
    };
    try {
      const created = createUser(payload);
      console.log("Usuario creado:", created);
      alert("Usuario registrado: " + (created.correo || created.id));
      navigate("/admin/usuarios/mostrar");
    } catch (err: any) {
      alert(err?.message || "Error al crear usuario");
    }
  };

  const navigate = useNavigate();

  return (
    <main className="col px-0">
      {/* Submenu */}
      <aside className="d-flex border-bottom bg-light py-3 px-3 admin-submenu">
        <ul className="nav" style={{ gap: '0.5rem' }}>
          <li className="nav-item">
            <Link className="nav-link active" to="/admin/usuarios/nuevo">
              Nuevo Usuario
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/usuarios/editar">
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
        <h3 className="fw-bold mb-0 text-dark">Nuevo Usuario</h3>
      </header>

      <section
        className="admin-content d-flex justify-content-center align-items-center py-5"
        style={{ minHeight: "60vh" }}
      >
        <div
          className="card shadow-sm p-4"
          style={{ maxWidth: "600px", width: "100%", background: "#f8f9fa" }}
        >
          <h5 className="fw-bold mb-4">Registro de usuario</h5>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nombres" className="form-label">
                NOMBRES
              </label>
              <input
                type="text"
                className="form-control"
                id="nombres"
                autoComplete="given-name"
                value={formData.nombres}
                onChange={handleChange}
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
                autoComplete="family-name"
                value={formData.apellidos}
                onChange={handleChange}
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
                required
              />
              <div className="form-text">Mínimo 8 caracteres.</div>
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
                required
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

            <button type="submit" className="btn btn-dark w-100 mt-2">
              REGISTRAR
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

export default AdminNuevoUsuario;