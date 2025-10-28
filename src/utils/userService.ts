// src/utils/userService.ts
export interface User {
  id: string;
  nombre?: string; // normalized single name
  nombres?: string; // original form field
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

const STORAGE_KEY = "usuarios";

function initUsers(baseUsers: Partial<User>[] = []) {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(baseUsers));
  }
}

export function getUsers(): User[] {
  initUsers();
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || "[]";
    const arr = JSON.parse(raw) as User[];
    return arr.map(normalizeUser);
  } catch {
    return [];
  }
}

function saveUsers(list: User[]) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(list.map((u) => ({ ...u })))
  );
}

function normalizeUser(u: User): User {
  const nombre = u.nombre || u.nombres || "";
  return { ...u, nombre };
}

export function getUserByCorreo(correo?: string): User | undefined {
  if (!correo) return undefined;
  return getUsers().find((u) => u.correo === correo);
}

export function createUser(data: Partial<User>): User {
  const list = getUsers();
  // validar correo único
  if (data.correo) {
    const exists = list.find((u) => u.correo === data.correo);
    if (exists) {
      throw new Error("Correo ya registrado");
    }
  }
  const id = `U${Date.now().toString().slice(-6)}`;
  const user: User = {
    id,
    nombre: data.nombre || data.nombres || "",
    nombres: data.nombres,
    apellidos: data.apellidos || "",
    correo: data.correo || "",
    rut: data.rut,
    region: data.region,
    comuna: data.comuna,
    direccion: data.direccion,
    telefono: data.telefono,
    rol: data.rol || "visualizador",
  };
  list.push(user);
  saveUsers(list);
  return user;
}

export function updateUser(updated: Partial<User> & { id: string }): boolean {
  const list = getUsers();
  // verificar conflicto de correo con otro usuario
  if (updated.correo) {
    const conflict = list.find(
      (u) => u.correo === updated.correo && u.id !== updated.id
    );
    if (conflict) return false;
  }
  const idx = list.findIndex((u) => u.id === updated.id);
  if (idx === -1) return false;
  const merged = { ...list[idx], ...updated } as User;
  merged.nombre = merged.nombre || merged.nombres || "";
  list[idx] = merged;
  saveUsers(list);
  return true;
}

export function deleteUser(idOrCorreo: string): boolean {
  const list = getUsers();
  const newList = list.filter(
    (u) => u.id !== idOrCorreo && u.correo !== idOrCorreo
  );
  if (newList.length === list.length) return false;
  saveUsers(newList);
  return true;
}

export default {
  getUsers,
  getUserByCorreo,
  createUser,
  updateUser,
  deleteUser,
};
