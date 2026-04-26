import { Link } from "react-router-dom";
import { BookOpen, Clock, Users, Heart, BookMarked } from "lucide-react";

// --- AQUÍ CORREGIMOS LAS RUTAS SEGÚN TU FOTO ---
// 1. Importamos tu Book-card existente (fíjate en la B mayúscula si tu archivo la tiene)
import BookCard from "../Card/BookCard";

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
}: DashboardSectionProps) => {
  return (
    <section className="py-3xl bg-neutral-50">
      <div className="space-y-xl">
        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
          {stats.map((stat, index) => {
            const IconComponent = ICON_MAP[stat.iconName] || BookOpen;
            return <StatCard key={index} {...stat} icon={IconComponent} />;
          })}
        </div>

        {/* LIBROS */}
        <div className="space-y-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-heading-lg font-bold text-neutral-900">
              Libros Destacados
            </h2>
            <Link
              to="/books"
              className="flex items-center gap-sm text-primary font-medium hover:text-primary/80 transition-all duration-200 hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded-base px-md py-sm"
            >
              <BookMarked className="h-5 w-5" />
              Ver todos
            </Link>
          </div>

          <div className="grid gap-lg">
            {featuredBooks.map((book: any) => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title || "Untitled"}
                author={
                  typeof book.author === "string"
                    ? book.author
                    : book.author?.name || "Desconocido"
                }
                availableCopies={book.status === "AVAILABLE" ? 1 : 0}
                imageUrl={book.imageUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
