import { useState } from "react";
import { useLoaderData, Link, useRevalidator } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import AdminNavigation from "../../components/AdminNavigation";
import type { BookDTO } from "app-domain/dtos/dashboard";
import { apiClient } from "../../utils/api-client";
import { Modal } from "../../components/Modal/modal";
import Button from "../../components/Button";

export const adminBooksLoader = async () => {
  const res = await apiClient.call<BookDTO[]>("books");
  if (res && typeof res === "object" && "error" in (res as any)) {
    return { books: [] };
  }
  return { books: res as BookDTO[] };
};

interface BookFormData {
  title: string;
  author: string;
  description: string;
  availableCopies: number;
  imageUrl: string;
}

const AdminBooksPage = () => {
  const { books } = useLoaderData() as { books: BookDTO[] };
  const revalidator = useRevalidator();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<BookDTO | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState<BookFormData>({
    title: "",
    author: "",
    description: "",
    availableCopies: 1,
    imageUrl: "",
  });

  const resetForm = () => {
    setFormData({
      title: "",
      author: "",
      description: "",
      availableCopies: 1,
      imageUrl: "",
    });
    setEditingBook(null);
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (book: BookDTO) => {
    setEditingBook(book);
    setFormData({
      title: book.title || "",
      author:
        typeof book.author === "string"
          ? book.author
          : (book.author as any)?.name || "",
      description: book.description || "",
      availableCopies: book.availableCopies || 1,
      imageUrl: book.imageUrl || "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const submitData = {
        ...formData,
        author: { name: formData.author }, // Adaptar al formato esperado por la API
      };

      let result;
      if (editingBook) {
        result = await apiClient.call(`books/${editingBook.id}`, {
          ...submitData,
          _method: "PUT",
        });
      } else {
        result = await apiClient.call("books", {
          ...submitData,
          _method: "POST",
        });
      }

      if (result && typeof result === "object" && "error" in result) {
        setMessage(result.error);
      } else {
        setMessage(
          editingBook
            ? "Libro actualizado exitosamente!"
            : "Libro creado exitosamente!",
        );
        setIsModalOpen(false);
        resetForm();
        // Recargar los datos del loader para ver los cambios
        revalidator.revalidate();
      }
    } catch (error) {
      setMessage("Error al guardar el libro");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (bookId: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este libro?")) return;

    try {
      const result = await apiClient.call(`books/${bookId}`, {
        _method: "DELETE",
      });
      if (result && typeof result === "object" && "error" in result) {
        alert(result.error);
      } else {
        alert("Libro eliminado exitosamente!");
        revalidator.revalidate();
      }
    } catch (error) {
      alert("Error al eliminar el libro");
    }
  };

  return (
    <MainLayout>
      <AdminNavigation />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Administración de Libros</h1>
          <div className="flex gap-4">
            <Button
              onClick={openCreateModal}
              className="bg-emerald-600 text-white"
            >
              Agregar Libro
            </Button>
            <Link
              to="/books"
              className="text-sm text-emerald-600 hover:underline"
            >
              Ver Catálogo Público
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Título
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Autor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Copias Disponibles
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {books.map((book) => (
                <tr key={book.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {book.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {typeof book.author === "string"
                        ? book.author
                        : (book.author as any)?.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {book.availableCopies}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => openEditModal(book)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(book.id!)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingBook ? "Editar Libro" : "Crear Nuevo Libro"}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Título
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Autor
              </label>
              <input
                type="text"
                required
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Descripción
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Copias Disponibles
              </label>
              <input
                type="number"
                min="0"
                required
                value={formData.availableCopies}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    availableCopies: parseInt(e.target.value),
                  })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                URL de Imagen
              </label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            {message && (
              <p
                className={`text-sm ${message.includes("exitosamente") ? "text-green-600" : "text-red-600"}`}
              >
                {message}
              </p>
            )}

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-emerald-600 text-white disabled:opacity-50"
              >
                {isSubmitting
                  ? "Guardando..."
                  : editingBook
                    ? "Actualizar"
                    : "Crear"}
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </MainLayout>
  );
};

export default AdminBooksPage;
