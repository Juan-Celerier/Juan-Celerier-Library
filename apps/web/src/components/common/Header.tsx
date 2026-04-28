import { NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import SearchBox from "./Search";
import UserActions from "./UserActions";
import { useAuth } from "../../application/hooks/useAuth";

export interface HeaderProps {
  isAuthenticated?: boolean;
  userName?: string;
  onSearch?: (term: string) => void;
  onLogin?: () => void;
  onLogout?: () => void;
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
    if (onSearch) onSearch(term);
    else {
      if (term.trim())
        navigate(`/books?search=${encodeURIComponent(term.trim())}`);
      else navigate("/books");
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-neutral-100 bg-white/80 backdrop-blur-md transition-all duration-200 ${className}`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* 1. LADO IZQUIERDO: Logo y Navegación Principal */}
          <div className="flex items-center gap-8">
            <Logo />

            <nav className="hidden lg:flex items-center gap-1">
              <HeaderNavLink to="/books">Catálogo</HeaderNavLink>
              <HeaderNavLink to="/about">Nosotros</HeaderNavLink>
            </nav>
          </div>

          {/* 2. LADO DERECHO: Buscador y Acciones de Usuario */}
          <div className="flex items-center gap-4 flex-1 justify-end">
            {/* Buscador: limitado para que no rompa el layout */}
            <div className="hidden sm:block w-full max-w-[240px] md:max-w-[320px]">
              <SearchBox
                onSearchChange={handleSearch}
                aria-label="Buscar libros"
              />
            </div>

            {/* Divisor visual sutil */}
            <div className="hidden sm:block h-6 w-[1px] bg-neutral-200 mx-2" />

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
      </div>
    </header>
  );
};

/** Componente auxiliar para los links para evitar repetición */
const HeaderNavLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-lg ${
        isActive
          ? "text-primary bg-primary/5"
          : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50"
      }`
    }
  >
    {children}
  </NavLink>
);

export default Header;
