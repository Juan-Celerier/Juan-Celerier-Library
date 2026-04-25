import React from "react";

// 1. Definimos los tipos para las variantes del Badge
export type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "destructive"
  | "outline";

// 2. Definimos las props del componente
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** El estilo visual del badge (controla el color). */
  variant?: BadgeVariant;
  /** El contenido del badge (generalmente texto corto). */
  children: React.ReactNode;
}

// 3. Helper para obtener las clases de Tailwind según la variante
const getBadgeClasses = (variant: BadgeVariant = "secondary"): string => {
  switch (variant) {
    case "primary":
      return "border-transparent bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-subtle";
    case "secondary":
      return "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-subtle";
    case "success":
      return "border-transparent bg-success text-white hover:bg-success/90 hover:shadow-subtle";
    case "destructive":
      return "border-transparent bg-error text-white hover:bg-error/90 hover:shadow-subtle";
    case "outline":
      return "text-foreground border border-border hover:bg-neutral-50 hover:border-neutral-300";
    default:
      return "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-subtle";
  }
};

// 4. Creamos el componente Badge
export const Badge = ({
  className,
  variant = "secondary", // Variante por defecto
  children,
  ...props
}: BadgeProps) => {
  const variantClasses = getBadgeClasses(variant);
  const baseClasses =
    "inline-flex items-center rounded-base border px-3 py-1 caption transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 cursor-default";

  return (
    <div
      className={`${baseClasses} ${variantClasses} ${className || ""}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Badge;
