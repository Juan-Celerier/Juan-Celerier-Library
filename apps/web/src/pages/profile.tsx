import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../application/hooks/useAuth";

const ProfilePage = () => {
  const { user, logout } = useAuth();

  return (
    <MainLayout>
      <div className="space-y-10">
        <section className="rounded-[32px] border border-neutral-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                Mi perfil
              </p>
              <h1 className="mt-3 text-3xl font-bold text-neutral-900">
                Bienvenido{user?.name ? `, ${user.name}` : ""}
              </h1>
              <p className="mt-3 text-body-md text-gray-600">
                Revisa tu información y accede rápidamente a tus préstamos y
                reservas.
              </p>
            </div>
            <button
              onClick={logout}
              className="inline-flex items-center justify-center rounded-full bg-error px-6 py-3 text-sm font-semibold text-white transition hover:bg-error/90"
            >
              Cerrar sesión
            </button>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-[24px] border border-neutral-200 bg-neutral-50 p-6">
              <p className="text-sm text-gray-500">Nombre</p>
              <p className="mt-3 text-xl font-semibold text-neutral-900">
                {user?.name || "-"}
              </p>
            </div>
            <div className="rounded-[24px] border border-neutral-200 bg-neutral-50 p-6">
              <p className="text-sm text-gray-500">Email</p>
              <p className="mt-3 text-xl font-semibold text-neutral-900">
                {user?.email || "-"}
              </p>
            </div>
            <div className="rounded-[24px] border border-neutral-200 bg-neutral-50 p-6">
              <p className="text-sm text-gray-500">Rol</p>
              <p className="mt-3 text-xl font-semibold text-neutral-900">
                {user?.role || "-"}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-neutral-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-neutral-900">
                Mis actividades
              </h2>
              <p className="mt-3 text-gray-600">
                Navega rápidamente a tus secciones más importantes.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/my/loans"
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                Mis préstamos
              </Link>
              <Link
                to="/my/reservations"
                className="rounded-full border border-primary/20 bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10"
              >
                Mis reservas
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-[24px] border border-neutral-200 bg-neutral-50 p-6">
              <h3 className="font-semibold text-neutral-900">Préstamos</h3>
              <p className="mt-2 text-sm text-gray-600">
                Revisa tus libros activos y fechas de devolución.
              </p>
            </div>
            <div className="rounded-[24px] border border-neutral-200 bg-neutral-50 p-6">
              <h3 className="font-semibold text-neutral-900">Reservas</h3>
              <p className="mt-2 text-sm text-gray-600">
                Visualiza tus reservas y administra tus solicitudes.
              </p>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
