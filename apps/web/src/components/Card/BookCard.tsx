import { Link } from "react-router-dom";
import React from "react";
import { Badge } from "../ui";
import { BookOpen, User, ArrowRight } from "lucide-react";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  availableCopies: number;
  imageUrl?: string;
  description?: string;
  genre?: string;
}

const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  author,
  availableCopies,
  imageUrl,
  genre,
}) => {
  const isAvailable = availableCopies > 0;

  return (
    <div className="group bg-white rounded-[2rem] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-neutral-200/50 border border-neutral-100 flex flex-col h-full hover:-translate-y-1">
      {/* Contenedor de Imagen con Badge flotante */}
      <div className="relative aspect-[4/5] overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-neutral-50 to-neutral-200 flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-neutral-300" />
          </div>
        )}

        {/* Status flotante sobre la imagen */}
        <div className="absolute top-4 left-4">
          <Badge
            variant={isAvailable ? "success" : "error"}
            className={`backdrop-blur-md bg-opacity-90 shadow-sm border-none py-1 px-3 rounded-full text-[10px] font-bold uppercase tracking-wider`}
          >
            {isAvailable ? "● Disponible" : "○ Agotado"}
          </Badge>
        </div>
      </div>

      {/* Cuerpo de la Tarjeta */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-4">
          {genre && (
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1 block">
              {genre}
            </span>
          )}
          <h3 className="font-bold text-base text-neutral-900 line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-1.5 mt-1 text-neutral-500">
            <User size={12} />
            <p className="text-xs font-medium">{author}</p>
          </div>
        </div>

        {/* Info de Copias */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-neutral-400 font-semibold uppercase">
              Stock
            </span>
            <span
              className={`text-xs font-bold ${isAvailable ? "text-neutral-700" : "text-red-400"}`}
            >
              {availableCopies} {availableCopies === 1 ? "unidad" : "unidades"}
            </span>
          </div>

          {/* Botón Minimalista */}
          <Link
            to={`/books/${id}`}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-neutral-50 text-neutral-400 group-hover:bg-primary group-hover:text-white transition-all duration-300"
          >
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
