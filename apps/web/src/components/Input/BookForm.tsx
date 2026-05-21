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

  const [uploading, setUploading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- FUNCIÓN CLAVE: SUBIDA A MINIO ---
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append("image", file); // "image" debe coincidir con upload.single("image") en el backend

    try {
      const response = await fetch("http://localhost:3000/upload/image", {
        method: "POST", // DEBE SER POST
        body: data,
      });

      if (!response.ok) throw new Error("Error en la subida");

      const result = await response.json();

      if (result.success) {
        // Guardamos la URL que nos devolvió el UploadController (la de MinIO)
        setFormData((prev) => ({ ...prev, imageUrl: result.data }));
        alert("Imagen subida con éxito");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error al subir la imagen a MinIO");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
      alert("Debes iniciar sesión");
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Nuevo Libro</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ... (inputs de título, autor y descripción quedan igual) ... */}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Título
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Imagen del Libro (Subir a MinIO)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
          {uploading && (
            <p className="text-sm text-blue-500 mt-1">Subiendo archivo...</p>
          )}
          {formData.imageUrl && (
            <p className="text-sm text-green-600 mt-1">
              ✓ Imagen lista para guardar
            </p>
          )}
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="submit"
            disabled={uploading}
            className={`px-4 py-2 text-white rounded-md ${uploading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {uploading ? "Subiendo..." : "Crear Libro"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
