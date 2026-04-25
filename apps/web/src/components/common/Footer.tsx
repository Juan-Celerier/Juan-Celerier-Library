import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram } from "lucide-react"; // Íconos sociales
import { Logo } from "./Logo";

export interface FooterProps {
  className?: string;
}

export const Footer = ({ className = "" }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`bg-neutral-50 border-t border-neutral-200 py-2xl ${className}`}
      role="contentinfo"
      aria-label="Información del sitio"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-xl mb-xl">
          {/* Columna 1: Marca y Descripción */}
          <div className="col-span-1 md:col-span-1">
            <Logo className="mb-md block" />
            <p className="text-body-sm text-neutral-500 leading-relaxed">
              Tu puerta de acceso al conocimiento. Gestiona tus préstamos y
              descubre nuevos libros de forma sencilla.
            </p>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-lg">Explorar</h3>
            <ul className="gap-sm text-body-sm text-neutral-600 flex flex-col">
              <li>
                <Link
                  to="/books"
                  className="hover:text-primary transition-colors duration-200 hover:underline"
                >
                  Catálogo
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-primary transition-colors duration-200 hover:underline"
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="hover:text-primary transition-colors duration-200 hover:underline"
                >
                  Mi Perfil
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Soporte */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-lg">Cuenta</h3>
            <ul className="gap-sm text-body-sm text-neutral-600 flex flex-col">
              <li>
                <Link
                  to="/my/loans"
                  className="hover:text-primary transition-colors duration-200 hover:underline"
                >
                  Mis Préstamos
                </Link>
              </li>
              <li>
                <Link
                  to="/my/reservations"
                  className="hover:text-primary transition-colors duration-200 hover:underline"
                >
                  Mis Reservas
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="hover:text-primary transition-colors duration-200 hover:underline"
                >
                  Mi Perfil
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Redes Sociales (Ejemplo) */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-lg">Síguenos</h3>
            <div className="flex gap-lg">
              <a
                href="#"
                className="text-neutral-400 hover:text-primary transition-colors duration-200 hover:scale-110"
                aria-label="GitHub"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-primary transition-colors duration-200 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-primary transition-colors duration-200 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Barra inferior: Copyright */}
        <div className="pt-8 border-t border-neutral-200 text-center text-xs text-neutral-500">
          <p>© {currentYear} BiblioSys. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
