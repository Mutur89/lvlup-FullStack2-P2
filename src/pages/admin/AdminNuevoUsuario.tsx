// src/pages/admin/AdminNuevoUsuario.tsx
import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../utils/userService";

const AdminNuevoUsuario = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    rut: "",
    correo: "",
    contrasena: "",
    rol: "CLIENTE",
    telefono: "",
    direccion: "",
    region: "",
    comuna: "",
    fechaNacimiento: "", // String para el input type="date"
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    setLoading(true);

    // 1. Validar SOLO los campos obligatorios (Igual que en el registro de cliente)
    if (
      !formData.nombre ||
      !formData.apellido ||
      !formData.rut ||
      !formData.correo ||
      !formData.contrasena
    ) {
      alert("Por favor, completa los campos obligatorios marcados con (*)");
      setLoading(false);
      return;
    }

    try {
      // 2. Preparar fecha de nacimiento
      // Si el admin eligió fecha, la convertimos a Timestamp. Si no, usamos la fecha de hoy.
      let fechaTimestamp = Date.now();
      if (formData.fechaNacimiento) {
        // Sumamos las horas para evitar problemas de zona horaria (opcional, ajuste simple)
        const dateObj = new Date(formData.fechaNacimiento);
        fechaTimestamp = dateObj.getTime();
      }

      // 3. Enviar al backend con valores por defecto para los opcionales
      await createUser({
        nombre: formData.nombre,
        apellido: formData.apellido,
        rut: formData.rut,
        correo: formData.correo,
        password: formData.contrasena,
        rol: formData.rol,

        // Si están vacíos, enviamos "relleno" para satisfacer a la Base de Datos (NOT NULL)
        telefono: formData.telefono || "00000000",
        direccion: formData.direccion || "Sin dirección",
        region: formData.region || "Sin región",
        comuna: formData.comuna || "Sin comuna",

        // La fecha procesada
        fechaNacimiento: fechaTimestamp,
      });

      alert("¡Usuario creado exitosamente!");
      navigate("/admin/usuarios/mostrar");
    } catch (error: any) {
      console.error(error);
      alert(
        error.message ||
          "Error al crear el usuario. Verifica que el correo no exista."
      );
    } finally {
      setLoading(false);
    }
  };

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
              Mostrar Usuarios
            </Link>
          </li>
        </ul>
      </aside>

      <header className="admin-header p-4 bg-white border-bottom">
        <h3 className="fw-bold mb-0 text-dark">Registrar Nuevo Usuario</h3>
      </header>

      <section
        className="admin-content d-flex justify-content-center align-items-center py-5"
        style={{ minHeight: "60vh" }}
      >
        <div
          className="card shadow-sm p-4"
          style={{ maxWidth: "800px", width: "100%", background: "#f8f9fa" }}
        >
          <h5 className="fw-bold mb-4 text-primary">Datos del Usuario</h5>
          <p className="text-muted small mb-4">
            Los campos marcados con (*) son obligatorios. Los demás se
            rellenarán automáticamente si se dejan vacíos.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* --- DATOS OBLIGATORIOS (Izquierda) --- */}
              <div className="col-md-6">
                <h6 className="text-primary border-bottom pb-2 mb-3">
                  Credenciales y Básicos
                </h6>

                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label fw-bold text-dark">
                    Nombre *
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
                  <label htmlFor="apellido" className="form-label fw-bold text-dark">
                    Apellido *
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
                  <label htmlFor="rut" className="form-label fw-bold text-dark">
                    RUT *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="rut"
                    placeholder="12.345.678-9"
                    value={formData.rut}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="correo" className="form-label fw-bold text-dark">
                    Correo Electrónico *
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
                  <label htmlFor="contrasena" className="form-label fw-bold text-dark">
                    Contraseña *
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="contrasena"
                    value={formData.contrasena}
                    onChange={handleChange}
                    required
                    minLength={6}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="rol"
                    className="form-label fw-bold text-primary"
                  >
                    Rol de Usuario *
                  </label>
                  <select
                    className="form-select border-primary"
                    id="rol"
                    value={formData.rol}
                    onChange={handleChange}
                  >
                    <option value="CLIENTE">CLIENTE</option>
                    <option value="VENDEDOR">VENDEDOR</option>
                    <option value="ADMIN">ADMINISTRADOR</option>
                  </select>
                </div>
              </div>

              {/* --- DATOS OPCIONALES (Derecha) --- */}
              <div className="col-md-6">
                <h6 className="text-secondary border-bottom pb-2 mb-3">
                  Detalles (Opcional)
                </h6>

                <div className="mb-3">
                  <label htmlFor="telefono" className="form-label text-dark">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="Opcional"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="fechaNacimiento" className="form-label text-dark">
                    Fecha de Nacimiento
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="fechaNacimiento"
                    value={formData.fechaNacimiento}
                    onChange={handleChange}
                  />
                  <div className="form-text text-muted">
                    Si se omite, se usará la fecha de hoy.
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="direccion" className="form-label text-dark">
                    Dirección
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    placeholder="Calle, número..."
                  />
                </div>

                <div className="row">
                  <div className="col-6 mb-3">
                    <label htmlFor="region" className="form-label text-dark">
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
                  <div className="col-6 mb-3">
                    <label htmlFor="comuna" className="form-label text-dark">
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
            </div>

            <div className="d-grid gap-2 mt-4">
              <button
                type="submit"
                className="btn btn-success fw-bold py-2 shadow-sm"
                disabled={loading}
              >
                {loading ? (
                  <span>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Creando...
                  </span>
                ) : (
                  <span>
                    <i className="bi bi-check-circle-fill me-2"></i>CREAR
                    USUARIO
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default AdminNuevoUsuario;
