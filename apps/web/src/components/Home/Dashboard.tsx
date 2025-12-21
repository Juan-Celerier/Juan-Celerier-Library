import { BookOpen, Clock, Users, Heart, BookMarked } from "lucide-react";

// --- AQUÍ CORREGIMOS LAS RUTAS SEGÚN TU FOTO ---
// 1. Importamos tu Book-card existente (fíjate en la B mayúscula si tu archivo la tiene)
import { BookCard } from "../Card/Book-card";

// 2. Importamos la StatCard que acabamos de crear
import { StatCard } from "../Card/stats-card";

// Mapa de íconos para los mocks
const ICON_MAP: any = { BookOpen, Clock, Users, Heart };

interface DashboardSectionProps {
  stats: any[];
  featuredBooks: any[];
  onViewAllBooks?: () => void;
}

export const DashboardSection = ({
  stats,
  featuredBooks,
  onViewAllBooks,
}: DashboardSectionProps) => {
  return (
    <section className="py-8 bg-gray-50">
      <div className="space-y-8">
        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = ICON_MAP[stat.iconName] || BookOpen;
            return <StatCard key={index} {...stat} icon={IconComponent} />;
          })}
        </div>

        {/* LIBROS */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Libros Destacados
            </h2>
            <button
              onClick={onViewAllBooks}
              className="flex items-center gap-2 text-emerald-600 font-medium"
            >
              <BookMarked className="h-5 w-5" />
              Ver todos
            </button>
          </div>

          <div className="grid gap-6">
            {featuredBooks.map((book: any) => (
              <BookCard
                key={book.id}
                title={book.title || "Untitled"}
                author={
                  typeof book.author === "string"
                    ? book.author
                    : book.author?.name || "Desconocido"
                }
                isAvailable={book.status === "AVAILABLE"}
                imageUrl={book.imageUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
