import type { Meta, StoryObj } from "@storybook/react";
import Input from "./input";

// Icono de ejemplo para las historias
const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-neutral-200"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

// --- Configuración base para Storybook ---
const meta: Meta<typeof Input> = {
  title: "Design System/UI/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    error: { control: "text" },
    type: {
      control: "select",
      options: ["text", "password", "email", "number"],
    },
    icon: { control: false },
    iconPosition: { control: "radio", options: ["start", "end"] },
  },
  args: {
    label: "Correo Electrónico",
    placeholder: "nombre@ejemplo.com",
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// --- Historias Individuales ---

// 1. Input Básico
export const Default: Story = {};

// 2. Input Deshabilitado
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

// 3. Input con Error
export const WithError: Story = {
  args: {
    error: "El correo electrónico no es válido.",
    value: "texto-invalido",
  },
};

// 4. Input con Icono al Inicio
export const WithIconStart: Story = {
  args: {
    icon: <MailIcon />,
    iconPosition: "start",
  },
};

// 5. Input con Icono al Final
export const WithIconEnd: Story = {
  args: {
    icon: <MailIcon />,
    iconPosition: "end",
  },
};

// 6. Input de tipo Contraseña
export const Password: Story = {
  args: {
    label: "Contraseña",
    type: "password",
    placeholder: "••••••••••",
  },
};
