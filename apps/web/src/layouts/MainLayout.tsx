import React from "react";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import { AppSkipLinks } from "../components/common/SkipLink";

interface MainLayoutProps {
  children: React.ReactNode;
  /** Propiedades para pasarle al Header (ej. si el usuario está logueado) */
  headerProps?: React.ComponentProps<typeof Header>;
}

export const MainLayout = ({ children, headerProps }: MainLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      {/* Skip Links para accesibilidad */}
      <AppSkipLinks />

      {/* 1. Header (Pegajoso o fijo arriba si se desea) */}
      <Header {...headerProps} />

      {/* 2. Contenido Principal */}
      {/* 'flex-1' hace que este div crezca para ocupar el espacio disponible,
          empujando el footer hacia abajo si hay poco contenido. */}
      <main
        id="main-content"
        className="flex-1 w-full flex flex-col items-center px-md md:px-lg lg:px-xl py-lg md:py-2xl lg:py-3xl"
        role="main"
        aria-label="Contenido principal"
      >
        {/* Container con max-width y espaciado consistente */}
        <div className="w-full max-w-7xl">{children}</div>
      </main>

      {/* 3. Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
