import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";

interface MainLayoutProps {
  children: React.ReactNode;
  /** Propiedades para pasarle al Header (ej. si el usuario está logueado) */
  headerProps?: React.ComponentProps<typeof Header>;
}

export const MainLayout = ({ children, headerProps }: MainLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const state: any = (location && (location as any).state) || {};
    if (state?.toast) {
      setToast(String(state.toast));
      // Clear state so refresh won't show again
      navigate(location.pathname, { replace: true });
      const t = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(t);
    }
  }, [location, navigate]);
  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      {/* 1. Header (Pegajoso o fijo arriba si se desea) */}
      <Header {...headerProps} />

      {/* 2. Contenido Principal */}
      {/* 'flex-1' hace que este div crezca para ocupar el espacio disponible,
          empujando el footer hacia abajo si hay poco contenido. */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        {toast && (
          <div className="fixed right-4 top-20 z-50">
            <div className="bg-emerald-600 text-white px-4 py-2 rounded shadow">
              {toast}
            </div>
          </div>
        )}
        {children}
      </main>

      {/* 3. Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
