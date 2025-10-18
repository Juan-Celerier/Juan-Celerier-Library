import React from "react";

// 1. Definimos las props que el componente necesita, basadas en la entidad Book.
export interface BookCardProps {
  /** URL de la imagen de portada del libro */
  imageUrl?: string;
  /** Título del libro */
  title: string;
  /** Nombre del autor principal */
  author: string;
  /** Indica si hay copias disponibles */
  isAvailable: boolean;
  /** Permite pasar botones o cualquier otro elemento como acciones */
  actions?: React.ReactNode;
  /** Clases de Tailwind adicionales para personalizar el contenedor */
  className?: string;
}

// 2. Creamos el componente BookCard
export const BookCard = ({
  imageUrl,
  title,
  author,
  isAvailable,
  actions,
  className = "",
}: BookCardProps) => {
  return (
    <div
      className={`relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-neutral-100 bg-paper shadow-subtle transition-transform duration-smooth hover:scale-[1.02] hover:shadow-medium ${className}`}
    >
      {/* Indicador de Disponibilidad */}
      <div
        className={`absolute top-2 right-2 z-10 rounded-full px-2 py-1 text-xs font-bold text-white ${
          isAvailable ? "bg-academy-green" : "bg-red-500"
        }`}
      >
        {isAvailable ? "Disponible" : "No Disponible"}
      </div>

      {/* Imagen de Portada */}
      <div className="relative mx-auto mt-6 flex h-48 overflow-hidden">
        <img
          className="h-full w-full object-contain"
          src={imageUrl || "https://via.placeholder.com/150"} // Una imagen por defecto
          alt={`Portada de ${title}`}
        />
      </div>

      {/* Contenido de Texto */}
      <div className="mt-4 px-5 pb-5">
        <h5 className="truncate text-xl font-semibold tracking-tight text-neutral-900">
          {title}
        </h5>
        <p className="mt-1 truncate text-sm text-neutral-500">{author}</p>

        {/* Slot para Acciones (botones) */}
        {actions && (
          <div className="mt-4 flex items-center justify-center space-x-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;
