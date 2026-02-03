import React from "react";

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
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {imageUrl && (
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-3">{author}</p>
        {description && (
          <p className="text-gray-700 text-sm mb-3 line-clamp-3">
            {description}
          </p>
        )}
        <div className="flex items-center justify-between mt-4">
          <span className="text-green-600 font-semibold">
            {availableCopies} disponibles
          </span>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
