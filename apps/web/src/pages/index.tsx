import { useLoaderData } from "react-router-dom";

// ✅ CORRECCIÓN 1: Cambiamos "src/" por "../"
// Asegúrate de que la carpeta sea 'Home' o 'home' según tu explorador de archivos (Linux distingue mayúsculas)
import { DashboardSection } from "../components/Home/Dashboard";
import { HeroSection } from "../components/Home/hero-section";

// ✅ CORRECCIÓN 2: Ruta relativa para Layouts
// Nota: Si MainLayout no se exporta por defecto (export default), usa llaves { MainLayout }
import { MainLayout } from "../layouts/MainLayout";

// ✅ CORRECCIÓN 3: Ruta relativa para Utils
import { type GetPropsContext, apiClient } from "../utils/api-client";
import type { DashboardDTO } from "app-domain/dtos/dashboard";

export async function getProps(api: GetPropsContext) {
  const result = await api.remote.call<DashboardDTO>("dashboard");

  if (result && typeof result === "object" && "error" in (result as any)) {
    console.error("Error dashboard:", (result as any).error);
    return {
      dashboard: { stats: [], featuredBooks: [] } as DashboardDTO,
      error: (result as any).error,
    };
  }

  return { dashboard: result as DashboardDTO };
}

export const indexLoader = async () => {
  return getProps({ params: {}, remote: apiClient });
};

const Index = () => {
  const { dashboard, error } = useLoaderData() as {
    dashboard: DashboardDTO;
    error?: string;
  };

  return (
    <MainLayout>
      <main>
        {error && (
          <div className="mb-4 rounded-md bg-red-50 border border-red-200 p-4 text-red-700">
            <strong>Error:</strong> {error}
          </div>
        )}
        <HeroSection />
        <DashboardSection
          stats={dashboard.stats}
          featuredBooks={dashboard.featuredBooks}
          onViewAllBooks={() => console.log("Navegar a /libros")}
        />
      </main>
    </MainLayout>
  );
};

export default Index;
