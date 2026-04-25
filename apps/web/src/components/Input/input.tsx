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
      "flex h-10 w-full rounded-base border bg-background px-md py-2 text-body-sm ring-offset-background file:border-0 file:bg-transparent file:text-body-sm file:font-medium placeholder:text-neutral-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200";
    const errorClasses = "border-error focus-visible:ring-error shadow-xs";
    const defaultClasses = "border-input hover:border-neutral-300";
    const iconPaddingClasses = icon
      ? iconPosition === "start"
        ? "pl-10"
        : "pr-10"
      : "";

    return (
      <div className={`w-full ${className}`}>
        <label
          htmlFor={inputId}
          className="block text-body-sm font-medium text-neutral-900 mb-sm transition-colors duration-200"
        >
          {label}
        </label>
        <div className="relative group">
          {icon && (
            <div
              className={`pointer-events-none absolute inset-y-0 flex items-center transition-colors duration-200 group-focus-within:text-primary ${
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
          <p className="mt-sm text-body-sm font-medium text-error animate-in fade-in duration-200">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
