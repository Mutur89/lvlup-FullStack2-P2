// src/data/users.ts
// Seed de usuarios para desarrollo
import type { User } from "../utils/userService";

// Las contraseñas están codificadas en base64 para coincidir con la lógica actual (_pw)
const users: User[] = [
  {
    id: "U000001",
    nombre: "Admin Demo",
    nombres: "Admin Demo",
    apellidos: "",
    correo: "admin@admin.cl",
    rol: "admin",
    // admin123 -> base64
    _pw: "YWRtaW4xMjM=",
  },
  {
    id: "U000002",
    nombre: "Usuario Demo",
    nombres: "Usuario Demo",
    apellidos: "",
    correo: "usuario@usuario.cl",
    rol: "visualizador",
    // usuario123 -> base64
    _pw: "dXN1YXJpbzEyMw==",
  },
];

export default users;
