import { Search, BookOpen } from "lucide-react";

export const HeroSection = () => {
  return (
    <div className="relative bg-white border-b border-gray-200 overflow-hidden">
      {/* Fondo decorativo sutil (opcional) */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-emerald-100 blur-3xl"></div>
        <div className="absolute top-1/2 -right-24 h-64 w-64 rounded-full bg-blue-100 blur-3xl"></div>
      </div>

      <div className="container relative z-10 mx-auto px-6 py-16 md:py-24 text-center">
        {/* Título Principal */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
          Descubre tu próxima{" "}
          <span className="text-emerald-600">gran lectura</span>
        </h1>

        {/* Subtítulo */}
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Explora miles de libros, gestiona tus préstamos y accede al
          conocimiento desde cualquier lugar. Tu biblioteca digital inteligente.
        </p>

        {/* Barra de Búsqueda Falsa (Solo visual) */}
        <div className="max-w-2xl mx-auto relative shadow-lg rounded-full">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 rounded-full border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all placeholder-gray-400"
            placeholder="Buscar por título, autor o género..."
            readOnly // Solo visual por ahora
          />
          <div className="absolute inset-y-1 right-1">
            <button className="h-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 rounded-full font-medium transition-colors">
              Buscar
            </button>
          </div>
        </div>

        {/* Botones Secundarios */}
        <div className="mt-8 flex justify-center gap-4 text-sm font-medium text-gray-500">
          <span className="flex items-center gap-1">
            <BookOpen className="h-4 w-4 text-emerald-600" />
            +1,200 Libros disponibles
          </span>
          <span>•</span>
          <span>Acceso 24/7</span>
        </div>
      </div>
    </div>
  );
};
