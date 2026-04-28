import Button from "../Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <nav
      aria-label="Navegación de páginas"
      className="flex items-center justify-center gap-3 pt-12 pb-8"
    >
      {/* Previous Button */}
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="secondary"
        size="sm"
        className="min-w-[100px] h-10 px-4 font-medium transition-all duration-200 hover:scale-105 focus:scale-105 disabled:hover:scale-100 disabled:focus:scale-100"
        aria-label="Página anterior"
      >
        ← Anterior
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {visiblePages.map((page, index) => (
          <div key={index}>
            {page === "..." ? (
              <span
                className="flex items-center justify-center w-10 h-10 text-gray-400 select-none"
                aria-hidden="true"
              >
                ⋯
              </span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                aria-label={`Ir a la página ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
                className={`
                  relative flex items-center justify-center w-10 h-10 rounded-lg text-sm font-semibold
                  transition-all duration-200 ease-out transform
                  focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2
                  ${
                    page === currentPage
                      ? "bg-primary text-primary-foreground shadow-lg scale-105 ring-2 ring-primary/30"
                      : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md hover:scale-105 active:scale-95"
                  }
                `}
              >
                {page}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Next Button */}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="secondary"
        size="sm"
        className="min-w-[100px] h-10 px-4 font-medium transition-all duration-200 hover:scale-105 focus:scale-105 disabled:hover:scale-100 disabled:focus:scale-100"
        aria-label="Página siguiente"
      >
        Siguiente →
      </Button>
    </nav>
  );
};
