import React, { createContext, useContext, useEffect, useState } from "react";
import {
  authenticate,
  createUser as createUserService,
  User,
} from "../utils/userService";

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

    const u = authenticate(correo, password);
    if (!u) return false;
    const safe = {
      id: u.id,
      nombre: u.nombre || u.nombres || "",
      correo: u.correo,
      rol: u.rol,
    };
    localStorage.setItem("user", JSON.stringify(safe));
    setUser(safe);
    return true;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const register = async (data: {
    nombres?: string;
    correo: string;
    password: string;
    rol?: string;
  }) => {

    const created = createUserService({
      nombres: data.nombres,
      correo: data.correo,
      password: data.password,
      rol: data.rol,
    });
    const safe = {
      id: created.id,
      nombre: created.nombre || created.nombres || "",
      correo: created.correo,
      rol: created.rol,
    };
 
    localStorage.setItem("user", JSON.stringify(safe));
    setUser(safe);
    return safe;
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
