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

  // comprobar rol
  if (!user || user.rol !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAdmin;
