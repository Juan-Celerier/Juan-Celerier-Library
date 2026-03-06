import React, { useState } from "react";
import { useAuth } from "../../application/hooks/useAuth";

interface BookFormProps {
  onSubmit: (bookData: {
    title: string;
    author: string;
    description: string;
    imageUrl?: string;
  }) => void;
}

const BookForm: React.FC<BookFormProps> = ({ onSubmit }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    imageUrl: "",
  });
  const [bookId, setBookId] = useState<string | null>(null);
  const [borrowerId, setBorrowerId] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookId(e.target.value);
  };

  const handleBorrowerIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBorrowerId(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookId || !borrowerId) {
      return;
    }

    // Verificar si el usuario está autenticado
    if (!user?.id) {
      alert("Debes iniciar sesión para solicitar un préstamo");
      return;
    }

    // Continuar con la creación del
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Nuevo Libro</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="hidden"
          name="bookId"
          value={bookId || ""}
          onChange={handleBookIdChange}
        />
        <input
          type="hidden"
          name="borrowerId"
          value={borrowerId || ""}
          onChange={handleBorrowerIdChange}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Título
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Autor
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL de Imagen (opcional)
          </label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            onClick={() => console.log("Cancel")}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Crear Libro
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
