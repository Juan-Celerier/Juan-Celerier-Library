import React from "react";
import { Star, ShoppingCart, Heart, Trash2 } from "lucide-react";
import { BookCardSkeleton } from "../ui";

export interface AdvancedBookCardProps {
  id: string;
  title: string;
  author: string;
  image?: string;
  rating?: number;
  availableCopies: number;
  price?: number;
  isFavorite?: boolean;
  onAddToCart?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
  onViewDetails?: (id: string) => void;
  onDelete?: (id: string) => void;
}

/**
 * Tarjeta de libro mejorada con más interacciones
 */
export const AdvancedBookCard: React.FC<AdvancedBookCardProps> = ({
  id,
  title,
  author,
  image,
  rating,
  availableCopies,
  price,
  isFavorite = false,
  onAddToCart,
  onToggleFavorite,
  onViewDetails,
  onDelete,
}) => {
  const isAvailable = availableCopies > 0;

  return (
    <div className="group relative h-full overflow-hidden rounded-lg bg-white border border-neutral-200 shadow-subtle transition-all duration-300 hover:shadow-lg hover:border-primary/50">
      {/* Imagen Container */}
      <div className="relative h-48 overflow-hidden bg-neutral-100">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200">
            <div className="h-16 w-12 rounded bg-neutral-300 opacity-50" />
          </div>
        )}

        {/* Overlay con acciones */}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
          <button
            onClick={() => onViewDetails?.(id)}
            className="px-lg py-md bg-primary text-primary-foreground text-body-sm font-medium rounded-base shadow-lg hover:bg-primary/90 transition-all duration-200 hover:scale-105"
          >
            Ver detalles
          </button>
        </div>

        {/* Badge Disponibilidad */}
        <div
          className={`absolute top-2 left-2 px-md py-sm rounded-full text-xs font-semibold ${
            isAvailable
              ? "bg-success/20 text-success"
              : "bg-error/20 text-error"
          }`}
        >
          {isAvailable ? "Disponible" : "Agotado"}
        </div>

        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <button
            onClick={() => onToggleFavorite?.(id)}
            className="p-2 rounded-lg bg-white/90 hover:bg-white shadow-subtle transition-all hover:shadow-md"
            aria-label={
              isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"
            }
          >
            <Heart
              className={`h-5 w-5 transition-colors ${
                isFavorite ? "fill-error text-error" : "text-neutral-400"
              }`}
            />
          </button>
          {onDelete && (
            <button
              onClick={() => onDelete(id)}
              className="p-2 rounded-lg bg-white/90 hover:bg-white shadow-subtle transition-all hover:shadow-md"
              aria-label="Eliminar libro"
            >
              <Trash2 className="h-5 w-5 text-neutral-400 hover:text-error transition-colors" />
            </button>
          )}
        </div>
      </div>

      {/* Contenido */}
      <div className="flex flex-col p-lg">
        {/* Título y Autor */}
        <h3 className="font-semibold text-heading-sm text-neutral-900 line-clamp-2 group-hover:text-primary transition-colors mb-sm">
          {title}
        </h3>

        <p className="text-body-sm text-neutral-600 mb-md line-clamp-1">
          {author}
        </p>

        {/* Rating */}
        {rating && (
          <div className="flex items-center gap-sm mb-md">
            <div className="flex items-center gap-xs">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(rating)
                      ? "fill-warning text-warning"
                      : "text-neutral-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-body-sm text-neutral-500">({rating})</span>
          </div>
        )}

        {/* Precio y Disponibilidad */}
        <div className="flex items-center justify-between pt-md border-t border-neutral-200">
          <div>
            {price && (
              <p className="text-body-sm text-neutral-600">
                ${price.toFixed(2)}
              </p>
            )}
            <p className="text-body-sm font-medium text-neutral-600">
              {availableCopies} copias
            </p>
          </div>

          <button
            onClick={() => onAddToCart?.(id)}
            disabled={!isAvailable}
            className={`p-2 rounded-lg transition-all ${
              isAvailable
                ? "bg-primary/10 hover:bg-primary text-primary hover:text-white hover:shadow-lg"
                : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
            }`}
            aria-label="Agregar al carrito"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Grid responsivo para mostrar múltiples tarjetas
 */
export interface BookGridProps {
  books: AdvancedBookCardProps[];
  isLoading?: boolean;
  onBookClick?: (id: string) => void;
  className?: string;
}

export const BookGrid: React.FC<BookGridProps> = ({
  books,
  isLoading,
  onBookClick,
  className = "",
}) => {
  if (isLoading) {
    return (
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg ${className}`}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <BookCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div
        className={`col-span-full flex items-center justify-center py-8xl text-center ${className}`}
      >
        <div>
          <p className="text-body-lg text-neutral-600">
            No hay libros para mostrar
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg ${className}`}
    >
      {books.map((book) => (
        <AdvancedBookCard
          key={book.id}
          {...book}
          onViewDetails={onBookClick ?? book.onViewDetails}
        />
      ))}
    </div>
  );
};
