import { Link } from "react-router-dom";

export interface LogoProps {
  className?: string;
}

export const Logo = ({ className = "" }: LogoProps) => {
  return (
    <Link
      to="/"
      className={`text-2xl font-bold text-academy-blue hover:opacity-80 transition-opacity ${className}`}
    >
      {/* Puedes cambiar este texto por un <img> si tienes logo */}
      BiblioSys 📚
    </Link>
  );
};

export default Logo;
