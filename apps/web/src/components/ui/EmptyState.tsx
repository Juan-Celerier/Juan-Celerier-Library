import React from "react";
import { BookOpen, Search, Heart, Inbox } from "lucide-react";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = <BookOpen className="h-12 w-12 text-neutral-300" />,
  title,
  description,
  action,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center py-8xl px-lg text-center ${className}`}
    >
      <div className="mb-lg">{icon}</div>

      <h3 className="text-heading-md font-semibold text-neutral-900 mb-sm">
        {title}
      </h3>

      {description && (
        <p className="text-body-md text-neutral-600 mb-lg max-w-sm">
          {description}
        </p>
      )}

      {action && (
        <button
          onClick={action.onClick}
          className="inline-flex items-center justify-center px-lg py-md bg-primary text-primary-foreground text-body-sm font-medium rounded-base hover:bg-primary/90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

/**
 * Variantes predefinidas de EmptyState
 */

export const NoSearchResultsState: React.FC<{
  searchTerm: string;
  onReset?: () => void;
}> = ({ searchTerm, onReset }) => {
  return (
    <EmptyState
      icon={<Search className="h-12 w-12 text-neutral-300" />}
      title="No hay resultados"
      description={`No encontramos libros que coincidan con "${searchTerm}". Intenta con otros términos de búsqueda.`}
      action={
        onReset ? { label: "Limpiar búsqueda", onClick: onReset } : undefined
      }
    />
  );
};

export const NoFavoritesState: React.FC<{ onExplore?: () => void }> = ({
  onExplore,
}) => {
  return (
    <EmptyState
      icon={<Heart className="h-12 w-12 text-neutral-300" />}
      title="No hay favoritos"
      description="Aún no has agregado libros a tus favoritos. ¡Explora la biblioteca y encuentra tus próximas lecturas!"
      action={
        onExplore ? { label: "Explorar libros", onClick: onExplore } : undefined
      }
    />
  );
};

export const NoDataState: React.FC<{ message?: string }> = ({
  message = "No hay datos disponibles",
}) => {
  return (
    <EmptyState
      icon={<Inbox className="h-12 w-12 text-neutral-300" />}
      title={message}
    />
  );
};
