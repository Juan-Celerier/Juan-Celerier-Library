import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import { BookGrid } from "../../components/Card/AdvancedBookCard";
import Button from "../../components/Button";
import {
  NoDataState,
  NoSearchResultsState,
} from "../../components/ui/EmptyState";
import { BookFilters } from "../../components/books/BookFilters";
import { Pagination } from "../../components/books/Pagination";
import { useBooksPage } from "../../application/hooks/useBooksPage";

const BooksPage = () => {
  const navigate = useNavigate();
  const {
    loading,
    error,
    searchTerm,
    availabilityFilter,
    sortBy,
    authorFilter,
    filteredBooks,
    paginatedBooks,
    totalPages,
    currentPage,
    uniqueAuthors,
    availableBooksCount,
    unavailableBooksCount,
    setSearchTerm,
    setAvailabilityFilter,
    setSortBy,
    setAuthorFilter,
    handlePageChange,
    clearFilters,
  } = useBooksPage();

  const handleBookClick = (bookId: string) => {
    navigate(`/books/${bookId}`);
  };

  if (error) {
    return (
      <MainLayout>
        <div className="text-center py-16">
          <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <span className="text-4xl">❌</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Error al cargar los libros
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-primary hover:bg-primary/90"
          >
            Intentar nuevamente
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-10">
        <section className="rounded-[32px] border border-neutral-200 bg-white p-10 shadow-sm">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Catálogo
            </p>
            <h1 className="mt-4 text-4xl font-bold text-neutral-900">
              Explora nuestras colecciones
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-gray-600">
              Encuentra títulos nuevos, clásicos y favoritos con filtros claros
              y una búsqueda rápida.
            </p>
          </div>
        </section>

        <section className="rounded-[32px] border border-neutral-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">
                Filtra tu búsqueda
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Refina resultados por autor, disponibilidad y más.
              </p>
            </div>
            <div className="text-sm text-neutral-500">
              {filteredBooks.length} libro(s) encontrado(s)
            </div>
          </div>

          <div className="mt-8">
            <BookFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              authorFilter={authorFilter}
              onAuthorFilterChange={setAuthorFilter}
              availabilityFilter={availabilityFilter}
              onAvailabilityFilterChange={setAvailabilityFilter}
              sortBy={sortBy}
              onSortByChange={setSortBy}
              uniqueAuthors={uniqueAuthors}
              totalBooks={filteredBooks.length}
              availableBooksCount={availableBooksCount}
              unavailableBooksCount={unavailableBooksCount}
              filteredBooksCount={filteredBooks.length}
              onClearFilters={clearFilters}
            />
          </div>
        </section>

        {/* Results */}
        {paginatedBooks.length === 0 && !loading ? (
          searchTerm ? (
            <NoSearchResultsState
              searchTerm={searchTerm}
              onReset={clearFilters}
            />
          ) : (
            <NoDataState message="No hay libros disponibles en este momento." />
          )
        ) : (
          <>
            {/* Books Grid */}
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

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default BooksPage;
