import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import AdminNavigation from "../../components/AdminNavigation";
import { apiClient } from "../../utils/api-client";
import {
  BookOpen,
  Users,
  Clock,
  AlertTriangle,
  TrendingUp,
  Calendar,
} from "lucide-react";

export const adminIndexLoader = async () => {
  try {
    // Obtener estadísticas básicas
    const [booksRes, usersRes, loansRes] = await Promise.all([
      apiClient.call("books"),
      apiClient.call("users"),
      apiClient.call("loans"),
    ]);

    const books = Array.isArray(booksRes) ? booksRes : [];
    const users = Array.isArray(usersRes) ? usersRes : [];
    const loans = Array.isArray(loansRes) ? loansRes : [];

    // Calcular estadísticas
    const stats = {
      totalBooks: books.length,
      totalUsers: users.length,
      activeLoans: loans.filter((loan: any) => loan.status === "active").length,
      overdueLoans: loans.filter((loan: any) => loan.status === "overdue")
        .length,
      availableBooks: books.filter((book: any) => book.availableCopies > 0)
        .length,
      unavailableBooks: books.filter((book: any) => book.availableCopies <= 0)
        .length,
    };

    // Actividad reciente (últimos 5 préstamos)
    const recentLoans = loans
      .sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 5);

    return { stats, recentLoans, error: null };
  } catch (error) {
    console.error("Error loading admin dashboard:", error);
    return {
      stats: {
        totalBooks: 0,
        totalUsers: 0,
        activeLoans: 0,
        overdueLoans: 0,
        availableBooks: 0,
        unavailableBooks: 0,
      },
      recentLoans: [],
      error: "Error al cargar las estadísticas",
    };
  }
};

