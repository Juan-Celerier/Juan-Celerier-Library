import type { Meta, StoryObj } from "@storybook/react";

import { useState } from "react";
import { Input } from "./input";

/**
 * Input es un componente de entrada de formulario reutilizable.
 * Soporta varios tipos y estados (normal, error, disabled, etc.)
 */
const meta: Meta<typeof Input> = {
  title: "Design System/Forms/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "date"],
      description: "Tipo de entrada HTML",
    },
    placeholder: {
      control: "text",
      description: "Texto de placeholder",
    },
    disabled: {
      control: "boolean",
      description: "Deshabilita la entrada",
    },
    error: {
      control: "boolean",
      description: "Muestra el estado de error",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Input básico vacio
 */
export const Basic: Story = {
  render: () => <Input placeholder="Escribe aquí..." label={""} />,
};

/**
 * Input con valor inicial
 */
export const WithValue: Story = {
  render: () => <Input value="Texto inicial" readOnly label={""} />,
};

/**
 * Input de email
 */
export const Email: Story = {
  render: () => (
    <Input type="email" placeholder="correo@ejemplo.com" label={""} />
  ),
};

/**
 * Input de contraseña
 */
export const Password: Story = {
  render: () => <Input type="password" placeholder="Contraseña" label={""} />,
};

/**
 * Input deshabilitado
 */
export const Disabled: Story = {
  render: () => (
    <Input placeholder="Este input está deshabilitado" disabled label={""} />
  ),
};

/**
 * Input con estado de error
 */
export const WithError: Story = {
  render: () => (
    <div className="space-y-2">
      <Input
        type="email"
        placeholder="correo@ejemplo.com"
        error="error"
        label={""}
      />
      <p className="text-sm text-red-600">Por favor ingresa un email válido</p>
    </div>
  ),
};

/**
 * Formulario completo con múltiples inputs
 */
export const RegisterForm: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    const handleChange = (e: any) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    return (
      <form className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <Input
            name="name"
            placeholder="Tu nombre completo"
            value={formData.name}
            onChange={handleChange}
            label={""}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input
            type="email"
            name="email"
            placeholder="tu@email.com"
            value={formData.email}
            onChange={handleChange}
            label={""}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Contraseña</label>
          <Input
            type="password"
            name="password"
            placeholder="Contraseña segura"
            value={formData.password}
            onChange={handleChange}
            label={""}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Confirmar Contraseña
          </label>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirma tu contraseña"
            value={formData.confirmPassword}
            onChange={handleChange}
            label={""}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded font-medium hover:bg-blue-700"
        >
          Registrarse
        </button>
      </form>
    );
  },
};

/**
 * Input de búsqueda
 */
export const Search: Story = {
  render: () => (
    <div className="relative">
      <Input
        type="text"
        placeholder="Buscar libros, autores..."
        className="pl-10"
        label={""}
      />
      <svg
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  ),
};

/**
 * Input con diferentes tamaños
 */
export const Sizes: Story = {
  render: () => (
    <div className="space-y-3">
      <Input placeholder="Input pequeño" className="text-sm" label={""} />
      <Input placeholder="Input normal" label={""} />
      <Input
        placeholder="Input grande"
        className="text-lg px-4 py-3"
        label={""}
      />
    </div>
  ),
};
