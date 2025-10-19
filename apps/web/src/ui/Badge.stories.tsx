import type { Meta, StoryObj } from "@storybook/react";
import Badge from "./Badge";

// --- Configuración base para Storybook ---
const meta: Meta<typeof Badge> = {
  title: "Design System/UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "success", "destructive", "outline"],
      description: "Estilo visual del badge",
    },
    children: { control: "text", description: "Contenido del badge" },
  },
  args: {
    children: "Badge Text", // Texto por defecto
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

// --- Historias Individuales para cada variante ---

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "Success",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
};
