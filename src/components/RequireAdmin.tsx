import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RequireAdmin: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // CORRECCIÓN: Usamos toUpperCase() e includes() para ser flexibles
  // Esto aceptará "ADMIN", "ROLE_ADMIN", "admin", etc.
  if (!user || !user.rol.toUpperCase().includes("ADMIN")) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAdmin;
