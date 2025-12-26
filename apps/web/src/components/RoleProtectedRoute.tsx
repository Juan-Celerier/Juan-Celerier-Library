import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../application/hooks/useAuth";

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
  fallbackPath?: string;
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({
  children,
  allowedRoles,
  fallbackPath = "/",
}) => {
  const { user, token } = useAuth();

  // Si no hay token, redirigir al login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si no hay usuario, mostrar loading o redirigir
  if (!user) {
    return <div>Cargando...</div>;
  }

  // Verificar si el rol del usuario está en los roles permitidos
  if (!allowedRoles.includes(user.role)) {
    // Redirigir a la página principal o mostrar un mensaje de acceso denegado
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
};

export default RoleProtectedRoute;
