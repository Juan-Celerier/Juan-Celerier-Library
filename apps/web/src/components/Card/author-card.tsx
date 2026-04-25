// Props basadas en tu entidad BookAuthor
export interface AuthorCardProps {
  /** Nombre del autor */
  name: string;
  /** Apellido del autor */
  surname?: string;
  /** URL de la imagen de perfil del autor */
  imageUrl?: string;
  /** Nacionalidad u otro dato breve */
  subtitle?: string;
  /** Función a ejecutar cuando se hace clic */
  onClick?: () => void;
  /** Función a ejecutar para eliminar */
  onDelete?: () => void;
  /** Clases de Tailwind adicionales */
  className?: string;
}

export const AuthorCard = ({
  name,
  surname,
  imageUrl,
  subtitle,
  onClick,
  onDelete,
  className = "",
}: AuthorCardProps) => {
  const initials = `${name?.[0] || ""}${surname?.[0] || ""}`.toUpperCase();
  const fullName = [name, surname].filter(Boolean).join(" ");

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.();
  };

  return (
    <div
      className={`relative w-full max-w-[200px] flex flex-col items-center gap-lg rounded-lg border border-neutral-200 bg-paper px-lg py-md text-center shadow-subtle transition-all duration-200 hover:border-primary hover:shadow-medium focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      {onDelete && (
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 z-10 p-1 rounded-full bg-black/50 hover:bg-error/80 text-white transition-colors"
          aria-label="Eliminar autor"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      )}

      {/* Contenedor de la Imagen o Iniciales */}
      <div className="relative h-24 w-24">
        {imageUrl ? (
          <img
            className="h-full w-full rounded-full object-cover"
            src={imageUrl}
            alt={`Foto de ${fullName}`}
          />
        ) : (
          // Fallback con las iniciales si no hay imagen
          <div className="flex h-full w-full items-center justify-center rounded-full bg-academy-blue text-3xl font-semibold text-white">
            {initials}
          </div>
        )}
      </div>

      {/* Información del Autor */}
      <div>
        <p className="font-heading-md text-neutral-900">{fullName}</p>
        {subtitle && (
          <p className="text-body-sm text-neutral-500 line-clamp-2">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthorCard;
