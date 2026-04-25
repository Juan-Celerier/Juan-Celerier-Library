import { Search, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();

  const handleSearch = (term: string) => {
    if (term.trim()) {
      navigate(`/books?search=${encodeURIComponent(term.trim())}`);
    } else {
      navigate("/books");
    }
  };
  return (
    <div className="relative bg-white border-b border-neutral-200 overflow-hidden">
      {/* Fondo decorativo sutil (opcional) */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl"></div>
        <div className="absolute top-1/2 -right-24 h-64 w-64 rounded-full bg-secondary/20 blur-3xl"></div>
      </div>

      <div className="container relative z-10 mx-auto px-6 py-3xl md:py-4xl text-center">
        {/* Título Principal */}
        <h1 className="text-display-md md:text-display-lg font-bold text-neutral-900 tracking-tight mb-lg">
          Descubre tu próxima <span className="text-primary">gran lectura</span>
        </h1>

        {/* Subtítulo */}
        <p className="text-body-lg md:text-heading-sm text-neutral-600 max-w-2xl mx-auto mb-2xl">
          Explora miles de libros, gestiona tus préstamos y accede al
          conocimiento desde cualquier lugar. Tu biblioteca digital inteligente.
        </p>

        {/* Barra de Búsqueda Funcional */}
        <div className="max-w-2xl mx-auto relative shadow-lg rounded-full">
          <div className="absolute inset-y-0 left-0 pl-lg flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-neutral-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-14 pr-md py-md rounded-full border-neutral-200 bg-white text-neutral-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200 placeholder-neutral-400 text-body-md"
            placeholder="Buscar por título, autor o género..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch((e.target as HTMLInputElement).value);
              }
            }}
          />
          <div className="absolute inset-y-1 right-1">
            <button
              onClick={() => {
                const input = document.querySelector(
                  'input[placeholder="Buscar por título, autor o género..."]',
                ) as HTMLInputElement;
                if (input) {
                  handleSearch(input.value);
                }
              }}
              className="h-full bg-primary hover:bg-primary/90 text-primary-foreground px-xl rounded-full font-medium transition-all duration-200 text-body-sm shadow-subtle hover:shadow-medium"
            >
              Buscar
            </button>
          </div>
        </div>

        {/* Botones Secundarios */}
        <div className="mt-xl flex justify-center gap-md text-body-sm font-medium text-neutral-600">
          <span className="flex items-center gap-xs">
            <BookOpen className="h-4 w-4 text-primary" />
            +1,200 Libros disponibles
          </span>
          <span>•</span>
          <span>Acceso 24/7</span>
        </div>
      </div>
    </div>
  );
};
