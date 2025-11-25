// src/pages/client/Registro.tsx
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [rut, setRut] = useState(""); // <--- 1. NUEVO ESTADO
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Validaciones
    if (
      !nombre ||
      !apellido ||
      !rut ||
      !correo ||
      !contraseña ||
      !confirmarContraseña
    ) {
      setError("Por favor, completa todos los campos");
      return;
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      setError("Por favor, ingresa un correo válido");
      return;
    }

    // Validación de contraseña
    if (contraseña.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (contraseña !== confirmarContraseña) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      // 3. Enviar el RUT a la función
      await register({
        nombres: nombre,
        apellidos: apellido,
        rut: rut, // <--- Enviamos el estado
        correo,
        password: contraseña,
      });

      alert(`¡Registro exitoso! Bienvenido ${nombre}`);
      navigate("/");
    } catch (err: any) {
      setError(err?.message || "Error al crear usuario");
    }
  };

  return (
    <main>
      <section
        className="container d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: "80vh", paddingTop: "2rem", paddingBottom: "2rem" }}
      >
        <img
          src="/logo-lvlup.png"
          alt="Level-Up Gamer Logo"
          width="120"
          height="120"
          className="mb-3"
        />
        <h2 className="fw-bold text-success mb-4 text-center">
          Level-Up Gamer
        </h2>

        {/* Card con el formulario de registro */}
        <article
          className="card bg-dark text-light shadow-lg p-4"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <h5 className="fw-bold mb-3 text-success">Registro de usuario</h5>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                NOMBRE
              </label>
              <input
                type="text"
                className="form-control bg-dark text-light border-secondary"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            {/* --- AGREGAR ESTE BLOQUE PARA EL APELLIDO --- */}
            <div className="mb-3">
              <label htmlFor="apellido" className="form-label">
                APELLIDO
              </label>
              <input
                type="text"
                className="form-control bg-dark text-light border-secondary"
                id="apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="rut" className="form-label">
                RUT
              </label>
              <input
                type="text"
                className="form-control bg-dark text-light border-secondary"
                id="rut"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                placeholder="Ej: 12.345.678-9"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="correo" className="form-label">
                CORREO
              </label>
              <input
                type="email"
                className="form-control bg-dark text-light border-secondary"
                id="correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="contraseña" className="form-label">
                CONTRASEÑA
              </label>
              <input
                type="password"
                className="form-control bg-dark text-light border-secondary"
                id="contraseña"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                required
                minLength={6}
              />
              <small className="text-muted">Mínimo 6 caracteres</small>
            </div>

            <div className="mb-3">
              <label htmlFor="confirmarContraseña" className="form-label">
                CONFIRMAR CONTRASEÑA
              </label>
              <input
                type="password"
                className="form-control bg-dark text-light border-secondary"
                id="confirmarContraseña"
                value={confirmarContraseña}
                onChange={(e) => setConfirmarContraseña(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-success w-100 mt-2">
              Registrarse
            </button>
          </form>

          <div className="text-center mt-3">
            <p className="text-muted small">
              ¿Ya tienes cuenta?{" "}
              <a href="/login" className="text-success">
                Inicia sesión aquí
              </a>
            </p>
          </div>
        </article>
      </section>
    </main>
  );
};

export default Registro;
