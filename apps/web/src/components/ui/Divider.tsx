import React from "react";

export interface DividerProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
  label?: string;
}

/**
 * Componente Divider para separar contenido
 */
export const Divider: React.FC<DividerProps> = ({
  orientation = "horizontal",
  className = "",
  label,
}) => {
  if (orientation === "vertical") {
    return (
      <div
        className={`inline-block h-6 w-[1px] bg-neutral-200 ${className}`}
        aria-hidden="true"
      />
    );
  }

  if (label) {
    return (
      <div className={`relative flex items-center gap-lg my-lg ${className}`}>
        <div className="flex-1 h-[1px] bg-neutral-200" />
        <span className="text-body-sm font-medium text-neutral-600 px-sm">
          {label}
        </span>
        <div className="flex-1 h-[1px] bg-neutral-200" />
      </div>
    );
  }

  return (
    <div
      className={`w-full h-[1px] bg-neutral-200 my-lg ${className}`}
      aria-hidden="true"
    />
  );
};
