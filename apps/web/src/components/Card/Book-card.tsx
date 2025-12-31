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
    <article
      className={`relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-neutral-100 bg-paper shadow-subtle transition-transform duration-smooth hover:scale-[1.02] hover:shadow-medium focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2 ${className}`}
      role="article"
      aria-labelledby={`book-title-${title?.replace(/\s+/g, '-').toLowerCase()}`}
    >
      {/* Indicador de Disponibilidad */}
      <div
        className={`absolute top-2 right-2 z-10 rounded-full px-2 py-1 text-xs font-bold text-white ${
          isAvailable ? "bg-academy-green" : "bg-red-500"
        }`}
        role="status"
        aria-label={isAvailable ? "Libro disponible" : "Libro no disponible"}
      >
        {isAvailable ? "Disponible" : "No Disponible"}
      </div>

      {/* Imagen de Portada */}
      <div className="relative mx-auto mt-6 flex h-48 overflow-hidden">
        <img
          className="h-full w-full object-contain"
          src={imageUrl || "https://via.placeholder.com/150"}
          alt={`Portada del libro "${title}" escrito por ${author}`}
          loading="lazy"
        />
      </div>

      {/* Contenido de Texto */}
      <div className="mt-4 px-5 pb-5">
        <h3
          id={`book-title-${title?.replace(/\s+/g, '-').toLowerCase()}`}
          className="truncate text-xl font-semibold tracking-tight text-neutral-900"
        >
          {title}
        </h3>
        <p className="mt-1 truncate text-sm text-neutral-500" aria-label={`Autor: ${author}`}>
          {author}
        </p>

        {/* Slot para Acciones (botones) */}
        {actions && (
          <div className="mt-4 flex items-center justify-center space-x-2" role="group" aria-label="Acciones del libro">
            {actions}
          </div>
        )}
      </div>
    </article>
  );
};

export default BookCard;
