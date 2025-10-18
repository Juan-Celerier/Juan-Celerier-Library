import type { Meta, StoryObj } from "@storybook/react";
import { CategoryCard } from "./category-card";

// --- Configuración base para Storybook ---
const meta: Meta<typeof CategoryCard> = {
  // La ruta del título coincide con la nueva estructura de carpetas
  title: "Presentation/Components/Cards/CategoryCard",
  component: CategoryCard,
  tags: ["autodocs"],
  argTypes: {
    name: { control: "text", description: "Nombre de la categoría" },
    imageUrl: { control: "text", description: "URL de la imagen de fondo" },
    onClick: {
      action: "clicked",
      description: "Función llamada al hacer clic",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CategoryCard>;

// --- Historias Individuales ---

// 1. Tarjeta con Imagen
export const WithImage: Story = {
  args: {
    name: "Ciencia Ficción",
    imageUrl:
      "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071&auto=format&fit=crop",
  },
};

// 2. Tarjeta sin Imagen (usa el gradiente por defecto)
export const NoImage: Story = {
  args: {
    name: "Novela Histórica",
  },
};

export const LongName: Story = {
  args: {
    name: "Biografías y Crónicas Detalladas",
    imageUrl:
      "https://images.unsplash.com/photo-1456327102063-fb5054564920?q=80&w=2070&auto=format&fit=crop",
  },
};
