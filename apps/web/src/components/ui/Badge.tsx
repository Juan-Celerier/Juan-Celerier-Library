import React from "react";

export type BadgeVariant =
  | "default"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "primary";
export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-neutral-100 text-neutral-900",
  success: "bg-success/10 text-success border border-success/30",
  error: "bg-error/10 text-error border border-error/30",
  warning: "bg-warning/10 text-warning border border-warning/30",
  info: "bg-info/10 text-info border border-info/30",
  primary: "bg-primary/10 text-primary border border-primary/30",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-md py-xs text-body-sm font-medium rounded-sm",
  md: "px-lg py-sm text-body-sm font-semibold rounded-base",
  lg: "px-xl py-md text-body-md font-semibold rounded-md",
};

/**
 * Componente Badge para etiquetar estados, categorías, etc.
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "md",
  className = "",
}) => {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
};

/**
 * Badge animado para notificaciones
 */
export interface PulseBadgeProps extends BadgeProps {
  pulse?: boolean;
}

export const PulseBadge: React.FC<PulseBadgeProps> = ({
  children,
  variant = "error",
  size = "sm",
  pulse = true,
  className = "",
}) => {
  return (
    <div className={`inline-flex relative ${pulse ? "animate-pulse" : ""}`}>
      <Badge variant={variant} size={size} className={className}>
        {children}
      </Badge>
      {pulse && (
        <span
          className={`absolute inset-0 rounded-full ${variantStyles[variant]} opacity-30 animate-ping`}
        />
      )}
    </div>
  );
};
