import { useLoaderData } from "react-router-dom";

import { DashboardSection } from "../components/Home/Dashboard";
import { HeroSection } from "../components/Home/hero-section";

import { MainLayout } from "../layouts/MainLayout";

import { apiClient } from "../utils/api-client";
import type { DashboardDTO } from "app-domain/dtos/dashboard";
interface GetPropsContext {
  params: Record<string, any>;
  remote: typeof apiClient;
}
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
      <main className="space-y-16 py-10">
        {error && (
          <div className="mb-4 rounded-md bg-red-50 border border-red-200 p-4 text-red-700">
            <strong>Error:</strong> {error}
          </div>
        )}
        <HeroSection />
        <DashboardSection
          stats={dashboard.stats}
          featuredBooks={dashboard.featuredBooks}
        />
      </main>
    </MainLayout>
  );
};

export default Index;