const AdminIndexPage = () => {
  const { stats, recentLoans, error } = useLoaderData() as {
    stats: {
      totalBooks: number;
      totalUsers: number;
      activeLoans: number;
      overdueLoans: number;
      availableBooks: number;
      unavailableBooks: number;
    };
    recentLoans: any[];
    error: string | null;
  };
  return (
    <MainLayout>
      <AdminNavigation />
      <div className="space-y-10">
        <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border border-primary/20 p-8 lg:p-12">
          <div
            className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40`}
          ></div>
          <div className="relative">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
                  Panel de administración
                </p>
                <h1 className="mt-3 text-4xl font-bold text-neutral-900 lg:text-5xl">
                  BiblioSys Dashboard
                </h1>
                <p className="mt-4 text-lg text-neutral-600 max-w-xl">
                  Monitorea métricas clave, administra contenido y mantén la
                  biblioteca bajo control con insights en tiempo real.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 px-6 py-4 text-center shadow-lg">
                  <div className="text-3xl font-bold text-primary">
                    {stats.totalBooks}
                  </div>
                  <div className="text-sm font-medium text-neutral-600">
                    Libros totales
                  </div>
                </div>
                <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 px-6 py-4 text-center shadow-lg">
                  <div className="text-3xl font-bold text-success">
                    {stats.availableBooks}
                  </div>
                  <div className="text-sm font-medium text-neutral-600">
                    Disponibles
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {error && (
          <section className="rounded-[28px] border border-red-200 bg-red-50 p-4 text-red-700 shadow-sm">
            <p>{error}</p>
          </section>
        )}

        {/* Estadísticas principales */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <article className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full -mr-10 -mt-10"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-blue-500/10">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-neutral-900">
                    {stats.totalBooks}
                  </div>
                  <div className="text-sm font-medium text-neutral-600">
                    Total libros
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  {stats.availableBooks} disponibles
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  {stats.unavailableBooks} agotados
                </span>
              </div>
            </div>
          </article>

          <article className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full -mr-10 -mt-10"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-green-500/10">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-neutral-900">
                    {stats.totalUsers}
                  </div>
                  <div className="text-sm font-medium text-neutral-600">
                    Usuarios
                  </div>
                </div>
              </div>
              <div className="text-sm text-neutral-600">
                Usuarios activos registrados en el sistema
              </div>
            </div>
          </article>

          <article className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 rounded-full -mr-10 -mt-10"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-yellow-500/10">
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-neutral-900">
                    {stats.activeLoans}
                  </div>
                  <div className="text-sm font-medium text-neutral-600">
                    Préstamos activos
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {stats.overdueLoans > 0 ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                    <AlertTriangle className="h-3 w-3" />
                    {stats.overdueLoans} vencidos
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    Sin vencidos
                  </span>
                )}
              </div>
            </div>
          </article>

          <article className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full -mr-10 -mt-10"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-purple-500/10">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-neutral-900">
                    {stats.totalBooks > 0
                      ? Math.round(
                          (stats.availableBooks / stats.totalBooks) * 100,
                        )
                      : 0}
                    %
                  </div>
                  <div className="text-sm font-medium text-neutral-600">
                    Disponibilidad
                  </div>
                </div>
              </div>
              <div className="text-sm text-neutral-600">
                Porcentaje de libros disponibles para préstamo
              </div>
            </div>
          </article>
        </section>

        {/* Actividad reciente y gestión */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Actividad reciente */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-gray-600" />
                Actividad Reciente
              </h3>
            </div>
            <div className="p-6">
              {recentLoans.length > 0 ? (
                <div className="space-y-4">
                  {recentLoans.map((loan: any) => (
                    <div
                      key={loan.id}
                      className="flex items-center justify-between py-2"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            loan.status === "active"
                              ? "bg-green-500"
                              : loan.status === "overdue"
                                ? "bg-red-500"
                                : "bg-gray-500"
                          }`}
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {loan.book?.title || "Libro desconocido"}
                          </p>
                          <p className="text-xs text-gray-600">
                            Usuario: {loan.borrower?.name || loan.borrowerId}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          loan.status === "active"
                            ? "bg-green-100 text-green-800"
                            : loan.status === "overdue"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {loan.status === "active"
                          ? "Activo"
                          : loan.status === "overdue"
                            ? "Vencido"
                            : "Devuelto"}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No hay actividad reciente
                </p>
              )}
            </div>
          </div>

          {/* Gestión del sistema */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                Gestión del Sistema
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <Link
                to="/admin/books"
                className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <div className="flex items-center">
                  <BookOpen className="h-6 w-6 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Libros</p>
                    <p className="text-sm text-gray-600">
                      Gestionar catálogo completo
                    </p>
                  </div>
                </div>
                <span className="text-blue-600">→</span>
              </Link>

              <Link
                to="/admin/categories"
                className="flex items-center justify-between p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <div className="flex items-center">
                  <div className="h-6 w-6 bg-green-600 rounded mr-3 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">C</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Categorías</p>
                    <p className="text-sm text-gray-600">Organizar por temas</p>
                  </div>
                </div>
                <span className="text-green-600">→</span>
              </Link>

              <Link
                to="/admin/authors"
                className="flex items-center justify-between p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <div className="flex items-center">
                  <Users className="h-6 w-6 text-purple-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Autores</p>
                    <p className="text-sm text-gray-600">
                      Gestionar información de autores
                    </p>
                  </div>
                </div>
                <span className="text-purple-600">→</span>
              </Link>

              <Link
                to="/admin/publishers"
                className="flex items-center justify-between p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
              >
                <div className="flex items-center">
                  <div className="h-6 w-6 bg-orange-600 rounded mr-3 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">E</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Editores</p>
                    <p className="text-sm text-gray-600">
                      Administrar editoriales
                    </p>
                  </div>
                </div>
                <span className="text-orange-600">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Alertas importantes */}
        {stats.overdueLoans > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
              <div>
                <h3 className="text-lg font-medium text-red-900">
                  Alertas Importantes
                </h3>
                <p className="text-red-700 mt-1">
                  Hay {stats.overdueLoans} préstamo(s) vencido(s) que requieren
                  atención inmediata. Revisa la sección de préstamos para
                  gestionar las devoluciones.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Información del sistema */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-2">
            Información del Sistema
          </h3>
          <p className="text-blue-700">
            Desde este panel puedes gestionar todos los aspectos administrativos
            de la biblioteca. Los usuarios normales solo pueden ver el catálogo
            y hacer reservas/préstamos.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminIndexPage;
