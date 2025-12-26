import { useState } from "react";
import { useLoaderData } from "react-router-dom";
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
  const { publishers } = useLoaderData() as { publishers: any[] };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPublisher, setEditingPublisher] = useState<any | null>(null);
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
            : "Editor creado exitosamente!"
        );
        setIsModalOpen(false);
        resetForm();
        // Recargar la página para ver los cambios
        window.location.reload();
      }
    } catch (error) {
      setMessage("Error al guardar el editor");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (publisherId: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este editor?")) return;

    try {
      const result = await apiClient.call(`publishers/${publisherId}`, {
        _method: "DELETE",
      });
      if (result && typeof result === "object" && "error" in result) {
        alert(result.error);
      } else {
        alert("Editor eliminado exitosamente!");
        window.location.reload();
      }
    } catch (error) {
      alert("Error al eliminar el editor");
    }
  };

  return (
    <MainLayout>
      <AdminNavigation />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Administración de Editores</h1>
          <div className="flex gap-4">
            <Button
              onClick={openCreateModal}
              className="bg-emerald-600 text-white"
            >
              Agregar Editor
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
                  Dirección
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teléfono
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {publishers.map((publisher) => (
                <tr key={publisher.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {publisher.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {publisher.address}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {publisher.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {publisher.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => openEditModal(publisher)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(publisher.id)}
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
          title={editingPublisher ? "Editar Editor" : "Crear Nuevo Editor"}
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
                Dirección
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Teléfono
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
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
                  : editingPublisher
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

export default AdminPublishersPage;
