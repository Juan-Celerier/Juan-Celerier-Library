import { useState } from "react";
import { useLoaderData, useRevalidator } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import AdminNavigation from "../../components/AdminNavigation";
import { apiClient } from "../../utils/api-client";
import { Modal } from "../../components/Modal/modal";
import Button from "../../components/Button";

import { AuthorCard } from "../../components/Card/author-card";

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

export const AdminAuthorsPage = () => {
  const { authors } = useLoaderData() as { authors: any[] };
  const revalidator = useRevalidator();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<any | null>(null);
  const [deletingAuthor, setDeletingAuthor] = useState<any | null>(null);
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

  const openDeleteModal = (author: any) => {
    setDeletingAuthor(author);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeletingAuthor(null);
    setIsDeleteModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      let result;
      if (editingAuthor) {
        result = await apiClient.call(`authors/${editingAuthor.id}`, {
          ...formData,
          _method: "PUT",
        });
      } else {
        result = await apiClient.call("authors", {
          ...formData,
          _method: "POST",
        });
      }

      if (result && typeof result === "object" && "error" in result) {
        setMessage(result.error);
      } else {
        setMessage(
          editingAuthor
            ? "Autor actualizado exitosamente!"
            : "Autor creado exitosamente!",
        );
        setIsModalOpen(false);
        resetForm();
        revalidator.revalidate();
      }
    } catch (error) {
      setMessage("Error al guardar el autor");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingAuthor) return;
    setIsSubmitting(true);
    setMessage("");

    try {
      const result = await apiClient.call(`authors/${deletingAuthor.id}`, {
        _method: "DELETE",
      });

      if (result && typeof result === "object" && "error" in result) {
        setMessage(result.error);
      } else {
        setMessage("Autor eliminado exitosamente!");
        closeDeleteModal();
        revalidator.revalidate();
      }
    } catch (error) {
      setMessage("Error al eliminar el autor");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <AdminNavigation />
      <div className="space-y-xl">
        <div className="flex items-center justify-between">
          <h1 className="text-heading-lg font-bold text-neutral-900">
            Administración de Autores
          </h1>
          <div className="flex gap-lg">
            <Button
              onClick={openCreateModal}
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-subtle hover:shadow-medium transition-all duration-200"
            >
              Agregar Autor
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-lg">
          {authors.length > 0 ? (
            authors.map((author) => (
              <AuthorCard
                key={author.id}
                name={author.name}
                subtitle={author.biography}
                onClick={() => openEditModal(author)}
                onDelete={() => openDeleteModal(author)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-body-lg text-neutral-600">
                No se encontraron autores. ¡Agrega uno para comenzar!
              </p>
            </div>
          )}
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingAuthor ? "Editar Autor" : "Crear Nuevo Autor"}
        >
          <form onSubmit={handleSubmit} className="space-y-lg">
            <div>
              <label
                htmlFor="author-name"
                className="block text-body-sm font-medium text-neutral-900 mb-sm"
              >
                Nombre
              </label>
              <input
                id="author-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="block w-full border border-neutral-300 rounded-base shadow-sm px-md py-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-body-sm"
                placeholder="Nombre del autor"
              />
            </div>

            <div>
              <label
                htmlFor="author-biography"
                className="block text-body-sm font-medium text-neutral-900 mb-sm"
              >
                Biografía
              </label>
              <textarea
                id="author-biography"
                value={formData.biography}
                onChange={(e) =>
                  setFormData({ ...formData, biography: e.target.value })
                }
                rows={4}
                className="block w-full border border-neutral-300 rounded-base shadow-sm px-md py-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-body-sm"
                placeholder="Una breve biografía o descripción del autor"
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
                  : editingAuthor
                    ? "Actualizar"
                    : "Crear"}
              </Button>
            </div>
          </form>
        </Modal>
        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          title="Confirmar Eliminación"
        >
          <div className="space-y-lg">
            <p className="text-body-md text-neutral-700">
              ¿Estás seguro de que quieres eliminar al autor "
              {deletingAuthor?.name}"? Esta acción no se puede deshacer.
            </p>
            {message && <p className={`text-body-sm text-error`}>{message}</p>}
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
        </Modal>{" "}
      </div>
    </MainLayout>
  );
};
