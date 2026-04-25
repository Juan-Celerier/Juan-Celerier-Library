import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../application/hooks/useAuth";

const ProfilePage = () => {
  const { user, logout } = useAuth();

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-heading-lg font-bold mb-xl text-neutral-900">
          Mi Perfil
        </h1>
        <div className="bg-white px-lg py-lg rounded-lg shadow-medium border border-neutral-200 mb-xl">
          <div className="space-y-md">
            <div>
              <label className="text-neutral-700 text-body-sm font-semibold">
                Nombre:
              </label>
              <p className="text-neutral-600 text-body-md mt-xs">
                {user?.name || "-"}
              </p>
            </div>
            <div>
              <label className="text-neutral-700 text-body-sm font-semibold">
                Email:
              </label>
              <p className="text-neutral-600 text-body-md mt-xs">
                {user?.email || "-"}
              </p>
            </div>
            <div>
              <label className="text-neutral-700 text-body-sm font-semibold">
                Rol:
              </label>
              <p className="text-neutral-600 text-body-md mt-xs">
                {user?.role || "-"}
              </p>
            </div>
          </div>
          <button
            className="mt-lg w-full bg-error text-white px-lg py-sm rounded-base font-medium transition-all duration-200 shadow-subtle hover:shadow-medium hover:bg-error/90"
            onClick={() => logout()}
          >
            Cerrar Sesión
          </button>
        </div>

        <div className="bg-white px-lg py-lg rounded-lg shadow-medium border border-neutral-200">
          <h2 className="text-heading-md font-bold mb-lg text-neutral-900">
            Mis Actividades
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            <Link
              to="/my/loans"
              className="bg-info/5 hover:bg-info/10 px-lg py-lg rounded-base border border-info/20 transition-all duration-200 hover:shadow-subtle"
            >
              <h3 className="font-semibold text-info mb-sm text-body-md">
                Mis Préstamos
              </h3>
              <p className="text-body-sm text-neutral-600">
                Ver y gestionar mis libros prestados
              </p>
            </Link>
            <Link
              to="/my/reservations"
              className="bg-success/5 hover:bg-success/10 px-lg py-lg rounded-base border border-success/20 transition-all duration-200 hover:shadow-subtle"
            >
              <h3 className="font-semibold text-success mb-sm text-body-md">
                Mis Reservas
              </h3>
              <p className="text-body-sm text-neutral-600">
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
