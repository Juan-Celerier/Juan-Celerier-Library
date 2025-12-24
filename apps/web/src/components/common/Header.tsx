import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import SearchBox from "./Search";
import UserActions from "./UserActions";
import { useAuth } from "../../application/hooks/useAuth";

export interface HeaderProps {
  /** Estado de autenticación del usuario */
  isAuthenticated?: boolean;
  /** Nombre del usuario para mostrar en el menú */
  userName?: string;
  /** Callback para buscar */
  onSearch?: (term: string) => void;
  /** Callback para login */
  onLogin?: () => void;
  /** Callback para logout */
  onLogout?: () => void;
  /** Clases adicionales */
  className?: string;
}

export const Header = ({
  isAuthenticated = false,
  userName,
  onSearch,
  onLogin,
  onLogout,
  className = "",
}: HeaderProps) => {
  const navigate = useNavigate();
  let auth;
  try {
    auth = useAuth();
  } catch (err) {
    auth = undefined as any;
  }

  const resolvedIsAuthenticated =
    typeof isAuthenticated === "boolean"
      ? isAuthenticated
      : Boolean(auth && auth.token);

  const resolvedUserName = userName ?? auth?.user?.name;

  const handleLogin = onLogin ?? (() => navigate("/login"));
  const handleRegister = () => navigate("/register");
  const handleLogout =
    onLogout ??
    (() => {
      auth?.logout();
      navigate("/login");
    });
  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-neutral-100 bg-white/80 backdrop-blur-md transition-all ${className}`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Sección Izquierda: Logo y Navegación Desktop */}
        <div className="flex items-center gap-6 md:gap-8">
          <Logo />

          {/* Navegación - Oculta en móbiles, visible en md para arriba */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/books"
              className="text-sm font-medium text-neutral-600 hover:text-academy-blue transition-colors"
            >
              Catálogo
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium text-neutral-600 hover:text-academy-blue transition-colors"
            >
              Nosotros
            </Link>
          </nav>
        </div>

        {/* Sección Central/Derecha: Búsqueda y Acciones */}
        <div className="flex items-center gap-4">
          {/* La búsqueda se oculta en pantallas muy pequeñas si hace falta espacio */}
          <div className="hidden sm:block w-full max-w-xs">
            <SearchBox onSearchChange={onSearch} />
          </div>

          <UserActions
            isAuthenticated={resolvedIsAuthenticated}
            userName={resolvedUserName}
            onLoginClick={handleLogin}
            onLogoutClick={handleLogout}
            onRegisterClick={handleRegister}
            onProfileClick={() => navigate("/profile")}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
