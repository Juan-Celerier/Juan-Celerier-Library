import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import MainLayout from "../../layouts/MainLayout";
import type { BookDTO } from "app-domain/dtos/dashboard";
import { apiClient } from "../../utils/api-client";
import { BookCard } from "../../components/Card/Book-card";
import { SearchBox } from "../../components/common/Search";
import Button from "../../components/Button";
import { Badge } from "../../ui/Badge";

const BooksPage = () => {
  const [books, setBooks] = useState<BookDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState<
    "all" | "available" | "unavailable"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const booksPerPage = 12;

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiClient.call<BookDTO[]>("books");
        if (res && typeof res === "object" && "error" in (res as any)) {
          console.error("Error fetching books:", (res as any).error);
          setError((res as any).error);
          setBooks([]);
        } else {
          setBooks(res as BookDTO[]);
        }
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Error al cargar los libros");
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = useMemo(() => {
    let filtered = books;

    // Filtro de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (book) =>
          (book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ??
            false) ||
          (typeof book.author === "string"
            ? book.author.toLowerCase().includes(searchTerm.toLowerCase())
            : ((book.author as any)?.name
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ?? false))
      );
    }

    // Filtro de disponibilidad
    if (availabilityFilter === "available") {
      filtered = filtered.filter((book) => (book.availableCopies ?? 0) > 0);
    } else if (availabilityFilter === "unavailable") {
      filtered = filtered.filter((book) => (book.availableCopies ?? 0) <= 0);
    }

    return filtered;
  }, [books, searchTerm, availabilityFilter]);

  // Paginación
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setAvailabilityFilter("all");
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando catálogo de libros...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">❌</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Error al cargar los libros
          </h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-emerald-600 text-white"
          >
            Intentar nuevamente
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <header>
          <h1 className="text-3xl font-bold text-gray-900">
            Catálogo de libros
          </h1>
          <p className="text-gray-600 mt-1">
            Explora nuestra colección completa de libros disponibles
          </p>
        </header>

        {/* Filtros y búsqueda */}
        <div className="bg-white rounded-lg shadow-sm border p-6 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Búsqueda */}
            <div className="flex-grow">
              <SearchBox
                onSearchChange={setSearchTerm}
                placeholder="Buscar por título o autor..."
              />
            </div>

            {/* Filtros de disponibilidad */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setAvailabilityFilter("all")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  availabilityFilter === "all"
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Todos ({books.length})
              </button>
              <button
                onClick={() => setAvailabilityFilter("available")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  availabilityFilter === "available"
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Disponibles (
                {books.filter((b) => (b.availableCopies ?? 0) > 0).length})
              </button>
              <button
                onClick={() => setAvailabilityFilter("unavailable")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  availabilityFilter === "unavailable"
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                No disponibles (
                {books.filter((b) => (b.availableCopies ?? 0) <= 0).length})
              </button>
            </div>
          </div>

          {/* Información de filtros aplicados */}
          {(searchTerm || availabilityFilter !== "all") && (
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>
                  Mostrando {paginatedBooks.length} de {filteredBooks.length}{" "}
                  libros
                </span>
                {searchTerm && (
                  <Badge variant="secondary">Búsqueda: "{searchTerm}"</Badge>
                )}
                {availabilityFilter !== "all" && (
                  <Badge variant="secondary">
                    {availabilityFilter === "available"
                      ? "Disponibles"
                      : "No disponibles"}
                  </Badge>
                )}
              </div>
              <Button
                onClick={clearFilters}
                className="text-sm bg-gray-500 text-white"
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>

        {/* Resultados */}
        {paginatedBooks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filteredBooks.length === 0 && books.length === 0
                ? "No hay libros disponibles"
                : "No se encontraron libros"}
            </h3>
            <p className="text-gray-600 mb-6">
              {filteredBooks.length === 0 && books.length === 0
                ? "La biblioteca no tiene libros en este momento."
                : "Prueba ajustando tus filtros de búsqueda."}
            </p>
            {(searchTerm || availabilityFilter !== "all") && (
              <Button
                onClick={clearFilters}
                className="bg-emerald-600 text-white"
              >
                Ver todos los libros
              </Button>
            )}
          </div>
        ) : (
          <>
            {/* Grid de libros */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {paginatedBooks.map((book) => (
                <Link key={book.id} to={`/books/${book.id}`}>
                  <BookCard
                    title={book.title || "Sin título"}
                    author={
                      typeof book.author === "string"
                        ? book.author
                        : (book.author as any)?.name || "Autor desconocido"
                    }
                    isAvailable={Boolean(
                      book.availableCopies && book.availableCopies > 0
                    )}
                    imageUrl={book.imageUrl}
                  />
                </Link>
              ))}
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-8">
                <Button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="bg-gray-500 text-white disabled:opacity-50"
                >
                  Anterior
                </Button>

                <div className="flex gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum =
                      Math.max(1, Math.min(totalPages - 4, currentPage - 2)) +
                      i;
                    if (pageNum > totalPages) return null;

                    return (
                      <Button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`min-w-[40px] ${
                          pageNum === currentPage
                            ? "bg-emerald-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="bg-gray-500 text-white disabled:opacity-50"
                >
                  Siguiente
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default BooksPage;
