import React from "react";

export interface SkeletonProps {
  className?: string;
}

/**
 * Skeleton loading component
 * Muestra un placeholder animado mientras se cargan datos
 */
export const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => {
  return (
    <div
      className={`animate-pulse rounded-base bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 bg-[length:200%_100%] ${className}`}
      style={{
        animation: "shimmer 2s infinite",
      }}
    />
  );
};

/**
 * Skeleton para tarjetas de libros
 */
export const BookCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-subtle border border-neutral-200 overflow-hidden">
      {/* Imagen placeholder */}
      <Skeleton className="w-full h-48" />

      <div className="p-lg space-y-md">
        {/* Título */}
        <Skeleton className="h-6 w-3/4 rounded" />

        {/* Autor */}
        <Skeleton className="h-4 w-1/2 rounded" />

        {/* Descripción */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-full rounded" />
          <Skeleton className="h-3 w-full rounded" />
          <Skeleton className="h-3 w-2/3 rounded" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-sm">
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-10 w-24 rounded-base" />
        </div>
      </div>
    </div>
  );
};

/**
 * Skeleton para tabla
 */
export const TableRowSkeleton: React.FC<{ columns?: number }> = ({
  columns = 4,
}) => {
  return (
    <tr className="border-b border-neutral-200">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton className="h-4 w-3/4 rounded" />
        </td>
      ))}
    </tr>
  );
};
