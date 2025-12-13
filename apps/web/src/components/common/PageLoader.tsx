import React from "react";
import { Loader2 } from "lucide-react"; // Usamos el ícono de loader de Lucide

export interface PageLoaderProps {
  /** Texto opcional para mostrar debajo del spinner */
  text?: string;
  /** Si es true, ocupa toda la pantalla (fixed). Si es false, ocupa el contenedor padre (absolute/flex). */
  fullScreen?: boolean;
  className?: string;
}

export const PageLoader = ({
  text = "Cargando...",
  fullScreen = false,
  className = "",
}: PageLoaderProps) => {
  const containerClasses = fullScreen
    ? "fixed inset-0 z-50 bg-white/80 backdrop-blur-sm" // Pantalla completa
    : "flex-1 w-full min-h-[200px]"; // Dentro de un contenedor

  return (
    <div
      className={`flex flex-col items-center justify-center ${containerClasses} ${className}`}
    >
      <Loader2 className="h-10 w-10 animate-spin text-academy-blue mb-4" />
      {text && (
        <p className="text-sm font-medium text-neutral-500 animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default PageLoader;
