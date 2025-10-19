import type { Meta, StoryObj } from "@storybook/react";
import { LoanStatusCard } from "./loan-status-card";
// Make sure Badge component exists and is correctly imported by LoanStatusCard
// If not, you might need to create a simple Badge story/component first.

// --- Configuración base para Storybook ---
const meta: Meta<typeof LoanStatusCard> = {
  title: "Presentation/Components/Cards/LoanStatusCard",
  component: LoanStatusCard,
  tags: ["autodocs"],
  argTypes: {
    bookTitle: { control: "text" },
    dueDate: { control: "date" },
    status: {
      control: "select",
      options: ["active", "returned", "overdue"],
    },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof LoanStatusCard>;

// Helper to create future dates
const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const today = new Date();

// --- Historias Individuales ---

// 1. Préstamo Activo
export const ActiveLoan: Story = {
  args: {
    bookTitle: "El Hobbit",
    dueDate: addDays(today, 14), // Due in 14 days
    status: "active",
  },
};

// 2. Préstamo Vencido
export const OverdueLoan: Story = {
  args: {
    bookTitle: "Crónica de una Muerte Anunciada",
    dueDate: addDays(today, -5), // Was due 5 days ago
    status: "overdue",
  },
};

// 3. Préstamo Devuelto
export const ReturnedLoan: Story = {
  args: {
    bookTitle: "Fahrenheit 451",
    dueDate: addDays(today, -30), // Was due a month ago
    status: "returned",
  },
};

// 4. Préstamo Activo con Título Largo
export const LongTitleActive: Story = {
  args: {
    bookTitle:
      "Guía del autoestopista galáctico: Un compañero indispensable para viajar por la galaxia",
    dueDate: addDays(today, 7), // Due in 7 days
    status: "active",
  },
};
