import React from "react";
import Button from "./Button"; // Reutilizamos el componente Button

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Lógica auxiliar para generar un rango de páginas
const generatePageRange = (
  current: number,
  total: number,
): (number | "...")[] => {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const start = 1;
  const end = total;
  const range = [];

  if (current < 4) {
    range.push(1, 2, 3, 4, "...", end);
  } else if (current > total - 3) {
    range.push(start, "...", total - 3, total - 2, total - 1, total);
  } else {
    range.push(start, "...", current - 1, current, current + 1, "...", end);
  }

  // Limpieza final para eliminar duplicados si los rangos se solapan
  return range.filter((val) => {
    return typeof val === "number" || val === "...";
  });
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageRange = generatePageRange(currentPage, totalPages);

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2 py-6">
      {/* Botón Anterior */}
      <Button
        variant="ghost"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Anterior
      </Button>

      {/* Números de Página */}
      <nav aria-label="Paginación" className="flex space-x-1">
        {pageRange.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={index}
                className="px-3 py-2 text-neutral-900 opacity-60"
              >
                ...
              </span>
            );
          }

          const isCurrent = page === currentPage;
          return (
            <Button
              key={page}
              variant={isCurrent ? "primary" : "ghost"} // Destacamos la página actual
              size="icon"
              onClick={() => onPageChange(page as number)}
              aria-current={isCurrent ? "page" : undefined}
            >
              {page}
            </Button>
          );
        })}
      </nav>

      {/* Botón Siguiente */}
      <Button
        variant="ghost"
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Siguiente
      </Button>
    </div>
  );
};

export default Pagination;
