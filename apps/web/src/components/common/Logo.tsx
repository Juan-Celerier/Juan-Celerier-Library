import { Link } from "react-router-dom";

export interface LogoProps {
  className?: string;
}

export const Logo = ({ className = "" }: LogoProps) => {
  return (
    <Link
      to="/"
      className={`text-heading-md font-bold text-primary hover:text-primary/80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 rounded-base px-2 py-1 ${className}`}
    >
      {/* Puedes cambiar este texto por un <img> si tienes logo */}
      BiblioSys 📚
    </Link>
  );
};

export default Logo;
