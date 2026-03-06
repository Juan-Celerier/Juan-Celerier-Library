import React from "react";
import { Input } from "../Input/input";
import { Search } from "lucide-react";

export interface SearchBoxProps {
  placeholder?: string;
  onSearchChange?: (value: string) => void;
  className?: string;
  "aria-label"?: string;
}

export const SearchBox = ({
  placeholder = "Buscar libros, autores...",
  onSearchChange,
  className = "",
  "aria-label": ariaLabel,
}: SearchBoxProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange?.(event.target.value);
  };

  return (
    <div className={`relative w-full max-w-md ${className}`} role="search">
      <Input
        label="Buscar"
        id="header-search"
        type="search"
        placeholder={placeholder}
        aria-label={ariaLabel || "Buscar en el catálogo de libros"}
        // Icono de lupa
        icon={
          <Search className="h-4 w-4 text-neutral-400" aria-hidden="true" />
        }
        iconPosition="start"
        onChange={handleChange}
        // Ocultamos el label visualmente pero lo dejamos para accesibilidad
        className="[&>label]:sr-only"
      />
    </div>
  );
};

export default SearchBox;
