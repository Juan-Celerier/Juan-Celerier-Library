import React from "react";
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
                  to="/catalog"
                  className="hover:text-academy-blue transition-colors"
                >
                  Catálogo
                </Link>
              </li>
              <li>
                <Link
                  to="/new-arrivals"
                  className="hover:text-academy-blue transition-colors"
                >
                  Novedades
                </Link>
              </li>
              <li>
                <Link
                  to="/popular"
                  className="hover:text-academy-blue transition-colors"
                >
                  Más Populares
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Soporte */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-4">Soporte</h3>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>
                <Link
                  to="/help"
                  className="hover:text-academy-blue transition-colors"
                >
                  Centro de Ayuda
                </Link>
              </li>
              <li>
                <Link
                  to="/rules"
                  className="hover:text-academy-blue transition-colors"
                >
                  Normas de Préstamo
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-academy-blue transition-colors"
                >
                  Contacto
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
        <div className="pt-8 border-t border-neutral-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
          <p>© {currentYear} BiblioSys. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-neutral-900">
              Privacidad
            </Link>
            <Link to="/terms" className="hover:text-neutral-900">
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
