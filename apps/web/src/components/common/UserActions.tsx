import { Link } from "react-router-dom";
import Button from "../Button";
import { Badge } from "../../ui/Badge";
import { useAuth } from "../../application/hooks/useAuth";

export interface UserActionsProps {
  isAuthenticated: boolean;
  userName?: string;
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
  onProfileClick?: () => void;
  onLogoutClick?: () => void;
  className?: string;
}

export const UserActions = ({
  isAuthenticated,
  userName,
  onLoginClick,
  onRegisterClick,
  onProfileClick,
  onLogoutClick,
  className = "",
}: UserActionsProps) => {
  const { user } = useAuth();

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {isAuthenticated ? (
        // --- Usuario Logueado ---
        <>
          {/* Mostrar rol del usuario */}
          {user?.role && (
            <Badge
              variant={user.role === "LIBRARIAN" ? "success" : "secondary"}
              className="text-xs"
            >
              {user.role === "LIBRARIAN" ? "Bibliotecario" : "Usuario"}
            </Badge>
          )}

          {/* Panel de administración para bibliotecarios */}
          {user?.role === "LIBRARIAN" && (
            <Link to="/admin">
              <Button variant="secondary" size="sm" className="text-xs">
                Admin
              </Button>
            </Link>
          )}

          {/* Mis préstamos y reservas */}
          <Link to="/my/loans">
            <Button variant="ghost" size="sm" className="text-xs">
              Mis Préstamos
            </Button>
          </Link>
          <Link to="/my/reservations">
            <Button variant="ghost" size="sm" className="text-xs">
              Mis Reservas
            </Button>
          </Link>

          <Button variant="ghost" size="sm" onClick={onProfileClick}>
            {userName || "Mi Cuenta"}
          </Button>
          <Button variant="secondary" size="sm" onClick={onLogoutClick}>
            Salir
          </Button>
        </>
      ) : (
        // --- Usuario Visitante ---
        <>
          <Button variant="ghost" size="sm" onClick={onLoginClick}>
            Ingresar
          </Button>
          <Button variant="primary" size="sm" onClick={onRegisterClick}>
            Registrarse
          </Button>
        </>
      )}
    </div>
  );
};

export default UserActions;
