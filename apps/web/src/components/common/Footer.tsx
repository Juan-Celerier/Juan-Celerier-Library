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
      className={`bg-neutral-50 border-t border-neutral-100 py-12 ${className}`}
      role="contentinfo"
      aria-label="Información del sitio"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Columna 1: Marca y Descripción */}
          <div className="col-span-1 md:col-span-1">
            <Logo className="mb-4 block" />
            <p className="text-sm text-neutral-500 leading-relaxed">
              Tu puerta de acceso al conocimiento. Gestiona tus préstamos y
              descubre nuevos libros de forma sencilla.
            </p>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-4">Explorar</h3>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>
                <Link
                  to="/books"
                  className="hover:text-emerald-600 transition-colors"
                >
                  Catálogo
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-emerald-600 transition-colors"
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="hover:text-emerald-600 transition-colors"
                >
                  Mi Perfil
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Soporte */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-4">Cuenta</h3>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>
                <Link
                  to="/my/loans"
                  className="hover:text-emerald-600 transition-colors"
                >
                  Mis Préstamos
                </Link>
              </li>
              <li>
                <Link
                  to="/my/reservations"
                  className="hover:text-emerald-600 transition-colors"
                >
                  Mis Reservas
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="hover:text-emerald-600 transition-colors"
                >
                  Mi Perfil
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Redes Sociales (Ejemplo) */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-neutral-400 hover:text-academy-blue transition-colors"
                aria-label="GitHub"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-academy-blue transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-academy-blue transition-colors"
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
