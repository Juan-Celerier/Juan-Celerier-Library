import { useState } from "react";
import { useLoaderData, Link, useRevalidator } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import AdminNavigation from "../../components/AdminNavigation";
import type { BookDTO } from "app-domain/dtos/dashboard";
import { apiClient } from "../../utils/api-client";
import { Modal } from "../../components/Modal/modal";
import Button from "../../components/Button";

import { BookGrid } from "../../components/Card/AdvancedBookCard";

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
  const { books: initialBooks } = useLoaderData() as { books: BookDTO[] };
  const [books, setBooks] = useState(initialBooks);
  const revalidator = useRevalidator();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<BookDTO | null>(null);
  const [deletingBook, setDeletingBook] = useState<BookDTO | null>(null);
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

  const openDeleteModal = (bookId: string) => {
    const book = books.find((b) => b.id === bookId);
    if (book) {
      setDeletingBook(book);
      setIsDeleteModalOpen(true);
    }
  };

  const closeDeleteModal = () => {
    setDeletingBook(null);
    setIsDeleteModalOpen(false);
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
        revalidator.revalidate();
      }
    } catch (error) {
      setMessage("Error al guardar el libro");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingBook) return;
    setIsSubmitting(true);
    setMessage("");

    try {
      const result = await apiClient.call(`books/${deletingBook.id}`, {
        _method: "DELETE",
      });

      if (result && typeof result === "object" && "error" in result) {
        setMessage(result.error);
      } else {
        setBooks(books.filter((b) => b.id !== deletingBook.id));
        setMessage("Libro eliminado exitosamente!");
        closeDeleteModal();
      }
    } catch (error) {
      setMessage("Error al eliminar el libro");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBookClick = (bookId: string) => {
    const book = books.find((b) => b.id === bookId);
    if (book) {
      openEditModal(book);
    }
  };

  return (
    <MainLayout>
      <AdminNavigation />
      <div className="space-y-xl">
        <div className="flex items-center justify-between">
          <h1 className="text-heading-lg font-bold text-neutral-900">
            Administración de Libros
          </h1>
          <div className="flex gap-lg">
            <Button
              onClick={openCreateModal}
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-subtle hover:shadow-medium transition-all duration-200"
            >
              Agregar Libro
            </Button>
            <Link
              to="/books"
              className="text-body-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200 hover:underline"
            >
              Ver Catálogo Público
            </Link>
          </div>
        </div>

        <BookGrid
          books={books.map((book) => ({
            id: book.id!,
            title: book.title!,
            author:
              typeof book.author === "string"
                ? book.author
                : (book.author as any)?.name || "N/A",
            availableCopies: book.availableCopies!,
            image: book.imageUrl,
            onViewDetails: () => handleBookClick(book.id!),
            onDelete: () => openDeleteModal(book.id!),
          }))}
          onBookClick={handleBookClick}
        />

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingBook ? "Editar Libro" : "Crear Nuevo Libro"}
        >
          <form onSubmit={handleSubmit} className="space-y-lg">
            {/* Form fields... */}
            <div>
              <label className="block text-body-sm font-medium text-neutral-900 mb-sm">
                Título
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="block w-full border border-neutral-300 rounded-base shadow-sm px-md py-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-body-sm"
              />
            </div>

            <div>
              <label className="block text-body-sm font-medium text-neutral-900 mb-sm">
                Autor
              </label>
              <input
                type="text"
                required
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
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

            <div>
              <label className="block text-body-sm font-medium text-neutral-900 mb-sm">
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
                className="block w-full border border-neutral-300 rounded-base shadow-sm px-md py-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-body-sm"
              />
            </div>

            <div>
              <label className="block text-body-sm font-medium text-neutral-900 mb-sm">
                URL de Imagen
              </label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
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
                  : editingBook
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
              ¿Estás seguro de que quieres eliminar el libro "
              {deletingBook?.title}"? Esta acción no se puede deshacer.
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

export default AdminBooksPage;
