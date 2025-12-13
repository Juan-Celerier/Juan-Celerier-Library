import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { MainLayout } from "./MainLayout";

const meta: Meta<typeof MainLayout> = {
  title: "Layouts/MainLayout",
  component: MainLayout,
  parameters: {
    layout: "fullscreen", // Para que ocupe toda la ventana sin márgenes de Storybook
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MainLayout>;

// 1. Caso Base: Contenido corto (El footer debe quedarse abajo igual)
export const Default: Story = {
  args: {
    children: (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-neutral-900">
          Bienvenido a la Biblioteca
        </h1>
        <p className="text-neutral-600">
          Este es un ejemplo de contenido corto. Gracias a 'flex-1' en el
          MainLayout, el footer se empuja hacia el fondo de la pantalla aunque
          el contenido no la llene.
        </p>
      </div>
    ),
  },
};

// 2. Caso Usuario Logueado
export const LoggedIn: Story = {
  args: {
    headerProps: {
      isAuthenticated: true,
      userName: "Juan Andrés",
    },
    children: (
      <div className="rounded-lg border border-neutral-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Panel de Control</h2>
        <p>Aquí verías tus préstamos activos y recomendaciones.</p>
      </div>
    ),
  },
};

// 3. Caso con Scroll: Mucho contenido
export const LongContent: Story = {
  args: {
    children: (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">
          Términos y Condiciones (Ejemplo Largo)
        </h1>
        {Array.from({ length: 20 }).map((_, i) => (
          <p key={i} className="text-neutral-600">
            Párrafo de relleno número {i + 1}. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </p>
        ))}
      </div>
    ),
  },
};
