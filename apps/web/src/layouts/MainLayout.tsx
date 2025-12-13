import React from "react";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";

interface MainLayoutProps {
  children: React.ReactNode;
  /** Propiedades para pasarle al Header (ej. si el usuario está logueado) */
  headerProps?: React.ComponentProps<typeof Header>;
}

export const MainLayout = ({ children, headerProps }: MainLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      {/* 1. Header (Pegajoso o fijo arriba si se desea) */}
      <Header {...headerProps} />

      {/* 2. Contenido Principal */}
      {/* 'flex-1' hace que este div crezca para ocupar el espacio disponible,
          empujando el footer hacia abajo si hay poco contenido. */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        {children}
      </main>

      {/* 3. Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
