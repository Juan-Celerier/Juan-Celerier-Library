// Props basadas en tu entidad BookAuthor
export interface AuthorCardProps {
  /** Nombre del autor */
  name: string;
  /** Apellido del autor */
  surname: string;
  /** URL de la imagen de perfil del autor */
  imageUrl?: string;
  /** Nacionalidad u otro dato breve */
  subtitle?: string;
  /** Función a ejecutar cuando se hace clic */
  onClick?: () => void;
  /** Clases de Tailwind adicionales */
  className?: string;
}

export const AuthorCard = ({
  name,
  surname,
  imageUrl,
  subtitle,
  onClick,
  className = "",
}: AuthorCardProps) => {
  const initials = `${name?.[0] || ""}${surname?.[0] || ""}`.toUpperCase();

  return (
    <button
      onClick={onClick}
      className={`flex w-full max-w-[200px] flex-col items-center space-y-3 rounded-lg border border-transparent bg-paper p-6 text-center shadow-subtle transition-all duration-smooth hover:border-neutral-100 hover:shadow-medium focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}
    >
      {/* Contenedor de la Imagen o Iniciales */}
      <div className="relative h-24 w-24">
        {imageUrl ? (
          <img
            className="h-full w-full rounded-full object-cover"
            src={imageUrl}
            alt={`Foto de ${name} ${surname}`}
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
        <p className="font-semibold text-neutral-900">{`${name} ${surname}`}</p>
        {subtitle && <p className="text-sm text-neutral-500">{subtitle}</p>}
      </div>
    </button>
  );
};

export default AuthorCard;
