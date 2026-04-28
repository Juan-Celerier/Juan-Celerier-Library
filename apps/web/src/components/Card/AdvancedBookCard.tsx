import React from "react";
import {
  Star,
  ShoppingCart,
  Heart,
  Trash2,
  BookOpen,
  ArrowRight,
  User,
} from "lucide-react";
import { BookCardSkeleton } from "../ui";

// --- Interfaces ---

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

export interface BookGridProps {
  books: AdvancedBookCardProps[];
  isLoading?: boolean;
  onBookClick?: (id: string) => void;
  className?: string;
}

// --- Componente: AdvancedBookCard ---

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
    <article className="group flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-neutral-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-neutral-200/60">
      {/* Portada con Acciones Flotantes */}
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-200">
            <BookOpen className="h-16 w-16 text-neutral-300/50" />
          </div>
        )}

        {/* Badges Superiores */}
        <div className="absolute inset-x-0 top-5 flex items-start justify-between px-5">
          <span
            className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md shadow-sm border border-white/20 ${
              isAvailable
                ? "bg-emerald-500/80 text-white"
                : "bg-rose-500/80 text-white"
            }`}
          >
            {isAvailable ? "● En Stock" : "○ Agotado"}
          </span>

          <div className="flex flex-col gap-2">
            {onToggleFavorite && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(id);
                }}
                className="h-11 w-11 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-neutral-600 shadow-md transition-all hover:scale-110 active:scale-90"
              >
                <Heart
                  className={`h-5 w-5 transition-colors ${isFavorite ? "fill-rose-500 text-rose-500" : "text-neutral-400"}`}
                />
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(id);
                }}
                className="h-11 w-11 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-rose-500 shadow-md transition-all hover:scale-110 active:scale-90"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Cuerpo de la Tarjeta */}
      <div className="flex flex-1 flex-col p-7">
        <div className="mb-5">
          <div className="flex items-center gap-3 mb-2">
            {rating && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-100">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span className="text-[12px] font-bold text-amber-700">
                  {rating.toFixed(1)}
                </span>
              </div>
            )}
            <span className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.2em]">
              Premium
            </span>
          </div>

          <h3
            className="text-xl font-bold text-neutral-900 line-clamp-1 group-hover:text-primary transition-colors cursor-pointer"
            onClick={() => onViewDetails?.(id)}
          >
            {title}
          </h3>
          <div className="flex items-center gap-2 mt-1.5 text-neutral-400">
            <User size={14} />
            <p className="text-sm font-semibold italic">{author}</p>
          </div>
        </div>

        {/* Footer: Precio y Botones de Acción */}
        <div className="mt-auto pt-6 border-t border-neutral-50 flex items-center justify-between">
          <div>
            {price !== undefined && (
              <p className="text-2xl font-black text-neutral-900 tracking-tight">
                ${price.toFixed(2)}
              </p>
            )}
            <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
              {availableCopies} {availableCopies === 1 ? "Unidad" : "Unidades"}
            </p>
          </div>

          <div className="flex gap-3">
            {onAddToCart && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(id);
                }}
                disabled={!isAvailable}
                className={`h-14 w-14 flex items-center justify-center rounded-[1.25rem] transition-all duration-300 ${
                  isAvailable
                    ? "bg-primary text-white shadow-xl shadow-primary/25 hover:scale-110 active:scale-95"
                    : "bg-neutral-100 text-neutral-300 cursor-not-allowed"
                }`}
              >
                <ShoppingCart className="h-6 w-6" />
              </button>
            )}

            {onViewDetails && (
              <button
                type="button"
                onClick={() => onViewDetails?.(id)}
                className="h-14 w-14 flex items-center justify-center rounded-[1.25rem] bg-neutral-50 text-neutral-400 hover:bg-neutral-900 hover:text-white transition-all duration-300 shadow-sm"
              >
                <ArrowRight className="h-6 w-6" />
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

// --- Componente: BookGrid ---

export const BookGrid: React.FC<BookGridProps> = ({
  books,
  isLoading,
  onBookClick,
  className = "",
}) => {
  if (isLoading) {
    return (
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-6 py-12 ${className}`}
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
        className={`flex flex-col items-center justify-center py-24 text-center ${className}`}
      >
        <div className="bg-neutral-50 p-8 rounded-full mb-6 border border-neutral-100">
          <BookOpen className="h-12 w-12 text-neutral-200" />
        </div>
        <h3 className="text-xl font-bold text-neutral-900">No hay libros</h3>
        <p className="text-neutral-500 mt-2 max-w-xs">
          Parece que no encontramos lo que buscas en nuestro catálogo actual.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-6 py-12 ${className}`}
    >
      {books.map((book) => (
        <AdvancedBookCard
          key={book.id}
          {...book}
          onViewDetails={book.onViewDetails ?? onBookClick}
        />
      ))}
    </div>
  );
};
