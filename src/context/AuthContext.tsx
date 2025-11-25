// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { authApi, usersApi } from "../services/api";

type SafeUser = {
  id: string;
  nombre: string;
  correo: string;
  rol: string;
} | null;

type AuthContextShape = {
  user: SafeUser;
  isAuthenticated: boolean;
  // CAMBIO 1: Ahora devuelve SafeUser si es exitoso, o false si falla
  login: (correo: string, password: string) => Promise<SafeUser | false>;
  logout: () => void;
  register: (data: {
    nombres: string;
    apellidos: string;
    rut: string;
    correo: string;
    password: string;
    rol?: string;
  }) => Promise<SafeUser>;
};

const AuthContext = createContext<AuthContextShape>({
  user: null,
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
  register: async () => null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<SafeUser>(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "user") {
        try {
          setUser(e.newValue ? JSON.parse(e.newValue) : null);
        } catch {
          setUser(null);
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const login = async (correo: string, password: string) => {
    try {
      const response = await authApi.login({
        correo,
        contrasena: password,
      });

      localStorage.setItem("token", response.token);

      const userData = await usersApi.getProfile();

      const safe = {
        id: userData.id.toString(),
        nombre: userData.nombre,
        correo: userData.correo,
        rol: userData.rol,
      };

      localStorage.setItem("user", JSON.stringify(safe));
      setUser(safe);

      // CAMBIO 2: Devolvemos el objeto usuario en lugar de true
      return safe;
    } catch (error) {
      console.error("Error en login:", error);
      localStorage.removeItem("token");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  const register = async (data: {
    nombres: string;
    apellidos: string;
    rut: string;
    correo: string;
    password: string;
    rol?: string;
  }) => {
    try {
      const requestData = {
        nombre: data.nombres,
        apellido: data.apellidos,
        correo: data.correo,
        contrasena: data.password,
        rol: "CLIENTE",
        rut: data.rut,
        comuna: "Sin comuna",
        region: "Sin región",
        direccion: "Sin dirección",
        telefono: "00000000",
        fechaNacimiento: Date.now(),
      };

      console.log("Enviando al backend:", requestData);

      await authApi.register(requestData);

      const loggedUser = await login(data.correo, data.password);

      if (!loggedUser) {
        // CAMBIO 3: Chequeo simple (objeto es truthy, false es falsy)
        throw new Error("Error al iniciar sesión después del registro");
      }

      const rawUser = localStorage.getItem("user");
      return rawUser ? JSON.parse(rawUser) : null;
    } catch (error) {
      console.error("Error en registro:", error);
      if (axios.isAxiosError(error) && error.response?.data) {
        console.error("Detalle del error:", error.response.data);
      }
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
