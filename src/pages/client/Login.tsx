// src/pages/client/Login.tsx
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!correo || !contraseña) {
      setError("Por favor, completa todos los campos");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      setError("Por favor, ingresa un correo válido");
      return;
    }

    // CAMBIO AQUÍ: Capturamos el resultado que ahora puede ser el usuario
    const loggedUser = await login(correo, contraseña);

    if (!loggedUser) {
      setError("Correo o contraseña incorrectos");
      return;
    }

    alert(`¡Bienvenido! Has iniciado sesión como ${correo}`);

    // LÓGICA DE REDIRECCIÓN SEGÚN ROL
    // Verificamos si el rol contiene "ADMIN" (para cubrir ROLE_ADMIN o ADMIN)
    if (loggedUser.rol.includes("ADMIN")) {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  return (
    // ... (El resto del JSX se mantiene igual)
    <main>
      <section
        className="container d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: "80vh" }}
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

        <article
          className="card bg-dark text-light shadow-lg p-4"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <h5 className="fw-bold mb-3 text-success">Inicio de sesión</h5>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
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
              />
            </div>

            <button type="submit" className="btn btn-success w-100 mt-2">
              Iniciar sesión
            </button>
          </form>

          <div className="text-center mt-3">
            <p className="text-muted small">
              ¿No tienes cuenta?{" "}
              <a href="/registro" className="text-success">
                Regístrate aquí
              </a>
            </p>
          </div>
        </article>
      </section>
    </main>
  );
};

export default Login;
