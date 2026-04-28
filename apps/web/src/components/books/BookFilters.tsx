import { SearchBox } from "../common/Search";
import Button from "../Button";
import { Badge } from "../ui/Badge";

interface BookFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  authorFilter: string;
  onAuthorFilterChange: (author: string) => void;
  availabilityFilter: "all" | "available" | "unavailable";
  onAvailabilityFilterChange: (
    filter: "all" | "available" | "unavailable",
  ) => void;
  sortBy: "title" | "author" | "newest" | "oldest";
  onSortByChange: (sort: "title" | "author" | "newest" | "oldest") => void;
  uniqueAuthors: string[];
  totalBooks: number;
  availableBooksCount: number;
  unavailableBooksCount: number;
  filteredBooksCount: number;
  onClearFilters: () => void;
}

export const BookFilters = ({
  searchTerm,
  onSearchChange,
  authorFilter,
  onAuthorFilterChange,
  availabilityFilter,
  onAvailabilityFilterChange,
  sortBy,
  onSortByChange,
  uniqueAuthors,
  totalBooks,
  availableBooksCount,
  unavailableBooksCount,
  filteredBooksCount,
  onClearFilters,
}: BookFiltersProps) => {
  const hasActiveFilters =
    searchTerm || authorFilter || availabilityFilter !== "all";

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Buscar y filtrar libros
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Encuentra el libro perfecto para ti
          </p>
        </div>
        {hasActiveFilters && (
          <Button
            onClick={onClearFilters}
            variant="secondary"
            size="sm"
            className="text-gray-600 hover:text-gray-800"
          >
            Limpiar filtros
          </Button>
        )}
      </div>

      {/* Search Bar */}
      <div className="w-full">
        <SearchBox
          onSearchChange={onSearchChange}
          placeholder="Buscar por título o autor..."
        />
      </div>

      {/* Filters Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Author Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Autor
          </label>
          <select
            value={authorFilter}
            onChange={(e) => onAuthorFilterChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
          >
            <option value="">Todos los autores</option>
            {uniqueAuthors.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Ordenar por
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value as typeof sortBy)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
          >
            <option value="title">Título A-Z</option>
            <option value="author">Autor A-Z</option>
            <option value="newest">Más recientes</option>
            <option value="oldest">Más antiguos</option>
          </select>
        </div>

        {/* Availability Filter */}
        <div className="space-y-2 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Disponibilidad
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onAvailabilityFilterChange("all")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                availabilityFilter === "all"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Todos ({totalBooks})
            </button>
            <button
              onClick={() => onAvailabilityFilterChange("available")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                availabilityFilter === "available"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Disponibles ({availableBooksCount})
            </button>
            <button
              onClick={() => onAvailabilityFilterChange("unavailable")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                availabilityFilter === "unavailable"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              No disponibles ({unavailableBooksCount})
            </button>
          </div>
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600">
              Mostrando {filteredBooksCount} libros
            </span>
            {searchTerm && (
              <Badge variant="default" className="text-xs">
                Búsqueda: "{searchTerm}"
              </Badge>
            )}
            {authorFilter && (
              <Badge variant="default" className="text-xs">
                Autor: {authorFilter}
              </Badge>
            )}
            {availabilityFilter !== "all" && (
              <Badge variant="default" className="text-xs">
                {availabilityFilter === "available"
                  ? "Disponibles"
                  : "No disponibles"}
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
