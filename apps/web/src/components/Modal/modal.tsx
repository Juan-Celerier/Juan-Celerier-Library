import React, { useEffect } from "react";

// 1. Definimos las props del Modal
export interface ModalProps {
  /** Controla si el modal está visible o no. */
  isOpen: boolean;
  /** Función que se llama para cerrar el modal. */
  onClose: () => void;
  /** Título que se mostrará en la cabecera del modal. */
  title: string;
  /** El contenido principal del modal. */
  children: React.ReactNode;
  /** Un "slot" opcional para poner botones de acción en el pie de página. */
  footer?: React.ReactNode;
  /** Clases de Tailwind adicionales para el panel del modal. */
  className?: string;
}

// 2. Creamos el componente Modal
export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  className = "",
}: ModalProps) => {
  // Efecto para cerrar el modal con la tecla 'Escape'
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  // Si no está abierto, no renderiza nada.
  if (!isOpen) {
    return null;
  }

  return (
    // Portal/Contenedor principal que ocupa toda la pantalla
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Fondo semitransparente */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        aria-hidden="true"
        onClick={onClose}
      ></div>

      {/* Panel del Modal */}
      <div
        className={`relative m-4 w-full max-w-lg transform rounded-xl bg-paper p-6 text-left shadow-heavy transition-all animate-scale-in ${className}`}
        onClick={(e) => e.stopPropagation()} // Evita que el clic dentro del modal lo cierre
      >
        {/* Cabecera */}
        <div className="flex items-start justify-between">
          <h3
            className="text-lg font-semibold leading-6 text-neutral-900"
            id="modal-title"
          >
            {title}
          </h3>
          <button
            type="button"
            className="rounded-md p-1 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-ring"
            onClick={onClose}
          >
            <span className="sr-only">Cerrar</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Cuerpo del Modal */}
        <div className="mt-4 pr-4 text-sm text-neutral-500 overflow-y-auto max-h-[60vh]">
          {children}
        </div>

        {/* Pie de página (Footer) */}
        {footer && (
          <div className="mt-6 flex justify-end space-x-3">{footer}</div>
        )}
      </div>
    </div>
  );
};

export default Modal;
