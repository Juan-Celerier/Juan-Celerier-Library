import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import AdminNavigation from "../../components/AdminNavigation";
import { apiClient } from "../../utils/api-client";
import { Modal } from "../../components/Modal/modal";
import Button from "../../components/Button";
import { CategoryCard } from "../../components/Card/category-card";

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

export const AdminCategoriesPage = () => {
  const { categories: initialCategories } = useLoaderData() as {
    categories: any[];
  };
  const [categories, setCategories] = useState(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<any | null>(null);
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

  const openDeleteModal = (category: any) => {
    setDeletingCategory(category);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeletingCategory(null);
    setIsDeleteModalOpen(false);
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
        if (result && typeof result === "object" && "error" in result) {
          setMessage(result.error);
        } else {
          setCategories(
            categories.map((cat) =>
              cat.id === editingCategory.id ? { ...cat, ...formData } : cat,
            ),
          );
          setMessage("Categoría actualizada exitosamente!");
          setIsModalOpen(false);
          resetForm();
        }
      } else {
        result = await apiClient.call("categories", {
          ...formData,
          _method: "POST",
        });

        if (result && typeof result === "object" && "error" in result) {
          setMessage(result.error);
        } else {
          setCategories([...categories, result]);
          setMessage("Categoría creada exitosamente!");
          setIsModalOpen(false);
          resetForm();
        }
      }
    } catch (error) {
      setMessage("Error al guardar la categoría");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingCategory) return;
    setIsSubmitting(true);
    setMessage("");

    try {
      const result = await apiClient.call(`categories/${deletingCategory.id}`, {
        _method: "DELETE",
      });

      if (result && typeof result === "object" && "error" in result) {
        setMessage(result.error);
      } else {
        setCategories(
          categories.filter((cat) => cat.id !== deletingCategory.id),
        );
        setMessage("Categoría eliminada exitosamente!");
        closeDeleteModal();
      }
    } catch (error) {
      setMessage("Error al eliminar la categoría");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ... (keep the existing code until the return statement)

  return (
    <MainLayout>
      <AdminNavigation />
      <div className="space-y-xl">
        <div className="flex items-center justify-between">
          <h1 className="text-heading-lg font-bold text-neutral-900">
            Administración de Categorías
          </h1>
          <div className="flex gap-lg">
            <Button
              onClick={openCreateModal}
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-subtle hover:shadow-medium transition-all duration-200"
            >
              Agregar Categoría
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-lg">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              name={category.name}
              description={category.description}
              onClick={() => openEditModal(category)}
              onDelete={() => openDeleteModal(category)}
            />
          ))}
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingCategory ? "Editar Categoría" : "Crear Nueva Categoría"}
        >
          <form onSubmit={handleSubmit} className="space-y-lg">
            <div>
              <label className="block text-body-sm font-medium text-neutral-900 mb-sm">
                Nombre
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="block w-full border border-neutral-300 rounded-base shadow-sm px-md py-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-body-sm"
              />
            </div>

            <div>
              <label className="block text-body-sm font-medium text-neutral-900 mb-sm">
                Descripción
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className="block w-full border border-neutral-300 rounded-base shadow-sm px-md py-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-body-sm"
              />
            </div>

            {message && (
              <p
                className={`text-body-sm ${
                  message.includes("exitosamente")
                    ? "text-success"
                    : "text-error"
                }`}
              >
                {message}
              </p>
            )}

            <div className="flex justify-end gap-lg pt-lg">
              <Button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="bg-neutral-300 text-neutral-900 hover:bg-neutral-400 transition-all duration-200"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 shadow-subtle hover:shadow-medium transition-all duration-200"
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

        {/* Delete Confirmation Modal */}
        <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} title={""}>
          <div className="space-y-lg">
            <h2 className="text-heading-md font-bold text-neutral-900">
              Confirmar Eliminación
            </h2>
            <p className="text-body-md text-neutral-700">
              ¿Estás seguro de que quieres eliminar la categoría "
              {deletingCategory?.name}"? Esta acción no se puede deshacer.
            </p>
            {message && (
              <p
                className={`text-body-sm ${
                  message.includes("exitosamente")
                    ? "text-success"
                    : "text-error"
                }`}
              >
                {message}
              </p>
            )}
            <div className="flex justify-end gap-lg pt-lg">
              <Button
                type="button"
                onClick={closeDeleteModal}
                className="bg-neutral-300 text-neutral-900 hover:bg-neutral-400 transition-all duration-200"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleDelete}
                disabled={isSubmitting}
                className="bg-error text-white hover:bg-error/90 disabled:opacity-50 shadow-subtle hover:shadow-medium transition-all duration-200"
              >
                {isSubmitting ? "Eliminando..." : "Eliminar"}
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </MainLayout>
  );
};
