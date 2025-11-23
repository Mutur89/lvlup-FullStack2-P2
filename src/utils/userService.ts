// src/utils/userService.ts
import { usersApi, UserResponse } from '../services/api';

export interface User {
  id: string;
  nombre?: string;
  nombres?: string;
  apellidos?: string;
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
function mapToUser(apiUser: UserResponse): User {
  return {
    id: apiUser.id.toString(),
    nombre: apiUser.nombre,
    nombres: apiUser.nombre,
    correo: apiUser.correo,
    rut: apiUser.rut,
    telefono: apiUser.telefono,
    direccion: apiUser.direccion,
    rol: apiUser.rol,
  };
}

export async function getUsers(): Promise<User[]> {
  try {
    const users = await usersApi.getAll();
    return users.map(mapToUser);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return [];
  }
}

export async function getUserByCorreo(correo?: string): Promise<User | undefined> {
  if (!correo) return undefined;
  try {
    const users = await usersApi.getAll();
    const found = users.find((u) => u.correo === correo);
    return found ? mapToUser(found) : undefined;
  } catch (error) {
    console.error('Error al buscar usuario por correo:', error);
    return undefined;
  }
}

export async function getUserById(id: string): Promise<User | undefined> {
  try {
    const user = await usersApi.getById(Number(id));
    return mapToUser(user);
  } catch (error) {
    console.error('Error al obtener usuario por ID:', error);
    return undefined;
  }
}

// La función authenticate ya no se usa aquí, se maneja en AuthContext
export function authenticate(
  correo?: string,
  password?: string
): User | undefined {
  // Esta función se mantiene por compatibilidad pero ya no se usa
  // La autenticación ahora se hace en AuthContext usando el backend
  console.warn('authenticate() está deprecated. Usar AuthContext.login()');
  return undefined;
}

export async function createUser(data: Partial<User> & { password?: string }): Promise<User> {
  try {
    const created = await usersApi.create({
      nombre: data.nombre || data.nombres || '',
      correo: data.correo || '',
      contrasena: data.password || '',
      rut: data.rut,
      telefono: data.telefono,
      direccion: data.direccion,
      rol: data.rol || 'CLIENTE',
    });
    return mapToUser(created);
  } catch (error: any) {
    if (error.response?.status === 400) {
      throw new Error('Correo ya registrado');
    }
    throw new Error('Error al crear usuario');
  }
}

export async function updateUser(updated: Partial<User> & { id: string }): Promise<boolean> {
  try {
    const result = await usersApi.update(Number(updated.id), {
      nombre: updated.nombre || updated.nombres,
      correo: updated.correo,
      rut: updated.rut,
      telefono: updated.telefono,
      direccion: updated.direccion,
      rol: updated.rol,
    });
    return !!result;
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    return false;
  }
}

export async function deleteUser(idOrCorreo: string): Promise<boolean> {
  try {
    // Intentar parsear como número primero
    const id = Number(idOrCorreo);
    if (!isNaN(id)) {
      await usersApi.delete(id);
      return true;
    }

    // Si no es un número, buscar por correo
    const user = await getUserByCorreo(idOrCorreo);
    if (user) {
      await usersApi.delete(Number(user.id));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    return false;
  }
}

// Funciones legacy mantenidas por compatibilidad
export function initUsers(baseUsers: Partial<User>[] = []) {
  console.warn('initUsers() está deprecated. Los datos vienen del backend.');
}

export default {
  getUsers,
  getUserByCorreo,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
