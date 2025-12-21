import Button from "../Button";

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
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {isAuthenticated ? (
        // --- Usuario Logueado ---
        <>
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
