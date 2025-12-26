import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import AdminNavigation from "../../components/AdminNavigation";
import { apiClient } from "../../utils/api-client";
import { Modal } from "../../components/Modal/modal";
import Button from "../../components/Button";

export const adminCategoriesLoader = async () => {
  const res = await apiClient.call("categories");
  if (res && typeof res === "object" && "error" in (res as any)) {
    return { categories: [] };
  }
  return { categories: res as any[] };
};

interface CategoryFormData {
  name: string;
  description: string;
}

const AdminCategoriesPage = () => {
  const { categories } = useLoaderData() as { categories: any[] };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    description: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
    });
    setEditingCategory(null);
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (category: any) => {
    setEditingCategory(category);
    setFormData({
      name: category.name || "",
      description: category.description || "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      let result;
      if (editingCategory) {
        result = await apiClient.call(`categories/${editingCategory.id}`, {
          ...formData,
          _method: "PUT",
        });
      } else {
        result = await apiClient.call("categories", {
          ...formData,
          _method: "POST",
        });
      }

      if (result && typeof result === "object" && "error" in result) {
        setMessage(result.error);
      } else {
        setMessage(
          editingCategory
            ? "Categoría actualizada exitosamente!"
            : "Categoría creada exitosamente!"
        );
        setIsModalOpen(false);
        resetForm();
        // Recargar la página para ver los cambios
        window.location.reload();
      }
    } catch (error) {
      setMessage("Error al guardar la categoría");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (categoryId: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta categoría?"))
      return;

    try {
      const result = await apiClient.call(`categories/${categoryId}`, {
        _method: "DELETE",
      });
      if (result && typeof result === "object" && "error" in result) {
        alert(result.error);
      } else {
        alert("Categoría eliminada exitosamente!");
        window.location.reload();
      }
    } catch (error) {
      alert("Error al eliminar la categoría");
    }
  };

  return (
    <MainLayout>
      <AdminNavigation />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Administración de Categorías</h1>
          <div className="flex gap-4">
            <Button
              onClick={openCreateModal}
              className="bg-emerald-600 text-white"
            >
              Agregar Categoría
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
                  Descripción
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {category.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {category.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => openEditModal(category)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
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
          title={editingCategory ? "Editar Categoría" : "Crear Nueva Categoría"}
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
                  : editingCategory
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

export default AdminCategoriesPage;
