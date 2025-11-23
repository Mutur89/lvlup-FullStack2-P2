// src/data/users.ts
import type { User } from "../utils/userService";

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
