import { Link } from "react-router-dom";

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const SkipLink = ({ href, children, className = "" }: SkipLinkProps) => {
  return (
    <a
      href={href}
      className={`sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-emerald-600 text-white px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${className}`}
    >
      {children}
    </a>
  );
};

// Skip links comunes para la aplicación
export const AppSkipLinks = () => {
  return (
    <>
      <SkipLink href="#main-content">Saltar al contenido principal</SkipLink>
      <SkipLink href="#navigation">Saltar a la navegación</SkipLink>
      <SkipLink href="#search">Saltar a la búsqueda</SkipLink>
    </>
  );
};
