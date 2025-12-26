import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import AdminNavigation from "../../components/AdminNavigation";
import { apiClient } from "../../utils/api-client";
import { Modal } from "../../components/Modal/modal";
import Button from "../../components/Button";

export const adminAuthorsLoader = async () => {
  const res = await apiClient.call("authors");
  if (res && typeof res === "object" && "error" in (res as any)) {
    return { authors: [] };
  }
  return { authors: res as any[] };
};

interface AuthorFormData {
  name: string;
  biography: string;
}

const AdminAuthorsPage = () => {
  const { authors } = useLoaderData() as { authors: any[] };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState<AuthorFormData>({
    name: "",
    biography: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      biography: "",
    });
    setEditingAuthor(null);
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (author: any) => {
    setEditingAuthor(author);
    setFormData({
      name: author.name || "",
      biography: author.biography || "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      let result;
      if (editingAuthor) {
        // Para autores, no hay endpoint de update, así que mostramos mensaje
        setMessage("La edición de autores no está implementada en el backend");
        return;
      } else {
        result = await apiClient.call("authors", {
          ...formData,
          _method: "POST",
        });
      }

      if (result && typeof result === "object" && "error" in result) {
        setMessage(result.error);
      } else {
        setMessage("Autor creado exitosamente!");
        setIsModalOpen(false);
        resetForm();
        // Recargar la página para ver los cambios
        window.location.reload();
      }
    } catch (error) {
      setMessage("Error al guardar el autor");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (authorId: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este autor?")) return;

    try {
      const result = await apiClient.call(`authors/${authorId}`, {
        _method: "DELETE",
      });
      if (result && typeof result === "object" && "error" in result) {
        alert(result.error);
      } else {
        alert("Autor eliminado exitosamente!");
        window.location.reload();
      }
    } catch (error) {
      alert("Error al eliminar el autor");
    }
  };

  return (
    <MainLayout>
      <AdminNavigation />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Administración de Autores</h1>
          <div className="flex gap-4">
            <Button
              onClick={openCreateModal}
              className="bg-emerald-600 text-white"
            >
              Agregar Autor
            </Button>
            <a
              href="/admin/books"
              className="text-sm text-emerald-600 hover:underline"
            >
              Administrar Libros
            </a>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Biografía
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {authors.map((author) => (
                <tr key={author.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {author.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 max-w-xs truncate">
                      {author.biography}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => openEditModal(author)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                      disabled
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(author.id)}
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
          title={editingAuthor ? "Editar Autor" : "Crear Nuevo Autor"}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Biografía
              </label>
              <textarea
                value={formData.biography}
                onChange={(e) =>
                  setFormData({ ...formData, biography: e.target.value })
                }
                rows={4}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            {message && (
              <p
                className={`text-sm ${message.includes("exitosamente") || message.includes("implementada") ? "text-blue-600" : "text-red-600"}`}
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
                  : editingAuthor
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

export default AdminAuthorsPage;
