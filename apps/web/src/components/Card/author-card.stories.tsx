import type { Meta, StoryObj } from "@storybook/react";
import { AuthorCard } from "./author-card";

// --- Configuración base para Storybook ---
const meta: Meta<typeof AuthorCard> = {
  title: "Presentation/Components/Cards/AuthorCard",
  component: AuthorCard,
  tags: ["autodocs"],
  argTypes: {
    name: { control: "text" },
    surname: { control: "text" },
    imageUrl: { control: "text" },
    subtitle: { control: "text" },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof AuthorCard>;

// --- Historias Individuales ---

// 1. Tarjeta de Autor con Imagen
export const WithImage: Story = {
  args: {
    name: "Gabriel",
    surname: "García Márquez",
    subtitle: "Colombia",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/0f/Gabriel_Garcia_Marquez.jpg",
  },
};

// 2. Tarjeta sin Imagen (muestra iniciales)
export const NoImage: Story = {
  args: {
    name: "George",
    surname: "Orwell",
    subtitle: "Reino Unido",
    // Sin imageUrl para mostrar el fallback
  },
};

// 3. Con un Nombre Largo
export const LongName: Story = {
  args: {
    name: "John Ronald Reuel",
    surname: "Tolkien",
    subtitle: "Reino Unido",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/b/b4/J.R.R._Tolkien_1916.jpg",
  },
};
