import { useState } from "react";
import { useLoaderData, useRevalidator } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import AdminNavigation from "../../components/AdminNavigation";
import { apiClient } from "../../utils/api-client";
import { Modal } from "../../components/Modal/modal";
import Button from "../../components/Button";

export const adminPublishersLoader = async () => {
  const res = await apiClient.call("publishers");
  if (res && typeof res === "object" && "error" in (res as any)) {
    return { publishers: [] };
  }
  return { publishers: res as any[] };
};

interface PublisherFormData {
  name: string;
  address: string;
  phone: string;
  email: string;
}

const AdminPublishersPage = () => {
  const { publishers: initialPublishers } = useLoaderData() as {
    publishers: any[];
  };
  const [publishers, setPublishers] = useState(initialPublishers);
  const revalidator = useRevalidator();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingPublisher, setEditingPublisher] = useState<any | null>(null);
  const [deletingPublisher, setDeletingPublisher] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState<PublisherFormData>({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      address: "",
      phone: "",
      email: "",
    });
    setEditingPublisher(null);
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (publisher: any) => {
    setEditingPublisher(publisher);
    setFormData({
      name: publisher.name || "",
      address: publisher.address || "",
      phone: publisher.phone || "",
      email: publisher.email || "",
    });
    setIsModalOpen(true);
  };

  const openDeleteModal = (publisher: any) => {
    setDeletingPublisher(publisher);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeletingPublisher(null);
    setIsDeleteModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      let result;
      if (editingPublisher) {
        result = await apiClient.call(`publishers/${editingPublisher.id}`, {
          ...formData,
          _method: "PUT",
        });
      } else {
        result = await apiClient.call("publishers", {
          ...formData,
          _method: "POST",
        });
      }

      if (result && typeof result === "object" && "error" in result) {
        setMessage(result.error);
      } else {
        setMessage(
          editingPublisher
            ? "Editor actualizado exitosamente!"
            : "Editor creado exitosamente!",
        );
        setIsModalOpen(false);
        resetForm();
        revalidator.revalidate();
      }
    } catch (error) {
      setMessage("Error al guardar el editor");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingPublisher) return;
    setIsSubmitting(true);
    setMessage("");
    try {
      const result = await apiClient.call(
        `publishers/${deletingPublisher.id}`,
        {
          _method: "DELETE",
        },
      );
      if (result && typeof result === "object" && "error" in result) {
        setMessage(result.error);
      } else {
        setPublishers(publishers.filter((p) => p.id !== deletingPublisher.id));
        setMessage("Editor eliminado exitosamente!");
        closeDeleteModal();
      }
    } catch (error) {
      setMessage("Error al eliminar el editor");
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
            Administración de Editores
          </h1>
          <div className="flex gap-lg">
            <Button
              onClick={openCreateModal}
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-subtle hover:shadow-medium transition-all duration-200"
            >
              Agregar Editor
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-medium border border-neutral-200 overflow-hidden">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-lg py-md text-left caption font-medium text-neutral-600 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-lg py-md text-left caption font-medium text-neutral-600 uppercase tracking-wider">
                  Dirección
                </th>
                <th className="px-lg py-md text-left caption font-medium text-neutral-600 uppercase tracking-wider">
                  Teléfono
                </th>
                <th className="px-lg py-md text-left caption font-medium text-neutral-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-lg py-md text-left caption font-medium text-neutral-600 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {publishers.map((publisher) => (
                <tr
                  key={publisher.id}
                  className="hover:bg-neutral-50 transition-colors duration-150"
                >
                  <td className="px-lg py-md whitespace-nowrap">
                    <div className="text-body-sm font-medium text-neutral-900">
                      {publisher.name}
                    </div>
                  </td>
                  <td className="px-lg py-md whitespace-nowrap">
                    <div className="text-body-sm text-neutral-600">
                      {publisher.address}
                    </div>
                  </td>
                  <td className="px-lg py-md whitespace-nowrap">
                    <div className="text-body-sm text-neutral-600">
                      {publisher.phone}
                    </div>
                  </td>
                  <td className="px-lg py-md whitespace-nowrap">
                    <div className="text-body-sm text-neutral-600">
                      {publisher.email}
                    </div>
                  </td>
                  <td className="px-lg py-md whitespace-nowrap text-body-sm font-medium">
                    <button
                      onClick={() => openEditModal(publisher)}
                      className="text-primary hover:text-primary/80 font-medium mr-lg transition-colors duration-200"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => openDeleteModal(publisher)}
                      className="text-error hover:text-error/80 font-medium transition-colors duration-200"
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
          title={editingPublisher ? "Editar Editor" : "Crear Nuevo Editor"}
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
                Dirección
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="block w-full border border-neutral-300 rounded-base shadow-sm px-md py-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-body-sm"
              />
            </div>

            <div>
              <label className="block text-body-sm font-medium text-neutral-900 mb-sm">
                Teléfono
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="block w-full border border-neutral-300 rounded-base shadow-sm px-md py-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-body-sm"
              />
            </div>

            <div>
              <label className="block text-body-sm font-medium text-neutral-900 mb-sm">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
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
                  : editingPublisher
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
              ¿Estás seguro de que quieres eliminar al editor "
              {deletingPublisher?.name}"? Esta acción no se puede deshacer.
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
        </Modal>
      </div>
    </MainLayout>
  );
};

export default AdminPublishersPage;
