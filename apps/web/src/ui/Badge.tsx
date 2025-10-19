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
      return "border-transparent bg-primary text-primary-foreground";
    case "secondary":
      return "border-transparent bg-secondary text-secondary-foreground";
    case "success": // Usaremos 'academy-green' como ejemplo de éxito
      return "border-transparent bg-academy-green text-white";
    case "destructive": // Usaremos un rojo estándar para peligro/error
      return "border-transparent bg-red-600 text-white";
    case "outline":
      return "text-foreground border-border"; // Usa los colores de borde definidos
    default:
      return "border-transparent bg-secondary text-secondary-foreground";
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
    "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

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
