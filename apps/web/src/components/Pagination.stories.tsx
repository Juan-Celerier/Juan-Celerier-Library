import type { Meta, StoryObj } from "@storybook/react";
import Pagination from "./Pagination";

// --- Configuración base para Storybook ---
const meta: Meta<typeof Pagination> = {
  title: "Design System/Generics/Pagination",
  component: Pagination,
  tags: ["autodoc"],
  argTypes: {
    onPageChange: { action: "page changed" },
  },
  args: {
    totalPages: 20,
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const StartPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 20,
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 10,
    totalPages: 20,
  },
};

// 3. Paginación en la Última Página
export const EndPage: Story = {
  args: {
    currentPage: 20,
    totalPages: 20,
  },
};

// 4. Paginación con pocas páginas (No muestra '...')
export const ShortList: Story = {
  args: {
    currentPage: 2,
    totalPages: 5,
  },
};

// 5. Paginación con una sola página (Debería ocultarse)
export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
  },
};
