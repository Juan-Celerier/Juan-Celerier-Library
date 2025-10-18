import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

// Simulación de icono para la historia "WithIcon"
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4 mr-2" // Clases de Tailwind para tamaño y margen
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

// --- Configuración base para Storybook ---
const meta: Meta<typeof Button> = {
  title: "Design System/Generics/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "link", "academy-blue"],
      description: "Define el esquema de color y estilo del botón.",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
      description: "Define el tamaño del botón.",
    },
    isLoading: {
      control: "boolean",
      description: "Muestra el estado de carga y deshabilita el botón.",
    },
    disabled: {
      control: "boolean",
      description: "Deshabilita el botón.",
    },
    onClick: { action: "clicked" },
  },
  args: {
    children: "Botón",
    isLoading: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// --- Historias Individuales ---

// 1. Variante Principal (Primary)
export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

// 2. Variante Secundario (Secondary)
export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

// 3. Variante Academy Blue
export const AcademyBlue: Story = {
  args: {
    variant: "academy-blue",
  },
};

// 4. Variante Ghost
export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
};

// 5. Variante Link
export const Link: Story = {
  args: {
    variant: "link",
  },
};

// 6. Estado de Carga (Loading)
export const Loading: Story = {
  args: {
    isLoading: true,
    children: "Cargando...",
  },
};

// 7. Estado Deshabilitado (Disabled)
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

// 8. Tamaño Grande (Large)
export const Large: Story = {
  args: {
    size: "lg",
  },
};

// 9. Tamaño Pequeño (Small)
export const Small: Story = {
  args: {
    size: "sm",
  },
};

// 10. Con Icono
export const WithIcon: Story = {
  args: {
    size: "sm",
    children: (
      <>
        <PlusIcon />
        Añadir Elemento
      </>
    ),
  },
};
