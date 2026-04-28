import { Search, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const HeroSection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term: string) => {
    if (term.trim()) {
      navigate(`/books?search=${encodeURIComponent(term.trim())}`);
    } else {
      navigate("/books");
    }
  };

  return (
    <div className="relative bg-white border-b border-neutral-100 overflow-hidden">
      {/* Background Decor - Ajustado para ser más sutil */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute -top-24 -left-24 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[100px]"></div>
        <div className="absolute top-1/4 -right-24 h-[400px] w-[400px] rounded-full bg-blue-50 blur-[100px]"></div>
      </div>

      {/* Hero Content - Añadido pt-20 para dar aire arriba */}
      <div className="container relative z-10 mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-24 text-center">
        {/* Badge superior (opcional para dar contexto) */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Biblioteca Digital v3.0
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-neutral-900 tracking-tight mb-6">
          Descubre tu próxima{" "}
          <span className="text-primary italic">gran lectura</span>
        </h1>

        <p className="text-lg md:text-xl text-neutral-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Explora miles de libros, gestiona tus préstamos y accede al
          conocimiento desde cualquier lugar. Tu biblioteca inteligente.
        </p>

        {/* Search Bar - Rediseñada para ser más "limpia" */}
        <div className="max-w-2xl mx-auto relative group">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-neutral-400 group-focus-within:text-primary transition-colors" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-14 pr-36 py-5 rounded-2xl border border-neutral-200 bg-white/80 backdrop-blur-md text-neutral-900 shadow-xl shadow-neutral-200/40 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all duration-300 placeholder-neutral-400 text-lg"
            placeholder="Título, autor o género..."
            onKeyDown={(e) => e.key === "Enter" && handleSearch(searchTerm)}
          />
          <div className="absolute inset-y-2 right-2">
            <button
              type="button"
              onClick={() => handleSearch(searchTerm)}
              className="h-full bg-primary hover:bg-primary-dark text-white px-8 rounded-xl font-bold transition-all duration-200 shadow-lg shadow-primary/20 active:scale-95"
            >
              Buscar
            </button>
          </div>
        </div>

        {/* Stats / Info */}
        <div className="mt-10 flex flex-wrap justify-center items-center gap-6 text-sm font-semibold text-neutral-500">
          <span className="flex items-center gap-2">
            <div className="p-1.5 bg-primary/10 rounded-lg">
              <BookOpen className="h-4 w-4 text-primary" />
            </div>
            +1,200 Libros disponibles
          </span>
          <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-neutral-300"></div>
          <span className="flex items-center gap-2">
            <div className="p-1.5 bg-green-50 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
            Acceso 24/7 sin límites
          </span>
        </div>
      </div>
    </div>
  );
};
