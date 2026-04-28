import { Link } from "react-router-dom";
import { BookOpen, Clock, Users, Heart, BookMarked } from "lucide-react";
import BookCard from "../Card/BookCard";
import { StatCard } from "../Card/stats-card";

const ICON_MAP: any = { BookOpen, Clock, Users, Heart };

interface DashboardSectionProps {
  stats: any[];
  featuredBooks: any[];
}

export const DashboardSection = ({
  stats,
  featuredBooks,
}: DashboardSectionProps) => {
  return (
    <section className="space-y-16">
      {/* Welcome Header */}
      <div className="rounded-[16px] border border-neutral-200 bg-white p-12 shadow-sm">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Bienvenido a BiblioSys
            </p>
            <h2 className="text-3xl font-bold text-neutral-900">
              Tu dashboard de lectura
            </h2>
            <p className="max-w-2xl text-body-md text-neutral-600">
              Revisa las estadísticas principales de la biblioteca y encuentra
              los libros destacados para iniciar tu próxima lectura.
            </p>
          </div>
          <Link
            to="/books"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary/90 whitespace-nowrap"
          >
            <BookMarked className="h-4 w-4" />
            Ver catálogo completo
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {stats.length > 0 ? (
          stats.map((stat, index) => {
            const IconComponent = ICON_MAP[stat.iconName] || BookOpen;
            return <StatCard key={index} {...stat} icon={IconComponent} />;
          })
        ) : (
          <div className="col-span-full rounded-[16px] border border-neutral-200 bg-white p-10 text-center text-neutral-600 shadow-sm">
            No hay estadísticas disponibles en este momento.
          </div>
        )}
      </div>

      {/* Featured Books */}
      <div className="rounded-[16px] border border-neutral-200 bg-white p-12 shadow-sm">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-2xl font-bold text-neutral-900">
              Libros Destacados
            </h3>
            <p className="mt-2 text-body-sm text-neutral-600">
              Los mejores títulos seleccionados para ti. Encuentra algo nuevo y
              reserva tu ejemplar.
            </p>
          </div>
          <Link
            to="/books"
            className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-all duration-200"
          >
            Ver todos
          </Link>
        </div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {featuredBooks.length > 0 ? (
            featuredBooks.map((book: any) => (
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
                genre={book.genre || "General"}
              />
            ))
          ) : (
            <div className="col-span-full rounded-[12px] border border-dashed border-neutral-200 p-10 text-center text-neutral-500">
              No hay libros destacados disponibles.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
