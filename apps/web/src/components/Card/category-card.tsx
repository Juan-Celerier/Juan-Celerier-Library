// Basado en tu entidad Category
export interface CategoryCardProps {
  /** Nombre de la categoría a mostrar */
  name: string;
  /** Descripción de la categoría */
  description?: string;
  /** URL de la imagen de fondo para la tarjeta */
  imageUrl?: string;
  /** Función a ejecutar cuando se hace clic en la tarjeta */
  onClick?: () => void;
  /** Función a ejecutar cuando se hace clic en el botón de eliminar */
  onDelete?: () => void;
  /** Clases de Tailwind adicionales para personalización */
  className?: string;
}

export const CategoryCard = ({
  name,
  description,
  imageUrl,
  onClick,
  onDelete,
  className = "",
}: CategoryCardProps) => {
  // Estilo de fondo condicional: usa la imagen o un gradiente de tu tema
  const backgroundStyle = imageUrl
    ? { backgroundImage: `url(${imageUrl})` }
    : {};

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que el `onClick` de la tarjeta se dispare
    onDelete?.();
  };

  return (
    <div
      className={`relative h-48 w-full flex flex-col justify-between overflow-hidden rounded-lg bg-cover bg-center text-white shadow-medium transition-all duration-200 hover:shadow-lg focus:outline-none ${className}`}
      style={backgroundStyle}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      {/* Capa de superposición para mejorar la legibilidad del texto */}
      <div className="absolute inset-0 bg-black/40 transition-colors duration-200 hover:bg-black/50"></div>

      {/* Si no hay imagen, usamos un gradiente de fondo del tema */}
      {!imageUrl && <div className="absolute inset-0 bg-gradient-hero"></div>}

      <div className="relative z-10 flex h-full w-full flex-col p-4">
        <div className="flex-grow">
          <h3 className="text-heading-md font-bold tracking-tight text-center">
            {name}
          </h3>
          {description && (
            <p className="text-body-sm text-neutral-200 mt-sm text-center">
              {description}
            </p>
          )}
        </div>
      </div>

      {onDelete && (
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 z-20 p-1 rounded-full bg-black/50 hover:bg-error/80 text-white transition-colors"
          aria-label="Eliminar categoría"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-trash-2"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1="10" x2="10" y1="11" y2="17" />
            <line x1="14" x2="14" y1="11" y2="17" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default CategoryCard;
