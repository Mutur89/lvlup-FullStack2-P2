// src/utils/userService.test.ts
import { describe, expect, test, beforeEach } from "vitest";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  type User,
} from "./userService";

// Mock simple de localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(globalThis, "localStorage", {
  value: localStorageMock,
});

describe('UserService - Pruebas Esenciales', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('Debe obtener la lista de usuarios', () => {
    //! 1 - Arrange & Act
    const usuarios = getUsers();

    //! 2 - Assert
    expect(Array.isArray(usuarios)).toBe(true);
  });

  test('Debe crear un nuevo usuario con ID único', () => {
    //! 1 - Arrange
    const datos: Partial<User> = {
      nombre: "Juan",
      apellidos: "Pérez",
      correo: "juan.perez@example.com",
      rut: "12345678-9",
      region: "Metropolitana",
      comuna: "Santiago",
      rol: "cliente",
    };

    //! 2 - Act
    const usuario = createUser(datos);

    //! 3 - Assert
    expect(usuario.id).toBeDefined();
    expect(usuario.nombre).toBe("Juan");
    expect(usuario.correo).toBe("juan.perez@example.com");
  });

  test('Debe actualizar un usuario existente', () => {
    //! 1 - Arrange
    const datos: Partial<User> = {
      nombre: "María",
      apellidos: "González",
      correo: "maria@example.com",
      telefono: "123456789",
    };
    const usuario = createUser(datos);

    //! 2 - Act
    const resultado = updateUser({
      id: usuario.id,
      nombre: "María José",
      telefono: "987654321",
    });
    const usuarios = getUsers();
    const actualizado = usuarios.find((u) => u.id === usuario.id);

    //! 3 - Assert
    expect(resultado).toBe(true);
    expect(actualizado?.nombre).toBe("María José");
    expect(actualizado?.telefono).toBe("987654321");
  });

  test('Debe eliminar un usuario existente', () => {
    //! 1 - Arrange
    const datos: Partial<User> = {
      nombre: "Carlos",
      correo: "carlos@example.com",
    };
    const usuario = createUser(datos);
    const usuariosAntes = getUsers().length;

    //! 2 - Act
    const resultado = deleteUser(usuario.id);
    const usuariosDespues = getUsers().length;

    //! 3 - Assert
    expect(resultado).toBe(true);
    expect(usuariosDespues).toBe(usuariosAntes - 1);
  });
});