import React from "react";
import { Spinner } from "./Spinner";

export interface PageLoaderProps {
  message?: string;
  fullScreen?: boolean;
}

export const PageLoader: React.FC<PageLoaderProps> = ({
  message = "Cargando...",
  fullScreen = false,
}) => {
  const containerClasses = fullScreen
    ? "fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm"
    : "flex items-center justify-center py-8xl px-lg";

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center gap-lg">
        <Spinner size="lg" />
        {message && (
          <p className="text-body-md text-neutral-600 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};

/**
 * Componente para usar dentro de una sección sin llenar toda la pantalla
 */
export const SectionLoader: React.FC<{ height?: string }> = ({
  height = "min-h-[400px]",
}) => {
  return (
    <div
      className={`flex items-center justify-center ${height} bg-neutral-50 rounded-lg`}
    >
      <Spinner size="md" />
    </div>
  );
};
