import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../application/hooks/useAuth";

const ProfilePage = () => {
  const { user, logout } = useAuth();

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Mi perfil</h1>
        <div className="bg-white p-4 rounded shadow mb-6">
          <p className="mb-2">Nombre: {user?.name || "-"}</p>
          <p className="mb-2">Email: {user?.email || "-"}</p>
          <p className="mb-4">Role: {user?.role || "-"}</p>
          <button
            className="bg-red-500 text-white px-3 py-2 rounded"
            onClick={() => logout()}
          >
            Cerrar sesión
          </button>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Mis actividades</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/my/loans"
              className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg transition-colors"
            >
              <h3 className="font-medium text-blue-900">Mis Préstamos</h3>
              <p className="text-sm text-blue-700">
                Ver y gestionar mis libros prestados
              </p>
            </Link>
            <Link
              to="/my/reservations"
              className="bg-green-50 hover:bg-green-100 p-4 rounded-lg transition-colors"
            >
              <h3 className="font-medium text-green-900">Mis Reservas</h3>
              <p className="text-sm text-green-700">
                Ver y gestionar mis reservas de libros
              </p>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
