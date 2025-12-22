import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../application/hooks/useAuth";

const ProfilePage = () => {
  const { user, logout } = useAuth();

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Mi perfil</h1>
        <div className="bg-white p-4 rounded shadow">
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
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
