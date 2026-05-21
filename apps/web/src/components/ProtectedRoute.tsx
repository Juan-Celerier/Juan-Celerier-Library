import { Navigate } from "react-router-dom";
import { useAuth } from "../application/hooks/useAuth";

export const ProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: JSX.Element;
  allowedRoles?: Array<string>;
}) => {
  try {
    const { token, user } = useAuth();

    // 1. Buscamos los valores síncronos de respaldo en el localStorage
    const storedToken = token || localStorage.getItem("token");
    const storedUserRaw = localStorage.getItem("user");
    const activeUser =
      user || (storedUserRaw ? JSON.parse(storedUserRaw) : null);

    // Si no hay token de ninguna forma, directo al login
    if (!storedToken) {
      return <Navigate to="/login" replace />;
    }

    // 2. CONTROL DE ESPERA: Si hay token pero el objeto usuario todavía no terminó
    // de inicializarse en el Contexto de React, esperamos un milisegundo con un loader
    if (storedToken && !activeUser) {
      return (
        <div className="h-screen w-screen bg-neutral-50 flex flex-col items-center justify-center gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          <p className="text-xs font-black text-neutral-400 uppercase tracking-widest">
            Sincronizando seguridad...
          </p>
        </div>
      );
    }

    // 3. CONTROL DE ROLES: Evaluamos sobre el usuario activo (estado o almacenamiento local)
    if (allowedRoles && allowedRoles.length > 0) {
      const role = activeUser?.role;
      if (!role || !allowedRoles.includes(role)) {
        console.warn(
          `Acceso denegado. Rol encontrado: ${role || "Ninguno"}. Requerido:`,
          allowedRoles,
        );
        return <Navigate to="/login" replace />;
      }
    }

    return children;
  } catch (e) {
    console.error("Error en ProtectedRoute guard:", e);
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
