import React from "react";
import { Badge, Divider } from "../ui";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  availableCopies: number;
  imageUrl?: string;
  description?: string;
}

const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  author,
  availableCopies,
  imageUrl,
  description,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-subtle overflow-hidden transition-all duration-200 hover:shadow-medium hover:scale-105 border border-neutral-200">
      {imageUrl && (
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      )}
      <div className="p-lg">
        <h3 className="text-heading-md font-bold text-neutral-900 mb-2">
          {title}
        </h3>
        <p className="text-body-sm text-neutral-600 mb-3">{author}</p>
        {description && (
          <p className="text-body-sm text-neutral-700 mb-3 line-clamp-3">
            {description}
          </p>
        )}
        <Divider />
        <div className="flex items-center justify-between mt-lg">
          {availableCopies > 0 ? (
            <Badge variant="success">Disponible</Badge>
          ) : (
            <Badge variant="error">Agotado</Badge>
          )}
          <button
            className="bg-primary text-primary-foreground px-md py-sm rounded-base hover:bg-primary/90 hover:shadow-subtle transition-all duration-200 text-body-sm font-medium"
            onClick={() => (window.location.href = `/books/${id}`)}
          >
            Ver detalles
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
