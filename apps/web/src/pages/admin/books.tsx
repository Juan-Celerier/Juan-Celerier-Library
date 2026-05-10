import { useState } from "react";
import { useLoaderData, useRevalidator } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import AdminNavigation from "../../components/AdminNavigation";
import type { BookDTO } from "app-domain/dtos/dashboard";
import { apiClient } from "../../utils/api-client";
import { Modal } from "../../components/Modal/modal";
import { BookGrid } from "../../components/Card/AdvancedBookCard";

import {
  Sparkles,
  Plus,
  Trash2,
  AlertCircle,
  BookText,
  UserCircle,
  AlignLeft,
  Layers,
  Image as ImageIcon,
} from "lucide-react";
import { ImageUpload } from "../../components/Input/ImageUpload";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const submitData = { ...formData, author: { name: formData.author } };
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
          editingBook ? "¡Libro actualizado!" : "¡Libro creado con éxito!",
        );
        setIsModalOpen(false);
        resetForm();
        revalidator.revalidate();
      }
    } catch (error) {
      setMessage("Error al procesar la solicitud.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingBook) return;
    setIsSubmitting(true);
    try {
      const result = await apiClient.call(`books/${deletingBook.id}`, {
        _method: "DELETE",
      });
      if (result && typeof result === "object" && "error" in result) {
        setMessage(result.error);
      } else {
        setBooks(books.filter((b) => b.id !== deletingBook.id));
        setMessage("Libro eliminado.");
        setIsDeleteModalOpen(false);
      }
    } catch (error) {
      setMessage("Error al eliminar.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <AdminNavigation />
      <div className="max-w-7xl mx-auto space-y-10 pb-20 px-6">
        {/* Header Section */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between pt-10">
          <div>
            <h1 className="text-5xl font-black text-neutral-900 tracking-tight">
              Inventario
            </h1>
            <p className="mt-2 text-neutral-500 font-medium italic">
              Gestión de activos de la biblioteca
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-[2rem] font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Plus size={22} /> Nuevo Libro
          </button>
        </div>

        {message && (
          <div className="p-5 rounded-[2.5rem] border bg-emerald-50 border-emerald-100 text-emerald-600 flex items-center gap-3 text-sm font-bold animate-in fade-in zoom-in duration-300">
            <AlertCircle size={20} /> {message}
          </div>
        )}

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
            onViewDetails: () => openEditModal(book),
            onDelete: () => openDeleteModal(book.id!),
          }))}
        />

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingBook ? "Editar Libro" : "Crear Nuevo Libro"}
        >
          <div className="w-[640px] max-w-full">
            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="px-10 py-10 space-y-10">
                {/* Visual Header */}
                <div className="flex items-center gap-5 p-6 rounded-[2.5rem] bg-gradient-to-r from-primary/5 to-transparent border border-primary/10">
                  <div className="h-14 w-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-primary shrink-0">
                    <Sparkles size={28} />
                  </div>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-primary leading-none mb-2">
                      {editingBook
                        ? "Editor de Inventario"
                        : "Registro de Libro"}
                    </p>
                    <p className="text-sm text-neutral-500 font-medium">
                      {editingBook
                        ? "Modifica los detalles del ejemplar seleccionado."
                        : "Ingresa los datos para añadir un nuevo título al catálogo."}
                    </p>
                  </div>
                </div>

                {/* Form Fields Grid */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-8">
                  <div className="col-span-2 sm:col-span-1">
                    <FormGroup label="Título" icon={<BookText size={18} />}>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        placeholder="Ej: El Aleph"
                        className="admin-field"
                      />
                    </FormGroup>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <FormGroup label="Autor" icon={<UserCircle size={18} />}>
                      <input
                        type="text"
                        required
                        value={formData.author}
                        onChange={(e) =>
                          setFormData({ ...formData, author: e.target.value })
                        }
                        placeholder="Ej: Jorge Luis Borges"
                        className="admin-field"
                      />
                    </FormGroup>
                  </div>

                  <div className="col-span-2">
                    <FormGroup label="Sinopsis" icon={<AlignLeft size={18} />}>
                      <textarea
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        rows={3}
                        placeholder="Breve resumen del contenido..."
                        className="admin-field resize-none py-4"
                      />
                    </FormGroup>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <FormGroup label="Ejemplares" icon={<Layers size={18} />}>
                      <input
                        type="number"
                        min="0"
                        required
                        value={formData.availableCopies}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            availableCopies: parseInt(e.target.value, 10),
                          })
                        }
                        className="admin-field font-black text-lg"
                      />
                    </FormGroup>
                  </div>

                  {/* Campo de Imagen con Upload a MinIO */}
                  <div className="col-span-2 sm:col-span-1">
                    <FormGroup
                      label="Portada del Libro"
                      icon={<ImageIcon size={18} />}
                    >
                      <ImageUpload
                        value={formData.imageUrl}
                        onChange={(url) =>
                          setFormData({ ...formData, imageUrl: url })
                        }
                      />
                    </FormGroup>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="px-10 py-8 bg-neutral-50/50 border-t border-neutral-100 flex justify-end items-center gap-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-xs font-black uppercase tracking-widest text-neutral-400 hover:text-neutral-900 transition-colors"
                >
                  Descartar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.imageUrl}
                  className="px-12 py-5 rounded-[1.5rem] bg-primary text-white font-black text-sm shadow-xl shadow-primary/25 hover:scale-[1.03] active:scale-[0.97] transition-all disabled:opacity-50"
                >
                  {isSubmitting
                    ? "Guardando..."
                    : editingBook
                      ? "Actualizar Datos"
                      : "Confirmar y Crear"}
                </button>
              </div>
            </form>
          </div>
        </Modal>

        {/* Modal de Eliminación */}
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title=""
        >
          <div className="w-[450px] p-12 text-center">
            <div className="h-20 w-20 rounded-[2.5rem] bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-8 border border-rose-100">
              <Trash2 size={36} />
            </div>
            <h2 className="text-3xl font-black text-neutral-900 tracking-tight">
              ¿Eliminar Libro?
            </h2>
            <p className="mt-4 text-neutral-500 font-medium leading-relaxed max-w-xs mx-auto">
              Esta acción es irreversible para{" "}
              <span className="text-neutral-900 font-bold">
                "{deletingBook?.title}"
              </span>
              .
            </p>
            <div className="grid grid-cols-2 gap-6 mt-12">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="py-4 rounded-2xl bg-neutral-50 text-neutral-500 font-bold hover:bg-neutral-100 transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="py-4 rounded-2xl bg-rose-500 text-white font-bold shadow-xl shadow-rose-200 hover:bg-rose-600 transition-all"
              >
                Confirmar
              </button>
            </div>
          </div>
        </Modal>
      </div>

      <style>{`
        .admin-field {
          display: block;
          width: 100%;
          border: 2px solid transparent;
          background-color: #f8fafc;
          border-radius: 1.25rem;
          padding: 1rem 1.25rem 1rem 3.25rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: #1e293b;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
        }
        .admin-field::placeholder { color: #cbd5e1; font-weight: 500; }
        .admin-field:focus {
          background-color: white;
          border-color: #3b82f6;
          box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1);
        }
        .admin-icon-wrapper {
          position: absolute;
          left: 1.25rem;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          transition: color 0.4s;
          pointer-events: none;
        }
        .group-focus-within .admin-icon-wrapper { color: #3b82f6; }
      `}</style>
    </MainLayout>
  );
};

const FormGroup = ({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="space-y-3 group-focus-within">
    <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] ml-2 block">
      {label}
    </label>
    <div className="relative">
      <div className="admin-icon-wrapper">{icon}</div>
      {children}
    </div>
  </div>
);

export default AdminBooksPage;
