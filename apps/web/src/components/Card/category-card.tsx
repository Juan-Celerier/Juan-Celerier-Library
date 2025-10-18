import React from "react";

// Basado en tu entidad Category
export interface CategoryCardProps {
  /** Nombre de la categoría a mostrar */
  name: string;
  /** URL de la imagen de fondo para la tarjeta */
  imageUrl?: string;
  /** Función a ejecutar cuando se hace clic en la tarjeta */
  onClick?: () => void;
  /** Clases de Tailwind adicionales para personalización */
  className?: string;
}

export const CategoryCard = ({
  name,
  imageUrl,
  onClick,
  className = "",
}: CategoryCardProps) => {
  // Estilo de fondo condicional: usa la imagen o un gradiente de tu tema
  const backgroundStyle = imageUrl
    ? { backgroundImage: `url(${imageUrl})` }
    : {};

  return (
    <button
      onClick={onClick}
      className={`relative h-40 w-full overflow-hidden rounded-lg bg-cover bg-center text-white shadow-medium transition-transform duration-smooth hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}
      style={backgroundStyle}
    >
      {/* Capa de superposición para mejorar la legibilidad del texto */}
      <div className="absolute inset-0 bg-black/40 transition-colors hover:bg-black/50"></div>

      {/* Si no hay imagen, usamos un gradiente de fondo del tema */}
      {!imageUrl && <div className="absolute inset-0 bg-gradient-hero"></div>}

      <div className="relative z-10 flex h-full w-full items-center justify-center p-4">
        <h3 className="text-2xl font-bold tracking-tight text-center">
          {name}
        </h3>
      </div>
    </button>
  );
};

export default CategoryCard;
