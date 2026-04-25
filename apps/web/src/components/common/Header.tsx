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
    auth !== undefined ? Boolean(auth && auth.token) : isAuthenticated;

  const resolvedUserName = userName ?? auth?.user?.name;

  const handleLogin = onLogin ?? (() => navigate("/login"));
  const handleRegister = () => navigate("/register");
  const handleLogout =
    onLogout ??
    (() => {
      auth?.logout();
      navigate("/login");
    });

  const handleSearch = (term: string) => {
    if (onSearch) {
      onSearch(term);
    } else {
      if (term.trim()) {
        navigate(`/books?search=${encodeURIComponent(term.trim())}`);
      } else {
        navigate("/books");
      }
    }
  };
  return (
    <header
      className={`sticky top-0 z-modal w-full border-b border-neutral-200 bg-white/90 backdrop-blur-md transition-all duration-200 shadow-subtle ${className}`}
      role="banner"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Sección Izquierda: Logo y Navegación Desktop */}
        <div className="flex items-center gap-lg md:gap-xl">
          <Logo />

          {/* Navegación - Oculta en móbiles, visible en md para arriba */}
          <nav
            id="navigation"
            className="hidden md:flex items-center gap-lg"
            role="navigation"
            aria-label="Navegación principal"
          >
            <Link
              to="/books"
              className="text-body-sm font-medium text-neutral-600 hover:text-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded-base px-md py-sm"
            >
              Catálogo
            </Link>
            <Link
              to="/about"
              className="text-body-sm font-medium text-neutral-600 hover:text-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded-base px-md py-sm"
            >
              Nosotros
            </Link>
          </nav>
        </div>

        {/* Sección Central/Derecha: Búsqueda y Acciones */}
        <div className="flex items-center gap-md">
          {/* La búsqueda se oculta en pantallas muy pequeñas si hace falta espacio */}
          <div id="search" className="hidden sm:block w-full max-w-xs">
            <SearchBox
              onSearchChange={handleSearch}
              aria-label="Buscar libros en la biblioteca"
            />
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
