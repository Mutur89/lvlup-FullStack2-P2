// src/utils/userService.ts
import { usersApi, UserResponse } from "../services/api";

export interface User {
  id: string;
  nombre?: string;
  apellido?: string; // <--- Aseguramos que este campo exista
  apellidos?: string; // Alias por compatibilidad
  correo?: string;
  rut?: string;
  region?: string;
  comuna?: string;
  direccion?: string;
  telefono?: string;
  rol?: string;
  [k: string]: any;
}

// Convertir UserResponse del backend a User del frontend
function mapToUser(apiUser: any): User {
  // Nota: apiUser puede traer 'apellido' o 'apellidos' según cómo lo devuelve el backend
  return {
    id: apiUser.id.toString(),
    nombre: apiUser.nombre,
    apellido: apiUser.apellido || apiUser.apellidos, // Mapeo flexible
    apellidos: apiUser.apellido || apiUser.apellidos,
    correo: apiUser.correo,
    rut: apiUser.rut,
    telefono: apiUser.telefono,
    direccion: apiUser.direccion,
    rol: apiUser.rol,
    region: apiUser.region,
    comuna: apiUser.comuna,
  };
}

export async function getUsers(): Promise<User[]> {
  try {
    const users = await usersApi.getAll();
    return users.map(mapToUser);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return [];
  }
}

export async function getUserByCorreo(
  correo?: string
): Promise<User | undefined> {
  if (!correo) return undefined;
  try {
    const users = await usersApi.getAll();
    const found = users.find((u) => u.correo === correo);
    return found ? mapToUser(found) : undefined;
  } catch (error) {
    console.error("Error al buscar usuario por correo:", error);
    return undefined;
  }
}

export async function getUserById(id: string): Promise<User | undefined> {
  try {
    const user = await usersApi.getById(Number(id));
    return mapToUser(user);
  } catch (error) {
    console.error("Error al obtener usuario por ID:", error);
    return undefined;
  }
}

// --- FUNCIONES CRUD ---

export async function createUser(
  data: Partial<User> & { password?: string }
): Promise<User> {
  try {
    const created = await usersApi.create({
      nombre: data.nombre || data.nombres || "",
      apellido: data.apellido || data.apellidos || "",
      correo: data.correo || "",
      contrasena: data.password || "",
      rut: data.rut || "",
      telefono: data.telefono,
      direccion: data.direccion,
      rol: data.rol || "CLIENTE",
      region: data.region,
      comuna: data.comuna,

      // 🟢 CORRECCIÓN: Asegúrate de enviar fechaNacimiento
      // Si data.fechaNacimiento existe, úsalo; si no, usa la fecha actual
      fechaNacimiento: data.fechaNacimiento
        ? Number(data.fechaNacimiento)
        : Date.now(),
    });
    return mapToUser(created);
  } catch (error: any) {
    if (error.response?.status === 400) {
      // Extraemos el mensaje del backend si existe
      const msg = error.response.data?.message || "Error de validación";
      throw new Error(msg);
    }
    throw new Error("Error al crear usuario");
  }
}

export async function updateUser(
  updated: Partial<User> & { id: string }
): Promise<boolean> {
  try {
    const result = await usersApi.update(Number(updated.id), {
      nombre: updated.nombre,
      apellido: updated.apellido || updated.apellidos, // Enviar apellido
      correo: updated.correo,
      rut: updated.rut,
      telefono: updated.telefono,
      direccion: updated.direccion,
      rol: updated.rol,
      // Nota: si la API no permite actualizar contraseña por aquí, la omitimos
    } as any);
    return !!result;
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    return false;
  }
}

export async function deleteUser(id: string): Promise<boolean> {
  try {
    await usersApi.delete(Number(id));
    return true;
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    return false;
  }
}

// --- COMPATIBILIDAD LEGACY (Mantener para evitar errores en otros archivos) ---
export function authenticate(c?: string, p?: string): any {
  return undefined;
}
export function initUsers(b?: any) {}

export default {
  getUsers,
  getUserByCorreo,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
