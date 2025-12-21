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
    if (!token) return <Navigate to="/login" replace />;
    if (allowedRoles && allowedRoles.length > 0) {
      const role = user?.role;
      if (!role || !allowedRoles.includes(role))
        return <Navigate to="/" replace />;
    }
    return children;
  } catch (e) {
    // If useAuth is used outside provider, redirect to login
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
