import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import MainLayout from "../../layouts/MainLayout";
import type { BookDTO } from "app-domain/dtos/dashboard";
import { apiClient } from "../../utils/api-client";
import { BookGrid } from "../../components/Card/AdvancedBookCard";
import { SearchBox } from "../../components/common/Search";
import Button from "../../components/Button";
import { Badge } from "../../ui/Badge";
import {
  NoDataState,
  NoSearchResultsState,
} from "../../components/ui/EmptyState";

const BooksPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [books, setBooks] = useState<BookDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
  );
  const [availabilityFilter, setAvailabilityFilter] = useState<
    "all" | "available" | "unavailable"
  >("all");
  const [sortBy, setSortBy] = useState<
    "title" | "author" | "newest" | "oldest"
  >("title");
  const [authorFilter, setAuthorFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const booksPerPage = 12;

  // Extraer autores únicos de los libros
  const uniqueAuthors = Array.from(
    new Set(
      books
        .map((book) => {
          if (typeof book.author === "string") return book.author;
          return (book.author as any)?.name || "";
        })
        .filter(Boolean),
    ),
  ).sort();

  // Actualizar searchTerm cuando cambie el parámetro de URL
  useEffect(() => {
    const searchFromUrl = searchParams.get("search") || "";
    setSearchTerm(searchFromUrl);
  }, [searchParams]);

  // Actualizar URL cuando cambie searchTerm
  useEffect(() => {
    if (searchTerm) {
      setSearchParams({ search: searchTerm });
    } else {
      setSearchParams({});
    }
  }, [searchTerm, setSearchParams]);

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
                .includes(searchTerm.toLowerCase()) ?? false)),
      );
    }

    // Filtro por autor
    if (authorFilter) {
      filtered = filtered.filter((book) => {
        const bookAuthor =
          typeof book.author === "string"
            ? book.author
            : (book.author as any)?.name || "";
        return bookAuthor === authorFilter;
      });
    }

    // Filtro de disponibilidad
    if (availabilityFilter === "available") {
      filtered = filtered.filter((book) => (book.availableCopies ?? 0) > 0);
    } else if (availabilityFilter === "unavailable") {
      filtered = filtered.filter((book) => (book.availableCopies ?? 0) <= 0);
    }

    // Ordenamiento
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "title":
          return (a.title || "").localeCompare(b.title || "");
        case "author": {
          const authorA =
            typeof a.author === "string"
              ? a.author
              : (a.author as any)?.name || "";
          const authorB =
            typeof b.author === "string"
              ? b.author
              : (b.author as any)?.name || "";
          return authorA.localeCompare(authorB);
        }
        case "newest":
          // Asumiendo que no tenemos fecha, ordenamos por ID descendente
          return parseInt(b.id || "0") - parseInt(a.id || "0");
        case "oldest":
          // Asumiendo que no tenemos fecha, ordenamos por ID ascendente
          return parseInt(a.id || "0") - parseInt(b.id || "0");
        default:
          return 0;
      }
    });

    return filtered;
  }, [books, searchTerm, authorFilter, availabilityFilter, sortBy]);

  // Paginación
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setAuthorFilter("");
    setAvailabilityFilter("all");
    setSortBy("title");
    setCurrentPage(1);
  };

  const handleBookClick = (bookId: string) => {
    navigate(`/books/${bookId}`);
  };

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

            {/* Filtros avanzados */}
            <div className="flex flex-wrap gap-3 items-end">
              {/* Filtro por autor */}
              <div className="min-w-[150px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Autor
                </label>
                <select
                  value={authorFilter}
                  onChange={(e) => setAuthorFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="">Todos los autores</option>
                  {uniqueAuthors.map((author) => (
                    <option key={author} value={author}>
                      {author}
                    </option>
                  ))}
                </select>
              </div>

              {/* Ordenar por */}
              <div className="min-w-[150px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ordenar por
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="title">Título A-Z</option>
                  <option value="author">Autor A-Z</option>
                  <option value="newest">Más recientes</option>
                  <option value="oldest">Más antiguos</option>
                </select>
              </div>

              {/* Filtros de disponibilidad */}
              <div className="flex gap-2">
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
          </div>

          {/* Información de filtros aplicados */}
          {(searchTerm || authorFilter || availabilityFilter !== "all") && (
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                <span>
                  Mostrando {paginatedBooks.length} de {filteredBooks.length}{" "}
                  libros
                </span>
                {searchTerm && (
                  <Badge variant="secondary">Búsqueda: "{searchTerm}"</Badge>
                )}
                {authorFilter && (
                  <Badge variant="secondary">Autor: {authorFilter}</Badge>
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
        {paginatedBooks.length === 0 && !loading ? (
          searchTerm ? (
            <NoSearchResultsState
              searchTerm={searchTerm}
              onReset={clearFilters}
            />
          ) : (
            <NoDataState message="No hay libros que coincidan con los filtros actuales." />
          )
        ) : (
          <>
            {/* Grid de libros */}
            <BookGrid
              isLoading={loading}
              books={paginatedBooks.map((book) => ({
                id: book.id!,
                title: book.title!,
                author:
                  typeof book.author === "string"
                    ? book.author
                    : (book.author as any)?.name || "N/A",
                availableCopies: book.availableCopies!,
                image: book.imageUrl,
              }))}
              onBookClick={handleBookClick}
            />

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
