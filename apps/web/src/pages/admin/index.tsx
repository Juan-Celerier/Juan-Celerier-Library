import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import AdminNavigation from "../../components/AdminNavigation";
import { apiClient } from "../../utils/api-client";
import { BookOpen, Users, Clock, AlertTriangle, TrendingUp, Calendar } from "lucide-react";

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
      activeLoans: loans.filter((loan: any) => loan.status === 'active').length,
      overdueLoans: loans.filter((loan: any) => loan.status === 'overdue').length,
      availableBooks: books.filter((book: any) => book.availableCopies > 0).length,
      unavailableBooks: books.filter((book: any) => book.availableCopies <= 0).length,
    };

    // Actividad reciente (últimos 5 préstamos)
    const recentLoans = loans
      .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
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
      error: "Error al cargar las estadísticas"
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
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Panel de Administración BiblioSys
          </h1>
          <p className="mt-2 text-gray-600">
            Gestión completa del sistema bibliotecario
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Estadísticas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Libros</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalBooks}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
            <div className="mt-4 flex text-sm">
              <span className="text-green-600">{stats.availableBooks} disponibles</span>
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-red-600">{stats.unavailableBooks} agotados</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Usuarios Registrados</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <div className="mt-4">
              <span className="text-sm text-gray-600">Usuarios activos en el sistema</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Préstamos Activos</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeLoans}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="mt-4 flex items-center text-sm">
              {stats.overdueLoans > 0 && (
                <>
                  <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-red-600">{stats.overdueLoans} vencidos</span>
                </>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Disponibilidad</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalBooks > 0 ? Math.round((stats.availableBooks / stats.totalBooks) * 100) : 0}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <div className="mt-4">
              <span className="text-sm text-gray-600">Libros disponibles</span>
            </div>
          </div>
        </div>

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
                    <div key={loan.id} className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          loan.status === 'active' ? 'bg-green-500' :
                          loan.status === 'overdue' ? 'bg-red-500' : 'bg-gray-500'
                        }`} />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {loan.book?.title || 'Libro desconocido'}
                          </p>
                          <p className="text-xs text-gray-600">
                            Usuario: {loan.borrower?.name || loan.borrowerId}
                          </p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        loan.status === 'active' ? 'bg-green-100 text-green-800' :
                        loan.status === 'overdue' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {loan.status === 'active' ? 'Activo' :
                         loan.status === 'overdue' ? 'Vencido' : 'Devuelto'}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No hay actividad reciente</p>
              )}
            </div>
          </div>

          {/* Gestión del sistema */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Gestión del Sistema</h3>
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
                    <p className="text-sm text-gray-600">Gestionar catálogo completo</p>
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
                    <p className="text-sm text-gray-600">Gestionar información de autores</p>
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
                    <p className="text-sm text-gray-600">Administrar editoriales</p>
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
                  Hay {stats.overdueLoans} préstamo(s) vencido(s) que requieren atención inmediata.
                  Revisa la sección de préstamos para gestionar las devoluciones.
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
