import type { Meta, StoryObj } from "@storybook/react";
import Button from "../Button";
import BookCard from "./Book-card";

// --- Configuración base para Storybook ---
const meta: Meta<typeof BookCard> = {
  title: "Design System/UI/BookCard",
  component: BookCard,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text", description: "Título del libro" },
    author: { control: "text", description: "Autor del libro" },
    imageUrl: { control: "text", description: "URL de la imagen de portada" },
    isAvailable: {
      control: "boolean",
      description: "Si el libro está disponible",
    },
    actions: {
      control: false,
      description: "Nodos de React para los botones de acción",
    },
  },
};

export default meta;
type Story = StoryObj<typeof BookCard>;

// --- Historias Individuales ---

// 1. Tarjeta Básica (Libro Disponible)
export const Default: Story = {
  args: {
    title: "El Señor de los Anillos",
    author: "J.R.R. Tolkien",
    imageUrl:
      "https://images.cdn1.buscalibre.com/fit-in/360x360/0d/27/0d27a7c73539a25b451373a0a55eb2c9.jpg",
    isAvailable: true,
  },
};

// 2. Libro No Disponible
export const NotAvailable: Story = {
  args: {
    ...Default.args, // Reutiliza los args de la historia anterior
    isAvailable: false,
  },
};

// 3. Con Botones de Acción
export const WithActions: Story = {
  args: {
    ...Default.args,
    actions: (
      <>
        <Button variant="primary" size="sm">
          Prestar
        </Button>
        <Button variant="secondary" size="sm">
          Ver Detalles
        </Button>
      </>
    ),
  },
};

// 4. Con Títulos y Autores Largos
export const LongText: Story = {
  args: {
    title: "Cien Años de Soledad y las Crónicas de una Muerte Anunciada",
    author: "Gabriel García Márquez y un co-autor con un nombre muy largo",
    imageUrl:
      "https://m.media-amazon.com/images/I/81Pj2+3-T3L._AC_UF1000,1000_QL80_.jpg",
    isAvailable: true,
    actions: (
      <Button variant="primary" size="sm">
        Ver Más
      </Button>
    ),
  },
};

// 5. Sin Imagen de Portada
export const NoImage: Story = {
  args: {
    title: "Un Libro sin Portada",
    author: "Autor Desconocido",
    isAvailable: true,
    // No se pasa la prop 'imageUrl' para que use la imagen por defecto
  },
};
