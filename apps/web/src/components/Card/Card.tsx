import React from "react";

export interface CardProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  hoverable?: boolean;
  interactive?: boolean;
}

/**
 * Componente Card reutilizable
 */
export const Card: React.FC<CardProps> = ({
  className = "",
  children,
  onClick,
  hoverable = false,
  interactive = false,
}) => {
  const hoverClasses = hoverable
    ? "hover:shadow-lg hover:border-primary/50 transition-all duration-300"
    : "";
  const interactiveClasses = interactive
    ? "cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
    : "";

  return (
    <div
      className={`rounded-lg bg-white border border-neutral-200 shadow-subtle p-lg ${hoverClasses} ${interactiveClasses} ${className}`}
      onClick={onClick}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
    >
      {children}
    </div>
  );
};

/**
 * Header de Card
 */
export interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  action,
  className = "",
}) => {
  return (
    <div
      className={`flex items-start justify-between gap-md mb-lg pb-lg border-b border-neutral-200 ${className}`}
    >
      <div>
        <h3 className="text-heading-md font-semibold text-neutral-900">
          {title}
        </h3>
        {subtitle && (
          <p className="text-body-sm text-neutral-600 mt-xs">{subtitle}</p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
};

/**
 * Body de Card
 */
export interface CardBodyProps {
  className?: string;
  children: React.ReactNode;
}

export const CardBody: React.FC<CardBodyProps> = ({
  className = "",
  children,
}) => {
  return <div className={`space-y-md ${className}`}>{children}</div>;
};

/**
 * Footer de Card
 */
export interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
  align?: "left" | "center" | "right" | "between";
}

export const CardFooter: React.FC<CardFooterProps> = ({
  className = "",
  children,
  align = "between",
}) => {
  const alignClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
    between: "justify-between",
  };

  return (
    <div
      className={`flex items-center gap-md pt-lg border-t border-neutral-200 ${alignClasses[align]} ${className}`}
    >
      {children}
    </div>
  );
};
