import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

const meta: Meta<typeof Header> = {
  title: "Components/Common/Header", // Ajusté el título para que coincida con tu estructura
  component: Header,
  decorators: [
    (Story) => (
      <div className="min-h-[200px] bg-neutral-50">
        {/* Un contenedor con fondo gris para que resalte el header blanco */}
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen", // Para que ocupe todo el ancho del canvas en Storybook
  },
  tags: ["autodocs"],
  argTypes: {
    isAuthenticated: { control: "boolean" },
    onSearch: { action: "buscando" },
    onLogin: { action: "login click" },
    onLogout: { action: "logout click" },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

// Historia: Usuario Visitante (Guest)
export const GuestUser: Story = {
  args: {
    isAuthenticated: false,
  },
};

// Historia: Usuario Logueado (Logged In)
export const LoggedInUser: Story = {
  args: {
    isAuthenticated: true,
    userName: "Juan Andrés",
  },
};
