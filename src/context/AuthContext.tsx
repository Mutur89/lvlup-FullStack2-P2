import React, { createContext, useContext, useEffect, useState } from "react";
import { authApi, usersApi } from "../services/api";

type SafeUser = {
  id: string;
  nombre?: string;
  correo?: string;
  rol?: string;
} | null;

type AuthContextShape = {
  user: SafeUser;
  isAuthenticated: boolean;
  login: (correo: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (data: {
    nombres?: string;
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
      // Llamar al backend para autenticar
      const response = await authApi.login({
        correo,
        contrasena: password,
      });

      // Guardar el token JWT
      localStorage.setItem("token", response.token);

      // Obtener información del usuario desde el backend
      // El username en la respuesta es el correo
      const users = await usersApi.getAll();
      const userData = users.find((u) => u.correo === correo);

      if (!userData) {
        // Si no encontramos el usuario, limpiar y retornar false
        localStorage.removeItem("token");
        return false;
      }

      const safe = {
        id: userData.id.toString(),
        nombre: userData.nombre,
        correo: userData.correo,
        rol: userData.rol,
      };

      localStorage.setItem("user", JSON.stringify(safe));
      setUser(safe);
      return true;
    } catch (error) {
      console.error("Error en login:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  const register = async (data: {
    nombres?: string;
    correo: string;
    password: string;
    rol?: string;
  }) => {
    try {
      // Crear usuario en el backend
      const created = await usersApi.create({
        nombre: data.nombres || "",
        correo: data.correo,
        contrasena: data.password,
        rol: data.rol || "CLIENTE",
      });

      const safe = {
        id: created.id.toString(),
        nombre: created.nombre,
        correo: created.correo,
        rol: created.rol,
      };

      // Auto-login después del registro
      const loginSuccess = await login(data.correo, data.password);
      if (!loginSuccess) {
        throw new Error("Error al iniciar sesión después del registro");
      }

      return safe;
    } catch (error) {
      console.error("Error en registro:", error);
      return null;
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
