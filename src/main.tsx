// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Importar Bootstrap CSS y JS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // dropdown, carousel, modals, etc.

// Importar Bootstrap Icons
import "bootstrap-icons/font/bootstrap-icons.css";

// Importar estilos personalizados
import "./styles/style.css";
// Semilla de usuarios por defecto (se vuelcan a localStorage la primera vez)
import users from "./data/users";
import { initUsers } from "./utils/userService";

// Inicializar usuarios por defecto si aún no existen
initUsers(users);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
