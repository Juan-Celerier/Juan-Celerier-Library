import React, { forwardRef, type InputHTMLAttributes } from "react";

// 1. Definimos las props del componente, extendiendo las de un input normal.
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Texto que se mostrará en el label flotante. */
  label: string;
  /** Mensaje de error que se mostrará debajo del input. */
  error?: string;
  /** Un ícono opcional para mostrar dentro del input. */
  icon?: React.ReactNode;
  /** Posición del ícono. */
  iconPosition?: "start" | "end";
  /** Clases de Tailwind adicionales para el contenedor principal. */
  className?: string;
}

// 2. Creamos el componente Input usando forwardRef para pasar la 'ref' al input nativo.
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      label,
      id,
      error,
      icon,
      iconPosition = "start",
      type = "text",
      ...props
    },
    ref,
  ) => {
    // Genera un ID único si no se proporciona uno, para conectar el label y el input.
    const inputId = id || React.useId();

    // Clases base y condicionales para el input
    const baseInputClasses =
      "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
    const errorClasses = "border-red-500 focus-visible:ring-red-500";
    const defaultClasses = "border-input";
    const iconPaddingClasses = icon
      ? iconPosition === "start"
        ? "pl-10"
        : "pr-10"
      : "";

    return (
      <div className={`w-full ${className}`}>
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-neutral-900 mb-1"
        >
          {label}
        </label>
        <div className="relative">
          {icon && (
            <div
              className={`pointer-events-none absolute inset-y-0 flex items-center ${
                iconPosition === "start" ? "left-0 pl-3" : "right-0 pr-3"
              }`}
            >
              {icon}
            </div>
          )}
          <input
            type={type}
            id={inputId}
            ref={ref}
            className={`${baseInputClasses} ${error ? errorClasses : defaultClasses} ${iconPaddingClasses}`}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-sm font-medium text-red-600">{error}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
