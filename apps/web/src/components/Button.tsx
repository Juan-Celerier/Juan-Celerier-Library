import React, { type ButtonHTMLAttributes, forwardRef } from "react";

// 1. Tipos de Estilo (Variants) y Tamaños (Sizes)
type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "link"
  | "academy-blue";
type ButtonSize = "default" | "sm" | "lg" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean; // Para manejar el estado de carga
  children?: React.ReactNode;
}

// 2. Función para generar Clases de Tailwind basadas en las props
const getButtonClasses = (
  variant: ButtonVariant,
  size: ButtonSize,
  disabled: boolean,
) => {
  let baseClasses =
    "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 cursor-pointer";

  // Clases por Variantes (Colores y Estilos)
  switch (variant) {
    case "primary":
      baseClasses +=
        " bg-primary text-primary-foreground shadow-subtle hover:bg-primary/90 hover:shadow-medium";
      break;
    case "secondary":
      baseClasses +=
        " bg-secondary text-secondary-foreground shadow-subtle hover:bg-secondary/80 hover:shadow-medium";
      break;
    case "academy-blue":
      baseClasses +=
        " bg-academy-blue text-white shadow-subtle hover:bg-academy-blue/90 hover:shadow-medium";
      break;
    case "ghost":
      baseClasses +=
        " hover:bg-neutral-100 hover:text-neutral-900 hover:shadow-subtle";
      break;
    case "link":
      baseClasses += " text-primary underline-offset-4 hover:underline";
      break;
  }

  // Clases por Tamaños
  switch (size) {
    case "default":
      baseClasses += " h-10 px-4 py-2";
      break;
    case "sm":
      baseClasses += " h-9 rounded-sm px-3";
      break;
    case "lg":
      baseClasses += " h-11 rounded-lg px-8";
      break;
    case "icon":
      baseClasses += " h-10 w-10";
      break;
  }

  // Estado Deshabilitado o de Carga
  if (disabled) {
    baseClasses += " opacity-50 cursor-not-allowed";
  } else if (variant !== "link") {
    baseClasses += " active:scale-95"; // Efecto de click
  }

  return baseClasses;
};

// 3. Definición del Componente con forwardRef
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "default",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const classes = getButtonClasses(variant, size, disabled || isLoading);

    return (
      <button
        className={`${classes} ${className || ""}`}
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="inline-block h-4 w-4 animate-spin text-current mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="opacity-75">{children}</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
